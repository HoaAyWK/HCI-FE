import axiosClient from './axios/axiosClient';

class CartApi {
  get = () => {
    const url = '/cart';

    return axiosClient.get(url);
  };

  addToCart = (item) => {
    const url = '/cart';

    return axiosClient.put(url, item);
  };

  removeFromCart = (itemId) => {
    const url = '/cart';

    return axiosClient.put(url, itemId);
  };

  decreaseByOne = (itemId) => {
    const url = '/cart';

    return axiosClient.put(url, itemId);
  };
};

export default new CartApi();
