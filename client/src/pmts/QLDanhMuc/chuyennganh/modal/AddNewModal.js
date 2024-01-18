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
import { taoChuyenNganh } from "../../../../api/chuyenNganh"
import style from "../../../../assets/scss/index.module.scss"
import classnames from "classnames"

const AddNewModal = ({ open, handleModal, fetchUser, listNganhTuyenSinh }) => {
  // ** State
  const [tenChuyennganh, setTen] = useState()
  const [kiHieuChuyennganh, setKihieu] = useState()
  const [maNganhTS, setManganhts] = useState(null)
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
  const _handleThemMT = async () => {
    setLoading(true)
    const res = await taoChuyenNganh({
      tenChuyennganh,
      kiHieuChuyennganh,
      maNganhTS,
      ghiChu,
    })
    responseResultHelper(
      res,
      handleModal,
      fetchUser,
      ACTION_METHOD_TYPE.CREATED
    )
    setTen()
    setGhichu()
    setManganhts()
    setKihieu()
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
        <h5 className="modal-title">Thêm mới chuyên ngành</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(_handleThemMT)}>
          <div className="mb-1">
            <Label className="form-label" for="tenChuyennganh">
              Tên chuyên ngành<span className={style.redColor}>(*)</span>
            </Label>
            <input
              autoFocus
              id="tenChuyennganh"
              name="tenChuyennganh"
              className={`${classnames({
                "is-invalid": errors.tenChuyennganh,
              })} ${style.inputForm}`}
              {...register("tenChuyennganh", { required: true })}
              value={tenChuyennganh}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("tenChuyennganh")
                } else {
                  clearErrors("tenChuyennganh")
                }
                setTen(e.target.value)
              }}
              placeholder="VD: Công nghệ thông tin"
            />
            {errors && errors.tenChuyennganh && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập tên chuyên ngành
              </FormText>
            )}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="tenChuyennganh">
              Kí hiệu<span className={style.redColor}>(*)</span>
            </Label>
            <input
              id="kiHieuChuyennganh"
              name="kiHieuChuyennganh"
              className={`${classnames({
                "is-invalid": errors.kiHieuChuyennganh,
              })} ${style.inputForm}`}
              {...register("kiHieuChuyennganh", { required: true })}
              value={kiHieuChuyennganh}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("kiHieuChuyennganh")
                } else {
                  clearErrors("kiHieuChuyennganh")
                }
                setKihieu(e.target.value)
              }}
              placeholder="VD: CNTT"
            />
            {errors && errors.kiHieuChuyennganh && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập kí hiệu chuyên ngành
              </FormText>
            )}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="maNganhTS">
              Ngành tuyển sinh<span className={style.redColor}>(*)</span>
            </Label>
            <Input
              id="maNganhTS"
              type="select"
              value={maNganhTS}
              {...register("maNganhTS", {
                required: maNganhTS === null,
              })}
              className={`${classnames({
                "is-invalid": errors["maNganhTS"],
              })} ${style.inputForm}`}
              onChange={(e) => {
                setManganhts(e.target.value)
                clearErrors("maNganhTS")
              }}
            >
              <option>Chọn ngành tuyển sinh</option>
              {listNganhTuyenSinh.map((item) => {
                return <option value={item.maNganhTS}>{item.tenNganh}</option>
              })}
            </Input>
            {errors && errors["maNganhTS"] && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng chọn ngành tuyển sinh
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
