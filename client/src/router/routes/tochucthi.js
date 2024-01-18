// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const HoSoDK = lazy(() => import('../../pmts/QLToChucThi/HoSoDK'))
const ThemHoSo = lazy(() => import('../../pmts/QLToChucThi/HoSoDK/ThemHoSo'))
const ChiTietHoSo = lazy(() => import('../../pmts/QLToChucThi/HoSoDK/ChiTietHoSo'))
const PhongThi = lazy(() => import('../../pmts/QLToChucThi/PhongThi'))
const DanhSBD = lazy(() => import('../../pmts/QLToChucThi/danhSBD'))


const ToChucThi = [
  {
    element: <HoSoDK />,
    path: '/QLToChucThi/HoSoDK'
  },
  {
    element: <ThemHoSo />,
    path: '/QLToChucThi/HoSoDK/ThemHoSo'
  },
  {
    element: <ChiTietHoSo />,
    path: '/QLToChucThi/HoSoDK/ChiTietHoSo/:id'
  },
  {
    element: <PhongThi />,
    path: '/QLToChucThi/PhongThi'
  },
  {
    element: <DanhSBD />,
    path: '/QLToChucThi/DanhSBDChiaPhong'
  },
]

export default ToChucThi
