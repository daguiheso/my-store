import {
	AuthDatasource,
	AuthRepository,
	CustomError,
	IUserResponse,
	LoginUserDto,
	RegisterUserDto
} from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {

	constructor(
		private readonly datasource: AuthDatasource
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