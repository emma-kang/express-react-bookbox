import {takeEvery, put, select} from "redux-saga/effects";
import {LOGIN_REQUEST, redux_signup_failure, SIGNUP_REQUEST} from './ducksReducer';
import {loginRequest, signupRequest} from '../service/api/apiCall';
import {USER_DATA, SINGUP_DATA} from '../service/types';

const {USER_EMAIL, USER_PASSWORD} = USER_DATA;
const {FIRST_NAME, LAST_NAME, EMAIL, PASSWORD} = SINGUP_DATA;

// const addDelay = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(null);
//     }, 2000)
//   })
// }

function* sagaLoginFunc(action) {

  const allReducerVar = yield select();
  console.log(allReducerVar.ducksReducer.userInput[USER_EMAIL]);
  console.log(allReducerVar.ducksReducer.userInput[USER_PASSWORD]);

  try {
    // yield addDelay();

    const res = yield loginRequest({
      userEmail: allReducerVar.ducksReducer.userInput[USER_EMAIL]
      , userPw: allReducerVar.ducksReducer.userInput[USER_PASSWORD]
    });
    // if(res.access_token) {
    //   sessionStorage.setItem('accessToken', res.access_token);
    //   yield put(redux_login_process_success({ message : 'Success Get Access Token' }));
    //   action.payload.history.push('/'); // action.payload -> history object
    // } else {
    //   yield put(redux_login_process_failure({ message: 'Unsuccess Get Access Token' }));
    // }
  } catch (err) {
    // yield put(redux_login_process_failure({ message : 'GET ACCESSTOKEN API Try-Catch Error' }));
  }
}

function* sagaSignUpFunc(action) {

  const allReducerVar = yield select();

  try {
    const res = yield signupRequest({
      firstname: allReducerVar.ducksReducer.signupInput[FIRST_NAME]
      , lastname: allReducerVar.ducksReducer.signupInput[LAST_NAME]
      , email: allReducerVar.ducksReducer.signupInput[EMAIL]
      , password: allReducerVar.ducksReducer.signupInput[PASSWORD]
    });
  } catch (err) {
    yield put(redux_signup_failure({ message: 'SIGNUP API Try-Catch Error'}));
  }
}

export function* requestSagaWatcher() {
  yield takeEvery(LOGIN_REQUEST, sagaLoginFunc);
  yield takeEvery(SIGNUP_REQUEST, sagaSignUpFunc);
};