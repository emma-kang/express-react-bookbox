import {API_ADDRESS} from '../types';

const callFetch = (address, method, body, headers) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_ADDRESS}${address}`, {
      method: method,
      //withCredentials: true,
      body: body,
      headers: {...headers}
    })
      .then(res => res.json())
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });
}

export const loginRequest = async ({userEmail, userPw}) => {
  try {
    const address = '/api/users/login';
    const body = {
      "email": userEmail,
      "password": userPw
    };

    const headers = {
      'Content-Type': 'application/json',
    }

    const res = await callFetch(address, 'POST', body, headers);
    return res;

  } catch (e) {
    console.log('Error in getAccessToken: ', e);
    return e;
  }
};

export const signupRequest = async ({firstname, lastname, email, password}) => {
  try {
    const address = '/api/users/signup';
    const body = {
      "firstname": firstname,
      "lastname": lastname,
      "email": email,
      "password": password
    };

    const header = {
      'Content-Type' : 'application/json',
    }

    const res = await callFetch(address, 'POST', body, header);
    return res;

  } catch (e) {
    console.log('Error in requesting signup: ', e);
    return e;
  }
}
