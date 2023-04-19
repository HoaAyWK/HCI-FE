import axiosClient from './axios';

class BannerApi {
  getAll = () => {
    const url = '/banner/show';

    return axiosClient.get(url);
  };

  create = (data) => {
    const url = '/banner/api';

    return axiosClient.post(url, data);
  };
}

export default new BannerApi();
