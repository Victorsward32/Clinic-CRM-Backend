import { createReminder } from "./reminder.service.js";
export const addReminder = async (req,res,next) =>{
    try {
        const reminder = await createReminder(req.body);
        res.status(201).json({
            success:true,
            data:reminder
        })
    } catch (error) {
        console.log(error,"")
        next(error)
    }
}