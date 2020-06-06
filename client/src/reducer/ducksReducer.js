import produce from 'immer';

export const SET_BOOK = "SET_BOOK";

export const redux_set_book = (bookData) => ({
  type: SET_BOOK, payload: bookData
});

const initState = {
  bookData: null
};

export default function ducksReducer(state = initState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_BOOK:
        draft.bookData = action.payload;
        break;
      default:
        return;
    }
  });
}
