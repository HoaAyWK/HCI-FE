import axiosClient from './axios';

class ProductReviewApi {
  getProductReviewsByProductId = (id) => {
    const url = `/review/product/${id}`;

    return axiosClient.get(url);
  };

  createrProductReview = (data) => {
    const url = '/review/api';

    return axiosClient.post(url, data);
  };
}

export default new ProductReviewApi();
