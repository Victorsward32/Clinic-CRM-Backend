import {
  createAppointment,
  getTodayAppointments,
  updateAppointmentStatus,
} from "./appointment.service.js";

export const addAppointment = async (req, res, next) => {
  try {
    const appointment = await createAppointment(req.body, req.user.id);

    res.status(201).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.log(error, "");
    next(error);
  }
};

export const todaysAppointments = async (req, res, next) => {
  try {
    const appointment = await getTodayAppointments(req.user.id);
    res.status(201).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.log(error, "");
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const appointment = await updateAppointmentStatus(
      req.params.id,
      req.body.status
    );

    res.status(201).json({
        success:true,
        data:appointment
    })
  } catch (error) {
    console.log(error, "");
    next(error);
  }
};
