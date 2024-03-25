export class CreateCategoryDto {

	private constructor(
		public readonly name: string,
		public readonly available: boolean,
		public readonly user: string,
	) { }

	static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
		const { name, available = false, user } = object;

		let availableBoolean: boolean = available

		if (!name) return ['Missing name'];
		if (typeof available !== 'boolean') {
			availableBoolean = available === 'true' ? true : false
		}

		return [undefined, new CreateCategoryDto(
			name,
			availableBoolean,
			user
		)];
	}
}