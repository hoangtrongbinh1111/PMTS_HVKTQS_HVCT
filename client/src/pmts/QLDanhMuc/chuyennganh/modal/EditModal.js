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
import style from "../../../../assets/scss/index.module.scss"
import classnames from "classnames"

const EditModal = ({
  open,
  handleModal,
  fetchUser,
  infoEdit,
  listNganhTuyenSinh,
}) => {
  if (!infoEdit) return
  const [loading, setLoading] = useState(false)
  // ** State
  const [tenChuyennganh, setTen] = useState()
  const [maNganhTS, setManganhts] = useState()
  const [kiHieuChuyennganh, setKihieu] = useState()
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
  const _handleSuaDCTCT = async () => {
    setLoading(true)
    const res = await suaChuyenNganh({
      id: infoEdit.maChuyennganhTS,
      body: {
        tenChuyennganh,
        kiHieuChuyennganh,
        maNganhTS,
        ghiChu,
      },
    })
    responseResultHelper(res, handleModal, fetchUser, ACTION_METHOD_TYPE.UPDATE)
    setLoading(false)
  }
  useEffect(() => {
    setTen(infoEdit.tenChuyennganh !== null ? infoEdit.tenChuyennganh : "")
    setManganhts(infoEdit.maNganhTS)
    setKihieu(
      infoEdit.kiHieuChuyennganh !== null ? infoEdit.kiHieuChuyennganh : ""
    )
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
        <h5 className="modal-title">Sửa chuyên ngành tuyển sinh</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(_handleSuaDCTCT)}>
          <div className="mb-1">
            <Label className="form-label" for="tenChuyennganh ">
              Tên chuyên ngành tuyển sinh<span className={style.redColor}>(*)</span>
            </Label>
            <input
              id="tenChuyennganh"
              name="tenChuyennganh"
              className={`${classnames({
                "is-invalid": errors.tenChuyennganh,
              })} ${style.inputForm}`}
              {...register("tenChuyennganh", { required: tenChuyennganh === "" })}
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
              {...register("kiHieuChuyennganh", { required: kiHieuChuyennganh === "" })}
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
              onChange={(e) => setManganhts(e.target.value)}
            >
              {listNganhTuyenSinh.map((item) => {
                return <option value={item.maNganhTS}>{item.tenNganh}</option>
              })}
            </Input>
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
