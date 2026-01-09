import { getPatientReportsService,uploadPatientReportService } from "./report.service.js";

export const uploadPatientReport  = async (req,res,next)=>{
  try {
    const report = await uploadPatientReportService({
      patientId: req.body.patientId,
      file: req.file,
      uploadedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
    next(error)
  }
}

export const getPatientReport = async (req,res,next)=>{
    try {
        const report = await getPatientReportsService(req.params.patientId);

        res.status(201).josn({
            success:true,
            message:report
        })
    } catch (error) {
        next(error)
    }
}