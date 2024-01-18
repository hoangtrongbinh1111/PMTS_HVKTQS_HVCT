// ** React Imports
import { useState } from "react"
import { useForm } from "react-hook-form"

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
  InputGroupText,
  Col,
  Form,
  FormText,
  FormGroup,
} from "reactstrap"
import classnames from "classnames"

import responseResultHelper from "../../../utils/reponsive"
import { ACTION_METHOD_TYPE } from "../../../utils/constant"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { taoNhomMonThi } from "../../../../api/nhomMonthi"
import Flatpickr from "react-flatpickr"
import { Vietnamese } from "flatpickr/dist/l10n/vn.js"
import style from "../../../../assets/scss/index.module.scss"

const AddNewModal = ({ open, handleModal, fetchUser }) => {
  // ** State
  const [tenNhomMonHoc, setTen] = useState()
  const [gioThi, setGioTt] = useState(null)
  const [ngayThi, setNgayTt] = useState(null)
  const [loading, setLoading] = useState(false)
  // ** Custom close btn
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModal} />
  )
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    setError,
    formState: { errors },
  } = useForm()
  const _handleThemNMT = async (data) => {
    setLoading(true)
    const res = await taoNhomMonThi({
      tenNhomMonHoc: data.tenNhomMonHoc,
      gioThi,
      ngayThi,
    })
    responseResultHelper(
      res,
      handleModal,
      fetchUser,
      ACTION_METHOD_TYPE.CREATED
    )
    setLoading(false)
    setTen()
    setGioTt()
    setNgayTt()
    reset()
  }
 
  return (
    <Modal isOpen={open} toggle={handleModal} contentClassName="pt-0" autoFocus={false}>
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Thêm mới nhóm môn thi</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(_handleThemNMT)}>
          <FormGroup className={style.cusFormGroup}>
            <Label className="form-label" for="tenNhomMonHoc">
              Tên nhóm môn thi<span className={style.redColor}>(*)</span>
            </Label>
            <input
              autoFocus
              id="tenNhomMonHoc"
              className={`${classnames({
                "is-invalid": errors.tenNhomMonHoc,
              })} ${style.inputForm}`}
              {...register("tenNhomMonHoc", { required: true })}
              placeholder="VD: Khoa học xã hội"
            />
             {errors && errors.tenNhomMonHoc && (
                  <FormText color="danger" className={style.formErr}>
                    Vui lòng nhập tên nhóm môn học
                  </FormText>
                )}
          </FormGroup>
          <FormGroup className={style.cusFormGroup}>
            <Row>
              <Col md="6" sm="12">
                <Label className="form-label" for="ngayThi">
                  Ngày thi<span className={style.redColor}>(*)</span>
                </Label>
                <Flatpickr
                  className="form-control"
                  value={ngayThi}
                  onChange={(date) => setNgayTt(date)}
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
                  value={gioThi}
                  id="timepicker"
                  options={{
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: "H:i",
                    time_24hr: true,
                  }}
                  onChange={(date) => setGioTt(date)}
                />
              </Col>
            </Row>
          </FormGroup>
          <Button className="me-1" color="primary" type="submit" disabled={!(ngayThi !== null && gioThi !== null) }>
            { loading ? <div className="loader"></div> : 'Thêm'}
          </Button>
          <Button color="secondary" onClick={handleModal} outline>
            Hủy
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default AddNewModal
