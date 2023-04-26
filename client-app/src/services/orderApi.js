import { STATUS } from '../constants/orderStatus';
import axiosClient from './axios';

class OrderApi {
  getAll = () => {
    const url = '/bill/api';

    return axiosClient.get(url);
  };

  getMyBill = (status = STATUS.ALL, num = 5, page = 1) => {
    const url = `/bill/my-bills?status=${status}&num=${num}&page=${page}`;

    return axiosClient.get(url);
  };

  create = (data) => {
    const url = '/bill';

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
