export class PaginationDto {

	private constructor(
		public readonly params: {page: number, limit: number},
	) { }

	static create(params: {page: number, limit: number}): [string?, PaginationDto?] {
		const { page, limit } = params

		if (isNaN(page) || isNaN(limit)) return ['Invalid number param'];

		if (page <= 0) return ['Invalid page']
		if (limit <= 0 || limit >= 50) return ['Invalid limit']

		return [undefined, new PaginationDto(params)];
	}
}