import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IFilters, IQueries } from '../../../interfaces/queryFilters';
import searcher from '../../../shared/searcher';
import { IDesignation } from './designation.interface';
import { Designation } from './designation.modal';
import { designationSearchableFields } from './designation.constant';

const createDesignation = async (
  payload: IDesignation,
): Promise<IDesignation> => {
  const result = await Designation.create(payload);
  return result;
};

const getAllDesignations = async (
  filters: IFilters,
  queries: IQueries,
): Promise<IGenericResponse<IDesignation[]>> => {
  const conditions = searcher(filters, designationSearchableFields);

  const { limit = 0, skip, fields, sort } = queries;

  const resultQuery = Designation.find(conditions)
    .skip(skip as number)
    .select(fields as string)
    .sort(sort)
    .limit(limit as number);

  const [result, total] = await Promise.all([
    resultQuery.exec(),
    Designation.countDocuments(conditions),
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

const getSingleDesignation = async (
  id: string,
): Promise<IDesignation | null> => {
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Designation Not found');
  }

  const result = await Designation.findById(id);

  return result;
};

const updateDesignation = async (
  id: string,
  payload: Partial<IDesignation>,
): Promise<IDesignation | null> => {
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Designation Not found');
  }

  const targetedData = await Designation.findById(id);

  if (!targetedData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Designation Not found');
  }

  const result = await Designation.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteDesignation = async (id: string): Promise<IDesignation | null> => {
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Designation Not found');
  }
  const result = await Designation.findByIdAndDelete(id);
  return result;
};

export const DesignationService = {
  createDesignation,
  getAllDesignations,
  getSingleDesignation,
  updateDesignation,
  deleteDesignation,
};
