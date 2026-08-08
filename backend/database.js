const mysql = require('mysql2/promise');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const realPool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'busease_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Mock dataset fallback if MySQL server is offline
const MOCK_DATA = {
  students: [
    { id: 1, name: 'Asha Kumar', register_number: '23AD001', email: 'asha@college.edu' },
    { id: 2, name: 'Karthik Raja', register_number: '23AD002', email: 'karthik@college.edu' },
    { id: 3, name: 'Meera Raman', register_number: '23AD003', email: 'meera@college.edu' }
  ],
  buses: [
    { id: 1, bus_number: 'BUS-05', route: 'Pondicherry → College', destination: 'College Main Gate', departure_time: '08:00 AM', total_seats: 40, available_seats: 12, status: 'active' },
    { id: 2, bus_number: 'BUS-01', route: 'Pondicherry → College', destination: 'College Main Gate', departure_time: '08:15 AM', total_seats: 40, available_seats: 15, status: 'active' },
    { id: 3, bus_number: 'BUS-02', route: 'Villupuram → College', destination: 'College Main Gate', departure_time: '09:15 AM', total_seats: 40, available_seats: 5, status: 'active' },
    { id: 4, bus_number: 'BUS-03', route: 'Cuddalore → College', destination: 'College Main Gate', departure_time: '07:30 AM', total_seats: 40, available_seats: 20, status: 'active' },
    { id: 5, bus_number: 'BUS-07', route: 'Pondicherry → College', destination: 'College Main Gate', departure_time: '08:20 AM', total_seats: 40, available_seats: 16, status: 'active' },
    { id: 6, bus_number: 'BUS-08', route: 'Pondicherry → College', destination: 'College Main Gate', departure_time: '08:00 AM', total_seats: 40, available_seats: 0, status: 'active' }
  ],
  reservations: [
    { id: 1, student_id: 1, bus_id: 1, seat_id: 12, journey_date: '2026-08-08', booking_time: '07:30 AM', status: 'active', boarding_stop: 'Pondicherry Bus Stand' }
  ],
  notifications: [
    { id: 1, title: 'Reservation Confirmed', message: 'BUS-05 reserved successfully', type: 'success', created_at: new Date().toISOString() }
  ]
};

const safePool = {
  async query(sql, params = []) {
    try {
      return await realPool.query(sql, params);
    } catch (err) {
      console.warn('MySQL Offline/Fallback Mode:', err.message);
      const sqlLower = sql.toLowerCase();

      if (sqlLower.includes('from students')) {
        if (params.length >= 2) {
          const matched = MOCK_DATA.students.filter(s => s.name === params[0] || s.register_number === params[1]);
          return [matched.length > 0 ? matched : MOCK_DATA.students.slice(0, 1)];
        }
        return [MOCK_DATA.students];
      }

      if (sqlLower.includes('from buses')) {
        if (params.length > 0 && sqlLower.includes('where id = ?')) {
          const match = MOCK_DATA.buses.filter(b => b.id == params[0]);
          return [match.length > 0 ? match : [MOCK_DATA.buses[0]]];
        }
        return [MOCK_DATA.buses];
      }

      if (sqlLower.includes('from seats')) {
        const seats = Array.from({ length: 40 }, (_, i) => ({
          id: i + 1,
          seat_number: i + 1,
          status: [1, 3, 7, 12, 15, 18, 22, 25, 29].includes(i + 1) ? 'booked' : 'available'
        }));
        return [seats];
      }

      if (sqlLower.includes('from reservations')) {
        return [MOCK_DATA.reservations];
      }

      if (sqlLower.includes('from notifications')) {
        return [MOCK_DATA.notifications];
      }

      if (sqlLower.includes('insert into students')) {
        const newStudent = { id: MOCK_DATA.students.length + 1, name: params[0], register_number: params[1], email: params[2] };
        MOCK_DATA.students.push(newStudent);
        return [{ insertId: newStudent.id }];
      }

      if (sqlLower.includes('insert into reservations')) {
        const newRes = { id: MOCK_DATA.reservations.length + 1, student_id: params[0] || 1, bus_id: params[1] || 1, seat_id: params[2] || 12, journey_date: params[3] || '2026-08-08', booking_time: params[4] || '07:30 AM', status: 'active', boarding_stop: params[6] || 'Main Gate' };
        MOCK_DATA.reservations.push(newRes);
        return [{ insertId: newRes.id }];
      }

      if (sqlLower.includes('insert into notifications')) {
        MOCK_DATA.notifications.push({ id: Date.now(), title: params[0], message: params[1], type: params[2] });
        return [{ insertId: Date.now() }];
      }

      return [[]];
    }
  },

  async getConnection() {
    try {
      return await realPool.getConnection();
    } catch (err) {
      console.warn('MySQL Connection Fallback active');
      return {
        async beginTransaction() {},
        async commit() {},
        async rollback() {},
        release() {},
        async query(sql, params) {
          return safePool.query(sql, params);
        }
      };
    }
  }
};

module.exports = safePool;
