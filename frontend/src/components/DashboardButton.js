import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"

function ConnectButton({ isDarkMode }) {
  return (
    <Link to='/signin'>
      <Button
        variant='contained'
        sx={{
          backgroundColor: "#F25672",
          borderRadius: 10,
          border: "transparent",
          "&:hover": { backgroundColor: "#D93F5C" },
        }}
      >
        Generate NFTs
      </Button>
    </Link>
  )
}

export default ConnectButton
