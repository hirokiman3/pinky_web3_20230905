import Home from "./static/Home/Home"
import Nft from "./static/Preview/Nft"
import SignIn from "./pages/auth/SignIn"
import SignUp from "./pages/auth/SignUp"
import { useSelector } from "react-redux"
import Marketplace from "./static/Preview/Marketplace"
import Settings from "./static/User/Settings"
import Error404 from "./pages/errors/Error404"
import MintNft from "./static/Preview/MintNft"
import YourNfts from "./static/User/YourNfts"
import { createContext, useState, useEffect } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import SavedList from "./static/User/SavedList"

// Context
export const Context = createContext()

function App() {
  // Handle theme mode
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  )

  const [isWalletConnected, setIsWalletConnected] = useState(false)

  const [currentAddress, setCurrentAddress] = useState((addr) => {
    const storedCurrentAddress = localStorage.getItem("walletAddress")
    return storedCurrentAddress ? storedCurrentAddress : addr
  })


  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light")
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
      document.documentElement.classList.remove("bright")
    } else {
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("bright")
    }

    localStorage.setItem("walletAddress", currentAddress ? currentAddress : "")

    if (currentAddress) {
      setIsWalletConnected(true)
    } else {
      setIsWalletConnected(false)
    }
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
            <Route path='/marketplace' element={<Marketplace />} />
            <Route path='/your-nfts' element={<YourNfts />} />
            <Route path='/saved-nfts' element={<SavedList />} />
            <Route path='/nft/:tokenId' element={<Nft />} />
            <Route path='/mint-nft' element={<MintNft />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route index path='/' element={<Home />} />
            <Route path='*' exact element={<Error404 />} />
          </Routes>
        </ThemeProvider>
      </Context.Provider>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </Router>
  )
}
export default App
