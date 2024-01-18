// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X } from 'react-feather'

// ** Reactstrap Imports
import { Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText } from 'reactstrap'
import responseResultHelper from '../../../utils/reponsive'
import { ACTION_METHOD_TYPE } from '../../../utils/constant'
import { deleteCT } from '../../../../api/chiTieuTuyenSinh'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const DeleteModal = ({ open, handleModal, fetchDataDetail, fetchData, infoEdit }) => {
  if (!infoEdit) return
  const MySwal = withReactContent(Swal)
  const [loading, setLoading] = useState(false)
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const _handleXoaNND = async () => {
    setLoading(true)
    deleteCT({
      params: {
        maChitieu: infoEdit.maChitieu
      }
    }).then(res => {
      const MySwal = withReactContent(Swal)
      if (res.status) {
        MySwal.fire({
          icon: "success",
          title: "Xóa chỉ tiêu tuyển sinh thành công!",
          customClass: {
            confirmButton: "btn btn-success"
          }
        })
        handleModal(false)
        fetchDataDetail()
        fetchData()
      } else {
        MySwal.fire({
          icon: "error",
          title: "Có lỗi xảy ra",
          text: "Vui lòng thử lại",
          customClass: {
            confirmButton: "btn btn-danger"
          }
        })
      }
    })
      .catch(err => {
        MySwal.fire({
          icon: "error",
          title: "Có lỗi xảy ra",
          text: "Vui lòng thử lại",
          customClass: {
            confirmButton: "btn btn-danger"
          }
        })
      })
      setLoading(false)
  }
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>Xóa chỉ tiêu tuyển sinh</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1'>
          <Label className='form-label' for='full-name'>
            Bạn có chắc chắn xóa
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
