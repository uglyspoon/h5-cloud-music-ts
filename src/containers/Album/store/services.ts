import { axiosInstance } from 'utils/request';

export const getRecommendListDetailRequest = (id:number) => {
  return axiosInstance.get(`/playlist/detail?id=${id}`)
}