import { episodeService } from '../service'

import { characterService } from '@/characters/service'
import { Card } from '@/core/component/Card'
import { ContentLayout } from '@/core/component/Layout'
import { FC, useEffect, useMemo, useState } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
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

const Episodes: FC = () => {
	const [selectedEpisode, setSelectedEpisode] = useState<{
		id: number
		characters: string[]
	}>({
		id: 1,
		characters: [],
	})

	const {
		data: episodes,
		isLoading: isLoadingEpisodes,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useLoadEpisodes()

	const [flatEpisodes, setFlatEpisodes] = useState(
		episodes?.pages.flatMap((page) => page.results) ?? [],
	)

	const { data: characters } = useLoadCharacters(extractCharacterIds(selectedEpisode.characters))

	useEffect(() => {
		if (episodes) {
			setFlatEpisodes(episodes.pages.flatMap((page) => page.results))
		}
	}, [episodes])

	useEffect(() => {
		const episode = flatEpisodes.find((ep) => ep.id === selectedEpisode.id)
		if (episode) {
			setSelectedEpisode((prev) => ({
				...prev,
				characters: episode.characters,
			}))
		}
	}, [selectedEpisode.id, flatEpisodes])

	const episodeOptions = useMemo(() => {
		return (
			flatEpisodes?.map((episode) => ({
				label: `${episode.episode} - ${episode.name}`,
				value: episode.id.toString(),
			})) ?? []
		)
	}, [flatEpisodes])

	return (
		<ContentLayout
			title='Episodes'
			FilterProps={{ onClear: () => {} }}
			InputProps={{
				onChange: (singleValue) => {
					setSelectedEpisode((prev) => ({
						...prev,
						id: singleValue ? parseInt(singleValue.value) : 1,
					}))
				},
				fetchNextPage,
				value: selectedEpisode.id.toString(),
				options: episodeOptions,
				name: 'episode',
				loading: isLoadingEpisodes || isFetchingNextPage,
				hasNextPage,
				isClearable: true,
			}}
		>
			<Layout data-testid='episodes'>
				{characters?.map((character) => (
					<Card
						key={character.id}
						character={character}
					/>
				))}
			</Layout>
		</ContentLayout>
	)
}

export default Episodes

function useLoadEpisodes() {
	return useInfiniteQuery(
		'episodes',
		({ pageParam }) => {
			return episodeService.getAll({ page: pageParam })
		},
		{
			getNextPageParam: (lastPage) => {
				if (lastPage.info.next) {
					return lastPage.info.next.match(/page=(\d+)/)?.[1]
				}
			},
			keepPreviousData: true,
		},
	)
}

function extractCharacterIds(characters: string[]) {
	return characters.map((character) => {
		return parseInt(character.match(/character\/(\d+)/)?.[1] ?? '0')
	})
}

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
