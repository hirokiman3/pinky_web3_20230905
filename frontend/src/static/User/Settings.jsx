import { Context } from "../../App"
import Navbar from "../../components/Navbar"
import { useNavigate } from "react-router-dom"
import { Box, Button, Container } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import InputVariant1 from "../../components/ui/InputVariant1"
import React, { useEffect, useState, useContext } from "react"
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants"
import { updateUserProfile, detailsUser } from "../../actions/userActions"

export default function Settings() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo, isWalletConnected, currentAddress, setCurrentAddress } =
    useContext(Context)

  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

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
  const [password, setPassword] = useState(userInfo.username)
  const [confirmPassword, setConfirmPassword] = useState(userInfo.username)
  const [openAiSecret, setOpenAiSecret] = useState(userInfo.secret)
  const [organizationId, setOrganizationId] = useState(userInfo.org_id)

  const connectWebsite = async () => {
    try {
      const chainId = await window.ethereum.request({ method: "eth_chainId" })
      if (chainId !== "0xAA36A7") {
        //alert('Incorrect network! Switch your metamask network to Rinkeby');
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xAA36A7" }],
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
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET })
      dispatch(detailsUser(userInfo._id))
    } else {
      setFullName(user.name)
      setUsername(user.username)
      setEmail(user.email)
      setOrganizationId(user.org_id)
      setOpenAiSecret(user.secret)
    }

    window.ethereum.on("accountsChanged", function (accounts) {
      console.log("Wallet acccount changed.....")
    })
  }, [dispatch, userInfo._id, user])

  return (
    <>
      <Navbar />
      <h2 className='text-4xl text-center font-bold dark:text-gray-200 mb-8'>
        Your Profile
      </h2>
      <Container maxWidth='md'>
        <Box component='form' onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='row-1'>
              <InputVariant1
                label='Title'
                id='accountTitle'
                className='mb-1'
                value={fullName}
                onChange={(event) => {
                  setFullName(event.target.value)
                }}
              />
              <InputVariant1
                label='Username'
                id='accountUsername'
                className='mb-1'
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value)
                }}
              />
              <InputVariant1
                label='Your OpenAI Organization ID'
                value={organizationId}
                onChange={(event) => {
                  setOrganizationId(event.target.value)
                }}
              />
              <h4 className='text-lg font-bold mt-6 mb-[4px] uppercase dark:text-gray-200'>
                Connect Your Wallet
              </h4>
              <Button variant='contained' onClick={() => connectWebsite()}>
                {isWalletConnected ? "Connected" : "Connect Wallet"}
              </Button>
              <h6 className='mt-1 dark:text-gray-300 text-gray-500'>
                {currentAddress !== ""
                  ? "Connected to"
                  : "Not Connected. Please login to view NFTs"}{" "}
                {currentAddress !== ""
                  ? currentAddress //currentAddress.substring(0, 15) + "..."
                  : ""}
              </h6>
            </div>
            <div className='row-2'>
              <InputVariant1
                label='Email'
                id='accountEmail'
                className='mb-1'
                type='email'
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                }}
              />
              <InputVariant1
                label='Your OpenAI Secret Key'
                id='openAiKey'
                className='mb-1'
                value={openAiSecret}
                onChange={(event) => {
                  setOpenAiSecret(event.target.value)
                }}
              />
              <div className='flex gap-1 mb-2'>
                <InputVariant1
                  label='New Password'
                  placeholder='Password'
                  id='accountPass'
                  className='mb-1 w-full'
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value)
                  }}
                />
                <InputVariant1
                  label='Confirm Password'
                  placeholder='Confirm Password'
                  id='accountConfirmPass'
                  className='mb-1 w-full'
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value)
                  }}
                />
              </div>
              <Button type='submit' variant='contained' fullWidth>
                Update Profile
              </Button>
            </div>
          </div>
        </Box>
      </Container>
    </>
  )
}
