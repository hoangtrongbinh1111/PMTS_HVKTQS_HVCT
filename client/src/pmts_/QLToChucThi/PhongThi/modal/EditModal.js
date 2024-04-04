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

import { suaChuyenNganh } from "../../../../api/chuyenNganh"
import { suaPhongThi } from "../../../../api/phongThi"
import style from "../../../../assets/scss/index.module.scss"
import classnames from "classnames"
const EditModal = ({
  open,
  handleModal,
  fetchUser,
  infoEdit,
  listDiaDiemThi,
}) => {
  if (!infoEdit) return
  const [loading, setLoading] = useState(false)
  // ** State
  const [tenPhong, setTen] = useState()
  const [maDidiem, setMadiadiem] = useState()
  const [ghiChu, setGhichu] = useState()
  const [soLuong, setSoLuong] = useState()
  const [giangDuongPhong, setGiangDuong] = useState()
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
  const _handleSuaPT = async () => {
    setLoading(true)
    const res = await suaPhongThi({
      id: infoEdit.maPhongthi,
      giangDuongPhong,
      tenPhong,
      maDidiem,
      soLuong,
      ghiChu,
    })
    responseResultHelper(res, handleModal, fetchUser, ACTION_METHOD_TYPE.UPDATE)
    setLoading(false)
  }
  useEffect(() => {
    setTen(infoEdit.tenPhong)
    setMadiadiem(infoEdit.maDidiem)
    setGiangDuong(infoEdit.giangDuongPhong)
    setSoLuong(infoEdit.soLuong)
    setGhichu(infoEdit.ghiChu)
  }, [infoEdit])
  return (
    <Modal isOpen={open} toggle={handleModal} contentClassName="pt-0">
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Sửa phòng thi</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(_handleSuaPT)}>
          <div className="mb-1">
            <Label className="form-label" for="tenPhong">
              Tên phòng thi<span className={style.redColor}>(*)</span>
            </Label>
            <input
              id="tenPhong"
              name="tenPhong"
              className={`${classnames({
                "is-invalid": errors.tenPhong,
              })} ${style.inputForm}`}
              {...register("tenPhong", { required: tenPhong === "" })}
              value={tenPhong}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("tenPhong")
                } else {
                  clearErrors("tenPhong")
                }
                setTen(e.target.value)
              }}
            />
            {errors && errors.tenPhong && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập tên phòng thi
              </FormText>
            )}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="giangDuongPhong">
              Giảng đường<span className={style.redColor}>(*)</span>
            </Label>
            <input
              id="giangDuongPhong"
              name="giangDuongPhong"
              className={`${classnames({
                "is-invalid": errors.giangDuongPhong,
              })} ${style.inputForm}`}
              {...register("giangDuongPhong", { required: giangDuongPhong === "" })}
              value={giangDuongPhong}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("giangDuongPhong")
                } else {
                  clearErrors("giangDuongPhong")
                }
                setGiangDuong(e.target.value)
              }}
            />
            {errors && errors.giangDuongPhong && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập giảng đường
              </FormText>
            )}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="maDidiem">
              Nơi thi<span className={style.redColor}>(*)</span>
            </Label>
            <Input
              id="maDidiem"
              type="select"
              value={maDidiem}
              {...register("maDidiem", { required: maDidiem === "" })}
              className={`${classnames({
                "is-invalid": errors["maDidiem"],
              })} ${style.inputForm}`}
              onChange={(e) => {
                setValue("maDidiem", e.target.value)
                if (e.target.value) {
                  clearErrors("maDidiem")
                  setMadiadiem(e.target.value)
                }
              }}
            >
              <option>Chọn nơi thi</option>
              {listDiaDiemThi.map((item) => {
                return <option value={item.maDidiem}>{item.tenDiadiem}</option>
              })}
            </Input>
          </div>
          <div className="mb-1">
            <Label className="form-label" for="soLuong">
              Số lượng<span className={style.redColor}>(*)</span>
            </Label>
            <input
              id="soLuong"
              name="soLuong"
              type="number"
              className={`${classnames({
                "is-invalid": errors.soLuong,
              })} ${style.inputForm}`}
              {...register("soLuong", { required: soLuong === 0 })}
              value={soLuong}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("soLuong")
                } else {
                  clearErrors("soLuong")
                }
                setSoLuong(e.target.value)
              }}
            />
            {errors && errors.soLuong && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập số lượng
              </FormText>
            )}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="ghiChu">
              Ghi Chú
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
          <Button color="secondary" onClick={handleModal} outline>
            Hủy
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default EditModal
