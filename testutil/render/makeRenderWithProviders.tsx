import { waitFetch } from '../waitFetch'

import { render, type RenderOptions } from '@testing-library/react'
import type { FC, ReactElement } from 'react'

type Return = Omit<ReturnType<typeof render>, 'rerender'> & {
	rerender: (rerenderUi: ReactElement) => Promise<void>
}

export const makeRenderWithProviders =
	(AllProviders: FC<any>) =>
	async (ui: ReactElement, options?: RenderOptions): Promise<Return> => {
		const renderResult = render(<AllProviders>{ui}</AllProviders>, {
			...options,
		})

		await waitFetch()

		return {
			...renderResult,
			rerender: async (rerenderUi: ReactElement) => {
				renderResult.rerender(<AllProviders>{rerenderUi}</AllProviders>)
				await waitFetch()
			},
		}
	}
