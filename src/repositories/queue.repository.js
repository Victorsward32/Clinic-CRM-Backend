import queue from "../modules/queue/queue.model.js";
import queueCounter from "../modules/queueCounter/queueCounter.model.js";
import { QUEUE_STATUS } from "../constants/enums.js";

export const queueRepository = {
  getActiveQueue(doctorId) {
    return queue
      .find({
        doctor: doctorId,
        status: { $in: [QUEUE_STATUS.WAITING, QUEUE_STATUS.IN_PROGRESS] },
      })
      .populate("patient")
      .sort({ priorityScore: -1, tokenNumber: 1 })
      .lean();
  },

  getQueueHistory(doctorId) {
    return queue
      .find({
        doctor: doctorId,
        status: { $in: [QUEUE_STATUS.COMPLETED, QUEUE_STATUS.SKIPPED] },
      })
      .populate("patient", "name phoneNumber profileImage")
      .sort({ completedAt: -1 })
      .lean();
  },

  findByIdForDoctor(queueId, doctorId) {
    return queue.findOne({ _id: queueId, doctor: doctorId });
  },

  findByIdForDoctorLean(queueId, doctorId) {
    return queue
      .findOne({ _id: queueId, doctor: doctorId })
      .populate("patient", "name phoneNumber profileImage")
      .lean();
  },

  findActivePatientEntry(patientId, doctorId) {
    return queue.findOne({
      patient: patientId,
      doctor: doctorId,
      status: { $in: [QUEUE_STATUS.WAITING, QUEUE_STATUS.IN_PROGRESS] },
    });
  },

  async incrementTokenCounter(doctorId) {
    return queueCounter.findOneAndUpdate(
      { doctor: doctorId },
      { $inc: { currentTokenNumber: 1 } },
      { new: true, upsert: true }
    );
  },

  resetTokenCounter(doctorId) {
    return queueCounter.findOneAndUpdate(
      { doctor: doctorId },
      { currentTokenNumber: 0, lastResetAt: new Date() },
      { new: true, upsert: true }
    );
  },

  create(entry) {
    return queue.create(entry);
  },

  findOneInProgress(doctorId) {
    return queue
      .findOne({ doctor: doctorId, status: QUEUE_STATUS.IN_PROGRESS })
      .populate("patient", "name phoneNumber profileImage")
      .lean();
  },

  findAndSetNextInProgress(doctorId) {
    return queue
      .findOneAndUpdate(
        { doctor: doctorId, status: QUEUE_STATUS.WAITING },
        { status: QUEUE_STATUS.IN_PROGRESS, calledAt: new Date() },
        { sort: { priorityScore: -1, tokenNumber: 1 }, new: true }
      )
      .populate("patient", "name phoneNumber profileImage")
      .lean();
  },

  updateStatusWithExpectedCurrent(queueId, doctorId, expectedStatusList, nextStatus) {
    const update = {
      status: nextStatus,
      ...(nextStatus === QUEUE_STATUS.IN_PROGRESS ? { calledAt: new Date() } : {}),
      ...([QUEUE_STATUS.COMPLETED, QUEUE_STATUS.SKIPPED].includes(nextStatus)
        ? { completedAt: new Date() }
        : {}),
    };

    return queue
      .findOneAndUpdate(
        {
          _id: queueId,
          doctor: doctorId,
          status: { $in: expectedStatusList },
        },
        update,
        { new: true }
      )
      .populate("patient", "name phoneNumber profileImage")
      .lean();
  },
};
