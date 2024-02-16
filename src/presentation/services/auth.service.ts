import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { bcryptAdpater } from '../../config/bcrypt.adapter';
import { JwtAdapter } from "../../config/jwt.adapter";
import { EmailService } from "./email.service";
import { envs } from "../../config/envs";

export class AuthService {

	// DI
	constructor(
		private readonly emailService: EmailService
	) { }

	registerUser = async (dto: RegisterUserDto) => {

		const userAlreadyExists = await UserModel.findOne({ email: dto.email })

		if (userAlreadyExists) throw CustomError.badRequest('Email already exist')

		try {
			const user = new UserModel(dto)

			// Encrypt password
			user.password = bcryptAdpater.hash(dto.password)

			await user.save()

			const { password, ...rest } = UserEntity.fromObject(user)

			const token = await JwtAdapter.generateToken({ id: user.id })

			if (!token) throw CustomError.internalServer('Error generating token')

			const wasSendEmail = await this.sendEmailValidationLink(dto.email)

			return {
				user: rest,
				token: token
			}
		} catch (error) {
			throw CustomError.internalServer(`${error}`)
		}
	}

	loginUser = async (dto: LoginUserDto) => {
		const user = await UserModel.findOne({ email: dto.email })

		if (!user) throw CustomError.unauthorized('Invalid credentials')

		const isValidPassword = bcryptAdpater.compare(dto.password, user.password)

		if (!isValidPassword) throw CustomError.unauthorized('Invalid credentials')

		const { password, ...rest } = UserEntity.fromObject(user)

		const token = await JwtAdapter.generateToken({ id: user.id })

		if (!token) throw CustomError.internalServer('Error generating token')

		return {
			user: rest,
			token: token
		}
	}

	private sendEmailValidationLink = async (email: string) => {

		const token = await JwtAdapter.generateToken({ email })
		if (!token) throw CustomError.internalServer('Error generating token')

		const link = `${envs.WERSERVICE_URL}/auth/validate-email/${token}`
		const html = `
			<h1>Validate your email</h1>
			<a href="${link}">Click here to validate your email ${email}</a>
		`

		const options = {
			to: email,
			subject: 'Confirm your email - MyStore',
			htmlBody: html
		}

		const wasSend = await this.emailService.sendEmail(options)
		if (!wasSend) throw CustomError.internalServer('Error sending verification email')

		return true
	}
}