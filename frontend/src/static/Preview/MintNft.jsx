import { useState } from "react"
import { ethers } from "ethers"
import Navbar from "../../components/Navbar"
import { uploadJSONToIPFS } from "../../pinata"
import Marketplace from "../../Marketplace.json"
import { Link, useNavigate } from "react-router-dom"
import {
  Box,
  Container,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material"

export default function MintNft({ activeImage }) {
  const [formParams, updateFormParams] = useState({
    name: "",
    description: activeImage.prompt,
    price: "",
  })

  const navigate = useNavigate()

  //This function uploads the metadata to IPFS
  const uploadMetadataToIPFS = async () => {
    const { name, description, price } = formParams
    //Make sure that none of the fields are empty
    if (!name || !description || !price || !activeImage.src) {
      console.log("Please fill all the fields!")
      return -1
    }

    const nftJSON = {
      name,
      description,
      price,
      image: activeImage.src,
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

  const listNFT = async (e) => {
    e.preventDefault()

    //Upload data to IPFS
    try {
      const metadataURL = await uploadMetadataToIPFS()
      if (metadataURL === -1) return
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = await new ethers.providers.Web3Provider(window.ethereum)
      const signer = await provider.getSigner()

      console.log("Uploading NFT(takes 5 mins).. please dont click anything!")

      //Pull the deployed contract instance
      let contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      )

      //massage the params to be sent to the create NFT request
      const price = ethers.utils.parseUnits(formParams.price, "ether")
      let listingPrice = await contract.getListPrice()
      listingPrice = listingPrice.toString()

      //actually create the NFT
      let transaction = await contract.createToken(metadataURL, price, {
        value: listingPrice,
      })
      await transaction.wait()
      alert("Successfully listed your NFT!")

      localStorage.removeItem("newlyGeneratedNFT")
      activeImage = []
      updateFormParams({ name: "", description: "", price: "" })
      navigate("/nfts")
    } catch (e) {
      alert("Upload error" + e)
    }
  }

  return (
    <>
      <Navbar />
      <Container>
        <Box component='form' noValidate>
          <div className='grid grid-cols-1 md:grid-cols-2 mt-10'>
            <div className='nft-preview mb-4 md:mb-inherit'>
              <div className='w-[20rem] mx-auto'>
                <img
                  src={activeImage.src}
                  alt=''
                  className='w-full h-[20rem] object-cover'
                />
                <div className='preview-data w-full flex justify-between items-center mt-2'>
                  <h5 className='font-bold text-lg dark:text-slate-300'>
                    {formParams.name || "Rainbow Endevaour"}
                  </h5>
                  <h5 className='font-semibold dark:text-slate-300'>
                    {formParams.price || 0.0004} ETH
                  </h5>
                </div>
                <p className='dark:text-slate-400'>
                  {formParams.description ||
                    "Immerse yourself in the beauty of nature with this stunning NFT artwork."}
                </p>
              </div>
            </div>
            <hr className='w-[20rem] mx-auto mb-4 md:hidden md:mb-inherit' />
            <div className='nft-data'>
              <div className='w-[20rem] mx-auto'>
                <div className='mb-1'>
                  <label
                    htmlFor='nftTitle'
                    className='block mb-[4px] font-medium dark:text-slate-200 tracking-wide'
                  >
                    Title
                  </label>
                  <TextField
                    fullWidth
                    id='nftTitle'
                    variant='outlined'
                    sx={{
                      "& .MuiInputBase-input": {
                        backgroundColor: "#fff",
                        borderRadius: 1,
                      },
                    }}
                    placeholder='Rainbowed Endevaour'
                    size='small'
                    value={formParams.name}
                    onChange={(e) =>
                      updateFormParams({ ...formParams, name: e.target.value })
                    }
                  />
                </div>
                <div className='mb-1'>
                  <label
                    htmlFor='nftDesc'
                    className='block mb-[4px] font-medium dark:text-slate-200 tracking-wide'
                  >
                    Description
                  </label>
                  <TextField
                    fullWidth
                    id='nftDesc'
                    variant='outlined'
                    sx={{
                      "& .MuiInputBase-multiline": {
                        backgroundColor: "#fff",
                        borderRadius: 1,
                        lineHeight: 1.2,
                      },
                    }}
                    placeholder='Immerse yourself in the beauty of nature with this stunning NFT artwork.'
                    size='small'
                    multiline
                    rows={3}
                    value={formParams.description}
                    onChange={(e) =>
                      updateFormParams({
                        ...formParams,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className='mb-2'>
                  <label
                    htmlFor='nftPrice'
                    className='block mb-[4px] font-medium dark:text-slate-200 tracking-wide'
                  >
                    Price
                  </label>
                  <TextField
                    fullWidth
                    id='nftPrice'
                    variant='outlined'
                    type='number'
                    sx={{
                      "& .MuiInputBase-input, & .MuiInputBase-adornedEnd": {
                        backgroundColor: "#fff",
                        borderRadius: 1,
                      },
                    }}
                    placeholder='0.0004'
                    size='small'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='start'>ETH</InputAdornment>
                      ),
                    }}
                    value={formParams.price}
                    onChange={(e) =>
                      updateFormParams({
                        ...formParams,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
                <Button
                  variant='contained'
                  fullWidth
                  type='submit'
                  onClick={(e) => {
                    listNFT(e)
                  }}
                >
                  Mint
                </Button>
                <Link to='/'>
                  <h6 className='mt-1 underline underline-offset-4 dark:text-slate-200'>
                    Generate New One
                  </h6>
                </Link>
              </div>
            </div>
          </div>
        </Box>
      </Container>
    </>
  )
}
