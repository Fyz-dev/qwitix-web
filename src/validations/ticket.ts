import z from 'zod';

export const ticketSchema = z.object({
  name: z
    .string()
    .nonempty('Name is required.')
    .max(100, 'Name cannot be longer than 100 characters.'),

  details: z
    .string()
    .max(800, 'Details cannot be longer than 800 characters.')
    .optional(),

  price: z.coerce
    .number({ invalid_type_error: 'Price must be a number.' })
    .nonnegative('Price cannot be negative.'),

  quantity: z.coerce
    .number({ invalid_type_error: 'Quantity must be a number.' })
    .int('Quantity must be an integer.')
    .gt(0, 'Quantity cannot be negative or zero.'),
});

export type TicketSchemaType = z.infer<typeof ticketSchema>;
