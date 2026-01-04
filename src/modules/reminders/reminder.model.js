import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({

patient:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'patient',
    required:true
},
phone:{
    type:String,
    required:true
},
channel:{
    type:String,
    enum:["SMS","WHATSAPP"],
    required:true
},
message:{
    type:String,
    required:true,
    index:true

},
sendAt:{
    type:Date,
    required:true,
},
sent:{
    type:Boolean,
    default:false
}
},{timestamps:true})

const reminder=  mongoose.model('reminder',reminderSchema);

export default reminder