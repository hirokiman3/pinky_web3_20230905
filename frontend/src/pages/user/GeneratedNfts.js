import { Box, Container } from '@mui/material'
import { useEffect, useState } from 'react'
import NftGallery from '../../components/NftGallery'
import MarketplaceJSON from "../../Marketplace.json"
import { GetIpfsUrlFromPinata } from "../../utils"
import axios from "axios"

export default function GeneratedNfts() {
  // Fetch data
  const [data, updateData] = useState([])
  const [dataFetched, updateFetched] = useState(false)
  let isFromMyNfts = true

  const getAllNFTs = async () => {
    const ethers = require("ethers")
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
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
        console.log("getting this tokenUri", tokenURI)
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
        <h2 style={{ marginBottom: 5 }}>My Generated NFTS</h2>
        <p style={{ margin: 0 }} className='sub-description'>
          Explore and manage your collection of personally generated NFTs
        </p>
      </Box>
      <NftGallery nftsData={updateData} isFromMyNfts={isFromMyNfts} />
    </Container>
  )
}
