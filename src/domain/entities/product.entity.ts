import { CustomError } from "../errors/custom.error"

export class ProductEntity {

	constructor(
		public id: string,
		public name: string,
		public price: number,
		public description: string,
		public available: boolean,
		public user: string,
		public category: string,
	) { }

	static fromObject(object: {[key:string]: any}) {
		const { id, _id, name, price, description, available, user, category } = object

		if (!_id && !id) throw CustomError.badRequest('Missing id')

		if (!name) throw CustomError.badRequest('Missing name')

		if (!price) throw CustomError.badRequest('Missing price')

		if (!description) throw CustomError.badRequest('Missing description')

		if (!available) throw CustomError.badRequest('Missing available field')

		if (!user) throw CustomError.badRequest('Missing user field')

		if (!category) throw CustomError.badRequest('Missing category field')

		return new ProductEntity(
			_id || id,
			name,
			price,
			description,
			available,
			user,
			category
		)

	}
}