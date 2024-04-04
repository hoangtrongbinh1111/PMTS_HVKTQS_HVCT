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

import responseResultHelper from "../../../utils/reponsive"
import { ACTION_METHOD_TYPE } from "../../../utils/constant"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import style from "../../../../assets/scss/index.module.scss"
import classnames from "classnames"

import { suaNganhTuyenSinh } from "../../../../api/nganhTuyenSinh"

const EditModal = ({
  open,
  handleModal,
  fetchUser,
  infoEdit,
  listMonHoc,
  nhomMon,
}) => {
  if (!infoEdit) return
  // ** State
  const [loading, setLoading] = useState(false)
  const [tenNganh, setTen] = useState()
  const [kihieuNganh, setKiHieu] = useState()
  const [ghiChu, setGhiChu] = useState()
  const [maMon, setMon] = useState({
    mon1: 0,
    mon2: 0,
    mon3: 0,
  })
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
    const res = await suaNganhTuyenSinh({
      id: infoEdit.maNganhTS,
      maMon1: maMon.mon1,
      maMon2: maMon.mon2,
      maMon3: maMon.mon3,
      tenNganh,
      kihieuNganh,
      ghiChu
    })
    responseResultHelper(res, handleModal, fetchUser, ACTION_METHOD_TYPE.UPDATE)
    setLoading(false)
  }
  const handleOnChange = (data, pop) => {
    setMon({ ...maMon, [pop]: data })
  }
  useEffect(() => {
    setMon({
      mon1: infoEdit.maMon1,
      mon2: infoEdit.maMon2,
      mon3: infoEdit.maMon3,
    })
    setTen(infoEdit.tenNganh !== null ? infoEdit.tenNganh : "")
    setKiHieu(infoEdit.kihieuNganh !== null ? infoEdit.kihieuNganh : "")
    setGhiChu(infoEdit.ghiChu !== null ? infoEdit.ghiChu : "")
  }, [infoEdit])
  return (
    <Modal isOpen={open} toggle={handleModal} contentClassName="pt-0">
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Sửa ngành tuyển sinh</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(_handleSuaDCTCT)}>
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
                if (e.target.value === '') {
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
            <Label className="form-label" for="tenNganh">
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
                if (e.target.value === '') {
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
          {nhomMon?.map((e, index) => {
            return (
              <div className="mb-1">
                <Label className="form-label" for="maMon1">
                  Môn {e.tenNhomMonHoc}<span className={style.redColor}>(*)</span>
                </Label>
                <Input
                  id={`mon${index + 1}`}
                  value={maMon[`mon${index + 1}`]}
                  type="select"
                  {...register(`mon${index + 1}`, { required: maMon[`mon${index + 1}`] === 0 })}
                  className={`${classnames({
                    "is-invalid": errors[`mon${index + 1}`],
                  })} ${style.inputForm}`}
                  onChange={(e) => {
                    handleOnChange(e.target.value, `mon${index + 1}`)
                  }
                  }>
                  <option>Chọn môn thi {e.tenNhomMonHoc}</option>
                  {listMonHoc.map((item) => {
                    if (item.maNhommonhoc === e.maNhommonhoc) {
                      return <option value={item.maMon}>{item.tenMon}</option>
                    }
                  })}
                </Input>
                {errors && errors[`mon${index + 1}`] && (<FormText color="danger" className={style.formErr}>
                  Vui lòng chọn môn {e.tenNhomMonHoc}
                </FormText>
                )}
              </div>
            )
          })}
           <div className="mb-1">
            <Label className="form-label" for="ghiChu">
              Ghi chú<span className={style.redColor}>(*)</span>
            </Label>
            <input
              id="ghiChu"
              name="ghiChu"
              className={`${classnames({
                "is-invalid": errors.ghiChu,
              })} ${style.inputForm}`}
              {...register("ghiChu", { required: ghiChu === "" })}
              value={ghiChu}
              onChange={(e) => {
                if (e.target.value === '') {
                  setError("ghiChu")
                } else {
                  clearErrors("ghiChu")
                }
                setGhiChu(e.target.value)
              }}
              placeholder="VD: CNTT"
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
