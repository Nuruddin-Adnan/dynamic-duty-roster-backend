import mongoose from 'mongoose';
import { z } from 'zod';
import { weekday } from './employeeRequired.constant';

const createEmployeeRequiredZodSchema = z.object({
  body: z.object({
    weekday: z.enum([...weekday] as [string, ...string[]], {
      required_error: 'Weekday is required',
    }),
    workstation: z
      .string({
        required_error: 'Workstation is required',
      })
      .refine(
        value => {
          return mongoose.Types.ObjectId.isValid(value);
        },
        {
          message: 'Invalid workstation id',
        },
      ),
    requiredEmployee: z.object({
      employeeNumber: z.number({
        required_error: 'Employee number is required',
      }),
      employeeDesignation: z
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
    }),
  }),
});

const updateEmployeeRequiredZodSchema = z.object({
  body: z.object({
    weekday: z.enum([...weekday] as [string, ...string[]]).optional(),
    workstation: z
      .string()
      .refine(
        value => {
          return mongoose.Types.ObjectId.isValid(value);
        },
        {
          message: 'Invalid workstation id',
        },
      )
      .optional(),
    requiredEmployee: z.object({
      employeeNumber: z.number().optional(),
      employeeDesignation: z
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
    }),
  }),
});

export const EmployeeRequiredValidation = {
  createEmployeeRequiredZodSchema,
  updateEmployeeRequiredZodSchema,
};
