import { Iconify } from  '../../../components';

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'GENERAL',
  },
    {
        title: 'dashboard',
        path: '/admin/dashboard',
        icon: getIcon('ri:dashboard-3-line'),
    },
  {
    title: 'MANAGEMENT'
  },
    {
        title: 'user',
        path: '/admin/users',
        icon: getIcon('eva:people-fill'),
        children: [
          {
            title: 'list',
            path: '/admin/users/list',
          },
          {
            title: 'details',
            path: '/admin/users/details'
          },
          {
            title: 'create',
            path: '/admin/users/create'
          }
        ]
    },
    {
      title: 'product',
      path: '/admin/products',
      icon: getIcon('ant-design:shop-twotone'),
      children: [
        {
          title: 'list',
          path: '/admin/products/list'
        },
        {
          title: 'create',
          path: '/admin/products/create'
        },
      ]
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