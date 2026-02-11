import visit from "../modules/visit/visit.model.js";
import queue from "../modules/queue/queue.model.js";
import { QUEUE_STATUS, VISIT_STATUS } from "../constants/enums.js";

export const visitRepository = {
  create(payload) {
    return visit.create(payload);
  },

  findByQueueEntry(queueId) {
    return visit.findOne({ queueEntry: queueId }).lean();
  },

  findQueueInProgress(queueId, doctorId) {
    return queue
      .findOne({
        _id: queueId,
        doctor: doctorId,
        status: QUEUE_STATUS.IN_PROGRESS,
      })
      .lean();
  },

  listPatientVisits(patientId) {
    return visit
      .find({ patient: patientId })
      .sort({ createdAt: -1 })
      .lean();
  },

  findByIdForDoctor(visitId, doctorId) {
    return visit.findOne({ _id: visitId, doctor: doctorId }).lean();
  },

  completeVisit(visitId, doctorId, updates) {
    return visit
      .findOneAndUpdate(
        {
          _id: visitId,
          doctor: doctorId,
          status: VISIT_STATUS.IN_PROGRESS,
        },
        {
          ...updates,
          status: VISIT_STATUS.COMPLETED,
          completedAt: new Date(),
        },
        { new: true }
      )
      .lean();
  },
};
