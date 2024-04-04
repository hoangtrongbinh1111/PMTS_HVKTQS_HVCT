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

const InBienBanChamThi = ({ open, handleModal, listPrint, listMonthi, maMonthi}) => {
    // ** State
    // ** Custom close btn
    const tenMon = listMonthi.find(obj => obj.value === parseInt(maMonthi))
    // const tenTui = listTuithi.find(obj => obj.maTui === parseInt(maTuithi))
    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
    const handleExportFileDocx = async () => {
        const today = new Date()
        const request = await fetch("/../../template/xulyketquathi/bienbanchamthi.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, {data:listPrint, curYear: today.getFullYear()})
        saveFile(`Biên bản chấm thi môn ${tenMon.label}.docx`, docx)
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
                        {tenMon ? <div>In biên bản chấm thi môn:<b> {tenMon.label}</b> </div> : 'Vui lòng chọn môn thi!'}
                    </Label>
                </div>
                {tenMon ? <Button className='me-1' color='primary' onClick={() => {
                    handleExportFileDocx()
                    handleModal()
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

export default InBienBanChamThi
