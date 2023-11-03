import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { EmployeeRequiredValidation } from './employeeRequired.validation';
import { EmployeeRequiredController } from './employeeRequired.controller';

const router = express.Router();

router.post(
  '/create-employee-required',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(EmployeeRequiredValidation.createEmployeeRequiredZodSchema),
  EmployeeRequiredController.createEmployeeRequired,
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(EmployeeRequiredValidation.updateEmployeeRequiredZodSchema),
  EmployeeRequiredController.updateEmployeeRequired,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  EmployeeRequiredController.deleteEmployeeRequired,
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  EmployeeRequiredController.getSingleEmployeeRequired,
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  EmployeeRequiredController.getAllEmployeeRequireds,
);

export const EmployeeRequiredRoutes = router;
