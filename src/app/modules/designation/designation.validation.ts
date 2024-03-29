import { z } from 'zod';

const createDesignationZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
  }),
});

const updateDesignationZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export const DesignationValidation = {
  createDesignationZodSchema,
  updateDesignationZodSchema,
};
