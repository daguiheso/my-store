import { Validators } from "../../../config/validators";
import { Category } from "../../../category/domain/entities/category.entity";
import { UserEntity } from "../../../auth/domain/entities/user.entity";

export class GetAllProductsDto {
	private constructor(
		public readonly name: string,
		public readonly price: number,
		public readonly description: string,
		public readonly available: boolean,
		public readonly user: Omit<UserEntity, 'password'>,
		public readonly category: Category,
	) { }

	static create(object: {[key: string]: any}): [string?, GetAllProductsDto?] {
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
		if (!Validators.isMondoDBId(user.id)) return ['Invalid user'];

		if (!category) return ['Missing category'];
		if (!Validators.isMondoDBId(category.id)) return ['Invalid category'];

		return [
			undefined,
			new GetAllProductsDto(
				name,
				price.toString(),
				description,
				available,
				user,
				category
			)
		]

	}
}