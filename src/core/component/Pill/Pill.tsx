import styled from 'styled-components'

const StyledPill = styled.div<{ color: string }>`
	display: flex;
	align-items: center;
	padding: 0.25rem 0.625rem;
	background-color: ${({ color }) => color};
	border-radius: 1rem;
`

const Text = styled.p`
	font-size: 1rem;
	color: white;
	font-family: ${({ theme }) => theme.font.openSans};
	font-weight: 400;
`

type PillProps = {
	condition: 'alive' | 'dead' | 'unknown'
}

export const Pill = ({ condition }: PillProps) => {
	const colorMap = new Map([
		['alive', '#1D9C1A'],
		['dead', '#C30F0F'],
		['unknown', '#3D3D3D'],
	])

	return (
		<StyledPill color={colorMap.get(condition)!}>
			<Text>{condition}</Text>
		</StyledPill>
	)
}

export default Pill
