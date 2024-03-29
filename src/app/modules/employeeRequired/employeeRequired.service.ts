import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IFilters, IQueries } from '../../../interfaces/queryFilters';
import searcher from '../../../shared/searcher';
import { IEmployeeRequired } from './employeeRequired.interface';
import { EmployeeRequired } from './employeeRequired.modal';
import { employeeRequiredSearchableFields } from './employeeRequired.constant';

const createEmployeeRequired = async (
  payload: IEmployeeRequired,
): Promise<IEmployeeRequired> => {
  const targetedData = await EmployeeRequired.findOne({
    weekday: payload.weekday,
    workstation: payload.workstation,
    designation: payload.designation,
  });

  if (targetedData) {
    throw new ApiError(httpStatus.FOUND, 'Employee already exsist');
  }

  const result = await EmployeeRequired.create(payload);
  return result;
};

const getAllEmployeeRequireds = async (
  filters: IFilters,
  queries: IQueries,
): Promise<IGenericResponse<IEmployeeRequired[]>> => {
  const conditions = searcher(filters, employeeRequiredSearchableFields);

  const { limit = 0, skip, fields, sort } = queries;

  const resultQuery = EmployeeRequired.find(conditions)
    .skip(skip as number)
    .select(fields as string)
    .sort(sort)
    .limit(limit as number)
    .populate('workstation')
    .populate('designation');

  const [result, total] = await Promise.all([
    resultQuery.exec(),
    EmployeeRequired.countDocuments(conditions),
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

const getSingleEmployeeRequired = async (
  id: string,
): Promise<IEmployeeRequired | null> => {
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee required Not found');
  }

  const result = await EmployeeRequired.findById(id)
    .populate('workstation')
    .populate('designation');

  return result;
};

const updateEmployeeRequired = async (
  id: string,
  payload: Partial<IEmployeeRequired>,
): Promise<IEmployeeRequired | null> => {
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee required Not found');
  }

  const targetedData = await EmployeeRequired.findById(id);

  if (!targetedData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee required Not found');
  }

  const result = await EmployeeRequired.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteEmployeeRequired = async (
  id: string,
): Promise<IEmployeeRequired | null> => {
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee required Not found');
  }
  const result = await EmployeeRequired.findByIdAndDelete(id);
  return result;
};

export const EmployeeRequiredService = {
  createEmployeeRequired,
  getAllEmployeeRequireds,
  getSingleEmployeeRequired,
  updateEmployeeRequired,
  deleteEmployeeRequired,
};
