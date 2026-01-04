import mongoose  from "mongoose";

const visitSchema = new mongoose.Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'patient',
        required:true
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    appointment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'appointment'
    },
    symptoms: String,
    diagnosis: String,
    prescription: String,

    followUpDate: Date
},{timestamps:true})

const visit= mongoose.model('visit',visitSchema)
export default visit