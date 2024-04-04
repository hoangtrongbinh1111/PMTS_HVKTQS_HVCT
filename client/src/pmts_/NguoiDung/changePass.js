import { useState, useContext, Fragment, useRef } from 'react'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
  Alert,
  Row,
  Col,
  CardTitle,
  FormText,
  Form,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Button,
  UncontrolledTooltip,
  Badge,
  Card
} from 'reactstrap'
import Spinner from '@components/spinner/Loading-spinner'
/** Constants */
/** API */
import { changePass } from '../../api/login'
import style from '../../assets/scss/index.module.scss'
// import '@styles/base/pages/page-auth.scss'

const ChangePass = props => {
  const MySwal = withReactContent(Swal)
  const [pass, setPass] = useState({
    newPassword: '',
    newPassword_: ''
  })
 
  const [loading, setLoading] = useState(false)
  // otp
  const { register,     formState: { errors }
  , handleSubmit, reset } = useForm()
  const userData = JSON.parse(localStorage.getItem('userData'))
  const onSubmit = async (data) => {
    return MySwal.fire({
        title: "Bạn có chắc chắn muốn đổi mật khẩu không?",
        text: "Kiểm tra kỹ trước khi đổi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Tiếp tục",
        cancelButtonText: "Hủy",
        customClass: {
          confirmButton: `btn btn-primary ${style.customBtn}`,
          cancelButton: "btn btn-outline-dark"
        },
        buttonsStyling: false
      }).then(function (result) {
        if (result.value) {
          setLoading(true)
          const dataSubmit = {
            maNguoiDung: userData.maNguoiDung,
            username: userData.tenDangKy,
            oldPassword: data.oldPassword,
            newPassword: data.newPassword_
          }
          changePass(dataSubmit).then(response => {
            MySwal.fire({
              icon: "success",
              title: "Đổi mật khẩu thành công!",
            //   text: "Yêu cầu đã được phê duyệt!",
              customClass: {
                confirmButton: "btn btn-success"
              }
            })
            setLoading(false)
            reset()
            setPass({
              newPassword: '',
              newPassword_: ''
            })
          })
            .catch((error) => {
              MySwal.fire({
                icon: "error",
                title: error.response?.data?.message || "Đổi mật khẩu thất bại!",
                text: "Vui lòng thử lại",
                customClass: {
                  confirmButton: "btn btn-danger"
                }
              })
              console.error("Something went wrong!", error.response.data)
            })
            setLoading(false)
        }
      })
  }
  
  return (

    <Card style={{minHeight: '75vh', backgroundColor: 'white'}}>
        <CardTitle style={{
            marginTop: '20px',
            textAlign: "center"
        }}>
            <h3 style={{color: "#09a863"}}>Đổi mật khẩu</h3>
        </CardTitle>
        <Form className='auth-login-form mt-1' style={{
            width: '50%',
            margin: "auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: '5px',
            backgroundColor: "#fffaff"
        }} onSubmit={handleSubmit(onSubmit)}>
            <FormGroup className={`${style.customMb2}`}>
          <Label for='oldPassword' className={style.labelForm}>Mật khẩu hiện tại<span className={style.redColor}>(*)</span></Label>
          <input
            type='password'
            name='oldPassword'
            id='oldPassword'
            className={`${classnames({
             "is-invalid": errors.oldPassword
            })} ${style.inputForm}`}
            {...register("oldPassword", { required: true })}
            placeholder='Nhập mật khẩu hiện tại tại đây'
          />
          {errors && errors.oldPassword && <FormText color="danger" className={style.formErr}>Vui lòng nhập mật khẩu hiện tại</FormText>}
        </FormGroup>
        <FormGroup className={`${style.customMb2}`}>
          <Label for='newPassword' className={style.labelForm}>Mật khẩu mới<span className={style.redColor}>(*)</span></Label>
          <input
            type='password'
            name='newPassword'
            id='newPassword'
            className={`${classnames({
             "is-invalid": errors.newPassword
            })} ${style.inputForm}`}
            {...register("newPassword", { required: true })}
            placeholder='Nhập mật khẩu mới tại đây'
            onBlur = {(e) => {
              setPass({
                  ...pass,
                  newPassword: e.target.value
              })
            }}
          />
          {errors && errors.newPassword && <FormText color="danger" className={style.formErr}>Vui lòng nhập mật khẩu mới</FormText>}
        </FormGroup>
        <FormGroup className={`${style.customMb2}`}>
          <Label for='newPassword_' className={style.labelForm}>Nhập lại mật khẩu mới<span className={style.redColor}>(*)</span></Label>
          <input
            type='password'
            name='newPassword_'
            id='newPassword_'
            className={`${classnames({
             "is-invalid": errors.newPassword_
            })}} ${style.inputForm}`}
            {...register("newPassword_", { required: true })}
            placeholder='Nhập lại mật khẩu mới tại đây'
            value={pass.newPassword_}
            onChange = {e => {
              setPass({
                ...pass,
                newPassword_: e.target.value
            })
            }}
          />
          {pass.newPassword_ !== '' && pass.newPassword_ !== pass.newPassword && <FormText color="danger" className={style.formErr}>Mật khẩu mới không khớp</FormText>}
        </FormGroup>
        <FormGroup style={{textAlign: 'center'}} className={`${style.customMb2}`}>
              <Button.Ripple type='submit' color="#09a863" style={{
                backgroundColor: "#09a863"
              }} disabled={loading} 
              >
                {
                  loading ? (<div className={style.loader}></div>) : <span style={{ color: "#fff" }}>Lưu thay đổi</span>
                } 
              </Button.Ripple>
             </FormGroup>   
            </Form>
           
    </Card>
  )

}

export default ChangePass
