// ** React Imports
import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"

// ** Third Party Components
import { X } from "react-feather"

// ** Reactstrap Imports
import {
  Modal,
  ModalFooter,
  Input,
  Label,
  Button,
  ModalHeader,
  ModalBody,
  Form,
  FormText
} from "reactstrap"
import classnames from "classnames"
import { createDotTuyenSinh } from "../../../../api/DotTuyenSinh"
import responseResultHelper from "../../../utils/reponsive"
import { ACTION_METHOD_TYPE, LOAI_TUYEN_SINH } from "../../../utils/constant"
// ** Styles
import Flatpickr from "react-flatpickr"
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect"
import { Vietnamese } from "flatpickr/dist/l10n/vn.js"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "flatpickr/dist/plugins/monthSelect/style.css"
import style from "../../../../assets/scss/index.module.scss"
import { toDateString } from "../../../../utility/Utils"

const AddNewModal = ({ open, handleModal, fetchDotTuyenSinh }) => {  
  const today_arr = toDateString(new Date()).split("/")
  // ** State
  const [loading, setLoading] = useState(false)
  const [loaiTs, setLoaiTs] = useState("Thạc sỹ")
  const [tgianTS_, setTGianTS] = useState(`${today_arr[1]}-${today_arr[2]}`)
  const [isSubmit, setIsSubmit] = useState(false)
  const [selectedDTS, setSelectedDTS] = useState()

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
    formState: { errors },
  } = useForm()
  const addNewDTS = async (data) => {
    setLoading(true)
    setIsSubmit(true)
    if (loaiTs !== null) {
      setLoading(true)
      const datasubmit = {
        tenDotTS: data.tenDotTS,
        tgianTS: tgianTS_,
        loaiTS: loaiTs,
        ghiChu: data.ghiChu,
      }
      const res = await createDotTuyenSinh(datasubmit)
      responseResultHelper(
        res,
        handleModal,
        fetchDotTuyenSinh,
        ACTION_METHOD_TYPE.CREATED
      )
      localStorage.setItem('dbName', res?.result)
      reset()
      setLoading(false)
      setIsSubmit(false)
    }
  }
  return (
    <Modal isOpen={open} contentClassName="pt-0" autoFocus={false}>
      <ModalHeader
        className="mb-1"
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Thêm mới đợt tuyển sinh</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(addNewDTS)}>
          <div className="row">
            <div className={style.cusFormGroup}>
              <Label for="tenDotTS" className={style.labelFormSm}>
                Tên đợt tuyển sinh<span className={style.redColor}>(*)</span>
              </Label>
              <input
                autoFocus
                id="tenDotTS"
                name="tenDotTS"
                type="text"
                className={`${classnames({
                  "is-invalid": errors.tenDotTS,
                })} ${style.inputForm}`}
                {...register("tenDotTS", { required: true })}
                placeholder="Tên đợt tuyển sinh"
              />
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
                  defaultDate: new Date(),
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
                    setTGianTS(`${time_str_arr[1]}-${time_str_arr[2]}`)
                  }
                }}
              />
              {/* {errors && errors.tgianTS === "" && (
                  <FormText color="danger" className={style.formErr}>
                    Vui lòng nhập thời gian tuyển sinh
                  </FormText>
                )} */}
            </div>
            <div className="col col-6">
              <Label for="loaiTS" className={style.labelFormSm}>
                Loại tuyển sinh<span className={style.redColor}>(*)</span>
              </Label>
              <Input
                type="select"
                name="loaiTs"
                id="loaiTs"
                value={loaiTs}
                onChange={(e) => {
                  setLoaiTs(e.target.value)
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
              <input
                type="textarea"
                id="ghiChu"
                name="ghiChu"
                className={`${classnames({
                  "is-invalid": errors["ghiChu"],
                })} ${style.inputForm}`}
                {...register("ghiChu", { required: false })}
                placeholder="Mô tả"
              />
            </div>
          </div>
          <ModalFooter style={{ justifyContent: "flex-start", padding: "0" }}>
            <div className="d-flex justify-content-center mb-0">
              <Button.Ripple color="primary" type="submit">
                {loading ? <div className='loader'></div> : "Thêm mới"}
              </Button.Ripple>
              <Button.Ripple
                outline
                className="mr-1"
                color="secondary"
                type="button"
                onClick={() => handleModal()}
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

export default AddNewModal
