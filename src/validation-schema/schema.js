import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(3),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const taskFormSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  due_date: z
    .string()
    .refine((val) => !isNaN(new Date(val).getTime()), {
      message: "Invalid due date",
    }),
});
