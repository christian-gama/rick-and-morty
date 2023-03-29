import { theme } from '@/theme'
import type { PropsWithChildren } from 'react'
import { ThemeProvider } from 'styled-components'

export const AllProviders = ({ children }: PropsWithChildren) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
