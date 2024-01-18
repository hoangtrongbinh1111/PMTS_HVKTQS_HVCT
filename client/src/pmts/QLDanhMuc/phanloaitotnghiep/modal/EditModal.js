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
import { suaPhanLoaiTotNghiep } from "../../../../api/phanloaiTotNghiep"
import style from "../../../../assets/scss/index.module.scss"
import classnames from "classnames"

const EditModal = ({ open, handleModal, fetchUser, infoEdit }) => {
  if (!infoEdit) return
  // ** State
  const [tenPhanloai, setTen] = useState()
  const [kiHieuPhanloai, setKihieu] = useState()
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
  const [loading, setLoading] = useState(false)
  // ** Custom close btn
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModal} />
  )
  const _handleSuaLHDT = async () => {
    setLoading(true)
    const res = await suaPhanLoaiTotNghiep({
      id: infoEdit.maPhanloai,
      tenPhanloai,
      kiHieuPhanloai,
      ghiChu,
    })
    responseResultHelper(res, handleModal, fetchUser, ACTION_METHOD_TYPE.UPDATE)
    setLoading(false)
  }
  useEffect(() => {
    setTen(infoEdit.tenPhanloai !== null ? infoEdit.tenPhanloai : "")
    setKihieu(infoEdit.kiHieuPhanloai !== null ? infoEdit.kiHieuPhanloai : "")
    setGhichu(infoEdit.ghiChu !== null ? infoEdit.ghiChu : "")
  }, [infoEdit])
  return (
    <Modal isOpen={open} toggle={handleModal} contentClassName="pt-0">
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Sửa phân loại tốt nghiệp</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(_handleSuaLHDT)}>
          <div className="mb-1">
            <Label className="form-label" for="tenPhanloai">
              Tên phân loại tốt nghiệp<span className={style.redColor}>(*)</span>
            </Label>
            <input
              id="tenPhanloai"
              name="tenPhanloai"
              className={`${classnames({
                "is-invalid": errors.tenPhanloai,
              })} ${style.inputForm}`}
              {...register("tenPhanloai", { required: tenPhanloai === "" })}
              value={tenPhanloai}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("tenPhanloai")
                } else {
                  clearErrors("tenPhanloai")
                }
                setTen(e.target.value)
              }}
              placeholder="VD: Giỏi"
            />
            {errors && errors.tenPhanloai && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập tên loại hình
              </FormText>
            )}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="kiHieuPhanloai">
              Kí hiệu<span className={style.redColor}>(*)</span>
            </Label>
            <input
              id="kiHieuPhanloai"
              name="kiHieuPhanloai"
              className={`${classnames({
                "is-invalid": errors.kiHieuPhanloai,
              })} ${style.inputForm}`}
              {...register("kiHieuPhanloai", { required: kiHieuPhanloai === "" })}
              value={kiHieuPhanloai}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("kiHieuPhanloai")
                } else {
                  clearErrors("kiHieuPhanloai")
                }
                setKihieu(e.target.value)
              }}
              placeholder="VD: G"
            />
            {errors && errors.kiHieuPhanloai && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập kí hiệu
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
