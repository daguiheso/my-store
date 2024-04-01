import { ProductPort } from "../out/product.port"
import { PaginationDto } from "../../../domain/dtos"
import { GetAllProductsDto } from "../../domain/dtos/get-all-products.dto"
import { CustomError } from "../../../domain/errors/custom.error"
import { IApiListResponse } from "../../../domain/interfaces/shared/api.interface"

interface GetProductsUseCase {
	execute(dto: PaginationDto): Promise<IApiListResponse<GetAllProductsDto[]> |CustomError>
}

export class GetProducts implements GetProductsUseCase {

	constructor(
		private readonly repository: ProductPort
	) {}

	async execute(dto: PaginationDto): Promise<IApiListResponse<GetAllProductsDto[]> | CustomError> {
		return this.repository.getAll(dto)
	}

}