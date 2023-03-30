export namespace Episode {
	export type Output = {
		/** The id of the episode. */
		id: number

		/** The name of the episode. */
		name: string

		/** The air date of the episode. */
		air_date: string

		/** The episode number. */
		episode: string

		/** The characters who have been seen in the episode. */
		characters: string[]

		/** The url of the episode. */
		url: string

		/** The created date of the episode. */
		created: string
	}

	export type Input = {
		/** Filter by the name of the episode. */
		name?: string

		/** Filter by the given episode code. */
		episode?: string

		/** Page number to fetch. */
		page: number
	}
}
