import { Character } from '../dto'

import { RickAndMortyAPI } from '@/core/api'
import { Pagination } from '@/core/dto'

export class CharacterService extends RickAndMortyAPI {
	static readonly path = '/character'

	async getAll(filter?: Character.Input): Promise<Pagination<Character.Output>> {
		const response = await this.api.get(`${CharacterService.path}`, { params: filter })
		return response.data
	}

	async getById(id: number): Promise<Character.Output> {
		const response = await this.api.get(`${CharacterService.path}/${id}`)
		return response.data
	}

	async getByIds(ids: number[]): Promise<Character.Output[]> {
		const response = await this.api.get(`${CharacterService.path}/${ids.join(',')}`)
		return response.data
	}
}

const characterService = new CharacterService()

export default characterService
