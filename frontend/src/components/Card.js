import React from "react"
import { Box } from "@mui/material"
import { Link } from "react-router-dom"
import { GetIpfsUrlFromPinata } from "../utils"

function Card(data) {
  const newTo = {
    pathname: "/nft/" + data.data.tokenId,
  }
  const IPFSUrl = GetIpfsUrlFromPinata(data.data.image)
  return (
    <Link to={newTo}>
      <Box
        className='nft-card'
        sx={{
          backgroundColor: "#fff",
          overflow: "hidden",
          minHeight: "200px",
          padding: 1,
          borderRadius: "10px",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
          transition: "200ms",
          "&:hover": {
            transform: "rotate(2deg)",
          },
        }}
      >
        <img
          crossOrigin='anonymous'
          src={IPFSUrl}
          alt={data.data.desc}
          loading='lazy'
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            overflow: "hidden",
            borderRadius: "10px",
            margin: 0,
            pointerEvents: "none",
          }}
        />
        <h4 style={{ margin: "3px 0" }}>{data.data.name}</h4>
      </Box>
    </Link>
  )
}

export default Card
