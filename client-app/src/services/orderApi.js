import axiosClient from './axios';

class OrderApi {
  getAll = () => {
    const url = '/orders';

    return axiosClient.get(url);
  };

  create = (data) => {
    const url = '/orders';

    return axiosClient.post(url, data);
  };

  update = (id, data) => {
    const url = `/orders/${id}`;

    return axiosClient.put(url, data);
  };

  delete = (id) => {
    const url = `/orders/${id}`;

    return axiosClient.delete(url);
  };
};

export default new OrderApi();
