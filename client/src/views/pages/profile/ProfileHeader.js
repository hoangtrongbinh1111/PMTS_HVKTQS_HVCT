// ** React Imports
import { useEffect, useState } from "react"
import {useForm} from 'react-hook-form'
// ** Icons Imports
import {
  AlignJustify,
  Rss,
  Info,
  Image,
  Users,
  Edit,
  Camera,
  X,
} from "react-feather"

// ** Reactstrap Imports
import {
  Card,
  CardImg,
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
  Row,
  Col,
  Input,
  FormGroup
} from "reactstrap"
import { updateUser, upLoadImage } from "../../../api/user"
import style from "../../../assets/scss/index.module.scss"
import classnames from "classnames"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const ProfileHeader = ({ data }) => {
  const MySwal = withReactContent(Swal)
  // ** States
  const avatar = require("@src/assets/images/avatars/default.jpg").default
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState(
    `${process.env.REACT_APP_API_URL_NEW}/public/images/users/${data?.anhDaiDien}`
  )
  const [show, setShow] = useState(false)
  const [file, setFile] = useState(null)
  const userData = JSON.parse(localStorage.getItem('userData'))
  useEffect(() => {

  }, [userData])
  const handleOnChangeFile = (e) => {
    setFile(e.target.files[0])
    setUrl(URL.createObjectURL(e.target.files[0]))
  }
  const handleModal = () => setShow(!show)
  const toggle = () => setIsOpen(!isOpen)
  const coverImage =
    require("@src/assets/images/profile/user-uploads/timeline.jpg").default
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModal} />
  )
  const _handleEditUser = async () => {
    setLoading(true)
    if (file !== null) {
      const formData = new FormData()
      formData.append("file", file)
      upLoadImage(formData)
        .then((res) => {
          if (res.status) {
            const dataSubmit = {
              anhDaiDien: res.result,
              maNguoiDung: data?.maNguoiDung
            }
            updateUser(dataSubmit)
              .then((result) => {
                MySwal.fire({
                  icon: "success",
                  title: "Chỉnh sửa thành công!",
                  customClass: {
                      confirmButton: "btn btn-success"
                  }
              }).then((confirm) => {
                userData['anhDaiDien'] = res.result
                localStorage.setItem('userData', JSON.stringify(userData))
                setLoading(false)
                setFile(null)
                location.reload()
              })                // setUrl()
              })
              .catch((err) => {
                console.log(err)
                MySwal.fire({
                  icon: "error",
                  title: "Có lỗi xảy ra",
                  text: "Vui lòng thử lại",
                  customClass: {
                      confirmButton: "btn btn-danger"
                  }
              })
              })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } 
    setShow(false)
    setLoading(false)
  }
  return (
    <Card className="profile-header mb-2">
      <CardImg src={coverImage} alt="User Profile Image" top />
      <div className="position-relative">
        <div className="profile-img-container d-flex align-items-center">
          <div className="profile-img">
            <img
              className="rounded"
              src={data.anhDaiDien ? url : avatar}
              alt="Card image"
              style={{
                width: '100%',
                height: '100%'
              }}
            />
            {/* <Button
              color="success"
              outline
              style={{
                width: "20px",
                height: "20px",
                position: "absolute",
                top: "8rem",
                left: "7rem",
              }}
            >
              <Camera size={15} />
            </Button> */}
            <div>
              <Camera
                size={25}
                style={{
                  position: "absolute",
                  top: "7.5rem",
                  left: "7.5rem",
                  cursor: "pointer",
                  stroke: "#ccc",
                }}
                onClick={() => setShow(true)}
              />
            </div>
          </div>
          <div
            className="profile-title"
            style={{ marginLeft: "2rem", marginTop: "3rem" }}
          >
            <h2 className="text-white">{data.hoTen}</h2>
            <p className="text-white">{data.tenNhom}</p>
          </div>
        </div>
      </div>
      {/* <div className='profile-header-nav'>
        <Navbar container={false} className='justify-content-end justify-content-md-between w-100' expand='md' light>
          <Button color='' className='btn-icon navbar-toggler' onClick={toggle}>
            <AlignJustify size={21} />
          </Button>
          <Collapse isOpen={isOpen} navbar>
            <div className='profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0'>
              <Nav className='mb-0' pills>
                <NavItem>
                  <NavLink className='fw-bold' active>
                    <span className='d-none d-md-block'>Feed</span>
                    <Rss className='d-block d-md-none' size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='fw-bold'>
                    <span className='d-none d-md-block'>About</span>
                    <Info className='d-block d-md-none' size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='fw-bold'>
                    <span className='d-none d-md-block'>Photos</span>
                    <Image className='d-block d-md-none' size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='fw-bold'>
                    <span className='d-none d-md-block'>Friends</span>
                    <Users className='d-block d-md-none' size={14} />
                  </NavLink>
                </NavItem>
              </Nav>
              <Button color='primary'>
                <Edit className='d-block d-md-none' size={14} />
                <span className='fw-bold d-none d-md-block'>Edit</span>
              </Button>
            </div>
          </Collapse>
        </Navbar>
      </div> */}
      <Modal
        isOpen={show}
        toggle={handleModal}
        className="modal-dialog-centered modal-md"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={handleModal}
          close={CloseBtn}
          tag="div"
        >
          <h4 style={{ textAlign: "center", color: "#09a863" }}>
            Cập nhật ảnh đại diện
          </h4>
        </ModalHeader>
        <Form onSubmit={handleSubmit(_handleEditUser)}>
          <ModalBody className="px-3 pb-1">
            <Row className="justify-content-center">
              <Col md="8" sm="12">
                <img src={url} style={{ width: "100%" }}></img>
                <Input
                  type="file"
                  onChange={(e) => handleOnChangeFile(e)}
                ></Input>
              </Col>

            </Row>
          </ModalBody>
          <ModalFooter
            style={{ justifyContent: "center" }}
            className="px-3"
          >
            <FormGroup
              className={`d-flex justify-content-center mb-0 ${style.cusFormGroup}`}
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
    </Card>
  )
}

export default ProfileHeader
