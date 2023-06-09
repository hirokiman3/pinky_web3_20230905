import Marketplace from "../Marketplace"
import PromptField from "./PromptField"
import { Box, Container, Fade, Typography } from "@mui/material"

export default function Prompt() {
  return (
    <Fade in={true} timeout={1000}>
      <Container>
        <Box sx={{ marginTop: 15, textAlign: "center", marginBottom: 10 }}>
          <Typography
            component='h2'
            sx={{
              fontFamily: "Dancing Script",
              fontSize: { xs: 50, md: 60, lg: 70 },
              marginBottom: 2,
              lineHeight: { xs: 0.8, md: 1.2 },
            }}
          >
            Imagine the best with us
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "2px" }}>
            <Box
              element='span'
              sx={{
                width: { xs: 200, md: 300 },
                height: 8,
                backgroundColor: "#F15672",
                borderRadius: 15,
                transform: "rotate(-2deg)",
              }}
            ></Box>
            <Box
              element='span'
              sx={{
                width: 15,
                height: 8,
                backgroundColor: "#F15672",
                borderRadius: 8,
                transform: "rotate(-4deg)",
                marginTop: { xs: "-4px", md: "-6px" },
              }}
            ></Box>
          </Box>
        </Box>
        <Box
          sx={{ width: "98%", margin: "0 auto", "& h4": { fontWeight: 500 } }}
        >
          <h4 className='m-0 mb-1'>Lets imagine a cool NFT</h4>
        </Box>
        <PromptField />
        <Marketplace />
      </Container>
    </Fade>
  )
}
