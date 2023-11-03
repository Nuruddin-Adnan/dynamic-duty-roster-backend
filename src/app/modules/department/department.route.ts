import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { DepartmentValidation } from './department.validation';
import { DepartmentController } from './department.controller';

const router = express.Router();

router.post(
  '/create-department',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(DepartmentValidation.createDepartmentZodSchema),
  DepartmentController.createDepartment,
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(DepartmentValidation.updateDepartmentZodSchema),
  DepartmentController.updateDepartment,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  DepartmentController.deleteDepartment,
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  DepartmentController.getSingleDepartment,
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  DepartmentController.getAllDepartments,
);

export const DepartmentRoutes = router;
