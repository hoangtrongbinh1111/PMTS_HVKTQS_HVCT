// ** React Imports
import React, { Fragment, useState, forwardRef, useEffect, useRef } from 'react'

// imprt thư viện của bảng
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'

//import icon
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, adge, MoreVertical, Trash, Edit, Search } from 'react-feather'

//import css
import '@styles/react/libs/tables/react-dataTable-component.scss'

// import API
import { getListChuyenNganhHep, searchListChuyenNganhHep, taoChuyenNganhHep, exportChuyenNganhHep, exportChuyenNganhHepTemplate } from '../../../api/chuyenNganhHep'
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

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
    <div className='form-check'>
        <Input type='checkbox' ref={ref} {...props} />
    </div>
))
/***
 * Định nghĩa từ viết tắt
 * 1. CN: CHuyên ngành
 */
const ChuyenNganhHep = () => {
    const inputFile = useRef(null)
    // ** States
    const [modalThemCN, setModalThemCN] = useState(false)
    const [modalSuaCN, setModalSuaCN] = useState(false)
    const [modalXoaCN, setModalXoaCN] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [perPage, setPerPage] = useState(10)
    const [listNganhTuyenSinh, setListNganhTuyenSinh] = useState([])

    const [data, setData] = useState({
        data: [],
        totalCount: 0
    })
    const [info, setInfo] = useState()
    const _handleSuaCN = (data) => {
        setInfo(data)
        setModalSuaCN(true)
    }
    const _handleXoaCN = (data) => {
        setInfo(data)
        setModalXoaCN(true)
    }
    const columns = [
        {
            name: 'Tên chuyên ngành hẹp',
            minWidth: '250px',
            selector: row => row.tenChuyennganhhep,
        },
        {
            name: 'Kí hiệu',
            sortable: true,
            minWidth: '50px',
            selector: row => row.kiHieuChuyennganhhep
        },
        {
            name: 'Tên chuyên ngành',
            sortable: true,
            minWidth: '50px',
            selector: row => row.tenChuyennganh
        },
        {
            name: 'Ghi Chú',
            sortable: true,
            minWidth: '50px',
            selector: row => row.ghiChu
        },

        {
            name: 'Tác vụ',
            allowOverflow: true,
            maxWidth: '20px',
            cell: (row) => {
                return (
                    <div className='d-flex' style={{ padding: '4px' }}>

                        <Edit size={15} onClick={e => _handleSuaCN(row)} style={{ cursor: 'pointer', color: 'green', marginRight: '10px' }} />
                        <Trash size={15} onClick={e => _handleXoaCN(row)} style={{ cursor: 'pointer', color: 'red' }} />

                    </div>
                )
            }
        }
    ]
    // ** Function to handle modalThemCN toggle
    const handleModalThemCN = () => setModalThemCN(!modalThemCN)
    const handleModalSuaCN = () => setModalSuaCN(!modalSuaCN)
    const handleModalXoaCN = () => setModalXoaCN(!modalXoaCN)
    const fetchUser = () => {
        getListChuyenNganhHep({
            page: currentPage + 1,
            perPage
        }).then(res => {
            setData(res.result)
        })
    }
    const fetchNganhTuyenSinh = () => {
        getListChuyenNganh({
            page: 1,
            perPage: 10000
        }).then(res => {
            setListNganhTuyenSinh(res.result.data)
        })
    }

    useEffect(() => {
        fetchUser()
        fetchNganhTuyenSinh()
    }, [currentPage, perPage])
    // ** Function to handle filte
    const handleFilter = (e) => {
        if (e === 'Enter') {
            searchListChuyenNganhHep({
                page: currentPage + 1,
                perPage,
                tenChuyennganh: searchValue
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
                    const res = await taoChuyenNganhHep({
                        tenChuyennganh: item[1],
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
        const res = await exportChuyenNganhHep()
    }
    const handleExportFileTemplate = async () => {
        const res = await exportChuyenNganhHepTemplate()
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
                    <CardTitle tag='h4'>Danh sách chuyên ngành hẹp</CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                        <UncontrolledButtonDropdown>
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
                        </UncontrolledButtonDropdown>
                        <Button className='ms-2' color='primary' onClick={handleModalThemCN}>
                            <Plus size={15} />
                            <span className='align-middle ms-50'>Thêm mới</span>
                        </Button>
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
                        data={filteredData.data ? filteredData.data : data.data}
                        pagination
                        paginationServer
                        paginationTotalRows={filteredData.data ? filteredData.totalCount : data.totalCount}
                        paginationComponentOptions={{
                            rowsPerPageText: 'Số hàng trên 1 trang:'
                        }}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePagination}
                    />
                </div>
            </Card>
            <AddNewModal open={modalThemCN} handleModal={handleModalThemCN} listNganhTuyenSinh={listNganhTuyenSinh} fetchUser={fetchUser} />
            {
                <EditModal open={modalSuaCN} handleModal={handleModalSuaCN} listNganhTuyenSinh={listNganhTuyenSinh} fetchUser={fetchUser} infoEdit={info} />
            }
            {
                <DeleteModal open={modalXoaCN} handleModal={handleModalXoaCN} fetchUser={fetchUser} infoEdit={info} />
            }
        </Fragment>
    )
}

const AddNewModal = React.lazy(() => import("./modal/AddNewModal"))
const EditModal = React.lazy(() => import("./modal/EditModal"))
const DeleteModal = React.lazy(() => import("./modal/DeleteModal"))

export default ChuyenNganhHep

