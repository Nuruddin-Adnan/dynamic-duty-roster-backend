import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { EmployeeValidation } from './employee.validation';
import { EmployeeController } from './employee.controller';

const router = express.Router();

router.post(
  '/create-Employee',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(EmployeeValidation.createEmployeeZodSchema),
  EmployeeController.createEmployee,
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(EmployeeValidation.updateEmployeeZodSchema),
  EmployeeController.updateEmployee,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  EmployeeController.deleteEmployee,
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  EmployeeController.getSingleEmployee,
);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), EmployeeController.getAllEmployees);

export const EmployeeRoutes = router;
