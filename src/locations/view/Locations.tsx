import { extractCharacterIds } from '../lib'
import { locationService } from '../service'

import { Card } from '@/characters/component/Card'
import { characterService } from '@/characters/service'
import { ContentLayout } from '@/core/component/Layout'
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

const Locations: FC = () => {
	const [selectedLocation, setSelectedLocation] = useState<{
		id: number
		residents: string[]
	}>({
		id: 1,
		residents: [],
	})

	const { data: locations, fetchNextPage, hasNextPage } = useLoadLocations()

	const [flatLocations, setFlatLocations] = useState(
		locations?.pages.flatMap((page) => page?.results ?? []),
	)

	const { data: residents, isLoading: isLoadingResidents } = useLoadResidents(
		extractCharacterIds(selectedLocation.residents),
	)

	useEffect(() => {
		if (locations) {
			setFlatLocations(locations.pages.flatMap((page) => page?.results ?? []))
		}
	}, [locations])

	useEffect(() => {
		const episode = flatLocations?.find((location) => location.id === selectedLocation.id)

		if (episode) {
			setSelectedLocation((prev) => ({
				...prev,
				residents: episode.residents,
			}))
		}
	}, [selectedLocation.id, flatLocations])

	const locationOptions = useMemo(() => {
		return (
			flatLocations?.map((location) => ({
				label: `${location.name} - ${location.type}`,
				value: location.id.toString(),
			})) ?? []
		)
	}, [flatLocations])

	return (
		<ContentLayout
			title='Locations'
			InputProps={{
				onChange: (singleValue) => {
					setSelectedLocation((prev) => ({
						...prev,
						id: singleValue ? parseInt(singleValue.value) : 1,
					}))
				},
				fetchNextPage,
				value: selectedLocation.id.toString(),
				options: locationOptions,
				name: 'location',
				hasNextPage,
			}}
		>
			<Layout data-testid='locations'>
				{isLoadingResidents ? (
					<LoadingIcon />
				) : (
					residents?.map((resident) => (
						<Card
							key={resident.id}
							character={resident}
						/>
					))
				)}
			</Layout>
		</ContentLayout>
	)
}

export default Locations

function useLoadLocations() {
	return useInfiniteQuery(
		'locations',
		({ pageParam }) => {
			return locationService.getAll({ page: pageParam })
		},
		{
			getNextPageParam: (lastPage) => {
				if (lastPage?.info.next) {
					return lastPage.info.next.match(/page=(\d+)/)?.[1]
				}
			},
			keepPreviousData: true,
		},
	)
}

function useLoadResidents(residentsId: number[]) {
	const result = useQuery(
		['residents', residentsId],
		() => {
			return characterService.getByIds(residentsId)
		},
		{
			enabled: residentsId.length > 0,
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
