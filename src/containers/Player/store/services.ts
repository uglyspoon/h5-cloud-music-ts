import { axiosInstance } from 'utils/request';

export const getSongDetailRequest = (id:number) => {
  return axiosInstance.get(`/song/detail?ids=${id}`);
}