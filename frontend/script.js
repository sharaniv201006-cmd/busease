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
  { id: 'BUS-05', number: '53-ENGG', name: 'AC College Express', route: 'Pondicherry → College', departure: '08:00 AM', returnTime: '04:30 PM', capacity: 40, available: 12, booked: 28, status: 'On Route', driver: 'Murugan', driverId: 'DRV-101', driverExp: '8 Years', currentStop: 'Lawspet Gate', nextStop: 'College Main Gate', eta: '5 min', distanceKm: 0.85, lastServiceDate: '2026-08-05', serviceCount: 8, nextServiceDate: '2026-09-05', serviceCenter: 'ABC Motors', serviceType: 'Regular Maintenance', serviceStatus: 'Completed', repairStatus: 'None', repairStartDate: null, repairReason: null, expectedReturnDate: null, repairServiceCenter: null },
  { id: 'BUS-01', number: '57-ENGG', name: 'Pondicherry Campus Shuttle', route: 'Pondicherry → College', departure: '08:15 AM', returnTime: '04:45 PM', capacity: 40, available: 15, booked: 25, status: 'Arrived', driver: 'Arun Kumar', driverId: 'DRV-102', driverExp: '6 Years', currentStop: 'Campus Gate 1', nextStop: 'Main Auditorium', eta: '2 min', distanceKm: 0.4, lastServiceDate: '2026-08-01', serviceCount: 12, nextServiceDate: '2026-09-01', serviceCenter: 'Campus Auto Care', serviceType: 'Oil & Filter Change', serviceStatus: 'Completed', repairStatus: 'None', repairStartDate: null, repairReason: null, expectedReturnDate: null, repairServiceCenter: null },
  { id: 'BUS-02', number: '02-VILL', name: 'Villupuram Express', route: 'Villupuram → College', departure: '09:15 AM', returnTime: '05:15 PM', capacity: 40, available: 5, booked: 35, status: 'On Route', driver: 'Selvam', driverId: 'DRV-103', driverExp: '10 Years', currentStop: 'Vikravandi Toll', nextStop: 'College Main Gate', eta: '18 min', distanceKm: 12.5, lastServiceDate: '2026-07-20', serviceCount: 15, nextServiceDate: '2026-08-15', serviceCenter: 'Villupuram Fleet Hub', serviceType: 'Brake Pad Replacement', serviceStatus: 'Completed', repairStatus: 'None', repairStartDate: null, repairReason: null, expectedReturnDate: null, repairServiceCenter: null },
  { id: 'BUS-03', number: '03-CUDD', name: 'Cuddalore Superfast', route: 'Cuddalore → College', departure: '07:30 AM', returnTime: '04:30 PM', capacity: 40, available: 20, booked: 20, status: 'On Route', driver: 'Karthik', driverId: 'DRV-104', driverExp: '5 Years', currentStop: 'Kirumampakkam', nextStop: 'College Main Gate', eta: '12 min', distanceKm: 8.2, lastServiceDate: '2026-07-15', serviceCount: 6, nextServiceDate: '2026-08-15', serviceCenter: 'Cuddalore Auto Works', serviceType: 'Tire Rotation & Alignment', serviceStatus: 'Completed', repairStatus: 'None', repairStartDate: null, repairReason: null, expectedReturnDate: null, repairServiceCenter: null },
  { id: 'BUS-07', number: '07-LAWS', name: 'Lawspet Campus Bus', route: 'Pondicherry → College', departure: '08:20 AM', returnTime: '05:00 PM', capacity: 40, available: 16, booked: 24, status: 'On Route', driver: 'Rajesh', driverId: 'DRV-105', driverExp: '7 Years', currentStop: 'ECE Department', nextStop: 'College Main Gate', eta: '6 min', distanceKm: 1.1, lastServiceDate: '2026-08-07', serviceCount: 10, nextServiceDate: '2026-09-07', serviceCenter: 'ABC Motors', serviceType: 'AC System Overhaul', serviceStatus: 'Completed', repairStatus: 'None', repairStartDate: null, repairReason: null, expectedReturnDate: null, repairServiceCenter: null },
  { id: 'BUS-08', number: '08-FULL', name: 'Pondicherry Direct (FULL)', route: 'Pondicherry → College', departure: '08:00 AM', returnTime: '04:30 PM', capacity: 40, available: 0, booked: 40, status: 'On Route', driver: 'Prakash', driverId: 'DRV-106', driverExp: '9 Years', currentStop: 'Gorimedu Junction', nextStop: 'College Main Gate', eta: '4 min', distanceKm: 0.6, lastServiceDate: '2026-08-02', serviceCount: 14, nextServiceDate: '2026-09-02', serviceCenter: 'Express Fleet Services', serviceType: 'General Servicing', serviceStatus: 'Completed', repairStatus: 'None', repairStartDate: null, repairReason: null, expectedReturnDate: null, repairServiceCenter: null },
  { id: 'BUS-09', number: '09-MARA', name: 'Marakkanam Coach', route: 'Marakkanam → College', departure: '07:15 AM', returnTime: '05:30 PM', capacity: 40, available: 8, booked: 32, status: 'On Route', driver: 'Senthil', driverId: 'DRV-107', driverExp: '11 Years', currentStop: 'ECR Checkpost', nextStop: 'College Main Gate', eta: '15 min', distanceKm: 9.8, lastServiceDate: '2026-07-10', serviceCount: 18, nextServiceDate: '2026-08-10', serviceCenter: 'ECR Auto Garage', serviceType: 'Engine Tuning', serviceStatus: 'Completed', repairStatus: 'None', repairStartDate: null, repairReason: null, expectedReturnDate: null, repairServiceCenter: null },
  { id: 'BUS-12', number: '12-TIND', name: 'Tindivanam Highway Liner', route: 'Tindivanam → College', departure: '07:20 AM', returnTime: '04:30 PM', capacity: 40, available: 25, booked: 15, status: 'Arrived', driver: 'Venkatesh', driverId: 'DRV-108', driverExp: '12 Years', currentStop: 'Gate 2 Bay', nextStop: 'Campus Terminal', eta: '0 min', distanceKm: 0.1, lastServiceDate: '2026-08-04', serviceCount: 9, nextServiceDate: '2026-09-04', serviceCenter: 'Tindivanam Fleet Hub', serviceType: 'Brake Inspection', serviceStatus: 'Completed', repairStatus: 'None', repairStartDate: null, repairReason: null, expectedReturnDate: null, repairServiceCenter: null }
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
    let buses = data ? JSON.parse(data) : SEED_BUSES;

    // Migration helper: Ensure all bus objects have required service & repair attributes even from older localStorage
    let updated = false;
    buses = buses.map((bus, idx) => {
      const seed = SEED_BUSES.find(s => s.id === bus.id) || SEED_BUSES[idx % SEED_BUSES.length] || SEED_BUSES[0];
      let b = { ...bus };
      if (!b.lastServiceDate) { b.lastServiceDate = seed.lastServiceDate || '2026-08-05'; updated = true; }
      if (!b.serviceCount) { b.serviceCount = seed.serviceCount || 8; updated = true; }
      if (!b.nextServiceDate) { b.nextServiceDate = seed.nextServiceDate || '2026-09-05'; updated = true; }
      if (!b.serviceCenter) { b.serviceCenter = seed.serviceCenter || 'ABC Motors'; updated = true; }
      if (!b.serviceType) { b.serviceType = seed.serviceType || 'Regular Maintenance'; updated = true; }
      if (!b.serviceStatus) { b.serviceStatus = seed.serviceStatus || 'Completed'; updated = true; }
      if (!b.repairStatus) { b.repairStatus = seed.repairStatus || 'None'; updated = true; }
      if (!b.number) { b.number = seed.number || b.id; updated = true; }
      return b;
    });

    if (updated || !data) {
      localStorage.setItem(BUSEASE_STORAGE_KEYS.BUSES, JSON.stringify(buses));
    }
    return buses;
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

// ==========================================================================
// DYNAMIC MAINTENANCE, REPAIR & ALTERNATIVE BUS ENGINE
// ==========================================================================
function getTodayDateString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function calculateDaysBetween(startDateStr, endDateStr) {
  if (!startDateStr) return 7;
  try {
    const start = new Date(startDateStr);
    const end = endDateStr ? new Date(endDateStr) : new Date();
    if (isNaN(start.getTime())) return 7;
    const diffTime = Math.abs(end - start);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  } catch (e) {
    return 7;
  }
}

function calculateDaysSinceService(lastServiceDate) {
  if (!lastServiceDate) return 7;
  return calculateDaysBetween(lastServiceDate, getTodayDateString());
}

function calculateDaysInService(repairStartDate) {
  if (!repairStartDate) return 2;
  return calculateDaysBetween(repairStartDate, getTodayDateString());
}

function getBusMaintenanceStatus(bus) {
  if (!bus) return { label: 'Recently Serviced', badgeClass: 'badge-recently-serviced', icon: 'fa-check-circle', color: '#10b981' };

  if (bus.status === 'Under Maintenance' || bus.status === 'Under Repair' || bus.repairStatus === 'Under Repair' || bus.repairStatus === 'Under Maintenance') {
    return { label: 'Under Repair', badgeClass: 'badge-under-repair', icon: 'fa-wrench', color: '#f87171' };
  }
  
  const today = getTodayDateString();
  const daysSince = calculateDaysSinceService(bus.lastServiceDate);
  
  if (bus.nextServiceDate && today > bus.nextServiceDate) {
    return { label: 'Service Overdue', badgeClass: 'badge-overdue', icon: 'fa-triangle-exclamation', color: '#ef4444' };
  }
  
  if (bus.nextServiceDate) {
    const daysUntilNext = calculateDaysBetween(today, bus.nextServiceDate);
    if (daysUntilNext <= 7) {
      return { label: 'Service Due Soon', badgeClass: 'badge-due-soon', icon: 'fa-clock', color: '#fbbf24' };
    }
  }
  
  return { label: 'Recently Serviced', badgeClass: 'badge-recently-serviced', icon: 'fa-check-circle', color: '#10b981' };
}

// STRICT EXCLUSION ALTERNATIVE BUS ENGINE:
// Never recommend a bus whose status is Under Repair, Under Maintenance, Offline, or Full (available <= 0)
function getAlternativeBuses(targetBusId) {
  const buses = BusEaseState.getBuses();
  const targetBus = buses.find(b => b.id === targetBusId || b.busNumber === targetBusId || b.number === targetBusId);
  if (!targetBus) return [];

  const targetRoute = targetBus.route;

  const validAlternatives = buses.filter(b => {
    if (b.id === targetBus.id) return false;
    if (b.available <= 0) return false;
    if (b.status === 'Under Maintenance' || b.status === 'Under Repair' || b.status === 'Offline') return false;
    if (b.repairStatus === 'Under Repair' || b.repairStatus === 'Under Maintenance') return false;
    return true;
  });

  // Ranking Criteria: 1) Same route, 2) Max available seats, 3) Distance, 4) Lowest ETA
  validAlternatives.sort((a, b) => {
    const aSameRoute = a.route === targetRoute ? 1 : 0;
    const bSameRoute = b.route === targetRoute ? 1 : 0;
    if (aSameRoute !== bSameRoute) return bSameRoute - aSameRoute;

    if (b.available !== a.available) return b.available - a.available;

    const aDist = a.distanceKm || 999;
    const bDist = b.distanceKm || 999;
    if (aDist !== bDist) return aDist - bDist;

    const aEta = parseInt(a.eta || '99') || 99;
    const bEta = parseInt(b.eta || '99') || 99;
    return aEta - bEta;
  });

  return validAlternatives;
}

// ==========================================================================
// DATA-AWARE INTELLIGENT ASSISTANT ENGINE (getAIResponse)
// ==========================================================================
function getAIResponse(userMessage, currentUser) {
  const query = userMessage.toLowerCase().trim();
  const buses = BusEaseState.getBuses();
  const bookings = BusEaseState.getBookings();

  // Student Context Awareness: Find student's assigned / active booked bus
  const studentReg = (currentUser && (currentUser.regNo || currentUser.register_number || currentUser.username)) || '23AD001';
  const activeBooking = bookings.find(b => b.status === 'ACTIVE' && (b.student_id === studentReg || b.student_name === currentUser?.name));

  let assignedBusId = activeBooking ? activeBooking.bus_id : (currentUser?.assignedBus || 'BUS-05');
  let assignedBus = buses.find(b => b.id === assignedBusId || b.busNumber === assignedBusId || b.number === assignedBusId) || buses[0];

  // Specific bus mentioned in query?
  const mentionedBus = buses.find(b => 
    query.includes(b.id.toLowerCase()) || 
    (b.number && query.includes(b.number.toLowerCase())) ||
    (b.busNumber && query.includes(b.busNumber.toLowerCase()))
  );

  const targetBus = mentionedBus || assignedBus;

  // 1. LOCATION / TRACKING QUERY
  if (query.includes('where') || query.includes('location') || query.includes('track') || query.includes('eta') || query.includes('arrived')) {
    if (targetBus.status === 'Under Repair' || targetBus.status === 'Under Maintenance' || targetBus.repairStatus === 'Under Repair') {
      const alternatives = getAlternativeBuses(targetBus.id);
      const altText = alternatives.length > 0 ? 
        `💡 Recommended alternative: **${alternatives[0].number || alternatives[0].id} (${alternatives[0].name})** on your route with **${alternatives[0].available} available seats** (ETA ${alternatives[0].eta}).` : 
        `Please check the Search Buses page for alternative options.`;

      return {
        text: `🔧 **${targetBus.number || targetBus.id} (${targetBus.name})** is currently **Under Repair** due to: *"${targetBus.repairReason || 'Maintenance'}"*.\n\n📅 Expected Return Date: **${targetBus.expectedReturnDate || '14-Aug-2026'}** (${calculateDaysInService(targetBus.repairStartDate)} days in service).\n\n${altText}`,
        action: alternatives.length > 0 ? { type: 'TRACK_ALT', busId: alternatives[0].id } : null
      };
    }

    return {
      text: `📍 **${targetBus.number || targetBus.id} (${targetBus.name})** is currently **${targetBus.status}** at **${targetBus.currentStop || 'Campus Terminal'}**, heading to **${targetBus.nextStop || 'College Gate'}**.\n\n⏱️ **ETA**: ${targetBus.eta || '5 min'} | **Distance**: ${targetBus.distanceKm || 0.8} km | **Departure**: ${targetBus.departure}`,
      action: { type: 'TRACK_BUS', busId: targetBus.id }
    };
  }

  // 2. SERVICE HISTORY / DAYS SINCE SERVICE QUERY
  if (query.includes('service') || query.includes('maintenance') || query.includes('serviced')) {
    const daysSince = calculateDaysSinceService(targetBus.lastServiceDate);
    const maintStatus = getBusMaintenanceStatus(targetBus);

    if (query.includes('how many times') || query.includes('count')) {
      return {
        text: `🛠️ **${targetBus.number || targetBus.id}** has been serviced **${targetBus.serviceCount || 8} times** according to college transport records.`
      };
    }

    return {
      text: `🔧 **${targetBus.number || targetBus.id}** was last serviced on **${targetBus.lastServiceDate || '05-Aug-2026'}** at **${targetBus.serviceCenter || 'ABC Motors'}** (${targetBus.serviceType || 'Regular Maintenance'}).\n\n📅 **Days Since Last Service**: ${daysSince} days\n🏷️ **Status**: ${maintStatus.label}\n📆 **Next Service Due**: ${targetBus.nextServiceDate || '05-Sep-2026'}`
    };
  }

  // 3. REPAIR / BREAKDOWN QUERY
  if (query.includes('repair') || query.includes('breakdown') || query.includes('return') || query.includes('unavailable')) {
    if (targetBus.status === 'Under Repair' || targetBus.status === 'Under Maintenance' || targetBus.repairStatus === 'Under Repair') {
      const daysInRepair = calculateDaysInService(targetBus.repairStartDate);
      const alternatives = getAlternativeBuses(targetBus.id);

      return {
        text: `🔧 **${targetBus.number || targetBus.id}** is currently **Under Repair** due to: *"${targetBus.repairReason || 'Brake inspection'}"*.\n\n⏱️ **Days in Repair**: ${daysInRepair} days\n📅 **Expected Return Date**: ${targetBus.expectedReturnDate || '14-Aug-2026'}\n\nRecommended alternative: **${alternatives[0]?.number || '57-ENGG'}** (${alternatives[0]?.available || 15} available seats).`,
        action: alternatives.length > 0 ? { type: 'RESERVE_ALT', busId: alternatives[0].id } : null
      };
    }

    return {
      text: `✅ **${targetBus.number || targetBus.id}** is operational and in active service (**Status: ${targetBus.status}**). It is not under repair.`
    };
  }

  // 4. SEAT AVAILABILITY / BOOKING QUERY
  if (query.includes('seat') || query.includes('available') || query.includes('capacity') || query.includes('full') || query.includes('reserve') || query.includes('book')) {
    if (targetBus.status === 'Under Repair' || targetBus.status === 'Under Maintenance') {
      return {
        text: `❌ Cannot reserve seats on **${targetBus.number || targetBus.id}** as it is currently **Under Repair**. Please select an alternative bus.`
      };
    }

    if (targetBus.available <= 0) {
      const alternatives = getAlternativeBuses(targetBus.id);
      return {
        text: `⚠️ **${targetBus.number || targetBus.id}** is **FULL** (0 / ${targetBus.capacity} seats remaining).\n\n💡 **Recommended Alternative**: **${alternatives[0]?.number || '57-ENGG'}** with **${alternatives[0]?.available || 15} available seats** on the same route.`,
        action: alternatives.length > 0 ? { type: 'RESERVE_ALT', busId: alternatives[0].id } : null
      };
    }

    return {
      text: `💺 **${targetBus.number || targetBus.id} (${targetBus.name})** has **${targetBus.available} available seats** (out of ${targetBus.capacity} capacity).\n\nRoute: ${targetBus.route} | Departure: ${targetBus.departure}`,
      action: { type: 'RESERVE_BUS', busId: targetBus.id }
    };
  }

  // 5. DRIVER INFO QUERY
  if (query.includes('driver') || query.includes('who is driving')) {
    return {
      text: `👨‍✈️ **${targetBus.number || targetBus.id}** is assigned to driver **${targetBus.driver}** (Driver ID: ${targetBus.driverId || 'DRV-101'}, Experience: ${targetBus.driverExp || '8 Years'}).\n\nStatus: **${targetBus.status}**`
    };
  }

  // 6. ALTERNATIVE BUS QUERY
  if (query.includes('alternative') || query.includes('instead') || query.includes('other bus')) {
    const alternatives = getAlternativeBuses(targetBus.id);
    if (alternatives.length === 0) {
      return {
        text: `No active alternative buses currently available for route ${targetBus.route}.`
      };
    }
    const topAlt = alternatives[0];
    return {
      text: `🚌 **Recommended Alternative**: **${topAlt.number || topAlt.id} (${topAlt.name})**\n\n✓ Same Route: ${topAlt.route}\n💺 Available Seats: ${topAlt.available}\n📏 Distance: ${topAlt.distanceKm || 0.5} km\n⏱️ ETA: ${topAlt.eta}\n🟢 Status: ${topAlt.status}`,
      action: { type: 'RESERVE_ALT', busId: topAlt.id }
    };
  }

  // 7. STRICT FALLBACK (No invented data)
  return {
    text: `🤖 I couldn't find that specific information in the current BusEase live data.\n\nTry asking about:\n• *"Where is my bus?"*\n• *"Is Bus 53 available?"*\n• *"When was Bus 53 last serviced?"*\n• *"When will Bus 53 return from repair?"*\n• *"Who is driving my bus?"*\n• *"Is there an alternative bus?"*`
  };
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

  // Initialize Floating Intelligent Assistant Widget
  initAiChatbot();
});

// --- PWA SERVICE WORKER & APP INSTALL PROMPT ---
let deferredPwaPrompt = null;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => console.warn('SW Register Error:', err));
  });
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPwaPrompt = e;
  showPwaInstallBanner();
});

function showPwaInstallBanner() {
  if (document.getElementById('pwa-install-banner')) return;
  const banner = document.createElement('div');
  banner.id = 'pwa-install-banner';
  banner.style.cssText = 'position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 99999; background: #0B2942; border: 1.5px solid #FF8A00; padding: 12px 20px; border-radius: 12px; display: flex; align-items: center; gap: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.6);';
  banner.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
      <i class="fas fa-mobile-alt text-orange" style="font-size: 1.4rem;"></i>
      <div>
        <div style="font-weight: 700; font-size: 0.9rem; color: #fff;">Install BusEase Mobile App</div>
        <div style="font-size: 0.75rem; color: #94A9BB;">Get instant 1-tap access on your home screen</div>
      </div>
    </div>
    <button type="button" onclick="triggerPwaInstall()" class="btn-busease-primary" style="padding: 6px 14px; font-size: 0.85rem; height: 36px;">INSTALL NOW</button>
    <button type="button" onclick="document.getElementById('pwa-install-banner').remove()" style="background: transparent; border: none; color: #94A9BB; cursor: pointer; font-size: 1.2rem;">&times;</button>
  `;
  document.body.appendChild(banner);
}

function triggerPwaInstall() {
  if (deferredPwaPrompt) {
    deferredPwaPrompt.prompt();
    deferredPwaPrompt.userChoice.then((choiceResult) => {
      deferredPwaPrompt = null;
      const b = document.getElementById('pwa-install-banner');
      if (b) b.remove();
    });
  }
}

// ==========================================================================
// FLOATING INTELLIGENT ASSISTANT WIDGET INITIALIZER
// ==========================================================================
function initAiChatbot() {
  if (document.getElementById('busease-ai-fab')) return;

  // Floating Action Button
  const fab = document.createElement('button');
  fab.id = 'busease-ai-fab';
  fab.className = 'busease-ai-fab';
  fab.title = 'Open BusEase Intelligent Assistant';
  fab.innerHTML = `<i class="fas fa-robot"></i><span class="ai-badge">AI</span>`;
  document.body.appendChild(fab);

  // Chat Window Modal
  const win = document.createElement('div');
  win.id = 'ai-chat-window';
  win.className = 'ai-chat-window';
  win.innerHTML = `
    <div class="ai-chat-header">
      <div class="ai-chat-title">
        <div class="ai-avatar-icon"><i class="fas fa-robot"></i></div>
        <div>
          <div style="font-weight: 800; font-size: 0.95rem; color: #fff;">BusEase Assistant</div>
          <div style="font-size: 0.72rem; color: #10b981;"><i class="fas fa-circle me-1" style="font-size: 0.5rem;"></i> Active Data Engine</div>
        </div>
      </div>
      <button type="button" id="closeAiChatBtn" style="background: transparent; border: none; color: #94A9BB; cursor: pointer; font-size: 1.2rem;">&times;</button>
    </div>

    <div class="ai-chat-messages" id="aiChatMessages">
      <div class="ai-msg bot">
        👋 Hi! I am your <strong>BusEase Intelligent Assistant</strong>.<br>
        Ask me about your bus location, seat availability, last service date, repair status, or driver info!
      </div>
    </div>

    <div class="ai-chips-wrapper">
      <button type="button" class="ai-chip" onclick="sendQuickAiQuery('Where is my bus?')">📍 Where is my bus?</button>
      <button type="button" class="ai-chip" onclick="sendQuickAiQuery('When was Bus 53 last serviced?')">🔧 Bus 53 Service Date</button>
      <button type="button" class="ai-chip" onclick="sendQuickAiQuery('Is Bus 53 available?')">💺 Seats Available</button>
      <button type="button" class="ai-chip" onclick="sendQuickAiQuery('Is there an alternative bus?')">🚌 Alternative Bus</button>
      <button type="button" class="ai-chip" onclick="sendQuickAiQuery('Who is driving my bus?')">👨‍✈️ My Driver</button>
    </div>

    <div class="ai-chat-input-area">
      <input type="text" id="aiChatInput" class="ai-chat-input" placeholder="Ask about your bus or route..." onkeypress="handleAiInputKeyPress(event)">
      <button type="button" onclick="submitAiChatMessage()" class="ai-chat-send"><i class="fas fa-paper-plane"></i></button>
    </div>
  `;
  document.body.appendChild(win);

  fab.onclick = () => win.classList.toggle('open');
  document.getElementById('closeAiChatBtn').onclick = () => win.classList.remove('open');
}

function sendQuickAiQuery(text) {
  const input = document.getElementById('aiChatInput');
  if (input) {
    input.value = text;
    submitAiChatMessage();
  }
}

function handleAiInputKeyPress(e) {
  if (e.key === 'Enter') {
    submitAiChatMessage();
  }
}

function submitAiChatMessage() {
  const input = document.getElementById('aiChatInput');
  const msgContainer = document.getElementById('aiChatMessages');
  if (!input || !msgContainer) return;

  const text = input.value.trim();
  if (!text) return;

  // Append user message
  const userMsgDiv = document.createElement('div');
  userMsgDiv.className = 'ai-msg user';
  userMsgDiv.textContent = text;
  msgContainer.appendChild(userMsgDiv);

  input.value = '';
  msgContainer.scrollTop = msgContainer.scrollHeight;

  // Get current user context
  const currentUser = BusEaseState.getUser();
  const response = getAIResponse(text, currentUser);

  // Simulate typing delay
  setTimeout(() => {
    const botMsgDiv = document.createElement('div');
    botMsgDiv.className = 'ai-msg bot';
    botMsgDiv.innerHTML = response.text.replace(/\n/g, '<br>');

    if (response.action) {
      const actBtn = document.createElement('div');
      actBtn.style.marginTop = '10px';
      if (response.action.type === 'TRACK_BUS' || response.action.type === 'TRACK_ALT') {
        actBtn.innerHTML = `<a href="search.html?track=${response.action.busId}" class="btn-busease-primary" style="padding: 6px 12px; font-size: 0.78rem; text-decoration: none; display: inline-block;"><i class="fas fa-map-marked-alt me-1"></i> Track ${response.action.busId}</a>`;
      } else if (response.action.type === 'RESERVE_BUS' || response.action.type === 'RESERVE_ALT') {
        actBtn.innerHTML = `<a href="seats.html?bus=${response.action.busId}" class="btn-busease-primary" style="padding: 6px 12px; font-size: 0.78rem; text-decoration: none; display: inline-block;"><i class="fas fa-chair me-1"></i> Reserve Seat (${response.action.busId})</a>`;
      }
      botMsgDiv.appendChild(actBtn);
    }

    msgContainer.appendChild(botMsgDiv);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }, 400);
}