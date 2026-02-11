import mongoose from "mongoose";
import { QUEUE_PRIORITY, QUEUE_STATUS } from "../../constants/enums.js";

const queueSchema = new mongoose.Schema({
    tokenNumber:{
        type:Number,
        required:true,
    },
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"patient",
        required:true
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    priority:{
        type:String,
        enum:Object.values(QUEUE_PRIORITY),
        default:QUEUE_PRIORITY.NORMAL
    },
    priorityScore: {
        type: Number,
        default: 0
    },
    appointmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"appointment",
        default:null
    },
    status:{
        type:String,
        enum:Object.values(QUEUE_STATUS),
        default:QUEUE_STATUS.WAITING
    },
    // Track when patient was called for consultation
    calledAt:{
        type:Date,
        default:null
    },
    // Track when consultation was completed or skipped
    completedAt:{
        type:Date,
        default:null
    }
},
 { 
     timestamps: true,
     // Indexes for critical queries
     indexes: true
 }
);

// IMPORTANT: Compound index ensures uniqueness of (doctor, patient, status) for active queue entries
// Prevents same patient from joining queue twice in WAITING/IN_PROGRESS states
queueSchema.index(
    { doctor: 1, patient: 1 },
    { 
        unique: true,
        name: "unique_active_queue_entry",
        // Use sparse index to allow multiple COMPLETED/SKIPPED entries for same patient
        partialFilterExpression: {
            status: { $in: [QUEUE_STATUS.WAITING, QUEUE_STATUS.IN_PROGRESS] }
        }
    }
);

// Enforce one active consultation at a time for each doctor.
queueSchema.index(
    { doctor: 1, status: 1 },
    {
      unique: true,
      partialFilterExpression: { status: QUEUE_STATUS.IN_PROGRESS },
      name: "unique_doctor_in_progress"
    }
);

// Index for efficient queue ordering: emergency first then tokenNumber FIFO.
queueSchema.index({ doctor: 1, status: 1, priorityScore: -1, tokenNumber: 1 });

// Index for history queries
queueSchema.index({ doctor: 1, status: 1, completedAt: -1 });
queueSchema.index({ doctor: 1, createdAt: -1 });

queueSchema.pre("validate", function setPriorityScore() {
  this.priorityScore = this.priority === QUEUE_PRIORITY.EMERGENCY ? 1 : 0;
});

const queue = mongoose.model("Queue",queueSchema);

export default queue
