// ** React Imports
import { useState, useEffect } from "react"

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
  ModalFooter,
  FormGroup,
  FormText,
  Col,
  Row,
} from "reactstrap"
import { getListRoles } from "../../../../api/GroupUser"
import { updateUser, upLoadImage } from "../../../../api/user"
import responseResultHelper from "../../../utils/reponsive"
import { ACTION_METHOD_TYPE } from "../../../utils/constant"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { useForm } from "react-hook-form"
import style from "../../../../assets/scss/index.module.scss"
import classnames from "classnames"
import { Vietnamese } from "flatpickr/dist/l10n/vn.js"
import { toDateString } from "../../../../utility/Utils"

const EditModal = ({ open, handleModal, fetchUser, infoEdit }) => {
  if (!infoEdit) return
  const avatar = require("@src/assets/images/avatars/default.jpg").default
  // ** State
  const [loading, setLoading] = useState(false)
  const [listRoles, setListRoles] = useState([])

  const [url, setUrl] = useState(
    infoEdit.anhDaiDien ? `${process.env.REACT_APP_API_URL_NEW}/public/images/users/${infoEdit.anhDaiDien}` : avatar
  )

  const [editInfo, setEditInfo] = useState({
    maNguoiDung: '',
    tenDangKy: '',
    matKhau: '',
    matKhau_: '',
    hoTen: '',
    ghiChu: '',
    ngayBD: '',
    ngayKT: '',
    maNhom: 0,
  })
  useEffect(() => {
    setEditInfo({
      maNguoiDung: infoEdit.maNguoiDung || '',
      tenDangKy: infoEdit.tenDangKy || '',
      matKhau: infoEdit.matKhau || '',
      matKhau_: infoEdit.matKhau || '',
      hoTen: infoEdit.hoTen || '',
      ghiChu: infoEdit.ghiChu || '',
      ngayBD: infoEdit.ngayBD || '',
      ngayKT: infoEdit.ngayKT || '',
      maNhom: infoEdit.maNhom || 0,
    })
    setUrl(infoEdit.anhDaiDien ? `${process.env.REACT_APP_API_URL_NEW}/public/images/users/${infoEdit.anhDaiDien}` : avatar)
  }, [infoEdit])

  const [file, setFile] = useState(null)
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
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  // ** Custom close btn
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModal} />
  )
  const _handleEditUser = async (data) => {
    setLoading(true)
    delete data.matKhau_
    const dataSubmit = {
      ...editInfo
    }
    if (file !== null) {
      const formData = new FormData()
      formData.append("file", file)
      upLoadImage(formData)
        .then((res) => {
          if (res?.status) {
            dataSubmit["anhDaiDien"] = res.result
            updateUser(dataSubmit)
              .then((result) => {
                responseResultHelper(
                  result,
                  handleModal,
                  fetchUser,
                  ACTION_METHOD_TYPE.UPDATE
                )
                setLoading(false)
                setFile(null)
                // setUrl()
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
      updateUser(dataSubmit)
        .then((result) => {
          responseResultHelper(
            result,
            handleModal,
            fetchUser,
            ACTION_METHOD_TYPE.UPDATE
          )
          setLoading(false)
          // setFile(null)
          // setUrl()
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
    >
      <ModalHeader
        className="bg-transparent"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h4 style={{ textAlign: "center", color: "#09a863" }}>
          Sửa thông tin người dùng
        </h4>
      </ModalHeader>
      <Form onSubmit={handleSubmit(_handleEditUser)}>
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
                  value={editInfo.hoTen}
                  className={`${classnames({ "is-invalid": errors.hoTen })} ${style.inputForm
                    }`}
                  {...register("hoTen", { required: false })}
                  placeholder="Họ và tên"
                  onChange={(e) => {
                    setEditInfo({
                      ...editInfo,
                      hoTen: e.target.value
                    })
                  }}
                />
                {errors && errors.hoTen && editInfo.hoTen === '' && (
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
                  value={editInfo.tenDangKy}
                  className={`${classnames({
                    "is-invalid": errors.tenDangKy,
                  })} ${style.inputForm}`}
                  placeholder="Tên đăng ký"
                  disabled
                />
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
                value={editInfo.matKhau}
                className={`${classnames({
                  "is-invalid": errors.matKhau,
                })} ${style.inputForm}`}
                {...register("matKhau", { required: false })}
                placeholder="Mật khẩu"
                onChange={(e) => {
                  setEditInfo({
                    ...editInfo,
                    matKhau: e.target.value,
                  })
                }}
              />
              {errors && errors.matKhau && editInfo.matKhau === '' && (
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
                value={editInfo.matKhau_}
                className={`${classnames({
                  "is-invalid": errors.matKhau_,
                })}} ${style.inputForm}`}
                {...register("matKhau_", { required: false })}
                placeholder="Nhập lại mật khẩu"
                onChange={(e) => {
                  setEditInfo({
                    ...editInfo,
                    matKhau_: e.target.value,
                  })
                }}
              />
              {editInfo.matKhau_ !== "" &&
                editInfo.matKhau_ !== editInfo.matKhau && (
                  <FormText color="danger" className={style.formErr}>
                    Mật khẩu không khớp
                  </FormText>
                )}
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className={`col col-6 ${style.cusFormGroup}`}>
              <Label htmlFor="ngayBD" className={style.labelForm}>
                Ngày bắt đầu làm việc
                <span
                  className={style.redColor}
                  style={{ marginRight: "20px" }}
                >
                  (*)
                </span>
              </Label>
              <Flatpickr
                options={{
                  dateFormat: "d-m-Y", // format ngày giờ
                  locale: {
                    ...Vietnamese,
                  },
                  // defaultDate: picker.ngayBD,
                }}
                value={editInfo.ngayBD || ''}
                placeholder="dd/mm/yyyy"
                onChange={(e) => {
                  if (e.length !== 0) {
                    setEditInfo({
                      ...editInfo,
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
                  // defaultDate: picker.ngayKT,
                }}
                value={editInfo.ngayKT || ''}
                placeholder="dd/mm/yyyy"
                onChange={(e) => {
                  if (e.length !== 0) {
                    setEditInfo({
                      ...editInfo,
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
                value={(editInfo.maNhom)?.toString()}
                onChange={(e) => {
                  setEditInfo({
                    ...editInfo,
                    maNhom: e.target.value
                  })
                }}
              >
                {listRoles?.map((role, index) => (
                  <option key={index} value={(role.maNhom)}>
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
                value={infoEdit.ghiChu}
                className={`${classnames({
                  "is-invalid": errors["ghiChu"],
                })} ${style.inputForm}`}
                {...register("ghiChu", { required: false })}
                placeholder="Ghi chú"
                onChange={(e) => setEditInfo({
                  ...editInfo,
                  ghiChu: e.target.value
                })}
              />
            </FormGroup>
          </Row>
        </ModalBody>
        <ModalFooter style={{ justifyContent: "flex-start" }} className="px-3">
          <FormGroup
            className={`d-flex justify-content-end mb-0 ${style.cusFormGroup}`}
          >
            <Button.Ripple color="primary" type="submit">
              {loading ? <div className={style.loader}></div> : "Chỉnh sửa"}
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

export default EditModal
