// ** React Imports
// ** Third Party Components
import { X } from "react-feather"
import { useState } from "react"

// ** Reactstrap Imports
import { Modal, Label, Button, ModalHeader, ModalBody } from "reactstrap"
import { deleteDotTuyenSinh } from "../../../../api/DotTuyenSinh"
import responseResultHelper from "../../../utils/reponsive"
import { ACTION_METHOD_TYPE } from "../../../utils/constant"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"

const DeleteModal = ({ open, handleModal, fetchDotTuyenSinh, infoDel }) => {
  if (!infoDel) return
  // ** Custom close btn
  const [loading, setLoading] = useState(false)
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModal} />
  )
  const _handleXoaDTS = async () => {
    setLoading(true)
    const res = await deleteDotTuyenSinh({
      id: infoDel.maDotTS,
    })
    responseResultHelper(
      res,
      handleModal,
      fetchDotTuyenSinh,
      ACTION_METHOD_TYPE.DELETE
    )
    setLoading(false)
  }
  return (
    <Modal isOpen={open} toggle={handleModal} contentClassName="pt-0">
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Xóa đợt tuyển sinh</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <div className="mb-1">
          <Label className="form-label" for="full-name">
            Bạn có chắc chắn muốn xóa đợt tuyển sinh: <b>{infoDel.tenDotTS}</b>
          </Label>
        </div>
        <Button className="me-1" color="primary" onClick={_handleXoaDTS}>
          
          {
            loading ? <div className="loader"></div> : 'Xóa'
          }
        </Button>
        <Button color="secondary" onClick={handleModal} outline>
          Hủy
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default DeleteModal
