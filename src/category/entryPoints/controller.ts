import { Request, Response } from "express";

import {
	CustomError,
	PaginationDto
} from "../../domain";
import { CategoryPort } from "../port/out/category.port";
import { CreateCategoryDto } from "../domain/dtos/create-category.dto";
import { CreateCategory } from "../port/in/create-category";
import { GetCategories } from "../port/in/get-categories";

export class CategoryController {

	constructor(
		private readonly repository: CategoryPort
	) { }

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ error: error.message })
		}

		console.log(error)
		return res.status(500).json({ error: 'Internal server error' })
	}

	createCategory = (req: Request, res: Response) => {

		const [error, createCategoryDto] = CreateCategoryDto.create(req.body)
		if (error) return res.status(400).json({ error })

		new CreateCategory(this.repository)
			.execute(createCategoryDto!)
			.then(category => res.status(201).json(category))
			.catch(error => this.handleError(error, res))
	}

	getCategories = (req: Request, res: Response) => {
		const { page = 1, limit = 5 } = req.query
		const [error, paginationDto] = PaginationDto.create({ page: +page, limit: +limit })
		if (error) return res.status(400).json({ error })

		new GetCategories(this.repository)
			.execute(paginationDto!)
			.then(categories => res.json(categories))
			.catch(error => this.handleError(error, res))
	}
}