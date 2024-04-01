import { AuthPort } from "../out/auth.port"
import { CustomError } from "../../../domain/errors/custom.error"
import { IUserResponse } from "../../domain/interfaces/auth.interfaces"
import { RegisterUserDto } from "../../domain/dtos/register-user.dto"

interface RegisterUserUseCase {
	execute(dto: RegisterUserDto): Promise<IUserResponse | CustomError>
}

export class RegisterUser implements RegisterUserUseCase {

	constructor(
		private readonly repository: AuthPort
	) {}

	async execute(dto: RegisterUserDto): Promise<IUserResponse | CustomError> {
		return this.repository.register(dto)
	}
}