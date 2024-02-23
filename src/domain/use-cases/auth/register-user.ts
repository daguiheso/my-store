import { RegisterUserDto } from "../../dtos"
import { CustomError } from "../../errors/custom.error"
import { IUserResponse } from "../../interfaces/auth/auth.interfaces"
import { AuthRepository } from "../../repositories/auth.repository"

interface RegisterUserUseCase {
	execute(dto: RegisterUserDto): Promise<IUserResponse | CustomError>
}

export class RegisterUser implements RegisterUserUseCase {

	constructor(
		private readonly repository: AuthRepository
	) {}

	async execute(dto: RegisterUserDto): Promise<IUserResponse | CustomError> {
		return this.repository.register(dto)
	}
}