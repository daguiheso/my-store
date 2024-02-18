import { IUserResponse } from "..";
import { LoginUserDto, RegisterUserDto } from "../dtos";
import { CustomError } from "../errors/custom.error";

export abstract class AuthRepository {
	abstract login(dto: LoginUserDto): Promise<IUserResponse | CustomError>;
	abstract register(dto: RegisterUserDto): Promise<IUserResponse | CustomError>;
	abstract validateEmail(email: string): Promise<boolean | CustomError>;
}