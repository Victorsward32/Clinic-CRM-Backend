export const ROLES = Object.freeze({
  DOCTOR: "DOCTOR",
  STAFF: "STAFF",
  NURSE: "NURSE",
  RECEPTIONIST: "RECEPTIONIST",
  ASSISTANT: "ASSISTANT",
});

export const QUEUE_PRIORITY = Object.freeze({
  EMERGENCY: "EMERGENCY",
  NORMAL: "NORMAL",
});

export const QUEUE_STATUS = Object.freeze({
  WAITING: "WAITING",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  SKIPPED: "SKIPPED",
});

export const VISIT_STATUS = Object.freeze({
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
});

export const PAYMENT_MODE = Object.freeze({
  CASH: "CASH",
  UPI: "UPI",
  CARD: "CARD",
  CHEQUE: "CHEQUE",
  BANK_TRANSFER: "BANK_TRANSFER",
});

export const EARNING_STATUS = Object.freeze({
  RECEIVED: "RECEIVED",
  PENDING: "PENDING",
  REFUNDED: "REFUNDED",
});
