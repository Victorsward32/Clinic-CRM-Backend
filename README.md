<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>🏥 Clinic CRM Backend API Documentation</title>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    line-height: 1.6;
    color: #24292e;
    background: #fff;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  /* HEADER */
  .header {
    text-align: center;
    border-bottom: 4px solid #0366d6;
    padding: 30px 0;
    margin-bottom: 40px;
    background: linear-gradient(135deg, #f6f8fa 0%, #ffffff 100%);
  }
  
  .header h1 {
    font-size: 2.8em;
    color: #0366d6;
    margin: 15px 0;
    letter-spacing: -0.5px;
  }
  
  .header p {
    font-size: 1.1em;
    color: #586069;
    margin: 10px 0;
  }
  
  .header .subtitle {
    font-size: 0.95em;
    color: #999;
    margin-top: 15px;
    font-style: italic;
  }
  
  /* TOC */
  .toc {
    background: #f6f8fa;
    border: 2px solid #e1e4e8;
    border-radius: 6px;
    padding: 25px 30px;
    margin: 30px 0;
  }
  
  .toc h2 {
    color: #0366d6;
    margin-bottom: 20px;
    font-size: 1.4em;
  }
  
  .toc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
  }
  
  .toc-item {
    padding: 10px 0;
  }
  
  .toc-item a {
    color: #0366d6;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  
  .toc-item a:hover {
    color: #0250c3;
    text-decoration: underline;
  }
  
  /* SECTIONS */
  .section {
    margin: 40px 0;
    padding: 25px;
    border-left: 5px solid #0366d6;
    background: #f6f8fa;
    border-radius: 4px;
  }
  
  .section h2 {
    color: #0366d6;
    font-size: 1.8em;
    margin-bottom: 20px;
    margin-top: 0;
  }
  
  .section h3 {
    color: #24292e;
    font-size: 1.3em;
    margin-top: 25px;
    margin-bottom: 15px;
    border-bottom: 2px solid #e1e4e8;
    padding-bottom: 10px;
  }
  
  .section h4 {
    color: #0366d6;
    font-size: 1.1em;
    margin-top: 15px;
    margin-bottom: 10px;
  }
  
  /* BASE URL */
  .base-url {
    background: white;
    border: 2px solid #28a745;
    border-radius: 6px;
    padding: 20px;
    margin: 20px 0;
  }
  
  .base-url-title {
    color: #28a745;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .code-block {
    background: #24292e;
    border: 1px solid #e1e4e8;
    border-radius: 4px;
    padding: 15px;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
    margin: 10px 0;
    color: #e1e4e8;
    line-height: 1.5;
  }
  
  /* CARDS */
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin: 20px 0;
  }
  
  .feature-card {
    background: white;
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
  }
  
  .feature-card:hover {
    box-shadow: 0 3px 12px rgba(0,0,0,0.15);
    transform: translateY(-2px);
  }
  
  .feature-card h4 {
    color: #0366d6;
    margin-top: 0;
    font-size: 1.1em;
  }
  
  .feature-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .feature-card li {
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;
    color: #666;
  }
  
  .feature-card li:before {
    content: "✓ ";
    color: #28a745;
    font-weight: bold;
    margin-right: 8px;
  }
  
  .feature-card li:last-child {
    border-bottom: none;
  }
  
  /* TABLES */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    border: 1px solid #e1e4e8;
    background: white;
  }
  
  th {
    background: #f6f8fa;
    padding: 12px 15px;
    text-align: left;
    border-bottom: 2px solid #0366d6;
    color: #0366d6;
    font-weight: 600;
  }
  
  td {
    padding: 12px 15px;
    border-bottom: 1px solid #e1e4e8;
  }
  
  tr:hover {
    background: #f6f8fa;
  }
  
  /* BADGES */
  .badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 3px;
    font-size: 0.85em;
    font-weight: bold;
    margin-right: 5px;
  }
  
  .badge-success {
    background: #d4f5d4;
    color: #28a745;
  }
  
  .badge-danger {
    background: #f8d7da;
    color: #dc3545;
  }
  
  .badge-warning {
    background: #fff3cd;
    color: #ff9800;
  }
  
  .badge-info {
    background: #d4edff;
    color: #0366d6;
  }
  
  .badge-get {
    background: #d4edff;
    color: #0366d6;
  }
  
  .badge-post {
    background: #d4f5d4;
    color: #28a745;
  }
  
  .badge-patch {
    background: #fff3cd;
    color: #ff9800;
  }
  
  .badge-delete {
    background: #f8d7da;
    color: #dc3545;
  }
  
  /* CALLOUTS */
  .callout {
    padding: 15px 20px;
    margin: 20px 0;
    border-radius: 4px;
    border-left: 4px solid;
  }
  
  .callout-info {
    background: #e7f4ff;
    border-color: #0366d6;
    color: #0366d6;
  }
  
  .callout-success {
    background: #e6f9e6;
    border-color: #28a745;
    color: #28a745;
  }
  
  .callout-warning {
    background: #fffce6;
    border-color: #ff9800;
    color: #ff9800;
  }
  
  .callout-danger {
    background: #ffe6e6;
    border-color: #dc3545;
    color: #dc3545;
  }
  
  .callout strong {
    font-weight: 600;
  }
  
  /* FLOW DIAGRAM */
  .flow-diagram {
    background: white;
    border: 2px solid #0366d6;
    border-radius: 6px;
    padding: 20px;
    margin: 20px 0;
    font-family: 'Courier New', monospace;
    font-size: 0.85em;
    overflow-x: auto;
    color: #666;
    line-height: 1.6;
  }
  
  /* ENDPOINT */
  .endpoint {
    background: white;
    border-left: 4px solid #28a745;
    padding: 15px;
    margin: 15px 0;
    border-radius: 4px;
    border: 1px solid #e1e4e8;
  }
  
  .endpoint h4 {
    color: #28a745;
    margin: 0 0 10px 0;
    font-size: 1em;
  }
  
  .endpoint p {
    margin: 5px 0;
    color: #666;
  }
  
  /* FOOTER */
  .footer {
    text-align: center;
    padding: 30px 20px;
    border-top: 2px solid #e1e4e8;
    color: #666;
    margin-top: 50px;
  }
  
  .footer p {
    margin: 5px 0;
  }
  
  .footer a {
    color: #0366d6;
    text-decoration: none;
  }
  
  .footer a:hover {
    text-decoration: underline;
  }
  
  /* STATUS BOX */
  .status-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin: 20px 0;
  }
  
  .status-item {
    background: white;
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    padding: 15px;
    text-align: center;
  }
  
  .status-item .icon {
    font-size: 2em;
    margin-bottom: 10px;
  }
  
  .status-item .label {
    color: #0366d6;
    font-weight: 600;
    margin-bottom: 5px;
  }
  
  .status-item .value {
    color: #666;
    font-size: 0.9em;
  }
  
  /* RESPONSIVE */
  @media (max-width: 768px) {
    .header h1 {
      font-size: 2em;
    }
    
    .feature-grid, .status-grid, .toc-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
</head>
<body>

<div class="container">

<!-- HEADER -->
<div class="header">
  <h1>🏥 Clinic CRM Backend</h1>
  <p>Complete API Documentation</p>
  <p class="subtitle">A comprehensive backend system for managing patients, queue, appointments, visits, reports, reminders, earnings, and user authentication for small to medium clinics with real-time updates and role-based access control.</p>
</div>

<!-- TABLE OF CONTENTS -->
<div class="toc">
  <h2>📋 Quick Navigation</h2>
  <div class="toc-grid">
    <div class="toc-item">
      <strong>Getting Started</strong>
      <ul style="list-style: none; padding: 0; margin-top: 8px;">
        <li><a href="#system-overview">System Overview</a></li>
        <li><a href="#base-url">Base URL</a></li>
        <li><a href="#architecture">Architecture</a></li>
      </ul>
    </div>
    
    <div class="toc-item">
      <strong>Workflows</strong>
      <ul style="list-style: none; padding: 0; margin-top: 8px;">
        <li><a href="#doctor-staff-workflows">Doctor & Staff Workflows</a></li>
        <li><a href="#complete-flow">Complete Application Flow</a></li>
        <li><a href="#auth-authorization">Authentication</a></li>
      </ul>
    </div>
    
    <div class="toc-item">
      <strong>API Reference</strong>
      <ul style="list-style: none; padding: 0; margin-top: 8px;">
        <li><a href="#api-endpoints">API Endpoints</a></li>
        <li><a href="#socket-io">Socket.IO Events</a></li>
        <li><a href="#security">Security</a></li>
      </ul>
    </div>
    
    <div class="toc-item">
      <strong>Additional</strong>
      <ul style="list-style: none; padding: 0; margin-top: 8px;">
        <li><a href="#tech-stack">Tech Stack</a></li>
        <li><a href="#testing">Testing Guide</a></li>
        <li><a href="#status">Project Status</a></li>
      </ul>
    </div>
  </div>
</div>

<!-- BASE URL -->
<div class="base-url" id="base-url">
  <div class="base-url-title">🔗 Base URL & WebSocket</div>
  <div class="code-block">HTTP API:
http://localhost:5000/clinic-crm-api

WebSocket:
http://localhost:5000</div>
</div>



<!-- SYSTEM OVERVIEW -->
<div class="section" id="system-overview">
  <h2>System Overview</h2>
  
  <p>This Clinic CRM system manages complete clinic operations with real-time updates and role-based access control:</p>
  
  <div class="feature-grid">
    <div class="feature-card">
      <h4>👥 Patient Management</h4>
      <ul>
        <li>Register & track patients</li>
        <li>Medical history</li>
        <li>Contact information</li>
        <li>Demographics</li>
      </ul>
    </div>
    
    <div class="feature-card">
      <h4>⏳ Queue Management</h4>
      <ul>
        <li>Real-time waiting list</li>
        <li>Queue number assignment</li>
        <li>Status tracking</li>
        <li>Live updates</li>
      </ul>
    </div>
    
    <div class="feature-card">
      <h4>🩺 Medical Records</h4>
      <ul>
        <li>Consultation details</li>
        <li>Diagnosis & treatment</li>
        <li>Prescription history</li>
        <li>Visit timeline</li>
      </ul>
    </div>
    
    <div class="feature-card">
      <h4>💰 Earnings Tracking</h4>
      <ul>
        <li>Automatic creation</li>
        <li>Payment modes</li>
        <li>Daily summaries</li>
        <li>Reports</li>
      </ul>
    </div>
    
    <div class="feature-card">
      <h4>📅 Appointments</h4>
      <ul>
        <li>Schedule visits</li>
        <li>Manage slots</li>
        <li>Set reminders</li>
        <li>Follow-up tracking</li>
      </ul>
    </div>
    
    <div class="feature-card">
      <h4>🔐 Security & Access</h4>
      <ul>
        <li>JWT authentication</li>
        <li>Role-based control</li>
        <li>Password encryption</li>
        <li>Doctor-staff roles</li>
      </ul>
    </div>
  </div>
  
  <h3>Core Features</h3>
  <table>
    <thead>
      <tr>
        <th>Feature</th>
        <th>Status</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>JWT Authentication</strong></td>
        <td><span class="badge badge-success">✅ Complete</span></td>
        <td>Token-based security with 24-hour expiry</td>
      </tr>
      <tr>
        <td><strong>Password Reset</strong></td>
        <td><span class="badge badge-success">✅ Complete</span></td>
        <td>OTP-based email verification</td>
      </tr>
      <tr>
        <td><strong>Role-Based Access</strong></td>
        <td><span class="badge badge-success">✅ Complete</span></td>
        <td>Doctor (full) & Staff (limited) roles</td>
      </tr>
      <tr>
        <td><strong>Real-Time Queue</strong></td>
        <td><span class="badge badge-success">✅ Complete</span></td>
        <td>Socket.IO for instant updates</td>
      </tr>
      <tr>
        <td><strong>Earnings Tracking</strong></td>
        <td><span class="badge badge-success">✅ Complete</span></td>
        <td>Auto-create on consultation completion</td>
      </tr>
      <tr>
        <td><strong>Financial Reports</strong></td>
        <td><span class="badge badge-success">✅ Complete</span></td>
        <td>Multiple report types (daily, monthly, yearly)</td>
      </tr>
      <tr>
        <td><strong>File Storage</strong></td>
        <td><span class="badge badge-success">✅ Complete</span></td>
        <td>Cloudinary integration for documents</td>
      </tr>
      <tr>
        <td><strong>Email Notifications</strong></td>
        <td><span class="badge badge-success">✅ Complete</span></td>
        <td>OTP & password reset via Nodemailer</td>
      </tr>
    </tbody>
  </table>
</div>

---

<!-- ARCHITECTURE -->
<div class="section" id="architecture">
  <h2>🏗️ System Architecture</h2>
  
  <div class="flow-diagram">
┌─────────────────────────────────────────┐
│      CLIENT LAYER                        │
│  (React + Socket.IO)                    │
└────────────────────┬────────────────────┘
                     │
┌────────────────────▼────────────────────┐
│      API LAYER (Express)                │
│  ┌──────────────────────────────────┐   │
│  │ Routes & Controllers             │   │
│  │ (34 endpoints)                   │   │
│  └───────────┬──────────────────────┘   │
│              │                           │
│  ┌───────────▼──────────────────────┐   │
│  │ Services & Socket.IO            │   │
│  │ (Business Logic)                │   │
│  └───────────┬──────────────────────┘   │
└────────────────┬──────────────────────────┘
                 │
┌────────────────▼──────────────────────┐
│      DATABASE LAYER                    │
│  MongoDB Collections:                  │
│  • users  • patients  • queue          │
│  • visits • reports  • appointments    │
│  • reminders  • earnings               │
└──────────────────────────────────────┘
  </div>
  
  <h3>Layer Responsibilities</h3>
  <table>
    <thead>
      <tr>
        <th>Layer</th>
        <th>Purpose</th>
        <th>Components</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Routes</strong></td>
        <td>Define HTTP endpoints</td>
        <td>7 route files (auth, patient, queue, etc.)</td>
      </tr>
      <tr>
        <td><strong>Controllers</strong></td>
        <td>Handle HTTP requests/responses</td>
        <td>Request validation, error handling</td>
      </tr>
      <tr>
        <td><strong>Services</strong></td>
        <td>Business logic & database operations</td>
        <td>Data processing, calculations</td>
      </tr>
      <tr>
        <td><strong>Models</strong></td>
        <td>Database schema definitions</td>
        <td>Mongoose schemas for 8 collections</td>
      </tr>
      <tr>
        <td><strong>Middleware</strong></td>
        <td>Request/response processing</td>
        <td>Auth, file upload, error handling</td>
      </tr>
    </tbody>
  </table>
</div>

---

<!-- DOCTOR & STAFF WORKFLOWS -->
<div class="section" id="doctor-staff-workflows">
  <h2>🔄 Doctor & Staff Workflows</h2>
  
  <h3>Role Overview</h3>
  <table>
    <thead>
      <tr>
        <th>Role</th>
        <th>Access Level</th>
        <th>Primary Task</th>
        <th>Earnings</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>DOCTOR</strong></td>
        <td>Full System Access</td>
        <td>Manage clinic & consultations</td>
        <td><span class="badge badge-success">✅ Full Access</span></td>
      </tr>
      <tr>
        <td><strong>STAFF</strong></td>
        <td>Limited Access</td>
        <td>Reception & queue management</td>
        <td><span class="badge badge-danger">❌ No Access (403)</span></td>
      </tr>
    </tbody>
  </table>
  
  <h3>Doctor's Workflow</h3>
  
  <div class="callout callout-info">
    <strong>Step 1:</strong> Register as Doctor
    <br><code>POST /auth/register</code> → Account created with DOCTOR role
  </div>
  
  <div class="callout callout-success">
    <strong>Step 2:</strong> Login & Get Token
    <br><code>POST /auth/login</code> → Receive JWT token (valid 24 hours)
  </div>
  
  <div class="callout callout-warning">
    <strong>Step 3:</strong> Create Staff Registration Code
    <br>Generate unique code to share with staff members
  </div>
  
  <div class="callout callout-danger">
    <strong>Step 4:</strong> Daily Clinic Operations
    <br>• <code>POST /queue</code> - Add patient to queue
    <br>• <code>PATCH /queue/:id</code> - Mark IN_PROGRESS
    <br>• <code>POST /visit</code> - Record consultation
    <br>• <code>PATCH /queue/:id</code> - Mark COMPLETED → ✅ Auto-creates earning
    <br>• <code>GET /earnings</code> - View earnings
  </div>
  
  <h3>Staff's Workflow</h3>
  
  <div class="callout callout-info">
    <strong>Step 1:</strong> Receive Doctor's Credentials
    <br>Doctor Name • Email • Registration Code • Clinic Name
  </div>
  
  <div class="callout callout-success">
    <strong>Step 2:</strong> Register as Staff
    <br><code>POST /auth/register</code> with registrationCode + doctorEmail
    <br>✅ Account linked to specific doctor
  </div>
  
  <div class="callout callout-warning">
    <strong>Step 3:</strong> Login & Start Work
    <br><code>POST /auth/login</code> → Receive JWT token
  </div>
  
  <div class="callout callout-danger">
    <strong>Step 4:</strong> Daily Operations
    <br>• <code>POST /patient</code> - Register patients
    <br>• <code>POST /queue</code> - Add to queue
    <br>• <code>PATCH /queue/:id</code> - Update status
    <br>• <code>POST /appointment</code> - Schedule
    <br>• ❌ Cannot access earnings (403 Forbidden)
  </div>
  
  <h3>Typical Daily Interaction</h3>
  
  <div class="flow-diagram">
09:30 AM - Patient Arrives
├─ Staff: POST /patient (if new)
├─ Staff: POST /queue (add to list)
└─ 📡 Socket.IO queue-updated event

09:40 AM - Doctor Calls Patient
├─ Staff: PATCH /queue/:id (IN_PROGRESS)
└─ 📡 Socket.IO queue-updated event

10:10 AM - Consultation Ends
├─ Doctor: PATCH /queue/:id (COMPLETED)
│  └─ ✅ AUTO: Earning record created
├─ Staff: Collect payment
└─ 📡 Socket.IO earnings-updated event

05:00 PM - End of Day
├─ Doctor: GET /earnings/summary
│  └─ "Today earned ₹4000 from 8 consultations"
└─ Doctor: GET /earnings/report
   └─ "Monthly report: ₹120,000"
  </div>
  
  <h3>What Staff CANNOT Do</h3>
  
  <div class="callout callout-danger">
    <strong>🚫 Earnings Access Denied</strong>
    <br><br>Staff attempting to access earnings endpoints:
    <div class="code-block">GET /earnings → 403 FORBIDDEN
{
  "error": "Only DOCTOR role can access this resource",
  "statusCode": 403
}

GET /earnings/summary → 403 FORBIDDEN
GET /earnings/report → 403 FORBIDDEN
PATCH /earnings/:id → 403 FORBIDDEN
DELETE /earnings/:id → 403 FORBIDDEN</div>
  </div>
  
  <p style="margin-top: 20px; color: #666;">
    <strong>For detailed workflows, see:</strong> <a href="DOCTOR_STAFF_WORKFLOW.md">DOCTOR_STAFF_WORKFLOW.md</a>
  </p>
</div>

---

<!-- COMPLETE APPLICATION FLOW -->
<div class="section" id="complete-flow">
  <h2>📊 Complete Application Flow (A-Z)</h2>
  
  <h3>Step 1: User Registration & Authentication</h3>
  <div class="code-block">
POST /auth/register
{
  "name": "Dr. Ahmed Khan",
  "email": "ahmed@clinic.com",
  "password": "SecurePass@123"
}
→ Account created (role: DOCTOR)

POST /auth/login
→ JWT token received (valid 24 hours)
→ Use in Authorization header
  </div>
  
  <h3>Step 2: Patient Registration</h3>
  <div class="code-block">
POST /patient
{
  "name": "Rahul Sharma",
  "age": 32,
  "gender": "Male",
  "phone": "9876543210",
  "address": "42 Mumbai Street, Mumbai",
  "medicalHistory": "Diabetes, Hypertension"
}
→ Patient ID generated
→ Used in all future operations
  </div>
  
  <h3>Step 3: Queue Management (CORE)</h3>
  <div class="code-block">
POST /queue (Add patient to queue)
→ Queue number assigned
→ Status: WAITING

PATCH /queue/:id (Mark IN_PROGRESS)
→ Status: IN_PROGRESS
→ Socket.IO update broadcast

PATCH /queue/:id (Mark COMPLETED)
{
  "status": "COMPLETED",
  "consultationFee": 500,
  "paymentMode": "CASH"
}
→ ✅ AUTOMATIC: Earning record created
→ Socket.IO queue-updated event
→ Socket.IO earnings-updated event
  </div>
  
  <h3>Step 4: Medical Records</h3>
  <div class="code-block">
POST /visit (Record consultation)
{
  "patientId": "patient_id",
  "complaint": "Persistent cough",
  "diagnosis": "Viral infection",
  "prescription": "Cough syrup 3x daily"
}
→ Historical record created

GET /visit/:patientId (Get medical history)
→ All past consultations
  </div>
  
  <h3>Step 5: Documents & Reports</h3>
  <div class="code-block">
POST /report (Upload medical document)
→ File stored in Cloudinary
→ Link saved in patient record

GET /report/:patientId (Get all reports)
→ Download/view anytime
  </div>
  
  <h3>Step 6: Appointments & Reminders</h3>
  <div class="code-block">
POST /appointment (Schedule future visit)
→ Appointment stored

POST /reminders (Set follow-up reminder)
→ Reminder notification scheduled
  </div>
  
  <h3>Step 7: Earnings Tracking</h3>
  <div class="code-block">
AUTOMATIC: When queue marked COMPLETED
→ Earning record created with:
   - Doctor ID
   - Patient ID
   - Queue ID
   - Consultation Fee
   - Payment Mode
   - Visit Date/Time

GET /earnings (List earnings)
→ DOCTOR ONLY (403 for STAFF)

GET /earnings/summary (Financial overview)
→ Today • Month • Year • All-time

GET /earnings/report (Download reports)
→ Monthly • Quarterly • Yearly • Custom
  </div>
  
  <h3>Complete User Journey</h3>
  <div class="flow-diagram">
┌─ NEW USER ─────────────────────────────┐
│ 1. REGISTER (POST /auth/register)      │
│    └─ Get account (DOCTOR/STAFF role)  │
│                                        │
│ 2. LOGIN (POST /auth/login)           │
│    └─ Receive JWT token (24h valid)   │
│                                        │
│ 3. SETUP PROFILE (POST /user)         │
│    └─ Upload profile picture           │
└────────────────────────────────────────┘
           ↓
┌─ DAILY CLINIC OPERATIONS ──────────────┐
│ 4. ADD PATIENT (POST /patient)         │
│ 5. ADD TO QUEUE (POST /queue)          │
│ 6. UPDATE STATUS (PATCH /queue/:id)    │
│    ├─ IN_PROGRESS                      │
│    └─ COMPLETED → ✅ Earning created   │
│ 7. RECORD VISIT (POST /visit)          │
│ 8. UPLOAD REPORTS (POST /report)       │
│ 9. VIEW EARNINGS (GET /earnings)       │
└────────────────────────────────────────┘
           ↓
┌─ FUTURE MANAGEMENT ────────────────────┐
│ 10. SCHEDULE (POST /appointment)       │
│ 11. REMINDERS (POST /reminders)        │
└────────────────────────────────────────┘
  </div>
</div>

---

<!-- AUTHENTICATION & AUTHORIZATION -->
<div class="section" id="auth-authorization">
  <h2>🔐 Authentication & Authorization</h2>
  
  <h3>How JWT Authentication Works</h3>
  <table>
    <thead>
      <tr>
        <th>Step</th>
        <th>Action</th>
        <th>Result</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>User logs in with email & password</td>
        <td>JWT token generated</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Token stored in frontend (localStorage)</td>
        <td>Token ready for API requests</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Token sent in Authorization header</td>
        <td><code>Authorization: Bearer token</code></td>
      </tr>
      <tr>
        <td>4</td>
        <td>Server validates token signature</td>
        <td>✅ Valid or ❌ Invalid</td>
      </tr>
      <tr>
        <td>5</td>
        <td>Role-based access check</td>
        <td>✅ Allowed or ❌ 403 Forbidden</td>
      </tr>
    </tbody>
  </table>
  
  <h3>Role-Based Access Control</h3>
  
  <p>The system supports two user roles with different permission levels:</p>
  
  <table>
    <thead>
      <tr>
        <th>API Endpoint</th>
        <th>DOCTOR</th>
        <th>STAFF</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Patient Management</strong></td>
        <td><span class="badge badge-success">✅</span></td>
        <td><span class="badge badge-success">✅</span></td>
      </tr>
      <tr>
        <td><strong>Queue Management</strong></td>
        <td><span class="badge badge-success">✅</span></td>
        <td><span class="badge badge-success">✅</span></td>
      </tr>
      <tr>
        <td><strong>Visit Records</strong></td>
        <td><span class="badge badge-success">✅</span></td>
        <td><span class="badge badge-success">✅</span></td>
      </tr>
      <tr>
        <td><strong>Reports/Documents</strong></td>
        <td><span class="badge badge-success">✅</span></td>
        <td><span class="badge badge-success">✅</span></td>
      </tr>
      <tr>
        <td><strong>Appointments</strong></td>
        <td><span class="badge badge-success">✅</span></td>
        <td><span class="badge badge-success">✅</span></td>
      </tr>
      <tr>
        <td><strong>Reminders</strong></td>
        <td><span class="badge badge-success">✅</span></td>
        <td><span class="badge badge-success">✅</span></td>
      </tr>
      <tr>
        <td><strong>Earnings (View)</strong></td>
        <td><span class="badge badge-success">✅</span></td>
        <td><span class="badge badge-danger">❌ 403</span></td>
      </tr>
      <tr>
        <td><strong>Earnings (Edit/Delete)</strong></td>
        <td><span class="badge badge-success">✅</span></td>
        <td><span class="badge badge-danger">❌ 403</span></td>
      </tr>
    </tbody>
  </table>
</div>

---

<!-- API ENDPOINTS -->
<div class="section" id="api-endpoints">
  <h2>🔌 API Endpoints (Complete List)</h2>
  
  <p><strong>Total: 34 Endpoints</strong></p>
  
  <h3>🔐 Authentication (4 endpoints)</h3>
  
  <div class="endpoint">
    <h4><span class="badge badge-post">POST</span> /auth/register</h4>
    <p>Register new user account (Doctor or Staff)</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-post">POST</span> /auth/login</h4>
    <p>Login and receive JWT token (valid 24 hours)</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-post">POST</span> /auth/forget-password</h4>
    <p>Send OTP to email for password reset</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-post">POST</span> /auth/reset-password</h4>
    <p>Reset password using OTP</p>
  </div>
  
  <h3>👤 User (2 endpoints)</h3>
  
  <div class="endpoint">
    <h4><span class="badge badge-post">POST</span> /user</h4>
    <p>Upload/update profile picture (multipart/form-data)</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-post">POST</span> /user/change-password</h4>
    <p>Change password for logged-in user</p>
  </div>
  
  <h3>🧍 Patient (3 endpoints)</h3>
  
  <div class="endpoint">
    <h4><span class="badge badge-post">POST</span> /patient</h4>
    <p>Add new patient to system</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-get">GET</span> /patient</h4>
    <p>List all patients</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-get">GET</span> /patient/:id</h4>
    <p>Get patient by ID</p>
  </div>
  
  <h3>⏳ Queue (4 endpoints) ⭐ CORE</h3>
  
  <div class="endpoint">
    <h4><span class="badge badge-post">POST</span> /queue</h4>
    <p>Add patient to queue (generates queue number)</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-get">GET</span> /queue</h4>
    <p>View current queue (real-time)</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-patch">PATCH</span> /queue/:id</h4>
    <p>Update queue status (WAITING/IN_PROGRESS/COMPLETED) → ✅ Auto-creates earning when COMPLETED</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-delete">DELETE</span> /queue/:id</h4>
    <p>Remove patient from queue</p>
  </div>
  
  <h3>🩺 Visit (4 endpoints)</h3>
  
  <div class="endpoint">
    <h4><span class="badge badge-post">POST</span> /visit</h4>
    <p>Record consultation details (complaint, diagnosis, prescription)</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-get">GET</span> /visit/:patientId</h4>
    <p>Get patient's medical history (all past visits)</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-patch">PATCH</span> /visit/:id</h4>
    <p>Update visit details</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-delete">DELETE</span> /visit/:id</h4>
    <p>Delete visit record</p>
  </div>
  
  <h3>📅 Appointment (4 endpoints)</h3>
  
  <div class="endpoint">
    <h4><span class="badge badge-post">POST</span> /appointment</h4>
    <p>Schedule future consultation</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-get">GET</span> /appointment</h4>
    <p>List all appointments</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-patch">PATCH</span> /appointment/:id</h4>
    <p>Update appointment date/time</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-delete">DELETE</span> /appointment/:id</h4>
    <p>Cancel appointment</p>
  </div>
  
  <h3>📄 Report (3 endpoints)</h3>
  
  <div class="endpoint">
    <h4><span class="badge badge-post">POST</span> /report</h4>
    <p>Upload medical document (PDF, image, etc.)</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-get">GET</span> /report/:patientId</h4>
    <p>Get patient's medical documents</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-delete">DELETE</span> /report/:id</h4>
    <p>Delete document</p>
  </div>
  
  <h3>⏰ Reminder (4 endpoints)</h3>
  
  <div class="endpoint">
    <h4><span class="badge badge-post">POST</span> /reminders</h4>
    <p>Create follow-up reminder</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-get">GET</span> /reminders</h4>
    <p>List all reminders</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-patch">PATCH</span> /reminders/:id</h4>
    <p>Update reminder</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-delete">DELETE</span> /reminders/:id</h4>
    <p>Delete reminder</p>
  </div>
  
  <h3>💰 Earnings (6 endpoints) <span class="badge badge-danger">DOCTOR ONLY</span></h3>
  
  <div class="callout callout-warning">
    <strong>⚠️ Important:</strong> All earnings endpoints are restricted to DOCTOR role only. Staff users will receive 403 Forbidden error.
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-get">GET</span> /earnings</h4>
    <p>List doctor's earnings (with pagination & filtering)</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-get">GET</span> /earnings/summary</h4>
    <p>Get financial summary (today, month, year, all-time)</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-get">GET</span> /earnings/report</h4>
    <p>Download financial reports (monthly, quarterly, yearly, custom)</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-get">GET</span> /earnings/:id</h4>
    <p>Get single earning record details</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-patch">PATCH</span> /earnings/:id</h4>
    <p>Edit/correct earning record (for corrections)</p>
  </div>
  
  <div class="endpoint">
    <h4><span class="badge badge-delete">DELETE</span> /earnings/:id</h4>
    <p>Delete earning record</p>
  </div>
</div>

---

<!-- SOCKET.IO EVENTS -->
<div class="section" id="socket-io">
  <h2>🔌 Socket.IO Real-Time Events</h2>
  
  <h3>Connection Setup</h3>
  <div class="code-block">
const socket = io('http://localhost:5000', {
  extraHeaders: {
    Authorization: `Bearer ${yourJWTToken}`
  }
});</div>
  
  <h3>queue-updated</h3>
  <table>
    <thead>
      <tr>
        <th>Property</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Event Name</strong></td>
        <td>queue-updated</td>
      </tr>
      <tr>
        <td><strong>When</strong></td>
        <td>Patient added/removed/status changed in queue</td>
      </tr>
      <tr>
        <td><strong>Who Sees</strong></td>
        <td>All connected users (doctor & staff)</td>
      </tr>
      <tr>
        <td><strong>Data</strong></td>
        <td>Queue object with patient details</td>
      </tr>
    </tbody>
  </table>
  
  <h3>earnings-updated</h3>
  <table>
    <thead>
      <tr>
        <th>Property</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Event Name</strong></td>
        <td>earnings-updated</td>
      </tr>
      <tr>
        <td><strong>When</strong></td>
        <td>Earning created (on queue COMPLETED), updated, or deleted</td>
      </tr>
      <tr>
        <td><strong>Who Sees</strong></td>
        <td>Doctor only (staff cannot see)</td>
      </tr>
      <tr>
        <td><strong>Data</strong></td>
        <td>Earning object with fee & payment info</td>
      </tr>
    </tbody>
  </table>
</div>

---

<!-- SECURITY -->
<div class="section" id="security">
  <h2>🔐 Security Features</h2>
  
  <table>
    <thead>
      <tr>
        <th>Security Feature</th>
        <th>Implementation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>JWT Authentication</strong></td>
        <td>Token-based with 24-hour expiry, signed with secret key</td>
      </tr>
      <tr>
        <td><strong>Password Hashing</strong></td>
        <td>bcrypt with configurable salt rounds</td>
      </tr>
      <tr>
        <td><strong>Role-Based Access</strong></td>
        <td>Middleware-based (allowRoles) for permission enforcement</td>
      </tr>
      <tr>
        <td><strong>OTP Verification</strong></td>
        <td>Email-based with 10-minute expiry for password reset</td>
      </tr>
      <tr>
        <td><strong>Doctor Ownership</strong></td>
        <td>Earnings only accessible to own doctor (not shared)</td>
      </tr>
      <tr>
        <td><strong>Immutable Fields</strong></td>
        <td>Doctor & patient cannot be changed after earning creation</td>
      </tr>
      <tr>
        <td><strong>Duplicate Prevention</strong></td>
        <td>Unique index on queueId prevents duplicate earnings</td>
      </tr>
      <tr>
        <td><strong>File Security</strong></td>
        <td>Cloudinary for secure file storage with access controls</td>
      </tr>
      <tr>
        <td><strong>Error Messages</strong></td>
        <td>Generic error messages to prevent information leakage</td>
      </tr>
    </tbody>
  </table>
</div>

---

<!-- TECH STACK -->
<div class="section" id="tech-stack">
  <h2>📊 Tech Stack</h2>
  
  <div class="feature-grid">
    <div class="feature-card">
      <h4>🖥️ Backend</h4>
      <ul>
        <li>Node.js v14+</li>
        <li>Express.js 5.x</li>
        <li>JavaScript (ES6+)</li>
      </ul>
    </div>
    
    <div class="feature-card">
      <h4>💾 Database</h4>
      <ul>
        <li>MongoDB</li>
        <li>Mongoose 9.x</li>
        <li>MongoDB Atlas</li>
      </ul>
    </div>
    
    <div class="feature-card">
      <h4>⚡ Real-Time</h4>
      <ul>
        <li>Socket.IO 4.x</li>
        <li>WebSocket Protocol</li>
      </ul>
    </div>
    
    <div class="feature-card">
      <h4>🔑 Authentication</h4>
      <ul>
        <li>JWT (jsonwebtoken)</li>
        <li>bcrypt</li>
      </ul>
    </div>
    
    <div class="feature-card">
      <h4>☁️ File Storage</h4>
      <ul>
        <li>Cloudinary</li>
        <li>Multer</li>
      </ul>
    </div>
    
    <div class="feature-card">
      <h4>📧 Email</h4>
      <ul>
        <li>Nodemailer</li>
        <li>Gmail SMTP</li>
      </ul>
    </div>
  </div>
</div>

---

<!-- TESTING -->
<div class="section" id="testing">
  <h2>🧪 Testing Guide</h2>
  
  <h3>Recommended Testing Order</h3>
  <div class="status-grid">
    <div class="status-item">
      <div class="icon">🔐</div>
      <div class="label">1. Register & Login</div>
      <div class="value">Create account, get token</div>
    </div>
    
    <div class="status-item">
      <div class="icon">🧍</div>
      <div class="label">2. Add Patient</div>
      <div class="value">Register test patient</div>
    </div>
    
    <div class="status-item">
      <div class="icon">⏳</div>
      <div class="label">3. Add to Queue</div>
      <div class="value">Add patient to queue</div>
    </div>
    
    <div class="status-item">
      <div class="icon">➡️</div>
      <div class="label">4. Update Status</div>
      <div class="value">Mark IN_PROGRESS</div>
    </div>
    
    <div class="status-item">
      <div class="icon">✅</div>
      <div class="label">5. Complete</div>
      <div class="value">Mark COMPLETED → Earning created</div>
    </div>
    
    <div class="status-item">
      <div class="icon">🩺</div>
      <div class="label">6. Record Visit</div>
      <div class="value">Save consultation details</div>
    </div>
    
    <div class="status-item">
      <div class="icon">📄</div>
      <div class="label">7. Upload Report</div>
      <div class="value">Upload medical document</div>
    </div>
    
    <div class="status-item">
      <div class="icon">💰</div>
      <div class="label">8. View Earnings</div>
      <div class="value">Check earning record</div>
    </div>
  </div>
  
  <h3>Tools Recommended</h3>
  <div class="callout callout-success">
    <strong>Postman:</strong> Use Postman app to test all endpoints. Import the provided collection template for easy testing with example requests and responses.
  </div>
</div>

---

<!-- PROJECT STATUS -->
<div class="section" id="status">
  <h2>✅ Project Status</h2>
  
  <table>
    <thead>
      <tr>
        <th>Component</th>
        <th>Status</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Core API</strong></td>
        <td><span class="badge badge-success">✅ Complete</span></td>
        <td>34 endpoints fully functional & tested</td>
      </tr>
      <tr>
        <td><strong>Authentication</strong></td>
        <td><span class="badge badge-success">✅ Complete</span></td>
        <td>JWT + OTP implementation with password reset</td>
      </tr>
      <tr>
        <td><strong>Queue Management</strong></td>
        <td><span class="badge badge-success">✅ Complete</span></td>
        <td>Real-time Socket.IO updates & auto-numbering</td>
      </tr>
      <tr>
        <td><strong>Earnings System</strong></td>
        <td><span class="badge badge-success">✅ Complete</span></td>
        <td>Auto-creation with reports & financial summaries</td>
      </tr>
      <tr>
        <td><strong>Role-Based Access</strong></td>
        <td><span class="badge badge-success">✅ Complete</span></td>
        <td>Doctor & Staff roles with permission enforcement</td>
      </tr>
      <tr>
        <td><strong>Documentation</strong></td>
        <td><span class="badge badge-success">✅ Complete</span></td>
        <td>6+ comprehensive guides with code examples</td>
      </tr>
      <tr>
        <td><strong>Production Ready</strong></td>
        <td><span class="badge badge-success">✅ Ready</span></td>
        <td>Syntax verified, tested, documented, secure</td>
      </tr>
    </tbody>
  </table>
  
  <h3>Additional Documentation</h3>
  <div class="feature-grid">
    <div class="feature-card">
      <h4>📖 README_COMPLETE.md</h4>
      <p>Detailed A-Z documentation with all endpoint examples, request/response formats, and complete database schemas.</p>
    </div>
    
    <div class="feature-card">
      <h4>👥 DOCTOR_STAFF_WORKFLOW.md</h4>
      <p>Comprehensive workflow guide showing doctor & staff daily interactions, role comparisons, and 8+ detailed scenarios.</p>
    </div>
    
    <div class="feature-card">
      <h4>⚡ DOCTOR_STAFF_QUICK_GUIDE.md</h4>
      <p>Quick reference with permission matrix (25 rules), best practices, and common scenarios with solutions.</p>
    </div>
    
    <div class="feature-card">
      <h4>💰 EARNINGS_SYSTEM_GUIDE.md</h4>
      <p>Detailed earnings module documentation with features, auto-creation logic, and implementation details.</p>
    </div>
  </div>
</div>

---

<!-- QUICK START -->
<div class="section">
  <h2>🚀 Quick Start</h2>
  
  <h3>Prerequisites</h3>
  <ul style="list-style: none; padding: 0;">
    <li>✅ Node.js v14 or higher</li>
    <li>✅ MongoDB (local or Atlas)</li>
    <li>✅ Cloudinary account (for file storage)</li>
    <li>✅ Gmail account (for email notifications)</li>
    <li>✅ Postman (for API testing)</li>
  </ul>
  
  <h3>Installation Steps</h3>
  <div class="code-block">
# 1. Clone repository
git clone <repository-url>

# 2. Navigate to project
cd clinic-crm-backend

# 3. Install dependencies
npm install

# 4. Setup environment variables
cp .env.example .env

# 5. Start server
npm start

# Server runs on: http://localhost:5000</div>
  
  <h3>Environment Variables (.env)</h3>
  <div class="code-block">
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/clinic-crm
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=24h

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

FRONTEND_URL=http://localhost:3000</div>
</div>

---

<!-- FOOTER -->
<div class="footer">
  <p style="font-size: 1.2em; color: #0366d6;"><strong>Clinic CRM Backend v2.0</strong></p>
  <p>Production-ready system for managing small to medium clinics</p>
  <p style="margin-top: 15px;">
    <a href="DOCTOR_STAFF_WORKFLOW.md">📖 Workflows</a> • 
    <a href="DOCTOR_STAFF_QUICK_GUIDE.md">⚡ Quick Guide</a> • 
    <a href="README_COMPLETE.md">📚 Complete Docs</a>
  </p>
  <p style="margin-top: 15px; color: #999; font-size: 0.95em;">
    Last Updated: January 26, 2026<br>
    Built with ❤️ for Small to Medium Clinics
  </p>
</div>

</div>

</body>
</html>
