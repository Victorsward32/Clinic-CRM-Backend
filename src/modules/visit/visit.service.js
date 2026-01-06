import visit from "./visit.model.js";

export const createVisit = async (data,doctorId) =>{
    return await visit.create({
        ...data,
        doctor:doctorId
    })
}

export const getPatientVisits = async (patientId) => {
  console.log("Patient ID:", patientId);

  const visits = await visit
    .find({ patient: patientId })
    .sort({ createdAt: -1 });

  console.log("Visits:", visits);

  return visits;
};


