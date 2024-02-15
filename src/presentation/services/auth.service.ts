import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { bcryptAdpater } from '../../config/bcrypt.adapter';

export class AuthService {

	// DI
	constructor() { }

	registerUser = async (dto: RegisterUserDto) => {

		const userAlreadyExists = await UserModel.findOne({ email: dto.email })

		if (userAlreadyExists) throw CustomError.badRequest('Email already exist')

		try {
			const user = new UserModel(dto)

			// Encrypt password
			user.password = bcryptAdpater.hash(dto.password)

			await user.save()

			const { password, ...rest } = UserEntity.fromObject(user)

			// JWT - para maneter la auth del usuario

			// Send confirmation email

			return {
				user: rest,
				token: 'ABC'
			}
		} catch (error) {
			return CustomError.internalServer(`${error}`)
		}
	}

	loginUser = async (dto: LoginUserDto) => {
		const user = await UserModel.findOne({ email: dto.email })

		if (!user) throw CustomError.unauthorized('Invalid credentials')

		const isValidPassword = bcryptAdpater.compare(dto.password, user.password)

		if (!isValidPassword) throw CustomError.unauthorized('Invalid credentials')

		const { password, ...rest } = UserEntity.fromObject(user)

		return {
			user: rest,
			token: 'ABC'
		}
	}
}