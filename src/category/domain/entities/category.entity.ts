export class Category {

	constructor(
		public id: string,
		public name: string,
		public available?: boolean,
	) { }

	static fromObject(object: {[key:string]: any}) {
		const { id, _id, name, user, available } = object

		if (!_id && !id) throw new Error('Missing id')

		if (!name) throw new Error('Missing name')

		return new Category(
			_id || id,
			name,
			available
		)

	}
}