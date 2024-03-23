import {
	ProductDatasource,
	PaginationDto,
	ProductRepository,
	CreateProductDto
} from "../../domain";

export class ProductRepositoryImpl implements ProductRepository {
	constructor(
		private readonly datasource: ProductDatasource
	) { }

	async create(dto: CreateProductDto) {
		return this.datasource.create(dto);
	}

	async getAll(dto: PaginationDto) {
		return this.datasource.getAll(dto);
	}
}