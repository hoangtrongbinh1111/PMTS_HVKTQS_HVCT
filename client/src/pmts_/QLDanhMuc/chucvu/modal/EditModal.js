// ** React Imports
import { useState, useEffect } from "react"
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
import { suaTruongDaiHoc } from "../../../../api/truongDaiHoc"
import responseResultHelper from "../../../utils/reponsive"
import { ACTION_METHOD_TYPE } from "../../../utils/constant"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { suaTinh } from "../../../../api/tinh"
import { suaChucVu } from "../../../../api/chuVu"
import style from "../../../../assets/scss/index.module.scss"
import classnames from "classnames"

const EditModal = ({ open, handleModal, fetchUser, infoEdit }) => {
  if (!infoEdit) return
  // ** State
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    setError,
    formState: { errors },
  } = useForm()
  const [tenChucvu, setTen] = useState()
  // ** Custom close btn
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModal} />
  )
  const _handleSuaTDH = async () => {
    const res = await suaChucVu({
      id: infoEdit.maChucVu,
      tenChucvu,
    })
    responseResultHelper(res, handleModal, fetchUser, ACTION_METHOD_TYPE.UPDATE)
  }
  useEffect(() => {
    setTen(infoEdit.tenChucvu)
  }, [infoEdit])
  return (
    <Modal isOpen={open} toggle={handleModal} contentClassName="pt-0">
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Sửa cấp bậc</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(_handleSuaTDH)}>
          <div className="mb-1">
            <Label className="form-label" for="full-name">
              Tên cấp bậc<span className={style.redColor}>(*)</span>
            </Label>
            <input
              id="tenChucvu"
              name="tenChucvu"
              className={`${classnames({
                "is-invalid": errors.tenChucvu,
              })} ${style.inputForm}`}
              {...register("tenChucvu", { required: tenChucvu === "" })}
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
          <Button className="me-1" color="primary" onClick={_handleSuaTDH}>
            Sửa
          </Button>
          <Button color="secondary" onClick={handleModal} outline>
            Hủy
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default EditModal
