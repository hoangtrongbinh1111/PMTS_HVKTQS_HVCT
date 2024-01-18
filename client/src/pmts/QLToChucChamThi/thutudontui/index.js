// ** React Imports
import React, { Fragment, useState, useEffect } from 'react'
import { X } from 'react-feather'
// imprt thư viện của bảng
import DataTable from 'react-data-table-component'

//import icon

//import css
import '@styles/react/libs/tables/react-dataTable-component.scss'

// import API
import { getListPhongThi } from '../../../api/phongThi'
import { getListThuTuDonTui, xoaThuTuDon, getThuTuDonToPrint } from '../../../api/thutuDonTui'
import { getListNhomMonThi } from '../../../api/nhomMonthi'
import { checkBaithiTuithi } from '../../../api/dontuidanhphach'
// import { getListMonThi } from '../../../api/monThi'

import { TemplateHandler } from "easy-template-x"
import { saveFile } from '../../utils/util'
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
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap'

// ** Component Custom

/***
 * Định nghĩa từ viết tắt
 * 1. PT: Phòng Thi
 */
const ThuTuDonTui = () => {
    // ** States
    const [modalLuuThuTuDT, setModalLuuThuTuDT] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [perPage, setPerPage] = useState(10)
    // const [listMonthi, setListMonthi] = useState([])
    // const [maMonThi, setMaMonThi] = useState()
    const [loading, setLoading] = useState(true)
    const [listNhomMonThi, setListNhomMonThi] = useState([])
    const [ableTaoThuTu, setableTaoThuTu] = useState(false)
    const [listThuTuDonTui, setListThuTuDonTui] = useState([])
    const [listPhongthi, setListPhongthi] = useState([])
    const [listThutuDonTheoMon, setListThutuDonTheoMon] = useState([])
    const [ableTaolai, setableTaolai] = useState(false)
    const [modalThuTuTheoMon, setModalThuTuTheoMon] = useState(false)
    const [tenMonthi, setTenMonthi] = useState('')
    const [alert, setAlert] = useState(false)
    const [disabled, setDisable] = useState(!ableTaolai)
    const [refreshPrint, setRefreshPrint] = useState(true)
    const [ableChonMonthi, setAbleChonMonthi] = useState(false)
    const [data, setData] = useState({
        data: [],
        totalCount: 0
    })
    const [dataToPrint, setDataToPrint] = useState([])
    const [filterData, setFilterData] = useState([])
    const [searchValue, setSearchValue] = useState('')
    //* Function tạo và lưu thứ tự dồn túi
    // Sinh ngẫu nhiên thứ tự dồn túi
    const generateRandomNumber = (max, usedNumbers) => {
        let randomNumber
        do {
            randomNumber = Math.floor(Math.random() * max) + 1
        } while (usedNumbers.includes(randomNumber))
        return randomNumber
    }
    const handleTaoThuTuDon = () => {
        setSearchValue('')
        const maxNumber = data.data.length

        const usedNumbers1 = []
        const usedNumbers2 = []
        const usedNumbers3 = []

        const updatedData = data.data.map(row => {
            const randomNumber1 = generateRandomNumber(maxNumber, usedNumbers1)
            usedNumbers1.push(randomNumber1)

            const randomNumber2 = generateRandomNumber(maxNumber, usedNumbers2)
            usedNumbers2.push(randomNumber2)

            const randomNumber3 = generateRandomNumber(maxNumber, usedNumbers3)
            usedNumbers3.push(randomNumber3)

            return {
                ...row,
                randomNumber1,
                randomNumber2,
                randomNumber3
            }
        })


        setData({
            data: updatedData,
            totalCount: maxNumber
        })
        setDisable(true)
    }
    // const handleThuTuDonTheoMon = async (maMonThi) => {
    //     await getThuTuDonTheoMon({
    //         maMonThi
    //     }).then(res => {
    //         const dataDonTui = []
    //         res.result.map((item, index) => {
    //             dataDonTui.push({
    //                 ...item,
    //                 index: index + 1
    //             })
    //         }
    //         )
    //         setListThutuDonTheoMon(dataDonTui)
    //     })
    //     setTenMonthi(listMonthi.find(obj => obj.maMon === parseInt(maMonThi)))
    //     setMaMonThi(maMonThi)
    //     setModalThuTuTheoMon(true)
    // }
    //Lọc thông tin
    const handleFilter = e => {
        const value = e.target.value
        let updatedData = []
        const dataToFilter = () => {
            if (searchValue.length) {
                return filterData
            } else {
                return data.data
            }
        }

        setSearchValue(value)
        if (value.length) {
            updatedData = dataToFilter().filter(item => {
                const startsWith = item.tenPhong.toLowerCase().startsWith(value.toLowerCase())

                const includes = item.tenPhong.toLowerCase().includes(value.toLowerCase())

                if (startsWith) {
                    return startsWith
                } else if (!startsWith && includes) {
                    return includes
                } else return null
            })
            setFilterData([...updatedData])
            setSearchValue(value)
        }
    }
    //Định nghĩa bảng
    const columns = [
        {
            name: 'STT',
            center: true,
            width: "70px",
            cell: row => data.data.indexOf(row) + 1
        },
        {
            name: 'Nơi thi',
            sortable: true,
            minWidth: '50px',
            selector: row => row.tenDiadiem
        },
        {
            name: 'Tên phòng',
            width: '130px',
            selector: row => `${row.giangDuongPhong}-${row.tenPhong}`,
            center: true
        },
        {
            name: 'Số lượng',
            sortable: true,
            width: '140px',
            selector: row => row.soLuong,
            center: true
        },
        {
            name: 'Thứ tự 1',
            sortable: true,
            width: '140px',
            selector: row => row.randomNumber1,
            center: true
        },
        {
            name: 'Thứ tự 2',
            sortable: true,
            width: '140px',
            selector: row => row.randomNumber2,
            center: true
        },
        {
            name: 'Thứ tự 3',
            sortable: true,
            width: '140px',
            selector: row => row.randomNumber3,
            center: true
        }
    ]

    // ** Function to handle modalLuuThuTuDT toggle
    const handleModalLuuThuTuDT = () => {
        setSearchValue('')
        const thutuDonTui = []
        let thuTu1 = data.data.map(row => row.randomNumber1)
        let thuTu2 = data.data.map(row => row.randomNumber2)
        let thuTu3 = data.data.map(row => row.randomNumber3)
        thuTu1 = thuTu1.join('-')
        thuTu2 = thuTu2.join('-')
        thuTu3 = thuTu3.join('-')
        thutuDonTui.push(thuTu1, thuTu2, thuTu3)
        setListThuTuDonTui(thutuDonTui)
        setModalLuuThuTuDT(!modalLuuThuTuDT)
    }
    const handleCloseModal = () => {
        setModalLuuThuTuDT(!modalLuuThuTuDT)
    }
    const callBackDisableTaolai = (value) => {
        setDisable(value)
        setRefreshPrint(value)
    }
    const handleModalThuTuTheoMon = () => {
        setModalThuTuTheoMon(!modalThuTuTheoMon)
    }

    // ** Function lấy ra thứ tự dồn túi
    const fetchDanhSachDonTui = (thutuDonTui) => {
        if (thutuDonTui.data.length > 0) {
            getListPhongThi({
                page: currentPage,
                perPage
            }).then(res => {
                const numbers = []
                for (let i = 0; i < thutuDonTui.data.length; i++) {
                    numbers[i] = thutuDonTui.data[i].thuTuDon.split('-')
                }
                const updatedData = res.result.data.map((row, index) => {
                    // Split the string and convert each part to a number
                    return {
                        ...row,
                        randomNumber1: numbers[0][index],
                        randomNumber2: numbers[1][index],
                        randomNumber3: numbers[2][index]
                    }
                })

                setData({
                    data: updatedData,
                    totalCount: res.result.data.length
                })
                setableTaoThuTu(true)
            })

        } else {
            getListPhongThi({
                page: currentPage,
                perPage
            }).then(res => {
                setData(res.result)
            })
        }
        setLoading(false)
    }
    const fetchThuTuDonTui = () => {
        getListThuTuDonTui({
            page: 1,
            perPage: 10000
        }).then(res => {
            fetchDanhSachDonTui(res.result)
            if (res.result.data.length > 0) {
                setAbleChonMonthi(true)
            }
        })
    }
    const handleXoaThuTuDon = async () => {
        setAlert(false)
        setableTaoThuTu(false)
        await xoaThuTuDon()
        fetchThuTuDonTui()

    }
    const fetchNhomMonThi = async () => {
        await getListNhomMonThi({
            page: 1,
            perPage: 10000
        }).then(res => {
            setListNhomMonThi(res.result)
        })
    }
    const fetchListPhongthi = async () => {
        await getListPhongThi({
            page: 1,
            perPage: 10000
        }).then(res => {
            setListPhongthi(res.result.data)
        })
    }
    // con
    // const fetchMonThi = async () => {
    //     getListMonThi({
    //         page: 1,
    //         perPage: 100
    //     }).then(res => {
    //         setListMonthi(res.result.data)
    //     })
    // }
    const fetchCheckBaithiTuiThi = async () => {
        await checkBaithiTuithi().then(res => {
            setableTaolai(res.result)
            setDisable(!res.result)
        })
    }
    const fetchDataForExport = async () => {
        await getThuTuDonToPrint().then(res => {
            const newArray = res.result.map(obj => {
                const tenMon = obj.tenMon
                const results = []

                for (let i = 0; obj[i] !== undefined; i++) {
                    results.push({ index: i + 1, ...obj[i] })
                }

                return { tenMon, results }
            })
            setDataToPrint(newArray)
        })
    }
    const handleExportFileDocxAllThuTuDon = async () => {
        const list = {
            data: dataToPrint
        }
        const request = await fetch("/../../template/dontuidanhphach/thutudontui.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, list)
        saveFile("thutudontui.docx", docx)
    }
    useEffect(() => {
        // fetchMonThi()
        fetchListPhongthi()
        fetchNhomMonThi()
        fetchThuTuDonTui()
        fetchCheckBaithiTuiThi()
    }, [])
    useEffect(() => {
        fetchDataForExport()
    }, [refreshPrint])
    // ** Function to handle Pagination
    const handlePagination = page => {
        setCurrentPage(page)
    }
    const handlePerRowsChange = (perPage, page) => {
        setCurrentPage(page)
        setPerPage(perPage)
    }
    const handleModalAlert = () => setAlert(!alert)
    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModalAlert} />
    return (
        <Fragment>
            <Card style={{ backgroundColor: 'white' }}>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                    <CardTitle tag='h4'>Thứ tự dồn túi phòng thi</CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                        {/* {
                            ableChonMonthi && <div className='d-flex mt-md-0 mt-1 align-items-center'>
                                <Label for='maDidiem' style={{ width: '200px' }}>
                                    Lựa chọn môn thi:
                                </Label>
                                <Input type='select' name='maMon' id='maMon' placeholder='Môn thi' value={maMonThi} onChange={e => handleThuTuDonTheoMon(e.target.value)}>
                                    <option>Môn thi</option>
                                    {
                                        listMonthi.map(item => {
                                            return (
                                                <option value={item.maMon}>{item.tenMon}</option>
                                            )
                                        })
                                    }
                                </Input>
                            </div>
                        } */}
                        <Button className='ms-2' color='primary' onClick={handleExportFileDocxAllThuTuDon} disabled={!ableChonMonthi}>
                            <span className='align-middle ms-50'>In thứ tự dồn túi</span>
                        </Button>
                        <Button className='ms-2' color='primary' onClick={handleTaoThuTuDon} disabled={ableTaoThuTu}>
                            <span className='align-middle ms-50'>Tạo thứ tự dồn</span>
                        </Button>
                        <Button className='ms-2' color='success' onClick={handleModalLuuThuTuDT}
                            disabled={ableTaoThuTu}>
                            <span className='align-middle ms-50'>Lưu thứ tự dồn túi</span>
                        </Button>
                        <Button className='ms-2' color='primary' onClick={ableTaolai ? handleModalAlert : handleXoaThuTuDon} disabled={disabled}>
                            <span className='align-middle ms-50'>Tạo lại</span>
                        </Button>
                    </div>
                </CardHeader>
                <Row className='justify-content-end mx-0' >
                    {ableTaolai && <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12' style={{ paddingRight: '20px' }}>
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
                            onChange={handleFilter}
                        />
                    </Col>
                    }
                </Row>
                <div className='react-dataTable react-dataTable-selectable-rows' style={{ marginRight: '20px', marginLeft: '20px' }}>
                    {loading ? <WaitingModal /> : <DataTable
                        noHeader
                        striped
                        className='react-dataTable'
                        columns={columns}
                        data={searchValue.length > 0 ? filterData : data.data}
                        pagination
                        paginationServer
                        paginationTotalRows={searchValue.length > 0 ? filterData.length : data.totalCount}
                        paginationComponentOptions={{
                            rowsPerPageText: 'Số hàng trên 1 trang:'
                        }}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePagination}
                    />}
                </div>
            </Card>
            <Modal
                isOpen={alert}
                toggle={handleModalAlert}
                contentClassName='pt-0'
            >
                <ModalHeader className='mb-1' toggle={handleModalAlert} close={CloseBtn} tag='div'>
                    <h5 className='modal-title'>Cảnh báo</h5>
                </ModalHeader>
                <ModalBody className='flex-grow-1'>
                    <div className='mb-1'>
                        <Label className='form-label' for='full-name'>
                            Tạo lại thứ tự dồn sẽ phải thực hiện dồn túi đánh phách lại, bạn có muốn tạo lại?
                        </Label>
                    </div>
                    <Button className='me-1' color='primary' onClick={handleXoaThuTuDon}>
                        Yes
                    </Button>
                    <Button color='secondary' onClick={handleModalAlert} outline>
                        No
                    </Button>
                </ModalBody>
            </Modal>
            <AddNewModal open={modalLuuThuTuDT} handleModal={handleCloseModal} listNhomMonThi={listNhomMonThi} listThuTuDonTui={listThuTuDonTui} fetchUser={fetchThuTuDonTui} callBackDisableTaolai={callBackDisableTaolai} />
            <ThuTuDonTheoMon open={modalThuTuTheoMon} handleModal={handleModalThuTuTheoMon} listThutuTheomon={listThutuDonTheoMon} tenMonthi={tenMonthi} />
        </Fragment>
    )
}
const AddNewModal = React.lazy(() => import("./modal/AddNewModal"))
const ThuTuDonTheoMon = React.lazy(() => import("./modal/ThuTuTheoMon"))
export default ThuTuDonTui

