import { Context } from "../../App"
import { useState, useEffect, useContext, useCallback } from "react"
import { Box, Button, Container, Stack, TextField } from "@mui/material"

export default function UserSettings() {
  //   Wallet
  const [connected, toggleConnect] = useState(false)
  const [currAddress, updateAddress] = useState(
    "0x9068cF148800d75f68a0F6C4449B405a98786E32"
  )
  const getAddress = useCallback(async () => {
    const ethers = require("ethers")
    const provider = await new ethers.providers.Web3Provider(window.ethereum)
    const signer = await provider.getSigner(currAddress)
    const addr = await signer.getAddress()
    updateAddress(addr)
  }, [currAddress])

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
        .then(() => {
          console.log("Getting Wallet Address.....")
          getAddress()
        })
    } catch (error) {
      console.log("Error occured while connecting wallet: ", error.message)
    }
  }

  // Importing userInfo through useContext
  const { userInfo } = useContext(Context)

  // State Variables
  const [fullName, setFullName] = useState(userInfo.name)
  const [email, setEmail] = useState(userInfo.email)
  const [username, setUsername] = useState(userInfo.username)
  const [openAiSecret, setOpenAiSecret] = useState(userInfo.secret)
  const [organizationId, setOrganizationId] = useState(userInfo.org_id)

  useEffect(() => {
    if (window.ethereum === undefined) return
    let val = window.ethereum.isConnected()
    if (val) {
      console.log("calling getAddress")
      getAddress()
      toggleConnect(val)
    }

    window.ethereum.on("accountsChanged", function (accounts) {
      console.log("Wallet acccount changed.....")
    })
  }, [getAddress])

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
          <Box component='form' sx={{ marginY: 4 }}>
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
                  {connected ? "Connected" : "Connect Wallet"}
                </Button>
                <br></br>
                {/* <h6
                  style={{
                    color: "black",
                    marginTop: 12,
                  }}
                >
                  {currAddress !== "0x9068cF148800d75f68a0F6C4449B405a98786E32"
                    ? "Connected to"
                    : "Not Connected. Please login to view NFTs"}{" "}
                  {currAddress !== "0x9068cF148800d75f68a0F6C4449B405a98786E32"
                    ? currAddress.substring(0, 15) + "..."
                    : ""}{" "}
                </h6> */}
              </Box>
            </Stack>

            <Box sx={{ textAlign: "end", marginTop: 2 }}>
              <Button variant='contained' sx={{ textAlign: "end" }}>
                Save
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Container>
  )
}
