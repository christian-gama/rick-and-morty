import NextImage from 'next/image'
import type { ComponentProps, FC } from 'react'
import styled, { keyframes } from 'styled-components'

const pulseKeyframe = keyframes`
  from {
    background-color: rgba(222, 222, 222, 0.28);
  }

  to {
    background-color: rgba(238, 238, 238, 0.28);
  }
`

const ImageWrapper = styled(NextImage)`
	width: ${({ width = '100%' }) => width};
	height: ${({ height = '100%' }) => height};
`

const StyledNextImage = styled(NextImage)`
	background-color: transparent;
	animation: ${pulseKeyframe} 0.5s infinite ease-in-out alternate;
`

const Image: FC<ComponentProps<typeof NextImage>> = (props) => {
	if (!props.src) {
		return <ImageWrapper {...props} />
	}

	return <StyledNextImage {...props} />
}

export default Image
