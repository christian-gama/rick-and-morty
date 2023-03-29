import { color } from './color'
import { font } from './font'

export type Theme = {
	color: typeof color
	font: typeof font
}

export const theme = {
	color,
	font,
}
