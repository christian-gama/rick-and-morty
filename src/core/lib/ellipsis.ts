export const ellipsis = (text: string, len = 18) => {
	if (text.length > len) {
		return text.slice(0, len) + '...'
	}

	return text
}
