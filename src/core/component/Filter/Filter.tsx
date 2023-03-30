import { Backdrop } from '../Backdrop'
import { Search } from '../Search'

import { Character } from '@/characters/dto'
import { XMarkIcon } from '@/core/icon'
import { useFilter } from '@/core/store'
import type { Theme } from '@/core/theme'
import { FC } from 'react'
import styled from 'styled-components'

const StyledFilter = styled.div<{ isOpen: boolean }>`
	display: flex;
	flex-direction: column;
	padding: 1rem;
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
	transition: transform 0.1s ease-in-out;
	transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
	z-index: 99999;
	background-color: ${({ theme }: { theme: Theme }) => theme.color.primary[900]};
	width: 15rem;
	box-shadow: 4px 0 6px rgba(0, 0, 0, 0.25);
`

const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.25rem;
`

const Title = styled.h2`
	font-size: 1rem;
	color: white;
	font-weight: 600;
	opacity: 0.95;
`

const ClearButton = styled.button`
	background-color: ${({ theme }: { theme: Theme }) => theme.color.secondary[400]};
	border: none;
	color: ${({ theme }: { theme: Theme }) => theme.color.primary[900]};
	cursor: pointer;
	font-size: 1rem;
	padding: 0.625rem 1.25rem;
	width: 100%;
	border-radius: 0.25rem;
	margin-top: 2.5rem;
`

const CloseIcon = styled(XMarkIcon)`
	fill: white;
	color: white;
	opacity: 0.95;
	cursor: pointer;
	width: 1.5rem;
	height: 1.5rem;
	max-width: 1.5rem;
	max-height: 1.5rem;
`

const Label = styled.label`
	color: white;
	font-size: 0.8rem;
	margin-bottom: 0.5rem;
`

const InputBox = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 1.25rem;
`

const Filter: FC = () => {
	const { close, isOpen, clear, setGender, setSpecies, setStatus, values } = useFilter(
		(state) => state,
	)

	const status = [
		{ label: 'Alive', value: 'alive' },
		{ label: 'Dead', value: 'dead' },
		{ label: 'Unknown', value: 'unknown' },
	]

	const species = [
		{ label: 'Human', value: 'human' },
		{ label: 'Alien', value: 'alien' },
		{ label: 'Humanoid', value: 'humanoid' },
		{ label: 'Poopybutthole', value: 'poopybutthole' },
		{ label: 'Mythological', value: 'mythological' },
		{ label: 'Unknown', value: 'unknown' },
		{ label: 'Animal', value: 'animal' },
		{ label: 'Disease', value: 'disease' },
		{ label: 'Robot', value: 'robot' },
		{ label: 'Cronenberg', value: 'cronenberg' },
		{ label: 'Planet', value: 'planet' },
	]

	const genders = [
		{ label: 'Female', value: 'female' },
		{ label: 'Male', value: 'male' },
		{ label: 'Genderless', value: 'genderless' },
		{ label: 'Unknown', value: 'unknown' },
	]

	return (
		<Backdrop isOpen={isOpen}>
			<StyledFilter isOpen={isOpen}>
				<Header>
					<Title>Filters</Title>
					<CloseIcon onClick={close} />
				</Header>

				<InputBox>
					<Label>Status</Label>
					<Search
						onChange={(singleValue) => {
							setStatus(singleValue?.label as Character.Output['status'])
						}}
						value={values.status || null}
						options={status}
						name='status'
						isClearable
					/>
				</InputBox>

				<InputBox>
					<Label>Species</Label>
					<Search
						onChange={(singleValue) => {
							setSpecies(singleValue?.label as Character.Output['species'])
						}}
						value={values.species || null}
						options={species}
						name='species'
						isClearable
					/>
				</InputBox>

				<InputBox>
					<Label>Gender</Label>
					<Search
						onChange={(singleValue) => {
							setGender(singleValue?.label as Character.Output['gender'])
						}}
						value={values.gender || null}
						options={genders}
						name='gender'
						isClearable
					/>
				</InputBox>

				<ClearButton onClick={clear}>Clear</ClearButton>
			</StyledFilter>
		</Backdrop>
	)
}

export default Filter
