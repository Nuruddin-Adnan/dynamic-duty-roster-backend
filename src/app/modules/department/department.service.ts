import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IFilters, IQueries } from '../../../interfaces/queryFilters';
import searcher from '../../../shared/searcher';
import { IDepartment } from './department.interface';
import { Department } from './department.modal';
import { departmentSearchableFields } from './department.constant';

const createDepartment = async (payload: IDepartment): Promise<IDepartment> => {
  const result = await Department.create(payload);
  return result;
};

const getAllDepartments = async (
  filters: IFilters,
  queries: IQueries,
): Promise<IGenericResponse<IDepartment[]>> => {
  const conditions = searcher(filters, departmentSearchableFields);

  const { limit = 0, skip, fields, sort } = queries;

  const resultQuery = Department.find(conditions)
    .skip(skip as number)
    .select(fields as string)
    .sort(sort)
    .limit(limit as number);

  const [result, total] = await Promise.all([
    resultQuery.exec(),
    Department.countDocuments(conditions),
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

const getSingleDepartment = async (id: string): Promise<IDepartment | null> => {
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Department Not found');
  }

  const result = await Department.findById(id);

  return result;
};

const updateDepartment = async (
  id: string,
  payload: Partial<IDepartment>,
): Promise<IDepartment | null> => {
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Department Not found');
  }

  const targetedData = await Department.findById(id);

  if (!targetedData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Department Not found');
  }

  const result = await Department.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteDepartment = async (id: string): Promise<IDepartment | null> => {
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Department Not found');
  }
  const result = await Department.findByIdAndDelete(id);
  return result;
};

export const DepartmentService = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
