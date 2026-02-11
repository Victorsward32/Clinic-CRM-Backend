import env from "../config/env.js";
import logger from "../services/logger.service.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const errorCode = err.code || "INTERNAL_ERROR";
  const isValidationError = err.name === "ZodError";

  logger.error(err.message || "Unhandled error", {
    path: req.originalUrl,
    method: req.method,
    statusCode,
    code: errorCode,
    stack: err.stack,
  });

  const response = {
    success: false,
    message: isValidationError ? "Validation failed" : err.message || "Internal Server Error",
    code: isValidationError ? "VALIDATION_ERROR" : errorCode,
  };

  if (isValidationError) {
    response.details = err.issues || err.errors || [];
  } else if (err.details) {
    response.details = err.details;
  }

  if (!env.isProduction || env.exposeStack) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

export default errorHandler;
