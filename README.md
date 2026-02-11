<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Clinic CRM Backend</title>
  <style>
    :root {
      --bg: #f5f7fb;
      --card: #ffffff;
      --text: #1f2937;
      --muted: #6b7280;
      --border: #dbe3ef;
      --primary: #0f4c81;
      --primary-soft: #e7f0fa;
      --ok: #166534;
      --warn: #92400e;
    }

    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.55;
    }

    .wrap {
      max-width: 1100px;
      margin: 0 auto;
      padding: 24px;
    }

    .hero {
      background: linear-gradient(120deg, #0f4c81 0%, #1a6dad 100%);
      color: #fff;
      border-radius: 14px;
      padding: 28px;
      margin-bottom: 20px;
    }

    .hero h1 {
      margin: 0 0 10px 0;
      font-size: 32px;
      letter-spacing: 0.2px;
    }

    .hero p {
      margin: 6px 0;
      color: #e8f1fb;
    }

    .panel {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 18px 20px;
      margin-bottom: 16px;
    }

    h2 {
      margin: 2px 0 12px;
      font-size: 22px;
      color: var(--primary);
    }

    h3 {
      margin: 18px 0 8px;
      font-size: 18px;
      color: #12385c;
    }

    p { margin: 8px 0; }
    ul { margin: 8px 0 8px 20px; }
    li { margin: 4px 0; }

    code {
      background: #eef2f7;
      border: 1px solid #dde6f0;
      border-radius: 6px;
      padding: 1px 6px;
      font-family: Consolas, "Courier New", monospace;
      font-size: 0.92em;
    }

    pre {
      margin: 10px 0;
      padding: 12px 14px;
      background: #0f172a;
      color: #e2e8f0;
      border-radius: 10px;
      border: 1px solid #253146;
      overflow-x: auto;
      font-family: Consolas, "Courier New", monospace;
      font-size: 13px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }

    th, td {
      border: 1px solid var(--border);
      padding: 10px 12px;
      text-align: left;
      vertical-align: top;
      font-size: 14px;
    }

    th {
      background: #eef4fc;
      color: #12385c;
    }

    .toc a {
      color: var(--primary);
      text-decoration: none;
    }
    .toc a:hover { text-decoration: underline; }

    .meta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 10px;
    }

    .meta .card {
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 10px 12px;
      background: #fbfdff;
    }

    .badge {
      display: inline-block;
      border-radius: 999px;
      font-size: 12px;
      padding: 3px 10px;
      font-weight: 600;
    }
    .ok { background: #dcfce7; color: var(--ok); }
    .warn { background: #fef3c7; color: var(--warn); }

    .muted { color: var(--muted); }
    .footer {
      margin-top: 20px;
      text-align: center;
      color: var(--muted);
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <header class="hero">
      <h1>Small Clinic CRM Backend</h1>
      <p>Production-hardened Node.js + Express + MongoDB backend with role-based access, doctor-scoped data isolation, and queue-first consultation flow.</p>
      <p><strong>HTTP Base URL:</strong> <code>http://localhost:3000/clinic-crm-api</code></p>
      <p><strong>Socket URL:</strong> <code>http://localhost:3000</code></p>
    </header>

    <section class="panel toc">
      <h2>Table of Contents</h2>
      <ul>
        <li><a href="#overview">Overview</a></li>
        <li><a href="#architecture">Architecture</a></li>
        <li><a href="#setup">Setup</a></li>
        <li><a href="#env">Environment Variables</a></li>
        <li><a href="#auth-flow">Auth and Roles</a></li>
        <li><a href="#api">API Endpoints</a></li>
        <li><a href="#postman">Postman Testing</a></li>
        <li><a href="#notes">Operational Notes</a></li>
      </ul>
    </section>

    <section class="panel" id="overview">
      <h2>Overview</h2>
      <div class="meta">
        <div class="card"><strong>Stack</strong><br /><span class="muted">Node.js, Express 5, MongoDB, Mongoose 9, Socket.IO</span></div>
        <div class="card"><strong>Auth</strong><br /><span class="muted">JWT + role guards (Doctor / Staff)</span></div>
        <div class="card"><strong>Pattern</strong><br /><span class="muted">Controller -> Service -> Repository</span></div>
        <div class="card"><strong>Status</strong><br /><span class="badge ok">Active</span></div>
      </div>

      <h3>Core capabilities</h3>
      <ul>
        <li>Doctor and staff authentication with role-based endpoint protection.</li>
        <li>Patient management with soft delete and history aggregation.</li>
        <li>Doctor-isolated queue with atomic transitions and single in-progress consultation rule.</li>
        <li>Visit lifecycle linked to queue entries, with structured prescription payload.</li>
        <li>Earnings endpoints restricted to doctor role, with summary and monthly aggregation.</li>
        <li>File report upload and reminder creation endpoints.</li>
      </ul>
    </section>

    <section class="panel" id="architecture">
      <h2>Architecture</h2>
      <pre>src/
  app.js
  server.js
  config/
  constants/
  middlewares/
  modules/
    auth/
    appointment/
    patients/
    queue/
    visit/
    earning/
    staff/
    user/
    report/
    reminders/
  repositories/
  validators/
  services/
  sockets/
  utils/
  jobs/</pre>

      <table>
        <thead>
          <tr>
            <th>Layer</th>
            <th>Responsibility</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Controllers</td>
            <td>HTTP request/response handling only.</td>
          </tr>
          <tr>
            <td>Services</td>
            <td>Business rules, orchestration, lifecycle checks.</td>
          </tr>
          <tr>
            <td>Repositories</td>
            <td>All direct database access and query optimization.</td>
          </tr>
          <tr>
            <td>Validators</td>
            <td>Input schemas (Zod) for body/query/params.</td>
          </tr>
          <tr>
            <td>Middlewares</td>
            <td>Authentication, role guards, error handling, uploads.</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="panel" id="setup">
      <h2>Setup</h2>
      <pre>git clone &lt;your-repo-url&gt;
cd clinic-crm-backend
npm install
npm run dev</pre>
      <p>Production run:</p>
      <pre>npm start</pre>
    </section>

    <section class="panel" id="env">
      <h2>Environment Variables</h2>
      <p>Create <code>.env</code> in project root:</p>
      <pre>port=3000
NODE_ENV=development
mongo_db_url=mongodb://127.0.0.1:27017/clinic-crm

jwt_secret_key=replace_with_secure_random_string
jwt_token_expires_in=7d

FRONTEND_URL=*
LOG_LEVEL=info
EXPOSE_STACK=false

APP_EMAIL=your_email@gmail.com
APP_PASSWORD=your_email_app_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret</pre>
    </section>

    <section class="panel" id="auth-flow">
      <h2>Auth and Roles</h2>
      <ul>
        <li>Login returns JWT with role metadata.</li>
        <li>Staff tokens carry doctor scope and are restricted from financial APIs.</li>
        <li>Earnings routes are doctor-only guarded via middleware.</li>
      </ul>

      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Doctor</th>
            <th>Staff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Patients / Queue / Appointments / Visits</td>
            <td><span class="badge ok">Allowed</span></td>
            <td><span class="badge ok">Allowed (doctor-scoped)</span></td>
          </tr>
          <tr>
            <td>Earnings</td>
            <td><span class="badge ok">Allowed</span></td>
            <td><span class="badge warn">Forbidden</span></td>
          </tr>
          <tr>
            <td>Staff management</td>
            <td><span class="badge ok">Allowed</span></td>
            <td><span class="badge warn">Forbidden</span></td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="panel" id="api">
      <h2>API Endpoints</h2>
      <p><strong>Total endpoints registered: 41</strong></p>

      <table>
        <thead>
          <tr>
            <th>Module</th>
            <th>Count</th>
            <th>Routes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Auth</td>
            <td>5</td>
            <td><code>POST /auth/register</code>, <code>POST /auth/register-staff</code>, <code>POST /auth/login</code>, <code>POST /auth/forget-password</code>, <code>POST /auth/reset-password</code></td>
          </tr>
          <tr>
            <td>Patients</td>
            <td>5</td>
            <td><code>POST /patient</code>, <code>GET /patient</code>, <code>GET /patient/:id</code>, <code>GET /patient/:id/history</code>, <code>DELETE /patient/:id</code></td>
          </tr>
          <tr>
            <td>Queue</td>
            <td>7</td>
            <td><code>GET /queue</code>, <code>POST /queue</code>, <code>POST /queue/call-next</code>, <code>POST /queue/:id/complete</code>, <code>POST /queue/:id/skip</code>, <code>PATCH /queue/:id/status</code>, <code>GET /queue/history</code></td>
          </tr>
          <tr>
            <td>Appointments</td>
            <td>3</td>
            <td><code>POST /appointment</code>, <code>GET /appointment/today</code>, <code>PATCH /appointment/:id</code></td>
          </tr>
          <tr>
            <td>Visits</td>
            <td>3</td>
            <td><code>POST /visit</code>, <code>PATCH /visit/:id/complete</code>, <code>GET /visit/:id</code></td>
          </tr>
          <tr>
            <td>Earnings</td>
            <td>7</td>
            <td><code>GET /earnings</code>, <code>GET /earnings/summary</code>, <code>GET /earnings/monthly</code>, <code>GET /earnings/report</code>, <code>GET /earnings/:id</code>, <code>PATCH /earnings/:id</code>, <code>DELETE /earnings/:id</code></td>
          </tr>
          <tr>
            <td>Staff</td>
            <td>6</td>
            <td><code>GET /staff</code>, <code>GET /staff/:staffId</code>, <code>PATCH /staff/:staffId</code>, <code>PATCH /staff/:staffId/deactivate</code>, <code>PATCH /staff/:staffId/activate</code>, <code>DELETE /staff/:staffId</code></td>
          </tr>
          <tr>
            <td>User</td>
            <td>2</td>
            <td><code>POST /user/update-profile-picture</code>, <code>POST /user/change-password</code></td>
          </tr>
          <tr>
            <td>Report</td>
            <td>2</td>
            <td><code>POST /report</code>, <code>GET /report/:patientId</code></td>
          </tr>
          <tr>
            <td>Reminders</td>
            <td>1</td>
            <td><code>POST /reminders</code></td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="panel" id="postman">
      <h2>Postman Testing</h2>
      <p>Use these files from <code>guides/</code>:</p>
      <ul>
        <li><code>POSTMAN_PRODUCTION_HARDENED_COLLECTION.json</code></li>
        <li><code>POSTMAN_PRODUCTION_HARDENED_ENVIRONMENT.json</code></li>
      </ul>
      <p>Recommended run order in Postman:</p>
      <ol>
        <li>01 - Auth</li>
        <li>02 - Patients</li>
        <li>03 - Appointments</li>
        <li>04 - Queue</li>
        <li>05 - Visit and Prescription</li>
        <li>06 - Earnings</li>
      </ol>
    </section>

    <section class="panel" id="notes">
      <h2>Operational Notes</h2>
      <ul>
        <li>Queue ordering is enforced at DB level and service layer (not client-side).</li>
        <li>Only one <code>IN_PROGRESS</code> queue entry is allowed per doctor.</li>
        <li>Earnings are intended to be derived from completed visits and are doctor-isolated.</li>
        <li>Prescription PDF generation is currently queue-ready via async job hook.</li>
      </ul>
    </section>

    <footer class="footer">
      <p>Clinic CRM Backend Documentation</p>
      <p>Updated for current hardened architecture and route set.</p>
    </footer>
  </div>
</body>
</html>
