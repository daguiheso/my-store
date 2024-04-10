import { Request, Response } from "express";

import { CustomError } from "../../domain"
import { UploadFileDto } from "../domain/dtos/upload-file.dto";
import { FilePort } from "../port/out/file.port";
import { UploadFile } from "../port/in/upload-file";

export class FileUploadController {

	constructor(
		private readonly repository: FilePort
	) { }

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ error: error.message })
		}

		console.log(error)
		return res.status(500).json({ error: 'Internal server error' })
	}

	uploadFile = (req: Request, res: Response) => {

		const files = req.files

		if (!files || Object.keys(files).length === 0) {
			return res.status(400).json({ error: 'Missing file' })
		}

		const file = files.file

		const [error, uploadFileDto] = UploadFileDto.create({ file })
		if (error) return res.status(400).json({ error })

		console.log({ files: req.files })

		new UploadFile(this.repository)
			.execute(uploadFileDto!)
			.then(response => res.json(response))
			.catch(error => this.handleError(error, res))

	}

	uploadBulkFile = (req: Request, res: Response) => {

		// const [error, createProductDto] = CreateProductDto.create(req.body)
		// if (error) return res.status(400).json({ error })
		res.json({ message: 'Bulk files' })

	}
}