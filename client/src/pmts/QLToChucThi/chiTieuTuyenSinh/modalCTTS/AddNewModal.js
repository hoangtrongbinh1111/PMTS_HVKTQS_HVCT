// ** React Imports
import { useEffect, useState } from "react"

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
  FormGroup,
  FormText,
  ModalFooter,
} from "reactstrap"
import { createUser } from "../../../../api/user"
import responseResultHelper from "../../../utils/reponsive"
import { ACTION_METHOD_TYPE } from "../../../utils/constant"
import classnames from "classnames"
import { Vietnamese } from "flatpickr/dist/l10n/vn.js"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { useForm } from "react-hook-form"
import style from "../../../../assets/scss/index.module.scss"
import { toDateString } from "../../../../utility/Utils"
import {
  getListDCNot,
  updateCT,
  createNewCT,
} from "../../../../api/chiTieuTuyenSinh"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const AddNewModal = ({
  open,
  handleModal,
  fetchDataDetail,
  fetchData,
  listChuyennganh,
  data,
  listDC,
}) => {
  const MySwal = withReactContent(Swal)

  // ** State
  const [loading, setLoading] = useState(false)
  const [selectedDC, setSelectedDC] = useState()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm()
  useEffect(() => {}, [])
  // ** Custom close btn
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModal} />
  )

  const _handleThemNND = async (data_) => {
    const dataSubmit = {
      ...data_,
      maChuyennganhTS: data?.maChuyennganhTS,
      maDcdaotao: selectedDC ? selectedDC : listDC[0].maDcdaotao,
    }
    setLoading(true)
    createNewCT(dataSubmit)
      .then((res) => {
        const MySwal = withReactContent(Swal)
        if (res.status) {
          MySwal.fire({
            icon: "success",
            title: "Thêm mới chỉ tiêu tuyển sinh thành công!",
            customClass: {
              confirmButton: "btn btn-success",
            },
          })
          handleModal(false)
          fetchDataDetail()
          fetchData()
        } else {
          MySwal.fire({
            icon: "error",
            title: "Có lỗi xảy ra",
            text: "Vui lòng thử lại",
            customClass: {
              confirmButton: "btn btn-danger",
            },
          })
        }
      })
      .catch((err) => {
        MySwal.fire({
          icon: "error",
          title: "Có lỗi xảy ra",
          text: "Vui lòng thử lại",
          customClass: {
            confirmButton: "btn btn-danger",
          },
        })
      })
    setLoading(false)
    reset()
  }

  return (
    <Modal isOpen={open} toggle={handleModal} className="pt-0" autoFocus={false}>
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h4 className="modal-title">Chuyên ngành {data?.tenChuyennganh}</h4>
      </ModalHeader>
      <Form onSubmit={handleSubmit(_handleThemNND)}>
        <ModalBody className="flex-grow-1">
          <FormGroup className={style.cusFormGroup}>
            <Label htmlFor="maDcdaotao" className={style.labelForm}>
              Chọn địa chỉ đào tạo<span className={style.redColor}>(*)</span>
            </Label>
            <Input
              type="select"
              name="maDcdaotao"
              id="maDcdaotao"
              {...register("maDcdaotao", { required: listDC?.length === 0 })}
              className={`${classnames({
                "is-invalid": errors["maDcdaotao"],
              })} ${style.inputForm}`}
              defaultValue={listDC?.length !== 0 && listDC[0].maDcdaotao}
              onChange={(e) => {
                setValue("maDcdaotao", e.target.value)
                console.log(e.target.value)
                if (e.target.value) {
                  clearErrors("maDcdaotao")
                } else {
                  setError('maDcdaotao')
                }
              }}
            >
              {listDC?.map((diachi, index) => (
                <option key={index} value={diachi.maDcdaotao}>
                  {diachi.tenDc}
                </option>
              ))}
              {errors && errors.maDcdaotao && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng chọn địa chỉ đào tạo
              </FormText>
            )}
            </Input>
            {listDC?.length === 0 && (
              <FormText color="danger" className={style.formErr}>
                Các địa chỉ đào tạo đã có chỉ tiêu
              </FormText>
            )}
          </FormGroup>
          <FormGroup className={style.cusFormGroup}>
            <Label for="soLuongQS" className={style.labelForm}>
              Số lượng chỉ tiêu hệ quân sự
              <span className={style.redColor}>(*)</span>
            </Label>
            <input
              autoFocus
              id="soLuongQS"
              name="soLuongQS"
              type="number"
              defaultValue='0'
              className={`${classnames({ "is-invalid": errors.soLuongQS })} ${
                style.inputForm
              }`}
              {...register("soLuongQS", { required: true })}
              placeholder="Nhập số lượng chỉ tiêu quân sự"
            />
            {errors && errors.soLuongQS && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập số lượng chỉ tiêu hệ quân sự
              </FormText>
            )}
          </FormGroup>
          <FormGroup className={style.cusFormGroup}>
            <Label for="soLuongDS" className={style.labelForm}>
              Số lượng chỉ tiêu hệ dân sự
              <span className={style.redColor}>(*)</span>
            </Label>
            <input
              autoFocus
              id="soLuongDS"
              name="soLuongDS"
              type="number"
              defaultValue='0'
              className={`${classnames({ "is-invalid": errors.soLuongDS })} ${
                style.inputForm
              }`}
              {...register("soLuongDS", { required: true })}
              placeholder="Nhập số lượng chỉ tiêu dân sự"
            />
            {errors && errors.soLuongDS && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập số lượng chỉ tiêu hệ dân sự
              </FormText>
            )}
          </FormGroup>
        </ModalBody>
        <ModalFooter style={{ justifyContent: "flex-start" }}>
          <FormGroup
            className={`d-flex justify-content-start mb-0 ${style.cusFormGroup}`}
          >
            <Button.Ripple color="primary" type="submit">
            { loading ? <div className='loader'></div> : 'Thêm'}
            </Button.Ripple>
            <Button.Ripple
              outline
              className="mr-1"
              color="secondary"
              type="button"
              onClick={handleModal}
              style={{ marginLeft: "1rem" }}
            >
              Hủy
            </Button.Ripple>
          </FormGroup>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default AddNewModal
