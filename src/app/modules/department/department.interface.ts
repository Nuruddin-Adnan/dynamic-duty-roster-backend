import { Model } from 'mongoose';

export type IDepartment = {
  name: string;
};

export type DepartmentModel = Model<IDepartment, Record<string, unknown>>;
