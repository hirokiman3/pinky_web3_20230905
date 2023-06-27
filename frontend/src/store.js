import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from "redux"
import thunk from "redux-thunk"
import {
  userDetailsReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers"
import {
  myNftListReducer,
  nftGenerateReducer,
  saveNftReducer,
} from "./reducers/nftReducers"

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,

    newlyGeneratedNFT: localStorage.getItem("newlyGeneratedNFT")
      ? JSON.parse(localStorage.getItem("newlyGeneratedNFT"))
      : null,
  },
}
const reducer = combineReducers({
  userSignin: userSigninReducer,
  userDetails: userDetailsReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateProfileReducer,
  nftGenerate: nftGenerateReducer,
  saveNft: saveNftReducer,
  myNftList: myNftListReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
)

export default store
