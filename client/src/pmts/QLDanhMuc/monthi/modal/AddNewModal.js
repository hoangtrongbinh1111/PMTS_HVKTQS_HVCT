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
import style from "../../../../assets/scss/index.module.scss"
import classnames from "classnames"
import responseResultHelper from "../../../utils/reponsive"
import { ACTION_METHOD_TYPE } from "../../../utils/constant"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { taoMonThi } from "../../../../api/monThi"

const AddNewModal = ({ open, handleModal, fetchUser, listNhomMonHoc }) => {
  // ** State
  const [loading, setLoading] = useState(false)
  const [nhomMonthi, setNhomMonThi] = useState(null)
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm()
  // ** Custom close btn
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModal} />
  )
  const _handleThemMT = async (data) => {
    setLoading(true)
    const res = await taoMonThi(data)
    responseResultHelper(
      res,
      handleModal,
      fetchUser,
      ACTION_METHOD_TYPE.CREATED
    )
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
        <h5 className="modal-title">Thêm mới môn thi</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(_handleThemMT)}>
          <div className="mb-1">
            <Label className="form-label" for="maNhommonhoc">
              Nhóm môn thi<span className={style.redColor}>(*)</span>
            </Label>
            <Input
              autoFocus
              id="maNhommonhoc"
              type="select"
              {...register("maNhommonhoc", { required: true })}
              className={`${classnames({
                "is-invalid": errors["maNhommonhoc"],
              })} ${style.inputForm}`}
              onChange={(e) => {
                setValue("maNhommonhoc", e.target.value)
                if (e.target.value) {
                  clearErrors("maNhommonhoc")
                }
              }}
            >
              <option>Chọn nhóm môn học</option>
              {listNhomMonHoc.map((item) => {
                return (
                  <option value={item.maNhommonhoc}>
                    {item.tenNhomMonHoc}
                  </option>
                )
              })}
            </Input>
            {errors && errors.maNhommonhoc && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng chọn nhóm môn thi
              </FormText>
            )}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="tenMon">
              Tên môn thi<span className={style.redColor}>(*)</span>
            </Label>
            <input
              id="tenMon"
              name="tenMon"
              className={`${classnames({
                "is-invalid": errors.tenMon,
              })} ${style.inputForm}`}
              {...register("tenMon", { required: true })}
              placeholder="VD: Toán"
            />
            {errors && errors.tenMon && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập tên môn
              </FormText>
            )}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="diemLiet">
              Điểm liệt<span className={style.redColor}>(*)</span>
            </Label>
            <input
              id="diemLiet"
              name="diemLiet"
              className={`${classnames({
                "is-invalid": errors.diemLiet,
              })} ${style.inputForm}`}
              {...register("diemLiet", { required: true })}
              placeholder="0"
            />
            {errors && errors.diemLiet && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập điểm liệt
              </FormText>
            )}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="ghiChu">
              Ghi chú
            </Label>
            <input
              id="ghiChu"
              name="ghiChu"
              className={`${classnames({
                "is-invalid": errors.ghiChu,
              })} ${style.inputForm}`}
              {...register("ghiChu", { required: false })}
              placeholder="Ghi chú"
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
