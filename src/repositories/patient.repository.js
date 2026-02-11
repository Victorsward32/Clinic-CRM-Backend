import patient from "../modules/patients/patient.model.js";
import mongoose from "mongoose";

export const patientRepository = {
  create(payload) {
    return patient.create(payload);
  },

  findById(id) {
    return patient.findOne({ _id: id, isArchived: false }).lean();
  },

  list(search) {
    const query = { isArchived: false };
    if (search) {
      const safe = String(search).trim();
      query.$or = [
        { name: { $regex: safe, $options: "i" } },
        { phoneNumber: { $regex: safe, $options: "i" } },
        { email: { $regex: safe, $options: "i" } },
      ];
    }

    return patient
      .find(query)
      .sort({ createdAt: -1 })
      .lean();
  },

  async archiveById(id) {
    return patient
      .findOneAndUpdate(
        { _id: id, isArchived: false },
        { isArchived: true, archivedAt: new Date() },
        { new: true }
      )
      .lean();
  },

  historyAggregate(patientId) {
    return patient.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(patientId),
          isArchived: false,
        },
      },
      {
        $lookup: {
          from: "visits",
          let: { patientId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$patient", "$$patientId"] },
              },
            },
            { $sort: { createdAt: -1 } },
            { $limit: 50 },
          ],
          as: "visits",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          age: 1,
          gender: 1,
          phoneNumber: 1,
          email: 1,
          visitCount: { $size: "$visits" },
          lastVisitAt: { $max: "$visits.createdAt" },
          visits: {
            $slice: [
              {
                $map: {
                  input: "$visits",
                  as: "visit",
                  in: {
                    _id: "$$visit._id",
                    symptoms: "$$visit.symptoms",
                    diagnosis: "$$visit.diagnosis",
                    status: "$$visit.status",
                    completedAt: "$$visit.completedAt",
                    createdAt: "$$visit.createdAt",
                  },
                },
              },
              10,
            ],
          },
        },
      },
    ]);
  },
};
