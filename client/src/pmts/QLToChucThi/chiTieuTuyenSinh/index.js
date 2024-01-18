// ** React Imports
import React, { Fragment, useState, forwardRef, useEffect, useRef, useContext } from 'react'

// imprt thư viện của bảng
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'

//import icon
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, adge, MoreVertical, Trash, Edit, Search } from 'react-feather'

//import css
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { AbilityContext } from '@src/utility/context/Can'

// import API
import { getListNganhTuyenSinh, searchListNganhTuyenSinh, taoNganhTuyenSinh, exportNganhTuyenSinh, exportNganhTuyenSinhTemplate } from '../../../api/nganhTuyenSinh'
import { getListChiTieu, searchListChiTieu, getDataToExport } from '../../../api/chiTieuTuyenSinh'
import { getListChuyenNganh } from '../../../api/chuyenNganh'
import { getListDiaChiDaoTao } from '../../../api/diaChiDaoTao'

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
import Detail from './detail'
// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
    <div className='form-check'>
        <Input type='checkbox' ref={ref} {...props} />
    </div>
))
/***
 * Định nghĩa từ viết tắt
 * 1. NTS: Ngành Tuyển SInh
 */
const ChiTieuTuyenSinh = () => {
    const ability = useContext(AbilityContext)
    const inputFile = useRef(null)
    // ** States
    const [modalThemNTS, setModalThemNTS] = useState(false)
    const [modalSuaNTS, setModalSuaNTS] = useState(false)
    const [modalXoaNTS, setModalXoaNTS] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState('')
    const [perPage, setPerPage] = useState(10)
    const [loading, setLoading] = useState(true)
    const [listData, setListData] = useState({
        data: [],
        totalCount: 0
    })
    const [listDC, setListDC] = useState([])
    const [data, setData] = useState({
        data: [],
        totalCount: 0
    })
    const [info, setInfo] = useState()
    const _handleSuaNTS = (data) => {
        setInfo(data)
        setModalSuaNTS(true)
    }
    const _handleXoaNTS = (data) => {
        setInfo(data)
        setModalXoaNTS(true)
    }
    const columns = [
        {
            name: "STT",
            center: true,
            width: "70px",
            cell: (row, index) => (((currentPage - 1) * perPage) + index + 1)
        },
        {
            name: 'Kí hiệu CN',
            center: true,
            widt: '80px',
            selector: row => row.kiHieuChuyennganh,
        },
        {
            name: 'Tên chuyên ngành',
            centrer: true,
            width: '250px',
            selector: row => row.tenChuyennganh
        },
        {
            name: 'Số lượng QS',
            sortable: true,
            width: '180px',
            center: true,
            selector: row => row.totalQS ?? 0
        },
        {
            name: 'Số lượng DS',
            sortable: true,
            width: '180px',
            center: true,
            selector: row => row.totalDS ?? 0
        },
        {
            name: 'Tổng',
            sortable: true,
            width: '150px',
            center: true,
            selector: row => row.tong
        },
        {
            name: 'Tác vụ',
            allowOverflow: true,
            maxWidth: '20px',
            center: true,
            cell: (row) => {
                return (
                    <div className='d-flex' style={{ padding: '4px' }}>
                                                {ability.can('update', 'chitieu') &&
                        <Edit size={15} style={{ cursor: 'pointer', color: '#09A863', marginRight: '10px' }} data-tag="allowRowEvents" />}
                        {ability.can('delete', 'chitieu') &&
                            <Trash size={15} onClick={e => _handleXoaNTS(row)} style={{ cursor: 'pointer', color: 'red' }} />}
                    </div>
                )
            }
        }
    ]
    // ** Function to handle modalThemNTS toggle
    const handleModalThemNTS = () => setModalThemNTS(!modalThemNTS)
    const handleModalSuaNTS = () => setModalSuaNTS(!modalSuaNTS)
    const handleModalXoaNTS = () => setModalXoaNTS(!modalXoaNTS)
    const fetchDataToExport = async (callAPI, setData) => {
        callAPI({
            page: 1,
            perPage: 100
        }).then(res => {
            setData(res.result?.data ?? [])
            setLoading(false)
        }).catch(err => {
            <Alert color="danger">
                Có lỗi khi gọi dữ liệu
            </Alert>
        })
    }
    const fetchData = () => {
        getListChiTieu({
            params: {
                page: currentPage,
                perPage,
                ...(search && search !== "" && { search }),
            }
        }).then(res => {
            setData(res.result)
            setLoading(false)
        })
    }
    const fetchListDC = () => {
        getListDiaChiDaoTao({
            page: 1,
            perPage: 20
        }).then(res => {
            setListDC(res.result?.data)
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        fetchData()
        fetchListDC()
    }, [currentPage, perPage, search])

    const onImportFileClick = () => {
        // `current` points to the mounted file input element
        inputFile.current.click()
    }
    const handleImportFile = (e) => {
        const files = e.target.files[0]
        const MySwal = withReactContent(Swal)
        readXlsxFile(files).then((rows) => {
            // `rows` is an array of rows
            // each row being an array of cells.
            const temp = []
            rows.forEach(async (item, index) => {
                if (index > 5) {
                    const res = await taoNganhTuyenSinh({
                        tenMon: item[1],
                        ghiChu: item[2],
                        diemLiet: item[3]
                    })
                    if (res.status) {
                        fetchUser()
                    } else {
                        MySwal.fire({
                            icon: "error",
                            title: "Có lỗi xảy ra",
                            text: "Vui lòng thử lại",
                            customClass: {
                                confirmButton: "btn btn-danger"
                            }
                        })
                    }
                }
            })
            MySwal.fire({
                icon: "success",
                title: 'Thành công',
                customClass: {
                    confirmButton: "btn btn-success"
                }
            })

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
    const handleExportFileExcel = async () => {
        const res = await exportNganhTuyenSinh()
    }
    const handleExportFileTemplate = async () => {
        const res = await exportNganhTuyenSinhTemplate()
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
    const CustomPagination = () => (
        <ReactPaginate
            previousLabel=''
            nextLabel=''
            forcePage={currentPage}
            onPageChange={page => handlePagination(page)}
            breakLabel='...'
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName='active'
            pageClassName='page-item'
            breakClassName='page-item'
            nextLinkClassName='page-link'
            pageLinkClassName='page-link'
            breakLinkClassName='page-link'
            previousLinkClassName='page-link'
            nextClassName='page-item next-item'
            previousClassName='page-item prev-item'
            containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
        />
    )


    // ** Converts table to CSV
    const fetchDataForExport1 = (callAPI) => {
        const data = callAPI({
            page: 1,
            perPage: 100
        }).then(res => {
            return (res)
        })
        return data
    }

    const fetchDataForExport2 = (callAPI) => {
        const data = callAPI().then(res => {
            return (res?.result)
        })
        return data
    }

    const handleExportFileDocx = async () => {
        const datasource = await fetchDataForExport1(getListDiaChiDaoTao)
        const datasource2 = await fetchDataForExport2(getDataToExport)
        const list = {
            data: [],
            year: new Date().getFullYear()
        }
        list.data.push({
            dc1: listDC[0]?.KiHieuDc,
            dc2: listDC[1]?.KiHieuDc,
            dc3: listDC[2]?.KiHieuDc,
            dc4: listDC[3]?.KiHieuDc,
            dc5: listDC[4]?.KiHieuDc,
            dc6: listDC[0]?.KiHieuDc,
            dc7: listDC[1]?.KiHieuDc,
            dc8: listDC[2]?.KiHieuDc,
            dc9: listDC[3]?.KiHieuDc,
            dc10: listDC[4]?.KiHieuDc,
            list2: datasource2
        })
        const request = await fetch("/../../template/chitieutuyensinh/danhsachchitieutuyensinh.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, list)
        saveFile("danhsachchitieutuyensinh.docx", docx)
    }
    return (
        <Fragment>
            <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={e => handleImportFile(e)} />
            <Card style={{ backgroundColor: 'white' }}>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                    <CardTitle tag='h4'>Chỉ tiêu tuyển sinh</CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle color='secondary' caret outline>
                                <Share size={15} />
                                <span className='align-middle ms-50'>Tùy chọn</span>
                            </DropdownToggle>
                            <DropdownMenu>
                                {/* <DropdownItem className='w-100'>
                                    <Printer size={15} />
                                    <span className='align-middle ms-50 ' onClick={onImportFileClick}>Nhập từ file excel</span>
                                </DropdownItem> */}
                                <DropdownItem className='w-100' onClick={() => handleExportFileDocx(data)}>
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>Xuất file docx</span>
                                </DropdownItem>
                                {/* <DropdownItem className='w-100' onClick={() => handleExportFileExcel(data)}>
                                    <Grid size={15} />
                                    <span className='align-middle ms-50'> Xuất file Excel</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={() => handleExportFileTemplate()}>
                                    <File size={15} />
                                    <span className='align-middle ms-50'>Tải file nhập mẫu</span>
                                </DropdownItem> */}
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                        {/* <Button className='ms-2' color='primary' onClick={handleModalThemNTS}>
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
                            placeholder="Tìm kiếm tại đây"
                            onChange={(e) => {
                                if (e.target.value === "") {
                                    setSearch('')
                                }
                            }}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    setSearch(e.target.value)
                                    setCurrentPage(1)
                                }
                            }}
                        />
                    </Col>
                </Row>
                <div className='react-dataTable react-dataTable-selectable-rows' style={{ marginRight: '20px', marginLeft: '20px' }}>
                { loading ? <WaitingModal /> :  <DataTable
                        noDataComponent='Chưa có chuyên ngành tuyển sinh'
                        noHeader
                        striped
                        className='react-dataTable'
                        columns={columns}
                        data={data?.data}
                        pagination
                        paginationServer
                        paginationTotalRows={data.totalCount}
                        paginationComponentOptions={{
                            rowsPerPageText: 'Số hàng trên 1 trang:'
                        }}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePagination}
                        expandOnRowClicked
                        expandableRows
                        expandableRowsComponent={(row) => (
                            <Detail row={row} fetchData={fetchData} />
                        )} />}
                </div>
            </Card>
            {/* <AddNewModal open={modalThemNTS} handleModal={handleModalThemNTS} listChuyennganh={listCN} fetchData={fetchData} /> */}
            {/* { 
                <EditModal open={modalSuaNTS} handleModal={handleModalSuaNTS} listMonHoc={listMonHoc}  listNganh={listNganh} fetchUser={fetchUser} infoEdit={info} />
            }*/}
            {
                <DeleteModal open={modalXoaNTS} handleModal={handleModalXoaNTS} fetchData={fetchData} infoEdit={info} />
            }
        </Fragment>
    )
}

const DeleteModal = React.lazy(() => import("./modalTS/DeleteModal"))

export default ChiTieuTuyenSinh

