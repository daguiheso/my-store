import { CustomError, PaginationDto } from "../../../domain";
import { GetAllProductsDto } from "../../domain/dtos/get-all-products.dto";
import { ProductEntity } from "../../domain/entities/product.entity";
import { IApiListResponse } from "../../../domain/interfaces/shared/api.interface";
import { ProductPort } from "../../port/out/product.port";
import { ProductModel } from "../../../adapters/databases/nosql/mongo";
import { CreateProductDto } from "../../domain/dtos/create-product.dto";

export class ProductDatasourceImpl implements ProductPort {

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

	async getAll(dto: PaginationDto): Promise<IApiListResponse<GetAllProductsDto[]>> {

		const { page, limit } = dto.params

		try {
			const [total, products] = await Promise.all([
				ProductModel.countDocuments(),
				ProductModel.find()
					.skip((page - 1) * limit)
					.limit(limit)
					.populate('user')
					.populate('category')
			])

			const totalPages = Math.ceil(total / limit);
    	const lastPage = page >= totalPages;

			return {
				data: products.map((product) => {
					const [error, getAllProductsDto] = GetAllProductsDto.create(product)
					if (error) throw CustomError.internalServer()

					return getAllProductsDto!
				}),
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