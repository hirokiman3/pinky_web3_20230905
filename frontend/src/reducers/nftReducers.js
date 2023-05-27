import {
  NFT_GENERATE_FAIL,
  NFT_GENERATE_REQUEST,
  NFT_GENERATE_SUCCESS,
} from "../constants/nftConstants"

export const nftGenerateReducer = (state = {}, action) => {
  switch (action.type) {
    case NFT_GENERATE_REQUEST:
      return { loading: true }
    case NFT_GENERATE_SUCCESS:
      return { loading: false, newlyGeneratedNFT: action.payload }
    case NFT_GENERATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
