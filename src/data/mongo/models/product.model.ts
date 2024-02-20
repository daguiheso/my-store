import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({

	name: {
		type: String,
		required: [true, 'name is required'],
		unique: true
	},
	available: {
		type: Boolean,
		default: false
	},
	price: {
		type: Schema.Types.Decimal128,
		default: 0.0
	},
	description: {
		type: String,

	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: true
	},
})

export const ProductModel = mongoose.model('Product', productSchema)
