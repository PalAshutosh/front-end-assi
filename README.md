# Scalable Web App with Authentication & Dashboard

## Overview
This project is a full-stack web application featuring secure JWT authentication, a responsive user dashboard, and a CRUD interface for managing Tasks. It highlights a clean separation between frontend and backend, using React (Vite) and Node.js (Express) with a MySQL database.

## Tech Stack
- **Frontend**: React.js, Vite, Bootstrap 5, React Bootstrap, Axios
- **Backend**: Node.js, Express.js, Sequelize (ORM)
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens), bcryptjs

## Prerequisites
- Node.js (v14+)
- MySQL Server

## Setup Instructions

### 1. Database Setup
Make sure you have a MySQL server running. Create a database named `webapp_db`.
```sql
CREATE DATABASE webapp_db;
```
*Note: You can configure the database credentials in `backend/.env`.*

### 2. Run the Application
You can run both the backend and frontend simultaneously from the root directory:

```bash
npm run dev
```

Alternatively, you can run them separately:
1. **Backend**:
   ```bash
   cd backend
   npm run dev
   ```
2. **Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

The app will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## Features
- **Authentication**: Register and Login with email/password. Passwords are hashed.
- **Protected Routes**: Dashboard is only accessible to logged-in users.
- **Dashboard**:
  - View list of tasks.
  - Search tasks by title.
  - Filter tasks by status (Pending, In Progress, Completed).
  - Add, Edit, and Delete tasks via a modal interface.
- **Responsiveness**: Fully responsive UI using Bootstrap.

## API Endpoints
- `POST /api/auth/register`: Register new user
- `POST /api/auth/login`: Login user
- `GET /api/auth/profile`: Get user profile (Protected)
- `GET /api/tasks`: Get all tasks (Protected)
- `POST /api/tasks`: Create task (Protected)
- `PUT /api/tasks/:id`: Update task (Protected)
- `DELETE /api/tasks/:id`: Delete task (Protected)
