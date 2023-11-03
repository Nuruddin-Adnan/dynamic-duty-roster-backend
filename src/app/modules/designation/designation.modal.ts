import { Schema, model } from 'mongoose';
import { DesignationModel, IDesignation } from './designation.interface';

const designationtSchema = new Schema<IDesignation, DesignationModel>(
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

export const Designation = model<IDesignation, DesignationModel>(
  'Designation',
  designationtSchema,
);
