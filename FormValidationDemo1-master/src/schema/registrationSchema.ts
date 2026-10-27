// `z` is Zod's core object: it builds validation schemas (z.object, z.string, ...)
// and infers TypeScript types from them. This file is pure logic — no React.
import { z } from "zod";

// Validation rules for the registration form.
// `.trim()` strips surrounding whitespace before `.min()` checks length.
export const registrationSchema = z.object({
  studentName: z
    .string()
    .trim()
    .min(2, "Name must have at least 2 characters."),

  courseCode: z
    .string()
    .trim()
    .min(4, "Course code must have at least 4 characters."),
});

// Derive the TypeScript type from the schema — single source of truth.
export type RegistrationForm = z.infer<typeof registrationSchema>;
