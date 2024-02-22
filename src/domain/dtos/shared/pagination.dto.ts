export class PaginationDto {

	private constructor(
		public readonly query: {[key: string]: string},
	) { }

	static create(query: {[key: string]: string}): [string?, PaginationDto?] {
		const page = +query.page
		const limit = +query.limit

		if (isNaN(page) || isNaN(limit)) return ['Invalid number param'];

		if (page <= 0) return ['Invalid page']
		if (limit <= 0 || limit >= 50) return ['Invalid limit']

		return [undefined, new PaginationDto(query)];
	}
}