// ** React Imports
import React, { Fragment, useState, forwardRef, useEffect, useRef } from 'react'
import { X, Printer } from 'react-feather'
// imprt thư viện của bảng
import DataTable from 'react-data-table-component'

//import icon

//import css
import '@styles/react/libs/tables/react-dataTable-component.scss'
//import thư viện export mẫu
import { TemplateHandler } from "easy-template-x"
import { saveFile } from '../../../utils/util'
// import API


// ** Reactstrap Import
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap'

// ** Component Custom

/***
 * Định nghĩa từ viết tắt
 * 1. PT: Phòng Thi
 */
const ThuTuDonTheoMon = ({ open, handleModal, listThutuTheomon, tenMonthi }) => {
    const checkNull = (listThutuTheomon.length === 0)
    //Định nghĩa bảng
    const columns = [
        {
            name: 'STT',
            width: '70px',
            center:true,
            selector: row => row.index
            // selector: row => listThutuTheomon.indexOf(row) + 1
        },
        {
            name: 'Phòng số',
            minWidth: '50px',
            center:true,
            selector: row => `${row.maPhongthi}: ${row.giangDuongPhong}-${row.tenPhong}`
        },
        {
            name: 'Số bài',
            sortable: true,
            minWidth: '50px',
            center:true,
            selector: row => row.soBai
        },
        {
            name: 'Ghi chú',
            sortable: true,
            minWidth: '50px'
        },

    ]
    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
    const handleExportFileDocx = async (data) => {
        const request = await fetch("/../../template/dontuidanhphach/thutudontui.docx")
        const templateFile = await request.blob()
        const handler = new TemplateHandler()
        const docx = await handler.process(templateFile, { tenMon: tenMonthi.tenMon, data })
        saveFile(`thutudontui${tenMonthi.tenMon}.docx`, docx)
    }
    return (
        <Modal
            isOpen={open}
            toggle={handleModal}
            contentClassName='pt-0'
            className='modal-lg'
        >
            <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
                <h5 className='modal-title'>Thứ tự dồn túi theo môn : {tenMonthi.tenMon}</h5>
            </ModalHeader>
            <ModalBody className='flex-grow-1'>
                <div className='react-dataTable react-dataTable-selectable-rows' style={{ marginRight: '20px', marginLeft: '20px' }}>
                    {!checkNull ? <DataTable
                        noHeader
                        striped
                        className='react-dataTable'
                        columns={columns}
                        data={listThutuTheomon}
                    /> : 'Môn thi không có thí sinh dự thi!'}
                </div>
                {
                    !checkNull && <div className='d-flex mt-md-1 mt-1' style={{ marginRight: '20px', marginLeft: '20px' }}>
                        <Button className='me-1' color='primary' onClick={() => handleExportFileDocx(listThutuTheomon)}>
                            <Printer size={15} />
                            <span className='align-middle ms-50'>In</span>
                        </Button>
                        <Button color='secondary' onClick={handleModal} outline>
                            Hủy
                        </Button>
                    </div>
                }
            </ModalBody>
        </Modal>
    )
    // ** Function to handle modalLuuThuTuDT toggle
}
export default ThuTuDonTheoMon

