import { PaginationDto } from "../../dtos"
import { GetAllProductsDto } from "../../dtos/product/get-all-products.dto"
import { CustomError } from "../../errors/custom.error"
import { IApiListResponse } from "../../interfaces/shared/api.interface"
import { ProductRepository } from "../../repositories/product.repository"

interface GetProductsUseCase {
	execute(dto: PaginationDto): Promise<IApiListResponse<GetAllProductsDto[]> |CustomError>
}

export class GetProducts implements GetProductsUseCase {

	constructor(
		private readonly repository: ProductRepository
	) {}

	async execute(dto: PaginationDto): Promise<IApiListResponse<GetAllProductsDto[]> | CustomError> {
		return this.repository.getAll(dto)
	}

}