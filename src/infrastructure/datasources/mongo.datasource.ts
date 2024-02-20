import { bcryptAdpater } from "../../config/bcrypt.adapter";
import { envs } from "../../config/envs";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data";
import {
	AuthDatasource,
	CustomError,
	IUserResponse,
	LoginUserDto,
	RegisterUserDto,
	UserEntity
} from "../../domain";
import { EmailService } from "../../presentation/services/email.service";

export class MongoDatasource implements AuthDatasource {

	// DI
	constructor(
		private readonly emailService: EmailService
	) { }

	async login(dto: LoginUserDto): Promise<IUserResponse | CustomError> {

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

	async register(dto: RegisterUserDto): Promise<IUserResponse | CustomError> {

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

	async validateEmail(token: string): Promise<boolean | CustomError> {

		const payload = await JwtAdapter.validateToken<{ email: string }>(token)
		if (!payload) throw CustomError.unauthorized('Invalid token')

		const { email } = payload
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

