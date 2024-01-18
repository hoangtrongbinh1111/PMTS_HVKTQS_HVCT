// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const ThuTuDonTui = lazy(() => import('../../pmts/QLToChucChamThi/thutudontui'))
const DonTuiDanhPhach = lazy(() => import('../../pmts/QLToChucChamThi/dontuidanhphach'))
const CapNhatDiemThi = lazy(() => import('../../pmts/QLToChucChamThi/capnhatdiemthi'))
const DanhSachViPham = lazy(() => import('../../pmts/QLToChucChamThi/capnhatthisinhvipham'))

const ToChucThi = [
    {
        element: <ThuTuDonTui />,
        path: '/QLChamThi/ThuTuDonTui'
    },
    {
        element: <DonTuiDanhPhach />,
        path: '/QLChamThi/DonTuiDanhPhach'
    },
    {
        element: <CapNhatDiemThi />,
        path: '/QLChamThi/CapNhatDiemThi'
    },
    {
        element: <DanhSachViPham />,
        path: '/QLChamThi/DanhSachViPham'
    },
]

export default ToChucThi