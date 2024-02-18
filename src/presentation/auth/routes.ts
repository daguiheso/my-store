import { envs } from './../../config/envs';
import { Router } from 'express';
import { AuthController } from './controller';
import { EmailService } from '../services/email.service';
import { MongoDatasource } from '../../infrastructure/datasources/mongo.datasource';
import { AuthRepositoryImpl } from '../../infrastructure/repositories/auth.repository.impl';


 export class AuthRoutes {

 	static get routes(): Router {

 		const router = Router();

		const emailService = new EmailService(
			envs.MAILER_SERVICE,
			envs.MAILER_EMAIL,
			envs.MAILER_SECRET_KEY
		)

		const authDatasource = new MongoDatasource(emailService)
		const authRepository = new AuthRepositoryImpl(authDatasource)

 		const controller = new AuthController(authRepository)

 		router.post('/login', controller.loginUser);
 		router.post('/register', controller.registerUser);

 		router.get('/validate-email/:token', controller.validateEmail);

 		return router;
 	}


 }

