import { CategoryModel } from "../databases/nosql/mongo"
import {
	CreateCategoryDto,
	CategoryDatasource,
	UserEntity,
	CustomError,
	Category,
	PaginationDto
} from "../../domain"

export class CategoryDatasourceImpl implements CategoryDatasource {

	constructor() { }

	async create(dto: CreateCategoryDto): Promise<Category> {

		const categoryExist = await CategoryModel.findOne({ name: dto.name })
		if (categoryExist) throw CustomError.badRequest('Category already exist')

		try {
			const category = new CategoryModel(dto)

			await category.save()

			return Category.fromObject(category)

		} catch (error) {
			throw CustomError.internalServer(`${error}`)
		}
	}

	async getAll(dto: PaginationDto) {

		const { page, limit } = dto.params

		try {
			const [total, categories] = await Promise.all([
				CategoryModel.countDocuments(),
				CategoryModel.find()
					.skip((page - 1) * limit)
					.limit(limit)
			])

			const totalPages = Math.ceil(total / limit);
    	const lastPage = page >= totalPages;

			return {
				data: categories.map((category) => Category.fromObject(category)),
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