import { createContext, useState } from 'react'
import Navbar from './components/Navbar'
import Landing from './pages/landing/Landing'
import Prompt from './pages/prompt/Prompt'

import { Outlet, createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, element: <Landing /> },
			{ path: 'prompt', element: <Prompt /> },
		],
	},
])

// Context
export const Context = createContext()

function App() {
	const [isDarkMode, setIsDarkMode] = useState(false)
	const [isLogged, setIsLogged] = useState(true)

	return (
		<Context.Provider value={{ isDarkMode, isLogged }}>
			<Navbar
				isDarkMode={isDarkMode}
				setIsDarkMode={setIsDarkMode}
				isLogged={isLogged}
				setIsLogged={setIsLogged}
			/>
			<Outlet />
		</Context.Provider>
	)
}

export default App
