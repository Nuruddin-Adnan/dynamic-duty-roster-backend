import { Schema, model } from 'mongoose';
import {
  IEmployeeRequired,
  EmployeeRequiredModel,
} from './employeeRequired.interface';
import { weekday } from './employeeRequired.constant';

const employeeRequiredtSchema = new Schema<
  IEmployeeRequired,
  EmployeeRequiredModel
>(
  {
    weekday: {
      type: String,
      enum: {
        values: weekday,
        message: 'weekday can be `{VALUE}`',
      },
      required: true,
    },
    workstation: {
      type: Schema.Types.ObjectId,
      ref: 'Workstation',
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    designation: {
      type: Schema.Types.ObjectId,
      ref: 'Designation',
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

export const EmployeeRequired = model<IEmployeeRequired, EmployeeRequiredModel>(
  'EmployeeRequired',
  employeeRequiredtSchema,
);
