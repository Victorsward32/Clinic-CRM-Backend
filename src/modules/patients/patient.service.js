import patient from "./patient.model.js";

export const createPatient = async (data,userId)=>{
    return await patient.create({
        ...data,
        createdBy:userId,
    })
}

export const getPatientData = async (search)=>{
    if(!search ) return await patient.find().sort({createdAt:-1});
     return await patient.find({
$or:[
    {name: { $regex: search, $options: "i" }},
    {phone: { $regex: search, $options: "i" }}
]
     })
}

export const getPatientById = async (id) => {
  return await patient.findById(id);
};  