import { CreateProductDto, CustomError, PaginationDto } from "../../domain";
import { ProductDatasource } from "../../domain/datasources/product.datasource";
import { ProductEntity } from "../../domain/entities/product.entity";
import { IApiListResponse } from "../../domain/interfaces/shared/api.interface";
import { ProductModel } from "../databases/nosql/mongo";

export class ProductDatasourceImpl implements ProductDatasource {

	async create(dto: CreateProductDto): Promise<ProductEntity> {

		const productExist = await ProductModel.findOne({ name: dto.name })
		if (productExist) throw CustomError.badRequest('Product already exist')

		try {
			const product = new ProductModel(dto)

			await product.save()

			return ProductEntity.fromObject(product)

		} catch (error) {
			throw CustomError.internalServer(`${error}`)
		}

	}

	async getAll(dto: PaginationDto): Promise<IApiListResponse<ProductEntity[]>> {

		const { page, limit } = dto.params

		try {
			const [total, products] = await Promise.all([
				ProductModel.countDocuments(),
				ProductModel.find()
					.skip((page - 1) * limit)
					.limit(limit)
				// TODO: populate
			])

			const totalPages = Math.ceil(total / limit);
    	const lastPage = page >= totalPages;

			return {
				data: products.map((product) => ProductEntity.fromObject(product)),
				page: page,
				limit: limit,
				total: total,
				pages: totalPages,
				last: lastPage,
			}

		} catch (error) {
			throw CustomError.internalServer()
		}

	}

}