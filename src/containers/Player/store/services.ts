import { axiosInstance } from 'utils/request';

export const getSongDetailRequest = (id:number) => {
  return axiosInstance.get(`/song/detail?ids=${id}`);
}

export const getSongLyricRequest = (id: number) => {
  return axiosInstance.get(`/lyric?id=${id}`);
}