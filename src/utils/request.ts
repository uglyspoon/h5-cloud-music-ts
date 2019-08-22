import axios, {AxiosResponse, AxiosRequestConfig} from 'axios';
// import qs from 'qs';
// import { Cookies } from 'react-cookie';
// import { notification } from 'antd';

// const cookie = new Cookies();

axios.defaults.baseURL = 'http://localhost:3300';
// axios.defaults.headers.common['Authorization'] = cookie.get('token');
axios.defaults.headers.post['Content-Type'] = 'application/json';

const handleError = (error:any) => {
  // notification.error({
  //   message: '服务器出错啦～',
  //   description: `状态码:${error.status}| ${error.data.message}`
  // })
}
const request = ({url ,data, method='post', ...rest }: AxiosRequestConfig) => {
  return axios({
    url,
    data,
    method,
    ...rest
  })
  .then(function (response:AxiosResponse) {
    // handle success
    return response;
  })
  .then(function (response:AxiosResponse) {
    if (response.status === 200) {
      return response.data;
    }
  })
  .catch(function (error:any) {
    // handle error
    handleError(error.response)
  })
  .finally(function () {
    // always executed
  });
}

export default request
