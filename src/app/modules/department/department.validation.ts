import { z } from 'zod';

const createDepartmentZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
  }),
});

const updateDepartmentZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export const DepartmentValidation = {
    createDepartmentZodSchema,
    updateDepartmentZodSchema,
};
