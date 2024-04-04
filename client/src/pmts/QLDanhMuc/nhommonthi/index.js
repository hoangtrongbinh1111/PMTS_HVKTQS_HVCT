// ** React Imports
import React, { Fragment, useState, forwardRef, useEffect, useRef, useContext } from 'react'

// imprt thư viện của bảng
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'

//import icon
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, adge, MoreVertical, Trash, Edit, Search } from 'react-feather'

//import css
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

// import API
import { getListNhomMonThi, searchListNhomMonThi, taoNhomMonThi, exportNhomMonThi, exportNhomMonThiTemplate } from '../../../api/nhomMonthi'

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
    Badge
} from 'reactstrap'
import { toDateString } from '../../../utility/Utils'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
    <div className='form-check'>
        <Input type='checkbox' ref={ref} {...props} />
    </div>
))
/***
 * Định nghĩa từ viết tắt
 * 1. NMT: Nhóm Môn thi
 */
const NhomMonThi = () => {
    const ability = useContext(AbilityContext)
    const inputFile = useRef(null)
    // ** States
    const [modalThemNMT, setModalThemNMT] = useState(false)
    const [modalSuaNMT, setModalSuaNMT] = useState(false)
    const [modalXoaNMT, setModalXoaNMT] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [perPage, setPerPage] = useState(10)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({
        data: [],
        totalCount: 0
    })
    const [info, setInfo] = useState()
    const _handleSuaNMT = (data) => {
        setInfo(data)
        setModalSuaNMT(true)
    }
    const _handleXoaNMT = (data) => {
        setInfo(data)
        setModalXoaNMT(true)
    }
    const columns = [
        {
            name: 'STT',
            width: '70px',
            cell: (row, index) => <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{(((currentPage - 1) * perPage) + index + 1)}</span>

        },
        {
            name: 'Tên Nhóm Môn Thi',
            minWidth: '250px',
            selector: row => row.tenNhomMonHoc
        },
        {
            name: 'Giờ Thi',
            sortable: true,
            center: "true",
            minWidth: '50px',
            selector: row => row.gioThi && `${new Date(row.gioThi).getHours()}h${new Date(row.gioThi).getMinutes()}p`
        },
        {
            name: 'Ngày Thi',
            sortable: true,
            center: "true",
            minWidth: '50px',
            selector: row => row.ngayThi && toDateString(row.ngayThi)
        },

        {
            name: 'Tác vụ',
            allowOverflow: true,
            maxWidth: '20px',
            right: true,
            cell: (row) => {
                return (
                    <div className='d-flex' style={{ padding: '4px' }}>
                        {ability.can('update', 'nhommonthi') &&
                            <Edit size={15} onClick={e => _handleSuaNMT(row)} style={{ cursor: 'pointer', color: 'green', marginRight: '10px' }} />}
                        {ability.can('delete', 'nhommonthi') &&
                            <Trash size={15} onClick={e => _handleXoaNMT(row)} style={{ cursor: 'pointer', color: 'red' }} />
                        }
                    </div>
                )
            }
        }
    ]
    // ** Function to handle modalThemNMT toggle
    const handleModalThemNMT = () => setModalThemNMT(!modalThemNMT)
    const handleModalSuaNMT = () => setModalSuaNMT(!modalSuaNMT)

    const handleModalXoaNMT = () => setModalXoaNMT(!modalXoaNMT)
    const fetchUser = () => {
        searchListNhomMonThi({
            page: currentPage,
            perPage,
            tenNhomMonHoc: searchValue
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
            searchListNhomMonThi({
                page: currentPage,
                perPage,
                tenNhomMonHoc: searchValue
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
                    const res = await taoNhomMonThi({
                        tenNhomMonHoc: item[1],
                        ngayThi: item[2],
                        gioThi: item[3]
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
        const res = await exportNhomMonThi()
    }
    const handleExportFileTemplate = async () => {
        const res = await exportNhomMonThiTemplate()
    }
    // ** Function to handle Pagination
    const handlePagination = page => {
        setCurrentPage(page)
    }
    const handlePerRowsChange = (perPage, page) => {
        setCurrentPage(page)
        setPerPage(perPage)
    }
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
                    <CardTitle tag='h4'>Danh sách nhóm môn thi</CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle color='secondary' caret outline style={{ display: "none" }}>
                                <Share size={15} />
                                <span className='align-middle ms-50'>Tùy chọn</span>
                            </DropdownToggle>
                            <DropdownMenu>
                                {ability.can('add', 'nhommonthi') &&
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
                        {ability.can('add', 'nhommonthi') &&
                            <Button className='ms-2' color='primary' onClick={handleModalThemNMT}>
                                <Plus size={15} />
                                <span className='align-middle ms-50'>Thêm mới</span>
                            </Button>}
                    </div>
                </CardHeader>
                <Row className='justify-content-end mx-0' >
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
                            placeholder='Tìm kiếm theo tên nhóm'
                            onChange={e => setSearchValue(e.target.value)}
                            onKeyDown={e => handleFilter(e.key)}
                        />
                    </Col>
                </Row>
                <div className='react-dataTable react-dataTable-selectable-rows' style={{ marginRight: '20px', marginLeft: '20px' }}>
                    {
                        loading ? <WaitingModal /> :
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
                        style={{
                            borderRadius: '5px',
                            borderStyle: 'solid',
                            borderWidth: '1px'
                        }}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePagination}
                    />
}
                </div>
            </Card>
            <AddNewModal open={modalThemNMT} handleModal={handleModalThemNMT} fetchUser={fetchUser} />
            {
                <EditModal open={modalSuaNMT} handleModal={handleModalSuaNMT} fetchUser={fetchUser} infoEdit={info} />
            }
            {
                <DeleteModal open={modalXoaNMT} handleModal={handleModalXoaNMT} fetchUser={fetchUser} infoEdit={info} />
            }
        </Fragment>
    )
}

const AddNewModal = React.lazy(() => import("./modal/AddNewModal"))
const EditModal = React.lazy(() => import("./modal/EditModal"))
const DeleteModal = React.lazy(() => import("./modal/DeleteModal"))

export default NhomMonThi

