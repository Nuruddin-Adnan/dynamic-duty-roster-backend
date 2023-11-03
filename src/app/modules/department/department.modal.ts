import { Schema, model } from 'mongoose';
import { DepartmentModel, IDepartment } from './department.interface';

const departmentSchema = new Schema<IDepartment, DepartmentModel>(
  {
    name: {
      type: String,
      unique: true,
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

export const Department = model<IDepartment, DepartmentModel>(
  'Department',
  departmentSchema,
);
