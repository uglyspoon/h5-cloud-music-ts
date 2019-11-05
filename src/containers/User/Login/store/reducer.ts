import * as actionTypes from "./constants";
import produce from 'immer';

const defaultState = {
  userInfo: {},
  sentStatus: false,
  loginStatus: false
}

export default (state = defaultState, action: { type: any; data: any; }) => {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.CHANGE_USER_INFO:
        draft.userInfo = action.data;
        break;
      case actionTypes.CHANGE_SENT_STATUS:
        draft.sentStatus = action.data;
        break;
      case actionTypes.CHANGE_LOGIN_STATUS:
        draft.loginStatus = action.data;
        break;
    }
  });
};
