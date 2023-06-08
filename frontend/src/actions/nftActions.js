import Axios from "axios"
import {
  NFT_GENERATE_REQUEST,
  NFT_GENERATE_FAIL,
  NFT_GENERATE_SUCCESS,
} from "../constants/nftConstants"

export const generate =
  (prompt, no, dimensions, username, org_id, secret) => async (dispatch) => {
    dispatch({
      type: NFT_GENERATE_REQUEST,
      payload: { prompt, no, dimensions, username, org_id, secret },
    })
    try {
      const { data } = await Axios.post("/api/nft/generate", {
        prompt,
        no,
        dimensions,
        username,
        org_id,
        secret,
      })
      dispatch({ type: NFT_GENERATE_SUCCESS, payload: data })
      localStorage.setItem("newlyGeneratedNFT", JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: NFT_GENERATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
