import axiosClient from './axios';

class ProductOriginApi {
  getAll = () => {
    const url = '/product/api';

    return axiosClient.get(url);
  };

  create = (data) => {
    const url = '/product/api'

    return axiosClient.post(url, data);
  };

  update = (data) => {
    const url = '/product/api';

    return axiosClient.put(url, data);
  };

  delete = (id) => {
    const url = `/product/api/${id}`;

    return axiosClient.delete(url, id);
  };
}

export default new ProductOriginApi();