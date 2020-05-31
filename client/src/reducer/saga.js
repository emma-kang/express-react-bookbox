// import { takeEvery, put, select } from "redux-saga/effects";
// import { LOGIN_PROCESS_REQUEST, redux_login_process_success, redux_login_process_failure,
//   GET_DATA_REQUEST, redux_get_data_success, redux_get_data_failure } from './ducksReducer';
// import { getAccessToken, getData } from '../service/api/apiCall';
// import { USER } from '../service/types';

// const { USER_ID, USER_PW } = USER;

// const addDelay = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(null);
//     }, 2000)
//   })
// }

// function* sagaGetAccessToken(action){

//   const allReducerVar = yield select();
//   console.log(allReducerVar.ducksReducer.userData[USER_ID]);
//   console.log(allReducerVar.ducksReducer.userData[USER_PW]);

//   try{
//     yield addDelay();

//     const res = yield getAccessToken({ userId : allReducerVar.ducksReducer.userData[USER_ID], userPw : allReducerVar.ducksReducer.userData[USER_PW] });
//     console.log(res);
//     if(res.access_token) {
//       sessionStorage.setItem('accessToken', res.access_token);
//       yield put(redux_login_process_success({ message : 'Success Get Access Token' }));
//       action.payload.history.push('/'); // action.payload -> history object
//     } else {
//       yield put(redux_login_process_failure({ message: 'Unsuccess Get Access Token' }));
//     }
//   }
//   catch(err){
//     yield put(redux_login_process_failure({ message : 'GET ACCESSTOKEN API Try-Catch Error' }));
//   }
// }

// function* sagaGetData(action){

//   const accessToken = sessionStorage.getItem('accessToken');
  
//   try{
//     const res = yield getData({ accessToken : accessToken });
//     console.log(res);

//     if(res.resultStatus === 200){
//       yield put(redux_get_data_success({ message : 'Success call api', result : res.value }));
//     } else{
//       yield put(redux_get_data_failure({ message : 'Unsuccess call api', result : null }));
//     }
//   }
//   catch(err){
//     yield put(redux_get_data_failure({ message : 'GET DATA Try-Catch Error' }));
//   }
// }

export function* requestSagaWatcher(){
  // yield takeEvery(LOGIN_PROCESS_REQUEST, sagaGetAccessToken);
  // yield takeEvery(GET_DATA_REQUEST, sagaGetData);
};