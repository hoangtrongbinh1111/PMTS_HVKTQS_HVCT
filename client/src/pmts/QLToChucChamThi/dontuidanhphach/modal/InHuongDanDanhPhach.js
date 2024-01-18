// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import { Printer, X } from 'react-feather'

// ** Reactstrap Imports
import { Modal, Label, Button, ModalHeader, ModalBody } from 'reactstrap'

import { TemplateHandler } from "easy-template-x"
import { saveFile } from '../../../utils/util'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { getSoPhachTheoMon } from '../../../../api/huongDanDonTui'

const InHuongDanDanhPhach = ({ open, handleModal, listMonthi, monThi}) => {
    // ** State
    // ** Custom close btn
    const tenMon = listMonthi.find(obj => obj.value === parseInt(monThi))
    const [dataPrint, setDataPrint] = useState([])
    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
    const fetchDataPrint = async () => {
        await getSoPhachTheoMon({
            page: 1,
            perPage: 1000,
            maMonThi: monThi
        }).then(res => {
            const dataDanhphach = res.result.data.reduce((acc, obj) => {
                const existingGroup = acc.find(group => group.tenTui === obj.tenTui)
                
                if (existingGroup) {
                  existingGroup.result.push({index: existingGroup.result.length + 1, soBaodanh: obj.soBaodanh, maPhongthi: obj.maPhongthi, tenPhong:obj.tenPhong, giangDuongPhong:obj.giangDuongPhong, soPhach:obj.soPhach})
                } else {
                  acc.push({tenTui: obj.tenTui, tenMon:tenMon.label, result: [{index: 1, soBaodanh: obj.soBaodanh, maPhongthi: obj.maPhongthi, tenPhong:obj.tenPhong, giangDuongPhong:obj.giangDuongPhong, soPhach:obj.soPhach}]})
                }            
                return acc
              }, [])
            setDataPrint(dataDanhphach)
        }).catch(err => {
            setDataPrint([])
        })
    }
    useEffect(() => {
        fetchDataPrint()
    }, [monThi])
    const handleExportFileDocx = async () => {
        const request = await fetch("/../../template/dontuidanhphach/huongdandanhphach.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, { data:dataPrint })
        saveFile(`Hướng dẫn dồn túi đánh phách môn ${tenMon.label}.docx`, docx)
    }
    return (
        <Modal
            isOpen={open}
            toggle={handleModal}
            contentClassName='pt-0'
        >
            <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
                <h5 className='modal-title'>In hướng dẫn đánh phách</h5>
            </ModalHeader>
            <ModalBody className='flex-grow-1'>
                <div className='mb-1'>
                    <Label className='form-label' for='full-name'>
                        {tenMon ? <div>In hướng dẫn đánh phách: <b> môn {tenMon.label}</b> </div> : 'Vui lòng chọn môn thi'}
                    </Label>
                </div>
                {tenMon ? <Button className='me-1' color='primary' onClick={() => {
                    handleModal()
                    handleExportFileDocx()
                    }}>
                    <Printer size={15} />
                    <span className='align-middle ms-50'>In</span>
                </Button> : <Button className='me-1' color='primary' onClick={handleModal}>
                    OK!
                </Button>}

                <Button color='secondary' onClick={handleModal} outline>
                    Hủy
                </Button>
            </ModalBody>
        </Modal>
    )
}

export default InHuongDanDanhPhach
