import { create } from '../create'

type State = {
	isOpen: boolean
}

type Actions = {
	open: () => void
	close: () => void
}

export const useFilter = create<State & Actions>((set) => ({
	isOpen: true,

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
}))
