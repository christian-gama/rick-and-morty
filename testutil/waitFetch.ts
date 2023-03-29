import { act } from '@testing-library/react'

export const waitFetch = async (timeout = 1) => {
	await act(async () => {
		await new Promise((resolve) => setTimeout(resolve, timeout))
	})
}
