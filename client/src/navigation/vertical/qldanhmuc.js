// ** Icons Import
import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Shield, Database, Globe, Book, HardDrive } from 'react-feather'

export default [
  {
    header: 'Quản lý danh mục'
  },
  {
    id: 'tochucthi',
    title: 'DM Tổ chức thi',
    icon: <HardDrive size={20} />,
    children: [
      {
        id: 'nhommonthi',
        title: 'Nhóm môn thi',
        icon: <Circle size={12} />,
        navLink: '/QLDanhMuc/NhomMonThi',
        action: 'read',
        resource: 'nhommonthi'
      },
      {
        id: 'monthi',
        title: 'Môn thi',
        icon: <Circle size={12} />,
        navLink: '/QLDanhMuc/MonThi',
        action: 'read',
        resource: 'monthi'
      },
      {
        id: 'dsnganh',
        title: 'Ngành TS',
        icon: <Circle size={12} />,
        navLink: '/QLDanhMuc/NganhTuyenSinh',
        action: 'read',
        resource: 'dsnganh'
      },
      {
        id: 'dschuyennganh',
        title: 'Chuyên ngành TS',
        icon: <Circle size={12} />,
        navLink: '/QLDanhMuc/ChuyenNganh',
        action: 'read',
        resource: 'dschuyennganh'
      },
      // {
      //   id: 'dschuyennganhhep',
      //   title: '5. CN hẹp',
      //   icon: <Circle size={12} />,
      //   navLink: '/QLDanhMuc/ChuyenNganhHep',
      //   action: 'read',
      //   resource: 'dschuyennganhhep'
      // },

      {
        id: 'diachidaotao',
        title: 'Địa chỉ đào tạo',
        icon: <Circle size={12} />,
        navLink: '/QLDanhMuc/DiaChiDaoTao',
        action: 'read',
        resource: 'diachidaotao'
      },
      {
        id: 'ddtochucthi',
        title: 'ĐĐ Tổ chức thi',
        icon: <Circle size={12} />,
        navLink: '/QLDanhMuc/DiaDiemToChucThi',
        action: 'read',
        resource: 'ddtochucthi'
      }
    ]
  },
  {
    id: 'dmchung',
    title: 'DM chung',
    icon: <Globe size={20} />,
    children: [
      {
        id: 'truongdaihoc',
        title: 'Trường ĐT bậc ĐH',
        icon: <Circle size={12} />,
        navLink: '/QLDanhMuc/TruongDaiHoc',
        action: 'read',
        resource: 'truongdaihoc'
      },
      {
        id: 'nganhdh',
        title: 'Ngành ĐT bậc ĐH',
        icon: <Circle size={12} />,
        navLink: '/QLDanhMuc/NganhDaiHoc',
        action: 'read',
        resource: 'nganhdh'
      },
      {
        id: 'lhdaotao',
        title: 'Loại hình ĐT bậc ĐH',
        icon: <Circle size={12} />,
        navLink: '/QLDanhMuc/LoaiHinhDaoTao',
        action: 'read',
        resource: 'lhdaotao'
      },
      {
        id: 'pltotnghiep',
        title: 'Phân loại TN ĐH',
        icon: <Circle size={12} />,
        navLink: '/QLDanhMuc/PhanLoaiTotNghiep',
        action: 'read',
        resource: 'pltotnghiep'
      },
      {
        id: 'doituonguutien',
        title: 'Đối tượng ưu tiên',
        icon: <Circle size={12} />,
        navLink: '/QLDanhMuc/HinhThucUuTien',
        action: 'read',
        resource: 'doituonguutien'
      },
      {
        id: 'hinhthuckiluat',
        title: 'Hình thức kỷ luật',
        icon: <Circle size={12} />,
        navLink: '/QLDanhMuc/HinhThucKyLuat',
        action: 'read',
        resource: 'hinhthuckiluat'
      },
      // {
      //   id: 'tinh',
      //   title: 'Tỉnh',
      //   icon: <Circle size={12} />,
      //   navLink: '/QLDanhMuc/DanhMucChung/Tinh',
      //   action: 'read',
      //   resource: 'tinh',
      // },
      // {
      //   id: 'capbac',
      //   title: 'Cấp bậc',
      //   icon: <Circle size={12} />,
      //   navLink: '/QLDanhMuc/DanhMucChung/CapBac',
      //   action: 'read',
      //   resource: 'capbac'
      // }
    ]
  }

]
