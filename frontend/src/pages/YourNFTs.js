import axios from "axios"
import { useState } from "react"
import Grid from "@mui/material/Grid"
import Card from "../components/Card"
import { useParams } from "react-router-dom"
import { Box, Container } from "@mui/material"
import MarketplaceJSON from "../Marketplace.json"

export default function YourNFTs() {
  const [data, updateData] = useState([])
  const [dataFetched, updateFetched] = useState(false)
  const [address, updateAddress] = useState("0x")
  const [totalPrice, updateTotalPrice] = useState("0")

  async function getNFTData(tokenId) {
    const ethers = require("ethers")
    let sumPrice = 0
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const addr = await signer.getAddress()

    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    )

    //create an NFT Token
    let transaction = await contract.getMyNFTs()

    /*
     * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
     * and creates an object of information that is to be displayed
     */

    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId)
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
        sumPrice += Number(price)
        return item
      })
    )

    updateData(items)
    updateFetched(true)
    updateAddress(addr)
    updateTotalPrice(sumPrice.toPrecision(3))
  }

  const params = useParams()
  const tokenId = params.tokenId
  if (!dataFetched) getNFTData(tokenId)

  return (
    <Container>
      <Box sx={{ marginTop: 10, marginBottom: 5 }}>
        <h1 style={{ marginBottom: 5 }}>Your NFTS</h1>
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
