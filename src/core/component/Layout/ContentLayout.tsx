import { Filter } from '../Filter'
import { Search } from '../Search'

import { FilterIcon, HeartIcon } from '@/core/icon'
import { useFilter } from '@/core/store'
import type { Theme } from '@/core/theme'
import type { ComponentProps, FC, PropsWithChildren } from 'react'
import styled from 'styled-components'

const StyledContentLayout = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	max-width: 80rem;
	padding: 1rem 0.625rem;

	@media (min-width: 768px) {
		padding: 2rem 1rem;
	}
`

const Title = styled.h1`
	font-size: 1.6rem;
	font-weight: 600;
	font-family: ${({ theme }: { theme: Theme }) => theme.font.openSans};
	margin-bottom: 0.5rem;
	color: white;
	opacity: 0.97;
	text-transform: uppercase;
`

const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

const Liked = styled(HeartIcon)`
	color: white;
	opacity: 0.65;
	width: 2rem;
	height: 2rem;
	transition: opacity 0.2s ease-in-out;

	&:hover {
		cursor: pointer;
		opacity: 0.95;
	}
`
const Filtering = styled(FilterIcon)`
	color: white;
	opacity: 0.65;
	width: 2rem;
	height: 2rem;
	transition: opacity 0.2s ease-in-out;

	&:hover {
		cursor: pointer;
		opacity: 0.95;
	}
`

const InputContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-bottom: 3rem;
	margin-top: 2rem;
`

type ContentLayoutProps = PropsWithChildren<{
	title: string
	InputProps: ComponentProps<typeof Search>
}>

const ContentLayout: FC<ContentLayoutProps> = ({ title, InputProps, children }) => {
	const open = useFilter((state) => state.open)

	return (
		<StyledContentLayout>
			<Filter />

			<Header>
				<Filtering onClick={open} />
				<Title>{title}</Title>
				<Liked />
			</Header>

			<InputContainer>
				<Search {...InputProps} />
			</InputContainer>

			{children}
		</StyledContentLayout>
	)
}

export default ContentLayout
