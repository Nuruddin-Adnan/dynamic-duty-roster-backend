import mongoose from 'mongoose';
import { z } from 'zod';

const createEmployeeZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    designation: z
      .string({
        required_error: 'Designation is required',
      })
      .refine(
        value => {
          return mongoose.Types.ObjectId.isValid(value);
        },
        {
          message: 'Invalid designation id',
        },
      ),
    department: z
      .string({
        required_error: 'Department is required',
      })
      .refine(
        value => {
          return mongoose.Types.ObjectId.isValid(value);
        },
        {
          message: 'Invalid department id',
        },
      ),
  }),
});

const updateEmployeeZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    designation: z
      .string()
      .refine(
        value => {
          return mongoose.Types.ObjectId.isValid(value);
        },
        {
          message: 'Invalid designation id',
        },
      )
      .optional(),
    department: z
      .string()
      .refine(
        value => {
          return mongoose.Types.ObjectId.isValid(value);
        },
        {
          message: 'Invalid department id',
        },
      )
      .optional(),
  }),
});

export const EmployeeValidation = {
  createEmployeeZodSchema,
  updateEmployeeZodSchema,
};
