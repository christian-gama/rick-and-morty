export namespace Location {
	export type Output = {
		/** The id of the location. */
		id: number

		/** The name of the location. */
		name: string

		/** The type of the location. */
		type: string

		/** The dimension in which the location is located. */
		dimension: string

		/** List of character who have been last seen in the location. */
		residents: string[]

		/** Link to the location's own endpoint. */
		url: string

		/** Time at which the location was created in the database. */
		created: string
	}

	export type Input = {
		/** Filter by the name of the location. */
		name?: string

		/** Filter by the type of the location. */
		type?: string

		/** Filter by the dimension in which the location is located. */
		dimension?: string

		/** Page number to fetch. */
		page: number
	}
}
