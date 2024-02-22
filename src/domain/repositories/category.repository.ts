import { CreateCategoryDto } from "../dtos";
import { Category } from "../entities/category.entity";
import { UserEntity } from "../entities/user.entity";

export abstract class CategoryRepository {
	abstract create(dto: CreateCategoryDto, user: UserEntity): Promise<Category>
	abstract getAll(): Promise<Category[]>
}