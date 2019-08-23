import React, { useRef, useEffect, useState} from 'react';
import { withRouter, RouteComponentProps, RouteProps,  } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { connect } from "react-redux";

import { Container } from './styles';
import Header from 'components/Header';
import Scroll from 'components/Scroll';
import style from 'assets/globalStyle';
import { HEADER_HEIGHT } from 'utils/config';
import { RouteConfigComponentProps } from 'react-router-config';


interface AlbumProps extends RouteConfigComponentProps{
  currentAlbum: any;
  loading: boolean;
  pullUpLoading: boolean;
  getAlbumDataDispatch: any;
  changePullUpLoadingStateDispatch: any;
  history: any;
  match: any;
}

const Album: React.FC<AlbumProps> = ({
  history,
  match,
  currentAlbum,
  loading,
  pullUpLoading,
  getAlbumDataDispatch,
  changePullUpLoadingStateDispatch
}) => {
  const [title, setTitle] = useState('歌单');
  const headerEl = useRef();
  const handleBack = () => history.goBack()
  const [isMarquee, setIsMarquee] = useState(false);
  const { params: { id } } = match;

  const handleScroll = (pos:any) => {
    let minScrollY = -HEADER_HEIGHT;
    let percent = Math.abs(pos.y/minScrollY);
    let headerDom:any = headerEl.current;
    // props.changeScrollYDispatch(pos.);
    if(pos.y < minScrollY && headerDom) {
      headerDom.style.backgroundColor = style["theme-color"];
      headerDom.style.opacity = Math.min(1, (percent-1)/2);
      setTitle(currentAlbum.name);
      setIsMarquee(true);
    } else{
      headerDom.style.backgroundColor = "";
      headerDom.style.opacity = 1;
      setTitle("歌单");
      setIsMarquee(false);
    }
  };

  const handlePullUp = () => {
    changePullUpLoadingStateDispatch(true);
    changePullUpLoadingStateDispatch(false);
  };

  return (
    <CSSTransition
      in={true}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={handleBack}
    >
      <Container >
        <Header ref={headerEl} title={title} handleClick={handleBack} isMarquee={isMarquee}></Header>
        <Scroll
          onScroll={(pos:any) => handleScroll(pos)}
          pullUp={() => handlePullUp()}
          pullUpLoading={pullUpLoading}
          bounceTop={false}
        >
          {/* <AlbumDetail currentAlbum={currentAlbum} pullUpLoading={pullUpLoading} musicAnimation={musicAnimation}></AlbumDetail> */}
          123
        </Scroll>
      </Container>
    </CSSTransition>
  )
};


export default connect()(React.memo(withRouter(Album)));
