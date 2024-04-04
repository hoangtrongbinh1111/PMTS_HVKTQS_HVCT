// ** React Imports
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// ** Third Party Components
import { X } from "react-feather"
// import api
import { taoPhachDonTui, taoPhach } from "../../../../api/dontuidanhphach"
import { getThongTinDanhPhach, checkNhapDiem } from "../../../../api/baiThi"
import style from "../../../../assets/scss/index.module.scss"

// ** Reactstrap Imports
import {
  Modal,
  Input,
  Label,
  Button,
  ModalHeader,
  ModalBody,
  FormText,
  Form,
} from "reactstrap"
import responseResultHelper from "../../../utils/reponsive"
import { ACTION_METHOD_TYPE } from "../../../utils/constant"
import classnames from "classnames"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"

const AddNewModal = ({ open, handleModal, fetchCheckDanhPhach, getInfoDanhphach, checkdanhphach}) => {
  // ** State
  const [sophachBatdau, setSophachBatdau] = useState('')
  const [sobaiMotui, setSobaiMottui] = useState('')
  const [thongtindanhphach, setThongTinDanhPhach] = useState({soPhach:0, soBaiMotTui:0})
  const [checknhapdiem, setCheckNhapDiem] = useState({check:false})
  const MySwal = withReactContent(Swal)
  const [isTouch, setIsTouch] = useState({
    soPhach: false,
    soBai: false,
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
  const fetThongTinDanhPhach = async () => {
    getThongTinDanhPhach().then(res => {
        setThongTinDanhPhach(res.result)
    })
  }
  const fetCheckNhapDiem = async () => {
    checkNhapDiem().then(res => {
        setCheckNhapDiem(res.result)
    })
  }
  const _handleTaoPhachDonTui = async () => {
    MySwal.fire({
      title: 'Đang dồn túi đánh phách',
      allowEscapeKey: false,
      allowOutsideClick: false,

      didOpen: () => {
          Swal.showLoading()
      },
    })
    const res1 = checknhapdiem.check ? await taoPhach({sophachBatdau:thongtindanhphach.soPhach}) : await taoPhach({sophachBatdau})
    let res
    if (res1.status) {
      res = checknhapdiem.check ? await taoPhachDonTui({sobaiMotui:thongtindanhphach.soBaiMotTui}) : await taoPhachDonTui({sobaiMotui})
    }  
    responseResultHelper(
      res,
      handleModal,
      fetchCheckDanhPhach,
      ACTION_METHOD_TYPE.DONTUIDANHPHACH
    )
    getInfoDanhphach(true)
    setSophachBatdau('')
    setSobaiMottui('')
    setIsTouch({
      soPhach: false,
      soBai: false,
    })
  }
  useEffect(() => {
    fetCheckNhapDiem()
    fetThongTinDanhPhach()
    return () => {
      setSophachBatdau('')
      setSobaiMottui('')
    }
  }, [])
  return (
    <Modal isOpen={open} toggle={handleModal} contentClassName="pt-0">
      <ModalHeader className="mb-1" tag="div" close={CloseBtn}>
        <h5 className="modal-title">Dồn túi đánh phách</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(_handleTaoPhachDonTui)}>
          <div className="mb-1">
            <Label className="form-label" for="sophachBatdau">
              Số phách bắt đầu<span className={`${style.redColor}`}>(*)</span>
            </Label>
            <input
              id="sophachBatdau"
              type="number"
              name="sophachBatdau"
              className={`${classnames({
                "is-invalid": errors.sophachBatdau,
              })} ${style.inputForm}`}
              {...register("sophachBatdau", { required: true })}
              value={checknhapdiem.check ? thongtindanhphach.soPhach : sophachBatdau}
              onChange={(e) => {
                const inputValue = e.target.value
                e.preventDefault()
                if (inputValue === "") {
                  setError("sophachBatdau")
                } else {
                  clearErrors("sophachBatdau")
                }
                if (inputValue === '' || Number.isInteger(Number(inputValue))) {
                  setSophachBatdau(e.target.value)
                }
              }}
            />
            {errors && errors.sophachBatdau && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập số phách bắt đầu
              </FormText>
            )}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="sobaiMotui">
              Số bài thi trong một túi
              <span className={`${style.redColor}`}>(*)</span>
            </Label>
            <input
              id="sobaiMotui"
              type="number"
              name="sobaiMotui"
              className={`${classnames({
                "is-invalid": errors.sobaiMotui,
              })} ${style.inputForm}`}
              {...register("sobaiMotui", { required: true })}
              value={checknhapdiem.check ? thongtindanhphach.soBaiMotTui : sobaiMotui}
              onChange={(e) => {
                const inputValue = e.target.value
                if (inputValue === "") {
                  setError("sobaiMotui")
                } else {
                  clearErrors("sobaiMotui")
                }
                if (inputValue === '' || Number.isInteger(Number(inputValue))) {
                  setSobaiMottui(inputValue)
                }
              }}
            />
            {errors && errors.sobaiMotui && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập số bài thi trong một túi
              </FormText>
            )}
          </div>
          <Button className="me-1" color="primary" type="submit">
            Dồn túi đánh phách
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
