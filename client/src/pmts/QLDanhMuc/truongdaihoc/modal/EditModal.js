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
  FormText
} from "reactstrap"
import { suaTruongDaiHoc } from "../../../../api/truongDaiHoc"
import responseResultHelper from "../../../utils/reponsive"
import { ACTION_METHOD_TYPE } from "../../../utils/constant"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import style from "../../../../assets/scss/index.module.scss"
import classnames from "classnames"

const EditModal = ({ open, handleModal, fetchUser, infoEdit }) => {
  if (!infoEdit) return
  const [loading, setLoading] = useState(false)
  // ** State
  const [tenTruong, setTen] = useState()
  const [ghiChu, setGhichu] = useState()
  const [kiHieuTruong, setKiHieu] = useState()
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
  const _handleSuaTDH = async () => {
    setLoading(true)
    const res = await suaTruongDaiHoc({
      id: infoEdit.maTruong,
      tenTruong,
      kiHieuTruong,
      ghiChu,
    })
    responseResultHelper(res, handleModal, fetchUser, ACTION_METHOD_TYPE.UPDATE)
    setLoading(false)
  }
  useEffect(() => {
    setTen(infoEdit.tenTruong !== null ? infoEdit.tenTruong : "")
    setGhichu(infoEdit.ghiChu !== null ? infoEdit.ghiChu : "")
    setKiHieu(infoEdit.kiHieuTruong !== null ? infoEdit.kiHieuTruong : "")
  }, [infoEdit])
  return (
    <Modal isOpen={open} toggle={handleModal} contentClassName="pt-0">
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Sửa trường đại học</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(_handleSuaTDH)}>
          <div className="mb-1">
            <Label className="form-label" for="tenTruong">
              Tên trường<span className={style.redColor}>(*)</span>
            </Label>
            <input
              id="tenTruong"
              name="tenTruong"
              className={`${classnames({
                "is-invalid": errors.tenTruong,
              })} ${style.inputForm}`}
              {...register("tenTruong", { required: tenTruong === "" })}
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
              {...register("kiHieuTruong", { required: kiHieuTruong === "" })}
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
            <Label className="form-label" for="post">
              Ghi chú
            </Label>
            <Input
              id="post"
              value={ghiChu}
              onChange={(e) => setGhichu(e.target.value)}
            />
          </div>
          <Button className="me-1" color="primary" type="submit">
          { loading ? <div className='loader'></div> : 'Sửa'}
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
