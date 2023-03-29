import { FC, PropsWithChildren } from 'react'
import styled from 'styled-components'

const StyledBackdrop = styled.div<BackdropProps>`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 9999;
	opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
	pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
	transition: opacity 0.1s ease-in-out;
`

type BackdropProps = PropsWithChildren<{
	isOpen: boolean
}>

const Backdrop: FC<BackdropProps> = ({ isOpen, children }) => {
	return (
		<StyledBackdrop
			isOpen={isOpen}
			aria-hidden={!isOpen}
			data-testid='backdrop'
		>
			{children}
		</StyledBackdrop>
	)
}

export default Backdrop
