import { Router } from 'express';

import { AuthRoutes } from '../auth/entryPoints/routes';
import { CategoryRoutes } from '../category/entryPoints/routes';
import { ProductRoutes } from '../product/entryPoints/routes';
import { UploadFileRoutes } from '../uploadFile/entryPoints/routes';

export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    router.use('/api/auth', AuthRoutes.routes );
    router.use('/api/categories', CategoryRoutes.routes );
    router.use('/api/products', ProductRoutes.routes );
    router.use('/api/upload', UploadFileRoutes.routes );

    return router;
  }
}

