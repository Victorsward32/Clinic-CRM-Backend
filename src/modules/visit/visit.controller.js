import { createVisit, getPatientVisits } from "./visit.service.js";

export const addVisit= async (req,res,next)=>{
    try {
        const visit=await createVisit(req.body , req.user.id)
        res.status(201).json({
            success:true,
            data: visit
        })
        
    } catch (error) {
        console.log(error,"")
        next(error)
    }
}

export const listVisit = async (req,res,next) =>{
    try {
       const visits = getPatientVisits(req.params.patientId); 
       res.status(201).json({
        success:true,
        data:visits
       })
    } catch (error) {
        console.log(error,"")
        next(error);
    }
}