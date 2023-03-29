import { Theme } from '@/theme'
import styled, { css } from 'styled-components'

const Layout = styled.div`
	min-height: 100vh;
	background-image: ${({ theme }: { theme: Theme }) => css`
    url(/stars.png),
    linear-gradient(${theme.color.primary[800]} 17%, ${theme.color.secondary[500]});
  `};
`
export default Layout
