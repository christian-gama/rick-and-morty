type FontFaceProps = {
	primaryFontFamily: string
	secondaryFontFamily: string
	'data-testid'?: string
}

const FontFace = ({ primaryFontFamily, secondaryFontFamily, ...props }: FontFaceProps) => (
	<style
		// @ts-ignore
		global='true'
		// @ts-ignore
		jsx='true'
		{...props}
	>
		{`
			:root {
				--primary-font: ${primaryFontFamily};
				--secondary-font: ${secondaryFontFamily};
			}
		`}
	</style>
)

export default FontFace
