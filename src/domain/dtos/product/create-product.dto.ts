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
		if (!category) return ['Missing category'];

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