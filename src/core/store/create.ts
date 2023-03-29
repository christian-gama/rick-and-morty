import { type StateCreator, create as _create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export const create = <T>(initializer: StateCreator<T, [['zustand/immer', never]], [], T>) =>
	_create(immer(initializer))
