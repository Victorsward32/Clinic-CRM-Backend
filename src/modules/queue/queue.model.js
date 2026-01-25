import mongoose from "mongoose";

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
        enum:["EMERGENCY","NORMAL"],
        default:"NORMAL"
    },
    appointmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"appointment",
        default:null
    },
    status:{
        type:String,
        enum:["WAITING", "IN_PROGRESS", "COMPLETED", "SKIPPED"],
        default:"WAITING"
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
    { doctor: 1, patient: 1, status: 1 },
    { 
        name: "unique_active_queue_entry",
        // Use sparse index to allow multiple COMPLETED/SKIPPED entries for same patient
        sparse: true,
        partialFilterExpression: {
            status: { $in: ["WAITING", "IN_PROGRESS"] }
        }
    }
);

// Index for efficient queue ordering: by priority (descending) then tokenNumber (ascending)
queueSchema.index({ doctor: 1, status: 1, priority: -1, tokenNumber: 1 });

// Index for history queries
queueSchema.index({ doctor: 1, status: 1, completedAt: -1 });

const queue = mongoose.model("Queue",queueSchema);

export default queue