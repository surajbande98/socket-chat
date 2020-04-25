import * as actionTypes from './actionTypes';

import authService from '../../services/Auth/auth.service';

export const loginStart = () => {
    return {
      type: actionTypes.LOGIN_START
    };
  };
  
  export const loginSuccess = () => {
    return {
      type: actionTypes.LOGIN_SUCCESS
    };
  };
  
  export const loginFail = error => {
    return {
      type: actionTypes.LOGIN_FAIL,
      error: error
    };
  };
  
  export const login = (data, props) => {
    return dispatch => {
      dispatch(loginStart());

      authService
        .login(data)
        .then(res => {
          sessionStorage.setItem('token', res.data.token);
          dispatch(loginSuccess());
          props.history.push("/posts");
        })
        .catch(err => {
          dispatch(loginFail(err.response.data.message));
        });
    };
  };

  export const logout = () => {
    sessionStorage.clear();
    
    return {
      type: actionTypes.LOGIN_LOGOUT
    };
  };
  