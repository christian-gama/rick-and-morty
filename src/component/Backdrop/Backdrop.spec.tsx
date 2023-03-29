import { renderWithProviders } from '../../../testutil'
import Backdrop from './Backdrop'

import React from 'react'

describe('Backdrop', () => {
	it('should have opacity 0 when closed', async () => {
		const { getByTestId } = await renderWithProviders(<Backdrop isOpen={false} />)
		const backdrop = getByTestId('backdrop')
		expect(backdrop).toHaveStyle('opacity: 0')
	})

	it('should have opacity 1 when open', async () => {
		const { getByTestId } = await renderWithProviders(<Backdrop isOpen={true} />)
		const backdrop = getByTestId('backdrop')
		expect(backdrop).toHaveStyle('opacity: 1')
	})

	it('should have pointer-events none when closed', async () => {
		const { getByTestId } = await renderWithProviders(<Backdrop isOpen={false} />)
		const backdrop = getByTestId('backdrop')
		expect(backdrop).toHaveStyle('pointer-events: none')
	})

	it('should have pointer-events all when open', async () => {
		const { getByTestId } = await renderWithProviders(<Backdrop isOpen={true} />)
		const backdrop = getByTestId('backdrop')
		expect(backdrop).toHaveStyle('pointer-events: all')
	})
})
