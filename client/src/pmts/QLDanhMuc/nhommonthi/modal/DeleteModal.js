// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X } from 'react-feather'

// ** Reactstrap Imports
import { Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText } from 'reactstrap'

import responseResultHelper from '../../../utils/reponsive'
import { ACTION_METHOD_TYPE } from '../../../utils/constant'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { xoaNhomMonThi } from '../../../../api/nhomMonthi'

const DeleteModal = ({ open, handleModal, fetchUser, infoEdit }) => {
  if (!infoEdit) return
  // ** State
  // ** Custom close btn
  const [loading, setLoading] = useState(false)
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const _handleXoaNMT = async () => {
    setLoading(true)
    const res = await xoaNhomMonThi({
      id: infoEdit.maNhommonhoc
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
        <h5 className='modal-title'>Xóa nhóm Môn Học</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1'>
          <Label className='form-label' for='full-name'>
            Bạn có chắc chắn xóa nhóm <span style={{ fontWeight: 'bold' }}>{infoEdit?.tenNhomMonHoc}</span>
          </Label>
        </div>
        <Button className='me-1' color='primary' onClick={_handleXoaNMT}>
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
