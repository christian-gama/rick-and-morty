import { isSSR } from '../lib'

import { Pagination } from '@/core/dto'
import { debounce } from 'lodash'
import { useEffect } from 'react'
import { InfiniteData, useInfiniteQuery } from 'react-query'

type ListProps<Output> = {
	fetch: (page: number) => Promise<Pagination<Output>>

	queryKey: string

	debounceTime?: number

	initialData?: InfiniteData<Pagination<Output>>
}

export const useList = <Output>({
	initialData,
	queryKey,
	debounceTime = 100,
	fetch,
}: ListProps<Output>) => {
	const { episodes, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
		Pagination<Output>
	>(queryKey, ({ pageParam = 1 }) => fetch(pageParam), {
		getNextPageParam: (lastPage) => {
			if (lastPage.info?.next) {
				return lastPage.info.next.match(/page=(\d+)/)?.[1]
			}
		},
		staleTime: Infinity,
		keepPreviousData: true,
		initialData,
	})

	const isLoading = !episodes && !isFetchingNextPage

	useEffect(() => {
		if (isSSR()) return

		const onScroll = debounce(() => {
			console.log({ isLoading })
			if (!isLoading && hasNextPage) {
				fetchNextPage()
			}
		}, debounceTime)

		window.addEventListener('scroll', onScroll)
		return () => window.removeEventListener('scroll', onScroll)
	}, [isLoading, hasNextPage, fetchNextPage, debounceTime])

	return {
		data,
		isLoading,
		isFetchingNextPage,
	}
}
