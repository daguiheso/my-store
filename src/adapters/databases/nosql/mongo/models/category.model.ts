import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({

	name: {
		type: String,
		required: [true, 'name is required'],
		unique: true
	},
	available: {
		type: Boolean,
		default: false
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
})

categorySchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		delete ret._id
	}
})

export const CategoryModel = mongoose.model('Category', categorySchema)
