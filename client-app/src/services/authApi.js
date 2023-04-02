import axiosClient from './axios';

class AuthApi {
  login = (data) => {
    const url = '/login';
    return axiosClient.post(url, data);
  };

  register = (data) => {
    const url = '/register';
    return axiosClient.post(url, data);
  };

  getCurrentUserInfo = () => {
    const url = '/profile';
    return axiosClient.get(url);
  };
}

const authApi = new AuthApi();

export default authApi;
