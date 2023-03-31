import { create } from '../create'

import { Character } from '@/characters/dto'

type State = {
	isOpen: boolean
	values: Character.Input
}

type Actions = {
	open: () => void
	close: () => void
	clear: () => void
	setStatus: (status: State['values']['status']) => void
	setGender: (status: State['values']['gender']) => void
	setSpecies: (status: State['values']['species']) => void
	setName: (name: State['values']['name']) => void
}

export const useFilter = create<State & Actions>((set) => ({
	isOpen: false,
	values: {
		status: undefined,
		gender: undefined,
		species: undefined,
	},

	close: () => {
		set((state) => {
			state.isOpen = false
		})
	},

	open: () => {
		set((state) => {
			state.isOpen = true
		})
	},

	clear: () => {
		set((state) => {
			state.values = {
				status: undefined,
				gender: undefined,
				species: undefined,
			}
		})
	},

	setStatus: (status) => {
		set((state) => {
			state.values.status = status
		})
	},

	setGender: (gender) => {
		set((state) => {
			state.values.gender = gender
		})
	},

	setSpecies: (species) => {
		set((state) => {
			state.values.species = species
		})
	},

	setName: (name) => {
		set((state) => {
			state.values.name = name
		})
	},
}))
