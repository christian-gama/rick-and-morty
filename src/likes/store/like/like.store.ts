import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type State = {
	characterIds: number[]
}

export type Actions = {
	addCharacter: (id: number) => void
	removeCharacter: (id: number) => void
	isLiked: (id: number) => boolean
}

export const ZST_LIKE_KEY = 'likes'

const initializer: StateCreator<
	State & Actions,
	[['zustand/persist', unknown], ['zustand/immer', never]],
	[],
	State & Actions
> = (set, get) => ({
	characterIds: [],

	isLiked: (id: number) => {
		const { characterIds } = get()
		return characterIds.includes(id)
	},

	addCharacter: (id: number) => {
		set((state) => {
			state.characterIds.push(id)
		})
	},

	removeCharacter: (id: number) => {
		set((state) => {
			state.characterIds = state.characterIds.filter((item) => item !== id)
		})
	},
})

export const createLikeStore = persist(immer(initializer), {
	name: ZST_LIKE_KEY,
})

export const useLike = create<State & Actions>()(createLikeStore)
