import { CustomError } from "../../../domain";

import { LoginUserDto } from "../../domain/dtos/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/register-user.dto";
import { IUserResponse } from "../../domain/interfaces/auth.interfaces";
import { AuthPort } from "../../port/out/auth.port";

export class AuthRepositoryImpl implements AuthPort {

	constructor(
		private readonly datasource: AuthPort
	) { }

	login(dto: LoginUserDto): Promise<IUserResponse | CustomError> {
		return this.datasource.login(dto)
	}

	register(dto: RegisterUserDto): Promise<IUserResponse | CustomError> {
		return this.datasource.register(dto)
	}

	validateEmail(email: string): Promise<boolean | CustomError> {
		return this.datasource.validateEmail(email)
	}

}