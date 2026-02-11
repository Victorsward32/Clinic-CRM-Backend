import dotenv from "dotenv";

dotenv.config();

const toBool = (value, defaultValue = false) => {
  if (typeof value === "undefined") return defaultValue;
  return String(value).toLowerCase() === "true";
};

const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction: (process.env.NODE_ENV || "development") === "production",
  port: Number(process.env.port || process.env.PORT || 3000),
  mongoUri: process.env.mongo_db_url,
  jwtSecret: process.env.jwt_secret_key,
  jwtExpiresIn: process.env.jwt_token_expires_in || "7d",
  frontendUrl: process.env.FRONTEND_URL || "*",
  logLevel: process.env.LOG_LEVEL || "info",
  exposeStack: toBool(process.env.EXPOSE_STACK, false),
});

if (!env.mongoUri) {
  throw new Error("Missing environment variable: mongo_db_url");
}

if (!env.jwtSecret) {
  throw new Error("Missing environment variable: jwt_secret_key");
}

export default env;
