import { z } from "zod";

/**
 * Application form schema — the single source of truth.
 * Used by:
 *   - components/blocks/apply-form.tsx (client validation via zodResolver)
 *   - app/api/apply/route.ts (server validation via safeParse)
 *
 * NEVER trust the client. Always re-validate on the server.
 */
export const applySchema = z.object({
  fullName: z
    .string()
    .min(2, "Please enter your full name")
    .max(100, "Name is too long (max 100 characters)"),

  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email address"),

  whatsapp: z
    .string()
    .min(8, "Please enter your WhatsApp number")
    .max(20, "Number is too long (max 20 characters)"),

  role: z.enum(
    ["frontend", "backend", "devops", "design", "community", "ops", "other"],
    {
      errorMap: () => ({ message: "Please select a role" }),
    }
  ),

  department: z.enum(
    ["engineering", "design", "community", "operations", "undecided"],
    {
      errorMap: () => ({ message: "Please select a department" }),
    }
  ),

  commitment: z.enum(["5h", "10h", "20h", "fulltime"], {
    errorMap: () => ({ message: "Please select your availability" }),
  }),

  skills: z
    .array(z.string())
    .min(1, "Please select at least one skill")
    .max(10, "Please select at most 10 skills"),

  portfolio: z
    .string()
    .url("Please enter a valid URL (e.g., https://github.com/you)")
    .optional()
    .or(z.literal("")),

  whyCraftly: z
    .string()
    .min(50, "Please tell us more (at least 50 characters)")
    .max(1000, "Please keep it under 1000 characters"),

  turnstileToken: z
    .string()
    .min(1, "Please verify you're human"),
});

export type ApplyFormValues = z.infer<typeof applySchema>;

/**
 * Role options for the form dropdown.
 * Keys must match the enum in applySchema.
 */
export const roleOptions = [
  { value: "frontend", label: "Frontend Contributor" },
  { value: "backend", label: "Backend Contributor" },
  { value: "devops", label: "DevOps Engineer" },
  { value: "design", label: "Product Designer" },
  { value: "community", label: "Community Manager" },
  { value: "ops", label: "Operations" },
  { value: "other", label: "Other" },
] as const;

export const departmentOptions = [
  { value: "engineering", label: "Engineering" },
  { value: "design", label: "Design" },
  { value: "community", label: "Community" },
  { value: "operations", label: "Operations" },
  { value: "undecided", label: "Not sure yet" },
] as const;

export const commitmentOptions = [
  { value: "5h", label: "5 hours/week (side)" },
  { value: "10h", label: "10 hours/week (serious)" },
  { value: "20h", label: "20 hours/week (major)" },
  { value: "fulltime", label: "Full-time" },
] as const;

export const skillOptions = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
  "Figma",
  "UI/UX Design",
  "DevOps",
  "Community Management",
  "Content Writing",
  "Project Management",
  "Other",
] as const;
