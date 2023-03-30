import type { Theme } from '@/core/theme'
import styled, { css } from 'styled-components'

const RootLayout = styled.div`
	min-height: 100vh;
	background-image: ${({ theme }: { theme: Theme }) => css`
    url(/stars.png),
    linear-gradient(${theme.color.primary[800]} 17%, ${theme.color.secondary[500]});
  `};
	background-attachment: fixed;

	@keyframes moveBackground {
		0% {
			background-position: 0% 0%;
		}

		50% {
			background-position: 100% 10000%;
		}

		100% {
			background-position: 0% 0%;
		}
	}

	animation: moveBackground 3600s linear infinite;
`

export default RootLayout
