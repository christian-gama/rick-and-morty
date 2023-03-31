import { characterService } from '@/characters/service'
import { extractCharacterIds } from '@/episodes/lib'
import { episodeService } from '@/episodes/service'
import { Episodes } from '@/episodes/view'
import { GetStaticProps } from 'next'
import { ComponentProps } from 'react'
export default Episodes

export const getStaticProps: GetStaticProps<
	ComponentProps<typeof Episodes>
> = async (): Promise<any> => {
	const episodes = await episodeService.getAll({ page: 1 })

	if (!episodes.results || episodes.results.length === 0) {
		return {
			props: {
				preloadedCharacters: [],
				preloadedEpisodes: [],
			},
		}
	}

	const characterIds = await episodeService.getAllCharactersOfEpisode(episodes.results[0].id)

	const characters = await characterService.getByIds(extractCharacterIds(characterIds))

	return {
		props: {
			preloadedCharacters: characters,
			preloadedEpisodes: episodes,
		},
		revalidate: 60 * 60 * 24 * 7, // 1 week
	}
}
