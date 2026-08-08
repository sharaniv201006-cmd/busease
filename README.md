# BusEase – Smart College Transportation Management System

## Project Overview
BusEase is a simple college transportation prototype that allows students to:

1. Login
2. View available buses
3. View seat layout
4. Reserve a seat
5. Receive booking confirmation

The backend is built with Node.js, Express.js, MySQL, and MySQL2.

## Backend Folder
The backend is located in:

- `backend/server.js`
- `backend/package.json`
- `backend/.env`
- `backend/database.js`
- `backend/routes/`
- `backend/controllers/`
- `backend/database/schema.sql`
- `backend/database/seed.sql`

## Steps to Run

### 1. Install Node.js
Download and install Node.js from:
https://nodejs.org/

### 2. Install MySQL
Install MySQL Server and keep the root password ready.

### 3. Create database
Open MySQL and run:

```sql
CREATE DATABASE busease_db;
```

### 4. Run schema.sql
From the MySQL command line or MySQL Workbench, run:

```sql
SOURCE backend/database/schema.sql;
```

### 5. Run seed.sql
Run the demo data script:

```sql
SOURCE backend/database/seed.sql;
```

### 6. Configure .env
Update `backend/.env` with your local MySQL settings:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=busease_db
DB_PORT=3306
PORT=5000
```

### 7. Install dependencies
From the project root:

```bash
cd backend
npm install
```

### 8. Start backend

```bash
npm run dev
```

### 9. Backend URL

```text
http://localhost:5000
```

### 10. Test health endpoint
Open this URL in the browser:

```text
http://localhost:5000/api/health
```

## API Endpoints

- `POST /api/login`
- `GET /api/buses`
- `GET /api/buses/:id`
- `GET /api/buses/:id/seats`
- `GET /api/buses/alternative/:destination`
- `POST /api/bookings`
- `GET /api/bookings/student/:studentId`
- `DELETE /api/bookings/:id`

## Frontend Connection
The existing frontend now talks to the backend using `fetch()` at:

```text
http://localhost:5000/api
```
