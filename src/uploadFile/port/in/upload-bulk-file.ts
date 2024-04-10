import { CustomError } from "../../../domain/errors/custom.error"
import { UploadBulkFileDto } from "../../domain/dtos/upload-bulk-file.dto"
import { FilePort } from "../out/file.port"

interface UploadBulkFileUseCase {
	execute(dto: UploadBulkFileDto): Promise<any | CustomError>
}

export class UploadBulkFile implements UploadBulkFileUseCase {

	constructor(
		private readonly repository: FilePort
	) {}

	async execute(dto: UploadBulkFileDto): Promise<any | CustomError> {
		return this.repository.uploadBulkFile(dto)
	}
}