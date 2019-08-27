import React from 'react';
import { TopDesc, Menu } from './styles';
import SongsList from 'containers/SongList';

export interface AlbumDetailProps {
  currentAlbum: object;
  pullUpLoading: boolean;
  musicAnimation?: boolean;
}
function AlbumDetail(props:any) {
  const { currentAlbum, pullUpLoading, musicAnimation } = props;

  const renderTopDesc = () => {
    return (
      <TopDesc background={currentAlbum.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={currentAlbum.coverImgUrl} alt="" />
          <div className="play_count">
            <i className="iconfont play">&#xe61f;</i>
            <span className="count">{Math.floor(currentAlbum.subscribedCount / 1000) / 10}万</span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.creator.avatarUrl} alt="" />
            </div>
            <div className="name">{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    )
  };

  const renderMenu = () => {
    return (
      <Menu>
        <div>
          <i className="iconfont">&#xe655;</i>
          评论
        </div>
        <div>
          <i className="iconfont">&#xe616;</i>
          点赞
        </div>
        <div>
          <i className="iconfont">&#xeaf8;</i>
          收藏
        </div>
        <div>
          <i className="iconfont">&#xe617;</i>
          更多
        </div>
      </Menu>
    )
  };
  const renderSongList = () => {
    return (
      <SongsList
        songs={currentAlbum.tracks}
        collectCount={currentAlbum.subscribedCount}
        showCollect={true}
        loading={pullUpLoading}
        musicAnimation={musicAnimation}
        showBackground={true}
      ></SongsList>
    )
  };

  return (
    <div>
      {renderTopDesc()}
      {renderMenu()}
      {/* {renderSongList()} */}
    </div>
  )
}
export default React.memo(AlbumDetail);