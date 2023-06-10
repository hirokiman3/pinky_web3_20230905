import { Context } from "../../App"
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useContext, useCallback } from "react"
import { Box, Button, Container, Stack, TextField } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { updateUserProfile, detailsUser } from "../../actions/userActions"
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants"

export default function UserSettings() {
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
    <Container maxWidth='md'>
      <Box
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          width: "100%",
          marginTop: 5,
          paddingBottom: 10,
        }}
      >
        <Container sx={{ paddingTop: 2 }}>
          <Box>
            <h3 style={{ margin: 0, color: "rgba(0, 0, 0, 0.8)" }}>
              Account Settings
            </h3>
          </Box>
          <Box component='form' sx={{ marginY: 4 }} onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                required
                type='text'
                label='Full name'
                value={fullName}
                onChange={(event) => {
                  setFullName(event.target.value)
                }}
              />
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 1 }}
              >
                <TextField
                  fullWidth
                  required
                  type='email'
                  label='Email'
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                  }}
                />
                <TextField
                  fullWidth
                  required
                  label='Username'
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value)
                  }}
                />
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 1 }}
              >
                <TextField
                  fullWidth
                  required
                  label='Password'
                  type='password'
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value)
                  }}
                />
                <TextField
                  fullWidth
                  required
                  type='password'
                  label='Confirm Password'
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value)
                  }}
                />
              </Stack>

              <h5
                style={{
                  margin: 0,
                  marginTop: 20,
                  color: "rgba(0, 0, 0, 0.8)",
                  fontWeight: 500,
                }}
              >
                API Settings
              </h5>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 1 }}
              >
                <TextField
                  fullWidth
                  required
                  type='text'
                  label='Open AI Secret'
                  value={openAiSecret}
                  onChange={(event) => {
                    setOpenAiSecret(event.target.value)
                  }}
                />
                <TextField
                  fullWidth
                  required
                  label='Organisation ID'
                  value={organizationId}
                  onChange={(event) => {
                    setOrganizationId(event.target.value)
                  }}
                />
              </Stack>
              <Box sx={{ textAlign: "end", marginTop: 2 }}>
                <Button
                  type='submit'
                  variant='contained'
                  sx={{ textAlign: "end" }}
                >
                  Updated Profile
                </Button>
              </Box>
            </Stack>
          </Box>

          <hr></hr>
          <h5
            style={{
              margin: 0,
              marginTop: 20,
              color: "rgba(0, 0, 0, 0.8)",
              fontWeight: 500,
            }}
          >
            Wallet Settings
          </h5>
          <Box>
            <Button variant='contained' onClick={() => connectWebsite()}>
              {isWalletConnected ? "Connected" : "Connect Wallet"}
            </Button>
            <br></br>
            <h6
              style={{
                color: "black",
                marginTop: 12,
              }}
            >
              {currentAddress !== ""
                ? "Connected to"
                : "Not Connected. Please login to view NFTs"}{" "}
              {currentAddress !== ""
                ? currentAddress //currentAddress.substring(0, 15) + "..."
                : ""}{" "}
            </h6>
          </Box>
        </Container>
      </Box>
    </Container>
  )
}
