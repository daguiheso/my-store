import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { AuthService } from "./services/auth.service";
import { LoginUserDto } from "../domain/dtos/login-user.dto";
import { RegisterUserDto } from "../domain/dtos/register-user.dto";

export class AuthController {

	// DI
	constructor(
		private readonly authService: AuthService
	) { }

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ error: error.message })
		}

		console.log(error)
		return res.status(500).json({ error: 'Internal server error' })
	}

	registerUser = (req: Request, res: Response) => {
		const [error, registerUserDto] = RegisterUserDto.create(req.body)

		if (error) return res.status(400).json({ error })

		this.authService.registerUser(registerUserDto!)
			.then(user => res.json(user))
			.catch(error => this.handleError(error, res))

	}

	loginUser = (req: Request, res: Response) => {
		const [error, loginUserDto] = LoginUserDto.create(req.body)

		if (error) return res.status(401).json({ error })

		this.authService.loginUser(loginUserDto!)
			.then(user => res.json(user))
			.catch(error => this.handleError(error, res))

	}

	validateEmail = (req: Request, res: Response) => {
		const { token } = req.params

		this.authService.validateEmail(token)
			.then(() => res.json('Email Validated'))
			.catch(error => this.handleError(error, res))
	}
}