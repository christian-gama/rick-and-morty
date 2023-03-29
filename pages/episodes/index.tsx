import { ContentLayout } from '@/core/component/Layout'

const Episodes = () => {
	return (
		<ContentLayout
			title='Episodes'
			FilterProps={{ onClear: () => {} }}
			InputProps={{}}
		/>
	)
}

export default Episodes
