import { FontFace } from '@/core/component/FontFace'
import { RootLayout } from '@/core/component/Layout'
import { Manifest, Seo } from '@/core/component/Seo'
import { theme } from '@/core/theme'
import { AppProps } from 'next/app'
import { Open_Sans, Lato } from 'next/font/google'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'styled-components'
import '../src/core/css/reset.css'

const primaryFontFace = Open_Sans({
	subsets: ['latin'],
	weight: ['700', '400'],
	variable: '--primary-font',
	style: 'normal',
	fallback: ['sans-serif'],
	preload: true,
	display: 'swap',
})

const secondaryFontFace = Lato({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--secondary-font',
	fallback: ['sans-serif'],
	style: 'normal',
	preload: true,
	display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Seo
				description={`Explore the characters, locations, and episodes of the Rick and Morty series. Filter by your favorite episodes or characters to find exactly what you're looking for.`}
				viewport={{
					width: 'device-width',
					initialScale: 1,
				}}
				keywords={[
					'rick and morty',
					'characters',
					'locations',
					'episodes',
					'filter',
					'favorite',
					'season',
					'episode',
					'character',
					'location',
				]}
				twitter
			/>

			<Manifest />

			<FontFace
				primaryFontFamily={primaryFontFace.style.fontFamily}
				secondaryFontFamily={secondaryFontFace.style.fontFamily}
			/>

			<QueryClientProvider client={new QueryClient()}>
				<ThemeProvider theme={theme}>
					<RootLayout>
						<Component {...pageProps} />
					</RootLayout>
				</ThemeProvider>
			</QueryClientProvider>
		</>
	)
}
