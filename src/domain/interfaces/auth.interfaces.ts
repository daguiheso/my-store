import { UserEntity } from ".."

export interface IUserResponse {
	user: Omit<UserEntity, 'password'>
	token: string
}