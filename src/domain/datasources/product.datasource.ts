import { CreateProductDto, PaginationDto } from "../dtos";
import { GetAllProductsDto } from "../dtos/product/get-all-products.dto";
import { ProductEntity } from "../entities/product.entity";
import { IApiListResponse } from "../interfaces/shared/api.interface";

export abstract class ProductDatasource {
	abstract create(dto: CreateProductDto): Promise<ProductEntity>
	abstract getAll(dto: PaginationDto): Promise<IApiListResponse<GetAllProductsDto[]>>
}