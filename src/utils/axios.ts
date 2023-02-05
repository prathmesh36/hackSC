import axios, {AxiosRequestConfig} from 'axios';
import store from '@store/store';
import {logoutUser} from '@store/reducers/auth';

const BASE_URL = `https://3b5f-104-32-178-78.ngrok.io`
const intance = axios.create({
  baseURL: BASE_URL
});

// intance.interceptors.request.use(
//   (request: AxiosRequestConfig<any>) => {
//     const {token} = store.getState().auth;
//     if (token) {
//       request.headers = {...request.headers, Authorization: `Bearer ${token}`};
//     }
//     return request;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// intance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.data.status === 401) {
//       store.dispatch(logoutUser());
//     }
//     return Promise.reject(error);
//   }
// );

export default intance;
