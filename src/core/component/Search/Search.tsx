import type { Theme } from '@/core/theme'
import styled from 'styled-components'

const Search = styled.input`
	width: 100%;
	font-size: 1rem;
	padding: 0.8rem 0.625rem;
	border: none;
	border-radius: 1rem;
	box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.25);
	color: ${({ theme }: { theme: Theme }) => theme.color.primary[800]};
	font-family: ${({ theme }: { theme: Theme }) => theme.font.openSans};
	transition: box-shadow 0.15s ease-in-out;

	&:focus {
		outline: none;
		box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.25),
			0 0 0 3px ${({ theme }: { theme: Theme }) => theme.color.secondary[300]};
	}

	&::placeholder {
		color: ${({ theme }: { theme: Theme }) => theme.color.primary[800]};
		opacity: 0.5;
		font-family: ${({ theme }: { theme: Theme }) => theme.font.openSans};
	}
`

export default Search
