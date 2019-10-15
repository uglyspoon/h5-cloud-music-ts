export interface bannerType {
  imageUrl: string;
  url: string;
}
export interface recommendType {
  name: string;
  picUrl: string;
  trackCount: number;
  playCount: number;
}

export interface RecommendStateType {
  bannerList: bannerType[];
  recommendList: recommendType[];
  enterLoading: boolean;
}
