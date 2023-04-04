import { Iconify } from  '../../../components';

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
    {
        title: 'dashboard',
        path: '/admin/dashboard',
        icon: getIcon('ri:dashboard-3-line'),
    },
    {
        title: 'user',
        path: '/admin/users',
        icon: getIcon('eva:people-fill'),
    },
    {
      title: 'product',
      path: '/admin/products',
      icon: getIcon('ant-design:shop-twotone'),
    },
    {
        title: 'category',
        path: '/dashboard/categories',
        icon: getIcon('bxs:category'),
    },
    {
        title: 'brand',
        path: '/admin/brands',
        icon: getIcon('mdi:alpha-a-circle'),
    },
    {
        title: 'order',
        path: '/dashboard/orders',
        icon: getIcon('solar:delivery-bold'),
    },
    {
        title: 'invoice',
        path: '/dashboard/invoices',
        icon: getIcon('arcticons:zoho-invoice'),
    }
];

export default navConfig;
