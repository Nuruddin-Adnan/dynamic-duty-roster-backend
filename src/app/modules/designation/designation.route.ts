import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { DesignationValidation } from './designation.validation';
import { DesignationController } from './designation.controller';

const router = express.Router();

router.post(
  '/create-designation',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(DesignationValidation.createDesignationZodSchema),
  DesignationController.createDesignation,
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(DesignationValidation.updateDesignationZodSchema),
  DesignationController.updateDesignation,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  DesignationController.deleteDesignation,
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  DesignationController.getSingleDesignation,
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  DesignationController.getAllDesignations,
);

export const DesignationRoutes = router;
