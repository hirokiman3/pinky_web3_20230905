import { useState } from 'react'
import Navbar from './components/Navbar'
import Landing from './pages/landing/Landing'

function App() {
	const [isDarkMode, setIsDarkMode] = useState(true)
	return (
		<>
			<Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
			<Landing isDarkMode={isDarkMode} />
		</>
	)
}

export default App
