import React from 'react'
import Hero from './Hero'
import { useContext } from 'react'
import { Context } from '../../App'

function Landing() {
	const { isDarkMode } = useContext(Context)
	return (
		<>
			<Hero isDarkMode={isDarkMode} />
		</>
	)
}

export default Landing
