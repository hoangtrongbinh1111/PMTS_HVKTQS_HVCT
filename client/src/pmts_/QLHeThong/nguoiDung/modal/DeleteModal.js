// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X } from 'react-feather'

// ** Reactstrap Imports
import { Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText } from 'reactstrap'
import { deleteGroupUser } from '../../../../api/GroupUser'
import { deleteUser } from '../../../../api/user'
import responseResultHelper from '../../../utils/reponsive'
import { ACTION_METHOD_TYPE } from '../../../utils/constant'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const DeleteModal = ({ open, handleModal, fetchUser, infoDelete }) => {
  if (!infoDel) return
  // ** State
  const [loading, setLoading] = useState(false)
  const [tenNhom, setTen] = useState(infoDelete.tenNhom)
  const [ghiChu, setGhichu] = useState(infoDelete.ghiChu)
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const _handleXoaNND = async () => {
    setLoading(true)
    const res = await deleteUser({
      id: infoDelete.maNguoiDung
    })

    responseResultHelper(res, handleModal, fetchUser, ACTION_METHOD_TYPE.DELETE)
    setLoading(false)
  }
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>Xóa người dùng</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1'>
          <Label className='form-label' for='full-name'>
            Bạn có chắc chắn xóa người dùng <span style={{ fontWeight: 'bold' }}>{infoDelete?.hoTen}</span>?
          </Label>
        </div>
        <Button className='me-1' color='primary' onClick={_handleXoaNND}>
        { loading ? <div className='loader'></div> : 'Xóa'}
        </Button>
        <Button color='secondary' onClick={handleModal} outline>
          Hủy
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default DeleteModal
