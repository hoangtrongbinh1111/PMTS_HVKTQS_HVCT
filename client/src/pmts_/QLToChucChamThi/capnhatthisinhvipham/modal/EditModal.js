// ** React Imports
import { useState, useEffect } from "react"

// ** Third Party Components
import { X } from "react-feather"

// ** Reactstrap Imports
import { Modal, Input, Label, Button, ModalHeader, ModalBody } from "reactstrap"
import responseResultHelper from "../../../utils/reponsive"
import { ACTION_METHOD_TYPE } from "../../../utils/constant"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { getListHinhThucKyLuat } from "../../../../api/hinhThucKyLuat"
import { suaVipham } from "../../../../api/capnhatthisinhvipham"
import style from "../../../../assets/scss/index.module.scss"

const EditModal = ({ open, handleModal, fetchUser, infoEdit }) => {
  if (!infoEdit) return
  // ** State
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [listHTKL, setListHTKL] = useState([])
  const [kyLuatMon1, setKyLuatMon1] = useState("")
  const [kyLuatMon2, setKyLuatMon2] = useState("")
  const [kyLuatMon3, setKyLuatMon3] = useState("")
  // ** Custom close btn
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModal} />
  )
  const _handleSuaTDH = async () => {
    const res = await suaVipham({
      maHoSo: infoEdit.maHoso,
      kyLuatMon1,
      kyLuatMon2,
      kyLuatMon3,
    })
    responseResultHelper(res, handleModal, fetchUser, ACTION_METHOD_TYPE.UPDATE)
  }
  const fetchData = async (callAPI, setData) => {
    callAPI({
      page: 1,
      perPage: 100,
    })
      .then((res) => {
        setData(res.result.data)
      })
      .catch((err) => {
        return <Alert color="danger">Có lỗi khi gọi dữ liệu</Alert>
      })
  }
  useEffect(() => {
    fetchData(getListHinhThucKyLuat, setListHTKL)
  }, [currentPage, perPage])
  return (
    <Modal isOpen={open} toggle={handleModal} contentClassName="pt-0">
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Sửa vi phạm</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        {infoEdit.klMon1 && (
          <div className="mb-1">
            <Label className="form-label" for="full-name">
              Mức trừ điểm môn 1<span className={style.redColor}>(*)</span>
            </Label>
            <Input
              className="w-100"
              type="select"
              name="maTui"
              id="maTui"
              value={kyLuatMon1}
              onChange={(e) => {
                setKyLuatMon1(e.target.value)
              }}
              style={{ width: "fit-content" }}
            >
              {listHTKL.map((item) => {
                return (
                  <option
                    key={item.maHinhthuc}
                    value={item.maHinhthuc}
                  >{`Trừ ${item.mucTru}%`}</option>
                )
              })}
            </Input>
          </div>
        )}
        {infoEdit.klMon2 && (
          <div className="mb-1">
            <Label className="form-label" for="full-name">
              Mức trừ điểm môn 2<span className={style.redColor}>(*)</span>
            </Label>
            <Input
              className="w-100"
              type="select"
              name="maTui"
              id="maTui"
              value={kyLuatMon2}
              onChange={(e) => {
                setKyLuatMon2(e.target.value)
              }}
              style={{ width: "fit-content" }}
            >
              {listHTKL.map((item) => {
                return (
                  <option
                    key={item.maHinhthuc}
                    value={item.maHinhthuc}
                  >{`Trừ ${item.mucTru}%`}</option>
                )
              })}
            </Input>
          </div>
        )}
        {infoEdit.klMon3 && (
          <div className="mb-1">
            <Label className="form-label" for="full-name">
              Mức trừ điểm môn 3<span className={style.redColor}>(*)</span>
            </Label>
            <Input
              className="w-100"
              type="select"
              name="maTui"
              id="maTui"
              value={kyLuatMon3}
              onChange={(e) => {
                setKyLuatMon3(e.target.value)
              }}
              style={{ width: "fit-content" }}
            >
              {listHTKL.map((item) => {
                return (
                  <option
                    key={item.maHinhthuc}
                    value={item.maHinhthuc}
                  >{`Trừ ${item.mucTru}%`}</option>
                )
              })}
            </Input>
          </div>
        )}
        <Button className="me-1" color="primary" onClick={_handleSuaTDH}>
          Sửa
        </Button>
        <Button color="secondary" onClick={handleModal} outline>
          Hủy
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default EditModal
