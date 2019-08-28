import { combineReducers } from 'redux';
import recommendReducer from '../containers/Recommend/store/reducer';
// import { reducer as singersReducer } from '../application/Singers/store/index';
// import { reducer as rankReducer } from '../application/Rank/store/index';
import albumReducer from '../containers/Album/store/reducer';
// import { reducer as singerInfoReducer } from '../application/Singer/store/index';
import playerReducer from '../containers/Player/store/reducer';
// import { reducer as searchReducer } from '../application/Search/store/index';


export default combineReducers({
  recommend: recommendReducer,
  // singers: singersReducer,
  // rank: rankReducer,
  album: albumReducer,
  // singerInfo: singerInfoReducer,
  player: playerReducer,
  // search: searchReducer,
});
