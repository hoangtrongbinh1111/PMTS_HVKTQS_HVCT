// ** React Imports'

// ** Third Party Components
import { X } from "react-feather"

// ** Reactstrap Imports
import { Modal, Label, Button, ModalHeader, ModalBody } from "reactstrap"
import { switchDotTuyenSinh } from "../../../../api/DotTuyenSinh"
import responseResultHelper from "../../../utils/reponsive"
import { ACTION_METHOD_TYPE } from "../../../utils/constant"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"

const SwitchModal = ({ open, handleModal, fetchDotTuyenSinh, infoSwitch }) => {
  if (!infoSwitch) return
  // ** Custom close btn
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModal} />
  )
  const _handleChuyenDTS = async () => {
    const res = await switchDotTuyenSinh({
      id: infoSwitch.maDotTS,
    })
    if (res) {
      localStorage.setItem("dbName", res.result)
    }
    responseResultHelper(
      res,
      handleModal,
      fetchDotTuyenSinh,
      ACTION_METHOD_TYPE.SWITCH
    )
  }
  return (
    <Modal isOpen={open} toggle={handleModal} contentClassName="pt-0">
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Nạp dữ liệu</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <div className="mb-1">
          <Label className="form-label" for="full-name">
            Bạn có chắc chắn muốn chuyển đợt tuyển sinh:{" "}
            <b>{infoSwitch?.tenDotTS}</b>
          </Label>
        </div>
        <Button className="me-1" color="primary" onClick={_handleChuyenDTS}>
          Chuyển
        </Button>
        <Button color="secondary" onClick={handleModal} outline>
          Hủy
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default SwitchModal
