import { Location } from '../dto'

import { RickAndMortyAPI } from '@/core/api'
import { Pagination } from '@/core/dto'

export class LocationService extends RickAndMortyAPI {
	private readonly path = '/location'

	async getAll(filter: Location.Input) {
		const response = await this.api.get<Pagination<Location.Output>>(this.path, {
			params: filter,
		})

		return response.data
	}

	async getById(id: number) {
		const response = await this.api.get<Location.Output>(`${this.path}/${id}`)
		return response.data
	}

	async getByIds(ids: number[]) {
		const response = await this.api.get<Location.Output[]>(`${this.path}/${ids.join(',')}`)
		return response.data
	}

	async getAllCharactersOfLocation(id: number) {
		const response = await this.api.get<Location.Output>(`${this.path}/${id}`)
		return response.data.residents
	}
}

const locationService = new LocationService()

export default locationService
