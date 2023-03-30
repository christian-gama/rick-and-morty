import { CharacterCard } from './'

import { Character } from '@/characters/dto'
import { ellipsis } from '@/core/lib'
import { useFilter } from '@/core/store'
import { renderWithProviders } from '@/testutil/render'
import { screen } from '@testing-library/dom'
import { renderHook } from '@testing-library/react'

const character: Character.Output = {
	id: 1,
	name: 'Rick Sanchez',
	status: 'Alive',
	species: 'Human',
	gender: 'Male',
	image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
	location: {
		name: 'Earth (Replacement Dimension)',
		url: 'https://rickandmortyapi.com/api/location/20',
	},
	created: '2017-11-04T18:48:46.250Z',
	episode: [],
	origin: {
		name: 'Earth (C-137)',
		url: 'https://rickandmortyapi.com/api/location/1',
	},
	type: '',
	url: 'https://rickandmortyapi.com/api/character/1',
}

describe('CharacterCard', () => {
	it('renders the character card correctly', async () => {
		await renderWithProviders(<CharacterCard character={character} />)

		expect(screen.getByText(ellipsis(character.name, 14))).toBeInTheDocument()
		expect(screen.getByText(new RegExp(character.species, 'i'))).toBeInTheDocument()
		expect(screen.getByText(character.status)).toBeInTheDocument()
		expect(screen.getByText(ellipsis(character.location.name, 24))).toBeInTheDocument()
	})

	it('does not render the card if the filter does not match', async () => {
		renderHook(() => {
			const { setSpecies } = useFilter((state) => state)
			setSpecies('Alien')
		})

		const { container } = await renderWithProviders(<CharacterCard character={character} />)
		expect(container.querySelector('[data-testid="card"]')).toBeNull()
	})
})
