import { PaginationDto } from "../../dtos"
import { ProductEntity } from "../../entities/product.entity"
import { CustomError } from "../../errors/custom.error"
import { IApiListResponse } from "../../interfaces/shared/api.interface"
import { ProductRepository } from "../../repositories/product.repository"

interface GetProductsUseCase {
	execute(dto: PaginationDto): Promise<IApiListResponse<ProductEntity[]> |CustomError>
}

export class GetProducts implements GetProductsUseCase {

	constructor(
		private readonly repository: ProductRepository
	) {}

	async execute(dto: PaginationDto): Promise<IApiListResponse<ProductEntity[]> | CustomError> {
		return this.repository.getAll(dto)
	}

}