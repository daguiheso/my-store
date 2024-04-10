import { CustomError } from "../../../domain/errors/custom.error"
import { UploadFileDto } from "../../domain/dtos/upload-file.dto"
import { FilePort } from "../out/file.port"

interface UploadFileUseCase {
	execute(dto: UploadFileDto): Promise<any | CustomError>
}

export class UploadFile implements UploadFileUseCase {

	constructor(
		private readonly repository: FilePort
	) {}

	async execute(dto: UploadFileDto): Promise<any | CustomError> {
		return this.repository.uploadFile(dto)
	}
}