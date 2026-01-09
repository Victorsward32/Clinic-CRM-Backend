# 🏥 Clinic CRM Backend

A **scalable, secure backend API** for managing clinic operations such as **authentication, patients, doctors, appointments, queues, and roles**. Built with **Node.js, Express, MongoDB**, and **JWT-based authentication**.

> 🚀 Designed for real-world clinics & hospital workflows

---

## ✨ Features

* 🔐 **Authentication & Authorization** (JWT, Roles: Admin, Doctor, Staff)
* 👤 **User Management** (Register, Login, Forgot/Reset Password)
* 🧑‍⚕️ **Patient Management** (CRUD)
* 🩺 **Doctor Management**
* ⏱️ **Queue & Appointment System**
* 📊 **Clinic Dashboard APIs** (Upcoming)
* 🧾 **Validation & Error Handling**
* 📁 **Clean MVC Architecture**

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB + Mongoose
* **Auth:** JWT (JSON Web Token)
* **Security:** bcrypt, dotenv
* **Dev Tools:** Nodemon

---

## 📂 Project Structure

```
clinic-crm-backend/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── jwt.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── patient.controller.js
│   │   └── queue.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── role.middleware.js
│   ├── models/
│   │   ├── User.model.js
│   │   ├── Patient.model.js
│   │   └── Queue.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── patient.routes.js
│   │   └── queue.routes.js
│   ├── utils/
│   │   └── response.js
│   └── server.js
├── .env.example
├── package.json
├── README.md
└── .gitignore
```

---

## 🔑 Authentication Flow

1. User logs in
2. Server generates **JWT token**
3. Token is sent in headers:

```
Authorization: Bearer <token>
```

4. Protected routes validate token via middleware

---

## 🌐 API Base URL

```
http://localhost:3000/api
```

---

## 📌 API Endpoints (Current)

### Auth

| Method | Endpoint              | Description     |
| ------ | --------------------- | --------------- |
| POST   | /auth/register        | Register user   |
| POST   | /auth/login           | Login user      |
| POST   | /auth/forgot-password | Forgot password |
| POST   | /auth/reset-password  | Reset password  |

### Patients

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| POST   | /patients     | Create patient    |
| GET    | /patients     | Get all patients  |
| GET    | /patients/:id | Get patient by ID |
| PUT    | /patients/:id | Update patient    |
| DELETE | /patients/:id | Delete patient    |

### Queue

| Method | Endpoint | Description          |
| ------ | -------- | -------------------- |
| POST   | /queue   | Add patient to queue |
| GET    | /queue   | Get today queue      |

---

## ⚙️ Environment Variables

Create a `.env` file based on `.env.example`

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/clinic-crm
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=8h
```

---

## ▶️ Run Locally

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Run in production
npm start
```

---

## 🧪 Upcoming Features

* 📅 Appointment Scheduling
* 📊 Analytics Dashboard APIs
* 🔔 Notifications
* 🧑‍💼 Staff Role Permissions
* 🧪 Unit & Integration Tests

---

## 🤝 Contribution

Contributions are welcome!

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/xyz`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/xyz`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Sumit Jadhav**
Full Stack Developer (React, React Native, Node.js)

---

## ⭐ Support

If you like this project, please ⭐ the repository to support development!
