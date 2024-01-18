// ** React Imports
import { useState, useEffect } from "react"

// ** Third Party Components
import { User, Briefcase, Mail, Calendar, DollarSign, X } from "react-feather"

// ** Reactstrap Imports
import {
  Modal,
  Input,
  Label,
  Button,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  InputGroupText,
  Form,
  FormText,
} from "reactstrap"

import responseResultHelper from "../../../utils/reponsive"
import { ACTION_METHOD_TYPE } from "../../../utils/constant"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { Vietnamese } from "flatpickr/dist/l10n/vn.js"
import { useForm } from "react-hook-form"

import { suaNhomMonThi } from "../../../../api/nhomMonthi"
import Flatpickr from "react-flatpickr"
import style from "../../../../assets/scss/index.module.scss"
import classnames from "classnames"

const EditModal = ({ open, handleModal, fetchUser, infoEdit }) => {
  if (!infoEdit) return
  const [loading, setLoading] = useState(false)
  // ** State
  const [newInfo, setNewInfo] = useState({
    tenNhomMonHoc: "",
    gioThi: "",
    ngayThi: ""
  })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  // ** Custom close btn
  useEffect(() => {
    setNewInfo({
      tenNhomMonHoc: infoEdit.tenNhomMonHoc || "",
      gioThi: infoEdit.gioThi || "",
      ngayThi: infoEdit.ngayThi || ""
    })
  }, [infoEdit])
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModal} />
  )
  const _handleSuaDCTCT = async (data) => {
    setLoading(true)
    const dataSubmit = {
      id: infoEdit.maNhommonhoc,
      tenNhomMonHoc: newInfo.tenNhomMonHoc,
      gioThi: newInfo.gioThi,
      ngayThi: newInfo.ngayThi,
    }
    const res = await suaNhomMonThi(dataSubmit)
    responseResultHelper(res, handleModal, fetchUser, ACTION_METHOD_TYPE.UPDATE)
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
        <h5 className="modal-title">Sửa nhóm môn thi</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(_handleSuaDCTCT)}>
          <div className="mb-1">
            <Label className="form-label" for="tenNhomMonHoc">
              Tên nhóm môn thi<span className={style.redColor}>(*)</span>
            </Label>
            <input
              autoFocus
              id="tenNhomMonHoc"
              name="tenNhomMonHoc"
              type="text"
              value={newInfo.tenNhomMonHoc}
              className={`${classnames({ "is-invalid": errors.tenNhomMonHoc })} ${style.inputForm}`}
              {...register("tenNhomMonHoc", { required: false })}
              onChange={(e) => {
                setNewInfo({
                  ...newInfo,
                  tenNhomMonHoc: e.target.value
                })
              }}
            />
            {errors && errors.tenNhomMonHoc && newInfo.tenNhomMonHoc === '' && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập tên nhóm môn thi
              </FormText>
            )}
          </div>
          <div className="mb-1">
            <Row>
              <Col md="6" sm="12">
                <Label className="form-label" for="ngayThi">
                  Ngày thi<span className={style.redColor}>(*)</span>
                </Label>
                <Flatpickr
                  className="form-control"
                  value={infoEdit.ngayThi}
                  onChange={(date) => setNewInfo({
                    ...newInfo,
                    ngayThi: date
                  })}
                  id="default-picker"
                  options={{
                    dateFormat: "d/m/Y",
                    locale: {
                      ...Vietnamese,
                    },
                  }}
                />
              </Col>
              <Col md="6" sm="12">
                <Label className="form-label" for="gioThi">
                  Giờ thi<span className={style.redColor}>(*)</span>
                </Label>
                <Flatpickr
                  className="form-control"
                  value={newInfo.gioThi}
                  id="timepicker"
                  options={{
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: "H:i",
                    time_24hr: true,
                  }}
                  onChange={(date) => setNewInfo({
                    ...newInfo,
                    gioThi: date
                  })}
                />
              </Col>
            </Row>
          </div>
          <Button className="me-1" color="primary" type="submit">
          { loading ? <div className='loader'></div> : 'Sửa'}
          </Button>
          <Button color="secondary" onClick={handleModal} type="reset" outline>
            Hủy
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default EditModal
