// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Modal, Input, Label, Button, ModalHeader, ModalBody, Row, Col } from 'reactstrap'

import responseResultHelper from '../../../utils/reponsive'
import { ACTION_METHOD_TYPE } from '../../../utils/constant'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { updateBaiThitheoMon, getListBaiThiTheoMon } from '../../../../api/baiThi'
const ImportModal = ({ open, fetchUser, handleModal, listImport, listMonthi }) => {
    // ** State
    // ** Custom close btn
    const [listErr, setListErr] = useState([])
    const [dataImport, setDataImport] = useState([])
    const [disabled, setDisable] = useState(true)
    const [soBaiThiMon, setSoBaitthiMon] = useState(0)
    const listColumn = ['A', 'B', 'C']
    const columnsErr = [
        {
            name: 'Lỗi',
            minWidth: '100px',
            selector: row => row.loi,

        },
        {
            name: 'Vị trí',
            minWidth: '200px',
            selector: row => row.Vitri,

        },
    ]
    const columnsData = [
        {
            name: 'STT',
            width: '70px',
            center: true,
            selector: row => row.STT,

        },
        {
            name: 'Số phách',
            minWidth: '200px',
            selector: row => row.soPhach,
        },
        {
            name: 'Điểm',
            minWidth: '200px',
            selector: row => row.diemThi,
        },
    ]
    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
    useEffect(() => {
        const tenMonthi = listImport[0][0]
        const monThi = listMonthi.find(obj => obj.label === tenMonthi)
        getListBaiThiTheoMon({ maMonThi: monThi.value }).then(res => {
            setSoBaitthiMon(res.result.totalCount)
        })
    }, [])
    const _handleXoaNMT = async () => {
        const tenMonthi = listImport[0][0]
        const monThi = listMonthi.find(obj => obj.label === tenMonthi)
        const res = await updateBaiThitheoMon({ maMonthi: monThi.value, data: dataImport })
        responseResultHelper(res, handleModal, fetchUser({ maMonThi: monThi.value }), ACTION_METHOD_TYPE.IMPORTEXCEL)
    }
    // list các trường lỗi
    const checkErr = (listImport) => {
        const data = []

        const temp = []
        const tenMonthi = listImport[0][0]
        const monThi = listMonthi.find(obj => obj.label === tenMonthi)
        console.log(monThi)
        if (tenMonthi === null) {
            temp.push({
                loi: 'Cần nhập thông tin tên môn học vào đúng vị trí',
                Vitri: `A2`
            })
        } else if (!monThi) {
            temp.push({
                loi: 'Nhập thông tin môn thi không đúng!',
                Vitri: `A2`
            })
        }
        for (let i = 1; i < listImport.length; i++) {
            //kiểm tra số phách
            const infoOneRow = {
                STT: '',
                soPhach: '',
                diemThi: '',
            }
            if (listImport[i][1] === null) {
                temp.push({
                    loi: 'Số phách không được để trống',
                    Vitri: `${listColumn[1]}${i + 2}`
                })
            } else {
                infoOneRow.soPhach = listImport[i][1]
            }
            // kiểm tra điểm
            if (listImport[i][2] === null) {
                temp.push({
                    loi: 'Điểm thi không được để trống',
                    Vitri: `${listColumn[2]}${i + 2}`
                })
            } else {
                infoOneRow.diemThi = parseFloat(listImport[i][2]).toFixed(2)
            }
            infoOneRow.STT = i
            data.push(infoOneRow)
        }
        if (temp.length === 0) {
            setDataImport(data)
            if (soBaiThiMon >= dataImport.length) {
                setDisable(false)
            }
        }
        return temp
    }
    useEffect(() => {
        setListErr(checkErr(listImport))
    }, [])
    return (
        <Modal
            isOpen={open}
            toggle={handleModal}
            contentClassName='pt-0'
            className='modal-lg'
        >
            <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
                <h5 className='modal-title'>Cập nhật điểm</h5>
                {
                    listErr.length > 0 ? <span style={{ color: 'red' }}>File nhập có lỗi! Vui lòng kiểm tra lại</span> : (soBaiThiMon < dataImport.length) ? <span style={{ color: 'red' }}>File đúng định dạng! số lượng đầu vào lớn hơn số bản ghi cần cập nhật, vui lòng kiểm tra lại</span> : <span style={{ color: 'green' }}>File đúng định dạng! Vui lòng kiểm tra lại thông tin trước khi lưu</span>
                }
            </ModalHeader>
            <Row>
                <Col className='mb-1' md='4' sm='12' >
                    <div className='d-flex mt-md-0 mt-1 align-items-center'>
                        <Label className='form-label' for='tenPhong' style={{ width: '100px', marginLeft: '20px' }}>
                            Môn thi:
                        </Label>
                        <Input id='tenPhong' value={listImport[0][0]} />
                    </div>
                </Col>
                <Col className='mb-1' md='4' sm='12' >
                    <div className='d-flex mt-md-0 mt-1 align-items-center'>
                        <Label className='form-label' for='tenPhong' style={{ width: '90px' }}>
                            Tổng số bài thi:
                        </Label>
                        <Input id='tenPhong' value={soBaiThiMon} />
                    </div>
                </Col>
                <Col className='mb-1' md='3' sm='12' style={{ marginRight: '10px' }} >
                    <div className='d-flex mt-md-0 mt-1 align-items-center'>
                        <Label className='form-label' for='tenPhong' style={{ width: '130px' }}>
                            Tổng số cập nhật:
                        </Label>
                        <Input id='tenPhong' value={dataImport.length} />
                    </div>
                </Col>
            </Row>
            {
                listErr.length > 0 ? < div className='react-dataTable react-dataTable-selectable-rows' style={{ marginRight: '20px', marginLeft: '20px' }}>
                    <DataTable
                        noHeader
                        striped
                        className='react-dataTable'
                        columns={columnsErr}
                        data={listErr}
                    />
                </div> : <div className='react-dataTable react-dataTable-selectable-rows' style={{ marginRight: '20px', marginLeft: '20px' }}>
                    <DataTable
                        noHeader
                        striped
                        className='react-dataTable'
                        columns={columnsData}
                        data={dataImport}
                    />
                </div>
            }
            <ModalBody className='flex-grow-1'>
                <Button className='me-1' color='primary' disabled={disabled} onClick={_handleXoaNMT}>
                    Lưu
                </Button>
                <Button color='secondary' onClick={handleModal} outline>
                    Hủy
                </Button>
            </ModalBody>
        </Modal >
    )
}

export default ImportModal
