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
import { getByByDiem, thongKeTheoMucDiem } from '../../../api/hoSoDangKi'

//import thư viện
import { TemplateHandler } from "easy-template-x"
import { saveFile } from '../../utils/util'
import readXlsxFile from 'read-excel-file/web-worker'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toDateString } from '../../../utility/Utils'
import Select, { components } from 'react-select' // eslint-disable-line

import responseResultHelper from '../../utils/reponsive'
import { getListChuyenNganh, suaChuyenNganh } from '../../../api/chuyenNganh'
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
const Detail = () => {

    // ** States
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const [data, setData] = useState({
        data: [],
        totalCount: 0
    })
    const [listChuyenNganh, setListChuyenNganh] = useState([])
    const [chuyenNganh, setChuyenNganh] = useState(null)
    const [loaiTS, setLoaiTS] = useState({ value: "Quân sự", label: "Quân sự" })
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
            name: 'Cơ bản',
            sortable: true,
            minWidth: '30px',
            selector: row => row.mon1
        },
        {
            name: 'Chuyên ngành',
            sortable: true,
            minWidth: '30px',
            selector: row => row.mon1
        },
        {
            name: 'Ngoại ngữ',
            sortable: true,
            minWidth: '30px',
            selector: row => row.mon1
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
            minWidth: '50px',
            selector: row => row.mon1
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
        getByByDiem({
            page: currentPage,
            perPage,
            diem: searchValue,
            loaiTS: loaiTS.value,
            maChuyennganhTS: chuyenNganh?.value.maChuyennganhTS
        }).then(res => {
            setData(res.result)
        })
    }
    const fetchData = async () => {
        getListChuyenNganh({
            page: 1,
            perPage: 100
        }).then(res => {
            setListChuyenNganh(res.result.data)
        }).catch(err => {
            return (
                <Alert color="danger">
                    Có lỗi khi gọi dữ liệu
                </Alert>
            )
        })
    }
    useEffect(() => {
        fetchUser()
        fetchData()

    }, [currentPage, perPage, chuyenNganh, loaiTS, searchValue])
    // ** Function to handle filte
    const handlOnChangeChuyenNganh = (item) => {
        setChuyenNganh({ value: item.value, label: item.label })
        if (loaiTS.value === "Quân sự") {
            setSearchValue(item.value.diemXetTuyenQS)
        } else {
            setSearchValue(item.value.diemXetTuyenDS)
        }
    }
    const handlOnChangeLoaiTS = (item) => {
        setLoaiTS({ value: item.value, label: item.label })
        if (item.value === "Quân sự") {
            setSearchValue(chuyenNganh?.value.diemXetTuyenQS)
        } else {
            setSearchValue(chuyenNganh?.value.diemXetTuyenDS)
        }
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

    const handleExportThongKe = async () => {
        const datasource = await fetchDataForExport(thongKeTheoMucDiem)

        const request = await fetch("/../../template/xulyketquathi/thongketheomucdiem.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, datasource.result)
        saveFile("thongketheomucdiem.docx", docx)
    }
    const _handleLuuDiem = async () => {
        let data = {}
        if (loaiTS.value === "Quân sự") {
            data = {
                id: chuyenNganh.value.maChuyennganhTS,
                body: {
                    diemXetTuyenQS: searchValue
                }
            }
            const temp = Object.assign(chuyenNganh)
            temp.value.diemXetTuyenQS = searchValue
            console.log(temp)
            setChuyenNganh(temp)
        } else {
            data = {
                id: chuyenNganh.value.maChuyennganhTS,
                body: {
                    diemXetTuyenDS: searchValue
                }
            }
            const temp = Object.assign(chuyenNganh)
            temp.value.diemXetTuyenDS = searchValue
            console.log(temp)
            setChuyenNganh(temp)
        }

        const res = await suaChuyenNganh(data)
        responseResultHelper(res, null, fetchData, ACTION_METHOD_TYPE.UPDATESCORE_SUCCESS)
    }
    return (
        <Fragment>

            <Card style={{ backgroundColor: 'white' }}>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>

                    <CardTitle tag='h4'>Cập nhật điểm xét tuyển</CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle color='secondary' caret outline>
                                <Share size={15} />
                                <span className='align-middle ms-50'>Tùy chọn</span>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem className='w-100'>
                                    <Printer size={15} />
                                    <span className='align-middle ms-50 ' onClick={() => handleExportThongKe()}>Thống kê theo mức điểm</span>
                                </DropdownItem>
                                <DropdownItem className='w-100'>
                                    <Printer size={15} />
                                    <span className='align-middle ms-50 ' >Danh sách thí sinh đủ điểm xét tuyển</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </div>

                </CardHeader>

                <Row className='justify-content-end mx-0' style={{ marginBottom: '20px' }}>
                    <Col className='d-flex align-items-center justify-content-start mt-1' md='7' sm='12' style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                        <Label className='me-1' for='search-input'>
                            Chuyên ngành
                        </Label>
                        <Select
                            isClearable={false}
                            name='colors'
                            options={listChuyenNganh.map(item => {
                                return { value: item, label: item.tenChuyennganh }
                            })}
                            onChange={e => handlOnChangeChuyenNganh(e)}
                            value={chuyenNganh}
                            className='react-select'
                            classNamePrefix='select'
                            placeholder='Chọn chuyên ngành'
                        />
                        <Label className='me-1' for='search-input' style={{ marginLeft: '5px' }}>
                            Loại thí sinh
                        </Label>
                        <Select
                            isClearable={false}
                            name='colors'
                            options={[
                                { value: "Quân sự", label: "Quân sự" },
                                { value: "Dân sự", label: "Dân sự" }
                            ]}
                            onChange={e => handlOnChangeLoaiTS(e)}
                            value={loaiTS}
                            className='react-select'
                            classNamePrefix='select'
                            placeholder='Chọn loại thí sinh'
                        />
                    </Col>
                    <Col className='d-flex align-items-center justify-content-end mt-1' md='5' sm='12' style={{ paddingRight: '20px' }}>

                        <Label className='me-1' for='search-input'>
                            Mức điểm xét tuyển
                        </Label>
                        <Input
                            className='dataTable-filter mb-50'
                            type='number'
                            bsSize='sm'
                            id='search-input'
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                            style={{ height: '100%', marginTop: '4px', width: "60px" }}
                        />
                        <Button className='ms-2' color='success' onClick={() => _handleLuuDiem()}>
                            <span className='align-middle ms-50'>Lưu điểm xét tuyển</span>
                        </Button>
                    </Col>
                </Row>
                <Row className='justify-content-start mx-0'>
                    <Col className='d-flex align-items-center justify-content-start mt-1' md='12' sm='12' style={{ paddingRight: '20px', paddingLeft: '20px', marginBottom: '20px' }}>
                        {
                            chuyenNganh && <>Danh sách thí sinh đủ điểm xét tuyển chuyên ngành <span style={{ fontWeight: 'bold', margin: '5px' }}> {chuyenNganh.label}</span> diện <span style={{ fontWeight: 'bold', margin: '5px' }}> {loaiTS.label}</span> ở mức điểm <span style={{ fontWeight: 'bold', margin: '5px', color: 'red' }}>{searchValue}:</span>  <span style={{ fontWeight: 'bold', margin: '5px', color: 'green' }}>{data.totalCount}</span> thí sinh</>
                        }
                    </Col>
                </Row>
                <div className='react-dataTable react-dataTable-selectable-rows' style={{ marginRight: '20px', marginLeft: '20px' }}>
                    <DataTable
                        noHeader
                        striped
                        className='react-dataTable'
                        columns={columns}
                        data={data?.data}
                        pagination
                        paginationServer
                        paginationTotalRows={data?.totalCount}
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


export default Detail
