import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from "redux"
import thunk from "redux-thunk"
import { userRegisterReducer, userSigninReducer } from "./reducers/userReducers"
import { nftGenerateReducer } from "./reducers/nftReducers"
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
  userRegister: userRegisterReducer,
  nftGenerate: nftGenerateReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
)

export default store
