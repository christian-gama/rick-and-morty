import dynamic from 'next/dynamic'
import { FC } from 'react'

const LikesWrapper = dynamic(() => import('./LikesWrapper'), { ssr: false })

const Likes: FC = () => {
	return <LikesWrapper />
}

export default Likes
