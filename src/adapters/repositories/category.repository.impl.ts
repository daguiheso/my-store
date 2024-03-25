import {
	CategoryDatasource,
	CategoryRepository,
	CreateCategoryDto,
	PaginationDto,
	UserEntity
} from "../../domain";

export class CategoryRepositoryImpl implements CategoryRepository {
	constructor(
		private readonly datasource: CategoryDatasource
	) { }

	async create(dto: CreateCategoryDto) {
		return this.datasource.create(dto);
	}

	async getAll(dto: PaginationDto) {
		return this.datasource.getAll(dto);
	}
}