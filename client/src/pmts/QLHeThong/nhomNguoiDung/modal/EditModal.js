// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X } from 'react-feather'

// ** Reactstrap Imports
import { Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText } from 'reactstrap'
import { updateGroupUser } from '../../../../api/GroupUser'
import responseResultHelper from '../../../utils/reponsive'
import { ACTION_METHOD_TYPE } from '../../../utils/constant'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const EditModal = ({ open, handleModal, fetchUser, infoEdit }) => {
  if (!infoEdit) return
  // ** State
  const [tenNhom, setTen] = useState()
  const [ghiChu, setGhichu] = useState()
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  useEffect(() => {
    setTen(infoEdit.tenNhom)
    setGhichu(infoEdit.ghiChu)
  }, [infoEdit])
  const _handleEditGroup = async () => {
    const res = await updateGroupUser({
      id: infoEdit.maNhom,
      tenNhom,
      ghiChu
    })
    responseResultHelper(res, handleModal, fetchUser, ACTION_METHOD_TYPE.UPDATE)
  }
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>Sửa nhóm người dùng</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1'>
          <Label className='form-label' for='full-name'>
            Tên nhóm
          </Label>
          <Input id='full-name' value={tenNhom} onChange={e => setTen(e.target.value)} />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='post'>
            Ghi chú
          </Label>
          <Input id='post' value={ghiChu} onChange={e => setGhichu(e.target.value)} />
        </div>
        <Button className='me-1' color='primary' onClick={_handleEditGroup}>
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
