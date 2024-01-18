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
import { taoHinhThucKyLuat } from "../../../../api/hinhThucKyLuat"
import style from "../../../../assets/scss/index.module.scss"
import classnames from "classnames"

const AddNewModal = ({ open, handleModal, fetchUser }) => {
  // ** State
  const [tenHinhthuc, setTen] = useState()
  const [mucTru, setTruM1] = useState(0)
  const [ghiChu, setGhichu] = useState()
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
  const _handleThemHTKL = async () => {
    setLoading(true)
    const res = await taoHinhThucKyLuat({
      tenHinhthuc,
      mucTru,
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
    setTruM1(0)
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
        <h5 className="modal-title">Thêm mới hình thức kỷ luật</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(_handleThemHTKL)}>
          <div className="mb-1">
            <Label className="form-label" for="tenHinhthuc">
              Tên hình thức kỷ luật<span className={style.redColor}>(*)</span>
            </Label>
            <input
              autoFocus
              id="tenHinhthuc"
              name="tenHinhthuc"
              className={`${classnames({
                "is-invalid": errors.tenHinhthuc,
              })} ${style.inputForm}`}
              {...register("tenHinhthuc", { required: true })}
              value={tenHinhthuc}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("tenHinhthuc")
                } else {
                  clearErrors("tenHinhthuc")
                }
                setTen(e.target.value)
              }}
              placeholder="Tên hình thức kỷ luật"
            />
            {errors && errors.tenHinhthuc && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập tên hình thức kỷ luật
              </FormText>
            )}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="truM1">
              Mức trừ (%)<span className={style.redColor}>(*)</span>
            </Label>
            <input
              id="mucTru"
              name="mucTru"
              className={`${classnames({
                "is-invalid": errors.mucTru,
              })} ${style.inputForm}`}
              {...register("mucTru", { required: true })}
              value={mucTru}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("mucTru")
                } else {
                  clearErrors("mucTru")
                }
                setTruM1(e.target.value)
              }}
              placeholder=""
            />
            {errors && errors.mucTru && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập mức trừ
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
          <Button color="secondary" onClick={handleModal} outline>
            Hủy
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default AddNewModal
