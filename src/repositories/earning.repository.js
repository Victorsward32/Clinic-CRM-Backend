import mongoose from "mongoose";
import earning from "../modules/earning/earning.model.js";

export const earningRepository = {
  create(payload) {
    return earning.create(payload);
  },

  findByQueueId(queueId) {
    return earning.findOne({ queueId }).lean();
  },

  findByIdForDoctor(earningId, doctorId) {
    return earning.findOne({ _id: earningId, doctor: doctorId }).lean();
  },

  listByDoctor(doctorId, { startDate, endDate, limit, skip }) {
    const query = { doctor: doctorId };
    if (startDate || endDate) {
      query.visitDate = {};
      if (startDate) query.visitDate.$gte = new Date(startDate);
      if (endDate) query.visitDate.$lte = new Date(endDate);
    }

    return earning
      .find(query)
      .populate("patient", "name email phoneNumber")
      .sort({ visitDate: -1 })
      .limit(limit)
      .skip(skip)
      .lean();
  },

  countByDoctor(doctorId, { startDate, endDate }) {
    const query = { doctor: doctorId };
    if (startDate || endDate) {
      query.visitDate = {};
      if (startDate) query.visitDate.$gte = new Date(startDate);
      if (endDate) query.visitDate.$lte = new Date(endDate);
    }
    return earning.countDocuments(query);
  },

  summaryFacet(doctorId) {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const yearStart = new Date(now.getFullYear(), 0, 1);
    const nextYear = new Date(now.getFullYear() + 1, 0, 1);

    return earning.aggregate([
      {
        $match: { doctor: new mongoose.Types.ObjectId(doctorId) },
      },
      {
        $facet: {
          today: [
            { $match: { visitDate: { $gte: todayStart, $lt: tomorrow } } },
            { $group: { _id: null, total: { $sum: "$consultationFee" } } },
          ],
          thisMonth: [
            { $match: { visitDate: { $gte: monthStart, $lt: nextMonth } } },
            { $group: { _id: null, total: { $sum: "$consultationFee" } } },
          ],
          thisYear: [
            { $match: { visitDate: { $gte: yearStart, $lt: nextYear } } },
            { $group: { _id: null, total: { $sum: "$consultationFee" } } },
          ],
          allTime: [{ $group: { _id: null, total: { $sum: "$consultationFee" } } }],
        },
      },
    ]);
  },

  monthlyAggregation(doctorId, { startDate, endDate }) {
    const match = { doctor: new mongoose.Types.ObjectId(doctorId) };
    if (startDate || endDate) {
      match.visitDate = {};
      if (startDate) match.visitDate.$gte = new Date(startDate);
      if (endDate) match.visitDate.$lte = new Date(endDate);
    }

    return earning.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            year: { $year: "$visitDate" },
            month: { $month: "$visitDate" },
          },
          totalEarnings: { $sum: "$consultationFee" },
          consultationCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          totalEarnings: 1,
          consultationCount: 1,
          averagePerConsultation: {
            $cond: [
              { $eq: ["$consultationCount", 0] },
              0,
              { $round: [{ $divide: ["$totalEarnings", "$consultationCount"] }, 0] },
            ],
          },
        },
      },
      { $sort: { year: -1, month: -1 } },
    ]);
  },

  updateByIdForDoctor(earningId, doctorId, updates) {
    return earning
      .findOneAndUpdate({ _id: earningId, doctor: doctorId }, updates, {
        new: true,
        runValidators: true,
      })
      .lean();
  },

  deleteByIdForDoctor(earningId, doctorId) {
    return earning.findOneAndDelete({ _id: earningId, doctor: doctorId }).lean();
  },
};
