// ** React Imports
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"

// ** Third Party Components
import { X } from "react-feather"

// ** Reactstrap Imports
import style from "../../../../assets/scss/index.module.scss"
import classnames from "classnames"

import {
  Modal,
  ModalFooter,
  Form,
  Input,
  Label,
  Button,
  ModalHeader,
  ModalBody,
  FormText,
} from "reactstrap"
import { updateDotTuyenSinh } from "../../../../api/DotTuyenSinh"
import responseResultHelper from "../../../utils/reponsive"
import { ACTION_METHOD_TYPE, LOAI_TUYEN_SINH } from "../../../utils/constant"
import Flatpickr from "react-flatpickr"
import { Vietnamese } from "flatpickr/dist/l10n/vn.js"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "flatpickr/dist/plugins/monthSelect/style.css"
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect"

import { toDateString, convertToUTCTime } from "../../../../utility/Utils"

const EditModal = ({ open, handleModal, fetchDotTuyenSinh, infoEdit }) => {
  if (!infoEdit) return
  // ** State
  const [tenDotTS, setTenDotTS] = useState(infoEdit.tenDotTS)
  const [tgianTS, setTgianTS] = useState(infoEdit.tgianTS)
  const [loaiTS, setLoaiTS] = useState(infoEdit.loaiTS)
  const [ghiChu, setGhiChu] = useState(infoEdit.ghiChu)
  const [loading, setLoading] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  useEffect(() => {
    setTenDotTS(infoEdit.tenDotTS !== null ? infoEdit.tenDotTS : "")
    setTgianTS(infoEdit.tgianTS !== null ? infoEdit.tgianTS : "")
    setLoaiTS(infoEdit.loaiTS !== null ? infoEdit.loaiTS : "")
    setGhiChu(infoEdit.ghiChu !== null ? infoEdit.ghiChu : "")
  }, [infoEdit])
  // ** Custom close btn
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModal} />
  )

  const {
    control,
    register,
    setError,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm()
  const _handleSuaDTS = async (data) => {
    setLoading(true)
    const res = await updateDotTuyenSinh({
      id: infoEdit.maDotTS,
      tenDotTS,
      tgianTS,
      loaiTS,
      ghiChu,
      ghiChu,
    })
    responseResultHelper(
      res,
      handleModal,
      fetchDotTuyenSinh,
      ACTION_METHOD_TYPE.UPDATE
    )
    responseResultHelper(
      res,
      handleModal,
      fetchDotTuyenSinh,
      ACTION_METHOD_TYPE.UPDATE
    )
    setLoading(false)
  }
  return (
    <Modal isOpen={open} toggle={handleModal} contentClassName="pt-0">
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Sửa thông tin đợt tuyển sinh</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(_handleSuaDTS)}>
          <div className="row">
            <div className={style.cusFormGroup}>
              <Label for="tenDotTS" className={style.labelFormSm}>
                Tên đợt tuyển sinh<span className={style.redColor}>(*)</span>
              </Label>
              <input
                id="tenDotTS"
                name="tenDotTS"
                className={`${classnames({
                  "is-invalid": errors.tenDotTS,
                })} ${style.inputForm}`}
                {...register("tenDotTS", {
                  required: tenDotTS === "",
                })}
                value={tenDotTS}
                onChange={(e) => {
                  console.log(tenDotTS)
                  if (e.target.value === "") {
                    setError("tenDotTS")
                  } else {
                    clearErrors("tenDotTS")
                  }
                  setTenDotTS(e.target.value)
                }}
                placeholder="Tên đợt tuyển sinh"
              />
              {/* <input
                autoFocus
                id="tenDotTS"
                name="tenDotTS"
                type="text"
                value={tenDotTS}
                onChange={(e) => {
                  setTenDotTS(e.target.value)
                }}
                className={`${classnames({
                  "is-invalid": errors.tenDotTS,
                })} ${style.inputForm}`}
                {...register("tenDotTS", { required: tenDotTS === "" })}
                placeholder="Tên đợt tuyển sinh"
              /> */}
              {errors && errors.tenDotTS && (
                <FormText color="danger" className={style.formErr}>
                  Vui lòng nhập tên đợt tuyển sinh
                </FormText>
              )}
            </div>
          </div>
          <div className={`row ${style.cusFormGroup}`}>
            <div className="col col-6">
              <Label for="tgianTS" className={style.labelFormSm}>
                Thời gian tuyển sinh
                <span className={style.redColor}>(*)</span>
              </Label>
              <Flatpickr
                id="default-picker"
                className={`${style.inputForm}`}
                options={{
                  // dateFormat: 'd/m/y',
                  defaultDate: `${tgianTS ? convertToUTCTime(`15-${tgianTS}`) : new Date()
                    }`,
                  locale: {
                    ...Vietnamese,
                  },
                  plugins: [
                    new monthSelectPlugin({
                      shorthand: true, //defaults to false
                      dateFormat: "F Y", //defaults to "F Y"
                      // altFormat: "F Y", //defaults to "F Y"
                      theme: "light", // defaults to "light"
                    }),
                  ],
                }}
                onChange={(e) => {
                  if (e.length !== 0) {
                    const time_str = toDateString(e[0])
                    const time_str_arr = time_str.split("/")
                    setTgianTS(`${time_str_arr[1]}-${time_str_arr[2]}`)
                  }
                }}
              />
            </div>
            <div className="col col-6">
              <Label for="loaiTS" className={style.labelFormSm}>
                Loại tuyển sinh<span className={style.redColor}>(*)</span>
              </Label>
              <Input
                type="select"
                name="loaiTs"
                id="loaiTs"
                value={loaiTS}
                onChange={(e) => {
                  setLoaiTS(e.target.value)
                }}
              >
                <option>Chọn loại tuyển sinh</option>
                {LOAI_TUYEN_SINH.map((role, index) => (
                  <option key={index} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </Input>
              {isSubmit && loaiTs === null && (
                <FormText color="danger" className={style.formErr}>
                  Vui lòng chọn loại tuyển sinh
                </FormText>
              )}
            </div>
          </div>

          <div className="row">
            <div className={style.cusFormGroup}>
              <Label htmlFor="ghiChu" className={style.labelFormSm}>
                Mô tả
              </Label>
              <Input
                id="ghiChu"
                value={ghiChu}
                onChange={(e) => setGhiChu(e.target.value)}
                placeholder="Mô tả"
              />
            </div>
          </div>
          <ModalFooter style={{ justifyContent: "flex-start", padding: "0" }}>
            <div className="d-flex justify-content-center mb-0">
              <Button.Ripple color="primary" type="submit">
                {loading ? <div className='loader'></div> : "Chỉnh sửa"}
              </Button.Ripple>
              <Button.Ripple
                outline
                className="mr-1"
                color="secondary"
                type="button"
                onClick={() => {
                  reset()
                  handleModal()
                }}
                style={{ marginLeft: "1rem" }}
              >
                Hủy
              </Button.Ripple>
            </div>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  )
}
export default EditModal
