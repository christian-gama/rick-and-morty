import { theme } from '@/core/theme'
import { Children, useCallback, useEffect, useId, useRef, useState } from 'react'
import Select, { ActionMeta, components, createFilter, SingleValue } from 'react-select'
import { Virtuoso } from 'react-virtuoso'

export type SelectOption = {
	label: string
	value: string
}

type SelectGroupedOption = {
	label: string
	options: SelectOption[]
}

type SelectFieldProps = {
	options: Array<SelectOption | SelectGroupedOption>
	value: string | null
	loading?: boolean
	name?: string
	onChange: (value: SingleValue<SelectOption>, actionMeta?: ActionMeta<SelectOption>) => void
	isClearable?: boolean
	fetchNextPage?: () => void
	hasNextPage?: boolean
}

const Search = ({
	options,
	name,
	onChange,
	loading,
	value,
	isClearable,
	fetchNextPage,
	hasNextPage,
}: SelectFieldProps) => {
	const selectId = useId()
	const [selectedOption, setSelectedOption] = useState<SingleValue<SelectOption>>(null)
	const ref = useRef(null)

	useEffect(() => {
		options.forEach((option) => {
			if ('options' in option) {
				option.options.forEach((subOption) => {
					if (subOption.value === value) {
						setSelectedOption(subOption)
					}
				})
			} else {
				if (option.value === value) {
					setSelectedOption(option)
				}
			}
		})
	}, [options, value])

	const handleChange = useCallback(
		(selectedOption: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => {
			setSelectedOption(selectedOption)
			onChange(selectedOption, actionMeta)
		},
		[onChange],
	)

	return (
		<Select
			ref={ref}
			name={name}
			value={selectedOption}
			id={selectId}
			instanceId={selectId}
			options={options}
			styles={{
				container: (provided) => ({
					...provided,
					width: '100%',
				}),
			}}
			onChange={(selectedOption, actionMeta) => handleChange(selectedOption, actionMeta)}
			isLoading={loading}
			isClearable={isClearable}
			placeholder='Search...'
			tabSelectsValue
			components={{
				Option: (provided) =>
					components.Option({
						...provided,
						innerProps: {
							...provided.innerProps,
							style: {
								...provided.innerProps.style,
								display: 'flex',
								alignItems: 'center',
								paddingLeft: '0.625rem',
								paddingRight: '0.625rem',
								fontSize: '1rem',
								fontFamily: theme.font.openSans,
								color: theme.color.primary[800],
								backgroundColor: provided.isFocused
									? theme.color.secondary[100]
									: provided.isSelected
									? theme.color.secondary[50]
									: 'transparent',
								height: '36px',
							},
						},
					}),

				Menu: (provided) =>
					components.Menu({
						...provided,
						innerProps: {
							...provided.innerProps,
							style: {
								...provided.innerProps.style,
								overflow: 'hidden',
							},
						},
					}),

				MenuList: ({ children, maxHeight }) => {
					const childrens = Children.toArray(children)

					return (
						<Virtuoso
							style={{
								maxHeight,
								height: childrens.length * 36,
							}}
							totalCount={childrens.length}
							itemContent={(index) => childrens[index]}
							initialItemCount={childrens.length > 10 ? 10 : childrens.length}
							atBottomStateChange={(atBottom) => {
								if (atBottom && hasNextPage && fetchNextPage) {
									fetchNextPage()
								}
							}}
						/>
					)
				},
			}}
			backspaceRemovesValue={false}
			filterOption={createFilter({
				ignoreAccents: false,
				trim: true,
				ignoreCase: true,
				matchFrom: 'any',
			})}
		/>
	)
}

Search.defaultProps = {
	isClearable: true,
}

export default Search
