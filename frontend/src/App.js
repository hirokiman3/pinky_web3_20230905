import { createContext, useState } from 'react'
import Navbar from './components/Navbar'
import Landing from './pages/landing/Landing'
import Prompt from './pages/prompt/Prompt'

import { Outlet, createBrowserRouter } from 'react-router-dom'
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/SignIn'
import { useSelector } from "react-redux"
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      { path: "prompt", element: <Prompt /> },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
])

// Context
export const Context = createContext()

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  return (
    <Context.Provider value={{ isDarkMode, userInfo }}>
      <Navbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        userInfo={userInfo}
      />
      <Outlet />
    </Context.Provider>
  )
}
export default App
