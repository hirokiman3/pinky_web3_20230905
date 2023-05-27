import Axios from "axios"
import {
  NFT_GENERATE_REQUEST,
  NFT_GENERATE_FAIL,
  NFT_GENERATE_SUCCESS,
} from "../constants/nftConstants"

export const generate =
  (org_id, secret, prompt, no, dimensions, username) => async (dispatch) => {
    dispatch({
      type: NFT_GENERATE_REQUEST,
      payload: { org_id, secret, prompt, no, dimensions, username },
    })
    try {
      const { data } = await Axios.post("/api/nft/generate", {
        org_id,
        secret,
        prompt,
        no,
        dimensions,
        username,
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
