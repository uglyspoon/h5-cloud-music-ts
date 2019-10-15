import React, { useState, useEffect } from 'react';
import { SongList, SongItem } from './styles';
import { getName } from 'utils/index';
import { ONE_PAGE_COUNT } from 'utils/config';
import { connect } from 'react-redux';
import {
  changePlayList,
  changeCurrentIndex,
  changeSequencePlayList,
} from 'containers/Player/store/actionCreators';

interface SongListProps {
  songs: any;
  collectCount: number;
  showCollect?: boolean;
  loading?: boolean;
  usePageSplit?: boolean;
  musicAnimation?: any;
  changePlayListDispatch: any;
  changeCurrentIndexDispatch: any;
  changeSequencePlayListDispatch: any;
  showBackground?: boolean;
}
const SongsList = React.forwardRef((props: SongListProps, refs) => {
  const [startIndex, setStartIndex] = useState(0);

  const {
    songs = [],
    collectCount,
    showCollect = true,
    loading = false,
    usePageSplit = false,
    showBackground = false,
  } = props;

  const { musicAnimation } = props;

  const {
    changePlayListDispatch,
    changeCurrentIndexDispatch,
    changeSequencePlayListDispatch,
  } = props;
  const totalCount = songs.length;

  useEffect(() => {
    if (!loading) return;
    if (startIndex + 1 + ONE_PAGE_COUNT >= totalCount) return;
    setStartIndex(startIndex + ONE_PAGE_COUNT);
  }, [loading, startIndex, totalCount]);

  const selectItem = (e: any, index: number) => {
    changePlayListDispatch(songs);
    changeSequencePlayListDispatch(songs);
    changeCurrentIndexDispatch(index);
    musicAnimation(e.nativeEvent.clientX, e.nativeEvent.clientY);
  };

  let songList = (list: any[]) => {
    let res = [];
    // 判断页数是否超过总数
    let end = usePageSplit ? startIndex + ONE_PAGE_COUNT : list.length;
    for (let i = 0; i < end; i++) {
      if (i >= list.length) break;
      let item = list[i];
      res.push(
        <li key={item.id} onClick={e => selectItem(e, i)}>
          <span className='index'>{i + 1}</span>
          <div className='info'>
            <span>{item.name}</span>
            <span>
              {item.ar ? getName(item.ar) : getName(item.artists)} -{' '}
              {item.al ? item.al.name : item.album.name}
            </span>
          </div>
        </li>
      );
    }
    return res;
  };

  const collect = (count: number) => {
    return (
      <div className='add_list'>
        <i className='iconfont'>&#xe600;</i>
        <span>收藏({Math.floor(count / 1000) / 10}万)</span>
      </div>
      // <div className="isCollected">
      //   <span>已收藏({Math.floor(count/1000)/10}万)</span>
      // </div>
    );
  };
  return (
    <SongList ref={refs as any} showBackground={showBackground}>
      <div className='first_line'>
        <div className='play_all' onClick={e => selectItem(e, 0)}>
          <i className='iconfont'>&#xe73d;</i>
          <span>
            播放全部 <span className='sum'>(共{totalCount}首)</span>
          </span>
        </div>
        {showCollect ? collect(collectCount) : null}
      </div>
      <SongItem>{songList(songs)}</SongItem>
    </SongList>
  );
});

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state: any) => ({
  fullScreen: state.player.fullScreen,
  playing: state.player.playing,
  currentSong: state.player.currentSong,
  scrollY: state.player.scrollY,
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch: any) => {
  return {
    changePlayListDispatch(data: any) {
      dispatch(changePlayList(data));
    },
    changeCurrentIndexDispatch(data: any) {
      dispatch(changeCurrentIndex(data));
    },
    changeSequencePlayListDispatch(data: any) {
      dispatch(changeSequencePlayList(data));
    },
  };
};

// 将ui组件包装成容器组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(SongsList));
