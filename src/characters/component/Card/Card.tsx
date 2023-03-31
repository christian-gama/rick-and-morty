import { Pill } from '../Pill'

import { Character } from '@/characters/dto'
import { Image } from '@/core/component/Image'
import { HeartIcon } from '@/core/icon'
import { ellipsis } from '@/core/lib'
import { useFilter } from '@/core/store'
import type { Theme } from '@/core/theme'
import { useLike } from '@/likes/store'
import styled from 'styled-components'

const StyledCard = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;
	border-radius: 1rem;
	overflow: hidden;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25), 0 3px 16px rgba(0, 0, 0, 0.22);
	max-width: 20rem;
	border: 1px solid ${({ theme }: { theme: Theme }) => theme.color.secondary[50]};
`

const Body = styled.div`
	padding: 1rem 0.75rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 8rem;
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

const Like = styled(HeartIcon)<{ isLiked: boolean }>`
	width: 2rem;
	height: 2rem;
	opacity: 0.8;
	fill: ${({ isLiked }: { isLiked: boolean }) => (isLiked ? '#c30f0f' : '#d8d8d8')};
	transition: fill 0.25s ease, opacity 0.25s ease;
	cursor: pointer;

	&:hover {
		fill: #c30f0f;
		opacity: 1;
	}
`

type CardProps = {
	character: Character.Output
}

export const CharacterCard = ({ character }: CardProps) => {
	const values = useFilter((state) => state.values)
	const { addCharacter, removeCharacter, isLiked } = useLike((state) => state)

	if (!character.species.toLowerCase().includes(values.species?.toLowerCase() || '')) {
		return null
	}

	if (!character.status.toLowerCase().includes(values.status?.toLowerCase() || '')) {
		return null
	}

	if (!character.gender.toLowerCase().includes(values.gender?.toLowerCase() || '')) {
		return null
	}

	return (
		<StyledCard data-testid='card'>
			<Image
				src={character.image}
				alt={character.name}
				width={300}
				height={300}
				style={{
					maxWidth: '20rem',
					height: '300px',
					objectFit: 'cover',
					objectPosition: 'center',
				}}
			/>

			<Body>
				<BodyHeader>
					<NameContainer>
						<Name>{ellipsis(character.name, 14)}</Name>
						<Subtitle>{`${character.gender} - ${character.species}`}</Subtitle>
					</NameContainer>
					<Pill status={character.status} />
				</BodyHeader>

				<BodyFooter>
					<LocationContainer>
						<Subtitle>Last location</Subtitle>
						<Location>{ellipsis(character.location.name, 24)}</Location>
					</LocationContainer>

					<Like
						isLiked={isLiked(character.id)}
						onClick={() => {
							if (isLiked(character.id)) {
								removeCharacter(character.id)
							} else {
								addCharacter(character.id)
							}
						}}
					/>
				</BodyFooter>
			</Body>
		</StyledCard>
	)
}

export default CharacterCard
