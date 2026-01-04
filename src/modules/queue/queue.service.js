import queue from "./queue.model.js";

export const createQueueToken = async ( patientId,doctorId, )=>{
const lastToken = await queue.findOne({doctor:doctorId}).sort({ tokenNumber: -1 })
const tokenNumber =lastToken? lastToken?.tokenNumber + 1: 1;
return await queue.create({
    tokenNumber,
    patient: patientId,
    doctor: doctorId,
})
}

export const getQueue = async (doctorId)=>{ 
    return await queue.find({
      doctor: doctorId,
    status: { $ne: "COMPLETED" }
  }).populate("patient");

}

export const updateQueueStatus = async (id, status)=>{
    return await queue.findByIdAndUpdate(
        id,
        {status},
        {new:true}
    )
}