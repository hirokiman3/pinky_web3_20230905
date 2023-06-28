import axios from "axios"
import { Context } from "../../App"
import { Link } from "react-router-dom"
import Navbar from "../../components/Navbar"
import { useState, useContext } from "react"
import { GetIpfsUrlFromPinata } from "../../utils"
import MarketplaceJSON from "../../Marketplace.json"
import { Container, Box, ImageList, ImageListItem } from "@mui/material"

export default function Marketplace() {
  const [data, updateData] = useState([])
  const [dataFetched, updateFetched] = useState(false)
  const { isWalletConnected } = useContext(Context)

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
        tokenURI = GetIpfsUrlFromPinata(tokenURI)
        let meta = await axios.get(tokenURI)
        meta = meta.data

        let price = ethers.utils.formatUnits(i.price.toString(), "ether")
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
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

  if (!dataFetched && isWalletConnected) getAllNFTs()

  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ marginTop: 10, marginBottom: 5 }}>
          <h2 className='text-4xl font-bold mb-1 text-pink-600 dark:text-pink-500'>
            PINKY NFTs
          </h2>
          <h5 className='text-slate-800 dark:text-slate-200'>
            See how other creators created their art works.
          </h5>
        </Box>
        {isWalletConnected ? (
          <ImageList
            sx={{ width: "100%", height: "100%", paddingY: 2 }}
            cols={5}
          >
            {data.map((item, index) => {
              const IPFSUrl = GetIpfsUrlFromPinata(item.image)
              return (
                <Link to={`/nft/${item.tokenId}`} key={index}>
                  <ImageListItem key={index}>
                    <Box
                      key={index}
                      className='nft-card'
                      sx={{
                        overflow: "hidden",
                        minHeight: "200px",
                        borderRadius: "4px",
                        transition: "200ms",
                        cursor: "pointer",
                        margin: 1,
                        "&:hover": {
                          // boxShadow: "0px 6px 8px rgba(236, 72, 153, 0.6)",
                          transform: "translateY(-10px)",
                        },
                      }}
                    >
                      <img
                        crossOrigin='anonymous'
                        src={IPFSUrl}
                        srcSet={IPFSUrl}
                        alt={item.name}
                        loading='lazy'
                        className='h-[300px] md:h-[200px]'
                        style={{
                          width: "100%",
                          objectFit: "cover",
                          overflow: "hidden",
                          borderRadius: "4px",
                          margin: 0,
                          pointerEvents: "none",
                        }}
                      />
                      <div className='my-4'>
                        <h4 className='ml-1.5 mt-3 font-bold text-[17px] dark:text-slate-200 text uppercase truncate lg:max-w-[200px]'>
                          {item.name}
                        </h4>
                        <h5 className='ml-1.5 mt-1 text-slate-600 dark:text-slate-300'>
                          {item.price} MATIC
                        </h5>
                      </div>
                    </Box>
                  </ImageListItem>
                </Link>
              )
            })}
          </ImageList>
        ) : (
          <span>Connect Your Wallet to explore marketplace.</span>
        )}
      </Container>
    </>
  )
}
