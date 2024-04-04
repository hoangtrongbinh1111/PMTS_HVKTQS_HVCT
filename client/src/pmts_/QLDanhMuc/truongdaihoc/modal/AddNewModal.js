// ** React Imports
import { useState } from "react"
import { useForm } from "react-hook-form"

// ** Third Party Components
import Flatpickr from "react-flatpickr"
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
  Form,
  FormText,
} from "reactstrap"
import { taoTruongDaiHoc } from "../../../../api/truongDaiHoc"
import responseResultHelper from "../../../utils/reponsive"
import { ACTION_METHOD_TYPE } from "../../../utils/constant"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import style from "../../../../assets/scss/index.module.scss"
import classnames from "classnames"

const AddNewModal = ({ open, handleModal, fetchUser }) => {
  // ** State
  const [loading, setLoading] = useState(false)
  const [tenTruong, setTen] = useState()
  const [kiHieuTruong, setKiHieu] = useState()
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
  const _handleThemTDH = async () => {
    setLoading(true)
    const res = await taoTruongDaiHoc({
      tenTruong,
      kiHieuTruong,
      ghiChu,
    })
    responseResultHelper(
      res,
      handleModal,
      fetchUser,
      ACTION_METHOD_TYPE.CREATED
    )
    reset()
    setGhichu()
    setTen()
    setKiHieu()
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
        <h5 className="modal-title">Thêm mới trường đại học</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(_handleThemTDH)}>
          <div className="mb-1">
            <Label className="form-label" for="tenTruong">
              Tên trường<span className={style.redColor}>(*)</span>
            </Label>
            <input
              autoFocus
              id="tenTruong"
              name="tenTruong"
              className={`${classnames({
                "is-invalid": errors.tenTruong,
              })} ${style.inputForm}`}
              {...register("tenTruong", { required: true })}
              value={tenTruong}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("tenTruong")
                } else {
                  clearErrors("tenTruong")
                }
                setTen(e.target.value)
              }}
              placeholder="VD: Học viện kỹ thuật quân sự"
            />
            {errors && errors.tenTruong && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập tên trường
              </FormText>
            )}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="tenTruong">
              Kí hiệu trường<span className={style.redColor}>(*)</span>
            </Label>
            <input
              id="kiHieuTruong"
              name="kiHieuTruong"
              className={`${classnames({
                "is-invalid": errors.kiHieuTruong,
              })} ${style.inputForm}`}
              {...register("kiHieuTruong", { required: true })}
              value={kiHieuTruong}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("kiHieuTruong")
                } else {
                  clearErrors("kiHieuTruong")
                }
                setKiHieu(e.target.value)
              }}
              placeholder="VD: HV"
            />
            {errors && errors.kiHieuTruong && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập kí hiệu trường
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
