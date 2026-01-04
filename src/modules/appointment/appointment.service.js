import appointment from "./appointment.model.js";

export const createAppointment = async (data,doctorId)=>{
    return await appointment.create({
        ...data,
        doctor: doctorId,
    })
}

export const getTodayAppointments = async (doctorId)=>{

    const start= new Date();
    start.setHours(0,0,0,0);

    const end= new Date();
    end.setHours(23,59,59,999)

    return await appointment.find({
        doctor:doctorId,
        appointmentDate:{$gte:start, $lte:end}
    }).populate("patient")
}

export const updateAppointmentStatus = async (id,status)=>{
    return await appointment.findByIdAndUpdate(
        id,
        {status},
        {new : true}
    )

}