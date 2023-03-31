import { theme } from '@/core/theme'
import type { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'styled-components'

export const AllProviders = ({ children }: PropsWithChildren) => {
	return (
		<QueryClientProvider client={new QueryClient()}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</QueryClientProvider>
	)
}
