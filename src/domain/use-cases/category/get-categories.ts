import { PaginationDto } from "../../dtos"
import { Category } from "../../entities/category.entity"
import { CustomError } from "../../errors/custom.error"
import { IApiListResponse } from "../../interfaces/shared/api.interface"
import { CategoryRepository } from "../../repositories/category.repository"

interface GetCategoriesUseCase {
	execute(dto: PaginationDto): Promise<IApiListResponse<Category[]> |CustomError>
}

export class GetCategories implements GetCategoriesUseCase {

	constructor(
		private readonly repository: CategoryRepository
	) {}

	async execute(dto: PaginationDto): Promise<IApiListResponse<Category[]> | CustomError> {
		return this.repository.getAll(dto)
	}

}