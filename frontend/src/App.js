import { createContext, useState } from 'react'
import Navbar from './components/Navbar'
import Prompt from './pages/prompt/Prompt'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/SignIn'
import { useSelector } from 'react-redux'
import UserSettings from './pages/auth/UserSettings'

// Handle React Router DOM
export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, element: <Prompt /> },
			{
				path: 'user/settings',
				element: <UserSettings />,
			},
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
	const [isDarkMode, setIsDarkMode] = useState(true)

	// Handle Authentication
	const userSignin = useSelector(state => state.userSignin)
	const { userInfo } = userSignin

	return (
		// Use context for passing props
		<Context.Provider value={{ isDarkMode, setIsDarkMode, userInfo }}>
			<Navbar />
			<Outlet />
		</Context.Provider>
	)
}
export default App
