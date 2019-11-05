import { axiosInstance } from "./request";


export const loginByPhoneRequest = (phone: number, password: string) => {
  return axiosInstance.get(
    `/login/cellphone?phone=${phone}&password=${password}`
  );
};

export const sentVcodeRequest = (phone: number) => {
  return axiosInstance.get(`/captcha/sent?phone=${phone}`);
};

export const loginByVcodeRequest = (phone: number, vcode: string) => {
  return axiosInstance.get(`/captcha/verify?phone=${phone}&captcha=${vcode}`);
};