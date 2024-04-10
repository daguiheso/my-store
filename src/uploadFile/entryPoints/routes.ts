import { Router } from "express";

import { AuthMiddleware } from "../../auth/entryPoints/middlewares/auth.middleware";
import { FileUploadController } from "./controller";
import { FileDatasourceImpl } from "../adapters/datasources/file.datasource.impl";
import { FileRepositoryImpl } from "../adapters/repositories/file.repository.impl";

export class UploadFileRoutes {

	static get routes(): Router {

		const router = Router();

		const fileDatasource = new FileDatasourceImpl()
		const fileRepository = new FileRepositoryImpl(fileDatasource)

		const controller = new FileUploadController(fileRepository)

		// api/upload/single/<user|category|product>
		router.post('/single/:type', controller.uploadFile);
		// api/upload/bulk/<user|category|product>
		router.post('/bulk/:type', controller.uploadBulkFile);

		return router;
	}
}