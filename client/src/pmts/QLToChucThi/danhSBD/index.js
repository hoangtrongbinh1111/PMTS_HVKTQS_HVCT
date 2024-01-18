// ** React Imports
import React, { Fragment, useState, forwardRef, useEffect, useRef } from 'react'

// imprt thư viện của bảng
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
//import icon
import { ChevronDown, Share, Printer, FileText, File, Grid, Eye, Plus, adge, MoreVertical, Trash, Edit, Search } from 'react-feather'
import { Link } from 'react-router-dom'

//import css
import '@styles/react/libs/tables/react-dataTable-component.scss'

// import API
import { searchListTruongDaiHoc, getListTruongDaiHoc, exportTruongDaiHoc, exportTruongDaiHocTemplate } from '../../../api/truongDaiHoc'
import { getDanhSachPhongVaSoBaoDanh, danhSoBaoDanh, uploadZip, getListSBD, searchSBD, getAllDanhSachDanAnh, getAllDanhSach, getDanhSachPhong, getTheDuThi, getDanhSachThiSinhTheoPhong } from '../../../api/hoSoDangKi'
import { thongkeMonPhong, thongkePhongMon, thongkeTheoMon } from '../../../api/monThi'

//import thư viện
import { MimeType, TemplateHandler } from "easy-template-x"
import { saveFile } from '../../utils/util'
import readXlsxFile from 'read-excel-file/web-worker'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toDateString, toDateStringViet } from '../../../utility/Utils'

import responseResultHelper from '../../utils/reponsive'

import { getListDiaDiemToChucThi } from '../../../api/diaDiemToChucThi'
import { getListDiaChiDaoTao } from '../../../api/diaChiDaoTao'
import { getListNganhDaiHoc } from '../../../api/nganhDaiHoc'
import { getListChuyenNganh } from '../../../api/chuyenNganh'
import { getListChuyenNganhHep } from '../../../api/chuyenNganhHep'
import { getListLoaiHinhDaoTao } from '../../../api/loaiHinhDaoTao'
import { getListHinhThucUuTien } from '../../../api/hinhThucUuTien'
import { getListPhanLoaiTotNghiep } from '../../../api/phanloaiTotNghiep'
import { ACTION_METHOD_TYPE } from '../../utils/constant'
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
import { getInfo } from '../../../api/thamSoHeThong'
// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
    <div className='form-check'>
        <Input type='checkbox' ref={ref} {...props} />
    </div>
))
/***
 * Định nghĩa từ viết tắt
 * 1. HS: Hồ sơ
 */
const DanhSBD = () => {
    const inputFile = useRef(null)
    const inputFileZip = useRef(null)
    const MySwal = withReactContent(Swal)

    // ** States
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [perPage, setPerPage] = useState(10)
    const [data, setData] = useState({
        data: [],
        totalCount: 0
    })
    const [datathamso, setThamso] = useState()

    useEffect(() => {
        getInfo()
            .then(res => {
                console.log(res)
                const listres = res.result?.data
                setThamso(listres[0] ?? {})
            }).catch(err => {
                console.log(err)
            })
    }, [])
    const columns = [
        {
            name: "STT",
            center: true,
            width: "70px",
            cell: (row, index) => <span>{(((currentPage - 1) * perPage) + index + 1)}</span>
        },
        {
            name: 'SBD',
            minWidth: '100px',
            selector: row => row.soBaodanh,

        },
        {
            name: 'Phòng thi',
            center: true,
            minWidth: '100px',
            selector: row => row.tenPhong,
        },
        {
            name: 'Họ tên',
            minWidth: '200px',
            selector: row => row.hoTen,

        },
        {
            name: 'Loại TS',
            sortable: true,
            minWidth: '130px',
            selector: row => row.loaiTS
        },
        {
            name: 'Ngành ĐH',
            sortable: true,
            minWidth: '130px',
            center: true,
            selector: row => row.kihieuNganh
        },
        {
            name: 'Chuyên ngành TS',
            sortable: true,
            minWidth: '130px',
            center: true,
            selector: row => row.kiHieuChuyennganh
        },
        {
            name: 'Ngày sinh',
            sortable: true,
            minWidth: '150px',
            selector: row => toDateString(row.ngaySinh)
        },
        {
            name: 'Nơi sinh',
            sortable: true,
            minWidth: '100px',
            selector: row => row.noiSinh
        },
        // {
        //     name: 'Tác vụ',
        //     allowOverflow: true,
        //     maxWidth: '20px',
        //     cell: (row) => {
        //         return (
        //             <div className='d-flex'>
        //                 <Link to={`/QLToChucThi/HoSoDK/ChiTietHoSo/${row.maHoso}`}>
        //                     <Eye size={17} className='mx-1' style={{ cursor: 'pointer', color: 'green', marginRight: '5px' }} />
        //                 </Link>
        //                 <Trash size={15} onClick={e => _handleXoaHS(row)} style={{ cursor: 'pointer', color: 'red' }} />
        //             </div>
        //         )
        //     }
        // }
    ]
    // ** Function to handle modalThemHS toggle
    const fetchUser = () => {
        getListSBD({
            page: currentPage,
            perPage
        }).then(res => {
            setData(res.result)
        })
    }
    useEffect(() => {
        if (searchValue.length > 0) {
            searchSBD({
                page: currentPage,
                perPage,
                query: searchValue
            }).then(res => {
                setFilteredData(res.result)
            })
        } else {
            fetchUser()
        }
    }, [currentPage, perPage])
    // ** Function to handle filte
    const handleFilter = (e) => {
        if (e === 'Enter') {
            searchSBD({
                page: currentPage,
                perPage,
                query: searchValue
            }).then(res => {
                setFilteredData(res.result)
            })
        }
    }
    const onImportFileClick = () => {
        // `current` points to the mounted file input element
        inputFile.current.click()
    }
    const onImportFileZipClick = () => {
        // `current` points to the mounted file input element
        inputFileZip.current.click()
    }
    const handleImportFile = (e) => {
        const files = e.target.files[0]
        const MySwal = withReactContent(Swal)
        readXlsxFile(files).then((rows) => {
            // `rows` is an array of rows
            // each row being an array of cells.
            const temp = []
            rows.forEach((item, index) => {
                if (index > 0) {
                    temp.push(item)
                }
            })
            setListImport(temp)
            setModalImportHS(true)
        }).catch(error => {
            MySwal.fire({
                icon: "error",
                title: "Có lỗi xảy ra",
                text: "File không đúng định dạng, vui lòng chọn file định dạng excel và nhập đúng các cột",
                customClass: {
                    confirmButton: "btn btn-danger"
                }
            })
        })

    }
    const handleImportFileZip = async (e) => {
        const files = e.target.files[0]

        console.log(files)
        const formdata = new FormData()
        formdata.append('files', files)
        const res = await uploadZip(formdata)
        responseResultHelper(res, null, null, ACTION_METHOD_TYPE.UPLOADZIP)
    }
    const handleExportFileExcel = async () => {
        const res = await exportTruongDaiHoc()
    }
    const handleExportFileTemplate = async () => {
        const res = await exportTruongDaiHocTemplate()
    }
    const handleDanhSoBaoDanh = async () => {
        MySwal.fire({
            title: 'Đang đánh số báo danh và phân phòng cho thí sinh',
            allowEscapeKey: false,
            allowOutsideClick: false,

            didOpen: () => {
                Swal.showLoading()
            },
        })
        const res = await danhSoBaoDanh()
        responseResultHelper(res, null, fetchUser, ACTION_METHOD_TYPE.DANHSOBAODANH)
        // const res = await danhSoBaoDanh()
        // responseResultHelper(res, null, fetchUser, ACTION_METHOD_TYPE.DANHSOBAODANH)
    }
    // ** Function to handle Pagination
    const handlePagination = page => {
        setCurrentPage(page)
    }
    const handlePerRowsChange = (perPage, page) => {
        setCurrentPage(page)
        setPerPage(perPage)
    }
    // ** Custom Pagination


    // ** Converts table to CSV
    const fetchDataForExport = (callAPI) => {
        const data = callAPI().then(res => {
            return (res)
        })
        return data
    }
    const handleExportFileDocxGiayDuThi = async () => {
        const datasource = await fetchDataForExport(getAllDanhSach)
        const list = {
            data: [],
        }
        datasource.result.data.map((e) => {
            list.data.push({
                ...e,
                ngay: toDateStringViet(new Date()),
                ngaySinhCv: toDateString(e.ngaySinh),
                ngayTapTrung: toDateString(e.ngayTt),
                chucVu_ngki: datathamso.chucVu_ngki,
                tenNgki: datathamso.tenNgki,
                year: new Date().getFullYear(),
                gioTapTrung: `${String(new Date(e.gioTt).getHours()).padStart(2, "0")} giờ ${String(new Date(e.gioTt).getMinutes()).padStart(2, "0")}`
            })
        })
        console.log(list)
        const request = await fetch("/../../template/hoso/danhsachgiaybaoduthi.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, list)
        saveFile("danhsachgiaybaoduthi.docx", docx)
    }
    const handleExportFileDocxTheThi = async () => {
        const datasource = await getTheDuThi()
    }
    const handleExportFileDocxDanhSachPhong = async () => {
        const url = process.env.REACT_APP_API_URL_NEW
        const datasource = await fetchDataForExport(getDanhSachPhong)
        datasource.result.data.map((e) => {
            e.data1.map((item, index) => {
                item.ngaySinh = toDateString(item.ngaySinh)
                item.index = index + 1
            })
        })
        console.log(datasource)

        const request = await fetch("/../../template/hoso/bienbanchamthi.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, datasource.result)

        saveFile("bienbanthi.docx", docx)
    }
    const handleExportFileDocxDanhSachThiPhong = async () => {
        const url = process.env.REACT_APP_API_URL_NEW
        const datasource = await fetchDataForExport(getDanhSachThiSinhTheoPhong)
        datasource.result.data.map((e) => {
            e.tongSoBaiThi = e.data1.length
            e.baiThiNgoaiNgu = e.data1.filter((hocVien) => hocVien.ngoaiNgu === "Miễn Thi").length
            e.baiThiAnhVan = e.tongSoBaiThi - e.baiThiNgoaiNgu
            e.data1.map((item, index) => {
                item.ngaySinh = toDateString(item.ngaySinh)
                item.index = index + 1
            })
        })
        datasource.result.year = new Date().getFullYear()
        console.log(datasource.result)
        const request = await fetch("/../../template/hoso/danhsachthisinhtheophong.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, datasource.result)

        saveFile("danhsachthisinhtheophong.docx", docx)
    }
    const handleExportFileDocxDanhSachPhongVaSoBaoDanh = async () => {
        const url = process.env.REACT_APP_API_URL_NEW
        const datasource = await fetchDataForExport(getDanhSachPhongVaSoBaoDanh)
        datasource.result.data.map((item, index) => {
            item.ngaySinh = toDateString(item.ngaySinh)
            item.index = index + 1
        })
        datasource.result["chucVu_ngki"] = datathamso.chucVu_ngki
        datasource.result["tenNgki"] = datathamso.tenNgki
        datasource.result["year"] = new Date().getFullYear()

        const request = await fetch("/../../template/hoso/danhsachthisinhtheophongthivasobaodanh.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, datasource.result)

        saveFile("danhsachthisinhtheophongthivasobaodanh.docx", docx)
    }
    const handleExportFileDocxDanAnh = async () => {
        const datasource = await getAllDanhSachDanAnh()
    }
    const handleExportTongHopThiSinhMonThiPhongThi = async () => {
        const today = new Date()
        const datasource = await fetchDataForExport(thongkeMonPhong)
        const request = await fetch("/../../template/xulyketquathi/tonghopthisinhtheomonthiphongthi.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, { data: datasource.result, curYear: today.getFullYear() })
        saveFile("tonghopthisinhtheomonthiphongthi.docx", docx)
    }
    const handleExportTongHopThiSinhPhongThiMonThi = async () => {
        const datasource = await fetchDataForExport(thongkePhongMon)
        const request = await fetch("/../../template/xulyketquathi/tonghopthisinhtheophongthimonthi.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, { data: datasource.result })
        saveFile("tonghopthisinhtheophongthimonthi.docx", docx)
    }
    const handleExportTongHopThiSinhTheoMonThi = async () => {
        const today = new Date()
        const datasource = await fetchDataForExport(thongkeTheoMon)
        const request = await fetch("/../../template/xulyketquathi/tonghopthisinhtheomonthi.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, { data: datasource.result, curYear: today.getFullYear() })
        saveFile("tonghopthisinhtheomonthi.docx", docx)
    }
    return (
        <Fragment>
            <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={e => handleImportFile(e)} />
            <input type='file' id='file' ref={inputFileZip} style={{ display: 'none' }} onChange={e => handleImportFileZip(e)} />

            <Card style={{ backgroundColor: 'white' }}>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>

                    <CardTitle tag='h4'>Đánh số báo danh, chia phòng</CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle color='secondary' caret outline>
                                <Share size={15} />
                                <span className='align-middle ms-50'>In hồ sơ</span>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem className='w-100' onClick={() => handleExportFileDocxDanAnh(data)}>
                                    <Printer size={15} />
                                    <span className='align-middle ms-50 ' >In danh sách dán ảnh</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={() => handleExportFileDocxGiayDuThi(data)}>
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>In giấy báo dự thi</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={() => handleExportFileDocxTheThi(data)}>
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>In thẻ dự thi</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={() => handleExportFileDocxDanhSachThiPhong(data)}>
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>Danh sách thi theo phòng</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={() => handleExportFileDocxDanhSachPhong(data)}>
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>Biên bản thu bài thi</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={() => handleExportTongHopThiSinhMonThiPhongThi()}>
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>Tổng hợp danh sách môn thi phòng thi</span>
                                </DropdownItem>
                                {/* <DropdownItem className='w-100' onClick={() => handleExportTongHopThiSinhPhongThiMonThi()}>
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>Tổng hợp danh sách môn thi phòng thi</span>
                                </DropdownItem> */}
                                <DropdownItem className='w-100' onClick={() => handleExportTongHopThiSinhTheoMonThi()}>
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>Tổng hợp danh sách thí sinh theo môn thi</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={() => handleExportFileDocxDanhSachPhongVaSoBaoDanh(data)}>
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>Danh sách thí sinh theo phòng và số báo danh</span>
                                </DropdownItem>

                            </DropdownMenu>
                        </UncontrolledButtonDropdown>

                        <Button className='ms-2' color='success' onClick={() => handleDanhSoBaoDanh()}>
                            <span className='align-middle ms-50'>Đánh số báo danh và chia phòng</span>
                        </Button>
                        {/* <Button className='ms-2' color='primary' tag={Link} to='/QLToChucThi/HoSoDK/ThemHoSo'>
                            <Plus size={15} />
                            <span className='align-middle ms-50'>Thêm mới</span>
                        </Button> */}
                    </div>

                </CardHeader>
                <Row className='justify-content-end mx-0'>
                    <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12' style={{ paddingRight: '20px' }}>
                        <Label className='me-1' for='search-input'>
                            Tìm kiếm
                        </Label>
                        <Input
                            className='dataTable-filter mb-50'
                            type='text'
                            bsSize='sm'
                            id='search-input'
                            value={searchValue}
                            placeholder='Nhập tại đây'
                            onChange={e => setSearchValue(e.target.value)}
                            onKeyDown={e => handleFilter(e.key)}
                        />
                    </Col>
                </Row>
                <div className='react-dataTable react-dataTable-selectable-rows' style={{ marginRight: '20px', marginLeft: '20px' }}>
                    <DataTable
                        noHeader
                        striped
                        className='react-dataTable'
                        columns={columns}
                        data={filteredData?.data ? filteredData.data : data.data}
                        pagination
                        paginationServer
                        paginationTotalRows={filteredData?.data ? filteredData.totalCount : data.totalCount}
                        paginationComponentOptions={{
                            rowsPerPageText: 'Số hàng trên 1 trang:',
                            selectAllRowsItem: true,
                            selectAllRowsItemText: 'ALL',
                        }}
                        paginationRowsPerPageOptions={[10, 20, 50, 100]}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePagination}
                    />
                </div>
            </Card>
        </Fragment>
    )
}
const ImportModal = React.lazy(() => import("./modal/ImportModal"))


export default DanhSBD
