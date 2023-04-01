import { Episode } from '../dto'
import { EpisodesService } from '../service/episode.service'
import Episodes from './Episodes'

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

const mockedEpisodesData = {
	info: {
		next: 'https://any_api/episode?page=2',
	},
	results: [
		{
			id: 1,
			air_date: '2017-11-10T12:42:04.162Z',
			episode: 'S01E01',
			characters: ['https://any_api/character/1'],
			created: '2017-11-10T12:42:04.162Z',
			name: 'Pilot',
			url: 'https://any_api/episode/1',
		},
	],
} as Pagination<Episode.Output>

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
			url: 'https://any_api/episode/1',
		},
		location: {
			name: 'Earth',
			url: 'https://any_api/episode/1',
		},
		image: 'https://any_api/image.jpg',
		episode: ['https://any_api/episode/1'],
		url: 'https://any_api/character/1',
		created: '2017-11-04T18:48:46.250Z',
	},
] as Character.Output[]

describe('Episodes', () => {
	beforeEach(() => {
		// @ts-ignore
		mockedAxios.get.mockImplementation((url) => {
			if (url.includes(EpisodesService.path)) {
				return Promise.resolve({ data: mockedEpisodesData })
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
			<Episodes
				preloadedEpisodes={mockedEpisodesData}
				preloadedCharacters={mockedCharactersData}
			/>,
		)

		const cards = screen.getAllByTestId('card')
		expect(cards.length).toBe(mockedCharactersData.length)
		expect(screen.getByText(mockedCharactersData[0].name)).toBeInTheDocument()
	})
})
