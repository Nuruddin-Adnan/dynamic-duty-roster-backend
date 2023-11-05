import { Model, Types } from 'mongoose';
import { IWorkstation } from '../workstation/workstation.interface';
import { IDesignation } from '../designation/designation.interface';

export type IEmployeeRequired = {
  weekday:
    | 'saturday'
    | 'sunday'
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday';
  workstation: Types.ObjectId | IWorkstation;
  count: number;
  designation: Types.ObjectId | IDesignation;
};

export type EmployeeRequiredModel = Model<
  IEmployeeRequired,
  Record<string, unknown>
>;
