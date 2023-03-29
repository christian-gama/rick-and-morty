import { Image } from '@/core/component/Image'
import { Link } from '@/core/component/Link'
import type { Theme } from '@/core/theme'
import type { FC } from 'react'
import styled, { css } from 'styled-components'

const StyledOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	padding: 8px 12px;
	background-image: ${({ theme }: { theme: Theme }) => css`
		linear-gradient(${theme.color.primary[900]}f9, ${theme.color.primary[700]}f9);
	`};
	color: white;
	font-family: ${({ theme }: { theme: Theme }) => theme.font.openSans};
	font-size: 1rem;
	z-index: 1;
	transition: background-color 0.2s ease-in-out, padding 0.2s ease-in-out,
		font-size 0.2s ease-in-out;

	@media (min-width: 768px) {
		font-size: 1.4rem;
		padding: 12px 16px;
	}
`

const StyledImage = styled(Image)<{ yPos?: number; xPos?: number }>`
	filter: saturate(0%);
	transition: filter 0.3s ease-in-out;
	object-fit: cover;
	object-position: ${({ xPos, yPos }) =>
		`${xPos ? `${xPos}%` : '50%'} ${yPos ? `${yPos}%` : '50%'}`};
`

const StyledSection = styled(Link)`
	width: 100%;
	position: relative;
	height: 100%;
	transition: height 0.2s ease-in-out;

	&:hover ${StyledImage} {
		filter: saturate(100%);
	}

	&:hover ${StyledOverlay} {
		padding: 20px 28px;
		font-size: 1.4rem;

		@media (min-width: 768px) {
			font-size: 1.6rem;
			padding: 28px 36px;
		}
	}

	&:hover {
		height: 250%;
		cursor: pointer;
	}
`

type SectionProps = {
	title: string
	img: string
	href: string
	yPos?: number
	xPos?: number
}

const Section: FC<SectionProps> = ({ href, title, img, yPos, xPos }) => {
	return (
		<StyledSection href={href}>
			<StyledOverlay>
				<h1>{title}</h1>
			</StyledOverlay>

			<StyledImage
				src={img}
				alt={title}
				yPos={yPos}
				xPos={xPos}
				fill
				quality={90}
			/>
		</StyledSection>
	)
}

export default Section
