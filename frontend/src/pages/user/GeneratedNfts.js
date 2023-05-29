import { Box, Container } from "@mui/material"
import NftGallery from "../../components/NftGallery"

export default function GeneratedNfts() {
  let isFromMyNfts = true

  return (
    <Container>
      <Box sx={{ marginTop: 10, marginBottom: 5 }}>
        <h2 style={{ marginBottom: 5 }}>My Generated NFTS</h2>
        <p style={{ margin: 0 }} className='sub-description'>
          Explore and manage your collection of personally generated NFTs
        </p>
      </Box>
      <NftGallery isFromMyNfts={isFromMyNfts} />
    </Container>
  )
}
