import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'patient',
        required:true
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    appointmentDate:{
        type:Date,
        required:true
    },
    type:{
        type:String,
        enum:["WALKING","ONLINE"],
        default:"WALKING"
    },
    status:{
        type:String,
        enum:["SHEDULED","COMPLETED","CANCELLED"],
        default:"SCHEDULED",
    },

    reason:String

},{timestamps:true})

const appointment= mongoose.model("appointment",appointmentSchema);
export default appointment