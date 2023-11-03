import express from 'express';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { DepartmentRoutes } from '../modules/department/department.route';
import { DesignationRoutes } from '../modules/designation/designation.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/departments',
    route: DepartmentRoutes,
  },
  {
    path: '/designations',
    route: DesignationRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
