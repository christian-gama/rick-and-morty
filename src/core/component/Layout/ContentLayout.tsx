'use client'
import { Filter } from '../Filter'
import { Link } from '../Link'
import { Search } from '../Search'
import { Up } from '../Up'

import { FilterIcon, HeartIcon } from '@/core/icon'
import { isSSR } from '@/core/lib'
import { useFilter } from '@/core/store'
import type { Theme } from '@/core/theme'
import { useLike } from '@/likes/store'
import { ComponentProps, FC, PropsWithChildren, useEffect, useState } from 'react'
import styled from 'styled-components'
import { shallow } from 'zustand/shallow'

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
	opacity: 0.8;
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
	InputProps?: ComponentProps<typeof Search>
}>

const ContentLayout: FC<ContentLayoutProps> = ({ title, InputProps, children }) => {
	const open = useFilter((state) => state.open)
	const characterIds = useLike((state) => state.characterIds, shallow)
	const [hasLikes, setHasLikes] = useState(false)

	useEffect(() => {
		if (isSSR()) return

		setHasLikes(characterIds.length > 0)
	}, [characterIds])

	return (
		<StyledContentLayout>
			<Filter />

			<Header>
				<Filtering onClick={open} />
				<Title>{title}</Title>

				<Link href='/liked'>
					<Liked isLiked={hasLikes} />
				</Link>
			</Header>

			<InputContainer>{InputProps && <Search {...InputProps} />}</InputContainer>

			{children}

			<Up />
		</StyledContentLayout>
	)
}

export default ContentLayout
