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
import { taoChuyenNganhHep } from '../../../../api/chuyenNganhHep'

const AddNewModal = ({ open, handleModal, fetchUser, listNganhTuyenSinh }) => {
  // ** State
  const [tenChuyennganhhep, setTen] = useState()
  const [kiHieuChuyennganhhep, setKiHieu] = useState()
  const [maChuyennganhTS, setManganhts] = useState()
  const [ghiChu, setGhichu] = useState()

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const _handleThemMT = async () => {
    const res = await taoChuyenNganhHep({
      tenChuyennganhhep,
      kiHieuChuyennganhhep,
      maChuyennganhTS,
      ghiChu
    })
    responseResultHelper(res, handleModal, fetchUser, ACTION_METHOD_TYPE.CREATED)
    setTen()
    setGhichu()
    setKiHieu()
    setManganhts()
  }
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>Tạo chuyên ngành hẹp</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1'>
          <Label className='form-label' for='tenChuyennganhhep'>
            Tên chuyên ngành hẹp
          </Label>
          <Input id='tenChuyennganhhep' value={tenChuyennganhhep} onChange={e => setTen(e.target.value)} />
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
            <option>Chọn chuyên ngành tuyển sinh</option>
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
            Ghi chú
          </Label>
          <Input id='ghiChu' value={ghiChu} onChange={e => setGhichu(e.target.value)} />
        </div>
        <Button className='me-1' color='primary' onClick={_handleThemMT}>
          Thêm
        </Button>
        <Button color='secondary' onClick={handleModal} outline>
          Hủy
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default AddNewModal
