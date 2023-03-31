import { Seo } from '@/core/component/Seo'
import { Likes } from '@/likes/view'

export default function LikesPage() {
	return (
		<>
			<Seo title='Likes' />
			<Likes />
		</>
	)
}
