import { LoginUserDto } from "../../dtos"
import { CustomError } from "../../errors/custom.error"
import { IUserResponse } from "../../interfaces/auth.interfaces"
import { AuthRepository } from "../../repositories/auth.repository"

interface LoginUserUseCase {
	execute(dto: LoginUserDto): Promise<IUserResponse | CustomError>
}

export class LoginUser implements LoginUserUseCase {

	constructor(
		private readonly repository: AuthRepository
	) {}

	async execute(dto: LoginUserDto): Promise<IUserResponse | CustomError> {
		return this.repository.login(dto)
	}
}