import produce from 'immer';

const initState = {

};

export default function ducksReducer(state = initState, action) {
  return produce(state, (draft) => {
    switch (action.type) {

    }
  });
}
