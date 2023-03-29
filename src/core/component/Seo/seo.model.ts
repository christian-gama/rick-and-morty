export type MetaTag = {
	name: string
	content: string
}

export type Viewport = {
	width?: 'device-width' | number
	height?: 'device-height' | number
	initialScale?: number
	minimumScale?: number
	maximumScale?: number
	userScalable?: boolean
}

export type Robots = {
	/** @description include the page in the index - [Note: you do not need to include this if noindex is not specified, it is assumed as index) */
	index?: boolean

	/** @description do not include the page in the index or show on the SERPs */
	noindex?: boolean

	/** @description follow the links on the page to discover other pages */
	follow?: boolean

	/** @description do not follow the links on the page */
	nofollow?: boolean

	/** @description a shortcut to specify noindex, nofollow */
	none?: boolean

	/** @description a shortcut to specify index, follow */
	all?: boolean

	/** @description do not index the images on the page */
	noimageindex?: boolean

	/** @description do not show a cached version of the page on the SERPs */
	noarchive?: boolean

	/** @description this is the same as noarchive, but only for MSN */
	nocache?: boolean

	/** @description do not show a search box for your site on the SERPs */
	nositelinkssearchbox?: boolean

	/** @description do not allow voice services to read your page aloud */
	nopagereadloud?: boolean

	/** @description o not show translations of the page on the SERPs */
	notranslate?: boolean

	/** @description the date and time after which the page should be considered unavailable */
	unavailable_after?: Date
}
