import { verifyToken } from "../config/jwt.js";
import { ROLES } from "../constants/enums.js";

const STAFF_ROLES = new Set([
  ROLES.STAFF,
  ROLES.NURSE,
  ROLES.RECEPTIONIST,
  ROLES.ASSISTANT,
]);

const normalizeRole = (role) => (typeof role === "string" ? role.toUpperCase() : role);

/**
 * Core authentication middleware
 * Verifies JWT token and attaches user to request
 * Includes role information for role-based access control
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token" });
  }

  const token = authHeader.split(" ")[1];

  if (token.split(".").length !== 3) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  const role = normalizeRole(decoded.role);
  const doctorId = role === ROLES.DOCTOR ? decoded.id : decoded.doctorId;

  req.user = {
    ...decoded,
    role,
    doctorId,
  };

  // Doctor-scoped data owner:
  // - doctor sees own data
  // - staff acts within assigned doctor's scope
  req.doctorScopeId = doctorId;
  next();
};

/**
 * Role-based access control middleware factory
 * Ensures only users with specified roles can access the route
 * 
 * WHY: Centralized, reusable role checking prevents authorization bypass
 * Always check roles on backend (never rely on frontend role hiding)
 * 
 * @param {...string} allowedRoles - List of roles permitted (e.g., 'DOCTOR', 'STAFF')
 * @returns {Function} Express middleware
 * 
 * @example
 * // Only doctors can access earnings
 * router.get('/earnings', authMiddleware, allowRoles('DOCTOR'), getEarnings);
 * 
 * // Staff and doctors can manage queue
 * router.post('/queue', authMiddleware, allowRoles('DOCTOR', 'STAFF'), addToQueue);
 */
export const allowRoles = (...allowedRoles) => {
  const normalizedAllowedRoles = allowedRoles.map(normalizeRole);
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized - no user" });
    }

    // WHY: Check if user's role is in the allowed list
    if (!normalizedAllowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Forbidden - this action requires one of: ${normalizedAllowedRoles.join(", ")}`,
        userRole: req.user.role
      });
    }

    next();
  };
};

export const requireDoctor = (req, res, next) => {
  if (!req.user || req.user.role !== ROLES.DOCTOR) {
    return res.status(403).json({ message: "Doctor access required" });
  }
  return next();
};

export const requireStaff = (req, res, next) => {
  if (!req.user || !STAFF_ROLES.has(req.user.role)) {
    return res.status(403).json({ message: "Staff access required" });
  }
  return next();
};

export const requireDoctorOrStaff = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized - no user" });
  }
  if (req.user.role === ROLES.DOCTOR || STAFF_ROLES.has(req.user.role)) {
    return next();
  }
  return res.status(403).json({ message: "Doctor or staff access required" });
};

export default authMiddleware;
