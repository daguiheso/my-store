import { AuthPort } from "../out/auth.port"
import { CustomError } from "../../../domain/errors/custom.error"

interface ValidateEmailUseCase {
	execute(email: string): Promise<boolean | CustomError>
}

export class ValidateEmail implements ValidateEmailUseCase {

	constructor(
		private readonly repository: AuthPort
	) {}

	async execute(email: string): Promise<boolean | CustomError> {
		return this.repository.validateEmail(email)
	}
}