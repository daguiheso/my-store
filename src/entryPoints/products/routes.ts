import { Router } from "express";
import { ProductController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ProductDatasourceImpl } from "../../adapters/datasources/product.datasource.impl";
import { ProductRepositoryImpl } from "../../adapters/repositories/product.repository.impl";

export class ProductRoutes {

	static get routes(): Router {

		const router = Router();

		const productDatasource = new ProductDatasourceImpl()
		const productRepository = new ProductRepositoryImpl(productDatasource)

		const controller = new ProductController(productRepository)

		router.get('/', controller.getProducts);
		router.post('/', AuthMiddleware.validateJwt, controller.createProduct);

		return router;
	}
}