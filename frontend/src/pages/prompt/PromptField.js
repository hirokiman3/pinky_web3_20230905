import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import CelebrationIcon from '@mui/icons-material/Celebration'
import LoadingModal from '../../components/LoadingModal'
import LockScroll from '../../components/LockScroll'

// Benny here
import {useSelector} from 'react-redux'
import { genNFT,convertBlobToPng } from '../../genNFT'
import PreviewModal from './PreviewModal'
import fs from 'fs'
export default function PromptField() {

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const [open, setOpen] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [previewOpen, setPreviewOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [activeImage, setActiveImage] = useState({
    id: "",
    src: "",
    prompt: "",
    user: "",
    date: "",
  })

  const handleGenerate = async () => {
    setOpen(true)
    try {
      const url = await genNFT(userInfo, prompt, 1, "256x256")

      setActiveImage({
        src: url,
        prompt: prompt,
        date: Date.now(),
        user: userInfo.username,
      })

      setOpen(false)
      setPreviewOpen(true)
    } catch (error) {
      setPreviewOpen(false)
      console.log(error)
    }
  }

  const handlePreviewClose = () => {
    setImageLoaded(false)
    setPreviewOpen(false)
  }
  return (
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
          padding: "10px",
          borderRadius: "10px",
          backgroundColor: "rgba(255,255,255,0.95)",
          width: { md: "96%" },
          margin: "0 auto",
          "& textarea": {
            margin: "0 auto",
            resize: "none",
            height: { xs: "100px", md: "25px" },
          },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <textarea
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
            background: "transparent",
            border: "transparent",
            cursor: "pointer",
            padding: { xs: "5px 20px", md: "0 20px" },
            borderLeft: { md: "1px solid #ccc" },
            display: "flex",
            alignItems: "center",
          }}
          variant='text'
          endIcon={<CelebrationIcon />}
          onClick={handleGenerate}
        >
          Generate
        </Button>
      </Box>
      <LoadingModal open={open} setOpen={setOpen} />
      <PreviewModal
        previewOpen={previewOpen}
        handlePreviewClose={handlePreviewClose}
        activeImage={activeImage}
        imageLoaded={imageLoaded}
        setImageLoaded={setImageLoaded}
      />
    </Box>
  )
}
