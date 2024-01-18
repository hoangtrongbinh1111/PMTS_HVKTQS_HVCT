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
import { taoNganhTuyenSinh } from "../../../../api/nganhTuyenSinh"
import classnames from "classnames"
import style from "../../../../assets/scss/index.module.scss"

const AddNewModal = ({ open, handleModal, fetchUser, listMonHoc, nhomMon }) => {
  // ** State
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
  const [tenNganh, setTen] = useState()
  const [kihieuNganh, setKiHieu] = useState()
  const [maMon, setMon] = useState({
    mon1: 0,
    mon2: 0,
    mon3: 0,
  })
  // ** Custom close btn
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModal} />
  )
  const _handleThemNTS = async () => {
    setLoading(true)
    const res = await taoNganhTuyenSinh({
      maMon1: maMon.mon1,
      maMon2: maMon.mon2,
      maMon3: maMon.mon3,
      tenNganh,
      kihieuNganh,
    })
    responseResultHelper(
      res,
      handleModal,
      fetchUser,
      ACTION_METHOD_TYPE.CREATED
    )
    setMon({
      mon1: 0,
      mon2: 0,
      mon3: 0,
    })
    setKiHieu()
    setTen()
    reset()
    setLoading(false)
  }
  const handleOnChange = (data, pop) => {
    setMon({ ...maMon, [pop]: data })
    clearErrors(pop)
    console.log(errors[pop])
  }
  return (
    <Modal isOpen={open} toggle={handleModal} contentClassName="pt-0" autoFocus={false}>
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Thêm mới ngành tuyển sinh</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(_handleThemNTS)}>
          <div className="mb-1">
            <Label className="form-label" for="tenNganh">
              Tên ngành<span className={style.redColor}>(*)</span>
            </Label>
            <input
              autoFocus
              id="tenNganh"
              name="tenNganh"
              className={`${classnames({
                "is-invalid": errors.tenNganh,
              })} ${style.inputForm}`}
              {...register("tenNganh", { required: true })}
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
              {...register("kihieuNganh", { required: true })}
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
