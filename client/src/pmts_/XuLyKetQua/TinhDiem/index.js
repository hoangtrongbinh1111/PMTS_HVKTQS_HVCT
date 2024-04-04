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
import { getListHoSoDangKi, danhSoBaoDanh, uploadZip, getListSBD, getDanhSachDiem, getAllDanhSach, getDiemThiPhong } from '../../../api/hoSoDangKi'

//import thư viện
import { TemplateHandler } from "easy-template-x"
import { saveFile } from '../../utils/util'
import readXlsxFile from 'read-excel-file/web-worker'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toDateString } from '../../../utility/Utils'
import Select, { components } from 'react-select' // eslint-disable-line

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
import WaitingModal from '../../../views/ui-elements/waiting-modals'
import { getListDuDieuKienXetTuyen } from '../../../api/chiTieuTuyenSinh'
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
const TinhDiem = () => {
    const inputFile = useRef(null)
    const inputFileZip = useRef(null)
    const [loading, setLoading] = useState(true)

    // ** States
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [perPage, setPerPage] = useState(10)
    const [data, setData] = useState({
        data: [],
        totalCount: 0
    })

    const columns = [
        {
            name: "STT",
            center: true,
            width: "70px",
            cell: (row, index) => <span>{(((currentPage - 1) * perPage) + index + 1)}</span>
        },
        {
            name: 'SBD',
            minWidth: '50px',
            selector: row => row.soBaodanh,

        },
        {
            name: 'Họ tên',
            minWidth: '200px',
            selector: row => row.hoTen,

        },
        {
            name: 'CB',
            sortable: true,
            minWidth: '30px',
            cell: (row) => {
                return (
                    <div>
                        {
                            row.viphamcoban ? row.coban * (1 - parseFloat(row.viphamcoban.mucTru / 100)) : row.coban
                        }

                    </div>
                )

            },
        },
        {
            name: 'CN',
            sortable: true,
            minWidth: '30px',
            selector: row => row.chuyennganh,
            cell: (row) => {
                return (
                    <div>
                        {
                            row.viphamchuyennganh ? row.chuyennganh * (1 - parseFloat(row.viphamchuyennganh.mucTru / 100)) : row.chuyennganh
                        }

                    </div>
                )

            },
        },
        {
            name: 'NN',
            sortable: true,
            minWidth: '30px',
            selector: row => row.ngoaingu,
            cell: (row) => {
                return (
                    <div>
                        {
                            row.ngoaiNgu === 'Miễn Thi' ? 'Miễn Thi' : row.viphamngoaingu ? row.ngoaingu * (1 - parseFloat(row.viphamngoaingu.mucTru / 100)) : row.ngoaingu
                        }

                    </div>
                )

            },
        },
        {
            name: 'Tổng',
            sortable: true,
            minWidth: '30px',
            selector: row => row.tongDiem
        },
        {
            name: 'Ghi chú',
            sortable: true,
            minWidth: '300px',
            cell: (row) => {
                return (
                    <div style={{ overflow: 'auto', height: "40px" }}>{
                        row.hinhthuc ? <p>{row.hinhthuc} cộng {row.cong} điểm</p> : <></>
                    }
                        {
                            row.viphamcoban ? <p>Môn cơ bản {row.viphamcoban.tenHinhthuc} trừ {row.viphamcoban.mucTru}% điểm</p> : <></>
                        }
                        {
                            row.viphamchuyennganh ? <p>Môn chuyên ngành{row.viphamchuyennganh.tenHinhthuc} trừ {row.viphamchuyennganh.mucTru}% điểm</p> : <></>
                        }
                        {
                            row.viphamngoaingu ? <p>Môn ngoại ngữ{row.viphamngoaingu.tenHinhthuc} trừ {row.viphamngoaingu.mucTru}% điểm</p> : <></>
                        }
                    </div>
                )

            }
        },
    ]
    // ** Function to handle modalThemHS toggle
    const fetchUser = () => {
        getDanhSachDiem({
            page: currentPage,
            perPage
        }).then(res => {
            setData(res.result)
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchUser()
    }, [currentPage, perPage])
    // ** Function to handle filte
    const handleFilter = (e) => {
        if (e === 'Enter') {
            searchListTruongDaiHoc({
                page: currentPage + 1,
                perPage,
                tenTruong: searchValue
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
        const res = await danhSoBaoDanh()
        responseResultHelper(res, null, fetchUser, ACTION_METHOD_TYPE.DANHSOBAODANH)
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
    const [datathamso, setThamso] = useState()
    
    useEffect(() => {
        getInfo()
        .then(res => {
            const listres = res.result?.data
            setThamso(listres[0] ?? {})
        }).catch(err => {
          console.log(err)
        })
    }, [])
    const handleExportFileDocxGiayBaoKetQua = async () => {
        const datasource = await fetchDataForExport(getAllDanhSach)
        const list = {
            data: []
        }
        datasource.result.data.map((e) => {
            list.data.push({
                ...e,
                NS: toDateString(e.ngaySinh),
                chucVu_ngki: datathamso.chucVu_ngki,
                tenNgki: datathamso.tenNgki,
                ngay: `${new Date().getDay()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
                ngayBDPhucKhao: toDateString(datathamso.ngayBDPhucKhao),
                ngayKTPhucKhao: toDateString(datathamso.ngayKTPhucKhao),
                ngayKTPhucKhao: toDateString(datathamso.ngayKTPhucKhao),
                year : new Date().getFullYear()
            })
        })
        const request = await fetch("/../../template/hoso/giaybaoketquathi.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, list)

        saveFile("giaybaoketquathi.docx", docx)
    }
    const handleExportFileDocx = async (data) => {

        const request = await fetch("/../../template/truongdaihoc/dstruongdaihoc.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, data)
        saveFile("dstruongdaihoc.docx", docx)
    }
    const handleExportFileDocxDiemTheoPhong = async (data) => {
        const datasource = await fetchDataForExport(getDiemThiPhong)
        console.log(datasource)
        datasource.result.data.map(data => {
            data.year = new Date().getFullYear()
            data.data1.map((item, index) => {
                item.index = index + 1
                item.ngaySinh = toDateString(item.ngaySinh)
                item.diemNgoaiNgu = item.ngoaiNgu === 'Miễn Thi' ? 'Miễn thi' : item.diemNgoaiNgu.toFixed(2)
                item.diemCoBan = item.congM1 !==  null ? item.diemCoBan + item.congM1 : item.diemCoBan
                item.diemCoBan = item.diemCoBan.toFixed(2)
                item.diemChuyenNganh = item.diemChuyenNganh.toFixed(2)

            }
            )
        })
        const request = await fetch("/../../template/xulyketquathi/ketquathitheophong.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, datasource.result)
        saveFile("ketquathitheophong.docx", docx)
    }
    const handleExportDanhSach = async () => {
        const temp = await fetchDataForExport(getListDuDieuKienXetTuyen)
        console.log(temp)
        const datasource = []
        let length = 1
        temp.result.data.map((item, index) => {
            item.danhSachTrungTuyen.map((thisinh, k) => {
                const diemNgoaiNgu = thisinh.ngoaiNgu === 'Miễn Thi' ? 'Miễn thi' : thisinh.diemNgoaiNgu
                datasource.push({
                    ...thisinh,
                    index: length,
                    ngaySinh: toDateString(thisinh.ngaySinh),
                    diemNgoaiNgu
                })
                length = length + 1
            })
        })
        const request = await fetch("/../../template/xulyketquathi/danhsachdudiemxettuyen.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, {
            data: datasource,
            year: new Date().getFullYear()
        })
        saveFile("danhsachdudiemxettuyen.docx", docx)
    }
    return (
        <Fragment>
            <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={e => handleImportFile(e)} />
            <input type='file' id='file' ref={inputFileZip} style={{ display: 'none' }} onChange={e => handleImportFileZip(e)} />

            <Card style={{ backgroundColor: 'white' }}>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>

                    <CardTitle tag='h4'>Tính điểm thí sinh</CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle color='secondary' caret outline>
                                <Share size={15} />
                                <span className='align-middle ms-50'>In danh sách điểm</span>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem className='w-100' onClick={() => handleExportFileDocxGiayBaoKetQua(data)}>
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>Giấy báo kết quả</span>
                                </DropdownItem>

                                <DropdownItem className='w-100' onClick={() => handleExportFileDocxDiemTheoPhong(data)}>
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>Danh sách điểm theo phòng</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={() => handleExportDanhSach(data)}>
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>Danh sách đủ điểm xét tuyển</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </div>

                </CardHeader>

                <div className='react-dataTable react-dataTable-selectable-rows' style={{ marginRight: '20px', marginLeft: '20px' }}>
                    {loading ? <WaitingModal /> : <DataTable
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
                    />}
                </div>
            </Card>
        </Fragment>
    )
}


export default TinhDiem
