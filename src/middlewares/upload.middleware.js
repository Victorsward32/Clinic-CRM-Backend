import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "clinic/user",
    resource_type: "raw",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    access_mode: "public",
  },
});

const reportStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "clinic/reports",
    resource_type: "auto",
    allowed_formats: ["jpg", "jpeg", "png", "pdf"],
  },
});

export const uploadUserImage = multer({ storage: imageStorage });
export const uploadReport = multer({ storage: reportStorage });