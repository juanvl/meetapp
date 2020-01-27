import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import UserOwnedMeetupsController from './app/controllers/UserOwnedMeetupsController';
import SubscriptionController from './app/controllers/SubscriptionController';
import authMiddleware from './app/middlewares/auth';

import * as UserValidator from './app/validators/UserValidator';
import * as MeetupValidator from './app/validators/MeetupValidator';
import * as SessionValidator from './app/validators/SessionValidator';
import * as UserOwnedMeetupsValidator from './app/validators/UserOwnedMeetupsValidator';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserValidator.store, UserController.store);
routes.post('/sessions', SessionValidator.store, SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserValidator.update, UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/meetups', MeetupController.index);
routes.post('/meetups', MeetupValidator.store, MeetupController.store);
routes.get('/meetups/:id', MeetupController.detail);

routes.get('/uomeetups', UserOwnedMeetupsController.index);
routes.put(
  '/uomeetups/:id',
  UserOwnedMeetupsValidator.update,
  UserOwnedMeetupsController.update
);
routes.delete('/uomeetups/:id', UserOwnedMeetupsController.delete);

routes.get('/subscriptions', SubscriptionController.index);
routes.post('/subscriptions', SubscriptionController.store);
routes.delete('/subscriptions/:id', SubscriptionController.delete);

export default routes;
