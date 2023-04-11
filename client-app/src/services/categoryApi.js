import axiosClient from './axios';

class CategoryApi {
  getAll = () => {
    const url = '/categories';

    return axiosClient.get(url);
  };

  create = (data) => {
    const url = '/categories';

    return axiosClient.post(url, data);
  };

  update = (id, data) => {
    const url = `/categories/${id}`;

    return axiosClient.put(url, data);
  };

  delete = (id) => {
    const url = `/categoires/${id}`;

    return axiosClient.delete(url);
  };
};

export default new CategoryApi();
