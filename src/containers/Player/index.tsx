import React, { useRef, useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  MiniPlayer,
  NormalPlayer,
  Top,
  Middle,
  Bottom,
  ProgressWrapper,
  Operators,
  CDWrapper,
  LyricWrapper,
} from './styles';
import { CSSTransition } from 'react-transition-group';
import ProgressCircle from 'components/ProgressCircle';
import {
  changePlayingState,
  // changeFullScreen,
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changePlayMode,
  getSongLyric,
} from './store/actionCreators';
import {
  getName,
  isEmptyObject,
  shuffle,
  findIndex,
  prefixStyle,
  formatPlayTime,
} from 'utils';
import animations from 'create-keyframe-animation';
import ProgressBar from 'components/ProgressBar';
import PlayList from './PlayList';
import { playMode } from 'utils/config';
import Toast from 'components/Toast';
import moment from 'moment';
import Scroll from 'components/Scroll';

interface iLyricItemProps {
  time: any;
  lyric: string;
}

function formatTimeToMillionSeconds(time: string) {
  let formatTime = moment(time, 'mm:ss:SSS');
  let min = formatTime.get('minutes');
  let seconds = formatTime.get('seconds');
  let millionSec = formatTime.get('milliseconds');
  return min * 60 + seconds * 1 + millionSec / 1000;
}
function findIndexOfLyric(array: iLyricItemProps[], time: number): number {
  // array.forEach((item, idx)=> {
  //   if (item.time > time) {
  //     return idx
  //   }
  // })
  return array.findIndex(item => item.time > time);
}
function Player(props: any) {
  const [full, setFull] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [songReady, setSongReady] = useState(true);
  const [modeText, setModeText] = useState('');
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  const {
    playing,
    currentSong,
    currentIndex,
    playList,
    mode,
    sequencePlayList,
    lyrics,
  } = props;

  const {
    togglePlayingDispatch,
    togglePlayListDispatch,
    changeCurrentIndexDispatch,
    changeCurrentDispatch,
    changePlayListDispatch,
    changeModeDispatch,
  } = props;

  const cdWrapperRef = useRef<HTMLDivElement>();
  const lyricWrapperRef = useRef<HTMLDivElement>();
  const cdImageRef = useRef<HTMLImageElement>();
  const miniWrapperRef = useRef<HTMLDivElement>();
  const miniImageRef = useRef<HTMLImageElement>();
  const scrollRef = useRef<any>();
  const lyricLineRefs = useRef<HTMLLIElement[]>([]);

  const song = currentSong;

  const [preSong, setPreSong] = useState<any>({});
  const [showLyric, setShowLyric] = useState<boolean>(false);

  //处理transform的浏览器兼容问题
  const transform: any = prefixStyle('transform');

  const audioRef = useRef<HTMLAudioElement>();
  const normalPlayerRef = useRef<HTMLDivElement>();
  const miniPlayerRef = useRef<HTMLDivElement>();
  const toastRef = useRef<any>();
  const [lyricArray, setLyricArray] = useState<iLyricItemProps[]>([]);

  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id
    )
      return;
    if (!songReady) {
      alert('操作过快！');
      return;
    }
    setSongReady(false);
    let current = playList[currentIndex];
    changeCurrentDispatch(current);
    console.log('current123', current);
    setPreSong(current);
    audioRef.current!.src = `https://music.163.com/song/media/outer/url?id=${current.id}.mp3`;
    audioRef.current!.play();
    setTimeout(() => {
      setSongReady(true);
    }, 100);
    togglePlayingDispatch(true);
    setCurrentTime(0);
    setDuration((current.dt / 1000) | 0);
    // eslint-disable-next-line
  }, [currentIndex, playList]);

  useEffect(() => {
    playing ? audioRef.current!.play() : audioRef.current!.pause();
  }, [playing]);

  const currentLyricIndex = findIndexOfLyric(lyricArray, currentTime);
  useEffect(() => {
    // console.log('currentTime', currentTime)
    if (!scrollRef.current) return;
    let bScroll = scrollRef.current.getBScroll();
    console.log('index', currentLyricIndex);
    if (currentLyricIndex > 5) {
      let lineEl = lyricLineRefs.current[currentLyricIndex - 5];
      bScroll.scrollToElement(lineEl, 1000);
    } else {
      bScroll.scrollTo(0, 0, 1000);
    }
    // if (showLyric) {
    //   scrollRef.current!.scrollTo(0, -currentLyricIndex * 25)
    // }
  }, [currentLyricIndex]);

  const sortFunc = useCallback(lyrics => {
    const { lyric, tlyric }: { lyric: string; tlyric: string } = lyrics;
    // console.log('lyric', lyric)
    let lyricArray: iLyricItemProps[] | null = [];
    let tlyricArray: iLyricItemProps[] | null = [];
    let pattern = /\[\d+:\d+.\d+\].*/g;
    if (lyric) {
      // lyricArray = lyric.match(pattern) || []
      let lyricArray_temp = lyric.match(pattern) || [];
      lyricArray = lyricArray_temp.map(item => {
        const ary = item.split(']');
        return {
          time: formatTimeToMillionSeconds(ary[0].slice(1)),
          lyric: ary[1],
        };
      });
    }
    if (tlyric) {
      let tlyricArray_temp = tlyric.match(pattern) || [];
      tlyricArray = tlyricArray_temp.map(item => {
        const ary = item.split(']');
        return { time: ary[0].slice(1), lyric: ary[1] };
      });
    }

    return {
      lyricArray,
      tlyricArray,
    };
  }, []);

  useEffect(() => {
    const { lyricArray, tlyricArray } = sortFunc(lyrics);
    console.log(lyricArray, tlyricArray);
    setLyricArray(lyricArray);
  }, [lyrics, sortFunc]);

  const _getPosAndScale = () => {
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBottom = 30;
    const paddingTop = 80;
    const width = window.innerWidth * 0.8;
    const scale = targetWidth / width;
    // 两个圆心的横坐标距离和纵坐标距离
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
    return {
      x,
      y,
      scale,
    };
  };

  const enter = () => {
    normalPlayerRef.current!.style.display = 'block';
    const { x, y, scale } = _getPosAndScale();
    let animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`,
      },
      60: {
        transform: `translate3d(0, 0, 0) scale(1.1)`,
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`,
      },
    };
    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 400,
        easing: 'linear',
      },
    });
    cdWrapperRef.current &&
      animations.runAnimation(cdWrapperRef.current, 'move');
  };

  const afterEnter = () => {
    const cdWrapperDom = cdWrapperRef.current;
    if (!cdWrapperDom) return;
    animations.unregisterAnimation('move');
    cdWrapperDom.style.animation = '';
  };

  const leave = () => {
    const cdWrapperDom = cdWrapperRef.current;
    if (!cdWrapperDom) {
      return;
    }
    cdWrapperDom.style.transition = 'all 0.4s';
    const { x, y, scale } = _getPosAndScale();
    cdWrapperDom.style[
      transform
    ] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  };

  const afterLeave = () => {
    const cdWrapperDom = cdWrapperRef.current;
    if (cdWrapperDom) {
      cdWrapperDom.style.transition = '';
      cdWrapperDom.style[transform] = '';
    }
    normalPlayerRef.current!.style.display = 'none';
  };

  const clickPlaying = (e: any, state: any) => {
    e.stopPropagation();
    togglePlayingDispatch(state);
  };

  const onProgressChange = (curPercent: any) => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    audioRef.current!.currentTime = newTime;
    if (!playing) {
      togglePlayingDispatch(true);
    }
  };

  const updateTime = (e: any) => {
    setCurrentTime(e.target.currentTime);
  };

  const handleLoop = () => {
    audioRef.current!.currentTime = 0;
    changePlayingState(true);
    audioRef.current!.play();
  };

  const handlePrev = () => {
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index === 0) index = playList.length - 1;
    changeCurrentIndexDispatch(index);
  };

  const handleNext = () => {
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length) index = 0;
    changeCurrentIndexDispatch(index);
  };

  const handleEnd = () => {
    if (mode === playMode.loop) {
      handleLoop();
    } else {
      handleNext();
    }
  };

  const getPlayMode = () => {
    let content;
    if (mode === playMode.sequence) {
      content = '&#xe688;';
    } else if (mode === playMode.loop) {
      content = '&#xe636;';
    } else {
      content = '&#xe664;';
    }
    return content;
  };

  const changeMode = () => {
    let newMode = (mode + 1) % 3;
    if (newMode === 0) {
      //顺序模式
      changePlayListDispatch(sequencePlayList);
      let index = findIndex(currentSong, sequencePlayList);
      changeCurrentIndexDispatch(index);
      setModeText('顺序循环');
    } else if (newMode === 1) {
      //单曲循环
      changePlayListDispatch(sequencePlayList);
      setModeText('单曲循环');
    } else if (newMode === 2) {
      //随机播放
      let newList = shuffle(sequencePlayList);
      let index = findIndex(currentSong, newList);
      changePlayListDispatch(newList);
      changeCurrentIndexDispatch(index);
      setModeText('随机播放');
    }
    changeModeDispatch(newMode);
    toastRef.current!.show();
  };
  const handleError = () => {
    console.log('播放出错');
  };
  const toggleShowLyric = () => {
    // cdWrapperRef.current!.style.display = 'none';
    setShowLyric(!showLyric);
    // lyricWrapperRef.current!.style.display='block';
  };
  const normalPlayer = () => {
    const song = currentSong;
    if (isEmptyObject(song)) return;
    return (
      <CSSTransition
        classNames='normal'
        in={full}
        timeout={400}
        mountOnEnter
        onEnter={enter}
        onEntered={afterEnter}
        onExit={leave}
        onExited={afterLeave}
      >
        <NormalPlayer ref={normalPlayerRef as any}>
          <div className='background'>
            <img
              src={song.al.picUrl + '?param=300x300'}
              width='100%'
              height='100%'
              alt='歌曲图片'
            />
          </div>
          <Top className='top'>
            <div className='back' onClick={() => setFull(false)}>
              <i className='iconfont icon-back'>&#xe6b4;</i>
            </div>
            <h1 className='title'>{song.name}</h1>
            <h1 className='subtitle'>{getName(song.ar)}</h1>
          </Top>
          <Middle onClick={toggleShowLyric}>
            {showLyric ? (
              <LyricWrapper
                ref={lyricWrapperRef as any}
                className='lyricContainer'
              >
                <Scroll ref={scrollRef as any}>
                  <div>
                    {lyricArray.map((el: iLyricItemProps, idx) => (
                      <li
                        className={
                          idx !== lyricArray.length - 1 &&
                          currentTime < lyricArray[idx + 1].time &&
                          el.time < currentTime
                            ? 'current'
                            : ''
                        }
                        key={`${el.time}_${idx}`}
                        ref={(el: any) => lyricLineRefs.current.push(el)}
                      >
                        {el.lyric}
                      </li>
                    ))}
                  </div>
                </Scroll>
              </LyricWrapper>
            ) : (
              <div className='cdContainer'>
                <CDWrapper ref={cdWrapperRef as any}>
                  <div className='cd'>
                    <img
                      ref={cdImageRef as any}
                      className={`image play ${playing ? '' : 'pause'}`}
                      src={song.al.picUrl + '?param=400x400'}
                      alt=''
                    />
                  </div>
                </CDWrapper>
              </div>
            )}
          </Middle>
          <Bottom className='bottom'>
            <ProgressWrapper>
              <span className='time time-l'>{formatPlayTime(currentTime)}</span>
              <div className='progress-bar-wrapper'>
                <ProgressBar
                  percent={percent}
                  percentChange={onProgressChange}
                ></ProgressBar>
              </div>
              <div className='time time-r'>{formatPlayTime(duration)}</div>
            </ProgressWrapper>
            <Operators>
              <div className='icon i-left' onClick={changeMode}>
                <i
                  className='iconfont'
                  dangerouslySetInnerHTML={{ __html: getPlayMode() }}
                ></i>
              </div>
              <div className='icon i-left' onClick={handlePrev}>
                <i className='iconfont'>&#xec1c;</i>
              </div>
              <div className='icon i-center'>
                <i
                  className='iconfont'
                  onClick={e => clickPlaying(e, !playing)}
                  dangerouslySetInnerHTML={{
                    __html: playing ? '&#xe609;' : '&#xe654;',
                  }}
                ></i>
              </div>
              <div className='icon i-right' onClick={handleNext}>
                <i className='iconfont'>&#xec1d;</i>
              </div>
              <div
                className='icon i-right'
                onClick={() => togglePlayListDispatch(true)}
              >
                <i className='iconfont'>&#xe669;</i>
              </div>
            </Operators>
          </Bottom>
          <Toast text={modeText} ref={toastRef}></Toast>
        </NormalPlayer>
      </CSSTransition>
    );
  };

  const miniPlayer = () => {
    if (isEmptyObject(song)) return;
    return (
      <CSSTransition
        in={!full}
        timeout={400}
        classNames='mini'
        onEnter={() => (miniPlayerRef.current!.style.display = 'flex')}
        onExited={() => (miniPlayerRef.current!.style.display = 'none')}
      >
        <MiniPlayer ref={miniPlayerRef as any} onClick={e => setFull(true)}>
          <div className='icon'>
            <div className='imgWrapper' ref={miniWrapperRef as any}>
              <img
                className={`play ${playing ? '' : 'pause'}`}
                ref={miniImageRef as any}
                src={song.al.picUrl}
                width='40'
                height='40'
                alt='img'
              />
            </div>
          </div>
          <div className='text'>
            <h2 className='name'>{song.name}</h2>
            <p className='desc'>{getName(song.ar)}</p>
          </div>
          <div className='control'>
            <ProgressCircle radius={32} percent={percent}>
              {playing ? (
                <i
                  className='icon-mini iconfont icon-pause'
                  onClick={e => clickPlaying(e, false)}
                >
                  &#xe609;
                </i>
              ) : (
                <i
                  className='icon-mini iconfont icon-play'
                  onClick={e => clickPlaying(e, true)}
                >
                  &#xe654;
                </i>
              )}
            </ProgressCircle>
          </div>
          <div
            className='control'
            onClick={e => {
              togglePlayListDispatch(true);
              e.stopPropagation();
            }}
          >
            <i className='iconfont'>&#xe669;</i>
          </div>
        </MiniPlayer>
      </CSSTransition>
    );
  };

  return (
    <div>
      {normalPlayer()}
      {miniPlayer()}
      <PlayList></PlayList>
      <audio
        ref={audioRef as any}
        onTimeUpdate={updateTime}
        onEnded={handleEnd}
        onError={handleError}
      ></audio>
    </div>
  );
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state: any) => ({
  fullScreen: state.player.fullScreen,
  playing: state.player.playing,
  currentSong: state.player.currentSong,
  showPlayList: state.player.showPlayList,
  mode: state.player.mode,
  currentIndex: state.player.currentIndex,
  playList: state.player.playList,
  sequencePlayList: state.player.sequencePlayList,
  lyrics: state.player.lyrics,
});

// 映射dispatch到props上
const mapDispatchToProps = (dispatch: any) => {
  return {
    togglePlayingDispatch(data: any) {
      dispatch(changePlayingState(data));
    },
    togglePlayListDispatch(data: any) {
      dispatch(changeShowPlayList(data));
    },
    changeCurrentIndexDispatch(index: any) {
      dispatch(changeCurrentIndex(index));
    },
    changeCurrentDispatch(data: any) {
      dispatch(changeCurrentSong(data));
      dispatch(getSongLyric(data.id));
    },
    changeModeDispatch(data: any) {
      dispatch(changePlayMode(data));
    },
    changePlayListDispatch(data: any) {
      dispatch(changePlayList(data));
    },
  };
};

// 将ui组件包装成容器组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Player));
