import { IApiListResponse } from "../../../domain/interfaces/shared/api.interface";
import { UploadFileDto } from "../../domain/dtos/upload-file.dto";
import { UploadBulkFileDto } from "../../domain/dtos/upload-bulk-file.dto";

export abstract class FilePort {
	abstract uploadFile(dto: UploadFileDto): any
	abstract uploadBulkFile(dto: UploadBulkFileDto): Promise<IApiListResponse<any[]>>
}