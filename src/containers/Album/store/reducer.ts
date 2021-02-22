import { produce } from 'immer';
import { AlbumAction, AlbumState, AlbumActionTypes } from '../types';

const defaultState: AlbumState = {
  currentAlbum: {},
  pullUpLoading: false,
  loading: false,
  startIndex: 0,
  totalCount: 0,
  scrollY: 0,
};

export default (
  state: AlbumState = defaultState,
  action: AlbumAction
): AlbumState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case AlbumActionTypes.CHANGE_CURRENT_ALBUM:
        draft.currentAlbum = action.data;
        break;
      case AlbumActionTypes.CHANGE_LOADING:
        draft.loading = action.data;
        break;
      case AlbumActionTypes.CHANGE_PULL_UP_LOADING:
        draft.pullUpLoading = action.data;
        break;
      default:
        return state;
    }
  });
};
