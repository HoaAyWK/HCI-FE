export const STATUS = Object.freeze({
  PAID: 'Paid',
  PROCESSING: 'Processing',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled'
});

export const ORDER_STATUS = Object.freeze([
  STATUS.PAID,
  STATUS.PROCESSING,
  STATUS.DELIVERED,
  STATUS.CANCELLED
]);
