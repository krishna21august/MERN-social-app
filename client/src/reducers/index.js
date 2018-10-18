import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";

//export the state
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer
});
