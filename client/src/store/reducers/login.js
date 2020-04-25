import * as actionTypes from "../actions/actionTypes";

import { updateObject } from "../../shared/utility/utility";

const initialState = {
  loading: false,
  error: null,
  isLogin: false
};

const loginStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const loginSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,

    isLogin: true
  });
};

const loginFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const logout = (state, action) => {
  return updateObject(state, { isLogin: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return loginStart(state, action);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.LOGIN_FAIL:
      return loginFail(state, action);
    // case actionTypes.CODE_CANCELLED:
    //   return logout(state, action);
    default:
      return state;
  }
};

export default reducer;
