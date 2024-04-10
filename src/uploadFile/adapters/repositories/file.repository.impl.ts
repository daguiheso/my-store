import { UploadBulkFileDto } from "../../domain/dtos/upload-bulk-file.dto";
import { UploadFileDto } from "../../domain/dtos/upload-file.dto";
import { FilePort } from "../../port/out/file.port";

export class FileRepositoryImpl implements FilePort {

	constructor(
		private readonly datasource: FilePort
	) { }

	async uploadFile(dto: UploadFileDto) {
		return this.datasource.uploadFile(dto);
	}

	async uploadBulkFile(dto: UploadBulkFileDto) {
		return this.datasource.uploadBulkFile(dto);
	}

}