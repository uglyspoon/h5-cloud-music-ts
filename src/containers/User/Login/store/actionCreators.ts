import {
  loginByPhoneRequest,
  sentVcodeRequest,
  loginByVcodeRequest
} from "utils/api";

import {
  CHANGE_USER_INFO,
  CHANGE_SENT_STATUS,
  CHANGE_LOGIN_STATUS
} from "./constants";

export const saveUserInfo = (data: any) => ({
  type: CHANGE_USER_INFO,
  data
});

export const saveSentStatus = (data: any) => ({
  type: CHANGE_SENT_STATUS,
  data
});

export const saveLoginStatus = (data: any) => ({
  type: CHANGE_LOGIN_STATUS,
  data
});

export const loginByPhone = (phone: number, password: string) => {
  return (dispatch: any) => {
    loginByPhoneRequest(phone, password)
      .then(res => {
        dispatch(saveUserInfo(res));
      })
      .catch(() => {
        console.log("登录失败！");
      });
  };
};

export const loginByVcode = (phone: number, vcode: string) => {
  return (dispatch: any) => {
    loginByVcodeRequest(phone, vcode)
      .then((res: any) => {
        if (res.code === 200) {
          dispatch(saveUserInfo(res));
          dispatch(saveLoginStatus(true));
        }
      })
      .catch(() => {
        console.log("登录失败！");
      });
  };
};

export const sentVcode = (phone: number) => {
  return (dispatch: any) => {
    sentVcodeRequest(phone)
      .then((res: any) => {
        if (res.code === 200) {
          dispatch(saveSentStatus(true));
        }
      })
      .catch(() => {
        console.log("请求失败！");
      });
  };
};
