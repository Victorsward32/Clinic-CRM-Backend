import {
  getPatientById,
  getPatientData,
  createPatient,
} from "./patient.service.js";

export const addPatient = async (req, res, next) => {
  try {
    const patient = await createPatient(req.body, req.user.id);
    res.status(201).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    console.log(error, "");
    next(error);
  }
};

export const listOfPatient = async (req, res, next) => {
  try {
    const { search } = req.query;
    const patients = await getPatientData(search);
    res.status(201).json({
      success: true,
      data: patients,
    });
  } catch (error) {
    console.log(error, "");
    next(error);
  }
};

export const getPatient = async (req,res,next)=>{
    try {
        const patient=  await getPatientById(req.params.id);
        res.status(201).json(
           { success: true, data: patient })
        
    } catch (error) {
        console.log(error,"")
        next(error)
    }
}