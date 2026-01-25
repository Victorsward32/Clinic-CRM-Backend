// Authentication Messages
export const AUTH_MESSAGES = {
  REGISTER_SUCCESS: "User registered successfully",
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",
  PASSWORD_RESET_EMAIL_SENT: "Password reset link sent to your email",
  PASSWORD_RESET_SUCCESS: "Password reset successfully",
  PASSWORD_CHANGED_SUCCESS: "Password changed successfully",
  EMAIL_VERIFICATION_SENT: "Verification email sent",
};

// Patient Messages
export const PATIENT_MESSAGES = {
  PATIENT_CREATED: "Patient created successfully",
  PATIENT_UPDATED: "Patient updated successfully",
  PATIENT_DELETED: "Patient deleted successfully",
  PATIENT_FETCHED: "Patient fetched successfully",
  PATIENTS_LIST_FETCHED: "Patients list fetched successfully",
  NO_PATIENTS_FOUND: "No patients found",
};

// Appointment Messages
export const APPOINTMENT_MESSAGES = {
  APPOINTMENT_CREATED: "Appointment created successfully",
  APPOINTMENT_UPDATED: "Appointment updated successfully",
  APPOINTMENT_CANCELLED: "Appointment cancelled successfully",
  APPOINTMENT_CONFIRMED: "Appointment confirmed successfully",
  APPOINTMENT_COMPLETED: "Appointment marked as completed",
  APPOINTMENTS_FETCHED: "Appointments fetched successfully",
  TODAY_APPOINTMENTS_FETCHED: "Today's appointments fetched successfully",
  NO_APPOINTMENTS_FOUND: "No appointments found",
};

// Queue Messages
export const QUEUE_MESSAGES = {
  QUEUE_TOKEN_GENERATED: "Queue token generated successfully",
  PATIENT_ADDED_TO_QUEUE: "Patient added to queue successfully",
  QUEUE_STATUS_UPDATED: "Queue status updated successfully",
  QUEUE_FETCHED: "Queue fetched successfully",
  QUEUE_CLEARED: "Queue cleared successfully",
  NO_PATIENTS_IN_QUEUE: "No patients in queue",
  CURRENT_QUEUE_SIZE: "Current queue size",
};

// Visit Messages
export const VISIT_MESSAGES = {
  VISIT_CREATED: "Visit created successfully",
  VISIT_UPDATED: "Visit updated successfully",
  VISIT_DELETED: "Visit deleted successfully",
  VISIT_FETCHED: "Visit fetched successfully",
  VISITS_LIST_FETCHED: "Visits list fetched successfully",
  NO_VISITS_FOUND: "No visits found",
  PATIENT_VISIT_HISTORY: "Patient visit history fetched successfully",
};

// Reminder Messages
export const REMINDER_MESSAGES = {
  REMINDER_CREATED: "Reminder created successfully",
  REMINDER_UPDATED: "Reminder updated successfully",
  REMINDER_DELETED: "Reminder deleted successfully",
  REMINDER_FETCHED: "Reminder fetched successfully",
  REMINDERS_LIST_FETCHED: "Reminders list fetched successfully",
  NO_REMINDERS_FOUND: "No reminders found",
  REMINDER_SENT: "Reminder sent successfully",
};

// Report Messages
export const REPORT_MESSAGES = {
  REPORT_UPLOADED: "Report uploaded successfully",
  REPORT_DELETED: "Report deleted successfully",
  REPORT_FETCHED: "Report fetched successfully",
  REPORTS_LIST_FETCHED: "Reports list fetched successfully",
  NO_REPORTS_FOUND: "No reports found",
  PATIENT_REPORTS_FETCHED: "Patient reports fetched successfully",
};

// User Messages
export const USER_MESSAGES = {
  PROFILE_IMAGE_UPDATED: "Profile image updated successfully",
  USER_PROFILE_UPDATED: "User profile updated successfully",
  USER_DELETED: "User deleted successfully",
  USER_FETCHED: "User fetched successfully",
  USERS_LIST_FETCHED: "Users list fetched successfully",
  PROFILE_IMAGE_REMOVED: "Profile image removed successfully",
};

// General Messages
export const GENERAL_MESSAGES = {
  SUCCESS: "Operation successful",
  FAILED: "Operation failed",
  DATA_FETCHED: "Data fetched successfully",
  DATA_SAVED: "Data saved successfully",
  DATA_UPDATED: "Data updated successfully",
  DATA_DELETED: "Data deleted successfully",
  ACTION_COMPLETED: "Action completed successfully",
  LOADING: "Loading...",
  PLEASE_WAIT: "Please wait...",
};

// Notification Messages
export const NOTIFICATION_MESSAGES = {
  APPOINTMENT_REMINDER: "This is a reminder for your appointment",
  APPOINTMENT_CONFIRMED: "Your appointment has been confirmed",
  APPOINTMENT_CANCELLED: "Your appointment has been cancelled",
  APPOINTMENT_RESCHEDULED: "Your appointment has been rescheduled",
  WELCOME_TO_CLINIC: "Welcome to our clinic",
  THANK_YOU_FOR_VISIT: "Thank you for visiting our clinic",
};

// Validation Messages
export const VALIDATION_MESSAGES = {
  FIELD_REQUIRED: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_PHONE: "Please enter a valid phone number",
  INVALID_DATE: "Please enter a valid date",
  INVALID_TIME: "Please enter a valid time",
  PASSWORD_MISMATCH: "Passwords do not match",
  FIELD_TOO_SHORT: "This field is too short",
  FIELD_TOO_LONG: "This field is too long",
  NUMERIC_ONLY: "This field should contain only numbers",
  ALPHABETIC_ONLY: "This field should contain only letters",
};

// Status Labels
export const STATUS_LABELS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  RESCHEDULED: "Rescheduled",
  IN_PROGRESS: "In Progress",
  ON_HOLD: "On Hold",
  ARCHIVED: "Archived",
};

// Role Labels
export const ROLE_LABELS = {
  ADMIN: "Administrator",
  DOCTOR: "Doctor",
  STAFF: "Staff",
  PATIENT: "Patient",
  RECEPTIONIST: "Receptionist",
  NURSE: "Nurse",
};

// Time Messages
export const TIME_MESSAGES = {
  JUST_NOW: "Just now",
  MINUTES_AGO: "minutes ago",
  HOURS_AGO: "hours ago",
  DAYS_AGO: "days ago",
  WEEKS_AGO: "weeks ago",
  MONTHS_AGO: "months ago",
};

// Confirmation Messages
export const CONFIRMATION_MESSAGES = {
  CONFIRM_DELETE: "Are you sure you want to delete this item?",
  CONFIRM_CANCEL: "Are you sure you want to cancel?",
  CONFIRM_LOGOUT: "Are you sure you want to logout?",
  CONFIRM_ACTION: "Are you sure you want to perform this action?",
  DELETE_CONFIRMATION: "This action cannot be undone",
};
