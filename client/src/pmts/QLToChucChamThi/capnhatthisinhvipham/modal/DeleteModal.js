// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { X } from 'react-feather'

// ** Reactstrap Imports
import { Modal, Label, Button, ModalHeader, ModalBody } from 'reactstrap'
import responseResultHelper from '../../../utils/reponsive'
import { ACTION_METHOD_TYPE } from '../../../utils/constant'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { xoaVipham } from '../../../../api/capnhatthisinhvipham'

const DeleteModal = ({ open, handleModal, fetchUser, infoDelete }) => {
  if (!infoDelete) return
  // ** State
  // ** Custom close btn
  console.log(infoDelete)
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const _handleXoaVipham = async () => {
    const res = await xoaVipham({
      maHoso: infoDelete.maHoso
    })
    responseResultHelper(res, handleModal, fetchUser, ACTION_METHOD_TYPE.DELETE)
  }
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>Xóa vi phạm</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1'>
          <Label className='form-label' for='full-name'>
            Bạn có chắc chắn xóa
          </Label>
        </div>
        <Button className='me-1' color='primary' onClick={_handleXoaVipham}>
          Xóa
        </Button>
        <Button color='secondary' onClick={handleModal} outline>
          Hủy
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default DeleteModal
