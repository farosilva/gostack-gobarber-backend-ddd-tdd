import { Router } from 'express';

import ensureAuthenticaded from '@modules/users/infra/http/middleware/ensureAuthenticated';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAuthenticaded);

providersRouter.get('/', providersController.index);

export default providersRouter;
