import { createContext, useState } from 'react'
import Navbar from './components/Navbar'
import Landing from './pages/landing/Landing'
import Prompt from './pages/prompt/Prompt'

import { Outlet, createBrowserRouter } from 'react-router-dom'
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/SignIn'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, element: <Landing /> },
			{ path: 'prompt', element: <Prompt /> },
		],
	},
	{
		path: '/signup',
		element: <SignUp />,
	},
	{
		path: '/signin',
		element: <SignIn />,
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
serviceWorker.unregister()
export default App
