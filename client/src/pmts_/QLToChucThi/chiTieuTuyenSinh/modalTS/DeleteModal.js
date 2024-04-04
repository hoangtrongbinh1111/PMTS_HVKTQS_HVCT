// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X } from 'react-feather'

// ** Reactstrap Imports
import { Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText } from 'reactstrap'
import responseResultHelper from '../../../utils/reponsive'
import { ACTION_METHOD_TYPE } from '../../../utils/constant'
import { deleteCNTS } from '../../../../api/chiTieuTuyenSinh'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const DeleteModal = ({ open, handleModal, fetchData, infoEdit }) => {
  if (!infoEdit) return
  // ** State
  const [loading, setLoading] = useState(false)
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const _handleXoaNND = async () => {
    setLoading(true)
    const res = await deleteCNTS({
      maChuyennganhTS: infoEdit.maChuyennganhTS
    })

    responseResultHelper(res, handleModal, fetchData, ACTION_METHOD_TYPE.DELETE)
    setLoading(false)
  }
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-1 text-align-center' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>Xóa chỉ tiêu tuyển sinh</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1'>
          <Label className='form-label' for='full-name'>
            Bạn có chắc chắn xóa chỉ tiêu tuyển sinh của chuyên ngành <span style={{ fontWeight: 'bold' }}>{infoEdit?.tenChuyennganh}?</span>
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
