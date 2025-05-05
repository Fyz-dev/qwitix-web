import z from 'zod';

export const venueSchema = z.object({
  name: z
    .string()
    .nonempty('Name is required.')
    .min(3, 'Name must be at least 3 characters long.')
    .max(255, 'Name cannot exceed 255 characters.'),

  address: z
    .string()
    .nonempty('Address is required.')
    .max(255, 'Address cannot exceed 255 characters.'),

  city: z
    .string()
    .nonempty('City is required.')
    .max(100, 'City cannot exceed 100 characters.'),

  state: z.string().max(100, 'State cannot exceed 100 characters.').optional(),

  zip: z
    .string()
    .transform(val => (val === '' ? undefined : val))
    .optional()
    .refine(
      val => !val || /^\d{1,10}(-\d{1,10})?$/.test(val),
      'Zip can only contain numbers and a hyphen. It can be up to 10 digits long.',
    ),
});

export type VenueSchemaType = z.infer<typeof venueSchema>;
