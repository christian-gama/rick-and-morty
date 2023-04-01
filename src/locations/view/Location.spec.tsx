import { Location } from '../dto'
import { LocationService } from '../service/location.service'
import Locations from './Locations'

import { Character } from '@/characters/dto'
import { CharacterService } from '@/characters/service/character.service'
import { Pagination } from '@/core/dto'
import { renderWithProviders } from '@/testutil/render'
import { screen } from '@testing-library/react'
import axios from 'axios'

jest.mock('next/router', () => ({
	useRouter: () => ({
		push: jest.fn(),
	}),
}))

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

const mockedLocationsData = {
	info: {
		next: 'https://any_api/location?page=2',
	},
	results: [
		{
			id: 1,
			name: 'Earth',
			type: 'Planet',
			dimension: 'Dimension C-137',
			residents: ['https://any_api/character/1'],
			url: 'https://any_api/location/1',
			created: '2017-11-10T12:42:04.162Z',
		},
	],
} as Pagination<Location.Output>

const mockedCharactersData = [
	{
		id: 1,
		name: 'Rick Sanchez',
		status: 'Alive',
		species: 'Human',
		type: '',
		gender: 'Male',
		origin: {
			name: 'Earth',
			url: 'https://any_api/location/1',
		},
		location: {
			name: 'Earth',
			url: 'https://any_api/location/1',
		},
		image: 'https://any_api/image.jpg',
		episode: ['https://any_api/episode/1'],
		url: 'https://any_api/character/1',
		created: '2017-11-04T18:48:46.250Z',
	},
] as Character.Output[]

describe('Locations', () => {
	beforeEach(() => {
		// @ts-ignore
		mockedAxios.get.mockImplementation((url) => {
			if (url.includes(LocationService.path)) {
				return Promise.resolve({ data: mockedLocationsData })
			} else if (url.includes(CharacterService.path)) {
				return Promise.resolve({ data: mockedCharactersData })
			}
		})
	})

	afterEach(() => {
		mockedAxios.get.mockReset()
	})

	it('renders cards correctly', async () => {
		await renderWithProviders(
			<Locations
				preloadedLocations={mockedLocationsData}
				preloadedCharacters={mockedCharactersData}
			/>,
		)

		const cards = screen.getAllByTestId('card')
		expect(cards.length).toBe(mockedCharactersData.length)
		expect(screen.getByText(mockedCharactersData[0].name)).toBeInTheDocument()
	})
})
