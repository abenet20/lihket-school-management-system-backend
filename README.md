# Lihket School Management System Backend

This is the backend for **Lihket School Management System** – a Node.js RESTful API for managing users, teachers, admins, and all main school functions. Built with Express and Sequelize ORM for a flexible, scalable, and modern school management foundation.

## Features

- User, Teacher, and Admin authentication (via `/api/auth`)
- Secure RESTful API endpoints for:
  - Class, subject, and timetable management
  - Student enrollment and profile management
  - Grades and attendance tracking
  - Administrative control (via `/api/admin`)
  - Teacher resource management (via `/api/teacher`)
- Robust, modular code structure
- CORS-enabled for easy frontend integration

## Tech Stack

- **Node.js** and **Express** for the backend server and API
- **Sequelize** (ORM) for database interactions (typically with MySQL, PostgreSQL, or SQLite)
- **dotenv** for configuration and environment variables
- **bcrypt** for password hashing and authentication
- **CORS** for secure cross-origin API access

## Getting Started

### Prerequisites

- Node.js (v14 or newer recommended)
- npm (Node package manager)
- MySQL, PostgreSQL, or SQLite database (configurable in `.env` and `config/database.js`)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/abenet20/lihket-school-management-system-backend.git
    cd lihket-school-management-system-backend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Configure your database and environment variables. Copy `.env.example` to `.env` and fill out your credentials:

    ```
    DB_HOST=localhost
    DB_NAME=your_database
    DB_USER=your_db_user
    DB_PASS=your_db_password
    DB_DIALECT=mysql           # Or postgres/sqlite
    ```

4. Run database migrations if needed, or let Sequelize create tables via `sync`.

5. Start the server:

    ```bash
    node server.js
    ```

    The server will run by default at `http://localhost:8000`.

## API Endpoints

- **Authentication:** `/api/auth/*`  
- **Admin:** `/api/admin/*`
- **Teacher:** `/api/teacher/*`

Check your frontend or OpenAPI documentation for endpoint details.

## Project Structure

```
.
├── server.js
├── package.json
├── config/
│   └── database.js
├── controllers/
├── middleware/
├── models/
├── routes/
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   └── teacherRoutes.js
└── ...
```

## Deployment

- Edit allowed CORS domains in `server.js` as needed.
- Use process managers like PM2 or Docker for production deployments.

## Contributing

Pull requests are welcome. For major changes, open an issue to discuss what you want to change.

## License

Open source, [MIT License](LICENSE).

---

**Maintainer:** [abenet20](https://github.com/abenet20)
