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
import { taoThuTuDonTui } from '../../../../api/thutuDonTui'

const AddNewModal = ({ open, handleModal, listNhomMonThi, listThuTuDonTui, fetchUser, callBackDisableTaolai }) => {
  // ** State
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const _handleTaoThuTuDonTui = async () => {
    const listMaMonHoc = listNhomMonThi?.data?.map(item => item.maNhommonhoc)
    // listNhomMonThi.data.map(async (nhom, index) => {
      const res = await taoThuTuDonTui({
        maNhommonhoc: listMaMonHoc,
        thuTuDon: listThuTuDonTui
      })
      responseResultHelper(res, handleModal, fetchUser, ACTION_METHOD_TYPE.SAVE)
    // })
    callBackDisableTaolai(false)
  }
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>Lưu thứ tự dồn túi</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1'>
          <Label className='form-label' for='full-name'>
            Bạn có chắc chắn lưu thứ tự hiện tại
          </Label>
        </div>
        <Button className='me-1' color='primary' onClick={_handleTaoThuTuDonTui}>
          Lưu
        </Button>
        <Button color='secondary' onClick={handleModal} outline>
          Hủy
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default AddNewModal
