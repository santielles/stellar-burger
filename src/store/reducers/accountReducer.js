import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_SUCCESS, FORGOT_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE, GET_USER_DETAILS, SET_USER_DETAILS, REFRESH_TOKENS, SET_INITIALIZING } from '../../utils/constants';

const accountData = {
  isInitializing: true,
  login: {},
  isAuthenticated: false,
  loginError: null,
  registerError: null,
  resetPassword: {
    emailSent: false,
    passwordChanged: false,
    error: null
  }
};

function accountReducer(state = accountData, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, login: action.loginData.user, isAuthenticated: true, loginError: null };
    case LOGIN_FAILURE:
      return { ...state, loginError: action.loginError };
    case LOGOUT:
      return { ...state, login: {}, isAuthenticated: false };
    case REGISTER_SUCCESS:
      return { ...state, login: action.registerData.user, isAuthenticated: true, registerError: null };
    case REGISTER_FAILURE:
      return { ...state, registerError: action.registerError };
    case FORGOT_PASSWORD:
      return { ...state, resetPassword: { emailSent: true } };
    case RESET_PASSWORD_SUCCESS:
      return { ...state, resetPassword: { passwordChanged: true } };
    case RESET_PASSWORD_FAILURE:
      return { ...state, resetPassword: { error: action.error } };
    case GET_USER_DETAILS:
      return { ...state, login: action.userData.user };
    case SET_USER_DETAILS:
      return { ...state, login: action.userData.user };
    case REFRESH_TOKENS:
      return { ...state, isAuthenticated: true, loginError: null };
    case SET_INITIALIZING:
      return { ...state, isInitializing: action.isInitializing };
    default:
      return state;
  }
};

export { accountReducer };
