import { Seo } from '@/core/component/Seo'
import { Home } from '@/home/view/Home'

export default function HomePage() {
	return (
		<>
			<Seo title='Home' />
			<Home />
		</>
	)
}
