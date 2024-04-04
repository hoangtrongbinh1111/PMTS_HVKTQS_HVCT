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
import { suaDiemChuan, searchListChuyenNganh, taoChuyenNganh, exportChuyenNganh, exportChuyenNganhTemplate, suaNhieuChuyenNganh } from '../../../api/chuyenNganh'
import { getListNganhTuyenSinh } from '../../../api/nganhTuyenSinh'
import { AbilityContext } from '@src/utility/context/Can'

//import thư viện
import { TemplateHandler } from "easy-template-x"
import { saveFile } from '../../utils/util'
import readXlsxFile from 'read-excel-file/web-worker'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
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
import { getListChiTieuVaSoLuong } from '../../../api/chiTieuTuyenSinh'
import responseResultHelper from '../../utils/reponsive'
import { ACTION_METHOD_TYPE } from '../../utils/constant'
import { toDateString } from '../../../utility/Utils'
import DetailModal from "./modal/DetailModal"
import WaitingModal from '../../../views/ui-elements/waiting-modals'
/***
 * Định nghĩa từ viết tắt
 * 1. CN: CHuyên ngành
 */
const CapNhatDiemChuan = () => {
    // ** States
    const [loading, setLoading] = useState(true)
    const MySwal = withReactContent(Swal)
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
            selector: row => row.soLuongTrungTuyen,


        }

    ]
    // ** Function to handle modalThemCN toggle
    const fetchUser = () => {
        getListChiTieuVaSoLuong({
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
    const handleExportNganh = async () => {
        MySwal.fire({
            title: 'In danh sách trúng tuyển',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen() {
                Swal.showLoading()
            },
        })
        const temp = data.data
        const datasource = []
        temp.map((item, index) => {
            if (item.total !== 0) {
                datasource.push({
                    ...item,
                    tenChuyennganh: item.tenChuyennganh.split('_')[0],
                    KiHieuDc: item.tenChuyennganh.split('_')[2],
                    tyLe: `${((item.soLuongTrungTuyen / item.total) * 100).toFixed(2)}%`
                })
            }
        })
        const request = await fetch("/../../template/xulyketquathi/soluongthisinhtrungtuyentheochuyennganhdt.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, {
            data: datasource,
            year: new Date().getFullYear()
        })
        saveFile("soluongthisinhtrungtuyentheochuyennganhdt.docx", docx)
        MySwal.close()
    }
    const handleExportDiaChiDaoTao = async () => {
        MySwal.fire({
            title: 'In danh sách trúng tuyển',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen() {
                Swal.showLoading()
            },
        })
        const temp = data.data
        const datasource = []
        temp.map((item, index) => {
            if (item.total !== 0) {
                datasource.push({
                    ...item,
                    tenChuyennganh: item.tenChuyennganh.split('_')[0],
                    KiHieuDc: item.tenChuyennganh.split('_')[2],
                    tyLe: `${((item.soLuongTrungTuyen / item.total) * 100).toFixed(2)}%`
                })
            }
        })
        const request = await fetch("/../../template/xulyketquathi/soluongthisinhtrungtuyentheodiachidaotao.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, {
            data: datasource,
            year: new Date().getFullYear()
        })
        saveFile("soluongthisinhtrungtuyentheodiachidaotao.docx", docx)
        MySwal.close()
    }
    const handleExportDanhSach = async () => {
        const temp = data.data
        const datasource = []
        let length = 0
        temp.map((item, index) => {
            length = length + (temp[index - 1] === undefined ? 1 : temp[index - 1].danhSachTrungTuyen.length - 1)
            item.danhSachTrungTuyen.map((thisinh, k) => {
                const diemNgoaiNgu = thisinh.ngoaiNgu === 'Miễn Thi' ? 'Miễn thi' : thisinh.diemNgoaiNgu
                datasource.push({
                    ...thisinh,
                    index: index + k + length,
                    ngaySinh: toDateString(thisinh.ngaySinh),
                    diemNgoaiNgu
                })
            })
        })
        const request = await fetch("/../../template/xulyketquathi/danhsachtrungtuyen.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, {
            data: datasource,
            year: new Date().getFullYear()
        })
        saveFile("danhsachtrungtuyen.docx", docx)
        MySwal.close()
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
                    <CardTitle tag='h4'>Cập nhật điểm chuẩn</CardTitle>
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
                                <DropdownItem className='w-100' onClick={() => handleExportDanhSach()}>
                                    <Printer size={15} />
                                    <span className='align-middle ms-50 ' >In danh sách trúng tuyển</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={() => handleExportNganh()}>
                                    <Printer size={15} />
                                    <span className='align-middle ms-50 ' >Thống kê số lượng trúng tuyển theo chuyên ngành</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={() => handleExportDiaChiDaoTao()}>
                                    <Printer size={15} />
                                    <span className='align-middle ms-50 ' >Thống kê số lượng trúng tuyển theo địa chỉ đào tạo</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                        <Button className='ms-2' color='primary' onClick={(e) => handleSaveDiem(e)}>
                            <span className='align-middle ms-50' >Lưu điểm chuẩn</span>
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
            {/* {listTrungTuyen && <DetailModal open={modalDetaill} handleModal={handleModalDetail} data={listTrungTuyen}></DetailModal>} */}

        </Fragment>
    )
}
// const DetailModal = React.lazy(() => import("./modal/DetailModal"))


export default CapNhatDiemChuan

