import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Top, Tab, TabItem } from './styles';
import { NavLink } from 'react-router-dom';
import Player from 'containers/Player';

function Home(props: any) {
  const { route } = props;

  return (
    <div>
      <Top>
        <span
          className='iconfont menu'
          onClick={() => alert('用户中心正在开发中，敬请期待:)')}
        >
          &#xe8c9;
        </span>
        <span className='title'>云音悦</span>
        <span
          className='iconfont search'
          onClick={() => props.history.push('/search')}
        >
          &#xe615;
        </span>
      </Top>
      <Tab>
        <NavLink to='/recommend' activeClassName='selected'>
          <TabItem>
            <span>推荐</span>
          </TabItem>
        </NavLink>
        <NavLink to='/singers' activeClassName='selected'>
          <TabItem>
            <span>歌手</span>
          </TabItem>
        </NavLink>
        <NavLink to='/rank' activeClassName='selected'>
          <TabItem>
            <span>排行榜</span>
          </TabItem>
        </NavLink>
      </Tab>
      {renderRoutes(route.routes)}
      <Player />
    </div>
  );
}

export default Home;
