// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const TSDuDiemXetTuyen = lazy(() => import('../../pmts/XuLyKetQua/TSDuDiemXetTuyen'))


const CapNhatDiemChuan = lazy(() => import('../../pmts/XuLyKetQua/CapNhatDiemChuan'))
const DetailDiemChuan = lazy(() => import('../../pmts/XuLyKetQua/CapNhatDiemChuan/DetailDiemChuan'))

const TinhDiem = lazy(() => import('../../pmts/XuLyKetQua/TinhDiem'))

 
const XuLyKetQuaThi = [
    {
        element: <TSDuDiemXetTuyen />,
        path: '/XuLyKetQua/TSDuDiemXetTuyen'
    },
    {
        element: <CapNhatDiemChuan />,
        path: '/XuLyKetQua/CapNhatDiemChuan'
    },
    {
        element: <DetailDiemChuan />,
        path: '/XuLyKetQua/CapNhatDiemChuan/Detail'
    },
    {
        element: <TinhDiem />,
        path: '/XuLyKetQua/TinhDiem'
    },
]

export default XuLyKetQuaThi