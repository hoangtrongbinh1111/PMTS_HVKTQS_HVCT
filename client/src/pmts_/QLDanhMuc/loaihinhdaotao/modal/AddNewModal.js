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
import { taoLoaiHinhDaoTao } from "../../../../api/loaiHinhDaoTao"
import style from "../../../../assets/scss/index.module.scss"
import classnames from "classnames"

const AddNewModal = ({ open, handleModal, fetchUser }) => {
  const [loading, setLoading] = useState(false)
  // ** State
  const [tenLoaiHinh, setTen] = useState()
  const [ghiChu, setGhichu] = useState()
  const [kiHieuLoaihinh, setKihieu] = useState()
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
  const _handleThemLHDT = async () => {
    setLoading(true)
    const res = await taoLoaiHinhDaoTao({
      tenLoaiHinh,
      kiHieuLoaihinh,
      ghiChu,
    })
    responseResultHelper(
      res,
      handleModal,
      fetchUser,
      ACTION_METHOD_TYPE.CREATED
    )
    setLoading(false)
    setGhichu()
    setTen()
    setKihieu()
    reset()
  }
  return (
    <Modal isOpen={open} toggle={handleModal} contentClassName="pt-0" autoFocus={false}>
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Thêm mới loại hình đào tạo đại học</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(_handleThemLHDT)}>
          <div className="mb-1">
            <Label className="form-label" for="tenLoaiHinh">
              Tên loại hình đào tạo<span className={style.redColor}>(*)</span>
            </Label>
            <input
              autoFocus
              id="tenLoaiHinh"
              name="tenLoaiHinh"
              className={`${classnames({
                "is-invalid": errors.tenLoaiHinh,
              })} ${style.inputForm}`}
              {...register("tenLoaiHinh", { required: true })}
              value={tenLoaiHinh}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("tenLoaiHinh")
                } else {
                  clearErrors("tenLoaiHinh")
                }
                setTen(e.target.value)
              }}
              placeholder="VD: Đại học"
            />
            {errors && errors.tenLoaiHinh && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập tên loại hình
              </FormText>
            )}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="tenLoaiHinh">
              Kí hiệu<span className={style.redColor}>(*)</span>
            </Label>
            <input
              id="kiHieuLoaihinh"
              name="kiHieuLoaihinh"
              className={`${classnames({
                "is-invalid": errors.kiHieuLoaihinh,
              })} ${style.inputForm}`}
              {...register("kiHieuLoaihinh", { required: true })}
              value={kiHieuLoaihinh}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("kiHieuLoaihinh")
                } else {
                  clearErrors("kiHieuLoaihinh")
                }
                setKihieu(e.target.value)
              }}
              placeholder="VD: ĐH"
            />
            {errors && errors.kiHieuLoaihinh && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập kí hiệu 
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

export default AddNewModal
