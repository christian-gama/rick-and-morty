import { renderWithProviders } from '../../../testutil'
import Home from './Home'

describe('Home', () => {
	it('renders correctly', async () => {
		const { getByTestId } = await renderWithProviders(<Home />)

		const element = getByTestId('home')

		expect(element).toBeInTheDocument()
	})

	it('contains the episodes section', async () => {
		const { container } = await renderWithProviders(<Home />)

		const element = container.querySelector('a[href="/episodes"]')

		expect(element).toBeInTheDocument()
	})

	it('contains the characters section', async () => {
		const { container } = await renderWithProviders(<Home />)

		const element = container.querySelector('a[href="/characters"]')

		expect(element).toBeInTheDocument()
	})

	it('contains the locations section', async () => {
		const { container } = await renderWithProviders(<Home />)

		const element = container.querySelector('a[href="/locations"]')

		expect(element).toBeInTheDocument()
	})
})
