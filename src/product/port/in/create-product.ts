import { ProductPort } from "../out/product.port"
import { ProductEntity } from "../../domain/entities/product.entity"
import { CustomError } from "../../../domain/errors/custom.error"
import { CreateProductDto } from "../../domain/dtos/create-product.dto"

interface CreateProductUseCase {
	execute(dto: CreateProductDto): Promise<ProductEntity | CustomError>
}

export class CreateProduct implements CreateProductUseCase {

	constructor(
		private readonly repository: ProductPort
	) {}

	async execute(dto: CreateProductDto): Promise<ProductEntity | CustomError> {
		return this.repository.create(dto)
	}
}