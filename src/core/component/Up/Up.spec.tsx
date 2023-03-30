import { Up } from './'

import '@testing-library/jest-dom'

import { renderWithProviders } from '@/testutil/render'
import { screen } from '@testing-library/dom'

describe('Up', () => {
	it('should not render when isVisible is false', async () => {
		await renderWithProviders(<Up />)
		expect(screen.queryByRole('button')).not.toBeInTheDocument()
	})
})
