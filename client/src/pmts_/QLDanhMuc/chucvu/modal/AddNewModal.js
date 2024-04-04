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
import { taoTinh } from "../../../../api/tinh"
import { taoChucVu } from "../../../../api/chuVu"
import style from "../../../../assets/scss/index.module.scss"
import classnames from "classnames"

const AddNewModal = ({ open, handleModal, fetchUser }) => {
  // ** State
  const [tenChucvu, setTen] = useState()
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
    const res = await taoChucVu({
      tenChucvu,
    })
    responseResultHelper(
      res,
      handleModal,
      fetchUser,
      ACTION_METHOD_TYPE.CREATED
    )
    setTen()
    reset()
  }
  return (
    <Modal isOpen={open} toggle={handleModal} contentClassName="pt-0">
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Tạo cấp bậc</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
      <Form onSubmit={handleSubmit(_handleThemTDH)}>
        <div className="mb-1">
          <Label className="form-label" for="tenChucvu">
            Tên cấp bậc<span className={style.redColor}>(*)</span>
          </Label>
          <input
              id="tenChucvu"
              name="tenChucvu"
              className={`${classnames({
                "is-invalid": errors.tenChucvu,
              })} ${style.inputForm}`}
              {...register("tenChucvu", { required: true })}
              value={tenChucvu}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("tenChucvu")
                } else {
                  clearErrors("tenChucvu")
                }
                setTen(e.target.value)
              }}
              placeholder="VD: Trung úy"
            />
            {errors && errors.tenChucvu && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập tên cấp bậc
              </FormText>
            )}
        </div>
        <Button className="me-1" color="primary" type="submit">
          Thêm
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
