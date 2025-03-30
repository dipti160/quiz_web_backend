# Quiz Web Application Backend ⚙️

This is the backend for the **Quiz Web Application**, which supports role-based functionalities for Admin, Instructor, and Student. The backend is built using **Express**, connects to a **MySQL** database using **Sequelize**, and includes JWT authentication and bcrypt for secure password hashing.

## Table of Contents
- [Project Description](#project-description)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Endpoints](#endpoints)
- [Dependencies](#dependencies)

## Project Description

This backend handles all operations related to the quiz application:
- **Authentication**: JWT-based login system for secure user management.
- **Role Management**: Three roles—Admin, Instructor, and Student—with role-based access control.
- **Database Operations**: Manages quizzes, users, and student data stored in a MySQL database.
- **Security**: Passwords are hashed using bcrypt to ensure secure user registration and login.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/dipti160/quiz_web_backend.git
    cd quiz_web_backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create and configure your MySQL database as per the models defined in `./models`.

4. Add your database configuration in `./database/index.js`.

## Available Scripts

In the project directory, you can run the following commands:

### `npm start`

Starts the server in production mode.

### `npm run dev`

Starts the server in development mode using `nodemon` for auto-reloading.

### `npm test`

Runs tests (if defined).

## Endpoints

### `POST /auth/register`

Registers a new user.

### `POST /auth/login`

Logs in a user and returns a JWT token.

### `GET /quizzes`

Fetches all available quizzes.

### `GET /quizzes/:id`

Fetches details for a specific quiz.

### `POST /quizzes`

Creates a new quiz (Instructor role required).

### `POST /quizzes/:id/questions`

Creates questions for a specific quiz (Instructor role required).

*For more API documentation, refer to the `routes` directory.*

## Dependencies

- **express**: 4.18.2
- **sequelize**: 6.33.0
- **mysql2**: 3.6.1
- **jsonwebtoken**: 9.0.2
- **bcrypt**: 5.1.1
- **cors**: 2.8.5
- **body-parser**: 1.20.2

## Contact

Created by Dipti Rathod (https://github.com/dipti160) – feel free to reach out!
