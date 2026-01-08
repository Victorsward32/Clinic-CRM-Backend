🏥 Clinic CRM Backend – API Documentation

A production-ready backend system for managing patients, queues, appointments, visits, reports, reminders, and user authentication for a small clinic or private practice.

This repository focuses on clean modular APIs designed to scale with clinic growth.

🔗 Base URL
http://localhost:3000/clinic-crm-api


All routes are prefixed with:

app.use("/clinic-crm-api", router);

🔐 Authentication Flow (ENTRY POINT)

Authentication is JWT-based.
All protected routes require a valid token.

1️⃣ Register
POST /auth/register


Creates a new doctor / clinic staff account.

Request Body

{
  "name": "Dr John",
  "email": "doctor@test.com",
  "password": "123456"
}

2️⃣ Login
POST /auth/login


Response

{
  "token": "JWT_TOKEN"
}


🔐 Use this token for all protected APIs

Header Format

Authorization: Bearer JWT_TOKEN

3️⃣ Forgot Password (OTP via Email)
POST /auth/forget-password


Request Body

{
  "email": "doctor@test.com"
}


📧 Sends a 6-digit OTP to the registered email.

4️⃣ Reset Password
POST /auth/reset-password


Request Body

{
  "email": "doctor@test.com",
  "otp": "123456",
  "newPassword": "newPass123"
}

👤 USER MODULE
Upload / Update Profile Image
POST /user


Headers

Authorization: Bearer JWT_TOKEN


Body (form-data)

Key	Type	Description
image	File	Profile image

📌 Image is uploaded to Cloudinary, and the URL is stored in the database.

Change Password (Logged-in User)
POST /user/change-password


Request Body

{
  "oldPassword": "123456",
  "newPassword": "newPass123"
}

🧍 PATIENT MODULE
1️⃣ Add Patient
POST /patient


Request Body

{
  "name": "Rahul Sharma",
  "age": 32,
  "gender": "Male",
  "phone": "9876543210",
  "address": "Mumbai"
}

2️⃣ List All Patients
GET /patient


📊 Used for dashboard patient listing.

3️⃣ Get Patient by ID
GET /patient/:id


📁 Used when opening a patient profile.

⏳ QUEUE MODULE (CORE CLINIC FLOW)

Manages the real-time patient waiting system.

1️⃣ Add Patient to Queue
POST /queue


Request Body

{
  "patientId": "PATIENT_ID"
}


➡ Automatically assigns a queue number.

2️⃣ List Current Queue
GET /queue


➡ Displays the active waiting list.

3️⃣ Update Queue Status
PATCH /queue/:id


Request Body

{
  "status": "COMPLETED"
}


Allowed Status Values

WAITING

IN_PROGRESS

COMPLETED

CANCELLED

📅 APPOINTMENT MODULE

Used for future visits and scheduled consultations.

Create Appointment
POST /appointment


Request Body

{
  "patientId": "PATIENT_ID",
  "date": "2026-01-10",
  "time": "11:30 AM"
}

List Appointments
GET /appointment

🩺 VISIT MODULE (MEDICAL RECORDS)

Each doctor consultation creates one visit record.

1️⃣ Create Visit
POST /visit


Request Body

{
  "patientId": "PATIENT_ID",
  "complaint": "Fever",
  "diagnosis": "Viral",
  "prescription": "Paracetamol"
}

2️⃣ Get Patient Visit History
GET /visit/:id


📌 id = patientId

➡ Displays complete medical history timeline.

📄 REPORT MODULE (PDF / IMAGE UPLOADS)

Supports medical reports, prescriptions, lab results.

Upload Patient Report
POST /report


Body (form-data)

Key	Type	Description
file	File	PDF / Image
patientId	Text	Patient ID

📦 Files are stored securely on Cloudinary.

Get Patient Reports
GET /report/:patientId


➡ Used in Patient Profile → Reports Section.

⏰ REMINDER MODULE (PARTIALLY IMPLEMENTED)
Add Reminder
POST /reminders


Request Body

{
  "patientId": "PATIENT_ID",
  "message": "Follow-up after 7 days",
  "date": "2026-01-15"
}


📌 Currently stored in DB only
📌 SMS / WhatsApp not enabled due to funding constraints

🔁 COMPLETE APPLICATION FLOW
Register / Login
      ↓
Add Patient
      ↓
Add to Queue
      ↓
Doctor Consultation
      ↓
Create Visit
      ↓
Upload Reports
      ↓
(Optional) Appointment / Reminder

🔐 SECURITY NOTES

JWT-based authentication

Route protection via middleware

Password hashing using bcrypt

OTP-based password reset flow

Cloudinary for secure file storage

🧪 POSTMAN TESTING ORDER (IMPORTANT)

Auth → Login

Patient → Add

Queue → Add

Visit → Create

Report → Upload

Queue → Update Status

🧩 TECH STACK

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Cloudinary

Nodemailer

Multer

🚧 FUTURE ENHANCEMENTS

SMS / WhatsApp reminders

Role-based access control

Analytics dashboard

Real-time queue using Socket.IO
