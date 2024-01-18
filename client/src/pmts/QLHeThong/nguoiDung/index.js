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
import { getListUser, searchListUser, createUser, exportUser, exportUserTemplate } from '../../../api/user'

//import thư viện
import { TemplateHandler } from "easy-template-x"
import { saveFile } from '../../utils/util'
import readXlsxFile from 'read-excel-file/web-worker'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { AbilityContext } from '@src/utility/context/Can'
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
    Badge,
    UncontrolledTooltip
} from 'reactstrap'
import { toDateTimeString, toDateString } from '../../../utility/Utils'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
    <div className='form-check'>
        <Input type='checkbox' ref={ref} {...props} />
    </div>
))

const NguoiDung = () => {
    const ability = useContext(AbilityContext)
    const inputFile = useRef(null)
    // ** States
    const [loading, setLoading] = useState(true)
    const [modalThemNND, setModalThemNND] = useState(false)
    const [modalSuaNND, setModalSuaNND] = useState(false)
    const [modalXoaNND, setModalXoaNND] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [perPage, setPerPage] = useState(10)
    const [data, setData] = useState({
        data: [],
        totalCount: 0
    })
    const [infoEdit, setInfoEdit] = useState()
    const [infoDelete, setInfoDelete] = useState()
    const _handleSuaNND = (data) => {
        setInfoEdit(data)
        setModalSuaNND(true)
    }
    const _handleXoaNND = (data) => {
        setInfoDelete(data)
        setModalXoaNND(true)
    }
    const columns = [
        {
            name: "STT",
            center: true,
            width: '70px',
            cell: (row, index) => (((currentPage - 1) * perPage) + index + 1)
        },
        {
            name: "Ngày BĐ",
            selector: "ngayBD",
            center: true,
            minWidth: "50px",
            cell: row => <span>{toDateString(row.ngayBD)}</span>
        },
        {
            name: "Ngày KT",
            selector: "ngayKT",
            center: true,
            minWidth: "50px",
            cell: row => <span>{row.ngayKT ? toDateString(row.ngayKT) : ''}</span>
        },
        {
            name: "Tên ĐK",
            selector: "tenDangKy",
            center: true,
            minWidth: "120px",
            cell: (row) => <span>{row.tenDangKy}</span>
        },
        {
            name: "Họ tên",
            selector: "hoTen",
            center: true,
            minWidth: "120px",
            cell: (row) => <span>{row.hoTen}</span>
        },
        {
            name: "Nhóm",
            selector: "tenNhom",
            sortable: true,
            center: true,
            minWidth: "120px",
            cell: (row) => <span>{row.tenNhom}</span>
        },
        {
            name: 'Ghi chú',
            center: true,
            minWidth: '100px',
            selector: row => row.ghiChu
        },
        {
            name: 'Tác vụ',
            minWidth: "110px",
            center: true,
            cell: (row) => {
                return (
                    <div className="column-action d-flex align-items-center">
                        {ability.can('update', 'nguoidung') &&
                            <div onClick={() => _handleSuaNND(row)} id="tooltip_edit" style={{ marginRight: '1rem' }}>
                                <Edit
                                    size={15}
                                    style={{ cursor: "pointer", stroke: '#09A863' }}
                                />
                                <UncontrolledTooltip placement='top' target='tooltip_edit'>
                                    Sửa thông tin người dùng              </UncontrolledTooltip>
                            </div>}
                        {ability.can('delete', 'nguoidung') &&
                            <div onClick={() => _handleXoaNND(row)} id="tooltip_trash">
                                <Trash
                                    size={15}
                                    style={{ cursor: "pointer", stroke: "red" }}
                                />
                                <UncontrolledTooltip placement='top' target='tooltip_trash'>
                                    Xóa người dùng              </UncontrolledTooltip>
                            </div>}
                    </div>
                )
            }
        }
    ]
    // ** Function to handle modalThemNND toggle
    const handleModalThemNND = () => setModalThemNND(!modalThemNND)
    const handleModalSuaNND = () => setModalSuaNND(!modalSuaNND)
    const handleModalXoaNND = () => setModalXoaNND(!modalXoaNND)
    const fetchUser = () => {
        getListUser({
            params: {
                currentPage,
                perPage,
                ...(searchValue && searchValue !== "" && { searchValue }),
            }
        }).then(res => {
            setData(res.result)
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchUser()
    }, [currentPage, searchValue, perPage])

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
            // pageCount={searchValue.length ? Math.ceil(filteredData.totalCount / 7) : Math.ceil(data.totalCount / 7) || 1}
            pageCount={Math.ceil(data.totalCount / perPage) || 1}
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
    return (
        <Fragment>
            <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={e => handleImportFile(e)} />
            <Card style={{ backgroundColor: 'white' }}>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                    <CardTitle tag='h4'>Danh sách người dùng</CardTitle>
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
                        {ability.can('add', 'nguoidung') &&
                            <Button className='ms-2' color='primary' onClick={handleModalThemNND}>
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
                            onChange={(e) => {
                                if (e.target.value === "") {
                                    setSearchValue('')
                                }
                            }}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    setSearchValue(e.target.value)
                                    setCurrentPage(0)
                                }
                            }}
                        />
                    </Col>
                </Row>
                <div className='react-dataTable react-dataTable-selectable-rows' style={{ marginRight: '20px', marginLeft: '20px' }}>
                    {loading ? <WaitingModal /> : <DataTable
                        noHeader
                        pagination
                        columns={columns}
                        paginationPerPage={7}
                        className='react-dataTable'
                        sortIcon={<ChevronDown size={10} />}
                        selectableRowsComponent={BootstrapCheckbox}
                        // data={searchValue.length ? filteredData.data : data.data}
                        data={data.data}
                        paginationServer
                        paginationTotalRows={data.totalCount}
                        paginationComponentOptions={{
                            rowsPerPageText: 'Số hàng trên 1 trang:'
                        }}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePagination}
                    />}
                </div>
            </Card >
            <AddNewModal open={modalThemNND} handleModal={handleModalThemNND} fetchUser={fetchUser} />
            {
                infoEdit && <EditModal open={modalSuaNND} handleModal={handleModalSuaNND} fetchUser={fetchUser} infoEdit={infoEdit} />
            }
            {
                infoDelete && <DeleteModal open={modalXoaNND} handleModal={handleModalXoaNND} fetchUser={fetchUser} infoDelete={infoDelete} />
            }
        </Fragment >
    )
}

const AddNewModal = React.lazy(() => import("./modal/AddNewModal"))
const EditModal = React.lazy(() => import("./modal/EditModal"))
const DeleteModal = React.lazy(() => import("./modal/DeleteModal"))

export default NguoiDung
