// ** React Imports
import React, { Fragment, useState, forwardRef, useEffect, useRef, useContext } from 'react'

// imprt thư viện của bảng
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'

//import icon
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, adge, MoreVertical, Trash, Edit, Search } from 'react-feather'

//import css
import '@styles/react/libs/tables/react-dataTable-component.scss'

// import API
import { getListNganhTuyenSinh, searchListNganhTuyenSinh, taoNganhTuyenSinh, exportNganhTuyenSinh, exportNganhTuyenSinhTemplate } from '../../../api/nganhTuyenSinh'
import { getListChiTieu, searchListChiTieu, getListChiTieuDetail, getListDCNot } from '../../../api/chiTieuTuyenSinh'
import { getListChuyenNganh } from '../../../api/chuyenNganh'

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
import { AbilityContext } from '@src/utility/context/Can'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
    <div className='form-check'>
        <Input type='checkbox' ref={ref} {...props} />
    </div>
))

const Detail = ({ row, fetchData }) => {
    const ability = useContext(AbilityContext)
    const data = row?.data
    const inputFile = useRef(null)
    // ** States
    const [modalThemNTS, setModalThemNTS] = useState(false)
    const [modalSuaNTS, setModalSuaNTS] = useState(false)
    const [modalXoaNTS, setModalXoaNTS] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [perPage, setPerPage] = useState(10)
    const [listDC, setListDC] = useState([])
    const [listChiTieu, setListChiTieu] = useState({
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
            cell: (row, index) => <span>{(((currentPage - 1) * perPage) + index + 1)}</span>
        },
        {
            name: 'Địa chỉ đào tạo',
            center: true,
            widt: '200px',
            selector: row => <span>{row.tenDc}</span>,
        },
        {
            name: 'Số lượng QS',
            sortable: true,
            width: '180px',
            center: true,
            selector: row => <span>{row.soLuongQS ? row.soLuongQS : 0}</span>
        },
        {
            name: 'Số lượng DS',
            sortable: true,
            width: '180px',
            center: true,
            selector: row => <span>{row.soLuongDS ? row.soLuongDS : 0}</span>
        },
        {
            name: 'Tổng',
            sortable: true,
            width: '150px',
            center: true,
            selector: row => <span>{row.soLuongQS + row.soLuongDS}</span>
        },
        {
            name: 'Tác vụ',
            allowOverflow: true,
            maxWidth: '20px',
            cell: (row) => {
                return (
                    <div className='d-flex' style={{ padding: '4px' }}>
                        {ability.can('update', 'chitieu') &&
                            <Edit size={15} onClick={e => _handleSuaNTS(row)} style={{ cursor: 'pointer', color: 'green', marginRight: '10px' }} />}
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
    const fetchDataDetail = () => {
        getListChiTieuDetail({
            params: {
                page: currentPage,
                perPage,
                maChuyennganhTS: data?.maChuyennganhTS
            }
        }).then(res => {
            setListChiTieu(res.result)
        }).catch(err => {
            console.log(err)
        })
    }
    const fetchListDC = () => {
        getListDCNot({
            params: {
                maChuyennganhTS: data?.maChuyennganhTS
            }
        }).then(res => {
            setListDC(res.result?.data)
        })
    }
    useEffect(() => {
        fetchDataDetail()
        fetchListDC()
    }, [currentPage, perPage])
    // ** Function to handle filte
    const handleFilter = (e) => {
        if (e === 'Enter') {
            searchListChiTieu({
                page: currentPage,
                perPage,
                tenMon: searchValue
            }).then(res => {
                setFilteredData(res.result)
            })
        }

    }
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

    const handleExportFileDocx = async (data) => {
        const request = await fetch("/../../template/diachidaotao/dsdiachidaotao.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, data)
        saveFile("dsdiachidaotao.docx", docx)
    }
    return (
        <Fragment>
            <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={e => handleImportFile(e)} />
            <Card style={{ backgroundColor: 'white' }}>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                    <CardTitle tag='h5'>Chuyên ngành {data?.tenChuyennganh}        </CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                        {/* <UncontrolledButtonDropdown>
                            <DropdownToggle color='secondary' caret outline>
                                <Share size={15} />
                                <span className='align-middle ms-50'>Tùy chọn</span>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem className='w-100'>
                                    <Printer size={15} />
                                    <span className='align-middle ms-50 ' onClick={onImportFileClick}>Nhập từ file excel</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={() => handleExportFileDocx(data)}>
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>Xuất file docx</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={() => handleExportFileExcel(data)}>
                                    <Grid size={15} />
                                    <span className='align-middle ms-50'> Xuất file Excel</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={() => handleExportFileTemplate()}>
                                    <File size={15} />
                                    <span className='align-middle ms-50'>Tải file nhập mẫu</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown> */}
                        {ability.can('add', 'chitieu') &&
                            <Button className='ms-2' color='primary' onClick={handleModalThemNTS}>
                                <Plus size={15} />
                                <span className='align-middle ms-50'>Thêm mới</span>
                            </Button>
                        }
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
                        data={filteredData?.data ? filteredData.data : listChiTieu.data}
                        pagination
                        paginationServer
                        paginationTotalRows={filteredData?.data ? filteredData.totalCount : listChiTieu.totalCount}
                        paginationComponentOptions={{
                            rowsPerPageText: 'Số hàng trên 1 trang:'
                        }}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePagination}
                    />
                </div>
            </Card>
            <AddNewModal open={modalThemNTS} handleModal={handleModalThemNTS} fetchDataDetail={fetchDataDetail} fetchData={fetchData} data={data} listDC={listDC} />
            {
                <EditModal open={modalSuaNTS} handleModal={handleModalSuaNTS} fetchDataDetail={fetchDataDetail} fetchData={fetchData} data={data} listDC={listDC} infoEdit={info} />
            }
            {
                <DeleteModal open={modalXoaNTS} handleModal={handleModalXoaNTS} fetchDataDetail={fetchDataDetail} fetchData={fetchData} infoEdit={info} />
            }
        </Fragment>
    )
}

const AddNewModal = React.lazy(() => import("./modalCTTS/AddNewModal"))
const EditModal = React.lazy(() => import("./modalCTTS/EditModal"))
const DeleteModal = React.lazy(() => import("./modalCTTS/DeleteModal"))

export default Detail

