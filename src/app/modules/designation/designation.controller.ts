import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import queryFilters from '../../../shared/queryFilters';
import sendResponse from '../../../shared/sendResponse';
import { IDesignation } from './designation.interface';
import { DesignationService } from './designation.service';

const createDesignation = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await DesignationService.createDesignation(payload);

  sendResponse<IDesignation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Designation create successfully!',
    data: result,
  });
});

const getAllDesignations = catchAsync(async (req: Request, res: Response) => {
  const filters = queryFilters(
    req.query as Record<string, string | undefined>,
    req,
  );
  const result = await DesignationService.getAllDesignations(
    filters.filters,
    filters.queries,
  );
  sendResponse<IDesignation[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Designation retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDesignation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DesignationService.getSingleDesignation(id);

  sendResponse<IDesignation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Designation retrieved successfully !',
    data: result,
  });
});

const updateDesignation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await DesignationService.updateDesignation(id, updatedData);

  sendResponse<IDesignation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Designation updated successfully !',
    data: result,
  });
});

const deleteDesignation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DesignationService.deleteDesignation(id);
  sendResponse<IDesignation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Designation deleted successfully !',
    data: result,
  });
});

export const DesignationController = {
  createDesignation,
  getAllDesignations,
  getSingleDesignation,
  updateDesignation,
  deleteDesignation,
};
