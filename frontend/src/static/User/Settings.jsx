import "./Style.css"

import { Context } from "../../App"
import Navbar from "../../components/Navbar"
import { useNavigate } from "react-router-dom"
import { Box, Button, Container, TextField } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useState, useContext } from "react"
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants"
import { updateUserProfile } from "../../actions/userActions"

export default function Settings() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isWalletConnected, currentAddress, setCurrentAddress } =
    useContext(Context)

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdateProfile

  // State Variables
  const [fullName, setFullName] = useState(userInfo.name)
  const [email, setEmail] = useState(userInfo.email)
  const [username, setUsername] = useState(userInfo.username)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [openAiSecret, setOpenAiSecret] = useState(userInfo.secret)
  const [organizationId, setOrganizationId] = useState(userInfo.org_id)

  const connectWebsite = async () => {
    try {
      const chainId = await window.ethereum.request({ method: "eth_chainId" })
      // 0xAA36A7
      if (chainId !== "0x13881") {
        //alert('Incorrect network! Switch your metamask network to Rinkeby');
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x13881" }],
        })
      }
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async () => {
          // getAddress()
          const ethers = require("ethers")
          const provider = await new ethers.providers.Web3Provider(
            window.ethereum
          )
          const signer = await provider.getSigner()
          const addr = await signer.getAddress()
          setCurrentAddress(addr)
        })
    } catch (error) {
      setCurrentAddress(null)
      console.log("Error occured while connecting wallet: ", error.message)
      navigate("/")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // dispatch update profile
    if (password !== confirmPassword) {
      alert("Password and Confirm Password Are Not Matched")
    } else {
      dispatch(
        updateUserProfile({
          userId: userInfo._id,
          fullName,
          username,
          email,
          password,
          organizationId,
          openAiSecret,
        })
      )
    }
  }

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET })
    }

    window.ethereum.on("accountsChanged", function (accounts) {
      console.log("Wallet acccount changed.....")
    })
  }, [dispatch, successUpdate])

  return (
    <>
      <Navbar />
      <Container
        maxWidth='md'
        sx={{ display: "grid", placeContent: "center", gap: 4 }}
        className='settings-container'
      >
        <h2 className='text-4xl text-center font-bold dark:text-gray-200'>
          Your Profile
        </h2>
        <Box component='form' onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='row-1'>
              <div className='mb-1'>
                <label
                  htmlFor='fullName'
                  className='block mb-[4px] font-medium dark:text-slate-200 tracking-wide'
                >
                  Full Name
                </label>
                <TextField
                  type='text'
                  fullWidth
                  id='fullName'
                  variant='outlined'
                  sx={{
                    "& .MuiInputBase-input": {
                      backgroundColor: "#fff",
                      borderRadius: 1,
                    },
                  }}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  size='small'
                />
              </div>

              <div className='mb-1'>
                <label
                  htmlFor='userName'
                  className='block mb-[4px] font-medium dark:text-slate-200 tracking-wide'
                >
                  Username
                </label>
                <TextField
                  type='text'
                  fullWidth
                  id='userName'
                  variant='outlined'
                  sx={{
                    "& .MuiInputBase-input": {
                      backgroundColor: "#fff",
                      borderRadius: 1,
                    },
                  }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  size='small'
                />
              </div>

              <div className=''>
                <label
                  htmlFor='orgId'
                  className='block mb-[4px] font-medium dark:text-slate-200 tracking-wide'
                >
                  Open AI Orgnisation ID
                </label>
                <TextField
                  type='text'
                  fullWidth
                  id='orgId'
                  variant='outlined'
                  sx={{
                    "& .MuiInputBase-input": {
                      backgroundColor: "#fff",
                      borderRadius: 1,
                    },
                  }}
                  value={organizationId}
                  onChange={(e) => setOrganizationId(e.target.value)}
                  size='small'
                />
              </div>
            </div>
            <div className='row-2'>
              <div className='mb-1'>
                <label
                  htmlFor='email'
                  className='block mb-[4px] font-medium dark:text-slate-200 tracking-wide'
                >
                  Email
                </label>
                <TextField
                  type='text'
                  fullWidth
                  id='email'
                  variant='outlined'
                  sx={{
                    "& .MuiInputBase-input": {
                      backgroundColor: "#fff",
                      borderRadius: 1,
                    },
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size='small'
                />
              </div>

              <div className='mb-1'>
                <label
                  htmlFor='openai'
                  className='block mb-[4px] font-medium dark:text-slate-200 tracking-wide'
                >
                  Open AI Secret
                </label>
                <TextField
                  type='text'
                  fullWidth
                  id='openai'
                  variant='outlined'
                  sx={{
                    "& .MuiInputBase-input": {
                      backgroundColor: "#fff",
                      borderRadius: 1,
                    },
                  }}
                  value={openAiSecret}
                  onChange={(e) => setOpenAiSecret(e.target.value)}
                  size='small'
                />
              </div>
              <div className='flex gap-1 mb-1'>
                <div className='mb-1 w-full'>
                  <label
                    htmlFor='pass'
                    className='block mb-[4px] font-medium dark:text-slate-200 tracking-wide'
                  >
                    Password
                  </label>
                  <TextField
                    type='text'
                    fullWidth
                    id='pass'
                    variant='outlined'
                    sx={{
                      "& .MuiInputBase-input": {
                        backgroundColor: "#fff",
                        borderRadius: 1,
                      },
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    size='small'
                  />
                </div>
                <div className='mb-1 w-full'>
                  <label
                    htmlFor='conPass'
                    className='block mb-[4px] font-medium dark:text-slate-200 tracking-wide'
                  >
                    Confirm Password
                  </label>
                  <TextField
                    type='text'
                    fullWidth
                    id='conPass'
                    variant='outlined'
                    sx={{
                      "& .MuiInputBase-input": {
                        backgroundColor: "#fff",
                        borderRadius: 1,
                      },
                    }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    size='small'
                  />
                </div>
              </div>
              <Button type='submit' variant='contained' fullWidth>
                Update Profile
              </Button>
              {loadingUpdate ? (
                <span>Upadating user...</span>
              ) : errorUpdate ? (
                <span>{errorUpdate}</span>
              ) : (
                <span></span>
              )}

              <h4 className='text-lg font-bold mt-6 mb-[4px] uppercase dark:text-gray-200'>
                Connect Your Wallet
              </h4>

              <Button
                variant='contained'
                disabled={isWalletConnected}
                onClick={() => connectWebsite()}
              >
                {isWalletConnected ? "Connected" : "Connect Wallet"}
              </Button>
            </div>
          </div>
        </Box>
      </Container>
    </>
  )
}
