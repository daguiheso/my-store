import type { UploadedFile } from "express-fileupload";

export class UploadFileDto {
	private constructor(
		public readonly file: UploadedFile,
		public readonly validExtensions: string[],
	) { }

	static create(object: {[key: string]: any}): [string?, UploadFileDto?] {
		const { file, validExtensions = ['jpg', 'png', 'pdf'] } = object

		if (!file) return ['Missing file'];

		return [
			undefined,
			new UploadFileDto(
				file,
				validExtensions
			)
		]

	}
}