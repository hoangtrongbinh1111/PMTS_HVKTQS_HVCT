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
import { taoHinhThucUuTien } from "../../../../api/hinhThucUuTien"
import style from "../../../../assets/scss/index.module.scss"
import classnames from "classnames"

const AddNewModal = ({ open, handleModal, fetchUser }) => {
  // ** State
  const [tenHinhthuc, setTen] = useState("")
  const [kiHieuHinhthuc, setKihieu] = useState("")
  const [congM1, setCongM1] = useState(0)
  const [congM2, setCongM2] = useState(0)
  const [congM3, setCongM3] = useState(0)
  const [congM4, setCongM4] = useState(0)
  const [congM5, setCongM5] = useState(0)
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
  const _handleThemHTKL = async () => {
    setLoading(true)
    const res = await taoHinhThucUuTien({
      tenHinhthuc,
      kiHieuHinhthuc,
      congM1,
      congM2,
      congM3,
      congM4,
      congM5,
      ghiChu,
    })
    responseResultHelper(
      res,
      handleModal,
      fetchUser,
      ACTION_METHOD_TYPE.CREATED
    )
    reset()
    setGhichu("")
    setTen("")
    setCongM1(0)
    setCongM2(0)
    setCongM3(0)
    setCongM4(0)
    setCongM5(0)
    setKihieu("")
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
        <h5 className="modal-title">Thêm mới đối tượng ưu tiên</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(_handleThemHTKL)}>
          <div className="mb-1">
            <Label className="form-label" for="tenHinhthuc">
              Tên đối tượng ưu tiên<span className={style.redColor}>(*)</span>
            </Label>
            <input
              autoFocus
              id="tenHinhthuc"
              name="tenHinhthuc"
              className={`${classnames({
                "is-invalid": errors.tenHinhthuc,
              })} ${style.inputForm}`}
              {...register("tenHinhthuc", { required: true })}
              value={tenHinhthuc}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("tenHinhthuc")
                } else {
                  clearErrors("tenHinhthuc")
                }
                setTen(e.target.value)
              }}
              placeholder=""
            />
            {errors && errors.tenHinhthuc && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập tên đối tượng ưu tiên
              </FormText>
            )}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="tenHinhthuc">
              Kí hiệu<span className={style.redColor}>(*)</span>
            </Label>
            <input
              id="kiHieuHinhthuc"
              type="text"
              name="kiHieuHinhthuc"
              className={`${classnames({
                "is-invalid": errors.kiHieuHinhthuc,
              })} ${style.inputForm}`}
              {...register("kiHieuHinhthuc", { required: true })}
              value={kiHieuHinhthuc}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("kiHieuHinhthuc")
                } else {
                  clearErrors("kiHieuHinhthuc")
                }
                setKihieu(e.target.value)
              }}
            />
            {errors && errors.kiHieuHinhthuc && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập ký hiệu
              </FormText>
            )}
          </div>
          <div className="row">
            <div className="mb-1 col col-6">
              <Label className="form-label" for="congM1">
                Cộng mức 1<span className={style.redColor}>(*)</span>
              </Label>
              <input
                id="congM1"
                type="number"
                name="congM1"
                className={`${classnames({
                  "is-invalid": errors.congM1,
                })} ${style.inputForm}`}
                {...register("congM1", { required: true })}
                value={congM1}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setError("congM1")
                  } else {
                    clearErrors("congM1")
                  }
                  setCongM1(e.target.value <= 5 ? e.target.value : congM1)
                }}
              />
              {errors && errors.congM1 && (
                <FormText color="danger" className={style.formErr}>
                  Vui lòng nhập cộng mức 1
                </FormText>
              )}
            </div>
            <div className="mb-1 col col-6">
              <Label className="form-label" for="congM2">
                Cộng mức 2<span className={style.redColor}>(*)</span>
              </Label>
              <input
                id="congM2"
                type="number"
                name="congM2"
                className={`${classnames({
                  "is-invalid": errors.congM2,
                })} ${style.inputForm}`}
                {...register("congM2", { required: true })}
                value={congM2}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setError("congM2")
                  } else {
                    clearErrors("congM2")
                  }
                  setCongM2(e.target.value <= 5 ? e.target.value : congM2)
                }}
              />
              {errors && errors.congM2 && (
                <FormText color="danger" className={style.formErr}>
                  Vui lòng nhập cộng mức 2
                </FormText>
              )}
            </div>
          </div>
          <div className="row">
            <div className="mb-1 col col-6">
              <Label className="form-label" for="congM3">
                Cộng mức 3<span className={style.redColor}>(*)</span>
              </Label>
              <input
                id="congM3"
                type="number"
                name="congM3"
                className={`${classnames({
                  "is-invalid": errors.congM3,
                })} ${style.inputForm}`}
                {...register("congM3", { required: true })}
                value={congM3}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setError("congM3")
                  } else {
                    clearErrors("congM3")
                  }
                  setCongM3(e.target.value <= 5 ? e.target.value : congM3)
                }}
              />
              {errors && errors.congM3 && (
                <FormText color="danger" className={style.formErr}>
                  Vui lòng nhập cộng mức 3
                </FormText>
              )}
            </div>
            <div className="mb-1 col col-6">
              <Label className="form-label" for="congM4">
                Cộng mức 4<span className={style.redColor}>(*)</span>
              </Label>
              <input
                id="congM4"
                type="number"
                name="congM4"
                className={`${classnames({
                  "is-invalid": errors.congM4,
                })} ${style.inputForm}`}
                {...register("congM4", { required: true })}
                value={congM4}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setError("congM4")
                  } else {
                    clearErrors("congM4")
                  }
                  setCongM4(e.target.value <= 5 ? e.target.value : congM4)
                }}
              />
              {errors && errors.congM4 && (
                <FormText color="danger" className={style.formErr}>
                  Vui lòng nhập cộng mức 4
                </FormText>
              )}
            </div>
          </div>

          <div className="mb-1">
            <Label className="form-label" for="congM5">
              Cộng mức 5<span className={style.redColor}>(*)</span>
            </Label>
            <input
              id="congM5"
              type="number"
              name="congM5"
              className={`${classnames({
                "is-invalid": errors.congM5,
              })} ${style.inputForm}`}
              {...register("congM5", { required: true })}
              value={congM5}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("congM5")
                } else {
                  clearErrors("congM5")
                }
                setCongM5(e.target.value <= 5 ? e.target.value : congM5)
              }}
            />
            {errors && errors.congM5 && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập cộng mức 5
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
