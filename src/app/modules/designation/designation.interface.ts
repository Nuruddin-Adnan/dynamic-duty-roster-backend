import { Model } from 'mongoose';

export type IDesignation = {
  name: string;
};

export type DesignationModel = Model<IDesignation, Record<string, unknown>>;
