import { ArrowUpIcon } from '@/core/icon'
import { Theme } from '@/core/theme'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const StyledUp = styled.button`
	background-color: ${({ theme }: { theme: Theme }) => theme.color.primary[900]};
	border: none;
	border-radius: 50%;
	bottom: 1rem;
	color: white;
	cursor: pointer;
	display: flex;
	align-items: center;
	height: 3rem;
	justify-content: center;
	opacity: 0.85;
	position: fixed;
	right: 1rem;
	transition: opacity 0.2s ease-in-out;
	width: 3rem;
	transition: all 0.15s ease-in-out;

	&:hover {
		opacity: 1;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		transform: translateY(-1px);
	}
`

const Up = () => {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const toggleVisibility = () => {
			setIsVisible(window.pageYOffset > 300)
		}

		window.addEventListener('scroll', toggleVisibility)

		return () => window.removeEventListener('scroll', toggleVisibility)
	}, [])

	const handleClick = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		})
	}

	if (!isVisible) {
		return null
	}

	return (
		<StyledUp onClick={handleClick}>
			<ArrowUpIcon />
		</StyledUp>
	)
}

export default Up
