import { Schema, model } from 'mongoose';
import { IEmployee, EmployeeModel } from './employee.interface';

const employeetSchema = new Schema<IEmployee, EmployeeModel>(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: Schema.Types.ObjectId,
      ref: 'Designation',
      required: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Employee = model<IEmployee, EmployeeModel>(
  'Employee',
  employeetSchema,
);
