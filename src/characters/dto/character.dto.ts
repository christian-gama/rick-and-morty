export namespace Character {
	export type Output = {
		/** The id of the character. */
		id: number

		/** The name of the character. */
		name: string

		/** The status of the character ('Alive', 'Dead' or 'unknown'). */
		status: 'Alive' | 'Dead' | 'unknown'

		species:
			| 'Human'
			| 'Alien'
			| 'Humanoid'
			| 'Poopybutthole'
			| 'Mythological'
			| 'Unknown'
			| 'Animal'
			| 'Disease'
			| 'Robot'
			| 'Cronenberg'
			| 'Planet'

		/** The type or subspecies of the character. */
		type: string

		/** The gender of the character ('Female', 'Male', 'Genderless' or 'unknown'). */
		gender: 'Female' | 'Male' | 'Genderless' | 'unknown'

		/** Name and link to the character's origin location. */
		origin: {
			name: string
			url: string
		}

		/** Name and link to the character's last known location endpoint. */
		location: {
			name: string
			url: string
		}

		/** Link to the character's image. All images are 300x300px and most are medium shots or portraits
		 *  since they are intended to be used as avatars. */
		image: string

		/** List of episodes in which this character appeared. */
		episode: string[]

		/** Link to the character's own URL endpoint. */
		url: string

		/** Time at which the character was created in the database. */
		created: string
	}

	export type Input = {
		/** Filter by the given name. */
		name?: string

		/** Filter by the given status ('Alive', 'Dead' or 'unknown'). */
		status?: 'Alive' | 'Dead' | 'unknown'

		/** Filter by the given species. */
		species?: string

		/* Filter by the given gender (female, male, genderless or unknown). */
		gender?: string

		/** Page number of the results to fetch. */
		page?: number
	}
}
