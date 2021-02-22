export enum AlbumActionTypes {
  CHANGE_CURRENT_ALBUM = 'album/CHANGE_CURRENT_ALBUM',
  CHANGE_LOADING = 'album/CHANGE_LOADING',
  CHANGE_PULL_UP_LOADING = 'album/CHANGE_PULL_UP_LOADING',
}

export type AlbumAction =
  | { type: AlbumActionTypes.CHANGE_CURRENT_ALBUM; data: any }
  | { type: AlbumActionTypes.CHANGE_LOADING; data: boolean }
  | { type: AlbumActionTypes.CHANGE_PULL_UP_LOADING; data: boolean };

export type ITrueOrFalse = 0 | 1;
export type IGender = 0 | 1 | 2;
export type IAvatarDetail = {
  userType: number;
  identityLevel: number;
  identityIconUrl: string;
};

export type IAlbumDetail =
  | {
      accountStatus: number;
      anchor: boolean;
      authStatus: ITrueOrFalse;
      authenticationTypes: number;
      authority: ITrueOrFalse;
      // {}
      avatarDetail: IAvatarDetail;
      avatarImgId: number;
      avatarImgIdStr: string;
      avatarImgId_str: string;
      avatarUrl: string;
      backgroundImgId: number;
      backgroundImgIdStr: string;
      backgroundUrl: string;
      birthday: number;
      city: number;
      defaultAvatar: boolean;
      description: string;
      detailDescription: string;
      djStatus: ITrueOrFalse;
      expertTags: string[];
      experts: string;
      followed: boolean;
      gender: IGender;
      mutual: boolean;
      nickname: string;
      province: number;
      remarkName?: string;
      signature: string;
      userId: number;
      userType: number;
      vipType: ITrueOrFalse;
    }
  | {};

export type ICurrentAlbum = {
  adType: number;
  backgroundCoverId: number;
  backgroundCoverUrl: string;
  cloudTrackCount: number;
  commentCount: number;
  commentThreadId: string;
  coverImgId: number;
  coverImgId_str: string;
  coverImgUrl: string;
  createTime: number;
  //{defaultAvatar: false, province: 410000, authStatus: 1, followed: false,…}
  creator: any;
  description: string;
  englishTitle: null;
  highQuality: false;
  id: number;
  name: string;
  newImported: false;
  opRecommend: false;
  ordered: true;
  playCount: number;
  privacy: number;
  shareCount: number;
  specialType: number;
  status: number;
  subscribed: false;
  subscribedCount: number;
  subscribers: any;
  tags: string[];
  // titleImage: any;
  // titleImageUrl: null
  // trackCount: 95
  // trackIds: [{id: 1450630238, v: 4, at: 1609641834531, alg: null},…]
  // trackNumberUpdateTime: 1611472061522
  // trackUpdateTime: 1613194957844
  // tracks: [{name: "收敛（吉他 治愈版）（翻自 不够）", id: 1450630238, pst: 0, t: 0,…},…]
  // updateFrequency: null
  //   [key: string]: any;
};

export interface AlbumState {
  currentAlbum: any;
  pullUpLoading: boolean;
  loading: boolean;
  startIndex: number;
  totalCount: number;
  scrollY: number;
}
