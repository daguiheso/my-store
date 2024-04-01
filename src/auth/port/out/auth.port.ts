import {
	CustomError,
} from "../../../domain";

import { LoginUserDto } from "../../domain/dtos/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/register-user.dto";
import { IUserResponse } from "../../domain/interfaces/auth.interfaces";

export abstract class AuthPort {
	abstract login(dto: LoginUserDto): Promise<IUserResponse | CustomError>;
	abstract register(dto: RegisterUserDto): Promise<IUserResponse | CustomError>;
	abstract validateEmail(email: string): Promise<boolean | CustomError>;
}