import { CreateCategoryDto } from "../../dtos"
import { Category } from "../../entities/category.entity"
import { UserEntity } from "../../entities/user.entity"
import { CustomError } from "../../errors/custom.error"
import { CategoryRepository } from "../../repositories/category.repository"

interface CreateCategoryUseCase {
	execute(dto: CreateCategoryDto): Promise<Category |CustomError>
}

export class CreateCategory implements CreateCategoryUseCase {

	constructor(
		private readonly repository: CategoryRepository
	) {}

	async execute(dto: CreateCategoryDto): Promise<Category |CustomError> {
		return this.repository.create(dto)
	}
}