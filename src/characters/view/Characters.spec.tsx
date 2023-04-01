import { Character } from '../dto'
import { CharacterService } from '../service/character.service'
import Characters from './Characters'

import { Pagination } from '@/core/dto'
import { renderWithProviders } from '@/testutil/render'
import { screen } from '@testing-library/react'
import axios from 'axios'

const mockedCharactersData = {
	info: {
		next: 'https://any_api/location?page=2',
	},
	results: [
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
	],
} as Pagination<Character.Output>

jest.mock('next/router', () => ({
	useRouter: () => ({
		push: jest.fn(),
	}),
}))

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Characters', () => {
	beforeEach(() => {
		// @ts-ignore
		mockedAxios.get.mockImplementation((url) => {
			if (url.includes(CharacterService.path)) {
				return Promise.resolve({ data: mockedCharactersData })
			}
		})
	})

	afterEach(() => {
		mockedAxios.get.mockReset()
	})

	it('renders cards correctly', async () => {
		await renderWithProviders(<Characters preloadedCharacters={mockedCharactersData} />)

		const cards = screen.getAllByTestId('card')
		expect(cards.length).toBe(mockedCharactersData.results.length)
		expect(screen.getByText(mockedCharactersData.results[0].name)).toBeInTheDocument()
	})
})
