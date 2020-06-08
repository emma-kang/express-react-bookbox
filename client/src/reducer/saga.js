import {takeEvery, put, select} from "redux-saga/effects";
import {
  LOGIN_REQUEST, redux_login_success, redux_login_failure,
  SIGNUP_REQUEST, redux_signup_success, redux_signup_failure
} from './ducksReducer';
import {loginRequest, signupRequest} from '../service/api/apiCall';
import {USER_DATA, SINGUP_DATA} from '../service/types';

const {USER_EMAIL, USER_PASSWORD} = USER_DATA;
const {FIRST_NAME, LAST_NAME, EMAIL, PASSWORD} = SINGUP_DATA;

const addDelay = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 2000)
  })
}

function* sagaLoginFunc(action) {

  const allReducerVar = yield select();

  try {
    yield addDelay();

    const res = yield loginRequest({
      userEmail: allReducerVar.ducksReducer.userInput[USER_EMAIL]
      , userPw: allReducerVar.ducksReducer.userInput[USER_PASSWORD]
    });

    if (res.status === 'success') {
      sessionStorage.setItem('token', res.data.token);
      yield put(redux_login_success({message: 'login api call success', value: res.data.id}));
      action.payload.history.push('/');
      window.location.reload();
    } else {
      yield put(redux_login_failure({message: 'login api call failure', value: null}));
    }

  } catch (err) {
    yield put(redux_login_failure({message: 'login api catch error', value: null}));
  }
}

function* sagaSignUpFunc(action) {

  const allReducerVar = yield select();

  try {
    yield addDelay();
    const res = yield signupRequest({
      firstname: allReducerVar.ducksReducer.signupInput[FIRST_NAME]
      , lastname: allReducerVar.ducksReducer.signupInput[LAST_NAME]
      , email: allReducerVar.ducksReducer.signupInput[EMAIL]
      , password: allReducerVar.ducksReducer.signupInput[PASSWORD]
    });

    if (res.status === 'success') {
      sessionStorage.setItem('token', res.data.token);
      yield put(redux_signup_success({message: 'signup api call success', value: res.data.id}));
      action.payload.history.push('/');
      window.location.reload();
    } else {
      yield put(redux_signup_failure({message: 'signup api call failure', value: null}));
    }


  } catch (err) {
    yield put(redux_signup_failure({message: 'SIGNUP API Try-Catch Error', value: null}));
  }
}

export function* requestSagaWatcher() {
  yield takeEvery(LOGIN_REQUEST, sagaLoginFunc);
  yield takeEvery(SIGNUP_REQUEST, sagaSignUpFunc);
};