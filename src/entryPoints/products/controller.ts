import { CreateProduct, CreateProductDto, CustomError, PaginationDto, ProductRepository } from "../../domain"
import { Request, Response } from "express";
import { GetProducts } from "../../domain/use-cases/product/get-products";

export class ProductController {

	constructor(
		private readonly repository: ProductRepository
	) { }

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ error: error.message })
		}

		console.log(error)
		return res.status(500).json({ error: 'Internal server error' })
	}

	createProduct = (req: Request, res: Response) => {

		const [error, createProductDto] = CreateProductDto.create(req.body)
		if (error) return res.status(400).json({ error })

		new CreateProduct(this.repository)
			.execute(createProductDto!)
			.then(product => res.status(201).json(product))
			.catch(error => this.handleError(error, res))
	}

	getProducts = (req: Request, res: Response) => {
		const { page = 1, limit = 5 } = req.query
		const [error, paginationDto] = PaginationDto.create({ page: +page, limit: +limit })
		if (error) return res.status(400).json({ error })

		new GetProducts(this.repository)
			.execute(paginationDto!)
			.then(products => res.json(products))
			.catch(error => this.handleError(error, res))
	}
}