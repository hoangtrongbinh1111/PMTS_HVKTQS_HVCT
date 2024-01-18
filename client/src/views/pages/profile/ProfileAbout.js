// ** Reactstrap Imports
import { useDeferredValue, useEffect, useState } from "react"
import {
  Card,
  CardBody,
  CardText,
  Row,
  Col,
  Collapse,
  Button,
  Form,
  Label,
  FormText,
  FormGroup,
} from "reactstrap"
import { updateUser, getUserById } from "../../../api/user"
import { toDateString } from "../../../utility/Utils"
import { useForm } from "react-hook-form"
import style from "../../../assets/scss/index.module.scss"
import classnames from "classnames"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const ProfileAbout = ({ data }) => {
  const MySwal = withReactContent(Swal)
  const [loading, setLoading] = useState(false)
  const userData_ = JSON.parse(localStorage.getItem("userData"))
  const [userData, setUserData] = useState(userData_)
  const [isEdit, setIsEdit] = useState(false)
  const handleToggle = () => setIsEdit(!isEdit)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const getData = () => {
    getUserById({
      params: {
        maNguoiDung: userData_.maNguoiDung
      }
    })
    .then(res => {
      if (res.result) {
        setUserData(res.result)
        const savedData = {
          ...(res.result),
          permission: userData_.permission,
          role: userData_.role,
          token: userData_.token
        }
        localStorage.setItem('userData', JSON.stringify(savedData))
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
    getData()
  }, [])
  const handleUpdate = (data) => {
    setLoading(true)
    const dataSubmit = {
      maNguoiDung: parseInt(userData.maNguoiDung),
      hoTen: data.hoTen,
    }
    updateUser(dataSubmit)
      .then((res) => {
        MySwal.fire({
          icon: "success",
          title: "Chỉnh sửa thành công!",
          customClass: {
            confirmButton: "btn btn-success",
          },
        }).then((confirm) => {
          userData_['hoTen'] = data?.hoTen || ''
          localStorage.setItem('userData', JSON.stringify(userData_))
          location.reload()
        })
        getData()
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
  }
  return (
    <Card>
      <CardBody>
        <h4 style={{ textAlign: "center", marginBottom: '1.5rem' }}>Thông tin cá nhân</h4>
        <Row className="justify-content-center">
          <Col className="col-4">
            <h5 className="mb-75">Họ và tên:</h5>
          </Col>
          <Col
            className="col-4"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <CardText>{userData?.hoTen}</CardText>
            <CardText
              onClick={handleToggle}
              style={{ color: "#09a863", cursor: "pointer" }}
            >
              Chỉnh sửa
            </CardText>
          </Col>
          <Collapse isOpen={isEdit} className="col col-8">
            <Card style={{ marginBottom: "0" }}>
              <CardBody>
                <Form onSubmit={handleSubmit(handleUpdate)}>
                  <Label htmlFor="hoTen">Nhập họ và tên mới:</Label>
                  <input
                    autoFocus
                    id="hoTen"
                    name="hoTen"
                    type="text"
                    defaultValue={userData?.hoTen}
                    className={`${classnames({ "is-invalid": errors.hoTen })} ${
                      style.inputForm
                    }`}
                    {...register("hoTen", { required: true })}
                    placeholder="Họ và tên"
                  />
                  {errors && errors.hoTen && (
                    <FormText color="danger" className={style.formErr}>
                      Vui lòng nhập họ và tên
                    </FormText>
                  )}
                  <FormGroup
                    className={`d-flex justify-content-end mt-2 ${style.cusFormGroup}`}
                  >
                    <Button.Ripple color="primary" type="submit">
                      {loading ? (
                        <div className={style.loader}></div>
                      ) : (
                        "Chỉnh sửa"
                      )}
                    </Button.Ripple>
                    <Button.Ripple
                      outline
                      className="mr-1"
                      color="secondary"
                      type="button"
                      onClick={() => setIsEdit(false)}
                      style={{ marginLeft: "1rem" }}
                    >
                      Hủy
                    </Button.Ripple>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Collapse>
          <Col className="col-8">
            <hr />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="col-4">
            <h5 className="mb-75">Tên đăng ký:</h5>
          </Col>
          <Col className="col-4">
            <CardText>{userData?.tenDangKy}</CardText>
          </Col>
          <Col className="col-8">
            <hr />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="col-4">
            <h5 className="mb-75">Thời gian bắt đầu làm việc:</h5>
          </Col>
          <Col className="col-4">
            <CardText>{userData?.ngayBD ? toDateString(userData?.ngayBD) : ""}</CardText>
          </Col>
          <Col className="col-8">
            <hr />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="col-4">
            <h5 className="mb-75">Nhóm người dùng:</h5>
          </Col>
          <Col className="col-4">
            <CardText>{userData?.tenNhom}</CardText>
          </Col>
          <Col className="col-8">
            <hr />
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default ProfileAbout
