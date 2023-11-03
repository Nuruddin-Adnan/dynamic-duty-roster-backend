import { Schema, model } from 'mongoose';
import { IWorkstation, WorkstationModel } from './workstation.interface';

const WorkstationtSchema = new Schema<IWorkstation, WorkstationModel>(
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

export const Workstation = model<IWorkstation, WorkstationModel>(
  'Workstation',
  WorkstationtSchema,
);
