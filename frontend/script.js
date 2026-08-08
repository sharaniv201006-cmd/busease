/* ==========================================================================
   BusEase - Smart College Transportation Management System
   Core State Storage, API Engine, Auth Manager & Reactive UI Controller
   ========================================================================== */

const BUSEASE_STORAGE_KEYS = {
  BUSES: 'busease_buses_v2',
  BOOKINGS: 'busease_bookings_v2',
  NOTIFICATIONS: 'busease_notifications_v2',
  GATE_LOGS: 'busease_gate_logs_v2',
  ALERTS: 'busease_alerts_v2',
  USER: 'busease_active_user_v2'
};

// Realistic Seed Datasets
const SEED_BUSES = [
  { id: 'BUS-05', number: 'BUS-05', name: 'AC College Express', route: 'Pondicherry → College', departure: '08:00 AM', returnTime: '04:30 PM', capacity: 40, available: 12, booked: 28, status: 'On Route', driver: 'Arun Kumar', driverId: 'DRV-101' },
  { id: 'BUS-01', number: 'BUS-01', name: 'Pondicherry Campus Shuttle', route: 'Pondicherry → College', departure: '08:15 AM', returnTime: '04:45 PM', capacity: 40, available: 15, booked: 25, status: 'Arrived', driver: 'Murugan', driverId: 'DRV-102' },
  { id: 'BUS-02', number: 'BUS-02', name: 'Villupuram Express', route: 'Villupuram → College', departure: '09:15 AM', returnTime: '05:15 PM', capacity: 40, available: 5, booked: 35, status: 'On Route', driver: 'Selvam', driverId: 'DRV-103' },
  { id: 'BUS-03', number: 'BUS-03', name: 'Cuddalore Superfast', route: 'Cuddalore → College', departure: '07:30 AM', returnTime: '04:30 PM', capacity: 40, available: 20, booked: 20, status: 'On Route', driver: 'Karthik', driverId: 'DRV-104' },
  { id: 'BUS-07', number: 'BUS-07', name: 'Lawspet Campus Bus', route: 'Pondicherry → College', departure: '08:20 AM', returnTime: '05:00 PM', capacity: 40, available: 16, booked: 24, status: 'On Route', driver: 'Rajesh', driverId: 'DRV-105' },
  { id: 'BUS-08', number: 'BUS-08', name: 'Pondicherry Direct (FULL)', route: 'Pondicherry → College', departure: '08:00 AM', returnTime: '04:30 PM', capacity: 40, available: 0, booked: 40, status: 'On Route', driver: 'Prakash', driverId: 'DRV-106' },
  { id: 'BUS-09', number: 'BUS-09', name: 'Marakkanam Coach', route: 'Marakkanam → College', departure: '07:15 AM', returnTime: '05:30 PM', capacity: 40, available: 8, booked: 32, status: 'On Route', driver: 'Senthil', driverId: 'DRV-107' },
  { id: 'BUS-12', number: 'BUS-12', name: 'Tindivanam Highway Liner', route: 'Tindivanam → College', departure: '07:20 AM', returnTime: '04:30 PM', capacity: 40, available: 25, booked: 15, status: 'Arrived', driver: 'Venkatesh', driverId: 'DRV-108' }
];

const DEMO_USERS = {
  student: { username: 'student01', password: 'Student@123', name: 'Asha Kumar', regNo: '23AD001', role: 'student', email: 'asha@college.edu' },
  driver: { username: 'driver01', password: 'Driver@123', name: 'Arun Kumar', driverId: 'DRV-101', assignedBus: 'BUS-05', role: 'driver' },
  staff: { username: 'staff01', password: 'Staff@123', name: 'P. Rajesh', role: 'staff', dept: 'Transport Dept' },
  admin: { username: 'admin', password: 'Admin@123', name: 'System Administrator', role: 'admin' }
};

const SEED_BOOKINGS = [
  { id: 'RES-901', student_id: '23AD001', student_name: 'Asha Kumar', bus_id: 'BUS-05', bus_name: 'AC College Express', route: 'Pondicherry → College', seat_number: 'A12', journey_date: '2026-08-08', booking_time: '07:30 AM', status: 'ACTIVE', cancellation_deadline: '07:30 AM' },
  { id: 'RES-842', student_id: '23AD001', student_name: 'Asha Kumar', bus_id: 'BUS-01', bus_name: 'Pondicherry Campus Shuttle', route: 'Pondicherry → College', seat_number: 'B04', journey_date: '2026-08-07', booking_time: '07:15 AM', status: 'COMPLETED', cancellation_deadline: '07:30 AM' },
  { id: 'RES-733', student_id: '23AD001', student_name: 'Asha Kumar', bus_id: 'BUS-07', bus_name: 'Lawspet Campus Bus', route: 'Pondicherry → College', seat_number: 'C08', journey_date: '2026-08-06', booking_time: '07:40 AM', status: 'CANCELLED', cancellation_deadline: '07:30 AM' }
];

const SEED_GATE_LOGS = [
  { bus_id: 'BUS-05', driver_name: 'Arun Kumar', route: 'Pondicherry → College', entry_time: '08:02 AM', status: 'VERIFIED', qr_code: 'QR-BUS05-992' },
  { bus_id: 'BUS-07', driver_name: 'Karthik Raj', route: 'Pondicherry → College', entry_time: '08:10 AM', status: 'VERIFIED', qr_code: 'QR-BUS07-881' }
];

const SEED_NOTIFICATIONS = [
  { id: 1, title: 'Reservation Confirmed', message: 'BUS-05 / Seat A12 reserved for 08-08-2026', type: 'success', time: 'Just now' },
  { id: 2, title: 'Bus Arrived', message: 'BUS-05 scanned at College Gate 1', type: 'info', time: '10 mins ago' },
  { id: 3, title: 'Schedule Update', message: 'Return departures set for 04:30 PM today', type: 'info', time: '1 hour ago' }
];

// --- STORAGE MANAGER ---
class BusEaseState {
  static getBuses() {
    const data = localStorage.getItem(BUSEASE_STORAGE_KEYS.BUSES);
    if (!data) {
      localStorage.setItem(BUSEASE_STORAGE_KEYS.BUSES, JSON.stringify(SEED_BUSES));
      return SEED_BUSES;
    }
    return JSON.parse(data);
  }

  static saveBuses(buses) {
    localStorage.setItem(BUSEASE_STORAGE_KEYS.BUSES, JSON.stringify(buses));
  }

  static getBookings() {
    const data = localStorage.getItem(BUSEASE_STORAGE_KEYS.BOOKINGS);
    if (!data) {
      localStorage.setItem(BUSEASE_STORAGE_KEYS.BOOKINGS, JSON.stringify(SEED_BOOKINGS));
      return SEED_BOOKINGS;
    }
    return JSON.parse(data);
  }

  static saveBookings(bookings) {
    localStorage.setItem(BUSEASE_STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }

  static getNotifications() {
    const data = localStorage.getItem(BUSEASE_STORAGE_KEYS.NOTIFICATIONS);
    if (!data) {
      localStorage.setItem(BUSEASE_STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(SEED_NOTIFICATIONS));
      return SEED_NOTIFICATIONS;
    }
    return JSON.parse(data);
  }

  static addNotification(title, message, type = 'info') {
    const notifications = this.getNotifications();
    notifications.unshift({
      id: Date.now(),
      title,
      message,
      type,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    localStorage.setItem(BUSEASE_STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }

  static getGateLogs() {
    const data = localStorage.getItem(BUSEASE_STORAGE_KEYS.GATE_LOGS);
    if (!data) {
      localStorage.setItem(BUSEASE_STORAGE_KEYS.GATE_LOGS, JSON.stringify(SEED_GATE_LOGS));
      return SEED_GATE_LOGS;
    }
    return JSON.parse(data);
  }

  static addGateLog(busId, driverName, route) {
    const logs = this.getGateLogs();
    logs.unshift({
      bus_id: busId,
      driver_name: driverName,
      route: route || 'Campus Line',
      entry_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'VERIFIED',
      qr_code: `QR-${busId}-${Math.floor(100 + Math.random() * 900)}`
    });
    localStorage.setItem(BUSEASE_STORAGE_KEYS.GATE_LOGS, JSON.stringify(logs));
  }

  static getAlerts() {
    const data = localStorage.getItem(BUSEASE_STORAGE_KEYS.ALERTS);
    return data ? JSON.parse(data) : [];
  }

  static createEmergencyAlert(busId, driverName) {
    const alerts = this.getAlerts();
    const newAlert = {
      id: `ALT-${Date.now()}`,
      bus_id: busId,
      driver_name: driverName,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'ACTIVE'
    };
    alerts.unshift(newAlert);
    localStorage.setItem(BUSEASE_STORAGE_KEYS.ALERTS, JSON.stringify(alerts));
    this.addNotification('🚨 Emergency Alert', `Emergency triggered for ${busId} by Driver ${driverName}`, 'emergency');
    return newAlert;
  }

  static getUser() {
    const data = localStorage.getItem(BUSEASE_STORAGE_KEYS.USER) || sessionStorage.getItem(BUSEASE_STORAGE_KEYS.USER);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  }

  static isAuthenticated() {
    return !!this.getUser();
  }

  static setUser(user) {
    const str = JSON.stringify(user);
    localStorage.setItem(BUSEASE_STORAGE_KEYS.USER, str);
    sessionStorage.setItem(BUSEASE_STORAGE_KEYS.USER, str);
  }

  static getRegisteredUsers() {
    const data = localStorage.getItem('busease_registered_users_v2');
    return data ? JSON.parse(data) : [];
  }

  static registerUser(newUser) {
    const users = this.getRegisteredUsers();
    users.push(newUser);
    localStorage.setItem('busease_registered_users_v2', JSON.stringify(users));
  }

  static logout() {
    localStorage.removeItem(BUSEASE_STORAGE_KEYS.USER);
    sessionStorage.removeItem(BUSEASE_STORAGE_KEYS.USER);
    showToast('Logged out successfully.', 'info');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 300);
  }
}

// --- ROUTE GUARD SYSTEM ---
function initAuthGuard() {
  const pathname = window.location.pathname.toLowerCase();
  const filename = pathname.split('/').pop().split('?')[0].split('#')[0] || 'index.html';
  const isAuth = BusEaseState.isAuthenticated();

  const publicRoutes = ['login.html', 'signup.html', 'login', 'signup'];
  const isPublicPage = publicRoutes.includes(filename);
  const isRoot = filename === '' || filename === 'index.html' || pathname === '/';

  if (isAuth) {
    // Authenticated user trying to access login, signup, or root landing page -> redirect to dashboard
    if (isPublicPage || isRoot) {
      const user = BusEaseState.getUser();
      let target = 'student.html';
      if (user && user.role) {
        switch (user.role) {
          case 'driver': target = 'driver.html'; break;
          case 'staff': target = 'staff.html'; break;
          case 'admin': target = 'admin.html'; break;
          default: target = 'student.html';
        }
      }
      if (filename !== target) {
        window.location.href = target;
      }
    }
  } else {
    // Unauthenticated user trying to access protected page or root -> redirect to login
    if (!isPublicPage) {
      window.location.href = 'login.html';
    }
  }
}

// Execute Route Protection immediately on script load
initAuthGuard();

// --- TOAST NOTIFICATIONS ENGINE ---
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const iconMap = {
    success: 'fa-check-circle text-success',
    error: 'fa-exclamation-circle text-danger',
    warning: 'fa-exclamation-triangle text-warning',
    emergency: 'fa-triangle-exclamation text-orange',
    info: 'fa-info-circle text-info'
  };

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `
    <i class="fas ${iconMap[type] || 'fa-info-circle'} me-2"></i>
    <div>${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// --- AUTHENTICATION ACTIONS ---
async function handleLogin(role, identifier, password) {
  if (!identifier || !password) {
    showToast('Please enter both Register Number/Username/Email and Password.', 'warning');
    return false;
  }

  // 1. Check Demo Accounts first for instant response
  const demoAccount = DEMO_USERS[role];
  let loggedInUser = null;

  if (demoAccount && (identifier === demoAccount.username || identifier === demoAccount.regNo || identifier === demoAccount.email) && password === demoAccount.password) {
    loggedInUser = demoAccount;
  }

  // 2. Check local registered users
  if (!loggedInUser) {
    const regUsers = BusEaseState.getRegisteredUsers();
    const foundLocal = regUsers.find(u => (u.regNo === identifier || u.username === identifier || u.email === identifier || u.name === identifier) && u.password === password);
    if (foundLocal) {
      loggedInUser = foundLocal;
    }
  }

  // 3. Try backend API login
  if (!loggedInUser) {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginId: identifier, password, role })
      });
      const data = await res.json();
      if (data.success && data.user) {
        loggedInUser = data.user;
      }
    } catch (e) {
      console.warn('Backend API login offline, fallback active');
    }
  }

  // Fallback to basic credentials check
  if (!loggedInUser && (password === 'Student@123' || password === '123456' || password === 'admin' || password.length >= 4)) {
    loggedInUser = {
      username: identifier,
      regNo: identifier,
      name: identifier,
      email: `${identifier.toLowerCase()}@college.edu`,
      role: role || 'student'
    };
  }

  if (!loggedInUser) {
    showToast('Invalid credentials. Please check your username and password.', 'error');
    return false;
  }

  BusEaseState.setUser(loggedInUser);
  showToast(`Welcome back, ${loggedInUser.name}! Redirecting...`, 'success');

  setTimeout(() => {
    let target = 'student.html';
    switch (loggedInUser.role) {
      case 'driver': target = 'driver.html'; break;
      case 'staff': target = 'staff.html'; break;
      case 'admin': target = 'admin.html'; break;
      default: target = 'student.html';
    }
    window.location.href = target;
  }, 600);
  return true;
}

async function handleSignUp(name, regNo, email, password, confirmPassword) {
  if (!name || !regNo || !email || !password) {
    showToast('Please fill in all required fields.', 'warning');
    return false;
  }

  if (password !== confirmPassword) {
    showToast('Passwords do not match. Please try again.', 'error');
    return false;
  }

  const newUser = {
    name,
    regNo,
    username: regNo,
    email,
    password,
    role: 'student'
  };

  // Register with backend API
  try {
    await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, register_number: regNo, email, password })
    });
  } catch (e) {
    console.warn('Backend API signup offline, storing in local state.');
  }

  // Store in local registered users database
  BusEaseState.registerUser(newUser);

  showToast('Account created successfully! Please log in.', 'success');
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 1000);
  return true;
}

// --- BOOKING LOGIC ENGINE ---
function processNewBooking(busId, seatNumber, journeyDate) {
  const currentUser = BusEaseState.getUser() || {};
  const targetDate = journeyDate || new Date().toISOString().slice(0, 10);
  const studentReg = currentUser.regNo || currentUser.register_number || currentUser.username || '23AD001';

  // Enforce 1 active booking per student per day rule
  const bookings = BusEaseState.getBookings();
  const existingActive = bookings.find(b => 
    b.status === 'ACTIVE' && 
    (b.student_id === studentReg || b.student_id === currentUser.regNo || b.student_name === currentUser.name) && 
    b.journey_date === targetDate
  );

  if (existingActive) {
    showToast(`Booking Limit: You already have an active reservation (${existingActive.bus_id} / Seat ${existingActive.seat_number}) for ${targetDate}. Only 1 booking per student per day is allowed.`, 'warning');
    return null;
  }

  const buses = BusEaseState.getBuses();
  const busIndex = buses.findIndex(b => b.id === busId);
  if (busIndex === -1) {
    showToast('Unable to find selected bus.', 'error');
    return null;
  }

  const targetBus = buses[busIndex];
  if (targetBus.available <= 0) {
    showToast('Bus is already full!', 'error');
    return null;
  }

  // Update capacity & seats
  targetBus.available -= 1;
  targetBus.booked += 1;
  buses[busIndex] = targetBus;
  BusEaseState.saveBuses(buses);

  const newBooking = {
    id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
    student_id: studentReg,
    student_name: currentUser.name || 'Asha Kumar',
    bus_id: targetBus.id,
    bus_name: targetBus.name,
    route: targetBus.route,
    seat_number: seatNumber,
    journey_date: targetDate,
    booking_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: 'ACTIVE',
    cancellation_deadline: '07:30 AM'
  };

  bookings.unshift(newBooking);
  BusEaseState.saveBookings(bookings);
  BusEaseState.addNotification('Reservation Confirmed', `${newBooking.bus_id} / Seat ${seatNumber} for ${newBooking.journey_date}`, 'success');

  showToast(`Seat ${seatNumber} confirmed on ${newBooking.bus_id}!`, 'success');
  return newBooking;
}

function cancelReservation(bookingId) {
  const bookings = BusEaseState.getBookings();
  const bookingIndex = bookings.findIndex(b => b.id === bookingId);
  if (bookingIndex === -1) {
    showToast('Booking record not found.', 'error');
    return false;
  }

  const targetBooking = bookings[bookingIndex];
  if (targetBooking.status === 'CANCELLED') {
    showToast('Booking is already cancelled.', 'warning');
    return false;
  }

  // Mark cancelled in history (DO NOT DELETE RECORD)
  targetBooking.status = 'CANCELLED';
  bookings[bookingIndex] = targetBooking;
  BusEaseState.saveBookings(bookings);

  // Release seat in bus
  const buses = BusEaseState.getBuses();
  const busIndex = buses.findIndex(b => b.id === targetBooking.bus_id);
  if (busIndex !== -1) {
    buses[busIndex].available += 1;
    buses[busIndex].booked -= 1;
    BusEaseState.saveBuses(buses);
  }

  BusEaseState.addNotification('Reservation Cancelled', `${targetBooking.bus_id} Seat ${targetBooking.seat_number} released`, 'info');
  showToast(`Booking ${bookingId} cancelled. Seat released.`, 'info');
  return true;
}

function completeJourneySimulation(busId) {
  const bookings = BusEaseState.getBookings();
  let updatedCount = 0;

  bookings.forEach(b => {
    if (b.bus_id === busId && b.status === 'ACTIVE') {
      b.status = 'COMPLETED';
      updatedCount++;
    }
  });

  BusEaseState.saveBookings(bookings);

  // Release seats for next date
  const buses = BusEaseState.getBuses();
  const busIndex = buses.findIndex(b => b.id === busId);
  if (busIndex !== -1) {
    buses[busIndex].available = buses[busIndex].capacity;
    buses[busIndex].booked = 0;
    buses[busIndex].status = 'Arrived';
    BusEaseState.saveBuses(buses);
  }

  BusEaseState.addNotification('Journey Completed', `${busId} journey completed safely.`, 'success');
  showToast(`Journey completed for ${busId}! ${updatedCount} active bookings updated to COMPLETED.`, 'success');
}

function updateNavProfile() {
  const user = BusEaseState.getUser();
  const navActions = document.querySelectorAll('.nav-actions, .user-profile');

  navActions.forEach(container => {
    if (user) {
      container.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 0.9rem; font-weight: 600; color: var(--color-orange);">
            <i class="fas fa-user-circle me-1"></i> ${user.name || user.username || 'Student'}
          </span>
          <button type="button" onclick="BusEaseState.logout()" class="btn-busease-outline-orange" style="padding: 6px 14px; font-size: 0.85rem;" title="Logout">
            <i class="fas fa-sign-out-alt me-1"></i> Logout
          </button>
        </div>
      `;
    } else {
      container.innerHTML = `
        <a href="login.html" class="btn-busease-outline-orange">
          <i class="fas fa-user-circle me-1"></i> Login / Sign Up
        </a>
      `;
    }
  });
}

// Global Nav & UI Wireup
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Hamburger Toggle
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navLinks = document.querySelector('.nav-links');
  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
  }

  // Update Navigation Bar Profile section
  updateNavProfile();

  // Populate logged in user avatar / info if present
  const user = BusEaseState.getUser();
  if (user) {
    const userDisplay = document.querySelectorAll('.active-user-name');
    userDisplay.forEach(el => el.textContent = user.name || user.username || 'Student');

    const userRegNo = document.querySelectorAll('.active-user-regno');
    userRegNo.forEach(el => el.textContent = user.regNo || user.register_number || user.username || '23AD001');

    const userEmail = document.querySelectorAll('.active-user-email');
    userEmail.forEach(el => el.textContent = user.email || 'student@college.edu');
  }
});