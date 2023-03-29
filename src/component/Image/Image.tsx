import NextImage from 'next/image'
import type { ComponentProps, FC } from 'react'
import styled, { css, keyframes } from 'styled-components'

interface ImageProps extends ComponentProps<typeof NextImage> {
	disableLoading?: boolean
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

	${({ disableLoading }) =>
		!disableLoading &&
		css`
			animation: ${pulseKeyframe} 0.5s infinite ease-in-out alternate;
		`}
`

const Image: FC<ImageProps> = (props) => {
	if (!props.src) {
		return <ImageWrapper {...props} />
	}

	return <StyledNextImage {...props} />
}

export default Image
