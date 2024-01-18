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
import responseResultHelper from "../../../utils/reponsive"
import { ACTION_METHOD_TYPE } from "../../../utils/constant"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { suaNganhDaiHoc } from "../../../../api/nganhDaiHoc"
import style from "../../../../assets/scss/index.module.scss"
import classnames from "classnames"

const EditModal = ({ open, handleModal, fetchUser, infoEdit }) => {
  if (!infoEdit) return
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
  const _handleSuaNDH = async () => {
    setLoading(true)
    const res = await suaNganhDaiHoc({
      id: infoEdit.maNganh,
      tenNganh,
      kihieuNganh,
      ghiChu,
    })
    responseResultHelper(res, handleModal, fetchUser, ACTION_METHOD_TYPE.UPDATE)
    setLoading(false)
  }
  useEffect(() => {
    setTen(infoEdit.tenNganh !== null ? infoEdit.tenNganh : "")
    setGhichu(infoEdit.ghiChu !== null ? infoEdit.ghiChu : "")
    setKiHieu(infoEdit.kihieuNganh !== null ? infoEdit.kihieuNganh : "")
  }, [infoEdit])
  return (
    <Modal isOpen={open} toggle={handleModal} contentClassName="pt-0">
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Sửa ngành đại học</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(_handleSuaNDH)}>
          <div className="mb-1">
            <Label className="form-label" for="tenNganh">
              Tên ngành<span className={style.redColor}>(*)</span>
            </Label>
            <input
              id="tenNganh"
              name="tenNganh"
              className={`${classnames({
                "is-invalid": errors.tenNganh,
              })} ${style.inputForm}`}
              {...register("tenNganh", { required: tenNganh === "" })}
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
              {...register("kihieuNganh", { required: kihieuNganh === "" })}
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
          { loading ? <div className='loader'></div> : 'Sửa'}
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

export default EditModal
