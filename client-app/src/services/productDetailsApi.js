import axiosClient from './axios';

class ProductDetailsApi {
  getAll = () => {
    const url = '/detail/show';

    return axiosClient.get(url);
  };

  create = (data) => {
    const url = '/detail/save';

    return axiosClient.post(url, data);
  };

  update = (data) => {
    const url = '/detail/edit';

    return axiosClient.put(url, data);
  };

  getSingle = (id) => {
    const url = `/detail/single/${id}`;

    return axiosClient.get(url);
  }
};

export default new ProductDetailsApi();
