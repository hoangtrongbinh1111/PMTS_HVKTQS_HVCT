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
import classnames from "classnames"

import { suaMonThi } from "../../../../api/monThi"
import style from "../../../../assets/scss/index.module.scss"

const EditModal = ({
  open,
  handleModal,
  fetchUser,
  infoEdit,
  listNhomMonHoc,
}) => {
  if (!infoEdit) return
  const [loading, setLoading] = useState(false)
  // ** State
  const [tenMon, setTen] = useState(null)
  const [diemLiet, setDiemLiet] = useState(null)
  const [maNhommonhoc, setManhommonhoc] = useState(null)
  const [ghiChu, setGhichu] = useState(null)
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
    <X className="cursor-pointer" size={15} onClick={(e) => handleModal({})} />
  )
  const _handleSuaDCTCT = async (data) => {
    setLoading(true)
    const dataSubmit = {
      id: infoEdit.maMon,
      tenMon: data.tenMon,
      diemLiet: data.diemLiet,
      maNhommonhoc: data.maNhommonhoc,
      ghiChu: data.ghiChu,
    }
    const res = await suaMonThi({
      id: infoEdit.maMon,
      tenMon,
      diemLiet,
      maNhommonhoc,
      ghiChu,
    })
    responseResultHelper(res, handleModal, fetchUser, ACTION_METHOD_TYPE.UPDATE)
    setLoading(false)
  }
  useEffect(() => {
    setTen(infoEdit.tenMon !== null ? infoEdit.tenMon : "")
    setGhichu(infoEdit.ghiChu !== null ? infoEdit.ghiChu : "")
    setManhommonhoc(infoEdit.maNhommonhoc !== null ? infoEdit.maNhommonhoc : "")
    setDiemLiet(infoEdit.diemLiet !== null ? infoEdit.diemLiet : "")
  }, [infoEdit])
  return (
    <Modal isOpen={open} toggle={handleModal} contentClassName="pt-0">
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Sửa môn thi</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(_handleSuaDCTCT)}>
          <div className="mb-1">
            <Label className="form-label" for="maNhommonhoc">
              Nhóm môn thi<span className={style.redColor}>(*)</span>
            </Label>
            <Input
              id="maNhommonhoc"
              type="select"
              value={maNhommonhoc}
              {...register("maNhommonhoc", { required: false })}
              className={`${classnames({
                "is-invalid": errors["maNhommonhoc"],
              })} ${style.inputForm}`}
              onChange={(e) => {
                setManhommonhoc(e.target.value)
                if (e.target.value) {
                  clearErrors("maNhommonhoc")
                }
              }}
            >
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
              value={tenMon}
              className={`${classnames({
                "is-invalid": errors.tenMon,
              })} ${style.inputForm}`}
              {...register("tenMon", { required: tenMon === "" })}
              onChange={(e) => {
                if (e.target.value === '') {
                  setError("tenMon")
                } else {
                  clearErrors("tenMon")
                }
                setTen(e.target.value)
              }}
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
              {...register("diemLiet", { required: diemLiet === "" })}
              value={diemLiet}
              onChange={(e) => {
                if (e.target.value === '') {
                  setError("diemLiet")
                } else {
                  clearErrors("diemLiet")
                }
                setDiemLiet(e.target.value)
              }}
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
              value={ghiChu}
              onChange={(e) => setGhichu(e.target.value)}
            />
          </div>
          <Button className="me-1" color="primary" type="submit">
          { loading ? <div className='loader'></div> : 'Sửa'}

          </Button>
          <Button color="secondary" onClick={() => {
            handleModal()
            reset()
          }} outline>
            Hủy
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default EditModal
