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
import { getListNganhDaiHoc } from '../../../api/nganhDaiHoc'
import { getListMonThi } from '../../../api/monThi'
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
import { getListNhomMonThi } from '../../../api/nhomMonthi'
import WaitingModal from '../../../views/ui-elements/waiting-modals'
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
const NganhTuyenSinh = () => {
    const ability = useContext(AbilityContext)
    const inputFile = useRef(null)
    // ** States
    const [modalThemNTS, setModalThemNTS] = useState(false)
    const [modalSuaNTS, setModalSuaNTS] = useState(false)
    const [modalXoaNTS, setModalXoaNTS] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [perPage, setPerPage] = useState(10)
    const [listMonHoc, setListMon] = useState([])
    const [listNganh, setListNganh] = useState([])
    const [dataNhommon, setListNhomMon] = useState()
    const [loading, setLoading] = useState(true)

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
            name: 'STT',
            width: '70px',
            cell: (row, index) => <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{(((currentPage - 1) * perPage) + index + 1)}</span>
        },
        {
            name: 'Tên Ngành',
            minWidth: '250px',
            selector: row => row.tenNganh,
        },
        {
            name: 'Mã ngành',
            width: '120px',
            center: true,
            selector: row => row.kihieuNganh,
        },
        {
            name: 'Môn 1',
            sortable: true,
            minWidth: '230px',
            selector: row => row.mon1
        },
        {
            name: 'Môn 2',
            sortable: true,
            minWidth: '230px',
            selector: row => row.mon2
        },
        {
            name: 'Môn 3',
            sortable: true,
            minWidth: '100px',
            selector: row => row.mon3
        },
        {
            name: 'Ghi chú',
            sortable: true,
            minWidth: '100px',
            selector: row => row.ghiChu
        },
        {
            name: 'Tác vụ',
            allowOverflow: true,
            maxWidth: '20px',
            cell: (row) => {
                return (
                    <div className='d-flex' style={{ padding: '4px' }}>
                        {ability.can('update', 'dsnganh') &&
                            <Edit size={15} onClick={e => _handleSuaNTS(row)} style={{ cursor: 'pointer', color: 'green', marginRight: '10px' }} />}
                        {ability.can('delete', 'dsnganh') &&
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
    const fetchUser = () => {
        searchListNganhTuyenSinh({
            page: currentPage,
            perPage,
            tenNganh: searchValue
        }).then(res => {
            setLoading(false)
            setData(res.result)
        })
    }
    const fetchNhomMonHoc = () => {
        getListNhomMonThi({
            page: 1,
            perPage: 10000
        }).then(res => {
            setListNhomMon(res.result.data)
        })
    }
    const fetchMonHoc = () => {
        getListMonThi({
            page: 1,
            perPage: 10000
        }).then(res => {
            setListMon(res.result.data)
        })
    }
    useEffect(() => {
        fetchUser()
        fetchNhomMonHoc()
        fetchMonHoc()
    }, [currentPage, perPage])
    // ** Function to handle filte
    const handleFilter = (e) => {
        if (e === 'Enter') {
            searchListNganhTuyenSinh({
                page: currentPage,
                perPage,
                tenNganh: searchValue
            }).then(res => {
                // setFilteredData(res.result) 
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
    const fetchDataForExport = () => {
        const data = getListNganhTuyenSinh({
            page: 1,
            perPage: 100
        }).then(res => {
            return (res)
        })
        return data
    }
    const handleExportFileDocx = async (data) => {
        const currentYear = new Date().getFullYear()
        const datasource = await fetchDataForExport()
        const list = {
            data: [],
            year: currentYear
        }
        let i = 1
        datasource.result.data.map((e) => {
            const mon1 = listMonHoc.find(x => x.maMon?.toString() === e.maMon1)
            const mon2 = listMonHoc.find(x => x.maMon?.toString() === e.maMon2)
            const mon3 = listMonHoc.find(x => x.maMon?.toString() === e.maMon3)
            const mon4 = listMonHoc.find(x => x.maMon?.toString() === e.maMon4)
            const mon5 = listMonHoc.find(x => x.maMon?.toString() === e.maMon5)
            list.data.push({
                ...e,
                stt: i++,
                tenMon1: mon1?.tenMon,
                tenMon2: mon2?.tenMon,
                tenMon3: mon3?.tenMon,
                tenMon4: mon4?.tenMon,
                tenMon5: mon5?.tenMon
            })
        })
        const request = await fetch("/../../template/nganhtuyensinh/dsnganhtuyensinh.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, list)
        saveFile("dsnganhtuyensinh.docx", docx)
    }
    return (
        <Fragment>
            <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={e => handleImportFile(e)} />
            <Card style={{ backgroundColor: 'white' }}>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                    <CardTitle tag='h4'>Danh sách ngành tuyển sinh</CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle color='secondary' caret outline>
                                <Share size={15} />
                                <span className='align-middle ms-50'>Tùy chọn</span>
                            </DropdownToggle>
                            <DropdownMenu>
                                {/* {ability.can('add', 'dsnganh') &&
                                    <DropdownItem className='w-100'>
                                        <Printer size={15} />
                                        <span className='align-middle ms-50 ' onClick={onImportFileClick}>Nhập từ file excel</span>
                                    </DropdownItem>} */}
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
                        {ability.can('add', 'dsnganh') &&
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
                { loading ? <WaitingModal /> : <DataTable
                        noHeader
                        striped
                        className='react-dataTable'
                        columns={columns}
                        data={filteredData?.data ? filteredData?.data : data.data}
                        pagination
                        paginationServer
                        paginationTotalRows={filteredData?.data ? filteredData?.totalCount : data.totalCount}
                        // paginationTotalRows={data.totalCount}
                        paginationComponentOptions={{
                            rowsPerPageText: 'Số hàng trên 1 trang:'
                        }}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePagination}
                    />}
                </div>
            </Card>
            <AddNewModal open={modalThemNTS} handleModal={handleModalThemNTS} listMonHoc={listMonHoc} nhomMon={dataNhommon} fetchUser={fetchUser} />
            {
                <EditModal open={modalSuaNTS} handleModal={handleModalSuaNTS} listMonHoc={listMonHoc} nhomMon={dataNhommon} fetchUser={fetchUser} infoEdit={info} />
            }
            {
                <DeleteModal open={modalXoaNTS} handleModal={handleModalXoaNTS} fetchUser={fetchUser} nhomMon={dataNhommon} infoEdit={info} />
            }
        </Fragment>
    )
}

const AddNewModal = React.lazy(() => import("./modal/AddNewModal"))
const EditModal = React.lazy(() => import("./modal/EditModal"))
const DeleteModal = React.lazy(() => import("./modal/DeleteModal"))

export default NganhTuyenSinh