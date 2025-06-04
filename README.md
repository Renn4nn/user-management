# User Management System

## 1. Introduction

This is a full-stack User Management System designed to allow for the registration, viewing, and deletion of users. The frontend is built with React and Vite, providing a dynamic and responsive user interface. The backend is developed with Node.js and Express, interacting with a MySQL database to store and manage user data.

Key features:
- User registration with name, email, CPF, telephone, and date of birth.
- Display of registered users in a clear, formatted table.
- Ability to delete users from the system.
- Input formatting for CPF and telephone numbers for better user experience.
- Date formatting for display.

## 2. Installation Tutorial

To get this project up and running on your local machine, follow these steps:

### Prerequisites

- Node.js (which includes npm or yarn) installed on your system.
- MySQL Server installed and running.

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

3.  **Configure environment variables:**
    Create a `.env` file in the `backend` directory. Copy the contents of `.env.example` (if provided) or create it from scratch with the following variables, adjusting them to your MySQL setup:
    ```env
    HOST=your_mysql_host (e.g., localhost)
    USER=your_mysql_user (e.g., root)
    PASSWORD=your_mysql_password
    DATABASE=your_database_name (e.g., user_management_db)
    PORT=3001 (or any port you prefer for the backend server, ensure it matches frontend calls if changed from default 3000)
    ```

4.  **Set up the MySQL database and table:**
    Connect to your MySQL server and run the SQL script provided in section 3 below to create the necessary database (if you haven't already) and the `users` table.

5.  **Start the backend server:**
    Using npm:
    ```bash
    npm start
    ```
    Or using yarn:
    ```bash
    yarn start
    ```
    The backend server should now be running (typically on `http://localhost:3000` or the `PORT` you specified).

### Frontend Setup

1.  **Navigate to the project root directory (where the frontend `package.json` is located, usually the main project folder if it's a Vite setup):**
    ```bash
    cd .. 
    # (If you are in the backend folder, otherwise navigate to the project root)
    ```
    Or, if your frontend is in a specific subdirectory like `frontend`:
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

3.  **Start the frontend development server:**
    Using npm:
    ```bash
    npm run dev
    ```
    Or using yarn:
    ```bash
    yarn dev
    ```
    The application should now be accessible in your browser, typically at `http://localhost:5173` (Vite's default) or another port specified in the output.

## 3. MySQL Database Setup

This project requires a MySQL database to store user information.

**Configuration:**

As mentioned in the backend setup, you must create a `.env` file in the `backend` directory and populate it with your MySQL connection details. The backend uses these credentials to connect to your database.

**Example `.env` file content for the backend:**
```env
HOST=localhost
USER=root
PASSWORD=your_secret_password
DATABASE=user_management_db
PORT=3000
```

**Table Schema:**

Connect to your MySQL instance (using a tool like MySQL Workbench, DBeaver, or the command line) and execute the following SQL command to create the `users` table within your chosen database:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    cpf VARCHAR(14) NOT NULL UNIQUE,     -- Stores raw digits, frontend formats to XXX.XXX.XXX-XX
    telephone VARCHAR(30) NOT NULL, -- Stores raw digits, frontend formats
    data_birth DATE NOT NULL
);
```

**Note on `cpf` and `telephone` fields:** The database stores the raw digits for CPF (e.g., `12345678901`) and telephone. The frontend application handles the formatting (e.g., `123.456.789-01` for CPF and `(XX) XXXXX-XXXX` for telephone) for display and user input.

---

Once these steps are completed, you should have a fully functional User Management System running locally.