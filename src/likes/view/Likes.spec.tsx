import { useLike } from '../store'
import Likes from './LikesWrapper'

import { Character } from '@/characters/dto'
// eslint-disable-next-line unused-imports/no-unused-imports, @typescript-eslint/no-unused-vars
import * as CharacterService from '@/characters/service'
import { renderWithProviders } from '@/testutil/render'
import { renderHook, screen, waitFor } from '@testing-library/react'

jest.mock('next/router', () => ({
	useRouter: () => ({
		push: jest.fn(),
	}),
}))

jest.mock('../../characters/service', () => ({
	characterService: {
		getByIds: jest.fn(() => {
			return Promise.resolve(mockedCharactersData)
		}),
	},
}))

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
	{
		id: 2,
		name: 'Morty Smith',
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

class LocalStorageMock implements Storage {
	private store: { [key: string]: string }

	constructor() {
		this.store = {}
	}

	clear() {
		this.store = {}
	}

	getItem(key: string) {
		return this.store[key] || null
	}

	setItem(key: string, value: string) {
		this.store[key] = String(value)
	}

	removeItem(key: string) {
		delete this.store[key]
	}

	key(index: number) {
		return Object.keys(this.store)[index]
	}

	get length() {
		return Object.keys(this.store).length
	}
}

global.localStorage = new LocalStorageMock()

describe('Likes', () => {
	it('renders cards correctly for liked characters', async () => {
		renderHook(() => {
			const addCharacter = useLike((state) => state.addCharacter)
			addCharacter(mockedCharactersData[0].id)
		})

		await renderWithProviders(<Likes />)

		let cards: HTMLElement[] = []
		await waitFor(() => {
			cards = screen.getAllByTestId('card')
			return cards.length === 1
		})
		expect(cards.length).toBe(mockedCharactersData.length)
		expect(screen.getByText(mockedCharactersData[0].name)).toBeInTheDocument()
	})

	it('renders cards correctly for liked characters when there is only 1 character', async () => {
		mockedCharactersData.pop()

		renderHook(() => {
			const addCharacter = useLike((state) => state.addCharacter)
			addCharacter(mockedCharactersData[0].id)
		})

		await renderWithProviders(<Likes />)

		let cards: HTMLElement[] = []
		await waitFor(() => {
			cards = screen.getAllByTestId('card')
			return cards.length === 1
		})
		expect(cards.length).toBe(mockedCharactersData.length)
		expect(screen.getByText(mockedCharactersData[0].name)).toBeInTheDocument()
	})
})
