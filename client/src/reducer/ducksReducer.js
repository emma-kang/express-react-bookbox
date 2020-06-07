import produce from 'immer';
import { USER_DATA } from '../service/types';

const { USER_EMAIL, USER_PASSWORD } = USER_DATA;

export const SET_BOOK = "SET_BOOK";
export const SET_USERINPUT = "SET_USERINPUT";

export const redux_set_book = (bookData) => ({
  type: SET_BOOK, payload: bookData
});

export const redux_set_userinput = (userData) => ({
  type: SET_USERINPUT, payload: userData
})

const initState = {
  bookData: null,

  userInput: {
    [USER_EMAIL] : '',
    [USER_PASSWORD] : ''
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
      default:
        return;
    }
  });
}
