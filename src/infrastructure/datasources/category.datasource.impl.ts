import { CategoryModel } from "../../data"
import {
	CreateCategoryDto,
	CategoryDatasource,
	UserEntity,
	CustomError,
	Category
} from "../../domain"

export class CategoryDatasourceImpl implements CategoryDatasource {

	constructor() { }

	async create(dto: CreateCategoryDto, user: UserEntity): Promise<Category> {

		const categoryExist = await CategoryModel.findOne({ name: dto.name })
		if (categoryExist) throw CustomError.badRequest('Category already exist')

		try {
			const category = new CategoryModel({
				...dto,
				user: user.id
			})

			await category.save()

			return Category.fromObject(category)

		} catch (error) {
			throw CustomError.internalServer(`${error}`)
		}
	}

	async getAll() {

		try {
			const categories = await CategoryModel.find()

			return categories.map((category) => Category.fromObject(category))

		} catch (error) {
			throw CustomError.internalServer()
		}
	}
}