// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X } from 'react-feather'

// ** Reactstrap Imports
import { Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText } from 'reactstrap'

import responseResultHelper from '../../../utils/reponsive'
import { ACTION_METHOD_TYPE } from '../../../utils/constant'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

import { suaChuyenNganhHep } from '../../../../api/chuyenNganhHep'

const EditModal = ({ open, handleModal, fetchUser, infoEdit, listNganhTuyenSinh }) => {
  if (!infoEdit) return
  // ** State
  const [tenChuyennganhhep, setTen] = useState()
  const [maChuyennganhTS, setManganhts] = useState()
  const [kiHieuChuyennganhhep, setKiHieu] = useState()
  const [ghiChu, setGhichu] = useState()
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const _handleSuaDCTCT = async () => {
    const res = await suaChuyenNganhHep({
      id: infoEdit.maChuyennganhhep,
      tenChuyennganhhep,
      maChuyennganhTS,
      kiHieuChuyennganhhep,
      ghiChu
    })
    responseResultHelper(res, handleModal, fetchUser, ACTION_METHOD_TYPE.UPDATE)
  }
  useEffect(() => {
    setTen(infoEdit.tenChuyennganhhep)
    setManganhts(infoEdit.maChuyennganhTS)
    setGhichu(infoEdit.ghiChu)
    setKiHieu(infoEdit.kiHieuChuyennganhhep)
  }, [infoEdit])
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>Sửa chuyên ngành hẹp</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1'>
          <Label className='form-label' for='tenChuyennganhhep '>
            Tên chuyên ngành hẹp
          </Label>
          <Input id='tenChuyennganhhep ' value={tenChuyennganhhep} onChange={e => setTen(e.target.value)} />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='kiHieuChuyennganhhep'>
            Kí hiệu
          </Label>
          <Input id='kiHieuChuyennganhhep' value={kiHieuChuyennganhhep} onChange={e => setKiHieu(e.target.value)} />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='maChuyennganhTS'>
            Chuyên ngành tuyển sinh
          </Label>
          <Input id='maChuyennganhTS' type='select' value={maChuyennganhTS} onChange={e => setManganhts(e.target.value)}>
            {
              listNganhTuyenSinh.map(item => {
                return (
                  <option value={item.maChuyennganhTS}>{item.tenChuyennganh}</option>
                )
              })
            }
          </Input>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='ghiChu'>
            Ghi Chú
          </Label>
          <Input id='ghiChu' value={ghiChu} onChange={e => setGhichu(e.target.value)} />
        </div>
        <Button className='me-1' color='primary' onClick={_handleSuaDCTCT}>
          Sửa
        </Button>
        <Button color='secondary' onClick={handleModal} outline>
          Hủy
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default EditModal
