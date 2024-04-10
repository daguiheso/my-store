import type { UploadedFile } from "express-fileupload";

export class UploadBulkFileDto {
	private constructor(
		public readonly file: UploadedFile[],
		public readonly path: string = 'uploads',
		public readonly validExtensions: string[] = ['jpg', 'png', 'pdf'],
	) { }

	static create(object: {[key: string]: any}): [string?, UploadBulkFileDto?] {
		const {
			file,
			path,
			validExtensions,
		} = object

		if (!file) return ['Missing file'];

		return [
			undefined,
			new UploadBulkFileDto(
				file,
				path,
				validExtensions
			)
		]

	}
}