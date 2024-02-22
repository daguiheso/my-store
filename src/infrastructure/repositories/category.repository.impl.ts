import {
	CategoryDatasource,
	CategoryRepository,
	CreateCategoryDto,
	UserEntity
} from "../../domain";

export class CategoryRepositoryImpl implements CategoryRepository {
	constructor(
		private readonly datasource: CategoryDatasource
	) { }

	async create(dto: CreateCategoryDto, user: UserEntity) {
		return this.datasource.create(dto, user);
	}

	async getAll(user: string) {
		return this.datasource.getAll(user);
	}
}