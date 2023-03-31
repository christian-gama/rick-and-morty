import { extractCharacterIds } from '@/characters/lib'
import { characterService } from '@/characters/service'
import { Seo } from '@/core/component/Seo'
import { locationService } from '@/locations/service'
import { Locations } from '@/locations/view'
import { GetStaticProps } from 'next'
import { ComponentProps } from 'react'

export default function LocationsPage(props: ComponentProps<typeof Locations>) {
	return (
		<>
			<Seo title='Locations' />
			<Locations {...props} />
		</>
	)
}

export const getStaticProps: GetStaticProps<
	ComponentProps<typeof Locations>
> = async (): Promise<any> => {
	const locations = await locationService.getAll({ page: 1 })

	if (!locations.results || locations.results.length === 0) {
		return {
			props: {
				preloadedCharacters: [],
				preloadedLocations: [],
			},
		}
	}

	const characterIds = await locationService.getAllCharactersOfLocation(locations.results[0].id)

	const characters = await characterService.getByIds(extractCharacterIds(characterIds))

	return {
		props: {
			preloadedCharacters: characters,
			preloadedLocations: locations,
		},
		revalidate: 60 * 60 * 24 * 7, // 1 week
	}
}
