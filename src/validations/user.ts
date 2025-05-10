import z from 'zod';

export const userSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: 'Full name cannot be empty.' })
    .refine(val => val.trim().length > 0, {
      message: 'Full name cannot be just whitespace.',
    }),
});

export type UserSchemaType = z.infer<typeof userSchema>;
