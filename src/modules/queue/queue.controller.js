import {
  createQueueToken,
  getQueue,
  updateQueueStatus,
} from "./queue.service.js";

export const addToQueue = async (req, res, next) => {
  try {
    const token = await createQueueToken(req.body.patientId, req.user.id);
    res.status(201).json({
      success: true,
      data: token,
    });
  } catch (error) {
    console.log(error, "");
    next(error);
  }
};

export const listOfQueue =  async (req,res,next)=>{
    try {
        const queue= await getQueue(req.user.id)
        res.status(201).json({success:true,data:queue})
    } catch (error) {
        console.log(error,"");
        next(error);
    }
}

export const updateStatus  = async (req,res,next) =>{
    try {
        const queue= await updateQueueStatus(
            req.params.id,
            req.body.status
        )
        res.status(201).json({success:true,data:queue})
        
    } catch (error) {
        console.log(error,"");
        next(error)
    }
}