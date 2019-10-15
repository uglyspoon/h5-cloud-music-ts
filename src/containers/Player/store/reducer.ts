import * as actionTypes from './constants';
import { playMode } from 'utils/config';
import { findIndex } from 'utils';
import produce from 'immer';

const defaultState = {
  fullScreen: false,
  playing: false,
  sequencePlayList: [],
  playList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  showPlayList: false,
  currentSong: {},
  lyrics: {
    lyric: '',
    tlyric: '',
  },
};

const handleInsertSong = (state: any, song: any) => {
  const playList = JSON.parse(JSON.stringify(state.playList));
  const sequenceList = JSON.parse(JSON.stringify(state.sequencePlayList));
  let currentIndex = state.currentIndex;
  //看看有没有同款
  let fpIndex = findIndex(song, playList);
  // 如果是当前歌曲直接不处理
  if (fpIndex === currentIndex && currentIndex !== -1) return;
  currentIndex++;
  // 把歌放进去,放到当前播放曲目的下一个位置
  playList.splice(currentIndex, 0, song);
  // 如果列表中已经存在要添加的歌
  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      playList.splice(fpIndex, 1);
      currentIndex--;
    } else {
      playList.splice(fpIndex + 1, 1);
    }
  }

  let sequenceIndex = findIndex(playList[currentIndex], sequenceList) + 1;
  let fsIndex = findIndex(song, sequenceList);
  sequenceList.splice(sequenceIndex, 0, song);
  if (fsIndex > -1) {
    if (sequenceIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1);
      sequenceIndex--;
    } else {
      sequenceList.splice(fsIndex + 1, 1);
    }
  }

  state.playList = playList;
  state.sequencePlayList = sequenceList;
  state.currentIndex = currentIndex;
};

const handleDeleteSong = (state: any, song: any) => {
  const playList = JSON.parse(JSON.stringify(state.playList));
  const sequenceList = JSON.parse(JSON.stringify(state.sequencePlayList));
  let currentIndex = state.currentIndex;

  const fpIndex = findIndex(song, playList);
  playList.splice(fpIndex, 1);
  if (fpIndex < currentIndex) currentIndex--;

  const fsIndex = findIndex(song, sequenceList);
  sequenceList.splice(fsIndex, 1);

  state.playList = playList;
  state.sequencePlayList = sequenceList;
  state.currentIndex = currentIndex;
};

export default (state = defaultState, action: any) => {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.SET_CURRENT_SONG:
        draft.currentSong = action.data;
        break;
      case actionTypes.SET_FULL_SCREEN:
        draft.fullScreen = action.data;
        break;
      case actionTypes.SET_PLAYING_STATE:
        draft.playing = action.data;
        break;
      case actionTypes.SET_SEQUENCE_PLAYLIST:
        draft.sequencePlayList = action.data;
        break;
      case actionTypes.SET_PLAYLIST:
        draft.playList = action.data;
        break;
      case actionTypes.SET_PLAY_MODE:
        draft.mode = action.data;
        break;
      case actionTypes.SET_CURRENT_INDEX:
        draft.currentIndex = action.data;
        break;
      case actionTypes.SET_SHOW_PLAYLIST:
        draft.showPlayList = action.data;
        break;
      case actionTypes.INSERT_SONG:
        handleInsertSong(draft, action.data);
        break;
      case actionTypes.DELETE_SONG:
        handleDeleteSong(draft, action.data);
        break;
      case actionTypes.SET_CURRENT_LYRICS:
        draft.lyrics = action.data;
        break;
    }
  });
};
