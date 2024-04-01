import { Validators } from "../../../config/validators";

export class CreateProductDto {
	private constructor(
		public readonly name: string,
		public readonly price: number,
		public readonly description: string,
		public readonly available: boolean,
		public readonly user: string,
		public readonly category: string,
	) { }

	static create(object: {[key: string]: any}): [string?, CreateProductDto?] {
		const {
			name,
			price,
			description,
			available,
			user,
			category
		} = object

		if (!name) return ['Missing name'];

		if (!description) return ['Missing description'];

		if (!user) return ['Missing user'];
		if (!Validators.isMondoDBId(user)) return ['Invalid user'];

		if (!category) return ['Missing category'];
		if (!Validators.isMondoDBId(category)) return ['Invalid category'];

		return [
			undefined,
			new CreateProductDto(
				name,
				price,
				description,
				available,
				user,
				category
			)
		]

	}
}