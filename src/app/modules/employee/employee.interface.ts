import { Model, Types } from 'mongoose';
import { IDesignation } from '../designation/designation.interface';
import { IDepartment } from '../department/department.interface';

export type IEmployee = {
  name: string;
  designation: Types.ObjectId | IDesignation;
  department: Types.ObjectId | IDepartment;
};

export type EmployeeModel = Model<IEmployee, Record<string, unknown>>;
