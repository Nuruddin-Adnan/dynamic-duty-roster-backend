import { Model } from 'mongoose';

export type IWorkstation = {
  name: string;
};

export type WorkstationModel = Model<IWorkstation, Record<string, unknown>>;
