import Root from "./pages/root/Root"
import User from "./pages/user/User"
import SignIn from "./pages/auth/SignIn"
import SignUp from "./pages/auth/SignUp"
import { useSelector } from "react-redux"
import YourNFTs from "./pages/user/YourNFTs"
import SingleNFT from "./pages/user/SingleNFT"
import Error404 from "./pages/errors/Error404"
import UserSettings from "./pages/user/Settings"
import Marketplace from "./pages/user/Marketplace"
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

  const [isWalletConnected, setIsWalletConnected] = useState(false)

  const [currentAddress, setCurrentAddress] = useState((addr) => {
    const storedCurrentAddress = localStorage.getItem("walletAddress")
    return storedCurrentAddress ? JSON.parse(storedCurrentAddress) : addr
  })

  useEffect(() => {
    const body = document.querySelector("body")
    if (isDarkMode) {
      body.classList.add("dark-mode")
    } else {
      body.classList.remove("dark-mode")
    }
    localStorage.setItem("theme", JSON.stringify(isDarkMode))

    if (currentAddress) setIsWalletConnected(true)
    else setIsWalletConnected(false)

    localStorage.setItem("walletAddress", JSON.stringify(currentAddress))
  }, [isDarkMode, currentAddress])

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
      <Context.Provider
        value={{
          isDarkMode,
          setIsDarkMode,
          userInfo,
          isWalletConnected,
          currentAddress,
          setCurrentAddress,
        }}
      >
        {/* Theme Provider is used to customize MUI Library's default theme */}
        <ThemeProvider theme={theme}>
          <Routes>
            <Route index path='/' element={<Root />} />
            <Route path='user' element={<User />}>
              <Route path='settings' exact element={<UserSettings />} />
              <Route path='nfts' exact element={<YourNFTs />} />
              <Route path='nft/:tokenId' element={<SingleNFT />} />
              <Route path='marketplace' element={<Marketplace />} />
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
