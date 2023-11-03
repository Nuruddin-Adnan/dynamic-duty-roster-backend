import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import queryFilters from '../../../shared/queryFilters';
import sendResponse from '../../../shared/sendResponse';
import { IDepartment } from './department.interface';
import { DepartmentService } from './department.service';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await DepartmentService.createDepartment(payload);

  sendResponse<IDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department create successfully!',
    data: result,
  });
});

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = queryFilters(
    req.query as Record<string, string | undefined>,
    req,
  );
  const result = await DepartmentService.getAllDepartments(
    filters.filters,
    filters.queries,
  );
  sendResponse<IDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DepartmentService.getSingleDepartment(id);

  sendResponse<IDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department retrieved successfully !',
    data: result,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await DepartmentService.updateDepartment(id, updatedData);

  sendResponse<IDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department updated successfully !',
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DepartmentService.deleteDepartment(id);
  sendResponse<IDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department deleted successfully !',
    data: result,
  });
});

export const DepartmentController = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
