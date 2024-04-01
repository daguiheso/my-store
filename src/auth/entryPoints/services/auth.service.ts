import { UserModel } from "../../../adapters/databases/nosql/mongo";
import { CustomError } from "../../../domain";
import { bcryptAdpater } from '../../../config/bcrypt.adapter';
import { JwtAdapter } from "../../../config/jwt.adapter";
import { EmailService } from "./email.service";
import { envs } from "../../../config/envs";
import { LoginUserDto } from "../../domain/dtos/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";

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

			await this.sendEmailValidationLink(dto.email)

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

	validateEmail = async (token: string) => {

		const payload = await JwtAdapter.validateToken(token)
		if (!payload) throw CustomError.unauthorized('Invalid token')

		const { email } = payload as { email: string }
		if (!email) throw CustomError.internalServer('Email not in token')

		const user = await UserModel.findOne({ email: email })
		if (!user) throw CustomError.internalServer('Email not exist')

		user.emailValidated = true
		await user.save()

		return true
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