import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import queryFilters from '../../../shared/queryFilters';
import sendResponse from '../../../shared/sendResponse';
import { IEmployeeRequired } from './employeeRequired.interface';
import { EmployeeRequiredService } from './employeeRequired.service';

const createEmployeeRequired = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const result =
      await EmployeeRequiredService.createEmployeeRequired(payload);

    sendResponse<IEmployeeRequired>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Employee required create successfully!',
      data: result,
    });
  },
);

const getAllEmployeeRequireds = catchAsync(
  async (req: Request, res: Response) => {
    const filters = queryFilters(
      req.query as Record<string, string | undefined>,
      req,
    );
    const result = await EmployeeRequiredService.getAllEmployeeRequireds(
      filters.filters,
      filters.queries,
    );
    sendResponse<IEmployeeRequired[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Employee required retrieved successfully !',
      meta: result.meta,
      data: result.data,
    });
  },
);

const getSingleEmployeeRequired = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await EmployeeRequiredService.getSingleEmployeeRequired(id);

    sendResponse<IEmployeeRequired>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Employee required retrieved successfully !',
      data: result,
    });
  },
);

const updateEmployeeRequired = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await EmployeeRequiredService.updateEmployeeRequired(
      id,
      updatedData,
    );

    sendResponse<IEmployeeRequired>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Employee required updated successfully !',
      data: result,
    });
  },
);

const deleteEmployeeRequired = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await EmployeeRequiredService.deleteEmployeeRequired(id);
    sendResponse<IEmployeeRequired>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Employee required deleted successfully !',
      data: result,
    });
  },
);

export const EmployeeRequiredController = {
  createEmployeeRequired,
  getAllEmployeeRequireds,
  getSingleEmployeeRequired,
  updateEmployeeRequired,
  deleteEmployeeRequired,
};
