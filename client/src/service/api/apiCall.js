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
    const body = JSON.stringify({
      "email": userEmail,
      "password": userPw
    });

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
    const body = JSON.stringify({
      "email": email,
      "first_name": firstname,
      "last_name": lastname,
      "password": password
    });

    console.log(body);

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
