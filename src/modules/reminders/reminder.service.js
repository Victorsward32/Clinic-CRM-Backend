import reminder from "./reminder.model.js";

export const createReminder= async (data)=>{
    return await reminder.create(data);
}

export const  getPendingReminders = async ()=>{
    return await reminder.find({
        sent:false,
        sendAt:{
            $lte:new Date()
        }
    })
}

export const markAsSent = async (id)=>{
    return await reminder.findByIdAndUpdate(
        id,
        {sent:true},
        {new:true}
    );
};