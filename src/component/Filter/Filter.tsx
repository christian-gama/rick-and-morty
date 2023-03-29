import { Backdrop } from '../Backdrop'

import { XMarkIcon } from '@/icon'
import { useFilter } from '@/store'
import type { Theme } from '@/theme'
import { FC, PropsWithChildren } from 'react'
import styled from 'styled-components'

const StyledFilter = styled.div<{ isOpen: boolean }>`
	display: flex;
	flex-direction: column;
	padding: 1rem;
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
	transition: transform 0.1s ease-in-out;
	transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
	z-index: 99999;
	background-color: ${({ theme }: { theme: Theme }) => theme.color.primary[900]};
	width: 15rem;
	box-shadow: 4px 0 6px rgba(0, 0, 0, 0.25);
`

const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.25rem;
`

const Title = styled.h2`
	font-size: 1rem;
	color: white;
	font-weight: 600;
	opacity: 0.95;
`

const ClearButton = styled.button`
	background-color: ${({ theme }: { theme: Theme }) => theme.color.secondary[400]};
	border: none;
	color: ${({ theme }: { theme: Theme }) => theme.color.primary[900]};
	cursor: pointer;
	font-size: 1rem;
	padding: 0.625rem 1.25rem;
	width: 100%;
	border-radius: 0.25rem;
	margin-top: 2.5rem;
`

const CloseIcon = styled(XMarkIcon)`
	fill: white;
	color: white;
	opacity: 0.95;
	cursor: pointer;
	width: 1.5rem;
	height: 1.5rem;
`

type FilterProps = PropsWithChildren<{
	onClear: () => void
}>

const Filter: FC<FilterProps> = ({ children, onClear }) => {
	const { close, isOpen } = useFilter((state) => ({
		close: state.close,
		isOpen: state.isOpen,
	}))

	return (
		<Backdrop isOpen={isOpen}>
			<StyledFilter isOpen={isOpen}>
				<Header>
					<Title>Filters</Title>
					<CloseIcon onClick={close} />
				</Header>

				{children}

				<ClearButton onClick={onClear}>Clear</ClearButton>
			</StyledFilter>
		</Backdrop>
	)
}

export default Filter
