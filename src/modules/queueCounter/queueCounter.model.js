import mongoose from "mongoose";

/**
 * Queue Counter Schema
 * WHY: Maintains atomic token number generation using MongoDB's $inc operator
 * One counter per doctor to generate sequential token numbers
 * Tokens are doctor-scoped (doctor1 may have token 1-50, doctor2 may have token 1-30)
 * 
 * USAGE:
 * - Use findOneAndUpdate with $inc to atomically increment counter
 * - Prevents token duplication even under concurrent requests
 * - Reset counter at start of new day
 */
const queueCounterSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true, // One counter per doctor
        required: true,
        index: true  // Fast lookup by doctor ID
    },
    currentTokenNumber: {
        type: Number,
        default: 0, // Starts at 0, first increment makes it 1
    },
    // Track when counter was last reset (for daily reset logic)
    lastResetAt: {
        type: Date,
        default: Date.now
    }
}, { 
    timestamps: true 
});

const queueCounter = mongoose.model("QueueCounter", queueCounterSchema);

export default queueCounter;