import { z } from 'zod'

export const signupSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    name: z.string().min(3),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // error path
  })

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const taskFormSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2).optional(),
  due_date: z
    .string()
    .refine((val) => !isNaN(new Date(val).getTime()), {
      message: 'Invalid due date',
    })
    .optional(),
})
