import produce from 'immer';

const INITIAL_STATE = {
  student: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCESS': {
        draft.student = action.payload.student;
        break;
      }
      case '@auth/SIGN_IN_FAILURE': {
        draft.student = null;
        break;
      }
      default:
    }
  });
}
