import { useState } from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { useTheme, useMediaQuery, Box } from '@mui/material'
import './Style.css'
import PreviewModal from '../pages/prompt/PreviewModal'
import LockScroll from './LockScroll'
import { GetIpfsUrlFromPinata } from "../utils"
import axios from "axios"
import MarketplaceJSON from "../Marketplace.json"
import { useSelector } from "react-redux"
export default function NftGallery({ nftsData, isFromMyNfts }) {

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const sampleData = [
    {
      name: "NFT#1",
      description: "Alchemy's First NFT",
      website: "http://axieinfinity.io",
      image:
        "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
  ]
  const [data, updateData] = useState(sampleData)
  const [dataFetched, updateFetched] = useState(false)
  async function getAllNFTs() {
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

  if (!dataFetched && userInfo) getAllNFTs()

  // Make Image List Responsive
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only("xs"))
  const isSm = useMediaQuery(theme.breakpoints.only("sm"))
  const isMd = useMediaQuery(theme.breakpoints.only("md"))
  const isLg = useMediaQuery(theme.breakpoints.only("lg"))
  const isXl = useMediaQuery(theme.breakpoints.only("xl"))
  const getCols = () => {
    if (isXs) return 2
    if (isSm) return 3
    if (isMd) return 4
    if (isLg) return 5
    if (isXl) return 6
    return 2 // Default column configuration
  }

  // State variables
  const [previewOpen, setPreviewOpen] = useState(false)
  const [activeImage, setActiveImage] = useState({
    id: "",
    src: "",
    prompt: "",
    user: "",
    date: "",
  })
  const [imageLoaded, setImageLoaded] = useState(false)

  // Modal functions
  const handlePreview = (e, key) => {
    // Find the clicked item using the key
    const clickedItem = nftsData.find((item) => item.id === key)

    // Check if the clicked item exists
    if (clickedItem) {
      // Set the active image and open the preview
      setActiveImage({
        src: clickedItem.img,
        prompt: clickedItem.prompt,
        date: clickedItem.date,
        user: clickedItem.user,
      })
      setPreviewOpen(true)
    }
  }

  const handlePreviewClose = () => {
    setImageLoaded(false)
    setPreviewOpen(false)
  }

  return (
    <>
      {previewOpen && <LockScroll />}
      <ImageList
        sx={{ width: "100%", height: "100%", overflow: "hidden" }}
        cols={getCols()}
      >
        {isFromMyNfts
          ? data.map((item, index) => (
              <ImageListItem
                key={index}
                onClick={(e) => handlePreview(e, index)}
                sx={{
                  cursor: "pointer",
                  "& img": {
                    transition: "300ms",
                  },
                }}
              >
                <Box
                  className='nft-card'
                  sx={{
                    backgroundColor: "#fff",
                    overflow: "hidden",
                    minHeight: "200px",
                    padding: 1,
                    borderRadius: "10px",
                    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                    transition: "200ms",
                    "&:hover": {
                      transform: "rotate(2deg)",
                    },
                  }}
                >
                  <img
                    src={`${GetIpfsUrlFromPinata(
                      item.image
                    )}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${GetIpfsUrlFromPinata(
                      item.image
                    )}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading='lazy'
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      overflow: "hidden",
                      borderRadius: "10px",
                      margin: 0,
                      pointerEvents: "none",
                    }}
                  />
                  <h4 style={{ margin: "3px 0" }}>{item.name}</h4>
                </Box>
              </ImageListItem>
            ))
          : nftsData.map((item) => (
              <ImageListItem
                key={item.id}
                onClick={(e) => handlePreview(e, item.id)}
                sx={{
                  cursor: "pointer",
                  "& img": {
                    transition: "300ms",
                  },
                }}
              >
                <Box
                  className='nft-card'
                  sx={{
                    backgroundColor: "#fff",
                    overflow: "hidden",
                    minHeight: "200px",
                    padding: 1,
                    borderRadius: "10px",
                    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                    transition: "200ms",
                    "&:hover": {
                      transform: "rotate(2deg)",
                    },
                  }}
                >
                  <img
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading='lazy'
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      overflow: "hidden",
                      borderRadius: "10px",
                      margin: 0,
                      pointerEvents: "none",
                    }}
                  />
                  <h4 style={{ margin: "3px 0" }}>{item.title}</h4>
                </Box>
              </ImageListItem>
            ))}
      </ImageList>

      <PreviewModal
        previewOpen={previewOpen}
        handlePreviewClose={handlePreviewClose}
        activeImage={activeImage}
        imageLoaded={imageLoaded}
        setImageLoaded={setImageLoaded}
      />
    </>
  )
}
