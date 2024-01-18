// ** React Imports
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee, X } from 'react-feather'

// ** Actions
import { handleLogin } from '@store/authentication'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'
// ** Logo
import logo from '@src/assets/images/logo/logo.png'

// ** Utils
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'
import classnames from 'classnames'

// ** Reactstrap Imports
import { Row, Col, Form, Input, Label, Alert, Button, CardText, CardTitle, UncontrolledTooltip, Modal, ModalBody, ModalFooter, ModalHeader, FormText } from 'reactstrap'
import { initialAbility } from '../../../configs/acl/initialAbility'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import { loginMember, getMember } from '../../../api/login'
import style from '../../../assets/scss/index.module.scss'
import Select from '../../forms/form-elements/select'
import SwithDTSModal from './SwitchDTSModal'

const ToastContent = ({ t, name, role }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>{name}</h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        <span>You have successfully logged in as an {role} user to Vuexy. Now you can start to explore. Enjoy!</span>
      </div>
    </div>
  )
}

const defaultValues = {
  password: '',
  username: ''
}

const Login = () => {
  // ** Hooks
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)
  const [loginErrMes, setLoginErrMes] = useState('')
  const [showModalDTS, setShowModalDTS] = useState(false)
  const [userData, setUserData] = useState()
  const [permissArr, setPermissArr] = useState()
  const [loading, setLoading] = useState(false)
  const {
    control,
    setError,
    handleSubmit,
    register,
    clearErrors,
    formState: { errors }
  } = useForm()
  const handleModal = () => {
    setShowModalDTS(!showModalDTS)
  }
    // ** Custom close btn
    const CloseBtn = <X className='cursor-pointer' size={15} style={{margin: '5px 5px 0px 5px'}} onClick={handleModal} />
  const illustration = skin === 'dark' ? 'login_cover.jpg' : 'login_cover.jpg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const onSubmit = async (data) => {
    if (isObjEmpty(errors)) {
      const { username, password } = data
      const dataSubmit = {
        username,
        password,
      }
      setLoading(true)
      try {  
        setLoginErrMes('')   
        loginMember(dataSubmit)
          .then((responseDataLogin) => {
            const memberInfo = responseDataLogin.result
            localStorage.setItem("accessToken", memberInfo.token)
            const permissionArr = memberInfo.tenChucNang ? JSON.parse(memberInfo.tenChucNang) : []
            let permissionArrFormat = permissionArr.map(permiss => {
              return {
                action: permiss.action,
                subject: permiss.subject
              }
            })
            permissionArrFormat = permissionArrFormat.concat(initialAbility)
            if (memberInfo.tenNhom === 'ADMIN') {
              permissionArrFormat = permissionArrFormat.concat({
                action: "manage",
                subject: "all"
              })
            }
            setUserData({
              ...memberInfo,
              permission: permissionArrFormat,
              role: 'admin'
            })
            setPermissArr(permissionArrFormat)
            handleModal()
          }).catch((err) => {
            console.log('err', err)
            setLoginErrMes(err.response?.data?.message || "Đăng nhập lỗi! Vui lòng thử lại!")
            setLoading(false)
          })
      } catch (err) {
        console.log(err)
        setLoading(false)
        setLoginErrMes(err.response?.data?.message || "Đăng nhập lỗi! Vui lòng thử lại!")
      }
    }
  }

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Col className='d-none d-lg-flex align-items-center' lg='8' sm='12'  style={{padding: '0'}}>
          <div className='w-100 d-lg-flex align-items-center justify-content-center' style={{height: '100%'}}>
            <img className='img-fluid w-100' src={source} alt='Login Cover' style={{height: '100%', width: '100%'}} />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <img className='fallback-logo d-flex m-auto' src={logo} alt='logo' style={{ width: "12rem" }} />
            <CardTitle tag='h1' className='fw-bold mb-1' style={{textAlign: 'center', marginBottom: '4rem', marginTop: '1rem'}}>
            Học viện Kỹ thuật Quân sự            </CardTitle>
            <CardTitle tag='h2' className='fw-bold mb-1' style={{textAlign: 'center', marginTop: '2rem'}}>
              Hệ thống quản lý Tuyển sinh Sau đại học
            </CardTitle>
            {loginErrMes !== '' && <Alert color="danger" style={{ padding: '18px' }}>
              {loginErrMes}
            </Alert>}
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className={`form-label ${style.labelFormRe}`} for='login-email'>
                  Tên đăng nhập<span className={style.redColor}>(*)</span>
                </Label>
                <Controller
                  id='username'
                  name='username'
                  control={control}
                  className={`${classnames({ 'is-invalid': errors['username'] })} ${style.inputForm}` }
                  {...register('username', { required: true})}
                  render={({ field }) => (
                  <Input
                      autoFocus
                      id='username'
                      name='username'
                      type='text'
                      placeholder='Nhập tên đăng nhập'
                      {...field}
                      invalid={errors.username && true}
                    />
                    )}
                    />
                    {errors && errors.username && <FormText color="danger" className={style.formErr}>Vui lòng nhập tên đăng nhập</FormText>}
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className={`form-label ${style.labelFormRe}`} for='password'>
                    Mật khẩu<span className={style.redColor}>(*)</span>
                  </Label>
                  <Link to='/forgot-password'>
                    <small>Quên mật khẩu?</small>
                  </Link>
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  className={`${classnames({ 'is-invalid': errors['password'] })}`}
                  {...register('password', { required: true})}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} placeholder='Nhập mật khẩu...' />
                  )}
                />
                {errors && errors.password && <FormText color="danger" className={style.formErr}>Vui lòng nhập mật khẩu</FormText>}
              </div>
              <Button type='submit' color='primary' block>
                {
                  loading ? (<div className='loader'></div>) : <span style={{ color: "#fff" }}>Đăng nhập</span>
                }
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
      <Modal
      isOpen={showModalDTS}
      toggle={handleModal}
      className='modal-dialog-centered modal-md'
      autoFocus={false}
      >
      <ModalHeader className="bg-transparent" 
      toggle={handleModal}
      style={{padding: '0'}}
      close={CloseBtn} tag='div'>
              </ModalHeader>
              <ModalBody className='px-1 pb-1'>
                <SwithDTSModal userData={userData} permissArr={permissArr} />
              </ModalBody>
      </Modal>
    </div>
  )
}

export default Login
