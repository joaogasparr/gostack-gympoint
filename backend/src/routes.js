// Libraries
import { Router } from 'express';

// Controllers
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import AnswerController from './app/controllers/AnswerController';

// Middlewares
import validateSessionStore from './app/validators/Sessions/Store';
import validateStudentStore from './app/validators/Students/Store';
import validateStudentUpdate from './app/validators/Students/Update';
import validatePlanStore from './app/validators/Plans/Store';
import validatePlanUpdate from './app/validators/Plans/Update';
import validateEnrollmentStore from './app/validators/Enrollments/Store';
import validateEnrollmentUpdate from './app/validators/Enrollments/Update';
import validateHelpOrderStore from './app/validators/HelpOrders/Store';
import validateAnswerStore from './app/validators/Answers/Store';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();

// Sessions
routes.post('/sessions', validateSessionStore, SessionController.store);
// CheckIn
routes.get(`/students/:student_id/checkins`, CheckinController.index);
routes.post(`/students/:student_id/checkins`, CheckinController.store);
// Help Order
routes.get(`/students/:student_id/help-orders`, HelpOrderController.index);
routes.post(
  `/students/:student_id/help-orders`,
  validateHelpOrderStore,
  HelpOrderController.store
);
// Students
routes.get('/students/:id', StudentController.show);
// Middlewares
routes.use(authMiddlewares);
// Students
routes.get('/students', StudentController.index);
routes.post('/students', validateStudentStore, StudentController.store);
routes.put('/students/:id', validateStudentUpdate, StudentController.update);
routes.delete('/students/:id', StudentController.delete);
// Plans
routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.post('/plans', validatePlanStore, PlanController.store);
routes.put('/plans/:id', validatePlanUpdate, PlanController.update);
routes.delete('/plans/:id', PlanController.delete);
// Enrollment
routes.get('/enrollments', EnrollmentController.index);
routes.get('/enrollments/:id', EnrollmentController.show);
routes.post(
  '/enrollments',
  validateEnrollmentStore,
  EnrollmentController.store
);
routes.put(
  '/enrollments/:id',
  validateEnrollmentUpdate,
  EnrollmentController.update
);
routes.delete('/enrollments/:id', EnrollmentController.delete);
// Answer
routes.get('/help-orders/questions', AnswerController.index);
routes.post(
  `/help-orders/:helporder_id/answer`,
  validateAnswerStore,
  AnswerController.store
);

export default routes;
