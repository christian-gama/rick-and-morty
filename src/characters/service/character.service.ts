import { Character } from '../dto'

import { RickAndMortyAPI } from '@/core/api'
import { Pagination } from '@/core/dto'

export class CharacterService extends RickAndMortyAPI {
	async getAll(filter?: Character.Input): Promise<Pagination<Character.Output>> {
		const response = await this.api.get('/character', { params: filter })
		return response.data.results
	}

	async getById(id: number): Promise<Character.Output> {
		const response = await this.api.get(`/character/${id}`)
		return response.data
	}

	async getByIds(ids: number[]): Promise<Character.Output[]> {
		const response = await this.api.get(`/character/${ids.join(',')}`)
		return response.data
	}
}

const characterService = new CharacterService()

export default characterService
