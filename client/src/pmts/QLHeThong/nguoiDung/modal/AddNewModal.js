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
  Col,
  Row,
} from "reactstrap"
import { createUser, upLoadImage } from "../../../../api/user"
import responseResultHelper from "../../../utils/reponsive"
import { ACTION_METHOD_TYPE } from "../../../utils/constant"
import classnames from "classnames"
import { Vietnamese } from "flatpickr/dist/l10n/vn.js"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { useForm } from "react-hook-form"
import style from "../../../../assets/scss/index.module.scss"
import { getListRoles } from "../../../../api/GroupUser"
import { toDateString } from "../../../../utility/Utils"

const AddNewModal = ({ open, handleModal, fetchUser }) => {
  // ** State
  const avatar = require("@src/assets/images/avatars/default.jpg").default
  const [file, setFile] = useState(null)
  const [url, setUrl] = useState(avatar)
  const [loading, setLoading] = useState(false)
  const [listRoles, setListRoles] = useState([])
  const [password, setPassword] = useState({
    password_: "",
    confirm_password: "",
  })
  const [role, setRole] = useState()
  const [picker, setPicker] = useState({
    ngayBD: new Date(),
    ngayKT: "",
  })
  const handleOnChangeFile = (e) => {
    setFile(e.target.files[0])
    setUrl(URL.createObjectURL(e.target.files[0]))
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  useEffect(() => {
    getListRoles()
      .then((res) => {
        setListRoles(res.result)
        setRole(res.result[0].maNhom)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  // ** Custom close btn
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModal} />
  )

  const _handleThemNND = async (data) => {
    setLoading(true)
    delete data.matKhau_
    const dataSubmit = {
      ...data,
      ngayBD: picker.ngayBD,
      ngayKT: picker.ngayKT,
      maNhom: role,
    }
    if (file !== null) {
      const formData = new FormData()
      formData.append("file", file)
      upLoadImage(formData)
        .then((res) => {
          if (res?.status) {
            dataSubmit["anhDaiDien"] = res.result
            createUser(dataSubmit)
              .then((result) => {
                responseResultHelper(
                  result,
                  handleModal,
                  fetchUser,
                  ACTION_METHOD_TYPE.CREATED
                )
                setLoading(false)
                reset()
                setFile(null)
                setUrl(avatar)
              })
              .catch((err) => {
                console.log(err)
              })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      createUser(dataSubmit)
        .then((result) => {
          responseResultHelper(
            result,
            handleModal,
            fetchUser,
            ACTION_METHOD_TYPE.CREATED
          )
          setLoading(false)
          reset()
          setFile(null)
          setUrl(avatar)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className="modal-dialog-centered modal-lg"
      autoFocus={false}
    >
      <ModalHeader
        className="bg-transparent"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h4 style={{ textAlign: "center", color: "#09a863" }}>
          Thêm mới người dùng
        </h4>
      </ModalHeader>
      <Form onSubmit={handleSubmit(_handleThemNND)}>
        <ModalBody className="px-3 pb-1">
          <Row>
            <Col md="3" sm="12">
              <img src={url} style={{ width: "100%" }}></img>
              <Input
                type="file"
                onChange={(e) => handleOnChangeFile(e)}
              ></Input>
            </Col>

            <Col md="9" sm="12">
              <FormGroup className={style.cusFormGroup}>
                <Label for="hoTen" className={style.labelForm}>
                  Họ và tên<span className={style.redColor}>(*)</span>
                </Label>
                <input
                  autoFocus
                  id="hoTen"
                  name="hoTen"
                  type="text"
                  className={`${classnames({ "is-invalid": errors.hoTen })} ${
                    style.inputForm
                  }`}
                  {...register("hoTen", { required: true })}
                  placeholder="Họ và tên"
                />
                {errors && errors.hoTen && (
                  <FormText color="danger" className={style.formErr}>
                    Vui lòng nhập họ và tên người dùng
                  </FormText>
                )}
              </FormGroup>
              <FormGroup className={style.cusFormGroup}>
                <Label for="tenDangKy" className={style.labelForm}>
                  Tên đăng ký<span className={style.redColor}>(*)</span>
                </Label>
                <input
                  id="tenDangKy"
                  name="tenDangKy"
                  className={`${classnames({
                    "is-invalid": errors.tenDangKy,
                  })} ${style.inputForm}`}
                  {...register("tenDangKy", { required: true })}
                  placeholder="Tên đăng ký"
                />
                {errors && errors.tenDangKy && (
                  <FormText color="danger" className={style.formErr}>
                    Vui lòng nhập tên đăng ký
                  </FormText>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <FormGroup className={`col col-6 ${style.cusFormGroup}`}>
              <Label for="matKhau" className={style.labelForm}>
                Mật khẩu<span className={style.redColor}>(*)</span>
              </Label>
              <input
                type="password"
                name="matKhau"
                id="matKhau"
                className={`${classnames({
                  "is-invalid": errors.matKhau,
                })} ${style.inputForm}`}
                {...register("matKhau", { required: true })}
                placeholder="Mật khẩu"
                onBlur={(e) => {
                  setPassword({
                    ...password,
                    password_: e.target.value,
                  })
                }}
              />
              {errors && errors.matKhau && (
                <FormText color="danger" className={style.formErr}>
                  Vui lòng nhập mật khẩu
                </FormText>
              )}
            </FormGroup>
            <FormGroup className={`col col-6 ${style.cusFormGroup}`}>
              <Label for="matKhau_" className={style.labelForm}>
                Nhập lại mật khẩu<span className={style.redColor}>(*)</span>
              </Label>
              <input
                type="password"
                name="matKhau_"
                id="matKhau_"
                className={`${classnames({
                  "is-invalid": errors.matKhau_,
                })}} ${style.inputForm}`}
                {...register("matKhau_", { required: true })}
                placeholder="Nhập lại mật khẩu"
                value={password.confirm_password}
                onChange={(e) => {
                  setPassword({
                    ...password,
                    confirm_password: e.target.value,
                  })
                }}
              />
              {password.password_ !== "" &&
                password.password_ !== password.confirm_password && (
                  <FormText color="danger" className={style.formErr}>
                    Mật khẩu không khớp
                  </FormText>
                )}
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className={`col col-6 ${style.cusFormGroup}`}>
              <Label htmlFor="ngayBD" className={style.labelForm}>
                Ngày bắt đầu làm việc<span className={style.redColor}>(*)</span>
              </Label>
              <Flatpickr
                options={{
                  dateFormat: "d-m-Y", // format ngày giờ
                  locale: {
                    ...Vietnamese,
                  },
                  defaultDate: new Date(),
                }}
                placeholder="dd/mm/yyyy"
                onChange={(e) => {
                  if (e.length !== 0) {
                    setPicker({
                      ...picker,
                      ngayBD: e[0],
                    })
                  }
                }}
                className="form-control invoice-edit-input date-picker"
              />
            </FormGroup>
            <FormGroup className={`col col-6 ${style.cusFormGroup}`}>
              <Label htmlFor="ngayKT" className={style.labelForm}>
                Ngày kết thúc làm việc
              </Label>
              <Flatpickr
                options={{
                  dateFormat: "d-m-Y", // format ngày giờ
                  locale: {
                    ...Vietnamese,
                  },
                }}
                placeholder="dd/mm/yyyy"
                onChange={(e) => {
                  if (e.length !== 0) {
                    setPicker({
                      ...picker,
                      ngayKT: e[0],
                    })
                  }
                }}
                className="form-control invoice-edit-input date-picker"
              />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className={`col col-6 ${style.cusFormGroup}`}>
              <Label htmlFor="maNhom" className={style.labelForm}>
                Thuộc nhóm người dùng<span className={style.redColor}>(*)</span>
              </Label>
              <Input
                type="select"
                name="maNhom"
                id="maNhom"
                // className={`${classnames({
                //  "is-invalid": errors.maNhom
                // })} ${style.inputForm}`}
                // {...register("maNhom", { required: true })}
                onChange={(e) => {
                  setRole(e.target.value)
                }}
              >
                <option value={null}>Chọn nhóm người dùng</option>
                {listRoles?.map((role, index) => (
                  <option key={index} value={role.maNhom}>
                    {role.tenNhom}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup className={`col col-6 ${style.cusFormGroup}`}>
              <Label htmlFor="ghiChu" className={style.labelForm}>
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
                placeholder="Ghi chú"
              />
            </FormGroup>
          </Row>
        </ModalBody>
        <ModalFooter style={{ justifyContent: "flex-start" }} className="px-3">
          <FormGroup
            className={`d-flex justify-content-end mb-0 ${style.cusFormGroup}`}
          >
            <Button.Ripple color="primary" type="submit">
              {loading ? <div className='loader'></div> : "Thêm mới"}
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
