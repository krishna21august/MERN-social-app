import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";
//Register User

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("api/users/register", userData)
    .then(history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //Save to local Storage
      const { token } = res.data;
      //set token to ls
      localStorage.setItem("jwtToken", token);
      //set token to auth Header
      setAuthToken(token);

      //decode auth token to get user id
      const decoded = jwt_decode(token);

      //Set current user
      dispatch(setCurrentUSer(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set logged in user

const setCurrentUSer = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
