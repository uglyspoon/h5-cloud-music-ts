import { produce } from 'immer';

import * as actionTypes from './constants';
const defaultState = {
  currentAlbum: {
    creator: {},
  },
  pullUpLoading: false,
  loading: false,
  startIndex: 0,
  totalCount: 0,
  scrollY: 0,
};

export default (state = defaultState, action: any) => {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.CHANGE_CURRENT_ALBUM:
        draft.currentAlbum = action.data;
        break;
      case actionTypes.CHANGE_LOADING:
        draft.loading = action.data;
        break;
    }
  });
};
