import Head from 'next/head'

const Manifest = () => (
	<Head>
		<link
			rel='manifest'
			href='/manifest.webmanifest'
		/>
		<meta
			name='theme-color'
			content='#0A0C43'
		/>
		<link
			rel='apple-touch-icon'
			href='/icon-192x192.png'
		/>
	</Head>
)

export default Manifest
