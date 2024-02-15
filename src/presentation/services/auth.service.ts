import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class AuthService {

	// DI
	constructor() { }

	registerUser = async (dto: RegisterUserDto) => {

		const userAlreadyExists = await UserModel.findOne({ email: dto.email })

		if (userAlreadyExists) throw CustomError.badRequest('Email already exist')

		try {
			const user = new UserModel(dto)
			await user.save()

			const { password, ...rest } = UserEntity.fromObject(user)

			// Encript password

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
}