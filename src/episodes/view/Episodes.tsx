import { ContentLayout } from '@/core/component/Layout'
import { FC } from 'react'
import styled from 'styled-components'

const Layout = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
	grid-gap: 3rem;
	padding: 0.625rem;
	justify-items: center;

	@media (min-width: 768px) {
		padding: 1rem;
	}
`

const Episodes: FC = () => {
	return (
		<ContentLayout
			title='Episodes'
			FilterProps={{ onClear: () => {} }}
			InputProps={{}}
		>
			<Layout data-testid='episodes'></Layout>
		</ContentLayout>
	)
}

export default Episodes
