import z from 'zod';

export const organizerSchema = z.object({
  name: z
    .string()
    .min(1, 'Name cannot be empty.')
    .max(250, 'Name cannot be longer than 250 characters.'),

  bio: z
    .string()
    .max(2500, 'Bio cannot be longer than 2500 characters.')
    .optional(),

  imageUrl: z.string().url('ImageUrl must be a valid URL.').optional(),
});

export type OrganizerSchemaType = z.infer<typeof organizerSchema>;
