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
import { getListPhongThi, searchListPhongThi, taoPhongThi, exportPhongThi, exportPhongThiTemplate } from '../../../api/phongThi'
import { getListDiaDiemToChucThi } from '../../../api/diaDiemToChucThi'

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
import WaitingModal from '../../../views/ui-elements/waiting-modals'
// ** Component Custom
import { BootstrapCheckbox } from '../../components/FormHelper/BootstrapCheckbox'
import { AbilityContext } from '@src/utility/context/Can'

/***
 * Định nghĩa từ viết tắt
 * 1. PT: Phòng Thi
 */
const PhongThi = () => {
    const ability = useContext(AbilityContext)
    const inputFile = useRef(null)
    // ** States
    const [loading, setLoading] = useState(true)
    const [modalThemPT, setModalThemPT] = useState(false)
    const [modalSuaPT, setModalSuaPT] = useState(false)
    const [modalXoaPT, setModalXoaPT] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [perPage, setPerPage] = useState(10)
    const [listDiaDiemThi, setListDiaDiemThi] = useState([])
    const [data, setData] = useState({
        data: [],
        totalCount: 0
    })

    const [info, setInfo] = useState()
    const _handleSuaPT = (data) => {
        setInfo(data)
        setModalSuaPT(true)
    }
    const _handleXoaPT = (data) => {
        setInfo(data)
        setModalXoaPT(true)
    }
    const columns = [

        {
            name: "STT",
            center: true,
            width: "70px",
            width: "70px",
            cell: (row, index) => <span>{(((currentPage - 1) * perPage) + index + 1)}</span>
        },
        {
            name: 'Tên phòng',
            width: '130px',
            selector: row => row.tenPhong,
            center: true
        },
        {
            name: 'Giảng đường',
            width: '150px',
            selector: row => row.giangDuongPhong,
            center: true
        },
        {
            name: 'Số lượng',
            sortable: true,
            center: true,
            width: '140px',
            selector: row => row.soLuong
        },
        {
            name: 'Nơi thi',
            sortable: true,
            minWidth: '120px',
            selector: row => row.tenDiadiem
        },
        {
            name: 'Ghi chú',
            sortable: true,
            minWidth: '50px',
            selector: row => row.ghiChu
        },
        {
            name: 'Tác vụ',
            allowOverflow: true,
            width: '100px',
            cell: (row) => {
                return (
                    <div className='d-flex' style={{ padding: '4px' }}>
                                                {ability.can('update', 'dsphongthi') &&
                        <Edit size={15} onClick={e => _handleSuaPT(row)} style={{ cursor: 'pointer', color: 'green', marginRight: '10px' }} />}
                        {/* <Trash size={15} onClick={e => _handleXoaPT(row)} style={{ cursor: 'pointer', color: 'red' }} /> */}
                    </div>
                )
            },
            center: true
        }
    ]
    // ** Function to handle modalThemPT toggle
    const handleModalThemPT = () => setModalThemPT(!modalThemPT)
    const handleModalSuaPT = () => setModalSuaPT(!modalSuaPT)
    const handleModalXoaPT = () => setModalXoaPT(!modalXoaPT)
    const fetchUser = () => {
        getListPhongThi({
            page: currentPage,
            perPage
        }).then(res => {
            setData(res.result)
            console.log("res.results", res.result)
            setLoading(false)
        })
    }
    const fetchDiaDiemThi = () => {
        getListDiaDiemToChucThi({
            page: 1,
            perPage: 10000
        }).then(res => {
            setListDiaDiemThi(res.result.data)
        })
    }

    useEffect(() => {
        fetchUser()
        fetchDiaDiemThi()
    }, [currentPage, perPage])
    // ** Function to handle filte
    const handleFilter = (e) => {
        if (e === 'Enter') {
            searchListPhongThi({
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
                    const res = await taoPhongThi({
                        tenChuyennganh: item[1],
                        ghiChu: item[2],
                        diemLiet: item[3]
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
        const res = await exportPhongThi()
    }
    const handleExportFileTemplate = async () => {
        const res = await exportPhongThiTemplate()
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
                    <CardTitle tag='h4'>Danh sách phòng thi </CardTitle>
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
                                                {ability.can('add', 'dsphongthi') &&
                        <Button className='ms-2' color='primary' onClick={handleModalThemPT}>
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
                    {
                        data?.soHoso <= data?.sumSoluong ? <></> : <p>Số lượng chỗ ngồi còn thiếu so với số lượng thí sinh: <span style={{ color: 'red' }}>{data?.soHoso - data?.sumSoluong} (hiện có {data?.sumSoluong} chỗ /{data?.soHoso} thí sinh)</span></p>
                    }
                    { loading ? <WaitingModal /> : <DataTable
                        noHeader
                        striped
                        className='react-dataTable'
                        columns={columns}
                        data={filteredData?.data ? filteredData?.data : data?.data}
                        pagination
                        paginationServer
                        paginationTotalRows={filteredData?.data ? filteredData?.totalCount : data?.totalCount}
                        paginationComponentOptions={{
                            rowsPerPageText: 'Số hàng trên 1 trang:'
                        }}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePagination}
                    />}
                </div>
            </Card>
            <AddNewModal open={modalThemPT} handleModal={handleModalThemPT} listDiaDiemThi={listDiaDiemThi} fetchUser={fetchUser} />
            {
                <EditModal open={modalSuaPT} handleModal={handleModalSuaPT} listDiaDiemThi={listDiaDiemThi} fetchUser={fetchUser} infoEdit={info} />
            }
            {
                <DeleteModal open={modalXoaPT} handleModal={handleModalXoaPT} fetchUser={fetchUser} infoEdit={info} />
            }
        </Fragment>
    )
}

const AddNewModal = React.lazy(() => import("./modal/AddNewModal"))
const EditModal = React.lazy(() => import("./modal/EditModal"))
const DeleteModal = React.lazy(() => import("./modal/DeleteModal"))

export default PhongThi

