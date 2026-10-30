import { z } from "zod";

const optionalText = (max: number) => z.string().trim().max(max, `Please keep this to ${max} characters or fewer.`).optional().or(z.literal(""));

export const enquirySchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(100, "Please keep your name under 100 characters."),
  email: z.string().trim().email("Enter a valid email address.").max(254, "Please use an email address under 254 characters."),
  phone: z.string().trim().min(7, "Enter a phone number with at least 7 characters.").max(24, "Please keep your phone number under 24 characters.").regex(/^[+()\d\s.-]+$/, "Use digits and standard phone-number characters only."),
  courseSlug: z.string().trim().min(1, "Choose a course or examination.").max(100),
  educationLevel: optionalText(80),
  preferredFormat: z.enum(["", "in-person", "online", "hybrid"]).optional(),
  preferredContactMethod: z.enum(["", "email", "phone", "whatsapp"]).optional(),
  message: optionalText(1200),
});

export const enquiryRequestSchema = enquirySchema.extend({ website: z.string().max(0, "Invalid submission.").optional() });
export type EnquiryValues = z.infer<typeof enquirySchema>;
