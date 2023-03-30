import Search, { SelectOption } from './Search'

import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const options: SelectOption[] = [
	{ label: 'Option 1', value: '1' },
	{ label: 'Option 2', value: '2' },
	{ label: 'Option 3', value: '3' },
]

describe('Search', () => {
	it('renders the correct items', async () => {
		const handleChange = jest.fn()

		render(
			<Search
				options={options}
				value={null}
				onChange={handleChange}
				isClearable={true}
			/>,
		)

		fireEvent.click(screen.getByText('Search...'))
		fireEvent.focus(screen.getByRole('combobox'))

		userEvent.type(screen.getByRole('combobox'), '{arrowdown}{enter}')

		await waitFor(() => {
			expect(handleChange).toHaveBeenCalledTimes(1)
			expect(handleChange.mock.calls[0][0]).toEqual(options[1])
		})
	})

	it('clears the value when value is null', async () => {
		const handleChange = jest.fn()

		const { rerender } = render(
			<Search
				options={options}
				value={null}
				onChange={handleChange}
				isClearable={true}
			/>,
		)

		fireEvent.click(screen.getByText('Search...'))
		fireEvent.focus(screen.getByRole('combobox'))
		userEvent.type(screen.getByRole('combobox'), '{arrowdown}{enter}')

		await waitFor(() => {
			expect(handleChange).toHaveBeenCalledTimes(1)
			expect(handleChange.mock.calls[0][0]).toEqual(options[1])
		})

		// Set the value prop to null and rerender the component
		rerender(
			<Search
				options={options}
				value={null}
				onChange={handleChange}
				isClearable={true}
			/>,
		)

		expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
	})
})
