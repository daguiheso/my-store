import path from "path";
import fs from "fs";

import { CustomError } from "../../../domain";
import { IApiListResponse } from "../../../domain/interfaces/shared/api.interface";
import { FilePort } from "../../port/out/file.port";
import { UploadFileDto } from "../../domain/dtos/upload-file.dto";
import { UploadBulkFileDto } from "../../domain/dtos/upload-bulk-file.dto";

export class FileDatasourceImpl implements FilePort {

	async uploadFile(dto: UploadFileDto) {

		const { file } = dto

		try {
			const fileExtension = file.mimetype.split('/').at(1)
			const destination = path.resolve(__dirname, '../../../', 'uploads')
			this.checkFolferExistence(destination)

			file.mv(`${destination}/${file.name}`)
		} catch (error) {
			console.error({ error })
		}
	}

	uploadBulkFile(dto: UploadBulkFileDto): Promise<IApiListResponse<any[]>> {
		throw new Error("Method not implemented.");
	}

	checkFolferExistence(folderPath: string) {
		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath)
		}
	}

}