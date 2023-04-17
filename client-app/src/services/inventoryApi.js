import axiosClient from './axios';

class InventoryApi {
  getAll = () => {
    const url = '/warehouse/api';

    return axiosClient.get(url);
  };

  update = (id, data) => {
    const url = `/inventories/${id}`;

    return axiosClient.put(url, data);
  };

};

export default new InventoryApi();
