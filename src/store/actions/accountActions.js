import { API_SERVER_LOGIN, API_SERVER_LOGOUT, API_SERVER_RESET_PASSWORD, API_SERVER_REGISTER, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_SUCCESS, FORGOT_PASSWORD, API_SERVER_FORGOT_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE, GET_USER_DETAILS, SET_USER_DETAILS, API_SERVER_USER, REFRESH_TOKENS, API_SERVER_TOKEN, SET_INITIALIZING } from '../../utils/constants';
import { checkAPIResponse } from '../../utils/utils';

// Async thunk action
function performLogin(credentials) {
  return async (dispatch) => {
    try {
      const response = await fetch(API_SERVER_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });
      const responseJSON = await checkAPIResponse(response);
      localStorage.setItem('accessToken', responseJSON.accessToken);
      localStorage.setItem('refreshToken', responseJSON.refreshToken);
      dispatch(loginSuccess(responseJSON));
    } catch (error) {
      dispatch(loginFailure(error.message));
      console.error('Ошибка логина: ', error.message);
    }
  };
};

function performLogout() {
  return async (dispatch) => {
    try {
      const response = await fetch(API_SERVER_LOGOUT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: localStorage.getItem('refreshToken')
        })
      });
      await checkAPIResponse(response);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(logout());
    } catch (error) {
      console.error('Ошибка logout: ', error.message);
    }
  };
};

function performRegistration(credentials) {
  return async (dispatch) => {
    try {
      const response = await fetch(API_SERVER_REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          name: credentials.login,
          password: credentials.password
        })
      });
      const responseJSON = await checkAPIResponse(response);
      localStorage.setItem('accessToken', responseJSON.accessToken);
      localStorage.setItem('refreshToken', responseJSON.refreshToken);
      dispatch(registerSuccess(responseJSON));
    } catch (error) {
      dispatch(registerFailure(error.message));
      console.error('Ошибка регистрации: ', error.message);
    }
  };
};

function performForgotPassword(email) {
  return async (dispatch) => {
    try {
      const response = await fetch(API_SERVER_FORGOT_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email
        })
      });
      await checkAPIResponse(response);
      dispatch(forgotPassword());
    } catch (error) {
      console.error('Ошибка сброса пароля: ', error.message);
    }
  };
};

function performResetPassword(data) {
  return async (dispatch) => {
    try {
      const response = await fetch(API_SERVER_RESET_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: data.number,
          password: data.password
        })
      });
      await checkAPIResponse(response);
      dispatch(resetPasswordSuccess());
    } catch (error) {
      dispatch(resetPasswordFailure(error.message));
      console.error('Ошибка установки пароля: ', error.message);
    }
  };
};

function performGetUserDetails() {
  return async (dispatch) => {
    try {
      const response = await fetch(API_SERVER_USER, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': localStorage.getItem('accessToken')
        }
      });
      const responseJSON = await checkAPIResponse(response);
      dispatch(getUserDetails(responseJSON));
    } catch (error) {
      console.error('Ошибка получения данных пользователя: ', error.message);
    }
  };
};

function performSetUserDetails(userUpdatedData) {
  return async (dispatch) => {
    try {
      const response = await fetch(API_SERVER_USER, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': localStorage.getItem('accessToken')
        },
        body: JSON.stringify({
          email: userUpdatedData.email,
          name: userUpdatedData.login
        })
      });
      const responseJSON = await checkAPIResponse(response);
      dispatch(setUserDetails(responseJSON));
    } catch (error) {
      console.error('Ошибка обновления данных пользователя: ', error.message);
    }
  };
};

function performRefreshTokens() {
  return async (dispatch) => {
    dispatch(setInitializing(true));
    try {
      const response = await fetch(API_SERVER_TOKEN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: localStorage.getItem('refreshToken')
        })
      });
      const responseJSON = await checkAPIResponse(response);
      localStorage.setItem('accessToken', responseJSON.accessToken);
      localStorage.setItem('refreshToken', responseJSON.refreshToken);
      dispatch(refreshTokens(responseJSON));
      dispatch(setInitializing(false));
    } catch (error) {
      dispatch(setInitializing(false));
      console.error('Токены более не действительны: ', error.message);
    }
  };
};

function loginSuccess(loginData) {
  return {
    type: LOGIN_SUCCESS,
    loginData: loginData
  };
};

function loginFailure(loginError) {
  return {
    type: LOGIN_FAILURE,
    loginError: loginError
  };
};

function logout() {
  return {
    type: LOGOUT
  };
};

function registerSuccess(registerData) {
  return {
    type: REGISTER_SUCCESS,
    registerData: registerData
  };
};

function registerFailure(registerError) {
  return {
    type: REGISTER_FAILURE,
    registerError: registerError
  };
};

function forgotPassword() {
  return {
    type: FORGOT_PASSWORD
  };
};

function resetPasswordSuccess() {
  return {
    type: RESET_PASSWORD_SUCCESS
  };
};

function resetPasswordFailure(resetPasswordError) {
  return {
    type: RESET_PASSWORD_FAILURE,
    error: resetPasswordError
  };
};

function getUserDetails(userData) {
  return {
    type: GET_USER_DETAILS,
    userData: userData
  };
};

function setUserDetails(userData) {
  return {
    type: SET_USER_DETAILS,
    userData: userData
  };
};

function refreshTokens() {
  return {
    type: REFRESH_TOKENS
  };
};

function setInitializing(isInitializing) {
  return {
    type: SET_INITIALIZING,
    isInitializing: isInitializing
  };
}

export { performLogin, performRegistration, performLogout, performForgotPassword, performResetPassword, performGetUserDetails, performSetUserDetails, performRefreshTokens, setInitializing };
