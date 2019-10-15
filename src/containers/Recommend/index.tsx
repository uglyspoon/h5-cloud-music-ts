import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Content } from './styles';
import Slider from 'components/Slider';
import { bannerType } from 'components/Slider';
import {
  renderRoutes,
  RouteConfigComponentProps,
  RouteConfig,
} from 'react-router-config';
import RecommendList from 'components/List';
import { forceCheck } from 'react-lazyload';
import * as actionTypes from './store/actionCreators';
import Scroll from 'components/Scroll';
import { EnterLoading } from 'assets/globalStyle';
import Loading from 'components/Loading/v2';

export type recommendType = {
  name: string;
  id: number;
  picUrl: string;
  playCount: number;
};

interface RecommendProps extends RouteConfig {
  bannerList: bannerType[];
  recommendList: recommendType[];
  enterLoading: boolean;
  getBannerDataDispatch: any;
  getRecommendListDataDispatch: any;
}

const Recommend: React.FC<RecommendProps> = ({
  bannerList,
  recommendList,
  enterLoading,
  getBannerDataDispatch,
  getRecommendListDataDispatch,
  route,
}) => {
  useEffect(() => {
    if (!bannerList.length) {
      getBannerDataDispatch();
    }
    if (!recommendList.length) {
      getRecommendListDataDispatch();
    }
  }, []);
  return (
    <Content>
      <Scroll onScroll={() => forceCheck()}>
        <div>
          <Slider bannerList={bannerList} />
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
      {enterLoading ? (
        <EnterLoading>
          <Loading></Loading>
        </EnterLoading>
      ) : null}
      {renderRoutes(route.routes)}
    </Content>
  );
};

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state: any) => ({
  bannerList: state.recommend.bannerList,
  recommendList: state.recommend.recommendList,
  // songsCount: state.recommend.recommendList,
  enterLoading: state.recommend.enterLoading,
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch: any) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    },
  };
};

// 将ui组件包装成容器组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend));
