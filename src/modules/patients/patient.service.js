import AppError from "../../utils/appError.js";
import { patientRepository } from "../../repositories/patient.repository.js";

const sanitizePatient = (item) => {
  if (!item) return null;
  return {
    _id: item._id,
    name: item.name,
    age: item.age,
    weight: item.weight,
    height: item.height,
    gender: item.gender,
    address: item.address,
    phoneNumber: item.phoneNumber,
    email: item.email,
    profileImage: item.profileImage || null,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
};

export const createPatient = async (data, userId) => {
  try {
    const created = await patientRepository.create({
      ...data,
      createdBy: userId,
    });
    return sanitizePatient(created.toObject());
  } catch (error) {
    if (error.code === 11000) {
      throw new AppError("Patient with this phone number already exists", 409, "PATIENT_PHONE_EXISTS");
    }
    throw error;
  }
};

export const getPatientData = async (search) => {
  const patients = await patientRepository.list(search);
  return patients.map(sanitizePatient);
};

export const getPatientById = async (id) => {
  const patient = await patientRepository.findById(id);
  return sanitizePatient(patient);
};

export const archivePatientById = async (id) => {
  const archived = await patientRepository.archiveById(id);
  if (!archived) {
    throw new AppError("Patient not found", 404, "PATIENT_NOT_FOUND");
  }
  return sanitizePatient(archived);
};

export const getPatientHistoryById = async (patientId) => {
  const [history] = await patientRepository.historyAggregate(patientId);
  if (!history) {
    throw new AppError("Patient not found", 404, "PATIENT_NOT_FOUND");
  }
  return history;
};
