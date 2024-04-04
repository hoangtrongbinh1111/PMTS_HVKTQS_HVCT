// ** React Imports
import React, { Fragment, useState, useEffect, useRef } from 'react'
// imprt thư viện của bảng
import DataTable from 'react-data-table-component'

//import icon
import { X, Share, Printer, FileText, Grid, File } from 'react-feather'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
//import css
import '@styles/react/libs/tables/react-dataTable-component.scss'
//import thư viện
//import API
import { getListMonThi } from '../../../api/monThi'
import { getListTuiThi, getHuongDanDonTui, getSoPhachTheoMon } from '../../../api/huongDanDonTui'
import { checkBaithiTuithi } from '../../../api/dontuidanhphach'
// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    Input,
    Label,
    Button,
    CardTitle,
    CardHeader,
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap'

// ** Component Custom
/***
 * Định nghĩa từ viết tắt
 * 1. DTDP: Dồn túi đánh phách
 */
const DonTuiDanhPhach = () => {
    // ** States
    const inputFile = useRef(null)
    const [modalDontuiDanhPhach, setModalDontuiDanhphach] = useState(false)
    const [currentPageMonthi, setCurrentPageMonthi] = useState(1)
    const [currentPageTuithi, setCurrentPageTuithi] = useState(1)
    const [perPageMon, setPerPageMon] = useState(10)
    const [perPageTui, setPerPageTui] = useState(10)
    const [listMonthi, setListMonthi] = useState(null)
    const [monThi, setMonThi] = useState()
    const [listTuithi, setListTuithi] = useState([])
    const [tuiThi, setTuiThi] = useState()
    const [checkdanhphach, setCheckDanhphach] = useState({check:false})
    const [alert, setAlert] = useState(false)
    const [ablePrint, setAblePrint] = useState(false)
    const [ableChonMon, setAbleChonMon] = useState(false)
    const [key, setKey] = useState(0)
    const [dataMon, setDataMon] = useState({
        data: [],
        totalCount: 0
    })
    const [dataTui, setDataTui] = useState({
        data: [],
        totalCount: 0
    })
    const getThongTinDanhPhach = (info) => {
        setAbleChonMon(info)
        setMonThi('')
    }
    const columns = [
        {
            name: 'STT',
            center: true,
            width: "70px",
            cell: tuiThi ? (row, index) => (((currentPageTuithi - 1) * perPageTui) + index + 1) : (row, index) => (((currentPageMonthi - 1) * perPageMon) + index + 1)
        },
        {
            name: 'Phòng thi',
            center: true,
            minWidth: '200px',
            sortable: row => row.maPhongthi,
            cell: row => <span>Số {row.maPhongthi}: {row.giangDuongPhong}-{row.tenPhong}</span>
        },
        {
            name: 'Số báo danh',
            center: true,
            minWidth: '170px',
            sortable: row => row.soBaodanh,
            cell: row => <span>{row.soBaodanh}</span>
        },
        {
            name: 'Số phách',
            center: true,
            minWidth: '50px',
            sortable: row => row.soPhach,
            cell: row => <span>{row.soPhach}</span>
        },
        {
            name: 'Túi thi',
            center: true,
            minWidth: '50px',
            sortable: row => row.tenTui,
            cell: row => <span>{row.tenTui}</span>
        }
    ]
    // ** Function to handle Modal toggle
    const handleModalDontuiDanhphach = () => {
        setAlert(false)
        setModalDontuiDanhphach(!modalDontuiDanhPhach)
    }
    const handleFetchTuiThi = async (maMonThi) => {
        await getListTuiThi(maMonThi).then(res => {
            setListTuithi(res.result)
        })
        await getSoPhachTheoMon({
            page: currentPageMonthi,
            perPage:perPageMon,
            maMonThi
        }).then(res => {
            setDataMon(res.result)
        }).catch(err => {
            setDataMon({
                data: [],
                totalCount: 0
            })
        })

    }
    const handlFetchHuongDanDonTui = async (info) => {
        getHuongDanDonTui({
            page: currentPageTuithi,
            perPage:perPageTui,
            info
        }).then(res => {
            setDataTui(res.result)
        }).catch(err => {
            setDataTui({
                data: [],
                totalCount: 0
            })
        })
    }
    const fetchMonThi = async () => {
        getListMonThi({
            page: 1,
            perPage: 100
        }).then(res => {
            const listMonthiOptions = []
            res.result?.data.map(monThi => {
                listMonthiOptions.push({ value: monThi.maMon, label: monThi.tenMon })
            })
            setListMonthi(listMonthiOptions)
            setMonThi(listMonthiOptions[0].value)
            // handleFetchTuiThi(listMonthiOptions[0].value)
        })
    }
    const fetchCheckDanhPhach = () => {
        checkBaithiTuithi()
        .then(res => {
            setCheckDanhphach(res.result)
            if (res.result.check) {
                fetchMonThi()
            }
            })
        .catch(err => {
            setCheckDanhphach()
        })
    }
    // Fetch API Monthi
    useEffect(() => {
        handleFetchTuiThi(monThi)
    }, [currentPageMonthi, monThi, perPageMon])
    // Fetch API Tui thi
    useEffect(() => {
        handlFetchHuongDanDonTui(tuiThi)
    }, [currentPageTuithi, tuiThi, perPageTui])
    useEffect(() => {
        fetchCheckDanhPhach()
    }, [])
    // ** Function to handle Pagination Môn thi
    const handlePaginationMonthi = page => {
        setCurrentPageMonthi(page)
    }
    const handlePerRowsChangeMonthi = (perPage, page) => {
        setCurrentPageMonthi(page)
        setPerPageMon(perPage)
    }
    // ** Function to handle Pagination Túi thi
    const handlePaginationTuithi = page => {
        setCurrentPageTuithi(page)
    }
    const handlePerRowsChangeTuithi = (perPage, page) => {
        setCurrentPageTuithi(page)
        setPerPageTui(perPage)
    }
    const reloadDanhPhach = () => {
        setKey(prevKey => prevKey + 1)
    }
    const handleModalAlert = () => setAlert(!alert)
    const handleModalPrint = () => setAblePrint(!ablePrint)
    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModalAlert} />
    // Xử lý nhập xuất file
    return (
        <Fragment>
            <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} />
            <Card style={{ backgroundColor: 'white' }}>
                <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
                    <CardTitle tag='h4' style={{ marginBottom: '1rem' }}>Hướng dẫn dồn túi đánh phách</CardTitle>
                    <Row style={{ justifyContent: 'space-between', width: "100%", marginLeft: '0px', marginRight: '0px' }}>
                        <Col className='' md='7' sm='12' style={{display: 'flex', justifyContent: 'flex-start', paddingLeft: '0px'}}>
                        {
                            (ableChonMon || checkdanhphach?.check) && <Col className='' md='7' sm='12'>
                                <div className='d-flex mt-md-0 mt-1 align-items-center'>
                                    <Label for='maDidiem' style={{ marginRight: '10px' }}>
                                        Môn thi:
                                    </Label>
                                   {listMonthi && <div style={{ width: '75%' }}>
                                        <Select
                                            theme={selectThemeColors}
                                            className='react-select'
                                            classNamePrefix='select'
                                            defaultValue={listMonthi[0]}
                                            options={listMonthi}
                                            onChange={(e) => {
                                                setCurrentPageMonthi(1)
                                                setMonThi(e.value)
                                                setTuiThi('')
                                                setPerPageMon(perPageMon)
                                                setPerPageTui(perPageTui)
                                            }}
                                            // isDisabled={!checkdanhphach}
                                            placeholder='Chọn môn thi'
                                            disabled={!checkdanhphach}
                                        />
                                    </div>
                                   }
                                </div>
                            </Col>
                        }
                        {
                            (ableChonMon || checkdanhphach?.check) && <Col className='' md='5' sm='12'>
                                <div className='d-flex mt-md-0 mt-1 align-items-center'>
                                    <Label for='maDidiem'>
                                        Túi thi:
                                    </Label>
                                    {
                                        listTuithi && 
                                    <Input className='mr-2 ms-2' type='select' name='maTui' id='maTui' value={tuiThi} placeholder='Túithi' onChange={(e) => {
                                        setTuiThi(e.target.value)
                                        setCurrentPageTuithi(1)
                                        setPerPageMon(perPageMon)
                                        setPerPageTui(perPageTui)
                                    }} style={{ width: '70%' }}>
                                        <option value=''>Tất cả</option>
                                        {
                                            listTuithi.map(item => {
                                                return (
                                                    <option value={item.maTui}>{item.tenTui}</option>
                                                )
                                            })
                                        }
                                    </Input>
                                    }
                                </div>
                            </Col>
                        }
                        </Col>
                        <Col className='' md='5' sm='12' style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '0px'}}>
                            <Button className='' color='primary' onClick={checkdanhphach?.check ? handleModalAlert : handleModalDontuiDanhphach}>
                                <span className='align-middle'>Dồn túi đánh phách</span>
                            </Button>
                        {/* </Col>
                        <Col className='mb-1' md='3' sm='12' style={{ padding: '0' }}> */}
                            <Button className='ms-2' color='primary' onClick={handleModalPrint} disabled={(!ableChonMon && !checkdanhphach?.check)}>
                                <Printer size={15} />
                                <span className='align-middle ms-2'>In HD đánh phách</span>
                            </Button>
                        </Col>

                    </Row>
                    <Row style={{ justifyContent: 'space-between', width: "100%", marginLeft: '0px', marginRight: '0px', marginTop: "1rem" }}>
                        <Col className='' md='7' sm='12' style={{display: 'flex', justifyContent: 'flex-start', paddingLeft: '0px'}}>
                        <Col className='' md='7' sm='12'>
                                <div className='d-flex mt-md-0 mt-1 align-items-center'>
                                    <p style={{ marginRight: '10px' }}>
                                        Số bài thi:
                                    </p>
                                    <p style={{fontWeight: 'bolder'}}>{dataMon?.totalCount}</p>
                                </div>
                            </Col>
                        <Col className='' md='5' sm='12'>
                                <div className='d-flex mt-md-0 mt-1 align-items-center'>
                                    <p>
                                        Số túi:
                                    </p>
                                    <p style={{fontWeight: 'bolder', marginLeft: '2rem', width: '70%'}} className=''>{listTuithi?.length}</p>
                                </div>
                            </Col>
                        </Col>
                    </Row>
                </CardHeader>
                <div className='react-dataTable react-dataTable-selectable-rows' style={{ marginRight: '20px', marginLeft: '20px' }}>
                    <DataTable
                        noHeader
                        striped
                        className='react-dataTable'
                        columns={columns}
                        data={tuiThi ? dataTui?.data : dataMon?.data}
                        pagination
                        paginationServer
                        paginationRowsPerPageOptions={[10, 20, 50, 100]}
                        paginationTotalRows={tuiThi ? dataTui?.totalCount : dataMon?.totalCount}
                        paginationComponentOptions={{
                            rowsPerPageText: 'Số hàng trên 1 trang:',
                            selectAllRowsItem: true,
                            selectAllRowsItemText: 'ALL',
                        }}
                        onChangeRowsPerPage={tuiThi ? handlePerRowsChangeTuithi : handlePerRowsChangeMonthi}
                        onChangePage={tuiThi ? handlePaginationTuithi : handlePaginationMonthi}
                        paginationDefaultPage={tuiThi ? currentPageTuithi : currentPageMonthi}
                    />
                </div>
            </Card>
            <AddNewModal open={modalDontuiDanhPhach} handleModal={handleModalDontuiDanhphach} fetchCheckDanhPhach={fetchCheckDanhPhach} getInfoDanhphach = {getThongTinDanhPhach} key={key} checkdanhphach = {checkdanhphach} />
            <InHuongDanDanhPhach open={ablePrint} handleModal={handleModalPrint} listMonthi={listMonthi} monThi={monThi} />
            <Modal
                isOpen={alert}
                toggle={handleModalAlert}
                contentClassName='pt-0'
            >
                <ModalHeader className='mb-1' toggle={handleModalAlert} close={CloseBtn} tag='div'>
                    <h5 className='modal-title'>Thông báo</h5>
                </ModalHeader>
                <ModalBody className='flex-grow-1'>
                    <div className='mb-1'>
                        <Label className='form-label' for='full-name'>
                            Đã dồn túi đánh phách, bạn có muốn thực hiện lại?
                        </Label>
                    </div>
                    <Button className='me-1' color='primary' onClick={() => {
                        setDataMon({})
                        setDataTui({})
                        handleModalDontuiDanhphach()
                        reloadDanhPhach()
                        }}>
                        Yes
                    </Button>
                    <Button color='secondary' onClick={handleModalAlert} outline>
                        No
                    </Button>
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

const AddNewModal = React.lazy(() => import("./modal/AddNewModal"))
const InHuongDanDanhPhach = React.lazy(() => import("./modal/InHuongDanDanhPhach"))
export default DonTuiDanhPhach
