import NextImage from 'next/image'
import type { CSSProperties, FC } from 'react'
import styled, { keyframes } from 'styled-components'

interface ImageProps {
	alt: string
	src: string
	fill?: boolean
	sizes?: string
	width?: number
	height?: number
	style?: CSSProperties
	quality?: number
}

const pulseKeyframe = keyframes`
  from {
    background-color: rgba(222, 222, 222, 0.28);
  }

  to {
    background-color: rgba(238, 238, 238, 0.28);
  }
`

const ImageWrapper = styled(NextImage)<ImageProps>`
	width: ${({ width = '100%' }) => width};
	height: ${({ height = '100%' }) => height};
`

const StyledNextImage = styled(NextImage)<ImageProps>`
	background-color: transparent;
	animation: ${pulseKeyframe} 0.5s infinite ease-in-out alternate;
`

const Image: FC<ImageProps> = ({ alt, src, fill, height, sizes, style, width }) => {
	if (!src) {
		return (
			<ImageWrapper
				alt={alt}
				width={width}
				height={height}
				src=''
			/>
		)
	}

	return (
		<StyledNextImage
			alt={alt}
			src={src}
			width={width}
			height={height}
			sizes={sizes}
			style={style}
			fill={fill}
		/>
	)
}

export default Image
