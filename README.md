<h1>🏥 Clinic CRM Backend – API Documentation</h1>

<p>
A complete backend system for managing <strong>patients, queue, appointments, visits, reports, reminders</strong>,
and <strong>user authentication</strong> for a small clinic.
</p>

<hr />

<h2>🔗 Base URL</h2>

<pre>
http://localhost:3000/clinic-crm-api
</pre>

<hr />

<h2>🔐 Authentication Flow (ENTRY POINT)</h2>

<h3>1️⃣ Register</h3>

<pre>
POST /auth/register
</pre>

<p>Creates a new doctor/staff account.</p>

<strong>Request Body</strong>
<pre>
{
  "name": "Dr John",
  "email": "doctor@test.com",
  "password": "123456"
}
</pre>

<hr />

<h3>2️⃣ Login</h3>

<pre>
POST /auth/login
</pre>

<strong>Response</strong>
<pre>
{
  "token": "JWT_TOKEN"
}
</pre>

<p>
<strong>Note:</strong> This token is required for all protected APIs.
</p>

<strong>Authorization Header (for protected routes)</strong>
<pre>
Authorization: Bearer JWT_TOKEN
</pre>

<hr />

<h3>3️⃣ Forgot Password (OTP via Email)</h3>

<pre>
POST /auth/forget-password
</pre>

<strong>Request Body</strong>
<pre>
{
  "email": "doctor@test.com"
}
</pre>

<p>➡ Sends a <strong>6-digit OTP</strong> to the registered email.</p>

<hr />

<h3>4️⃣ Reset Password</h3>

<pre>
POST /auth/reset-password
</pre>

<strong>Request Body</strong>
<pre>
{
  "email": "doctor@test.com",
  "otp": "123456",
  "newPassword": "newPass123"
}
</pre>

<hr />

<h2>👤 User Module</h2>

<h3>Upload / Update Profile Image</h3>

<pre>
POST /user
</pre>

<strong>Headers</strong>
<pre>
Authorization: Bearer TOKEN
</pre>

<strong>Body (form-data)</strong>
<table>
  <tr>
    <th>Key</th>
    <th>Type</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>image</td>
    <td>File</td>
    <td>profile.jpg</td>
  </tr>
</table>

<p>📌 Image is stored in <strong>Cloudinary</strong> and URL is saved in DB.</p>

<hr />

<h3>Change Password (Logged-in User)</h3>

<pre>
POST /user/change-password
</pre>

<strong>Request Body</strong>
<pre>
{
  "oldPassword": "123456",
  "newPassword": "newPass123"
}
</pre>

<hr />

<h2>🧍 Patient Module</h2>

<h3>1️⃣ Add Patient</h3>

<pre>
POST /patient
</pre>

<strong>Request Body</strong>
<pre>
{
  "name": "Rahul Sharma",
  "age": 32,
  "gender": "Male",
  "phone": "9876543210",
  "address": "Mumbai"
}
</pre>

<hr />

<h3>2️⃣ List Patients</h3>

<pre>
GET /patient
</pre>

<p>➡ Used for dashboard patient listing.</p>

<hr />

<h3>3️⃣ Get Patient by ID</h3>

<pre>
GET /patient/:id
</pre>

<p>➡ Used when opening a patient profile.</p>

<hr />

<h2>⏳ Queue Module (Core Clinic Flow)</h2>

<h3>1️⃣ Add Patient to Queue</h3>

<pre>
POST /queue
</pre>

<strong>Request Body</strong>
<pre>
{
  "patientId": "PATIENT_ID"
}
</pre>

<p>➡ Patient is assigned a queue number.</p>

<hr />

<h3>2️⃣ List Queue</h3>

<pre>
GET /queue
</pre>

<p>➡ Displays the current waiting list.</p>

<hr />

<h3>3️⃣ Update Queue Status</h3>

<pre>
PATCH /queue/:id
</pre>

<strong>Request Body</strong>
<pre>
{
  "status": "COMPLETED"
}
</pre>

<strong>Available Status Values</strong>
<ul>
  <li>WAITING</li>
  <li>IN_PROGRESS</li>
  <li>COMPLETED</li>
  <li>CANCELLED</li>
</ul>

<hr />

<h2>📅 Appointment Module</h2>

<h3>Create Appointment</h3>

<pre>
POST /appointment
</pre>

<strong>Request Body</strong>
<pre>
{
  "patientId": "PATIENT_ID",
  "date": "2026-01-10",
  "time": "11:30 AM"
}
</pre>

<p>➡ Used for scheduling future visits.</p>

<hr />

<h3>List Appointments</h3>

<pre>
GET /appointment
</pre>

<hr />

<h2>🩺 Visit Module (Medical Records)</h2>

<h3>1️⃣ Add Visit</h3>

<pre>
POST /visit
</pre>

<strong>Request Body</strong>
<pre>
{
  "patientId": "PATIENT_ID",
  "complaint": "Fever",
  "diagnosis": "Viral",
  "prescription": "Paracetamol"
}
</pre>

<p>➡ Each consultation is stored as a separate visit.</p>

<hr />

<h3>2️⃣ List Patient Visits</h3>

<pre>
GET /visit/:id
</pre>

<p>➡ <code>id</code> represents <strong>patientId</strong>.</p>
<p>➡ Used to show complete medical history timeline.</p>

<hr />

<h2>📄 Report Module (PDF / Image Uploads)</h2>

<h3>Upload Patient Report</h3>

<pre>
POST /report
</pre>

<strong>Body (form-data)</strong>
<table>
  <tr>
    <th>Key</th>
    <th>Type</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>file</td>
    <td>File</td>
    <td>blood-test.pdf</td>
  </tr>
  <tr>
    <td>patientId</td>
    <td>Text</td>
    <td>PATIENT_ID</td>
  </tr>
</table>

<p>➡ Files are stored securely in <strong>Cloudinary</strong>.</p>

<hr />

<h3>Get Patient Reports</h3>

<pre>
GET /report/:patientId
</pre>

<p>➡ Used in patient profile → reports section.</p>

<hr />

<h2>⏰ Reminder Module (Partially Implemented)</h2>

<h3>Add Reminder</h3>

<pre>
POST /reminders
</pre>

<strong>Request Body</strong>
<pre>
{
  "patientId": "PATIENT_ID",
  "message": "Follow-up after 7 days",
  "date": "2026-01-15"
}
</pre>

<ul>
  <li>Stored in database only</li>
  <li>SMS / WhatsApp not enabled (funding limitation)</li>
</ul>

<hr />

<h2>🔁 Complete Application Flow</h2>

<pre>
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
Optional Appointment / Reminder
</pre>

<hr />

<h2>🔐 Security</h2>

<ul>
  <li>JWT-based authentication</li>
  <li>Protected routes via middleware</li>
  <li>Password hashing using bcrypt</li>
  <li>OTP-based password reset</li>
  <li>Cloudinary for secure file storage</li>
</ul>

<hr />

<h2>🧪 Recommended Postman Testing Order</h2>

<ol>
  <li>Auth → Login</li>
  <li>Patient → Add</li>
  <li>Queue → Add</li>
  <li>Visit → Create</li>
  <li>Report → Upload</li>
  <li>Queue → Update Status</li>
</ol>

<hr />

<h2>🧩 Tech Stack</h2>

<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>MongoDB + Mongoose</li>
  <li>JWT</li>
  <li>Cloudinary</li>
  <li>Nodemailer</li>
  <li>Multer</li>
</ul>

<hr />

<h2>🚧 Future Enhancements</h2>

<ul>
  <li>SMS / WhatsApp reminders</li>
  <li>Role-based access control</li>
  <li>Analytics dashboard</li>
  <li>Real-time queue using Socket.IO</li>
</ul>

<hr />

<h2>✅ Project Status</h2>

<ul>
  <li>✔ Production-ready backend</li>
  <li>✔ Modular and scalable architecture</li>
  <li>✔ Designed for small to medium clinics</li>
</ul>
