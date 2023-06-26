import { Box, Modal, Skeleton, InputAdornment } from "@mui/material"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Marketplace from "../../Marketplace.json"
import { uploadJSONToIPFS } from "../../pinata"
import { useContext, useState } from "react"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"
import { save } from "../../actions/nftActions"
import { Context } from "../../App"

export default function PreviewModal({
  previewOpen,
  setImageLoaded,
  activeImage,
  isImageFromPrompt,
  handlePreviewClose,
  imageLoaded,
}) {
  const dispatch = useDispatch()
  const ethers = require("ethers")
  const { isWalletConnected } = useContext(Context)

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const saveNft = useSelector((state) => state.saveNft)
  const { error } = saveNft

  const [formParams, updateFormParams] = useState({
    name: "",
    description: activeImage.prompt,
    price: "",
  })

  const [tx, setTx] = useState("")

  const handleSave = () => {
    if (userInfo) {
      dispatch(
        save(
          activeImage.src,
          formParams.name,
          formParams.description,
          formParams.price,
          userInfo._id
        )
      )
      if (!error) {
        toast.success("Nft saved to your list.")
      }
    }
  }
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

      toast.info("Uploading NFT(takes 5 mins).. please dont click anything!")

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

      // actually create the NFT
      let transaction = await contract.createToken(metadataURL, price, {
        value: listingPrice,
      })
      await transaction.wait()
      setTx(transaction.hash)
      toast.success("Successfully listed your NFT!")
      localStorage.removeItem("newlyGeneratedNFT")
      activeImage = []
      previewOpen = false
      updateFormParams({ name: "", description: "", price: "" })
      // navigate("/marketplace")
    } catch (e) {
      alert("Upload error" + e)
    }
  }

  // For responsive sizes of textfield
  const getSizeByBreakpoint = () => {
    const { innerWidth } = window
    if (innerWidth >= 900) {
      return "" // Medium screens (md breakpoint)
    } else {
      return "small" // Default size for small screens
    }
  }

  return (
    <Modal
      open={previewOpen}
      onClose={handlePreviewClose}
      disableScrollLock
      sx={{ height: "100%" }}
      className='nft-modal'
      disableEnforceFocus
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
            width: { xs: 300, sm: 350, md: 650 },
            margin: "auto",
            backgroundColor: "#fff",
            borderRadius: 5,
            outline: "none",
            padding: 2,
            display: { md: "flex" },
            gap: 2,
          }}
        >
          {!imageLoaded && (
            <>
              <Skeleton variant='rectangular' width='100%' height={280} />
              <Box sx={{ width: { xs: "100%", md: 500 } }}>
                <Skeleton
                  variant='rectangular'
                  width='100%'
                  height={40}
                  sx={{ marginBottom: 2 }}
                />
                <Skeleton
                  variant='rectangular'
                  width='100%'
                  height={40}
                  sx={{ marginBottom: 2 }}
                />
                <Skeleton
                  variant='rectangular'
                  width='100%'
                  height={40}
                  sx={{ marginBottom: 1 }}
                />
              </Box>
            </>
          )}
          <Box
            sx={{
              borderRadius: 4,
              marginBottom: "1.2rem",
              visibility: imageLoaded ? "visible" : "hidden",
              width: imageLoaded ? "100%" : 0,
              // Give stylings to image from here
              "& img": {
                height: { md: "100%" },
                width: "100%",
                objectFit: "contain",
                borderRadius: 4,
                overflow: "hidden",
              },
            }}
          >
            <img
              src={`${activeImage.src}`}
              onLoad={() => setImageLoaded(true)}
              alt='preview'
            />
          </Box>

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
            {isImageFromPrompt && imageLoaded && (
              <Box
                component='form'
                noValidate
                sx={{ marginTop: { xs: 1, md: 0 } }}
              >
                <TextField
                  margin='dense'
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
                  size={getSizeByBreakpoint()}
                />
                <TextField
                  margin='dense'
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
                  size={getSizeByBreakpoint()}
                />
                <TextField
                  margin='dense'
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='start'>MATIC</InputAdornment>
                    ),
                  }}
                  onChange={(e) =>
                    updateFormParams({ ...formParams, price: e.target.value })
                  }
                  size={getSizeByBreakpoint()}
                />
                <Button
                  fullWidth
                  variant='contained'
                  sx={{
                    mt: 2,
                    mb: 2,
                    backgroundColor: "#F25672",
                    color: "#fff !important",
                    "&:hover": { backgroundColor: "#C83B55" },
                  }}
                  onClick={() => {
                    handleSave()
                  }}
                >
                  Add To Your List
                </Button>

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
                    listNFT(e)
                  }}
                >
                  Mint
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
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
