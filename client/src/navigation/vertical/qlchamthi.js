// ** Icons Import
import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Shield, Database, Layers, Layout, Users, Sliders, File, Edit, Clipboard } from 'react-feather'

export default [
  {
    header: 'Tổ chức chấm thi'
  },
  {
    id: 'thutudontui',
    title: 'Thứ tự đồn túi',
    icon: <FileText size={20} />,
    navLink: '/QLChamThi/ThuTuDonTui',
    action: 'read',
    resource: 'thutudontui'
  },
  {
    id: 'dontuidanhphach',
    title: 'Dồn túi, Đánh phách',
    icon: <Sliders size={20} />,
    navLink: '/QLChamThi/DonTuiDanhPhach',
    action: 'read',
    resource: 'dontuidanhphach'
  },
  // {
  //   id: 'bienban',
  //   title: 'Biên bản chấm thi',
  //   icon: <Layout size={20} />,
  //   navLink: '/QLChamThi/BienBanChamThi',
  //   action: 'read',
  //   resource: 'bienban'
  // },
  {
    id: 'diemthi',
    title: 'Cập nhật điểm thi',
    icon: <Edit size={20} />,
    navLink: '/QLChamThi/CapNhatDiemThi',
    action: 'read',
    resource: 'diemthi'
  }
]
