import { Category } from "../../entities/category.entity"
import { CustomError } from "../../errors/custom.error"
import { CategoryRepository } from "../../repositories/category.repository"

interface GetCategoriesUseCase {
	execute(): Promise<Category[] |CustomError>
}

export class GetCategories implements GetCategoriesUseCase {

	constructor(
		private readonly repository: CategoryRepository
	) {}

	async execute(): Promise<Category[] | CustomError> {
		return this.repository.getAll()
	}

}