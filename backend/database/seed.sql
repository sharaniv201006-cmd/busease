USE busease_db;

INSERT INTO students (name, register_number, email) VALUES
('Asha', '23AD001', 'asha@college.edu'),
('Karthik', '23AD002', 'karthik@college.edu'),
('Meera', '23AD003', 'meera@college.edu'),
('Rahul', '23AD004', 'rahul@college.edu'),
('Priya', '23AD005', 'priya@college.edu');

INSERT INTO buses (bus_number, route, destination, departure_time, total_seats, available_seats, status) VALUES
('Bus 1', 'Pondicherry', 'Pondicherry', '08:00 AM', 20, 15, 'active'),
('Bus 2', 'Villupuram', 'Villupuram', '09:15 AM', 20, 15, 'active'),
('Bus 3', 'Cuddalore', 'Cuddalore', '04:30 PM', 20, 15, 'active'),
('Bus 4', 'Tindivanam', 'Tindivanam', '07:20 AM', 20, 15, 'active'),
('Bus 5', 'Marakkanam', 'Marakkanam', '05:45 PM', 20, 15, 'active');

INSERT INTO seats (bus_id, seat_number, status)
SELECT b.id, n.n, CASE WHEN n.n IN (1, 3, 7, 12, 15) THEN 'booked' ELSE 'available' END
FROM buses b
CROSS JOIN (
    SELECT 1 AS n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5
    UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10
    UNION ALL SELECT 11 UNION ALL SELECT 12 UNION ALL SELECT 13 UNION ALL SELECT 14 UNION ALL SELECT 15
    UNION ALL SELECT 16 UNION ALL SELECT 17 UNION ALL SELECT 18 UNION ALL SELECT 19 UNION ALL SELECT 20
) n;

INSERT INTO bookings (student_id, bus_id, seat_id, booking_date, status)
SELECT 1, b.id, s.id, CURDATE(), 'active'
FROM buses b
JOIN seats s ON s.bus_id = b.id
WHERE b.bus_number = 'Bus 1' AND s.seat_number = 1;

UPDATE buses
SET available_seats = 20 - (
    SELECT COUNT(*)
    FROM seats s
    WHERE s.bus_id = buses.id AND s.status = 'booked'
)
WHERE bus_number IN ('Bus 1', 'Bus 2', 'Bus 3', 'Bus 4', 'Bus 5');
