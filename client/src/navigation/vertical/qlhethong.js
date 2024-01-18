// ** Icons Import
import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Shield, Database, Settings, Users, Trello } from 'react-feather'

export default [
  {
    header: 'Quản lý hệ thống'
  },
  {
    id: 'nhomnguoidung',
    title: 'Nhóm người dùng',
    icon: <Users size={20} />,
    navLink: '/QLHeThong/NhomNguoiDung',
    action: 'read',
    resource: 'nhomnguoidung'
  },
  // {
  //   id: 'phanquyen',
  //   title: 'Phân quyền',
  //   icon: <Trello size={20} />,
  //   navLink: '/QLHeThong/PhanQuyen',
  //   action: 'read',
  //   resource: 'phanquyen'
  // },
  {
    id: 'nguoidung',
    title: 'Người dùng',
    icon: <User size={20} />,
    navLink: '/QLHeThong/NguoiDung',
    action: 'read',
    resource: 'phanquyen'
  },
  {
    id: 'cauhinhhethong',
    title: 'Cấu hình hệ thống',
    icon: <Settings size={20} />,
    navLink: '/QLHeThong/CauHinhHeThong',
    action: 'read',
    resource: 'cauhinhhethong'
  }
]
