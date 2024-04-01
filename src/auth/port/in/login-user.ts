import { AuthPort } from "../out/auth.port"
import { CustomError } from "../../../domain/errors/custom.error"
import { IUserResponse } from "../../domain/interfaces/auth.interfaces"
import { LoginUserDto } from "../../domain/dtos/login-user.dto"

interface LoginUserUseCase {
	execute(dto: LoginUserDto): Promise<IUserResponse | CustomError>
}

export class LoginUser implements LoginUserUseCase {

	constructor(
		private readonly repository: AuthPort
	) {}

	async execute(dto: LoginUserDto): Promise<IUserResponse | CustomError> {
		return this.repository.login(dto)
	}
}