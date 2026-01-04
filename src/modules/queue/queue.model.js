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
    status:{
        type:String,
        enum:["WAITING", "IN_PROGRESS", "COMPLETED"],
        default:"WAITING"
    }
},
 { timestamps: true }
)

const queue = mongoose.model("Queue",queueSchema);

export default queue