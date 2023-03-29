import { Section } from '@/component/Section'
import { FC } from 'react'
import styled from 'styled-components'

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	max-height: 100vh;
	height: 100vh;
`

const Home: FC = () => {
	return (
		<Layout data-testid='home'>
			<Section
				href='/episodes'
				img='/episodes.png'
				title='Episodes'
			/>

			<Section
				href='/characters'
				img='/characters.png'
				title='Characters'
			/>

			<Section
				href='/locations'
				img='/locations.jpg'
				title='Locations'
			/>
		</Layout>
	)
}

export default Home
