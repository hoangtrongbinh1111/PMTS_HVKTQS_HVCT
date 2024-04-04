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
import { taoTinh } from '../../../../api/tinh'

const AddNewModal = ({ open, handleModal, fetchUser }) => {
  // ** State
  const [tenTinh, setTen] = useState()
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const _handleThemTDH = async () => {
    const res = await taoTinh({
      tenTinh,
    })
    responseResultHelper(res, handleModal, fetchUser, ACTION_METHOD_TYPE.CREATED)
    setTen()
  }
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>Tạo tỉnh</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1'>
          <Label className='form-label' for='tenTinh'>
            Tên tỉnh
          </Label>
          <Input id='tenTinh' value={tenTinh} onChange={e => setTen(e.target.value)} />
        </div>
        <Button className='me-1' color='primary' onClick={_handleThemTDH}>
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
