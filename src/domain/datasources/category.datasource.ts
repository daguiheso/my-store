import { CreateCategoryDto } from "../dtos";
import { Category } from "../entities/category.entity";
import { UserEntity } from "../entities/user.entity";

// TODO: Handle only user Id
export abstract class CategoryDatasource {
	abstract create(dto: CreateCategoryDto, user: UserEntity): Promise<Category>
	abstract getAll(user: string): Promise<Category[]>
}