import React, { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Scroll from 'components/Scroll';
import {
  PlayListWrapper,
  ListHeader,
  ListContent,
  ScrollWrapper,
} from './styles';
import { connect } from 'react-redux';
import {
  changeShowPlayList,
  changePlayMode,
  deleteSong,
  changeSequencePlayList,
} from '../store/actionCreators';
import { getName, shuffle, findIndex } from 'utils';
import {
  changeCurrentSong,
  changeCurrentIndex,
  changePlayList,
  changePlayingState,
} from './../store/actionCreators';
import { playMode } from 'utils/config';
import { prefixStyle } from 'utils';
import Confirm from 'components/Confirm';

function PlayList(props: any) {
  const [isShow, setIsShow] = useState(false);
  const [canTouch, setCanTouch] = useState(true);
  const [startY, setStartY] = useState(0);
  const [initialed, setInitialed] = useState(false);
  const [distance, setDistance] = useState(0);

  const transform: any = prefixStyle('transform');

  const listContentRef = useRef<HTMLDivElement>();
  const listWrapperRef = useRef<HTMLDivElement>();
  const playListRef = useRef<HTMLDivElement>();
  const confirmRef = useRef<any>();

  const {
    currentIndex,
    currentSong,
    showPlayList,
    playList,
    mode,
    sequencePlayList,
  } = props;
  const {
    togglePlayListDispatch,
    changeCurrentIndexDispatch,
    changePlayListDispatch,
    changeModeDispatch,
    deleteSongDispatch,
    clearDispatch,
  } = props;

  const changeMode = (e: any) => {
    let newMode = (mode + 1) % 3;
    if (newMode === 0) {
      changePlayListDispatch(sequencePlayList);
      let index = findIndex(currentSong, sequencePlayList);
      changeCurrentIndexDispatch(index);
    } else if (newMode === 1) {
      changePlayListDispatch(sequencePlayList);
    } else if (newMode === 2) {
      let newList = shuffle(sequencePlayList);
      let index = findIndex(currentSong, newList);
      changePlayListDispatch(newList);
      changeCurrentIndexDispatch(index);
    }
    changeModeDispatch(newMode);
  };

  const handleChangeCurrentIndex = (index: any) => {
    if (currentIndex === index) return;
    changeCurrentIndexDispatch(index);
  };

  const handleScroll = (pos: any) => {
    let state = pos.y === 0;
    setCanTouch(state);
  };

  const handleTouchStart = (e: any) => {
    if (!canTouch || initialed) return;
    listWrapperRef.current!.style['transition'] = '';
    setStartY(e.nativeEvent.touches[0].pageY);
    setInitialed(true);
  };

  const handleTouchMove = (e: any) => {
    if (!canTouch || !initialed) return;
    let distance = e.nativeEvent.touches[0].pageY - startY;
    if (distance < 0) return;
    setDistance(distance);
    listWrapperRef.current!.style.transform = `translate3d(0, ${distance}px, 0)`;
  };

  const handleTouchEnd = (e: any) => {
    setInitialed(false);
    if (distance >= 150) {
      togglePlayListDispatch(false);
    } else {
      listWrapperRef.current!.style['transition'] = 'all 0.3s';
      listWrapperRef.current!.style[transform] = `translate3d(0px, 0px, 0px)`;
    }
  };

  const handleDeleteSong = (e: any, song: any) => {
    e.stopPropagation();
    deleteSongDispatch(song);
  };

  const handleShowClear = () => {
    confirmRef.current!.show();
  };

  const handleConfirmClear = () => {
    clearDispatch();
  };

  const getFavoriteIcon = (item: any) => {
    return <i className='iconfont'>&#xe603;</i>;
  };

  const getCurrentIcon = (item: any) => {
    const current = currentSong.id === item.id;
    const className = current ? 'icon-play' : '';
    const content = current ? '&#xe73d;' : '';
    return (
      <i
        className={`current iconfont ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      ></i>
    );
  };

  const getPlayMode = () => {
    let content, text;
    if (mode === playMode.sequence) {
      content = '&#xe688;';
      text = '顺序播放';
    } else if (mode === playMode.loop) {
      content = '&#xe636;';
      text = '单曲循环';
    } else {
      content = '&#xe664;';
      text = '随机播放';
    }
    return (
      <div>
        <i
          className='iconfont'
          onClick={e => changeMode(e)}
          dangerouslySetInnerHTML={{ __html: content }}
        ></i>
        <span className='text' onClick={e => changeMode(e)}>
          {text}
        </span>
      </div>
    );
  };

  return (
    <CSSTransition
      in={showPlayList}
      timeout={300}
      classNames='list-fade'
      onEnter={() => {
        setIsShow(true);
        listWrapperRef.current!.style[transform] = `translate3d(0, 100%, 0)`;
      }}
      onEntering={() => {
        listWrapperRef.current!.style['transition'] = 'all 0.3s';
        listWrapperRef.current!.style[transform] = `translate3d(0, 0, 0)`;
      }}
      onExit={() => {
        listWrapperRef.current!.style[
          transform
        ] = `translate3d(0, ${distance}px, 0)`;
      }}
      onExiting={() => {
        listWrapperRef.current!.style['transition'] = 'all 0.3s';
        listWrapperRef.current!.style[
          transform
        ] = `translate3d(0px, 100%, 0px)`;
      }}
      onExited={() => {
        setIsShow(false);
        listWrapperRef.current!.style[
          transform
        ] = `translate3d(0px, 100%, 0px)`;
      }}
    >
      <PlayListWrapper
        ref={playListRef as any}
        style={isShow === true ? { display: 'block' } : { display: 'none' }}
        onClick={() => togglePlayListDispatch(false)}
      >
        <div
          className='list_wrapper'
          ref={listWrapperRef as any}
          onClick={e => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ListHeader>
            <h1 className='title'>
              {getPlayMode()}
              <span className='iconfont clear' onClick={handleShowClear}>
                &#xe713;
              </span>
            </h1>
          </ListHeader>
          <ScrollWrapper>
            <Scroll
              ref={listContentRef}
              onScroll={(pos: any) => handleScroll(pos)}
              bounceTop={false}
            >
              <ListContent>
                {playList.map((item: any, index: number) => {
                  return (
                    <li
                      className='item'
                      key={item.id}
                      onClick={() => handleChangeCurrentIndex(index)}
                    >
                      {getCurrentIcon(item)}
                      <span className='text'>
                        {item.name} - {getName(item.ar)}
                      </span>
                      <span className='like'>{getFavoriteIcon(item)}</span>
                      <span
                        className='delete'
                        onClick={e => handleDeleteSong(e, item)}
                      >
                        <i className='iconfont'>&#xe626;</i>
                      </span>
                    </li>
                  );
                })}
              </ListContent>
            </Scroll>
          </ScrollWrapper>
        </div>
        <Confirm
          ref={confirmRef}
          text={'是否删除全部?'}
          cancelBtnText={'取消'}
          confirmBtnText={'确定'}
          handleConfirm={handleConfirmClear}
        ></Confirm>
      </PlayListWrapper>
    </CSSTransition>
  );
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state: any) => ({
  currentIndex: state.player.currentIndex,
  currentSong: state.player.currentSong,
  playList: state.player.playList,
  sequencePlayList: state.player.sequencePlayList,
  showPlayList: state.player.showPlayList,
  mode: state.player.mode,
});

// 映射dispatch到props上
const mapDispatchToProps = (dispatch: any) => {
  return {
    togglePlayListDispatch(data: any) {
      dispatch(changeShowPlayList(data));
    },
    changeCurrentIndexDispatch(data: any) {
      dispatch(changeCurrentIndex(data));
    },
    changeModeDispatch(data: any) {
      dispatch(changePlayMode(data));
    },
    changePlayListDispatch(data: any) {
      dispatch(changePlayList(data));
    },
    deleteSongDispatch(data: any) {
      dispatch(deleteSong(data));
    },
    clearDispatch() {
      dispatch(changePlayList([]));
      dispatch(changeSequencePlayList([]));
      dispatch(changeCurrentIndex(-1));
      dispatch(changeShowPlayList(false));
      dispatch(changeCurrentSong({}));
      dispatch(changePlayingState(false));
    },
  };
};

// 将ui组件包装成容器组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PlayList));
