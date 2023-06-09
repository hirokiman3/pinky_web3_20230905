import { Box, Modal, Skeleton } from "@mui/material"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Marketplace from "../../Marketplace.json"
import { uploadJSONToIPFS } from "../../pinata"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function PreviewModal({
  previewOpen,
  setImageLoaded,
  activeImage,
  isImageFromPrompt,
  handlePreviewClose,
  imageLoaded,
}) {
  const navigate = useNavigate()
  const ethers = require("ethers")

  const [formParams, updateFormParams] = useState({
    name: "",
    description: activeImage.prompt,
    price: "",
  })

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
      previewOpen = false
      updateFormParams({ name: "", description: "", price: "" })
      navigate("/user/nfts")
    } catch (e) {
      alert("Upload error" + e)
    }
  }

  return (
    <Modal
      open={previewOpen}
      onClose={handlePreviewClose}
      disableScrollLock
      sx={{ height: "100%" }}
      className='nft-modal'
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          outline: "none",
        }}
      >
        <Box
          sx={{
            minHeight: { md: 350 },
            width: { xs: 300, sm: 350 },
            margin: "auto",
            backgroundColor: "#fff",
            borderRadius: 5,
            outline: "none",
            padding: 2,
          }}
        >
          {!imageLoaded && (
            <Skeleton variant='rectangular' width='100%' height={350} />
          )}
          <img
            src={`${activeImage.src}`}
            onLoad={() => setImageLoaded(true)}
            style={{
              display: imageLoaded ? "block" : "none",
              height: "350px",
              width: "100%",
              objectFit: "cover",
              borderRadius: "10px",
              overflow: "hidden",
            }}
            alt='preview'
          />
          <Box
            component='div'
            sx={{
              "& a": {
                color: "rgba(0,0,0,0.6)",
                transition: 200,
                "&:hover": { color: "rgba(0,0,0,0.8)" },
              },
            }}
          >
            {/* Mint Form */}
            {isImageFromPrompt && (
              <Box component='form' noValidate sx={{ mt: 1 }}>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='Name'
                  label='Enter a name'
                  name='name'
                  type='text'
                  autoComplete='name'
                  onChange={(e) =>
                    updateFormParams({ ...formParams, name: e.target.value })
                  }
                  value={formParams.name}
                  autoFocus
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='desc'
                  label='Description'
                  type='text'
                  id='desc'
                  value={formParams.description}
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      description: e.target.value,
                    })
                  }
                  rows={2}
                  multiline
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='price'
                  label='Price'
                  type='number'
                  id='price'
                  min='0'
                  value={formParams.price}
                  inputProps={{
                    step: "0.00001",
                  }}
                  onChange={(e) =>
                    updateFormParams({ ...formParams, price: e.target.value })
                  }
                />
                <Button
                  fullWidth
                  variant='contained'
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#F25672",
                    color: "#fff !important",
                    "&:hover": { backgroundColor: "#C83B55" },
                  }}
                  onClick={(e) => {
                    listNFT(e)
                  }}
                >
                  Mint
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
