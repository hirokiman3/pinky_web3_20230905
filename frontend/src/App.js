import { createContext, useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Prompt from './pages/prompt/Prompt'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/SignIn'
import { useSelector } from 'react-redux'
import UserSettings from './pages/user/Settings'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Error404 from './pages/errors/Error404'
import GeneratedNfts from './pages/user/GeneratedNfts'


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
			{
				path: 'user/nfts',
				element: <GeneratedNfts />,
			},
		],
		errorElement: <Error404 />,
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
	const [isDarkMode, setIsDarkMode] = useState(() => {
		const storedTheme = localStorage.getItem('theme')
		return storedTheme ? JSON.parse(storedTheme) : true
	})

	useEffect(() => {
		const body = document.querySelector('body')
		if (isDarkMode) {
			body.classList.add('dark-mode')
		} else {
			body.classList.remove('dark-mode')
		}
		localStorage.setItem('theme', JSON.stringify(isDarkMode))
	}, [isDarkMode])

	// Handle Authentication
	const userSignin = useSelector(state => state.userSignin)
	const { userInfo } = userSignin

	// Custom Theme
	const theme = createTheme({
		palette: {
			primary: {
				main: '#F25672',
			},
		},
	})

	return (
		// Use context for passing props
		<Context.Provider value={{ isDarkMode, setIsDarkMode, userInfo }}>
			{/* Theme Provider is used to customize MUI Library's default theme */}
			<ThemeProvider theme={theme}>
				<Navbar />
				<Outlet />
			</ThemeProvider>
		</Context.Provider>
	)
}
export default App
