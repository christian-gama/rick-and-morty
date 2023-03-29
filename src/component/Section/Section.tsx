import { Image } from '../Image'
import { Link } from '../Link'

import { Theme } from '@/theme'
import { FC } from 'react'
import styled from 'styled-components'

const StyledOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	padding: 8px 12px;
	background-color: rgba(0, 0, 0, 0.75);
	color: white;
	font-family: ${({ theme }: { theme: Theme }) => theme.font.primary};
	font-size: 1rem;
	z-index: 1;
	transition: background-color 0.2s ease-in-out, padding 0.2s ease-in-out,
		font-size 0.2s ease-in-out;

	@media (min-width: 768px) {
		font-size: 1.4rem;
		padding: 12px 16px;
	}
`

const StyledImage = styled(Image)`
	filter: saturate(0%);
	transition: filter 0.3s ease-in-out;
	object-fit: cover;
	object-position: 50% 25%;
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
		background-color: rgba(0, 0, 0, 0.9);
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
}

const Section: FC<SectionProps> = ({ href, title, img }) => {
	return (
		<StyledSection href={href}>
			<StyledOverlay>
				<h1>{title}</h1>
			</StyledOverlay>

			<StyledImage
				src={img}
				alt={title}
				fill
			/>
		</StyledSection>
	)
}

export default Section
