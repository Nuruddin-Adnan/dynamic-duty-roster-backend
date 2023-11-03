import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import queryFilters from '../../../shared/queryFilters';
import sendResponse from '../../../shared/sendResponse';
import { IEmployee } from './employee.interface';
import { EmployeeService } from './employee.service';

const createEmployee = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await EmployeeService.createEmployee(payload);

  sendResponse<IEmployee>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee create successfully!',
    data: result,
  });
});

const getAllEmployees = catchAsync(async (req: Request, res: Response) => {
  const filters = queryFilters(
    req.query as Record<string, string | undefined>,
    req,
  );
  const result = await EmployeeService.getAllEmployees(
    filters.filters,
    filters.queries,
  );
  sendResponse<IEmployee[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleEmployee = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EmployeeService.getSingleEmployee(id);

  sendResponse<IEmployee>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee retrieved successfully !',
    data: result,
  });
});

const updateEmployee = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await EmployeeService.updateEmployee(id, updatedData);

  sendResponse<IEmployee>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee updated successfully !',
    data: result,
  });
});

const deleteEmployee = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EmployeeService.deleteEmployee(id);
  sendResponse<IEmployee>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee deleted successfully !',
    data: result,
  });
});

export const EmployeeController = {
  createEmployee,
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
