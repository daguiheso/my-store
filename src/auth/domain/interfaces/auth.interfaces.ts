import { UserEntity } from "../entities/user.entity"

export interface IUserResponse {
	user: Omit<UserEntity, 'password'>
	token: string
}