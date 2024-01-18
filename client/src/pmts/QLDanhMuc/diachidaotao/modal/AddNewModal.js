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

import responseResultHelper from "../../../utils/reponsive"
import { ACTION_METHOD_TYPE } from "../../../utils/constant"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { taoDiaChiDaoTao } from "../../../../api/diaChiDaoTao"
import style from "../../../../assets/scss/index.module.scss"
import classnames from "classnames"

const AddNewModal = ({ open, handleModal, fetchUser }) => {
  // ** State
  const [tenDc, setTen] = useState()
  const [ghiChu, setGhichu] = useState()
  const [KiHieuDc, setKiHieu] = useState()
  const [loading, setLoading] = useState(false)
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
  const _handleThemDCDT = async () => {
    setLoading(true)
    const res = await taoDiaChiDaoTao({
      tenDc,
      KiHieuDc,
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
        <h5 className="modal-title">Thêm mới địa chỉ đào tạo</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(_handleThemDCDT)}>
          <div className="mb-1">
            <Label className="form-label" for="tenDc">
              Tên địa chỉ đào tạo<span className={style.redColor}>(*)</span>
            </Label>
            <input
              autoFocus
              id="tenDc"
              name="tenDc"
              className={`${classnames({
                "is-invalid": errors.tenDc,
              })} ${style.inputForm}`}
              {...register("tenDc", { required: true })}
              value={tenDc}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("tenDc")
                } else {
                  clearErrors("tenDc")
                }
                setTen(e.target.value)
              }}
              placeholder="VD: Học viện"
            />
            {errors && errors.tenDc && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập tên địa chỉ đào tạo
              </FormText>
            )}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="tenDc">
              Kí hiệu<span className={style.redColor}>(*)</span>
            </Label>
            <input
              id="KiHieuDc"
              name="KiHieuDc"
              className={`${classnames({
                "is-invalid": errors.KiHieuDc,
              })} ${style.inputForm}`}
              {...register("KiHieuDc", { required: true })}
              value={KiHieuDc}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("KiHieuDc")
                } else {
                  clearErrors("KiHieuDc")
                }
                setKiHieu(e.target.value)
              }}
              placeholder="VD: HV"
            />
            {errors && errors.KiHieuDc && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập kí hiệu địa chỉ đào tạo
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
