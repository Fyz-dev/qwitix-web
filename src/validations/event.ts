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

  imgFile: z
    .array(z.custom<File>())
    .refine(files => files.every(file => file.size <= 5 * 1024 * 1024), {
      message: 'File size must be less than 5MB',
      path: ['files'],
    })
    .optional(),

  venue: venueSchema,
});

export const eventSchemaPublish = z
  .object({
    startDate: z
      .date({
        required_error: 'StartDate is required',
        invalid_type_error: 'StartDate must be a valid date',
      })
      .refine(date => date >= new Date(), {
        message: 'StartDate cannot be earlier than the current date.',
      }),

    endDate: z.date({
      required_error: 'EndDate is required',
      invalid_type_error: 'EndDate must be a valid date',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.endDate && data.endDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'EndDate cannot be earlier than StartDate.',
        path: ['endDate'],
      });
    }
  });

export type EventSchemaType = z.infer<typeof eventSchema>;
export type EventSchemaPublishType = z.infer<typeof eventSchemaPublish>;
