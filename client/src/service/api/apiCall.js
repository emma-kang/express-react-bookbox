// import { API_ADDRESS } from '../types';

// const callFetch = (address, method, body, headers) => {
//   return new Promise((resolve, reject) => {
//     fetch(`${API_ADDRESS}${address}`, {
//       method: method,
//       //withCredentials: true,
//       body: body,
//       headers: {...headers}
//     })
//     .then(res => res.json())
//     .then(res => {
//       resolve(res);
//     })
//     .catch(e => {
//       reject(e);
//     });
//   });
// }

// export const getAccessToken = async ({ userId, userPw }) => {
//   try{
//     const address = '/oauth/token';
//     const body =
//       'grant_type=password' +
//       '&username=' + encodeURIComponent(userId) + 
//       '&password=' + encodeURIComponent(userPw)
    
//     const headers = {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     }
  
//     const res = await callFetch(address, 'POST', body, headers);
//     return res;

//   } catch(e) {
//     console.log('Error in getAccessToken: ', e)
//     return e;
//   }
// };

// export const getData = async ({ accessToken }) => {
//   try{
//     const address = '/api/PetLibrary/List';
//     const headers = {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': 'bearer ' + accessToken
//     }

//     const res = await callFetch(address, 'GET', null, headers);
//     return res;

//   } catch(e) {
//     console.log('Error in getData: ', e)
//     return e;
//   }
// };