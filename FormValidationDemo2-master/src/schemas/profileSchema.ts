import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().trim().min(2, "Minimum 2 characters."),
  lastName: z.string().trim().min(2, "Minimum 2 characters."),
  email: z.string().trim().email("Enter a valid email."),
  studentId: z.string().trim().length(9, "Student ID must be 9 characters."),
  phone: z.string().refine((value) => value.replace(/\D/g, "").length >= 10, {
    message: "Phone number must contain at least 10 digits.",
  }),
});

export type ProfileForm = z.infer<typeof profileSchema>;
