// Common Error Messages
export const COMMON_ERRORS = {
  // Generic Errors
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: "Internal server error occurred",
  },
  BAD_REQUEST: {
    status: 400,
    message: "Invalid request data",
  },
  UNAUTHORIZED: {
    status: 401,
    message: "Unauthorized access",
  },
  FORBIDDEN: {
    status: 403,
    message: "Forbidden access",
  },
  NOT_FOUND: {
    status: 404,
    message: "Resource not found",
  },
  CONFLICT: {
    status: 409,
    message: "Resource already exists",
  },
  VALIDATION_ERROR: {
    status: 400,
    message: "Validation failed",
  },
};

// Authentication Errors
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: {
    status: 401,
    message: "Invalid email or password",
  },
  USER_NOT_FOUND: {
    status: 404,
    message: "User not found",
  },
  EMAIL_ALREADY_EXISTS: {
    status: 409,
    message: "Email already registered",
  },
  PHONE_ALREADY_EXISTS: {
    status: 409,
    message: "Phone number already registered",
  },
  INVALID_EMAIL_FORMAT: {
    status: 400,
    message: "Invalid email format",
  },
  PASSWORD_TOO_WEAK: {
    status: 400,
    message: "Password must be at least 6 characters",
  },
  PASSWORDS_DO_NOT_MATCH: {
    status: 400,
    message: "Passwords do not match",
  },
  INVALID_TOKEN: {
    status: 401,
    message: "Invalid or expired token",
  },
  TOKEN_EXPIRED: {
    status: 401,
    message: "Token has expired",
  },
  MISSING_TOKEN: {
    status: 401,
    message: "Authentication token required",
  },
  INVALID_RESET_TOKEN: {
    status: 400,
    message: "Invalid or expired reset token",
  },
  RESET_TOKEN_EXPIRED: {
    status: 400,
    message: "Password reset link has expired",
  },
};

// Patient Errors
export const PATIENT_ERRORS = {
  PATIENT_NOT_FOUND: {
    status: 404,
    message: "Patient not found",
  },
  INVALID_PATIENT_DATA: {
    status: 400,
    message: "Invalid patient data",
  },
  PATIENT_EMAIL_EXISTS: {
    status: 409,
    message: "Patient with this email already exists",
  },
  PATIENT_PHONE_EXISTS: {
    status: 409,
    message: "Patient with this phone number already exists",
  },
  MISSING_REQUIRED_FIELDS: {
    status: 400,
    message: "Missing required patient fields",
  },
  INVALID_AGE: {
    status: 400,
    message: "Invalid patient age",
  },
  INVALID_PHONE: {
    status: 400,
    message: "Invalid phone number format",
  },
};

// Appointment Errors
export const APPOINTMENT_ERRORS = {
  APPOINTMENT_NOT_FOUND: {
    status: 404,
    message: "Appointment not found",
  },
  INVALID_APPOINTMENT_DATA: {
    status: 400,
    message: "Invalid appointment data",
  },
  APPOINTMENT_SLOT_UNAVAILABLE: {
    status: 409,
    message: "Appointment slot is not available",
  },
  INVALID_APPOINTMENT_STATUS: {
    status: 400,
    message: "Invalid appointment status",
  },
  APPOINTMENT_IN_PAST: {
    status: 400,
    message: "Cannot book appointment in the past",
  },
  CANNOT_CANCEL_APPOINTMENT: {
    status: 400,
    message: "Appointment cannot be cancelled",
  },
  MISSING_APPOINTMENT_FIELDS: {
    status: 400,
    message: "Missing required appointment fields",
  },
};

// Queue Errors
export const QUEUE_ERRORS = {
  QUEUE_NOT_FOUND: {
    status: 404,
    message: "Queue not found",
  },
  INVALID_QUEUE_DATA: {
    status: 400,
    message: "Invalid queue data",
  },
  PATIENT_ALREADY_IN_QUEUE: {
    status: 409,
    message: "Patient already exists in active queue",
  },
  QUEUE_FULL: {
    status: 409,
    message: "Queue is full",
  },
  INVALID_QUEUE_STATUS: {
    status: 400,
    message: "Invalid queue status",
  },
  CANNOT_UPDATE_QUEUE: {
    status: 400,
    message: "Cannot update queue status",
  },
  INVALID_QUEUE_ID: {
    status: 400,
    message: "Invalid queue ID format",
  },
  INVALID_PATIENT_ID: {
    status: 400,
    message: "Invalid patient ID format",
  },
  INVALID_DOCTOR_ID: {
    status: 400,
    message: "Invalid doctor ID format",
  },
  NO_WAITING_PATIENTS: {
    status: 404,
    message: "No waiting patients in queue",
  },
  QUEUE_ENTRY_NOT_FOUND: {
    status: 404,
    message: "Queue entry not found or already processed",
  },
  INVALID_STATUS_TRANSITION: {
    status: 400,
    message: "Invalid status transition",
  },
};

// Visit Errors
export const VISIT_ERRORS = {
  VISIT_NOT_FOUND: {
    status: 404,
    message: "Visit not found",
  },
  INVALID_VISIT_DATA: {
    status: 400,
    message: "Invalid visit data",
  },
  VISIT_DATE_IN_FUTURE: {
    status: 400,
    message: "Visit date cannot be in the future",
  },
  MISSING_VISIT_FIELDS: {
    status: 400,
    message: "Missing required visit fields",
  },
};

// Reminder Errors
export const REMINDER_ERRORS = {
  REMINDER_NOT_FOUND: {
    status: 404,
    message: "Reminder not found",
  },
  INVALID_REMINDER_DATA: {
    status: 400,
    message: "Invalid reminder data",
  },
  INVALID_REMINDER_TIME: {
    status: 400,
    message: "Invalid reminder time",
  },
  REMINDER_TIME_IN_PAST: {
    status: 400,
    message: "Reminder time cannot be in the past",
  },
  MISSING_REMINDER_FIELDS: {
    status: 400,
    message: "Missing required reminder fields",
  },
};

// Report Errors
export const REPORT_ERRORS = {
  REPORT_NOT_FOUND: {
    status: 404,
    message: "Report not found",
  },
  INVALID_REPORT_DATA: {
    status: 400,
    message: "Invalid report data",
  },
  FILE_UPLOAD_FAILED: {
    status: 400,
    message: "File upload failed",
  },
  INVALID_FILE_TYPE: {
    status: 400,
    message: "Invalid file type",
  },
  FILE_TOO_LARGE: {
    status: 413,
    message: "File size exceeds maximum limit",
  },
  NO_FILE_PROVIDED: {
    status: 400,
    message: "No file provided",
  },
};

// User Errors
export const USER_ERRORS = {
  USER_NOT_FOUND: {
    status: 404,
    message: "User not found",
  },
  INVALID_USER_DATA: {
    status: 400,
    message: "Invalid user data",
  },
  EMAIL_ALREADY_IN_USE: {
    status: 409,
    message: "Email already in use",
  },
  PHONE_ALREADY_IN_USE: {
    status: 409,
    message: "Phone number already in use",
  },
  INVALID_ROLE: {
    status: 400,
    message: "Invalid user role",
  },
  CANNOT_UPDATE_USER: {
    status: 400,
    message: "Cannot update user information",
  },
  OLD_PASSWORD_INCORRECT: {
    status: 401,
    message: "Old password is incorrect",
  },
  PROFILE_IMAGE_UPLOAD_FAILED: {
    status: 400,
    message: "Profile image upload failed",
  },
};

// File/Upload Errors
export const UPLOAD_ERRORS = {
  NO_FILE_UPLOADED: {
    status: 400,
    message: "No file uploaded",
  },
  INVALID_FILE: {
    status: 400,
    message: "Invalid file",
  },
  FILE_UPLOAD_ERROR: {
    status: 500,
    message: "File upload error",
  },
  CLOUDINARY_ERROR: {
    status: 500,
    message: "Image processing failed",
  },
};

// Database Errors
export const DATABASE_ERRORS = {
  DATABASE_ERROR: {
    status: 500,
    message: "Database error occurred",
  },
  DUPLICATE_ENTRY: {
    status: 409,
    message: "Duplicate entry",
  },
  INVALID_ID: {
    status: 400,
    message: "Invalid ID format",
  },
};

// Permission Errors
export const PERMISSION_ERRORS = {
  INSUFFICIENT_PERMISSIONS: {
    status: 403,
    message: "Insufficient permissions",
  },
  ADMIN_ONLY: {
    status: 403,
    message: "This action is only available to administrators",
  },
  CANNOT_PERFORM_ACTION: {
    status: 403,
    message: "You cannot perform this action",
  },
};
