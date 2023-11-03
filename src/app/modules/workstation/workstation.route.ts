import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { WorkstationValidation } from './workstation.validation';
import { WorkstationController } from './workstation.controller';

const router = express.Router();

router.post(
  '/create-workstation',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(WorkstationValidation.createWorkstationZodSchema),
  WorkstationController.createWorkstation,
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(WorkstationValidation.updateWorkstationZodSchema),
  WorkstationController.updateWorkstation,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  WorkstationController.deleteWorkstation,
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  WorkstationController.getSingleWorkstation,
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  WorkstationController.getAllWorkstations,
);

export const WorkstationRoutes = router;
