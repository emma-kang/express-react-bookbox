import produce from 'immer';
import {USER_DATA} from '../service/types';
import {SINGUP_DATA} from '../service/types';

const {USER_EMAIL, USER_PASSWORD} = USER_DATA;
const {FIRST_NAME, LAST_NAME, EMAIL, PASSWORD} = SINGUP_DATA

export const SET_BOOK = "SET_BOOK";
export const SET_USERINPUT = "SET_USERINPUT";
export const SET_NEWUSER = "SET_NEWUSER";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SINGUP_SUCCESS = "SINGUP_SUCCESS";
export const SINGUP_FAILURE = "SIGNUP_FAILURE";

export const redux_set_book = (bookData) => ({
  type: SET_BOOK, payload: bookData
});

export const redux_set_userinput = (userData) => ({
  type: SET_USERINPUT, payload: userData
})

export const redux_set_newuser = (userData) => ({
  type: SET_NEWUSER, payload: userData
})

export const redux_login_request = (history) => ({
  type: LOGIN_REQUEST, payload : history
});

export const redux_login_success = (dataFromServer) => ({
  type: LOGIN_SUCCESS, payload: dataFromServer
});

export const redux_login_failure = (dataFromServer) => ({
  type: LOGIN_FAILURE, payload: dataFromServer
});

export const redux_signup_request = (history) => ({
  type: SIGNUP_REQUEST, payload: history
});

export const redux_signup_success = (dataFromServer) => ({
  type: SINGUP_SUCCESS, payload: dataFromServer
});

export const redux_signup_failure = (dataFromServer) => ({
  type: SINGUP_FAILURE, payload: dataFromServer
});

const initState = {
  bookData: null,

  userInput: {
    [USER_EMAIL]: '',
    [USER_PASSWORD]: ''
  },

  signupInput: {
    [FIRST_NAME]: '',
    [LAST_NAME]: '',
    [EMAIL]: '',
    [PASSWORD]: ''
  },

  loginAPI: {
    status: {
      processing: false,
      processed: false,
      message: '',
      result: null
    }
  },

  signupAPI: {
    status: {
      processing: false,
      processed: false,
      message: '',
      result: null
    }
  }
};

export default function ducksReducer(state = initState, action) {
  return produce(state, (draft) => {
      switch (action.type) {
        case SET_BOOK:
          draft.bookData = action.payload;
          break;
        case SET_USERINPUT:
          draft.userInput[action.payload.inputName] = action.payload.inputValue;
          break;
        case SET_NEWUSER:
          draft.signupInput[action.payload.inputName] = action.payload.inputValue;
          break;
        case LOGIN_REQUEST:
          draft.loginAPI.status = {
            ...draft.loginAPI.status,
            processing: true,
            processed: false,
            message: 'Call Login API',
            result: null
          };
          break;
        case LOGIN_SUCCESS:
          draft.loginAPI.status = {
            ...draft.loginAPI.status,
            processing: false,
            processed: true,
            message: action.payload.message,
            result: action.payload.value
          };
          break;
        case LOGIN_FAILURE:
          draft.loginAPI.status = {
            ...draft.loginAPI.status,
            processing: true,
            processed: false,
            message: action.payload.message,
            result: null
          };
          break;
        case SIGNUP_REQUEST:
          draft.signupAPI.status = {
            ...draft.signupAPI.status,
            processing: true,
            processed: false,
            message: 'Call SignUp API',
            result: null
          };
          break;
        case SINGUP_SUCCESS:
          draft.signupAPI.status = {
            ...draft.signupAPI.status,
            processing: false,
            processed: true,
            message: action.payload.message,
            result: action.payload.value
          };
          break;
        case SINGUP_FAILURE:
          draft.signupAPI.status = {
            ...draft.signupAPI.status,
            processing: false,
            processed: true,
            message: action.payload.message,
            result: null
          };
          break;
        default:
          return;
      }
    }
  );
}
