import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";
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
}