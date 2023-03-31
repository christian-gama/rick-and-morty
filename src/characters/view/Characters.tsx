import { Character } from '../dto'
import { characterService } from '../service'

import { Card } from '@/characters/component/Card'
import { ContentLayout } from '@/core/component/Layout'
import { Pagination } from '@/core/dto'
import { useFilter } from '@/core/store'
import { FC, useEffect, useMemo, useState } from 'react'
import { useInfiniteQuery } from 'react-query'
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

type Characters = {
	preloadedCharacters?: Pagination<Character.Output>
}

const Characters: FC<Characters> = ({ preloadedCharacters }) => {
	const filter = useFilter((state) => state.values)
	const setName = useFilter((state) => state.setName)

	const {
		data: characters,
		fetchNextPage,
		hasNextPage,
	} = useLoadCharacters(filter, preloadedCharacters)

	const [flatCharacters, setFlatCharacters] = useState(
		characters?.pages.flatMap((page) => page?.results ?? []),
	)

	useEffect(() => {
		if (characters) {
			setFlatCharacters(characters.pages.flatMap((page) => page?.results ?? []))
		}
	}, [characters])

	useEffect(() => {
		const handleScroll = () => {
			const threshold = 10
			if (
				window.innerHeight + document.documentElement.scrollTop <
				document.documentElement.offsetHeight - threshold
			) {
				return
			}

			fetchNextPage()
		}

		window.addEventListener('scroll', handleScroll)

		return () => window.removeEventListener('scroll', handleScroll)
	}, [fetchNextPage])

	const episodeOptions = useMemo(() => {
		return (
			flatCharacters?.map((character) => ({
				label: `${character.name} - ${character.species}`,
				value: character.name,
			})) ?? []
		)
	}, [flatCharacters])

	return (
		<ContentLayout
			title='Characters'
			InputProps={{
				onChange: (singleValue) => {
					setName(singleValue?.value ?? '')
				},
				fetchNextPage,
				value: filter.name ?? null,
				options: episodeOptions,
				name: 'characters',
				hasNextPage,
				isClearable: true,
			}}
		>
			<Layout data-testid='characters'>
				{flatCharacters?.map((character) => (
					<Card
						key={character.id}
						character={character}
					/>
				))}
			</Layout>
		</ContentLayout>
	)
}

export default Characters

function useLoadCharacters(filter: Character.Input, initialData?: Pagination<Character.Output>) {
	return useInfiniteQuery(
		['characters', filter],
		({ pageParam }) => {
			return characterService.getAll({ ...filter, page: pageParam })
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
