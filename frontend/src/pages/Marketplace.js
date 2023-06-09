import React from "react"
import axios from "axios"
import { useState } from "react"
import Grid from "@mui/material/Grid"
import Card from "../components/Card"
import { Box, Container } from "@mui/material"
import { GetIpfsUrlFromPinata } from "../utils"
import MarketplaceJSON from "../Marketplace.json"

function Marketplace() {
  const [data, updateData] = useState([])
  const [dataFetched, updateFetched] = useState(false)

  const getAllNFTs = async () => {
    const ethers = require("ethers")
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner(
      "0xc110fa91fc16ca2147dfcb5e209fec8efe424ea4"
    )
    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    )
    //create an NFT Token
    let transaction = await contract.getAllNFTs()

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(
      transaction.map(async (i) => {
        var tokenURI = await contract.tokenURI(i.tokenId)

        // console.log("getting this tokenUri", tokenURI)

        tokenURI = GetIpfsUrlFromPinata(tokenURI)
        let meta = await axios.get(tokenURI)
        meta = meta.data

        let price = ethers.utils.formatUnits(i.price.toString(), "ether")
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        }
        return item
      })
    )

    updateFetched(true)
    updateData(items)
  }

  if (!dataFetched) getAllNFTs()

  return (
    <Container>
      <Box sx={{ marginTop: 10, marginBottom: 5 }}>
        <h1 style={{ marginBottom: 5 }}>Marketplace</h1>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {data.map((item, index) => (
            <Grid item xs={12} sm={4} md={3} key={index}>
              <Card data={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default Marketplace
