import cloudinary from "../config/cloudinary.js";

/**
 * Generate public URL for Cloudinary files
 * Works for any publicly accessible file in Cloudinary
 */

// Basic public URL
export const getPublicUrl = (publicId) => {
  if (!publicId) return null;
  return cloudinary.url(publicId, {
    secure: true,
    resource_type: "auto",
  });
};

// Optimized public URL (auto WebP, auto quality)
export const getOptimizedUrl = (publicId, options = {}) => {
  if (!publicId) return null;
  
  return cloudinary.url(publicId, {
    secure: true,
    quality: "auto",
    fetch_format: "auto",  // Returns WebP/AVIF if browser supports
    resource_type: "auto",
    ...options,  // Allow override
  });
};

// User profile image URL (with default size)
export const getUserImageUrl = (publicId) => {
  if (!publicId) return null;
  
  return cloudinary.url(publicId, {
    secure: true,
    width: 300,
    height: 300,
    crop: "fill",
    gravity: "face",  // Focus on face
    quality: "auto",
    fetch_format: "auto",
    resource_type: "auto",
  });
};

// Medical report thumbnail (for PDF preview)
export const getReportThumbnailUrl = (publicId) => {
  if (!publicId) return null;
  
  return cloudinary.url(publicId, {
    secure: true,
    width: 400,
    height: 500,
    crop: "fill",
    page: 1,  // First page of PDF
    quality: "auto",
    fetch_format: "auto",
    resource_type: "auto",
  });
};

// Full resolution report (for download/view)
export const getReportFullUrl = (publicId) => {
  if (!publicId) return null;
  
  return cloudinary.url(publicId, {
    secure: true,
    resource_type: "auto",
  });
};

// Gallery image with specified dimensions
export const getResizedImageUrl = (publicId, width = 800, height = 600) => {
  if (!publicId) return null;
  
  return cloudinary.url(publicId, {
    secure: true,
    width,
    height,
    crop: "fill",
    quality: "auto",
    fetch_format: "auto",
    resource_type: "auto",
  });
};

// Multiple URLs at once (useful for performance)
export const getMultipleUrls = (publicIds) => {
  return publicIds.map(id => getPublicUrl(id));
};

// Transform URL with custom parameters
export const transformUrl = (publicId, transformParams = {}) => {
  return cloudinary.url(publicId, {
    secure: true,
    resource_type: "auto",
    ...transformParams,
  });
};

/**
 * Usage Examples:
 * 
 * // Basic URL
 * getPublicUrl("clinic/reports/report_123")
 * 
 * // Optimized for web
 * getOptimizedUrl("clinic/user/avatar_456")
 * 
 * // User avatar
 * getUserImageUrl("clinic/user/avatar_456")
 * 
 * // Report thumbnail
 * getReportThumbnailUrl("clinic/reports/doc.pdf")
 * 
 * // Custom resize
 * getResizedImageUrl("clinic/user/avatar_456", 150, 150)
 * 
 * // Multiple at once
 * getMultipleUrls(["clinic/reports/1", "clinic/reports/2"])
 */
