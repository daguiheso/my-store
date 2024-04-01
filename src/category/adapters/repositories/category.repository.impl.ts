import {
	PaginationDto
} from "../../../domain";
import { CreateCategoryDto } from "../../domain/dtos/create-category.dto";
import { CategoryPort } from "../../port/out/category.port";

export class CategoryRepositoryImpl implements CategoryPort {
	constructor(
		private readonly datasource: CategoryPort
	) { }

	async create(dto: CreateCategoryDto) {
		return this.datasource.create(dto);
	}

	async getAll(dto: PaginationDto) {
		return this.datasource.getAll(dto);
	}
}