import Root from "./pages/root/Root"
import User from "./pages/user/User"
import YourNFTs from "./pages/YourNFTs"
import SignUp from "./pages/auth/SignUp"
import SignIn from "./pages/auth/SignIn"
import SingleNFT from "./pages/SingleNFT"
import { useSelector } from "react-redux"
import Error404 from "./pages/errors/Error404"
import UserSettings from "./pages/user/Settings"
import { createContext, useState, useEffect } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Context
export const Context = createContext()

function App() {
  // Handle theme mode
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

  // Custom MUI Theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#F25672",
      },
    },
  })

  return (
    <Router>
      {/* Use context for passing props */}
      <Context.Provider value={{ isDarkMode, setIsDarkMode, userInfo }}>
        {/* Theme Provider is used to customize MUI Library's default theme */}
        <ThemeProvider theme={theme}>
          <Routes>
            <Route index path='/' element={<Root />} />
            <Route path='/nft/:tokenId' element={<SingleNFT />} />
            <Route path='user' element={<User />}>
              <Route path='settings' exact element={<UserSettings />} />
              <Route path='nfts' exact element={<YourNFTs />} />
            </Route>

            {/* Login Handle */}
            <Route path='signup' element={<SignUp />} />
            <Route path='signin' element={<SignIn />} />

            {/* 404 Handle */}
            <Route path='*' exact element={<Error404 />} />
          </Routes>
        </ThemeProvider>
      </Context.Provider>
    </Router>
  )
}
export default App
