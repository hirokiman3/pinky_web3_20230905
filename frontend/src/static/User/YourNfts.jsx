import axios from "axios"
import { Context } from "../../App"
import { Link, useParams } from "react-router-dom"
import Navbar from "../../components/Navbar"
import { useState, useContext } from "react"
import { GetIpfsUrlFromPinata } from "../../utils"
import MarketplaceJSON from "../../Marketplace.json"
import { Container, Box, ImageList, ImageListItem } from "@mui/material"

export default function YourNfts() {
  const [data, updateData] = useState([])
  const [dataFetched, updateFetched] = useState(false)

  const { isWalletConnected, setCurrentAddress } = useContext(Context)

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
    setCurrentAddress(addr)
    updateTotalPrice(sumPrice.toPrecision(3))
  }

  const params = useParams()
  const tokenId = params.tokenId
  if (!dataFetched && isWalletConnected) getNFTData(tokenId)

  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ marginTop: 10, marginBottom: 5 }}>
          <h2 className='text-4xl font-bold mb-1 text-pink-600 dark:text-pink-500'>
            Your NFTs
          </h2>
          <h5 className='text-slate-800 dark:text-slate-200'>
            <strong>Total Value {totalPrice} ETH</strong>
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
                <Link to={`/nft/${item.tokenId}`}>
                  <ImageListItem key={index}>
                    <Box
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
                        <h4 className='mt-3 font-bold text-[17px] dark:text-slate-200 text uppercase truncate lg:max-w-[200px]'>
                          {item.name}
                        </h4>
                        <h5 className='mt-1 text-slate-600 dark:text-slate-300'>
                          {item.price}
                        </h5>
                      </div>
                    </Box>
                  </ImageListItem>
                </Link>
              )
            })}
          </ImageList>
        ) : (
          <span>Connect Your Wallet to view you nfts.</span>
        )}
      </Container>
    </>
  )
}
