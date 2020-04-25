
import { combineReducers } from "redux";

import loginReducer from "./login";

import signupReducer from "./signup";

import postReducer from './post';

const rootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  post: postReducer
});

export default rootReducer;
