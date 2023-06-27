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

export default function PromptField() {
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const nftGenerate = useSelector((state) => state.nftGenerate)
  const { newlyGeneratedNFT } = nftGenerate

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [prompt, setPrompt] = useState("")

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

  const handleGenerate = async () => {
    if (userInfo) {
      setOpen(true)
      dispatch(generate(prompt, 1, "256x256", userInfo))
    } else {
      navigate("/signin")
    }
  }

  const handlePreviewClose = () => {
    setOpenConfirmDialog(true)
  }
  const handleConfirmPreviewClose = () => {
    setImageLoaded(false)
    setPreviewOpen(false)
    setIsImageFromPrompt(false)
    setOpenConfirmDialog(false)
  }
  const handleClose = () => {
    setOpenConfirmDialog(false)
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
            placeholder='A mystical forest at twilight, where ancient trees stand tall and majestic.'
            onChange={(e) => setPrompt(e.target.value)}
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
