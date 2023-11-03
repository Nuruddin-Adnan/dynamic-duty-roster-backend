import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IFilters, IQueries } from '../../../interfaces/queryFilters';
import searcher from '../../../shared/searcher';
import { IWorkstation } from './workstation.interface';
import { Workstation } from './workstation.modal';
import { workstationSearchableFields } from './workstation.constant';

const createWorkstation = async (
  payload: IWorkstation,
): Promise<IWorkstation> => {
  const result = await Workstation.create(payload);
  return result;
};

const getAllWorkstations = async (
  filters: IFilters,
  queries: IQueries,
): Promise<IGenericResponse<IWorkstation[]>> => {
  const conditions = searcher(filters, workstationSearchableFields);

  const { limit = 0, skip, fields, sort } = queries;

  const resultQuery = Workstation.find(conditions)
    .skip(skip as number)
    .select(fields as string)
    .sort(sort)
    .limit(limit as number);

  const [result, total] = await Promise.all([
    resultQuery.exec(),
    Workstation.countDocuments(conditions),
  ]);

  const page = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleWorkstation = async (
  id: string,
): Promise<IWorkstation | null> => {
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Workstation Not found');
  }

  const result = await Workstation.findById(id);

  return result;
};

const updateWorkstation = async (
  id: string,
  payload: Partial<IWorkstation>,
): Promise<IWorkstation | null> => {
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Workstation Not found');
  }

  const targetedData = await Workstation.findById(id);

  if (!targetedData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Workstation Not found');
  }

  const result = await Workstation.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteWorkstation = async (id: string): Promise<IWorkstation | null> => {
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Workstation Not found');
  }
  const result = await Workstation.findByIdAndDelete(id);
  return result;
};

export const WorkstationService = {
  createWorkstation,
  getAllWorkstations,
  getSingleWorkstation,
  updateWorkstation,
  deleteWorkstation,
};
