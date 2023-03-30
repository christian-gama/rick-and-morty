import axios, { type AxiosInstance } from 'axios'

class RickAndMortyAPI {
	protected readonly api: AxiosInstance

	constructor() {
		this.api = axios.create({
			baseURL: 'https://rickandmortyapi.com/api',
		})
	}
}

export default RickAndMortyAPI
