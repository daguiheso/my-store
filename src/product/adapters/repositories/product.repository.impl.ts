import {
	PaginationDto,
} from "../../../domain";
import { CreateProductDto } from "../../domain/dtos/create-product.dto";
import { ProductPort } from "../../port/out/product.port";

export class ProductRepositoryImpl implements ProductPort {
	constructor(
		private readonly datasource: ProductPort
	) { }

	async create(dto: CreateProductDto) {
		return this.datasource.create(dto);
	}

	async getAll(dto: PaginationDto) {
		return this.datasource.getAll(dto);
	}
}