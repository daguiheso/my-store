import { Category } from "../entities/category.entity";
import { IPagination } from "../../../domain/interfaces/shared/pagination.interface";

export class CategoriesDto {

	private constructor(
		public readonly categories: Category[],
		public readonly pagination: IPagination,
	) { }

	static create(object: { [key: string]: any }): [string?, CategoriesDto?] {
		const { categories, pagination } = object;

		return [undefined, new CategoriesDto(categories, pagination)];
	}
}