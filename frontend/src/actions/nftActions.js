import Axios from "axios"
import {
  NFT_GENERATE_REQUEST,
  NFT_GENERATE_FAIL,
  NFT_GENERATE_SUCCESS,
} from "../constants/nftConstants"

export const generate =
  (prompt, no, dimension, username, org_id, secret) => async (dispatch) => {
    dispatch({
      type: NFT_GENERATE_REQUEST,
      payload: { prompt, no, dimension, username, org_id, secret },
    })
    try {
      const { data } = await Axios.post("/api/nft/generate", {
        prompt,
        org_id,
        secret,
        no,
        dimension,
        username,
      })
      dispatch({ type: NFT_GENERATE_SUCCESS, payload: data })
      localStorage.setItem("newlyGeneratedNFT", JSON.stringify(data))
    } catch (error) {
      if (error.response) {
        console.log("Image error status: ", error.response.status)
        console.log("Image error data: ", error.response.data)
      } else {
        console.log("Image error message: ", error.message)
      }
      dispatch({
        type: NFT_GENERATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
