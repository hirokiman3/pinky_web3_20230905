import Navbar from "./components/Navbar"
import SignUp from "./pages/auth/SignUp"
import SignIn from "./pages/auth/SignIn"
import { useSelector } from "react-redux"
import Prompt from "./pages/prompt/Prompt"
import Error404 from "./pages/errors/Error404"
import UserSettings from "./pages/user/Settings"
import GeneratedNfts from "./pages/user/GeneratedNfts"
import { createContext, useState, useEffect } from "react"
import { Outlet, createBrowserRouter } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"

// Handle React Router DOM
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, path: "/prompt", element: <Prompt /> },
      {
        path: "user/settings",
        element: <UserSettings />,
      },
      {
        path: "user/nfts",
        element: <GeneratedNfts />,
      },
    ],
    errorElement: <Error404 />,
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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme")
    return storedTheme ? JSON.parse(storedTheme) : true
  })

  useEffect(() => {
    const body = document.querySelector("body")
    if (isDarkMode) {
      body.classList.add("dark-mode")
    } else {
      body.classList.remove("dark-mode")
    }
    localStorage.setItem("theme", JSON.stringify(isDarkMode))
  }, [isDarkMode])

  // Handle Authentication
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  // Custom Theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#F25672",
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
