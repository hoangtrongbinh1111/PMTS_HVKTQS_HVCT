// ** React Imports
import { useState } from "react"
import { useForm } from "react-hook-form"
// ** Third Party Components
import Flatpickr from "react-flatpickr"
import { Vietnamese } from "flatpickr/dist/l10n/vn.js"

import { User, Briefcase, Mail, Calendar, DollarSign, X } from "react-feather"

// ** Reactstrap Imports
import {
  Modal,
  Input,
  Label,
  Button,
  ModalHeader,
  ModalBody,
  InputGroup,
  InputGroupText,
  Row,
  Col,
  Form,
  FormText,
} from "reactstrap"

import responseResultHelper from "../../../utils/reponsive"
import { ACTION_METHOD_TYPE } from "../../../utils/constant"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { taoDiaDiemToChucThi } from "../../../../api/diaDiemToChucThi"
import style from "../../../../assets/scss/index.module.scss"
import classnames from "classnames"

const AddNewModal = ({ open, handleModal, fetchUser }) => {
  // ** State
  const [loading, setLoading] = useState(false)
  const [tenDiadiem, setTen] = useState()
  const [KiHieuDiadiem, setKihieu] = useState()
  const [gioTt, setGioTt] = useState(null)
  const [ngayTt, setNgayTt] = useState(null)
  const [diaChi, setDiachi] = useState()
  const [ghiChu, setGhichu] = useState()
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    setError,
    formState: { errors },
  } = useForm()
  // ** Custom close btn
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModal} />
  )
  const date = Date.now()
  const _handleThemDCTCT = async () => {
    setLoading(true)
    const res = await taoDiaDiemToChucThi({
      tenDiadiem,
      KiHieuDiadiem,
      gioTt,
      ngayTt,
      diaChi,
      ghiChu,
    })
    responseResultHelper(
      res,
      handleModal,
      fetchUser,
      ACTION_METHOD_TYPE.CREATED
    )
    setGhichu()
    setTen()
    setGioTt()
    setNgayTt()
    setDiachi()
    setKihieu()
    setLoading(false)
  }
  return (
    <Modal isOpen={open} toggle={handleModal} contentClassName="pt-0" autoFocus={false}>
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Thêm mới địa điểm thi</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(_handleThemDCTCT)}>
          <div className="mb-1">
            <Label className="form-label" for="tenDiadiem">
              Tên địa điểm thi<span className={style.redColor}>(*)</span>
            </Label>
            <input
              autoFocus
              id="tenDiadiem"
              name="tenDiadiem"
              className={`${classnames({
                "is-invalid": errors.tenDiadiem,
              })} ${style.inputForm}`}
              {...register("tenDiadiem", { required: true })}
              value={tenDiadiem}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("tenDiadiem")
                } else {
                  clearErrors("tenDiadiem")
                }
                setTen(e.target.value)
              }}
              placeholder="VD: Học viện"
            />
            {errors && errors.tenDiadiem && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập tên địa điểm
              </FormText>
            )}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="tenDiadiem">
              Kí hiệu<span className={style.redColor}>(*)</span>
            </Label>
            <input
              id="KiHieuDiadiem"
              name="KiHieuDiadiem"
              className={`${classnames({
                "is-invalid": errors.KiHieuDiadiem,
              })} ${style.inputForm}`}
              {...register("KiHieuDiadiem", { required: true })}
              value={KiHieuDiadiem}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("KiHieuDiadiem")
                } else {
                  clearErrors("KiHieuDiadiem")
                }
                setKihieu(e.target.value)
              }}
              placeholder="VD: HV"
            />
            {errors && errors.KiHieuDiadiem && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập kí hiệu địa điểm
              </FormText>
            )}
          </div>
          <div className="mb-1">
            <Row>
              <Col md="6">
                <div className="mb-1">
                  <Label className="form-label" for="ngayTt">
                    Ngày tập trung<span className={style.redColor}>(*)</span>
                  </Label>
                  <Flatpickr
                    className="form-control"
                    value={ngayTt}
                    onChange={(date) => setNgayTt(date)}
                    id="default-picker"
                    options={{
                      dateFormat: "d/m/Y",
                      locale: {
                        ...Vietnamese,
                      },
                    }}
                  />
                </div>
              </Col>
              <Col md="6">
                <Label className="form-label" for="gioTt">
                  Giờ tập trung<span className={style.redColor}>(*)</span>
                </Label>
                <Flatpickr
                  className="form-control"
                  value={gioTt}
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
            <Label className="form-label" for="diaChi">
              Địa chỉ<span className={style.redColor}>(*)</span>
            </Label>
            <input
              id="diaChi"
              name="diaChi"
              className={`${classnames({
                "is-invalid": errors.diaChi,
              })} ${style.inputForm}`}
              {...register("diaChi", { required: true })}
              value={diaChi}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("diaChi")
                } else {
                  clearErrors("diaChi")
                }
                setDiachi(e.target.value)
              }}
              placeholder="VD: 236, Hoàng Quốc Việt, Bắc Từ Liêm, Hà Nội"
            />
            {errors && errors.diaChi && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập địa chỉ
              </FormText>
            )}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="ghiChu">
              Ghi chú
            </Label>
            <Input
              id="ghiChu"
              value={ghiChu}
              onChange={(e) => setGhichu(e.target.value)}
            />
          </div>
          <Button className="me-1" color="primary" type="submit">
          { loading ? <div className='loader'></div> : 'Thêm'}
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              handleModal()
              reset()
            }}
            outline
          >
            Hủy
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default AddNewModal
