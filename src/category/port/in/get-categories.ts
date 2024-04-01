import { CategoryPort } from "../out/category.port"
import { PaginationDto } from "../../../domain/dtos"
import { Category } from "../../domain/entities/category.entity"
import { CustomError } from "../../../domain/errors/custom.error"
import { IApiListResponse } from "../../../domain/interfaces/shared/api.interface"

interface GetCategoriesUseCase {
	execute(dto: PaginationDto): Promise<IApiListResponse<Category[]> |CustomError>
}

export class GetCategories implements GetCategoriesUseCase {

	constructor(
		private readonly repository: CategoryPort
	) {}

	async execute(dto: PaginationDto): Promise<IApiListResponse<Category[]> | CustomError> {
		return this.repository.getAll(dto)
	}

}