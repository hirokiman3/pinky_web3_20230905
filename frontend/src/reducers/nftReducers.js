import {
  NFT_GENERATE_FAIL,
  NFT_GENERATE_REQUEST,
  NFT_GENERATE_SUCCESS,
  NFT_LIST_FAIL,
  NFT_LIST_REQUEST,
  NFT_LIST_SUCCESS,
  NFT_SAVE_FAIL,
  NFT_SAVE_REQUEST,
  NFT_SAVE_SUCCESS,
} from "../constants/nftConstants"

export const myNftListReducer = (
  state = { loading: true, nfts: [] },
  action
) => {
  switch (action.type) {
    case NFT_LIST_REQUEST:
      return { loading: true }
    case NFT_LIST_SUCCESS:
      return { loading: false, nfts: action.payload }
    case NFT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

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

export const saveNftReducer = (state = {}, action) => {
  switch (action.type) {
    case NFT_SAVE_REQUEST:
      return { loading: true }
    case NFT_SAVE_SUCCESS:
      return { loading: false, nft: action.payload }
    case NFT_SAVE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}