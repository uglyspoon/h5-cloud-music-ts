import { SET_CURRENT_SONG, SET_FULL_SCREEN, SET_PLAYING_STATE, SET_SEQUENCE_PLAYLIST, SET_PLAYLIST, SET_PLAY_MODE, SET_CURRENT_INDEX, SET_SHOW_PLAYLIST, DELETE_SONG, INSERT_SONG, SET_CURRENT_LYRICS } from './constants';
import { getSongDetailRequest, getSongLyricRequest } from './services';

export const changeCurrentSong = (data: any) => ({
  type: SET_CURRENT_SONG,
  data
});

export const changeFullScreen = (data: any) => ({
  type: SET_FULL_SCREEN,
  data
});

export const changePlayingState = (data: any) => ({
  type: SET_PLAYING_STATE,
  data
});

export const changeSequencePlayList = (data: any) => ({
  type: SET_SEQUENCE_PLAYLIST,
  data
});

export const changePlayList = (data: any) => ({
  type: SET_PLAYLIST,
  data
});

export const changePlayMode = (data: any) => ({
  type: SET_PLAY_MODE,
  data
});

export const changeCurrentIndex = (data: any) => ({
  type: SET_CURRENT_INDEX,
  data
});

export const changeShowPlayList = (data:any) => ({
  type: SET_SHOW_PLAYLIST,
  data
});

export const insertSong = (data:any) => ({
  type: INSERT_SONG,
  data
});

export const deleteSong = (data:any) => ({
  type: DELETE_SONG,
  data
});

export const changeCurrentLyrics = (data: any) => ({
  type: SET_CURRENT_LYRICS,
  data
});

// const insertSong = (dispatch, getState, song) => {
//   const playList = JSON.parse(JSON.stringify(getState().getIn(['player', 'playList']).toJS()));
//   const sequenceList = JSON.parse(JSON.stringify(getState().getIn(['player', 'sequencePlayList']).toJS()));
//   let currentIndex = getState().getIn(['player', 'currentIndex']);
//   //看看有没有同款
//   let fpIndex = findIndex(song, playList);
//   // 如果是当前歌曲直接不处理
//   if(fpIndex === currentIndex && currentIndex != -1) return;
//   currentIndex++;
//   // 把歌放进去,放到当前播放曲目的下一个位置
//   playList.splice(currentIndex, 0, song);
//   console.log(playList)
//   console.log(currentIndex)
//   console.log(fpIndex)
//   // 如果列表中已经存在要添加的歌
//   if(fpIndex > -1) {
//     if(currentIndex > fpIndex) {
//       playList.splice(fpIndex, 1);
//       currentIndex--;
//     } else {
//       playList.splice(fpIndex+1, 1);
//     }
//   }

//   let sequenceIndex = findIndex(playList[currentIndex], sequenceList) + 1;
//   sequenceList.splice(sequenceIndex, 0, song);
//   let fsIndex = findIndex(song, sequenceList);
//   if(fsIndex > -1) {
//     if(currentIndex > fsIndex) {
//       sequenceList.splice(fsIndex, 1);
//       currentIndex--;
//     } else {
//       sequenceList.splice(fsIndex + 1, 1);
//     }
//   }
//   dispatch(changePlayList(playList));
//   dispatch(changeSequencePlayList(sequenceList));
//   dispatch(changeCurrentIndex(currentIndex));
// }

export const getSongDetail = (id:number) => {
  return (dispatch:any) => {
    getSongDetailRequest(id).then((data:any) => {
      let song = data.songs[0];
      dispatch(insertSong(song));
    })
  }
}

export const getSongLyric = (id: number) => {
  return (dispatch: any) => {
    getSongLyricRequest(id).then((data: any) => {
      
      let lyrics = {
        lyric: data.lrc.lyric,
        tlyric: data.tlyric.lyric
      }
      dispatch(changeCurrentLyrics(lyrics));
    })
  }
}