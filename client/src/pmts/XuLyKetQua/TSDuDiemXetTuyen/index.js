// ** React Imports
import React, { Fragment, useState, forwardRef, useEffect, useRef, useContext } from 'react'

// imprt thư viện của bảng
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'

//import icon
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, adge, MoreVertical, Trash, Edit, Search, Eye } from 'react-feather'

//import css
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Link } from 'react-router-dom'

// import API
import { getListChuyenNganh, searchListChuyenNganh, taoChuyenNganh, exportChuyenNganh, exportChuyenNganhTemplate, suaDiemChuan } from '../../../api/chuyenNganh'
import { getListNganhTuyenSinh } from '../../../api/nganhTuyenSinh'
import { AbilityContext } from '@src/utility/context/Can'

//import thư viện
import { TemplateHandler } from "easy-template-x"
import { saveFile } from '../../utils/util'
import readXlsxFile from 'read-excel-file/web-worker'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import WaitingModal from '../../../views/ui-elements/waiting-modals'
// ** Reactstrap Import
import {
    Row,
    Col,
    Card,
    Input,
    Label,
    Button,
    CardTitle,
    CardHeader,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledButtonDropdown,
    UncontrolledDropdown,
    Badge
} from 'reactstrap'

// ** Component Custom
import { BootstrapCheckbox } from '../../components/FormHelper/BootstrapCheckbox'
import { getByByDiem, getByChuyenNganh, thongKeTheoMucDiem } from '../../../api/hoSoDangKi'
import { DuKienDiem } from '../../../api/chiTieuTuyenSinh'
import responseResultHelper from '../../utils/reponsive'
import { ACTION_METHOD_TYPE } from '../../utils/constant'
import DetailModal from "./modal/DetailModal"

/***
 * Định nghĩa từ viết tắt
 * 1. CN: CHuyên ngành
 */
const TSDuDiemXetTuyen = () => {
    // ** States
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [listTrungTuyen, setListTrungTuyen] = useState()
    const [perPage, setPerPage] = useState(10)
    const [modalDetaill, setModalDetail] = useState(false)
    const handleModalDetail = () => setModalDetail(!modalDetaill)

    const [data, setData] = useState({
        data: [],
        totalCount: 0
    })
    const fetchSoLuongTrungTuyen = (diem, loaiTS, maChuyennganhTS, maDcdaotao) => {
        const res = getByByDiem({
            page: 1,
            perPage: 100000,
            diem,
            loaiTS,
            maChuyennganhTS,
            maDcdaotao
        }).then(res => {
            return (res)
            setLoading(false)
        })
        return res
    }
    const handleOnChangeDiem = async (e, row, index) => {
        const total = await fetchSoLuongTrungTuyen(e, row.loaiTS, row.maChuyennganhTS, row.maDcdaotao)
        const updatedItems = data.data
        updatedItems[index].diemXetTuyen = e
        updatedItems[index].soLuongTrungTuyen = total.result.totalCount
        updatedItems[index].danhSachTrungTuyen = total.result.data
        // Cập nhật state với bản sao đã cập nhật
        setData({
            data: updatedItems,
            totalCount: updatedItems.length
        })
        setLoading(false)
    }
    const handleXemChiTiet = (row) => {
        setListTrungTuyen(row)
        setModalDetail(true)
    }
    const columns = [
        {
            name: 'STT',
            width: "70px",
            cell: (row, index) => <span>{(((currentPage - 1) * perPage) + index + 1)}</span>
        },
        {
            name: 'Tên chuyên ngành',
            minWidth: '250px',
            selector: row => row.tenChuyennganh,
        },
        {
            name: 'Chỉ tiêu',
            sortable: true,
            maxWidth: '130px',
            selector: row => row.total
        },
        {
            name: 'Số thí sinh',
            sortable: true,
            maxWidth: '150px',
            selector: row => row.soLuong
        },

        {
            name: 'Điểm chuẩn dự kiến',
            sortable: true,
            minWidth: '200px',
            selector: row => row.diemXetTuyen,
            cell: (row, index) => (
                <Input
                    type="number"
                    min={0}
                    value={
                        row.diemXetTuyen
                    }
                    onChange={e => handleOnChangeDiem(e.target.value, row, index)}
                />),
        },
        {
            name: 'Số trúng tuyển',
            sortable: true,
            minWidth: '50px',
            cell: (row, index) => (
                <span style={{ color: row.soLuongTrungTuyen !== row.total ? 'red' : 'black' }}>
                    {row.soLuongTrungTuyen}
                    {
                        row.soLuongTrungTuyen < row.total ? ' (Không đủ chỉ tiêu)' : ''
                    }
                    {
                        row.soLuongTrungTuyen > row.total ? ' (Vượt chỉ tiêu)' : ''
                    }
                </span>),

        },
        {
            name: 'Tác vụ',
            allowOverflow: true,
            maxWidth: '20px',
            center: true,
            cell: (row) => {
                return (
                    <div className='d-flex' style={{ padding: '4px' }}>
                        <Eye size={15} onClick={e => handleXemChiTiet(row)} style={{ cursor: 'pointer', color: 'green' }} />
                    </div>
                )
            }
        }
    ]
    // ** Function to handle modalThemCN toggle
    const fetchUser = () => {
        DuKienDiem({
            page: currentPage,
            perPage: 1000
        }).then(async res => {
            setData(res.result)
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchUser()

    }, [currentPage, perPage])
    // ** Function to handle filte
    // ** Function to handle Pagination
    const handlePagination = page => {
        setCurrentPage(page)
    }
    const handlePerRowsChange = (perPage, page) => {
        setCurrentPage(page)
        setPerPage(perPage)
    }
    const fetchDataForExport = (callAPI) => {
        const data = callAPI().then(res => {
            return (res)
        })
        return data
    }

    const handleExportThongKe = async () => {
        const datasource = await fetchDataForExport(thongKeTheoMucDiem)
        const request = await fetch("/../../template/xulyketquathi/thongketheomucdiem.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, datasource.result)
        saveFile("thongketheomucdiem.docx", docx)
    }
    const handleSaveDiem = async (e) => {
        const temp = data.data
        const groupedData = {}

        for (const record of temp) {
            const key = `${record.maChuyennganhTS}-${record.maDcdaotao}`

            if (!groupedData[key]) {
                groupedData[key] = {
                    maChuyennganhTS: record.maChuyennganhTS,
                    maDcdaotao: record.maDcdaotao
                }
            }
            if (record.loaiTS === "Quân sự") {
                groupedData[key].diemChuanQS = parseFloat(record.diemXetTuyen)
            } else {
                groupedData[key].diemChuanDS = parseFloat(record.diemXetTuyen)
            }
        }

        const resultArray = Object.values(groupedData)
        const res = await suaDiemChuan(resultArray)
        responseResultHelper(res, null, null, ACTION_METHOD_TYPE.UPDATESCORE_SUCCESS)
    }
    return (
        <Fragment>
            <Card style={{ backgroundColor: 'white' }}>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                    <CardTitle tag='h4'>Dự kiến điểm chuẩn</CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle color='secondary' caret outline>
                                <Share size={15} />
                                <span className='align-middle ms-50'>Tùy chọn</span>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem className='w-100' onClick={() => handleExportThongKe()}>
                                    <Printer size={15} />
                                    <span className='align-middle ms-50 ' >Thống kê theo mức điểm</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                        <Button className='ms-2' color='primary' onClick={(e) => handleSaveDiem(e)}>
                            <span className='align-middle ms-50'>Lưu điểm xét tuyển gợi ý</span>
                        </Button>
                    </div>
                </CardHeader>
                <div className='react-dataTable react-dataTable-selectable-rows' style={{ margin: '20px' }}>
                { loading ? <WaitingModal /> : <DataTable
                        noHeader
                        striped
                        className='react-dataTable'
                        columns={columns}
                        data={filteredData?.data ? filteredData.data : data.data}
                        pagination={false}
                        expandOnRowClicked
                        expandableRows
                        expandableRowsComponent={(row) => (
                            <DetailModal data={row} />
                        )}
                    />}
                </div>
            </Card>
            {listTrungTuyen && <MucDiemModal open={modalDetaill} handleModal={handleModalDetail} data={listTrungTuyen}></MucDiemModal>}

        </Fragment>
    )
}
const MucDiemModal = React.lazy(() => import("./MucDiemModal"))


export default TSDuDiemXetTuyen

