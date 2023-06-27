import axios from "axios"
import { Context } from "../../App"
import Navbar from "../../components/Navbar"
import { useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { Container } from "@mui/material"
import { GetIpfsUrlFromPinata } from "../../utils"
import MarketplaceJSON from "../../Marketplace.json"

export default function Nft(props) {
  const [data, updateData] = useState({})
  const [dataFetched, updateDataFetched] = useState(false)
  // const [message, updateMessage] = useState("")
  // const [currAddress, updateCurrAddress] = useState("0x")
  const { isWalletConnected } = useContext(Context)

  const getNFTData = async (tokenId) => {
    const ethers = require("ethers")
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    // const addr = await signer.getAddress()
    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    )

    //create an NFT Token

    var tokenURI = await contract.tokenURI(tokenId)
    const listedToken = await contract.getListedTokenForId(tokenId)
    tokenURI = GetIpfsUrlFromPinata(tokenURI)
    let meta = await axios.get(tokenURI)
    meta = meta.data
    console.log(listedToken)

    let item = {
      price: meta.price,
      tokenId: tokenId,
      seller: listedToken.seller,
      image: meta.image,
      name: meta.name,
      description: meta.description,
    }
    console.log(item)
    updateData(item)
    updateDataFetched(true)
    // console.log("address", addr)
    // updateCurrAddress(addr)
  }

  // const buyNFT = async (tokenId) => {
  //   try {
  //     const ethers = require("ethers")
  //     //After adding your Hardhat network to your metamask, this code will get providers and signers
  //     const provider = new ethers.providers.Web3Provider(window.ethereum)
  //     const signer = provider.getSigner()

  //     //Pull the deployed contract instance
  //     let contract = new ethers.Contract(
  //       MarketplaceJSON.address,
  //       MarketplaceJSON.abi,
  //       signer
  //     )
  //     const salePrice = ethers.utils.parseUnits(data.price, "ether")
  //     updateMessage("Buying the NFT... Please Wait (Upto 5 mins)")
  //     //run the executeSale function
  //     let transaction = await contract.executeSale(tokenId, {
  //       value: salePrice,
  //     })
  //     await transaction.wait()

  //     alert("You successfully bought the NFT!")
  //     updateMessage("")
  //   } catch (e) {
  //     alert("Upload Error" + e)
  //   }
  // }

  const params = useParams()
  const tokenId = params.tokenId
  if (!dataFetched && isWalletConnected) getNFTData(tokenId)
  if (typeof data.image == "string")
    data.image = GetIpfsUrlFromPinata(data.image)

  return (
    <>
      <Navbar />
      <Container>
        <div className='grid grid-cols-1 md:grid-cols-2 mt-10'>
          <div className='nft-preview mb-4 md:mb-inherit'>
            <div className='w-[20rem] h-[24rem] md:w-[24rem] max-md:mx-auto ms-auto'>
              <img
                src={
                  data.image ||
                  "https://pbs.twimg.com/media/Fnz8_pZaMAEo50e?format=jpg"
                }
                alt={data.name}
                className='w-full h-full object-cover rounded'
              />
            </div>
          </div>
          <hr className='w-[20rem] mx-auto md:mx-inherit md:me-auto mb-4 md:hidden md:mb-inherit' />
          <div className='nft-data'>
            <div className='w-[20rem] md:w-[28rem] mx-auto md:mx-inherit md:me-auto'>
              <div className='preview-data w-full flex justify-between items-center mt-2'>
                <h5 className='font-bold text-xl md:text-2xl dark:text-gray-200 mb-1'>
                  {data.name || "Rainbow Endevaour"}
                </h5>
              </div>
              <p className='dark:text-gray-300 text-gray-500'>
                {data.description ||
                  "Immerse yourself in the beauty of nature with this stunning NFT artwork."}
              </p>
              <div className='meta-data'>
                <div className='item mb-1'>
                  <h5 className='font-bold dark:text-gray-200 uppercase'>
                    Owner
                  </h5>
                  <p className='dark:text-gray-300 text-gray-500 break-words'>
                    {data.seller ||
                      "0x9068cF148800d75f68a0F6C4449B405a98786E32"}
                  </p>
                </div>
                <div className='item mb-1'>
                  <h5 className='font-bold dark:text-gray-200 uppercase'>
                    Price
                  </h5>
                  <p className='dark:text-gray-300 text-gray-500'>
                    {data.price || "0.004"} MATIC
                  </p>
                </div>
              </div>
              {/* {currAddress !== data.owner && currAddress !== data.seller ? (
                <Button
                  variant='contained'
                  className='w-full md:w-[12rem]'
                  onClick={() => buyNFT(tokenId)}
                >
                  Mint Now
                </Button>
              ) : (
                <div className='text-emerald-700'>
                  You are the owner of this NFT
                </div>
              )} */}
              {/* <div className='text-green text-center mt-3'>{message}</div> */}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
