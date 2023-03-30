import { Card } from '@/characters/component/Card'
import { Character } from '@/characters/dto'
import { characterService } from '@/characters/service'
import { ContentLayout } from '@/core/component/Layout'
import { LoadingIcon } from '@/core/icon'
import { useLike } from '@/likes/store'
import { FC, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'

const Layout = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
	grid-gap: 3rem;
	padding: 0.625rem;
	justify-items: center;

	@media (min-width: 768px) {
		padding: 1rem;
	}
`

// We need a wrapper because of the localStorage persistence along with Server Side Rendering.
// If we don't use a wrapper, the likes are not read from localStorage on the server side causing
// a rendering mismatch between the server and the client.
const LikesWrapper: FC = () => {
	const characterIds = useLike((state) => state.characterIds)
	const [characterOptions, setCharacterOptions] = useState<Array<{ label: string; value: string }>>(
		[],
	)
	const [characters, setCharacters] = useState<Character.Output[]>([])

	const [filter, setFilter] = useState<{
		id: string | null
	}>({
		id: null,
	})

	const { data, isLoading } = useLoadCharacters(characterIds)

	useEffect(() => {
		if (characterIds.length === 0) {
			setCharacters([])
		}
	}, [characterIds])

	useEffect(() => {
		if (data) {
			if (Array.isArray(data)) {
				setCharacters(
					data.filter((character) => filter.id === null || character.id === Number(filter.id)),
				)
			} else {
				setCharacters([data])
			}
		}
	}, [data, filter])

	useEffect(() => {
		if (data) {
			if (Array.isArray(data)) {
				setCharacterOptions(
					data?.map((character) => ({
						label: character.name,
						value: character.id.toString(),
					})),
				)
			} else {
				const character = data as Character.Output
				setCharacterOptions([
					{
						label: character.name,
						value: character.id.toString(),
					},
				])
			}
		}
	}, [characters])

	return (
		<ContentLayout
			title='Likes'
			InputProps={{
				onChange: (singleValue) => {
					setFilter({ id: singleValue ? singleValue.value : null })
				},
				value: filter.id,
				options: characterOptions,
				isClearable: true,
				name: 'character',
			}}
		>
			<Layout data-testid='characters'>
				{isLoading ? (
					<LoadingIcon />
				) : (
					characters?.map((character) => (
						<Card
							key={character.id}
							character={character}
						/>
					))
				)}
			</Layout>
		</ContentLayout>
	)
}

export default LikesWrapper

function useLoadCharacters(characterIds: number[]) {
	return useQuery(
		['characters', characterIds],
		() => {
			return characterService.getByIds(characterIds)
		},
		{
			enabled: characterIds.length > 0,
		},
	)
}
