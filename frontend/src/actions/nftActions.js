import Axios from "axios"
import {
  NFT_GENERATE_REQUEST,
  NFT_GENERATE_FAIL,
  NFT_GENERATE_SUCCESS,
  NFT_SAVE_REQUEST,
  NFT_SAVE_SUCCESS,
  NFT_SAVE_FAIL,
  NFT_LIST_REQUEST,
  NFT_LIST_SUCCESS,
  NFT_LIST_FAIL,
} from "../constants/nftConstants"

export const generate = (prompt, model, userInfo) => async (dispatch) => {
  dispatch({
    type: NFT_GENERATE_REQUEST,
    payload: { prompt, model, userInfo },
  })
  try {
    const { data } = await Axios.post("/api/nft/generate", {
      prompt,
      model,
      userInfo,
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

export const save = (path, title, desc, price, userId) => async (dispatch) => {
  dispatch({
    type: NFT_SAVE_REQUEST,
    payload: { path, title, desc, price, userId },
  })
  try {
    const { nft } = await Axios.post("/api/nft/save", {
      path,
      title,
      desc,
      price,
      userId,
    })
    dispatch({ type: NFT_SAVE_SUCCESS, payload: nft })
  } catch (error) {
    dispatch({
      type: NFT_SAVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listMyNfts =
  ({ seller = "" }) =>
  async (dispatch) => {
    dispatch({ type: NFT_LIST_REQUEST })
    try {
      let nfts = null
      await Axios.get(`/api/nft?seller=${seller}`).then((getResponse) => {
        nfts = getResponse.data
        console.log()
      })

      dispatch({ type: NFT_LIST_SUCCESS, payload: nfts })
    } catch (error) {
      dispatch({
        type: NFT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
