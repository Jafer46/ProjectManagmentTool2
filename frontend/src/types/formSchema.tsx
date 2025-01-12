import { z } from "zod";

const fileSizeLimit = 5 * 1024 * 1024; // 5MB

// Document Schema
export const DOCUMENT_SCHEMA = z
  .instanceof(File)
  .refine(
    (file) =>
      [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/svg+xml",
        "image/gif",
        "application/pdf",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type),
    { message: "Invalid file type" }
  )
  .refine((file) => file.size <= fileSizeLimit, {
    message: "File size should not exceed 5MB",
  });

// Image Schema
export const IMAGE_SCHEMA = z
  .instanceof(File)
  .refine(
    (file) =>
      [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/svg+xml",
        "image/gif",
      ].includes(file.type),
    { message: "Invalid image file type" }
  )
  .refine((file) => file.size <= fileSizeLimit, {
    message: "File size should not exceed 5MB",
  });

export const userSchema = z.object({
  username: z.string().min(2, {
    message: "user must be at least two characters.",
  }),
  email: z.string().email("invalid email address"),
  avatar: z.string().optional(),
  password: z.string().min(8, {
    message: "password must be at least eight characters.",
  }),
  fullName: z.string().optional(),
});

export const projectSchema = z.object({
  title: z.string().min(3, {
    message: "title must be at least three later.",
  }),
  description: z.string().min(3, {
    message: "description must be at least three characters.",
  }),
  deadline: z.date({ message: "deadline is required" }),
  priority: z.string(),
  type: z.string(),
});
