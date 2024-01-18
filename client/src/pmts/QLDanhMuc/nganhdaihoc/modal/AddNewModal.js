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
import { taoNganhDaiHoc } from "../../../../api/nganhDaiHoc"
import responseResultHelper from "../../../utils/reponsive"
import { ACTION_METHOD_TYPE } from "../../../utils/constant"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import style from "../../../../assets/scss/index.module.scss"
import classnames from "classnames"

const AddNewModal = ({ open, handleModal, fetchUser }) => {
  // ** State
  const [loading, setLoading] = useState(false)
  const [tenNganh, setTen] = useState()
  const [kihieuNganh, setKiHieu] = useState()
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
  const _handleThemNDH = async () => {
    setLoading(true)
    const res = await taoNganhDaiHoc({
      tenNganh,
      kihieuNganh,
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
    setKiHieu()
    reset()
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
        <h5 className="modal-title">Thêm mới ngành đại học</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
      <Form onSubmit={handleSubmit(_handleThemNDH)}>
        <div className="mb-1">
          <Label className="form-label" for="tenNganh">
            Tên ngành<span className={style.redColor}>(*)</span>
          </Label>
          <input
              autoFocus
              id="tenNganh"
              name="tenNganh"
              className={`${classnames({
                "is-invalid": errors.tenNganh,
              })} ${style.inputForm}`}
              {...register("tenNganh", { required: true })}
              value={tenNganh}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("tenNganh")
                } else {
                  clearErrors("tenNganh")
                }
                setTen(e.target.value)
              }}
              placeholder="VD: Công nghệ thông tin"
            />
            {errors && errors.tenNganh && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập tên ngành
              </FormText>
            )}
        </div>
        <div className="mb-1">
          <Label className="form-label" for="kihieuNganh">
            Kí hiệu<span className={style.redColor}>(*)</span>
          </Label>
          <input
              id="kihieuNganh"
              name="kihieuNganh"
              className={`${classnames({
                "is-invalid": errors.kihieuNganh,
              })} ${style.inputForm}`}
              {...register("kihieuNganh", { required: true })}
              value={kihieuNganh}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("kihieuNganh")
                } else {
                  clearErrors("kihieuNganh")
                }
                setKiHieu(e.target.value)
              }}
              placeholder="VD: CNTT"
            />
            {errors && errors.kihieuNganh && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập kí hiệu ngành
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
