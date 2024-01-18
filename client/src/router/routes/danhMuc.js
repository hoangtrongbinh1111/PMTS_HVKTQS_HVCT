// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const TruongDaiHoc = lazy(() => import('../../pmts/QLDanhMuc/truongdaihoc'))
const NganhDaiHoc = lazy(() => import('../../pmts/QLDanhMuc/nganhdaihoc'))
const LoaiHinhDaoTao = lazy(() => import('../../pmts/QLDanhMuc/loaihinhdaotao'))
const PhanLoaiTotNghiep = lazy(() => import('../../pmts/QLDanhMuc/phanloaitotnghiep'))
const DiaChiDaoTao = lazy(() => import('../../pmts/QLDanhMuc/diachidaotao'))
const DiaDiemToChucThi = lazy(() => import('../../pmts/QLDanhMuc/diadiemtochucthi'))
const HinhThucKyLuat = lazy(() => import('../../pmts/QLDanhMuc/hinhthuckyluat'))
const HinhThucUuTien = lazy(() => import('../../pmts/QLDanhMuc/hinhthucuutien'))
const NhomMonThi = lazy(() => import('../../pmts/QLDanhMuc/nhommonthi'))
const MonThi = lazy(() => import('../../pmts/QLDanhMuc/monthi'))
const NganhTuyenSinh = lazy(() => import('../../pmts/QLDanhMuc/nganhtuyensinh'))
const ChuyenNganh = lazy(() => import('../../pmts/QLDanhMuc/chuyennganh'))
const ChuyenNganhHep = lazy(() => import('../../pmts/QLDanhMuc/chuyennganhhep'))
const Tinh = lazy(() => import('../../pmts/QLDanhMuc/tinh'))
const ChucVu = lazy(() => import('../../pmts/QLDanhMuc/chucvu'))

const DanhMuc = [
  {
    element: <TruongDaiHoc />,
    path: '/QLDanhMuc/TruongDaiHoc'
  },
  {
    element: <NganhDaiHoc />,
    path: '/QLDanhMuc/NganhDaiHoc'
  },
  {
    element: <LoaiHinhDaoTao />,
    path: '/QLDanhMuc/LoaiHinhDaoTao'
  },
  {
    element: <PhanLoaiTotNghiep />,
    path: '/QLDanhMuc/PhanLoaiTotNghiep'
  },
  {
    element: <DiaChiDaoTao />,
    path: '/QLDanhMuc/DiaChiDaoTao'
  },
  {
    element: <DiaDiemToChucThi />,
    path: '/QLDanhMuc/DiaDiemToChucThi'
  },
  {
    element: <HinhThucKyLuat />,
    path: '/QLDanhMuc/HinhThucKyLuat'
  },
  {
    element: <HinhThucUuTien />,
    path: '/QLDanhMuc/HinhThucUuTien'
  },
  {
    element: <NhomMonThi />,
    path: '/QLDanhMuc/NhomMonThi'
  },
  {
    element: <MonThi />,
    path: '/QLDanhMuc/MonThi'
  },
  {
    element: <NganhTuyenSinh />,
    path: '/QLDanhMuc/NganhTuyenSinh'
  },
  {
    element: <ChuyenNganh />,
    path: '/QLDanhMuc/ChuyenNganh'
  },
  {
    element: <Tinh/>,
    path: '/QLDanhMuc/DanhMucChung/Tinh'
  },
  {
    element: <ChucVu/>,
    path: '/QLDanhMuc/DanhMucChung/CapBac'
  },
  {
    element: <ChuyenNganhHep />,
    path: '/QLDanhMuc/ChuyenNganhHep'
  }
]

export default DanhMuc
