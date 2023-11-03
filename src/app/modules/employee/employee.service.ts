import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IFilters, IQueries } from '../../../interfaces/queryFilters';
import searcher from '../../../shared/searcher';
import { IEmployee } from './employee.interface';
import { Employee } from './employee.modal';
import { employeeSearchableFields } from './employee.constant';

const createEmployee = async (payload: IEmployee): Promise<IEmployee> => {
  const result = await Employee.create(payload);
  return result;
};

const getAllEmployees = async (
  filters: IFilters,
  queries: IQueries,
): Promise<IGenericResponse<IEmployee[]>> => {
  const conditions = searcher(filters, employeeSearchableFields);

  const { limit = 0, skip, fields, sort } = queries;

  const resultQuery = Employee.find(conditions)
    .skip(skip as number)
    .select(fields as string)
    .sort(sort)
    .limit(limit as number)
    .populate({
      path: 'designation',
      select: 'name', // Specify the fields you want to select from the  document
    })
    .populate({
      path: 'department',
      select: 'name', // Specify the fields you want to select from the  document
    });

  const [result, total] = await Promise.all([
    resultQuery.exec(),
    Employee.countDocuments(conditions),
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

const getSingleEmployee = async (id: string): Promise<IEmployee | null> => {
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee Not found');
  }

  const result = await Employee.findById(id)
    .populate('designation')
    .populate('department');

  return result;
};

const updateEmployee = async (
  id: string,
  payload: Partial<IEmployee>,
): Promise<IEmployee | null> => {
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee Not found');
  }

  const targetedData = await Employee.findById(id);

  if (!targetedData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee Not found');
  }

  const result = await Employee.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteEmployee = async (id: string): Promise<IEmployee | null> => {
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee Not found');
  }
  const result = await Employee.findByIdAndDelete(id);
  return result;
};

export const EmployeeService = {
  createEmployee,
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
