import { Router } from "express";
import { CategoryController } from "./controller";
import { AuthMiddleware } from "../../auth/entryPoints/middlewares/auth.middleware";
import { CategoryDatasourceImpl } from "../adapters/datasources/category.datasource.impl";
import { CategoryRepositoryImpl } from "../adapters/repositories/category.repository.impl";

export class CategoryRoutes {

	static get routes(): Router {

		const router = Router();

		const categoryDatasource = new CategoryDatasourceImpl()
		const categoryRepository = new CategoryRepositoryImpl(categoryDatasource)

		const controller = new CategoryController(categoryRepository)

		router.get('/', controller.getCategories);
		router.post('/', AuthMiddleware.validateJwt, controller.createCategory);

		return router;
	}
}