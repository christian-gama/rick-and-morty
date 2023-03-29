export const isSSR = () =>
	typeof document === 'undefined' ||
	typeof window === 'undefined' ||
	typeof window.matchMedia === 'undefined'
