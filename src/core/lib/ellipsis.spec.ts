import { ellipsis } from './ellipsis'

describe('ellipsis', function () {
	it('should return the same string if it is shorter than 17 characters', () => {
		const text = 'short text'
		const result = ellipsis(text)
		expect(result).toEqual(text)
	})

	it('should return ellipsis if the string is longer than 17 characters', () => {
		const text = 'this is a very long text'
		const result = ellipsis(text)
		expect(result).toEqual('this is a very lon...')
	})
})
