import { CreateCategoryDto, PaginationDto } from "../dtos";
import { Category } from "../entities/category.entity";
import { IApiListResponse } from "../interfaces/shared/api.interface";

export abstract class CategoryRepository {
	abstract create(dto: CreateCategoryDto): Promise<Category>
	abstract getAll(dto: PaginationDto): Promise<IApiListResponse<Category[]>>
}