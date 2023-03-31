import { characterService } from '@/characters/service'
import { Characters } from '@/characters/view'
import { GetStaticProps } from 'next'
import { ComponentProps } from 'react'
export default Characters

export const getStaticProps: GetStaticProps<
	ComponentProps<typeof Characters>
> = async (): Promise<any> => {
	const characters = await characterService.getAll({ page: 1 })

	if (!characters.results || characters.results.length === 0) {
		return {
			props: {
				preloadedCharacters: [],
			},
		}
	}

	return {
		props: {
			preloadedCharacters: characters,
		},
		revalidate: 60 * 60 * 24 * 7, // 1 week
	}
}
