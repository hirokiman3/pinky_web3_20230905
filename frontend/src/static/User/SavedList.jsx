import Navbar from "../../components/Navbar"
import { Container, Box, ImageList, ImageListItem } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { listMyNfts } from "../../actions/nftActions"
import React, { useContext, useEffect, useState } from "react"
import { uploadJSONToIPFS } from "../../pinata"
import Marketplace from "../../Marketplace.json"
import Button from "@mui/material/Button"
import { Context } from "../../App"
import axios from "axios"
import { toast } from "react-toastify"

function SavedList() {
  const { isWalletConnected } = useContext(Context)

  const dispatch = useDispatch()
  const [tx, setTx] = useState("")

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const myNftList = useSelector((state) => state.myNftList)
  const { loading, error, nfts } = myNftList
  const ethers = require("ethers")

  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  //This function uploads the metadata to IPFS
  const uploadMetadataToIPFS = async () => {
    console.log(name + " - " + description + " - " + price + " - " + image)
    //Make sure that none of the fields are empty
    if (!name || !description || !price || !image) {
      toast.warn("Please fill all the fields!")
      return -1
    }

    const nftJSON = {
      name,
      description,
      price,
      image: image,
      timestamp: Date.now(),
    }

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON)
      if (response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response)

        return response.pinataURL
      }
    } catch (e) {
      console.log("error uploading JSON metadata:", e)
    }
  }

  const deleteNft = async (id) => {
    const { data } = await axios.delete(`/api/nft/${id}`)
    if (data.nft) {
      window.location.reload()
    } else {
      toast.error(data.message)
    }
  }

  const listNFT = async () => {
    //Upload data to IPFS
    try {
      const metadataURL = await uploadMetadataToIPFS()
      if (metadataURL === -1) return
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = await new ethers.providers.Web3Provider(window.ethereum)
      const signer = await provider.getSigner()

      toast.info("Uploading NFT(takes 5 mins).. please dont click anything!")

      //Pull the deployed contract instance
      let contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      )

      //massage the params to be sent to the create NFT request
      const pricee = ethers.utils.parseUnits(price, "ether")
      let listingPrice = await contract.getListPrice()
      listingPrice = listingPrice.toString()

      // actually create the NFT
      let transaction = await contract.createToken(metadataURL, pricee, {
        value: listingPrice,
      })
      await transaction.wait()
      setTx(transaction.hash)
      toast.success("Successfully listed your NFT!")
      deleteNft(id)
      localStorage.removeItem("newlyGeneratedNFT")
    } catch (e) {
      toast.error("Error occured while listing your NFT!")
    }
  }

  useEffect(() => {
    dispatch(listMyNfts({ seller: userInfo._id }))
  }, [dispatch, userInfo._id])

  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ marginTop: 10, marginBottom: 5 }}>
          <h2 className='text-4xl font-bold mb-1 text-pink-600 dark:text-pink-500'>
            Saved NFTs
          </h2>
          <h5 className='text-slate-800 dark:text-slate-200'>
            <strong>Your saved generated images displayed below</strong>
          </h5>
        </Box>
        <ImageList sx={{ width: "100%", height: "100%", paddingY: 2 }} cols={5}>
          {loading ? (
            <span>fetching...</span>
          ) : error ? (
            <span>{error}</span>
          ) : (
            nfts?.map((item) => (
              <ImageListItem key={item._id}>
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
                    src={item.path}
                    srcSet={item.path}
                    alt={item.desc}
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
                      {item.title}
                    </h4>
                    {/* <p>{item.desc}</p> */}
                    <h5 className='ml-1.5 mt-1 text-slate-600 dark:text-slate-300'>
                      {item.price} MATIC
                    </h5>
                  </div>

                  <Button
                    disabled={!isWalletConnected}
                    fullWidth
                    variant='contained'
                    sx={{
                      mt: 2,
                      mb: 2,
                      backgroundColor: "#F25672",
                      color: "#fff !important",
                      "&:hover": { backgroundColor: "#C83B55" },
                    }}
                    onClick={(e) => {
                      setId(item._id)
                      setName(item.title)
                      setDescription(item.desc)
                      setPrice(item.price)
                      setImage(item.path)
                      listNFT()
                    }}
                  >
                    {isWalletConnected ? "Mint" : "Connect Wallet"}
                  </Button>

                  {tx ? (
                    <a
                      href={`https://mumbai.polygonscan.com/tx/${tx}`}
                      target='_blank'
                      rel='noreferrer'
                    >
                      view on polygon scan
                    </a>
                  ) : (
                    <></>
                  )}
                </Box>
              </ImageListItem>
            ))
          )}
        </ImageList>
      </Container>
    </>
  )
}

export default SavedList
