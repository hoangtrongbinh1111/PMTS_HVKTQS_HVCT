// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X } from 'react-feather'

// ** Reactstrap Imports
import { Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText } from 'reactstrap'
import { createGroupUser } from '../../../../api/GroupUser'
import responseResultHelper from '../../../utils/reponsive'
import { ACTION_METHOD_TYPE } from '../../../utils/constant'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const AddNewModal = ({ open, handleModal, fetchUser }) => {
  // ** State
  const [tenNhom, setTen] = useState()
  const [ghiChu, setGhichu] = useState()
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const _handleThemNND = async () => {
    const res = await createGroupUser({
      tenNhom,
      ghiChu
    })
    responseResultHelper(res, handleModal, fetchUser, ACTION_METHOD_TYPE.CREATED)
    setGhichu()
    setTen()
  }
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>Tạo nhóm người dùng mới</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1'>
          <Label className='form-label' for='tenNhom'>
            Tên nhóm
          </Label>
          <Input id='tenNhom' value={tenNhom} onChange={e => setTen(e.target.value)} />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='ghiChu'>
            Ghi chú
          </Label>
          <Input id='ghiChu' value={ghiChu} onChange={e => setGhichu(e.target.value)} />
        </div>
        <Button className='me-1' color='primary' onClick={_handleThemNND}>
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
