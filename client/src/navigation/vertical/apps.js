// ** Icons Import
import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Shield, Home, Database } from 'react-feather'

export default [
  // {
  //   header: 'Apps & Pages'
  // },
  {
    id: 'homepages',
    title: 'Trang chủ',
    icon: <Home size={20} />,
    navLink: '/dashboard/ecommerce',
    action: 'read',
    resource: 'homepages'
  },
  {
    id: 'dottuyensinh',
    title: 'Đợt tuyển sinh',
    icon: <Database size={20} />,
    navLink: '/QLHeThong/DotTuyenSinh',
    action: 'read',
    resource: 'dottuyensinh'
  },
  // {
  //   id: 'chat',
  //   title: 'Chat',
  //   icon: <MessageSquare size={20} />,
  //   navLink: '/apps/chat'
  // },
  // {
  //   id: 'todo',
  //   title: 'Todo',
  //   icon: <CheckSquare size={20} />,
  //   navLink: '/apps/todo'
  // },
  // {
  //   id: 'calendar',
  //   title: 'Calendar',
  //   icon: <Calendar size={20} />,
  //   navLink: '/apps/calendar'
  // },
  // {
  //   id: 'kanban',
  //   title: 'Kanban',
  //   icon: <CheckSquare size={20} />,
  //   navLink: '/apps/kanban'
  // },

  // {
  //   id: 'roles-permissions',
  //   title: 'Roles & Permissions',
  //   icon: <Shield size={20} />,
  //   children: [
  //     {
  //       id: 'roles',
  //       title: 'Roles',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/roles'
  //     },
  //     {
  //       id: 'permissions',
  //       title: 'Permissions',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/permissions'
  //     }
  //   ]
  // },
  // {
  //   id: 'eCommerce',
  //   title: 'eCommerce',
  //   icon: <ShoppingCart size={20} />,
  //   children: [
  //     {
  //       id: 'shop',
  //       title: 'Shop',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/shop'
  //     },
  //     {
  //       id: 'detail',
  //       title: 'Details',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/product-detail'
  //     },
  //     {
  //       id: 'wishList',
  //       title: 'Wish List',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/wishlist'
  //     },
  //     {
  //       id: 'checkout',
  //       title: 'Checkout',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/checkout'
  //     }
  //   ]
  // },
  // {
  //   id: 'users',
  //   title: 'User',
  //   icon: <User size={20} />,
  //   children: [
  //     {
  //       id: 'list',
  //       title: 'List',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/user/list'
  //     },
  //     {
  //       id: 'view',
  //       title: 'View',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/user/view'
  //     }
  //   ]
  // }
]
