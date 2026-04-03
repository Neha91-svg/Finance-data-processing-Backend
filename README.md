# Finance Data Processing Backend

A clean, production-ready Node.js backend built with Express and MongoDB for financial data management, featuring robust authentication, transaction tracking, and analytical dashboards.

## 🚀 Features

- **Authentication & User Management**:
  - Secure Registration and Login with JWT.
  - Role-Based Access Control (RBAC): Admin, Analyst, and Viewer roles.
  - Password hashing with `bcryptjs`.
  - Account status management (Active/Deactivated).

- **Transaction Management**:
  - Full CRUD operations for income and expenses.
  - Soft delete functionality (`isDeleted` flag).
  - Advanced filtering (by type, category) and pagination.

- **Dashboard Analytics**:
  - High-performance financial summaries using MongoDB aggregation.
  - Category-wise spending/earning breakdown.
  - Monthly income vs. expense trends.

- **Security & Validation**:
  - Centralized error handling for Mongoose and API errors.
  - Input validation for all critical endpoints using `express-validator`.
  - CORS enabled for frontend integration.

- **API Documentation**:
  - Interactive Swagger (OpenAPI) documentation at `/api-docs`.

## 🛠️ Tech Stack

- **Runtime**: Node.js (ES6+ Modules)
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Security**: JWT, Bcryptjs
- **Validation**: Express-Validator
- **Documentation**: Swagger UI Express

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas)

## ⚙️ Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Neha91-svg/Finance-data-processing-Backend.git
   cd Finance-data-processing-Backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   JWT_EXPIRE=30d
   NODE_ENV=development
   ```

## 🚀 Running the App

- **Development Mode** (with nodemon):
  ```bash
  npm run dev
  ```

- **Production Mode**:
  ```bash
  npm start
  ```

## 📍 API Documentation

Once the server is running, you can access the interactive API guide at:
👉 **`http://localhost:5000/api-docs`**

## 📂 Project Structure

```text
/src
  /config         # Database and Swagger configurations
  /controllers    # Request handlers/Business logic
  /middleware     # Global error, auth, and validation middlewares
  /models         # Mongoose schemas (User, Transaction)
  /routes         # API endpoint definitions
  /services       # Decoupled business logic (Analytic queries)
  /utils          # Helper functions (Token generation)
app.js            # Express app initialization
server.js         # Entry point (Server start)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.
