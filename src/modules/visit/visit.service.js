import visit from "./visit.model.js";

export const createVisit = async (data,doctorId) =>{
    return await visit.create({
        ...data,
        doctor:doctorId
    })
}

export const getPatientVisits = async (patientId) =>{
    return await visit.find({
        patient:patientId
    }).sort({createdAt:-1});
    
}

