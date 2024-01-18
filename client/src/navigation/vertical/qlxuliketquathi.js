// ** Icons Import
import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Shield, Database, Layers, Layout, Users, Book, DollarSign, List, Edit2, Activity, Filter } from 'react-feather'

export default [
  {
    header: 'Xử lý kết quả thi'
  },
  {
    id: "dsvipham",
    title: "DS Thí sinh vi phạm",
    icon: <List size={20} />,
    navLink: "/QLChamThi/DanhSachViPham",
    action: 'read',
    resource: 'dsvipham'
  },
  {
    id: 'tinhdiem',
    title: 'Tính điểm',
    icon: <Layout size={20} />,
    navLink: '/XuLyKetQua/TinhDiem',
    action: 'read',
    resource: 'tinhdiem'
  },
  {
    id: 'dsdudiemxettuyen',
    title: 'Điểm xét tuyển',
    icon: <Filter size={20} />,
    navLink: '/XuLyKetQua/TSDuDiemXetTuyen',
    action: 'read',
    resource: 'dsdudiemxettuyen'
  },
  {
    id: 'capnhatdiemchuan',
    title: 'CN điểm chuẩn',
    icon: <Edit2 size={20} />,
    navLink: '/XuLyKetQua/CapNhatDiemChuan',
    action: 'read',
    resource: 'dsdudiemxettuyen'
  },
  // {
  //     id: 'dskinhphi',
  //     title: 'DS kinh phí',
  //     icon: <DollarSign size={20} />,
  //     navLink: '/XuLyKetQua/DanhSachKinhPhi',
  //     action: 'read',
  //     resource: 'dskinhphi'
  // },
  
  {
    id: 'baocaoketquathi',
    title: 'Báo cáo kết quả thi',
    icon: <Activity size={20} />,
    navLink: '/XuLyKetQua/BaoCaoKetQuaThi',
    action: 'read',
    resource: 'baocaoketquathi'
  },
  // {
  //     id: 'bienlai',
  //     title: 'Biên lai thu học phí',
  //     icon: <FileText size={20} />,
  //     navLink: '/XuLyKetQua/BienLaiThuHocPhi',
  //     action: 'read',
  //     resource: 'bienlai'
  // },
  // {
  //     id: 'phieunhaphoc',
  //     title: 'Phiếu nhập học',
  //     icon: <Layers size={20} />,
  //     navLink: '/XuLyKetQua/PhieuNhapHoc',
  //     action: 'read',
  //     resource: 'phieunhaphoc'
  // },
  // {
  //     id: 'thongke',
  //     title: 'Thống kê',
  //     icon: <Book size={20} />,
  //     children: [ 
  //         {
  //             id: 'thongkemucdiem',
  //             title: 'Thống kê mức điểm',
  //             icon: <Circle size={20} />,
  //             navLink: '/XuLyKetQua/ThongKe/ThongKeMucDiem',
  //             action: 'read',
  //             resource: 'thongkemucdiem'
  //         },
  //       {
  //         id: 'tketheophongthi',
  //         title: 'KQ theo phòng thi',
  //         icon: <Circle size={12} />,
  //         navLink: '/XuLyKetQua/ThongKe/ThongKeKQPhongThi',
  //         action: 'read',
  //         resource: 'tketheophongthi'
  //       },   
  //       {
  //         id: 'ketquatuyensinh',
  //         title: 'Kết quả tuyển sinh',
  //         icon: <Circle size={12} />,
  //         navLink: '/XuLyKetQua/ThongKe/KetQuaTuyenSinh',
  //         action: 'read',
  //         resource: 'ketquatuyensinh'
  //       }
  //     ]
  //   },
]
