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
import { getListLoaiHinhDaoTao, searchListLoaiHinhDaoTao, taoLoaiHinhDaoTao, exportLoaiHinhDaoTao, exportLoaiHinhDaoTaoTemplate } from '../../../api/loaiHinhDaoTao'
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

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
    <div className='form-check'>
        <Input type='checkbox' ref={ref} {...props} />
    </div>
))
/***
 * Định nghĩa từ viết tắt
 * 1. LHDT: Loại hình đào tạo
 */
const LoaiHinhDaoTao = () => {
    const ability = useContext(AbilityContext)
    const inputFile = useRef(null)
    // ** States
    const [loading, setLoading] = useState(true)
    const [modalThemLHDT, setModalThemLHDT] = useState(false)
    const [modalSuaLHDT, setModalSuaLHDT] = useState(false)
    const [modalXoaLHDT, setModalXoaLHDT] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [perPage, setPerPage] = useState(10)
    const [data, setData] = useState({
        data: [],
        totalCount: 0
    })
    const [info, setInfo] = useState()
    const _handleSuaLHDT = (data) => {
        setInfo(data)
        setModalSuaLHDT(true)
    }
    const _handleXoaLHDT = (data) => {
        setInfo(data)
        setModalXoaLHDT(true)
    }
    const columns = [
        {
            name: 'STT',
            width: '70px',
            cell: (row, index) => <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{(((currentPage - 1) * perPage) + index + 1)}</span>
        },
        {
            name: 'Tên Loại Hình Đào Tạo',
            minWidth: '250px',
            selector: row => row.tenLoaihinh,
        },
        {
            name: 'Kí hiệu',
            sortable: true,
            minWidth: '250px',
            center: true,
            selector: row => row.kiHieuLoaihinh,
        },
        {
            name: 'Ghi chú',
            sortable: true,
            minWidth: '250px',
            selector: row => row.ghiChu
        },

        {
            name: 'Tác vụ',
            allowOverflow: true,
            maxWidth: '20px',
            cell: (row) => {
                return (
                    <div className='d-flex' style={{ padding: '4px' }}>
                        {ability.can('update', 'lhdaotao') &&
                            <Edit size={15} onClick={e => _handleSuaLHDT(row)} style={{ cursor: 'pointer', color: 'green', marginRight: '10px' }} />}
                        {ability.can('delete', 'lhdaotao') &&
                            <Trash size={15} onClick={e => _handleXoaLHDT(row)} style={{ cursor: 'pointer', color: 'red' }} />}
                    </div>
                )
            }
        }
    ]
    // ** Function to handle modalThemLHDT toggle
    const handleModalThemLHDT = () => setModalThemLHDT(!modalThemLHDT)
    const handleModalSuaLHDT = () => setModalSuaLHDT(!modalSuaLHDT)
    const handleModalXoaLHDT = () => setModalXoaLHDT(!modalXoaLHDT)
    const fetchUser = () => {
        searchListLoaiHinhDaoTao({
            page: currentPage,
            perPage,
            tenLoaiHinh: searchValue
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
            searchListLoaiHinhDaoTao({
                page: currentPage,
                perPage,
                tenLoaiHinh: searchValue
            }).then(res => {
                setData(res.result)
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
                    const res = await taoLoaiHinhDaoTao({
                        tenTruong: item[1],
                        ghiChu: item[2]
                    })
                    if (res?.status) {
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
        const res = await exportLoaiHinhDaoTao()
    }
    const handleExportFileTemplate = async () => {
        const res = await exportLoaiHinhDaoTaoTemplate()
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
        const request = await fetch("/../../template/loaihinhdaotao/dsloaihinhdaotao.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, data)
        saveFile("dsloaihinhdaotao.docx", docx)
    }
    return (
        <Fragment>
            <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={e => handleImportFile(e)} />
            <Card style={{ backgroundColor: 'white' }}>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                    <CardTitle tag='h4'>Danh sách loại hình đào tạo</CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle color='secondary' caret outline style={{ display: "none" }}>
                                <Share size={15} />
                                <span className='align-middle ms-50'>Tùy chọn</span>
                            </DropdownToggle>
                            <DropdownMenu>
                                {ability.can('add', 'lhdaotao') &&
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
                        </UncontrolledButtonDropdown>
                        {ability.can('add', 'lhdaotao') &&
                            <Button className='ms-2' color='primary' onClick={handleModalThemLHDT}>
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
                { loading ? <WaitingModal /> : <DataTable
                        noHeader
                        striped
                        className='react-dataTable'
                        columns={columns}
                        data={filteredData.data ? filteredData.data : data.data}
                        pagination
                        paginationServer
                        paginationTotalRows={filteredData.data ? filteredData.totalCount : data.totalCount}
                        paginationComponentOptions={{
                            rowsPerPageText: 'Số hàng trên 1 trang:'
                        }}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePagination}
                    />}
                </div>
            </Card>
            <AddNewModal open={modalThemLHDT} handleModal={handleModalThemLHDT} fetchUser={fetchUser} />
            {
                <EditModal open={modalSuaLHDT} handleModal={handleModalSuaLHDT} fetchUser={fetchUser} infoEdit={info} />
            }
            {
                <DeleteModal open={modalXoaLHDT} handleModal={handleModalXoaLHDT} fetchUser={fetchUser} infoEdit={info} />
            }
        </Fragment>
    )
}

const AddNewModal = React.lazy(() => import("./modal/AddNewModal"))
const EditModal = React.lazy(() => import("./modal/EditModal"))
const DeleteModal = React.lazy(() => import("./modal/DeleteModal"))

export default LoaiHinhDaoTao

