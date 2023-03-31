import { Episode } from '../dto'

import { RickAndMortyAPI } from '@/core/api'
import { Pagination } from '@/core/dto'

export class EpisodesService extends RickAndMortyAPI {
	private readonly path = '/episode'

	async getAll(filter: Episode.Input) {
		const response = await this.api.get<Pagination<Episode.Output>>(`${this.path}`, {
			params: filter,
		})

		return response.data
	}

	async getById(id: number) {
		const response = await this.api.get<Episode.Output>(`${this.path}/${id}`)
		return response.data
	}

	async getByIds(ids: number[]) {
		const response = await this.api.get<Episode.Output[]>(`${this.path}/${ids.join(',')}`)
		return response.data
	}

	async getAllCharactersOfEpisode(id: number) {
		const response = await this.api.get<Episode.Output>(`${this.path}/${id}`)
		return response.data.characters
	}
}

const episodesService = new EpisodesService()

export default episodesService
