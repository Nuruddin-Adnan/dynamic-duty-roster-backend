import { z } from 'zod';

const createWorkstationZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
  }),
});

const updateWorkstationZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export const WorkstationValidation = {
  createWorkstationZodSchema,
  updateWorkstationZodSchema,
};
