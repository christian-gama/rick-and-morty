import { extractCharacterIds } from './extractCharacter'

describe('extractCharacterIds', () => {
	it('test rick-and-morty.extractCharacterIds', () => {
		const characters = [
			'https://rickandmortyapi.com/api/character/1',
			'https://rickandmortyapi.com/api/character/2',
			'https://rickandmortyapi.com/api/character/3',
		]

		const result = extractCharacterIds(characters)

		expect(result).toEqual([1, 2, 3])
	})
})
