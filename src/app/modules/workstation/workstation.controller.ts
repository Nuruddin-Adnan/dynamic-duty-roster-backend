import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import queryFilters from '../../../shared/queryFilters';
import sendResponse from '../../../shared/sendResponse';
import { IWorkstation } from './workstation.interface';
import { WorkstationService } from './workstation.service';

const createWorkstation = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await WorkstationService.createWorkstation(payload);

  sendResponse<IWorkstation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Workstation create successfully!',
    data: result,
  });
});

const getAllWorkstations = catchAsync(async (req: Request, res: Response) => {
  const filters = queryFilters(
    req.query as Record<string, string | undefined>,
    req,
  );
  const result = await WorkstationService.getAllWorkstations(
    filters.filters,
    filters.queries,
  );
  sendResponse<IWorkstation[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Workstation retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleWorkstation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await WorkstationService.getSingleWorkstation(id);

  sendResponse<IWorkstation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Workstation retrieved successfully !',
    data: result,
  });
});

const updateWorkstation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await WorkstationService.updateWorkstation(id, updatedData);

  sendResponse<IWorkstation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Workstation updated successfully !',
    data: result,
  });
});

const deleteWorkstation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await WorkstationService.deleteWorkstation(id);
  sendResponse<IWorkstation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Workstation deleted successfully !',
    data: result,
  });
});

export const WorkstationController = {
  createWorkstation,
  getAllWorkstations,
  getSingleWorkstation,
  updateWorkstation,
  deleteWorkstation,
};
