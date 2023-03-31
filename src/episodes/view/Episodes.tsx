import { Episode } from '../dto'
import { extractCharacterIds } from '../lib'
import { episodeService } from '../service'

import { Card } from '@/characters/component/Card'
import { Character } from '@/characters/dto'
import { characterService } from '@/characters/service'
import { ContentLayout } from '@/core/component/Layout'
import { Pagination } from '@/core/dto'
import { LoadingIcon } from '@/core/icon'
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

type EpisodesProps = {
	preloadedEpisodes: Pagination<Episode.Output>
	preloadedCharacters: Character.Output[]
}

const Episodes: FC<EpisodesProps> = ({ preloadedEpisodes, preloadedCharacters }) => {
	const [selectedEpisode, setSelectedEpisode] = useState<{
		id: number
		characters: string[]
	}>({
		id: 1,
		characters: [],
	})

	const { data: episodes, fetchNextPage, hasNextPage } = useLoadEpisodes(preloadedEpisodes)

	const [flatEpisodes, setFlatEpisodes] = useState(
		episodes?.pages.flatMap((page) => page?.results ?? []),
	)

	const { data: characters, isLoading: isLoadingCharacters } = useLoadCharacters(
		extractCharacterIds(selectedEpisode.characters),
		preloadedCharacters,
	)

	useEffect(() => {
		if (episodes) {
			setFlatEpisodes(episodes.pages.flatMap((page) => page?.results ?? []))
		}
	}, [episodes])

	useEffect(() => {
		const episode = flatEpisodes?.find((ep) => ep.id === selectedEpisode.id)

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
				hasNextPage,
			}}
		>
			<Layout data-testid='episodes'>
				{isLoadingCharacters ? (
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

export default Episodes

function useLoadEpisodes(initialData?: Pagination<Episode.Output>) {
	return useInfiniteQuery(
		'episodes',
		({ pageParam }) => {
			return episodeService.getAll({ page: pageParam })
		},
		{
			getNextPageParam: (lastPage) => {
				if (lastPage?.info.next) {
					return lastPage.info.next.match(/page=(\d+)/)?.[1]
				}
			},
			keepPreviousData: true,
			initialData: { pages: [initialData], pageParams: [] },
		},
	)
}

function useLoadCharacters(characterIds: number[], initialData?: Character.Output[]) {
	const result = useQuery(
		['characters', characterIds],
		() => {
			return characterService.getByIds(characterIds)
		},
		{
			enabled: characterIds.length > 0 && !!initialData,
			initialData,
		},
	)

	// Because the API may return a single object instead of an array in case there is only one resident
	if (result.data) {
		if (!Array.isArray(result.data)) {
			result.data = [result.data]
		}
	}

	return result
}
