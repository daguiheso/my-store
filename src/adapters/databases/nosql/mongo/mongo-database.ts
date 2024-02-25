import mongoose from 'mongoose';

interface Options {
	mongoUrl: string
	dbName: string
}

export class MongoDatabase {

	static async connect(options: Options) {
		const { mongoUrl, dbName } = options

		try {
			await mongoose.connect(mongoUrl, {
				dbName
			})

			console.log('connected mongo db')

			return true
		} catch (error) {
			console.log('Mongo Conection Error')
			throw error
		}
	}
}