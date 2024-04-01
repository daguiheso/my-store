import { Router } from 'express';
import { AuthRoutes } from '../auth/entryPoints/routes';
import { CategoryRoutes } from '../category/entryPoints/routes';
import { ProductRoutes } from '../product/entryPoints/routes';

export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    router.use('/api/auth', AuthRoutes.routes );
    router.use('/api/categories', CategoryRoutes.routes );
    router.use('/api/products', ProductRoutes.routes );

    return router;
  }
}

