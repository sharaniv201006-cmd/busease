const pool = require('../database');

function formatBookingDate() {
  return new Date().toISOString().slice(0, 10);
}

function formatBookingTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getDepartureDeadline(departureTime) {
  const [timePart, modifier] = departureTime.split(' ');
  let [hours, minutes] = timePart.split(':').map(Number);

  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  const deadlineMinutes = hours * 60 + minutes - 30;
  const deadlineHours = Math.floor(deadlineMinutes / 60);
  const deadlineMins = deadlineMinutes % 60;

  return `${String(deadlineHours % 24).padStart(2, '0')}:${String(deadlineMins).padStart(2, '0')}`;
}

async function createBooking(req, res) {
  const { student_id, bus_id, seat_id, student_name, boarding_stop } = req.body;

  if (!student_id || !bus_id || !seat_id) {
    return res.status(400).json({ success: false, message: 'Student, bus, and seat information are required' });
  }

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [studentRows] = await connection.query('SELECT id FROM students WHERE id = ?', [student_id]);
    if (studentRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ success: false, message: 'Invalid student' });
    }

    const [busRows] = await connection.query('SELECT id, available_seats, departure_time FROM buses WHERE id = ?', [bus_id]);
    if (busRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ success: false, message: 'Invalid bus' });
    }

    const [seatRows] = await connection.query('SELECT id, bus_id, seat_number, status FROM seats WHERE id = ? ORDER BY seat_number', [seat_id]);
    if (seatRows.length === 0) {
      await connection.rollback();
      return res.status(400).json({ success: false, message: 'Invalid seat' });
    }

    const seat = seatRows[0];
    if (seat.bus_id !== Number(bus_id)) {
      await connection.rollback();
      return res.status(400).json({ success: false, message: 'Seat does not belong to the selected bus' });
    }

    if (seat.status === 'booked') {
      await connection.rollback();
      return res.status(409).json({ success: false, message: 'Seat is already booked' });
    }

    const [activeBookingRows] = await connection.query('SELECT id FROM reservations WHERE student_id = ? AND status = ?', [student_id, 'active']);
    if (activeBookingRows.length > 0) {
      await connection.rollback();
      return res.status(409).json({ success: false, message: 'Student already has an active booking' });
    }

    if (Number(busRows[0].available_seats) <= 0) {
      await connection.rollback();
      return res.status(409).json({ success: false, message: 'Bus is full' });
    }

    const reservationCode = `RES-${Date.now()}`;
    const bookingDate = formatBookingDate();

    const [bookingResult] = await connection.query(
      'INSERT INTO reservations (student_id, bus_id, seat_id, journey_date, booking_time, status, boarding_stop, reservation_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [student_id, bus_id, seat_id, bookingDate, formatBookingTime(), 'active', boarding_stop || 'College Main Gate', reservationCode]
    );

    await connection.query('UPDATE seats SET status = ? WHERE id = ?', ['booked', seat_id]);
    await connection.query('UPDATE buses SET available_seats = available_seats - 1 WHERE id = ?', [bus_id]);
    await connection.query('INSERT INTO notifications (title, message, type) VALUES (?, ?, ?)', ['Reservation Confirmed', `${student_name || 'Student'} reserved seat #${seat.seat_number} on ${busRows[0].bus_number || bus_id}.`, 'success']);

    await connection.commit();
    connection.release();

    return res.status(201).json({
      success: true,
      message: 'Booking confirmed',
      booking: {
        id: bookingResult.insertId,
        reservation_code: reservationCode,
        seat_number: seat.seat_number,
        bus_id: bus_id,
        status: 'active',
        journey_date: bookingDate,
        boarding_stop: boarding_stop || 'College Main Gate',
        booking_time: formatBookingTime(),
      },
    });
  } catch (error) {
    console.error('Create booking error:', error.message);
    return res.status(500).json({ success: false, message: 'Booking failed. Please try again.' });
  }
}

async function getStudentBookings(req, res) {
  const { studentId } = req.params;

  try {
    const [rows] = await pool.query('SELECT id, student_id, bus_id, seat_id, journey_date, booking_time, status, boarding_stop FROM reservations WHERE student_id = ? ORDER BY id DESC', [studentId]);
    return res.json({ success: true, bookings: rows });
  } catch (error) {
    console.error('Get student bookings error:', error.message);
    return res.status(500).json({ success: false, message: 'Unable to fetch bookings' });
  }
}

async function cancelBooking(req, res) {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [rows] = await connection.query('SELECT id, student_id, bus_id, seat_id, status FROM reservations WHERE id = ?', [id]);
    if (rows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    const booking = rows[0];
    if (booking.status === 'cancelled') {
      await connection.rollback();
      return res.status(409).json({ success: false, message: 'Booking is already cancelled' });
    }

    const [busRows] = await connection.query('SELECT departure_time FROM buses WHERE id = ?', [booking.bus_id]);
    const deadline = getDepartureDeadline(busRows[0]?.departure_time || '08:00 AM');
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const [deadlineHours, deadlineMinutes] = deadline.split(':').map(Number);
    const deadlineValue = deadlineHours * 60 + deadlineMinutes;

    if (currentMinutes > deadlineValue) {
      await connection.rollback();
      return res.status(409).json({ success: false, message: 'Cancellation deadline has passed.' });
    }

    await connection.query('UPDATE reservations SET status = ? WHERE id = ?', ['cancelled', id]);
    await connection.query('UPDATE seats SET status = ? WHERE id = ?', ['available', booking.seat_id]);
    await connection.query('UPDATE buses SET available_seats = available_seats + 1 WHERE id = ?', [booking.bus_id]);
    await connection.query('INSERT INTO notifications (title, message, type) VALUES (?, ?, ?)', ['Reservation Cancelled', 'Your reservation has been cancelled and the seat is now available.', 'info']);

    await connection.commit();
    connection.release();

    return res.json({ success: true, message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Cancel booking error:', error.message);
    return res.status(500).json({ success: false, message: 'Unable to cancel booking' });
  }
}

async function completeJourneys(req, res) {
  try {
    const [rows] = await pool.query('SELECT id, bus_id, seat_id FROM reservations WHERE status = ? AND journey_date < ?', ['active', new Date().toISOString().slice(0, 10)]);
    for (const booking of rows) {
      await pool.query('UPDATE reservations SET status = ? WHERE id = ?', ['completed', booking.id]);
      await pool.query('UPDATE seats SET status = ? WHERE id = ?', ['available', booking.seat_id]);
      await pool.query('UPDATE buses SET available_seats = available_seats + 1 WHERE id = ?', [booking.bus_id]);
    }
    return res.json({ success: true, completed: rows.length });
  } catch (error) {
    console.error('Complete journeys error:', error.message);
    return res.status(500).json({ success: false, message: 'Unable to complete journeys' });
  }
}

async function getDashboardSummary(req, res) {
  try {
    const [buses] = await pool.query('SELECT id, bus_number, route, destination, departure_time, total_seats, available_seats, status FROM buses ORDER BY id');
    const [reservations] = await pool.query('SELECT id, status, journey_date FROM reservations');
    const [notifications] = await pool.query('SELECT id, title, message, type, created_at FROM notifications ORDER BY id DESC LIMIT 10');
    const today = new Date().toISOString().slice(0, 10);
    const stats = {
      totalBuses: buses.length,
      running: buses.filter((bus) => bus.status === 'On Route').length,
      arrived: buses.filter((bus) => bus.status === 'Arrived').length,
      delayed: buses.filter((bus) => bus.status === 'Stopped').length,
      cancelled: reservations.filter((booking) => booking.status === 'cancelled').length,
      reservationsToday: reservations.filter((booking) => booking.journey_date === today).length,
      availableSeats: buses.reduce((sum, bus) => sum + bus.available_seats, 0),
      completedTrips: reservations.filter((booking) => booking.status === 'completed').length,
      cancelledTrips: reservations.filter((booking) => booking.status === 'cancelled').length,
    };
    return res.json({ success: true, stats, buses, notifications });
  } catch (error) {
    console.error('Dashboard summary error:', error.message);
    return res.status(500).json({ success: false, message: 'Unable to fetch dashboard data' });
  }
}

async function gateEntry(req, res) {
  try {
    const { bus_id, qr_code } = req.body;
    const [busRows] = await pool.query('SELECT id, bus_number FROM buses WHERE id = ? OR qr_code = ?', [bus_id, qr_code]);
    if (busRows.length === 0) {
      return res.status(404).json({ success: false, message: 'Bus not found' });
    }
    await pool.query('INSERT INTO bus_logs (bus_id, entry_time, qr_code, status) VALUES (?, ?, ?, ?)', [busRows[0].id, new Date().toISOString(), qr_code || busRows[0].id, 'arrived']);
    await pool.query('UPDATE buses SET status = ? WHERE id = ?', ['Arrived', busRows[0].id]);
    return res.json({ success: true, message: 'Bus entry recorded', bus: busRows[0] });
  } catch (error) {
    console.error('Gate entry error:', error.message);
    return res.status(500).json({ success: false, message: 'Unable to log gate entry' });
  }
}

async function addNotification(req, res) {
  try {
    const { title, message, type } = req.body;
    await pool.query('INSERT INTO notifications (title, message, type) VALUES (?, ?, ?)', [title || 'Info', message, type || 'info']);
    return res.status(201).json({ success: true, message: 'Notification created' });
  } catch (error) {
    console.error('Add notification error:', error.message);
    return res.status(500).json({ success: false, message: 'Unable to add notification' });
  }
}

async function getNotifications(req, res) {
  try {
    const [rows] = await pool.query('SELECT id, title, message, type, created_at FROM notifications ORDER BY id DESC LIMIT 10');
    return res.json({ success: true, notifications: rows });
  } catch (error) {
    console.error('Notifications error:', error.message);
    return res.status(500).json({ success: false, message: 'Unable to fetch notifications' });
  }
}

module.exports = {
  createBooking,
  getStudentBookings,
  cancelBooking,
  completeJourneys,
  getDashboardSummary,
  gateEntry,
  addNotification,
  getNotifications,
};
