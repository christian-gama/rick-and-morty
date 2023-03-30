import { Pill } from './'

import { renderWithProviders } from '@/testutil/render'
import { screen } from '@testing-library/dom'

describe('Pill', () => {
	test.each([
		['Alive', '#1D9C1A'],
		['Dead', '#C30F0F'],
		['unknown', '#3D3D3D'],
	])('renders the pill correctly for status %s', async (status, color) => {
		await renderWithProviders(<Pill status={status as 'Alive' | 'Dead' | 'unknown'} />)

		const pillText = screen.getByText(status)
		expect(pillText).toBeInTheDocument()

		const pillElement = pillText.parentElement
		expect(pillElement).toHaveStyle(`background-color: ${color}`)
	})
})
