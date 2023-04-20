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
}

export default new ProductDetailsApi();
