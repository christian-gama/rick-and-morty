import { Episodes } from '@/episodes/view'
import { GetStaticProps } from 'next'
import { ComponentProps } from 'react'
export default Episodes

export const getStaticProps: GetStaticProps<ComponentProps<typeof Episodes>> = async () => {
	return {
		props: {},
	}
}
