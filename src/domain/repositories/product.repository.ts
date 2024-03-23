import { CreateProductDto, PaginationDto } from "../dtos";
import { ProductEntity } from "../entities/product.entity";
import { IApiListResponse } from "../interfaces/shared/api.interface";

export abstract class ProductRepository {
	abstract create(dto: CreateProductDto): Promise<ProductEntity>
	abstract getAll(dto: PaginationDto): Promise<IApiListResponse<ProductEntity[]>>
}