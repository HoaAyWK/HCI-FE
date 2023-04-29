import axiosClient from './axios/axiosClient';

class CommentApi {
  getByProduct = (id) => {
    const url = `/comment/product/${id}`;

    return axiosClient.get(url);
  };

  create = (data) => {
    const url = '/comment/api';

    return axiosClient.post(url, data);
  }
};

export default new CommentApi;
