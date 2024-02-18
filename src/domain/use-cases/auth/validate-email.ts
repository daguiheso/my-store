import { CustomError } from "../../errors/custom.error"
import { AuthRepository } from "../../repositories/auth.repository"

interface ValidateEmailUseCase {
	execute(email: string): Promise<boolean | CustomError>
}

export class ValidateEmail implements ValidateEmailUseCase {

	constructor(
		private readonly repository: AuthRepository
	) {}

	async execute(email: string): Promise<boolean | CustomError> {
		return this.repository.validateEmail(email)
	}
}