import Navbar from "../../components/Navbar"
// import { GetIpfsUrlFromPinata } from "../../utils"
import { Container, Box, ImageList, ImageListItem } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { listMyNfts } from "../../actions/nftActions"
import React, { useEffect } from "react"

function SavedList() {
  const dispatch = useDispatch()

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const myNftList = useSelector((state) => state.myNftList)
  const { loading, error, nfts } = myNftList

  useEffect(() => {
    dispatch(listMyNfts({ seller: userInfo._id }))
  }, [dispatch, userInfo._id])

  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ marginTop: 10, marginBottom: 5 }}>
          <h2 className='text-4xl font-bold mb-1 text-pink-600 dark:text-pink-500'>
            Saved NFTs
          </h2>
          <h5 className='text-slate-800 dark:text-slate-200'>
            <strong>Your saved generated images displayed below</strong>
          </h5>
        </Box>
        <ImageList sx={{ width: "100%", height: "100%", paddingY: 2 }} cols={5}>
          {loading ? (
            <span>fetching...</span>
          ) : error ? (
            <span>{error}</span>
          ) : (
            nfts?.map((item) => (
              <ImageListItem key={item._id}>
                <Box
                  className='nft-card'
                  sx={{
                    overflow: "hidden",
                    minHeight: "200px",
                    borderRadius: "4px",
                    transition: "200ms",
                    cursor: "pointer",
                    margin: 1,
                    "&:hover": {
                      // boxShadow: "0px 6px 8px rgba(236, 72, 153, 0.6)",
                      transform: "translateY(-10px)",
                    },
                  }}
                >
                  <img
                    crossOrigin='anonymous'
                    src={item.path}
                    srcSet={item.path}
                    alt={item.desc}
                    loading='lazy'
                    className='h-[300px] md:h-[200px]'
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      overflow: "hidden",
                      borderRadius: "4px",
                      margin: 0,
                      pointerEvents: "none",
                    }}
                  />
                  <div className='my-4'>
                    <h4 className='ml-1.5 mt-3 font-bold text-[17px] dark:text-slate-200 text uppercase truncate lg:max-w-[200px]'>
                      {item.title}
                    </h4>
                    {/* <p>{item.desc}</p> */}
                    <h5 className='ml-1.5 mt-1 text-slate-600 dark:text-slate-300'>
                      {item.price} MATIC
                    </h5>
                  </div>
                </Box>
              </ImageListItem>
            ))
          )}
        </ImageList>
      </Container>
    </>
  )
}

export default SavedList
