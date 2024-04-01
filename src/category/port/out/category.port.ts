import { PaginationDto } from "../../../domain";
import { IApiListResponse } from "../../../domain/interfaces/shared/api.interface";
import { CreateCategoryDto } from "../../domain/dtos/create-category.dto";
import { Category } from "../../domain/entities/category.entity";

export abstract class CategoryPort {
	abstract create(dto: CreateCategoryDto): Promise<Category>
	abstract getAll(dto: PaginationDto): Promise<IApiListResponse<Category[]>>
}