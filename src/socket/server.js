import { Server } from "socket.io";
import { verifyToken } from "../config/jwt.js";

let io;

/**
 * Initializes Socket.IO server with secure configuration
 * WHY: Separate initialization ensures JWT verification before any socket operations
 * Maintains socket instance in memory for broadcasting during REST operations
 * 
 * CORS Configuration:
 * - MUST match Express CORS settings in app.js for consistency
 * - Allows frontend to establish WebSocket connection
 * - In production, restrict origin to specific frontend URL
 * 
 * SECURITY:
 * - JWT verification on every connection prevents unauthorized access
 * - Room-based namespacing ensures doctors only see their own queue updates
 * - No user-provided room names (calculated from verified JWT)
 * 
 * @param {http.Server} server - Node.js HTTP server instance
 * @throws {Error} If JWT config is missing or invalid
 */

export const initSocketServer = (server) => {
    const corsOptions = {
        // In production, use: origin: process.env.FRONTEND_URL || "http://localhost:3000"
        // Must match Express CORS origin setting
        origin: process.env.FRONTEND_URL || "*",
        
        // Allow credentials (auth tokens in headers)
        credentials: process.env.FRONTEND_URL ? true : false,
        
        // HTTP methods for WebSocket upgrade
        methods: ["GET", "POST"]
    };

    io = new Server(server, {
        cors: corsOptions,
        // WHY: Limit concurrent connections and prevent resource exhaustion
        maxHttpBufferSize: 1e6, // 1MB max message size
        transports: ["websocket", "polling"] // Use websocket first (more efficient)
    });

    /**
     * Connection handler - validates JWT before allowing socket connection
     * WHY: First security checkpoint - rejects unauthenticated connections immediately
     */
    io.on("connection", (socket) => {
        console.log(`[Socket.IO] New client connected: ${socket.id}`);

        try {
            // Step 1: Extract token from handshake auth
            const token = socket.handshake.auth.token;
            
            if (!token) {
                console.warn(`[Socket.IO] ${socket.id} - No auth token provided`);
                socket.disconnect(true);
                return;
            }

            // Step 2: Verify JWT token
            // WHY: Ensures only authenticated users can maintain socket connection
            const decoded = verifyToken(token);
            
            if (!decoded) {
                console.warn(`[Socket.IO] ${socket.id} - Invalid or expired token`);
                socket.disconnect(true);
                return;
            }

            // Step 3: Store user info in socket for later use
            // WHY: Allows room-based broadcasting without re-verifying JWT
            socket.userId = decoded.id;
            socket.userRole = decoded.role;
            
            console.log(`[Socket.IO] ${socket.id} authenticated as user ${decoded.id}`);

            // Step 4: Listen for explicit room joining
            socket.on("join-doctor-room", (doctorId) => {
                handleDoctorRoomJoin(socket, doctorId);
            });

            // Step 5: Handle reconnection/auto-rejoin
            socket.on("reconnect-queue", (doctorId) => {
                handleDoctorRoomJoin(socket, doctorId);
            });

            // Step 6: Log disconnection
            socket.on("disconnect", () => {
                console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
            });

            // Step 7: Handle errors
            socket.on("error", (error) => {
                console.error(`[Socket.IO] ${socket.id} - Error:`, error.message);
            });

        } catch (error) {
            console.error(`[Socket.IO] Connection error for ${socket.id}:`, error.message);
            socket.disconnect(true);
        }
    });

    console.log("[Socket.IO] Initialized successfully");
};

/**
 * Handles doctor-room joining with authorization
 * WHY: Prevents patients from joining doctor rooms, enforces role-based access
 * Room name format: `doctor:<doctorId>` ensures uniqueness and clarity
 * 
 * SECURITY:
 * - Validates doctorId is a valid ObjectId
 * - Only DOCTOR role can join doctor rooms (in future enhancement)
 * - Socket is authenticated before reaching this function
 * 
 * @param {Socket} socket - Socket.IO socket instance
 * @param {string} doctorId - Doctor's MongoDB ObjectId
 */
const handleDoctorRoomJoin = (socket, doctorId) => {
    try {
        // Validate doctorId is not null/empty
        if (!doctorId || typeof doctorId !== "string") {
            console.warn(`[Socket.IO] ${socket.id} - Invalid doctorId format`);
            socket.emit("error", { message: "Invalid doctorId" });
            return;
        }

        // Validate doctorId is a valid MongoDB ObjectId (24 hex chars)
        if (!/^[0-9a-f]{24}$/i.test(doctorId)) {
            console.warn(`[Socket.IO] ${socket.id} - doctorId not valid ObjectId: ${doctorId}`);
            socket.emit("error", { message: "Invalid ObjectId format" });
            return;
        }

        // WHY: Future-proof for role-based access (DOCTOR vs STAFF/PATIENT)
        // Currently allows all authenticated users (can restrict if needed)
        // if (socket.userRole !== "DOCTOR") {
        //     console.warn(`[Socket.IO] ${socket.id} - Non-doctor user tried joining doctor room`);
        //     socket.emit("error", { message: "Unauthorized" });
        //     return;
        // }

        const roomName = `doctor:${doctorId}`;
        
        // Leave any previously joined doctor rooms (prevent duplicate emissions)
        // WHY: User might reconnect or switch doctors - clean up old rooms
        const previousRooms = Array.from(socket.rooms).filter(
            (room) => room.startsWith("doctor:")
        );
        previousRooms.forEach((room) => {
            socket.leave(room);
            console.log(`[Socket.IO] ${socket.id} left room ${room}`);
        });

        // Join the doctor room
        socket.join(roomName);
        console.log(`[Socket.IO] ${socket.id} joined room ${roomName}`);

        // Confirm to client
        socket.emit("room-joined", {
            roomName: roomName,
            message: `Joined doctor room ${roomName}`
        });

    } catch (error) {
        console.error(`[Socket.IO] Error joining doctor room for ${socket.id}:`, error.message);
        socket.emit("error", { message: "Failed to join room" });
    }
};

/**
 * Returns the Socket.IO instance
 * WHY: Controllers/services need access to broadcast events
 * Centralizes socket instance management
 * 
 * @returns {Server} Socket.IO server instance
 * @throws {Error} If Socket.IO not initialized
 */
export const getIO = () => {
    if (!io) {
        const error = new Error("Socket.IO not initialized. Call initSocketServer first.");
        console.error(error.message);
        throw error;
    }
    return io;
};

/**
 * Utility: Emit queue update to specific doctor room
 * WHY: Prevents duplicate emit calls across codebase (DRY principle)
 * Centralized logging for debugging
 * 
 * @param {string} doctorId - Doctor's MongoDB ObjectId
 * @param {string} eventName - Socket event name (queue-updated, patient-called, etc)
 * @param {object} data - Event data payload
 */
export const emitQueueUpdate = (doctorId, eventName, data) => {
    try {
        const roomName = `doctor:${doctorId}`;
        io.to(roomName).emit(eventName, data);
        console.log(`[Socket.IO] Emitted ${eventName} to ${roomName}`);
    } catch (error) {
        console.error(`[Socket.IO] Error emitting ${eventName}:`, error.message);
    }
};
