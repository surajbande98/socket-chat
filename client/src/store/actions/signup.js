import * as actionTypes from './actionTypes';

import authService from '../../services/Auth/auth.service';

export const signupStart = () => {
    return {
      type: actionTypes.SIGNUP_START
    };
  };
  
  export const signupSuccess = () => {
    return {
      type: actionTypes.SIGNUP_SUCCESS
    };
  };
  
  export const signupFail = error => {
    return {
      type: actionTypes.SIGNUP_FAIL,
      error: error
    };
  };
  
  export const signup = (ownProps, data) => {
    return dispatch => {
      dispatch(signupStart());

      authService
        .registerUser(data)
        .then(res => {
          dispatch(signupSuccess());
          ownProps.history.push("/");
        })
        .catch(err => {
          console.log(err);
          dispatch(signupFail(err));
        });
    };
  };
  