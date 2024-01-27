export const API_SERVER = 'https://norma.nomoreparties.space/api/';
export const API_SERVER_INGREDIENTS = API_SERVER + 'ingredients';
export const API_SERVER_ORDER = API_SERVER + 'orders';
export const API_SERVER_LOGIN = API_SERVER + 'auth/login';
export const API_SERVER_LOGOUT = API_SERVER + 'auth/logout';
export const API_SERVER_REGISTER = API_SERVER + 'auth/register';
export const API_SERVER_TOKEN = API_SERVER + 'auth/token';
export const API_SERVER_USER = API_SERVER + 'auth/user';
export const API_SERVER_FORGOT_PASSWORD = API_SERVER + 'password-reset';
export const API_SERVER_RESET_PASSWORD = API_SERVER + 'password-reset/reset';

// burgerConstructorActions
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const REORDER_INGREDIENTS = 'REORDER_INGREDIENTS';
// ingredientsListActions
export const LOAD_INGREDIENTS = 'LOAD_INGREDIENTS';
export const INCREASE_INGREDIENTS_COUNT = 'INCREASE_INGREDIENTS_COUNT';
export const DECREASE_INGREDIENTS_COUNT = 'DECREASE_INGREDIENTS_COUNT';
// orderActions
export const SAVE_ORDER = 'SAVE_ORDER';
export const RESET_ORDER_DATA = 'RESET_ORDER_DATA';
// accountActions
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';
export const GET_USER_DETAILS = 'GET_USER_DETAILS';
export const SET_USER_DETAILS = 'SET_USER_DETAILS';
export const REFRESH_TOKENS = 'REFRESH_TOKENS';
export const SET_INITIALIZING = 'SET_INITIALIZING';
