import Head from 'next/head'

type MetaTags = {
	name: string
	content: string
}

type SeoProps = {
	title?: string
	description?: string
	viewport?: {
		width?: 'device-width' | number
		height?: 'device-height' | number
		initialScale?: number
		minimumScale?: number
		maximumScale?: number
		userScalable?: boolean
	}
	additionalMetaTags?: MetaTags[]
	keywords?: string[]
	twitter?: boolean
}

const Seo = ({ title, description, additionalMetaTags, viewport, keywords, twitter }: SeoProps) => {
	const viewportTags =
		viewport &&
		Object.entries(viewport)
			.map(([key, value]) => {
				if (typeof value === 'boolean') {
					return `${kebabcase(key)}=${value ? 'yes' : 'no'}`
				}

				return `${kebabcase(key)}=${value}`
			})
			.filter((tag) => tag)

	return (
		<Head>
			<meta charSet='utf-8' />

			{title && (
				<>
					<title>{title}</title>
					<meta
						name='title'
						content={title}
						key='title'
					/>

					{twitter && (
						<meta
							name='twitter:title'
							content={title}
							key='twitter:title'
						/>
					)}
				</>
			)}

			{description && (
				<>
					<meta
						name='description'
						content={description}
						key='description'
					/>

					{twitter && (
						<meta
							name='twitter:description'
							content={description}
							key='twitter:description'
						/>
					)}
				</>
			)}

			{twitter && (
				<meta
					name='twitter:card'
					content='summary'
					key='twitter:card'
				/>
			)}

			{twitter && (
				<meta
					name='twitter:url'
					content='https://bandsorteio.vercel.app/'
					key='twitter:site'
				/>
			)}

			{viewportTags && (
				<meta
					name='viewport'
					content={viewportTags.join(', ')}
					key='viewport'
				/>
			)}

			{keywords && (
				<meta
					name='keywords'
					content={keywords?.join(', ')}
					key='keywords'
				/>
			)}

			{additionalMetaTags?.map((metaTag) => (
				<meta
					key={metaTag.name}
					name={metaTag.name}
					content={metaTag.content}
				/>
			))}
		</Head>
	)
}

export default Seo

function kebabcase(str: string) {
	return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}
