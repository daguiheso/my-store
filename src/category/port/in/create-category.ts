import { CategoryPort } from "../out/category.port"
import { Category } from "../../domain/entities/category.entity"
import { CustomError } from "../../../domain/errors/custom.error"
import { CreateCategoryDto } from "../../domain/dtos/create-category.dto"

interface CreateCategoryUseCase {
	execute(dto: CreateCategoryDto): Promise<Category |CustomError>
}

export class CreateCategory implements CreateCategoryUseCase {

	constructor(
		private readonly repository: CategoryPort
	) {}

	async execute(dto: CreateCategoryDto): Promise<Category |CustomError> {
		return this.repository.create(dto)
	}
}