const pool = require('../database');

async function getAllBuses(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT id, bus_number, route, destination, departure_time, total_seats, available_seats, status
       FROM buses
       ORDER BY id`
    );

    return res.json(rows);
  } catch (error) {
    console.error('Get buses error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch buses',
    });
  }
}

async function getBusById(req, res) {
  try {
    const [rows] = await pool.query(
      'SELECT id, bus_number, route, destination, departure_time, total_seats, available_seats, status FROM buses WHERE id = ?',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Bus not found',
      });
    }

    return res.json(rows[0]);
  } catch (error) {
    console.error('Get bus by id error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch bus details',
    });
  }
}

async function getBusSeats(req, res) {
  try {
    const [busRows] = await pool.query(
      'SELECT id FROM buses WHERE id = ?',
      [req.params.id]
    );

    if (busRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Bus not found',
      });
    }

    const [rows] = await pool.query(
      'SELECT id, seat_number, status FROM seats WHERE bus_id = ? ORDER BY seat_number',
      [req.params.id]
    );

    return res.json(rows);
  } catch (error) {
    console.error('Get bus seats error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch seats',
    });
  }
}

async function getAlternativeBuses(req, res) {
  try {
    const destination = req.params.destination;

    const [rows] = await pool.query(
      `SELECT bus_number, destination, departure_time, available_seats
       FROM buses
       WHERE destination = ? AND available_seats > 0
       ORDER BY departure_time`,
      [destination]
    );

    if (rows.length === 0) {
      return res.json({
        success: false,
        message: 'No alternative bus available',
      });
    }

    return res.json(rows);
  } catch (error) {
    console.error('Alternative buses error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch alternative buses',
    });
  }
}

module.exports = {
  getAllBuses,
  getBusById,
  getBusSeats,
  getAlternativeBuses,
};
