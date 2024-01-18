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
import { getListChucVu, searchListChucVu, taoChucVu, exportChucVu, exportChucVuTemplate } from '../../../api/chuVu'
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

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
    <div className='form-check'>
        <Input type='checkbox' ref={ref} {...props} />
    </div>
))
/***
 * Định nghĩa từ viết tắt
 * 1. ChucVu: Trường đại học
 */
const ChucVu = () => {
    const inputFile = useRef(null)
    const ability = useContext(AbilityContext)
    // ** States
    const [modalThemChucVu, setModalThemChucVu] = useState(false)
    const [modalSuaChucVu, setModalSuaChucVu] = useState(false)
    const [modalXoaChucVu, setModalXoaChucVu] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [perPage, setPerPage] = useState(10)
    const [data, setData] = useState({
        data: [],
        totalCount: 0
    })
    const [info, setInfo] = useState()
    const _handleSuaChucVu = (data) => {
        setInfo(data)
        setModalSuaChucVu(true)
    }
    const _handleXoaChucVu = (data) => {
        setInfo(data)
        setModalXoaChucVu(true)
    }
    const columns = [
        {
            name: 'STT',
            width: '70px',
            center: true,
            cell: (row, index) => <span>{(((currentPage - 1) * perPage) + index + 1)}</span>
        },
        {
            name: 'Tên cấp bậc',
            center: true,
            minWidth: '200px',
            selector: row => row.tenChucvu,

        },
        {
            name: 'Tác vụ',
            allowOverflow: true,
            center: true,
            width: '150px',
            cell: (row) => {
                return (
                    <div className='d-flex' style={{ padding: '4px' }}>
                        {ability.can('update', 'capbac') &&
                            <Edit size={15} onClick={e => _handleSuaChucVu(row)} style={{ cursor: 'pointer', color: 'green', marginRight: '10px' }} />}
                        {ability.can('delete', 'capbac') &&
                            <Trash size={15} onClick={e => _handleXoaChucVu(row)} style={{ cursor: 'pointer', color: 'red' }} />}
                    </div>
                )
            }
        }
    ]
    // ** Function to handle modalThemChucVu toggle
    const handleModalThemChucVu = () => setModalThemChucVu(!modalThemChucVu)
    const handleModalSuaChucVu = () => setModalSuaChucVu(!modalSuaChucVu)
    const handleModalXoaChucVu = () => setModalXoaChucVu(!modalXoaChucVu)
    const fetchUser = () => {
        getListChucVu({
            page: currentPage,
            perPage
        }).then(res => {
            setData(res.result)
        })
    }
    useEffect(() => {
        fetchUser()
    }, [currentPage, perPage])
    // ** Function to handle filte
    const handleFilter = (e) => {
        if (e === 'Enter') {
            searchListChucVu({
                page: currentPage + 1,
                perPage,
                tenChucvu: searchValue
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
                    const res = await taoChucVu({
                        tenTruong: item[1],
                        ghiChu: item[2]
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
        const res = await exportChucVu()
    }
    const handleExportFileTemplate = async () => {
        const res = await exportChucVuTemplate()
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
        const request = await fetch("/../../template/truongdaihoc/dstruongdaihoc.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, data)
        saveFile("dstruongdaihoc.docx", docx)
    }
    return (
        <Fragment>
            <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={e => handleImportFile(e)} />
            <Card style={{ backgroundColor: 'white' }}>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                    <CardTitle tag='h4'>Danh sách cấp bậc</CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                        {/* <UncontrolledButtonDropdown>
                            <DropdownToggle color='secondary' caret outline>
                                <Share size={15} />
                                <span className='align-middle ms-50'>Tùy chọn</span>
                            </DropdownToggle>
                            <DropdownMenu>
                            {ability.can('add', 'capbac') &&
                                <DropdownItem className='w-100'>
                                    <Printer size={15} />
                                    <span className='align-middle ms-50 ' onClick={onImportFileClick}>Nhập từ file excel</span>
                                </DropdownItem>}
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
                        {ability.can('add', 'capbac') &&
                            <Button className='ms-2' color='primary' onClick={handleModalThemChucVu}>
                                <Plus size={15} />
                                <span className='align-middle ms-50'>Thêm mới</span>
                            </Button>}
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
                            rowsPerPageText: 'Số hàng trên 1 trang:'
                        }}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePagination}
                    />
                </div>
            </Card>
            <AddNewModal open={modalThemChucVu} handleModal={handleModalThemChucVu} fetchUser={fetchUser} />
            {
                <EditModal open={modalSuaChucVu} handleModal={handleModalSuaChucVu} fetchUser={fetchUser} infoEdit={info} />
            }
            {
                <DeleteModal open={modalXoaChucVu} handleModal={handleModalXoaChucVu} fetchUser={fetchUser} infoEdit={info} />
            }
        </Fragment>
    )
}

const AddNewModal = React.lazy(() => import("./modal/AddNewModal"))
const EditModal = React.lazy(() => import("./modal/EditModal"))
const DeleteModal = React.lazy(() => import("./modal/DeleteModal"))

export default ChucVu
