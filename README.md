# Clinic CRM Backend

Backend for a small clinic CRM system built with Node.js, Express, and MongoDB.

## What We Built

- Role-based authentication (Doctor and Staff) using JWT
- Doctor-scoped access control (staff works under assigned doctor scope)
- Patient management with soft delete and searchable records
- Queue management with:
  - doctor-isolated queues
  - emergency priority support
  - FIFO handling
  - single `IN_PROGRESS` patient per doctor
- Visit flow linked to queue lifecycle
- Prescription data support with async PDF job hook structure
- Earnings module for doctors only (summary, monthly aggregation, reports)
- Staff management for doctors
- Report upload and patient report retrieval
- Reminder creation flow
- Centralized error handling, validation, and logging

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT
- Zod
- Socket.IO
- Winston

## Project Structure

```text
src/
  config/
  constants/
  middlewares/
  modules/
  repositories/
  validators/
  services/
  sockets/
  jobs/
  utils/
```

## How to Run

## 1. Prerequisites

- Node.js 18+ (recommended)
- MongoDB running locally or remotely

## 2. Install dependencies

```bash
npm install
```

## 3. Create `.env`

Use these keys (matching current code):

```env
port=3000
NODE_ENV=development

mongo_db_url=mongodb://127.0.0.1:27017/clinic-crm

jwt_secret_key=your_jwt_secret
jwt_token_expires_in=7d

FRONTEND_URL=*
LOG_LEVEL=info
EXPOSE_STACK=false

APP_EMAIL=your_email@gmail.com
APP_PASSWORD=your_email_app_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## 4. Start the server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Server base URL:

```text
http://localhost:3000/clinic-crm-api
```

## Postman

Ready-to-use files are in `guides/`:

- `POSTMAN_PRODUCTION_HARDENED_COLLECTION.json`
- `POSTMAN_PRODUCTION_HARDENED_ENVIRONMENT.json`

Import both files in Postman and run the folders in order.
