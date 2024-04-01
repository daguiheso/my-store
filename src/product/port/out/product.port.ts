import { PaginationDto } from "../../../domain";
import { GetAllProductsDto } from "../../domain/dtos/get-all-products.dto";
import { IApiListResponse } from "../../../domain/interfaces/shared/api.interface";
import { CreateProductDto } from "../../domain/dtos/create-product.dto";
import { ProductEntity } from "../../domain/entities/product.entity";

export abstract class ProductPort {
	abstract create(dto: CreateProductDto): Promise<ProductEntity>
	abstract getAll(dto: PaginationDto): Promise<IApiListResponse<GetAllProductsDto[]>>
}