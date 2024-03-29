import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { generate } from "../../actions/nftActions"
import LockScroll from "../../components/LockScroll"
import PreviewModal from "../root/PreviewModal"
import { useSelector, useDispatch } from "react-redux"
import LoadingModal from "../../components/LoadingModal"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import { toast } from "react-toastify"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"

export default function PromptField() {
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const nftGenerate = useSelector((state) => state.nftGenerate)
  const { newlyGeneratedNFT } = nftGenerate

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [model, setModel] = useState("")
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const [isImageFromPrompt, setIsImageFromPrompt] = useState(false)
  const [activeImage, setActiveImage] = useState({
    id: "",
    src: "",
    prompt: prompt,
    user: "",
    date: "",
  })

  const handleChange = () => {
    if (model === "chilloutmix") setModel("dream-shaper-8797")
    else setModel("chilloutmix")
    console.log(model)
  }

  const handleGenerate = async () => {
    if (userInfo) {
      setOpen(true)
      dispatch(generate(prompt, model, userInfo))
    } else {
      navigate("/signin")
    }
  }

  const handlePreviewClose = () => {
    setOpenConfirmDialog(true)
    localStorage.removeItem("newlyGeneratedNFT")
    window.location.reload()
  }
  const handleConfirmPreviewClose = () => {
    setImageLoaded(false)
    setPreviewOpen(false)
    setIsImageFromPrompt(false)
    setOpenConfirmDialog(false)
  }
  const handleClose = () => {
    setOpenConfirmDialog(false)
    window.location.reload()
  }

  useEffect(() => {
    if (userInfo) {
      if (newlyGeneratedNFT) {
        // console.log(
        //   newlyGeneratedNFT.path.success,
        //   newlyGeneratedNFT.path.pinataURL
        // )
        if (newlyGeneratedNFT.path) {
          setActiveImage({
            src: newlyGeneratedNFT.path.pinataURL,
            prompt: prompt,
            date: newlyGeneratedNFT.date,
            user: userInfo.username,
          })

          setOpen(false)
          setIsImageFromPrompt(true)
          setPreviewOpen(true)
        } else {
          toast.error(newlyGeneratedNFT.message)
          setOpen(false)
        }
      }
    }
    // eslint-disable-next-line
  }, [userInfo, newlyGeneratedNFT])

  return (
    <>
      <Box
        component='form'
        sx={{
          marginBottom: { xs: 10 },
          width: "100%",
          position: { md: "sticky" },
          top: 30,
          zIndex: 100,
        }}
        noValidate
        autoComplete='off'
      >
        {open && <LockScroll />}
        <Box
          component='div'
          sx={{
            height: "100%",
            boxShadow:
              "0 4px 8px rgba(0, 0, 0, 0.15), 0 6px 20px rgba(0, 0, 0, 0.1);",
            padding: "5px",
            borderRadius: "5px",
            backgroundColor: "rgba(255,255,255,0.95)",
            "& textarea": {
              margin: "0 auto",
              resize: "none",
              height: { xs: "100px", md: "30px" },
            },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            maxWidth: 800,
            alignItems: "center",
          }}
        >
          <textarea
            required
            style={{
              border: "solid transparent",
              outline: "none",
              padding: "0 5px",
              width: "100%",
              backgroundColor: "transparent",
              fontSize: "16px",
              fontFamily: "Poppins",
            }}
            value={prompt}
            placeholder='A mystical forest at twilight, where ancient trees stand tall and majestic.'
            onChange={(e) => {
              setPrompt(e.target.value)
              setActiveImage({
                ...activeImage,
                prompt: prompt,
              })
            }}
          ></textarea>
          <Button
            sx={{
              cursor: "pointer",
              padding: { xs: "5px 20px", md: "10px 20px" },
              borderLeft: { md: "1px solid #ccc" },
              display: "flex",
              alignItems: "center",
              width: { xs: "100%", md: "inherit" },
            }}
            variant='contained'
            onClick={handleGenerate}
          >
            <ArrowRightAltIcon />
          </Button>
        </Box>
        <FormControl>
          <FormLabel id='demo-row-radio-buttons-group-label'>
            Select Model
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='row-radio-buttons-group'
            value={model}
            onChange={handleChange}
          >
            <FormControlLabel
              value='chilloutmix'
              control={<Radio />}
              label='Realistic'
            />
            <FormControlLabel
              value='dream-shaper-8797'
              control={<Radio />}
              label='Cartoonish'
            />
          </RadioGroup>
        </FormControl>
        <LoadingModal open={open} setOpen={setOpen} />
        <PreviewModal
          previewOpen={previewOpen}
          handlePreviewClose={handlePreviewClose}
          activeImage={activeImage}
          imageLoaded={imageLoaded}
          isImageFromPrompt={isImageFromPrompt}
          setImageLoaded={setImageLoaded}
        />
        {/* {newlyGeneratedNFT ? <GenerateNft activeImage={activeImage} /> : <></>} */}
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        sx={{ "& .MuiDialog-paper": { maxWidth: 400 } }}
      >
        <DialogTitle id='alert-dialog-title'>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            The current NFT data will be permanently deleted and can not be
            recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmPreviewClose}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
