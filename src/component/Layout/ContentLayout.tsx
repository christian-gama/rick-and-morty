import { Filter } from '../Filter'

import { FilterIcon, HeartIcon } from '@/icon'
import { useFilter } from '@/store'
import type { Theme } from '@/theme'
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

const Input = styled.input`
	width: 100%;
	font-size: 1rem;
	padding: 0.8rem 0.625rem;
	border: none;
	border-radius: 1rem;
	box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.25);
	color: ${({ theme }: { theme: Theme }) => theme.color.primary[800]};
	font-family: ${({ theme }: { theme: Theme }) => theme.font.openSans};
	transition: box-shadow 0.15s ease-in-out;

	&:focus {
		outline: none;
		box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.25),
			0 0 0 3px ${({ theme }: { theme: Theme }) => theme.color.secondary[300]};
	}

	&::placeholder {
		color: ${({ theme }: { theme: Theme }) => theme.color.primary[800]};
		opacity: 0.5;
		font-family: ${({ theme }: { theme: Theme }) => theme.font.openSans};
	}
`

type ContentLayoutProps = PropsWithChildren<{
	title: string
	FilterProps: ComponentProps<typeof Filter>
	InputProps: ComponentProps<typeof Input>
}>

const ContentLayout: FC<ContentLayoutProps> = ({ title, FilterProps, InputProps, children }) => {
	const open = useFilter((state) => state.open)

	return (
		<StyledContentLayout>
			<Filter {...FilterProps} />

			<Header>
				<Filtering onClick={open} />
				<Title>{title}</Title>
				<Liked />
			</Header>

			<InputContainer>
				<Input
					type='text'
					placeholder='Search...'
					{...InputProps}
				/>
			</InputContainer>

			{children}
		</StyledContentLayout>
	)
}

export default ContentLayout
