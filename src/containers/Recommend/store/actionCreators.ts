import * as actionTypes from './constants';
import request from 'utils/request';

import { RecommendStateType } from './data.d';


export interface changeBannerListType {
  type: typeof actionTypes.CHANGE_BANNER;
  data: RecommendStateType
}

export interface changeRecommendListType {
  type: typeof actionTypes.CHANGE_RECOMMEND_LIST;
  data: RecommendStateType
}
export interface changeEnterLoadingType {
  type: typeof actionTypes.CHANGE_ENTER_LOADING;
  data: boolean
}

export type RecommendActionTypes = changeBannerListType | changeRecommendListType | changeEnterLoadingType

export const changeBannerList = (data: RecommendStateType): changeBannerListType => ({
  type: actionTypes.CHANGE_BANNER,
  data,
});

export const changeRecommendList = (data: RecommendStateType): changeRecommendListType => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data,
});

export const changeEnterLoading = (data: boolean): changeEnterLoadingType => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data,
});



export const getBannerList = () => {
  return (dispatch: any) => {
    request({
      url: '/banner',
      method: 'get',
    })
      .then((data: any) => {
        const action = changeBannerList(data.banners);
        dispatch(action);
      })
      .catch(() => {
        console.log('轮播图数据传输错误');
      });
  };
};
export const getRecommendList = () => {
  return (dispatch: any) => {
    dispatch(changeEnterLoading(true));
    request({
      url: '/personalized',
      method: 'get',
    })
      .then((data: any) => {
        dispatch(changeRecommendList(data.result));
        dispatch(changeEnterLoading(false));
      })
      .catch(() => {
        console.log('推荐歌单数据传输错误');
      });
  };
};
