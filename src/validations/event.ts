import z from 'zod';

import { venueSchema } from './venue';

export const eventSchema = z.object({
  title: z
    .string()
    .nonempty('Title cannot be empty.')
    .max(250, 'Title cannot exceed 250 characters.'),

  description: z
    .string()
    .max(10000, 'Description cannot exceed 10000 characters.')
    .optional(),

  category: z
    .string()
    .nonempty('Category cannot be empty.')
    .max(100, 'Category cannot exceed 100 characters.'),

  venue: venueSchema,
});

export type EventSchemaType = z.infer<typeof eventSchema>;
