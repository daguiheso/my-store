import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../../domain";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../adapters/databases/nosql/mongo";

export class AuthMiddleware {

	static async validateJwt(req: Request, res: Response, next: NextFunction) {

		const authorization = req.header('Authorization')

		if (!authorization) return res.status(401).json('Token not provided')
		if (!authorization.startsWith('Bearer ')) return res.status(401).json('Invalid Token')

		const token = authorization.split(' ').at(1) || ''

		try {

			const payload = await JwtAdapter.validateToken<{ id: string }>(token)
			if (!payload) return res.status(401).json('Invalid Token')

			// TODO: Validate if user is active

			const user = await UserModel.findById(payload.id)
			if (!user) res.status(400).json('Invalid Token - user')

			req.body.user = UserEntity.fromObject(user!).id

			next()

		} catch (error) {
			console.log(error)
			res.status(500).json('Internal server error')
		}


	}
}