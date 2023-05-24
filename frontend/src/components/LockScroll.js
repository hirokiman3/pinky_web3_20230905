import { useEffect } from 'react'

const LockScroll = () => {
	useEffect(() => {
		const handleScroll = e => {
			e.preventDefault()
		}

		// Lock scroll on desktop
		window.addEventListener('wheel', handleScroll, { passive: false })

		// Lock scroll on mobile
		window.addEventListener('touchmove', handleScroll, { passive: false })

		// Clean up when the component is unmounted
		return () => {
			window.removeEventListener('wheel', handleScroll)
			window.removeEventListener('touchmove', handleScroll)
		}
	}, [])

	return null
}

export default LockScroll
