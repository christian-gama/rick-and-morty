'use client'
import { Filter } from '../Filter'
import { Link } from '../Link'
import { Search } from '../Search'
import { Up } from '../Up'

import { FilterIcon, HeartIcon, LeftArrowIcon } from '@/core/icon'
import { isSSR } from '@/core/lib'
import { useFilter } from '@/core/store'
import type { Theme } from '@/core/theme'
import { useLike } from '@/likes/store'
import { useRouter } from 'next/router'
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
	margin-right: 2rem; // because of the Back button
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

const Back = styled(LeftArrowIcon)`
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

const ActionsContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
`

type ContentLayoutProps = PropsWithChildren<{
	title: string
	InputProps?: ComponentProps<typeof Search>
}>

const ContentLayout: FC<ContentLayoutProps> = ({ title, InputProps, children }) => {
	const open = useFilter((state) => state.open)
	const clear = useFilter((state) => state.clear)
	const characterIds = useLike((state) => state.characterIds, shallow)
	const [hasLikes, setHasLikes] = useState(false)
	const { push } = useRouter()

	useEffect(() => {
		if (isSSR()) return

		setHasLikes(characterIds.length > 0)
	}, [characterIds])

	useEffect(() => {
		clear()

		return () => {
			clear()
		}
	}, [])

	return (
		<StyledContentLayout>
			<Filter />

			<Header>
				<ActionsContainer>
					<Filtering onClick={open} />
					<Back
						onClick={() => push('/')}
						title='Go back'
					/>
				</ActionsContainer>

				<Title>{title}</Title>

				<Link href={hasLikes ? '/liked' : '#'}>
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
