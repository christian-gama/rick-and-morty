import { Pill } from '../Pill'

import { Image } from '@/core/component/Image'
import { HeartIcon } from '@/core/icon'
import { ellipsis } from '@/core/lib'
import type { Theme } from '@/core/theme'
import styled from 'styled-components'

const StyledCard = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;
	border-radius: 1rem;
	overflow: hidden;
	box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.25);
	max-width: 20rem;
`

const Body = styled.div`
	padding: 1rem 0.75rem;
	display: flex;
	flex-direction: column;
	gap: 2rem;
`

const Name = styled.h3`
	font-size: 1.5rem;
	color: ${({ theme }: { theme: Theme }) => theme.color.text.dark};
	font-family: ${({ theme }: { theme: Theme }) => theme.font.openSans};
	font-weight: 600;
	text-transform: capitalize;
`

const Subtitle = styled.p`
	font-size: 0.75rem;
	color: ${({ theme }: { theme: Theme }) => theme.color.text.light};
	font-family: ${({ theme }: { theme: Theme }) => theme.font.openSans};
	font-weight: 400;
	text-transform: capitalize;
`

const Location = styled.p`
	font-size: 1rem;
	color: ${({ theme }: { theme: Theme }) => theme.color.text.default};
	font-family: ${({ theme }: { theme: Theme }) => theme.font.openSans};
	font-weight: 600;
	text-transform: capitalize;
`

const NameContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.125rem;
`

const LocationContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.125rem;
`

const BodyHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`

const BodyFooter = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
`

const Like = styled(HeartIcon)`
	width: 2rem;
	height: 2rem;
	fill: #adadad;
	transition: fill 0.25s ease;
	cursor: pointer;

	&:hover {
		fill: #c30f0f;
	}
`

type CardProps = {
	name: string
	img: string
	location: string
	genre: string
	type: string
	condition: 'alive' | 'dead' | 'unknown'
}

export const Card = ({ name, img, location, genre, type, condition }: CardProps) => {
	return (
		<StyledCard>
			<Image
				src={img}
				alt={name}
				width={300}
				height={300}
				style={{
					maxWidth: '20rem',
					height: '100%',
					objectFit: 'cover',
					objectPosition: 'center',
				}}
			/>

			<Body>
				<BodyHeader>
					<NameContainer>
						<Name>{ellipsis(name, 14)}</Name>
						<Subtitle>{`${genre} - ${type}`}</Subtitle>
					</NameContainer>
					<Pill condition={condition} />
				</BodyHeader>

				<BodyFooter>
					<LocationContainer>
						<Subtitle>Last location</Subtitle>
						<Location>{location}</Location>
					</LocationContainer>

					<Like />
				</BodyFooter>
			</Body>
		</StyledCard>
	)
}

export default Card
