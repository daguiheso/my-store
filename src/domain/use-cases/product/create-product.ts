import { CreateProductDto } from "../../dtos"
import { ProductEntity } from "../../entities/product.entity"
import { CustomError } from "../../errors/custom.error"
import { ProductRepository } from "../../repositories/product.repository"

interface CreateProductUseCase {
	execute(dto: CreateProductDto): Promise<ProductEntity | CustomError>
}

export class CreateProduct implements CreateProductUseCase {

	constructor(
		private readonly repository: ProductRepository
	) {}

	async execute(dto: CreateProductDto): Promise<ProductEntity | CustomError> {
		return this.repository.create(dto)
	}
}