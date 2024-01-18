// ** Icons Import
import {
  Mail,
  MessageSquare,
  CheckSquare,
  Calendar,
  FileText,
  Circle,
  ShoppingCart,
  User,
  Shield,
  Database,
  Layers,
  Layout,
  Users,
  AlignJustify,
  Percent,
  List,
  DivideCircle
} from "react-feather"

export default [
  {
    header: "Tổ chức thi",
  },
  {
    id: "chitieu",
    title: "Chỉ tiêu tuyển sinh",
    icon: <FileText size={20} />,
    navLink: "/QLToChucThi/ChiTieuTS",
    action: 'read',
    resource: 'chitieu'
  },
  {
    id: "hoso",
    title: "Hồ sơ đăng ký dự thi",
    icon: <Layers size={20} />,
    navLink: "/QLToChucThi/HoSoDK",
    action: 'read',
    resource: 'hoso'
  },
  // {
  //   id: "danhsachthisinh",
  //   title: "Danh sách thí sinh",
  //   icon: <AlignJustify size={20} />,
  //   navLink: "/QLToChucThi/DanhSachTS",
  //   action: 'read',
  //   resource: 'danhsachthisinh'
  // },
  {
    id: "dsphongthi",
    title: "Tạo phòng thi",
    icon: <Layout size={20} />,
    navLink: "/QLToChucThi/PhongThi",
    action: 'read',
    resource: 'dsphongthi'
  },
  {
    id: "sbd_chiaphong",
    title: "Đánh SBD, chia phòng",
    icon: <DivideCircle size={20} />,
    navLink: "/QLToChucThi/DanhSBDChiaPhong",
    action: 'read',
    resource: 'sbd_chiaphong'
  },
  // {
  //   id: "dsthulephi",
  //   title: "DS mức thu lệ phí",
  //   icon: <Percent size={20} />,
  //   navLink: "/QLToChucThi/DSThuLePhi",
  //   action: 'read',
  //   resource: 'dsthulephi'
  // }
]
