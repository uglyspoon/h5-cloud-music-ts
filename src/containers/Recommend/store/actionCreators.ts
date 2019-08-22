import * as actionTypes from './constants';
import request from 'utils/request';

import { RecommendStateType } from './data.d';

export const changeBannerList = (data: RecommendStateType) => ({
  type: actionTypes.CHANGE_BANNER,
  data
})

export const changeRecommendList = (data: RecommendStateType) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data
})

export const changeEnterLoading = (data: boolean) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
})

export const getBannerList = () => {
  return (dispatch: any) => {
    request({
      url: '/banner',
      method: 'get'
    }).then((data:any) => {
      const action = changeBannerList(data.banners);
      dispatch(action);
    }).catch(() => {
      console.log("轮播图数据传输错误");
    })
  }
}
export const getRecommendList = () => {
  return (dispatch: any) => {
    dispatch(changeEnterLoading(true));
    request({
      url: '/personalized',
      method: 'get',
    }).then((data:any) => {
      dispatch(changeRecommendList(data.result));
      dispatch(changeEnterLoading(false));
    }).catch(() => {
      console.log("推荐歌单数据传输错误");
    });
  }
}
