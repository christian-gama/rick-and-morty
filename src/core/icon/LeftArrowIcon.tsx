import { FC, HTMLAttributes } from 'react'

const LeftArrowIcon: FC<HTMLAttributes<HTMLOrSVGElement>> = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth={1.5}
			stroke='currentColor'
			width={24}
			height={24}
			{...props}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
			/>
		</svg>
	)
}

export default LeftArrowIcon
