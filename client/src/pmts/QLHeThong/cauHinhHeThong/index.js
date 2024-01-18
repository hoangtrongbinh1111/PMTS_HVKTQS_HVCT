// ** React Imports
import React, { Fragment, useState, forwardRef, useEffect, useRef, useLayoutEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
// imprt thư viện của bảng
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'

//import icon
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, adge, MoreVertical, Trash, Edit, Search } from 'react-feather'

//import css
import '@styles/react/libs/tables/react-dataTable-component.scss'

// import API
import { getListUser, searchListUser, createUser, exportUser, exportUserTemplate } from '../../../api/user'

//import thư viện
import { TemplateHandler } from "easy-template-x"
import { saveFile } from '../../utils/util'
import readXlsxFile from 'read-excel-file/web-worker'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js'
// ** Reactstrap Import
import {
    Row,
    Col,
    Card,
    Input,
    Label,
    Button,
    CardTitle,
    CardHeader,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledButtonDropdown,
    UncontrolledDropdown,
    Badge,
    UncontrolledTooltip,
    Form,
    FormGroup,
    InputGroup,
    FormText,
    FormFeedback
} from 'reactstrap'
import { toDateTimeString, toDateString, isObjEmpty } from '../../../utility/Utils'
import style from '../../../assets/scss/index.module.scss'
import classnames from "classnames"
import { getInfo, update } from '../../../api/thamSoHeThong'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
    <div className='form-check'>
        <Input type='checkbox' ref={ref} {...props} />
    </div>
))

const ThamSoHeThong = () => {
    const inputFile = useRef(null)
    // ** States
    const [loading, setLoading] = useState(false)
    const MySwal = withReactContent(Swal)
    const [isReset, setIsReset] = useState(false)
    const [info, setInfo] = useState()
    
    useEffect(() => {
        getInfo()
        .then(res => {
            const listres = res.result?.data
            setInfo(listres[0] ?? {})
        }).catch(err => {
          console.log(err)
        })
    }, [])
    const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/

    const SignupSchema = yup.object().shape({
      donVicq: yup.string().required("Vui lòng nhập tên đơn vị chủ quản"),
      tenDv: yup.string().required("Vui lòng nhập tên đơn vị"),
      diaChi: yup.string().required("Vui lòng nhập địa chỉ"),
      chucVu_ngki: yup.string().required("Vui lòng nhập chức vụ người ký"),
      tenNgki: yup.string().required("Vui lòng nhập tên người ký"),
      thuKi: yup.string().required("Vui lòng nhập tên thư ký"),
      soDT: yup.string().matches(phoneRegExp, 'Vui lòng nhập đúng định dạng số điện thoại').required('Vui lòng nhập số điện thoại liên hệ'),
      ngayBDPhucKhao: yup.array().required("Vui lòng chọn ngày bắt đầu nhận đơn phúc khảo"),
      ngayKTPhucKhao: yup.array().required("Vui lòng chọn ngày kết thúc nhận đơn phúc khảo"),
      ngayChamPhucKhao: yup.array().required("Vui lòng chọn ngày bắt đầu chấm và thông báo kết quả phúc khảo")
    })

    const {
      register,
      formState: { errors },
      handleSubmit,
      reset,
      control,
    } = useForm({ mode: "onChange", resolver: yupResolver(SignupSchema) })
    // ** Function to handle filte
    const handleUpdate = (data) => {
      setLoading(true)
      const dataSubmit = {
        maThamso: info?.maThamso,
        donVicq: data?.donVicq !== '' ? data?.donVicq : info.donVicq,
        tenDv: data?.tenDv !== '' ? data?.tenDv : info.tenDv,
        diaChi: data?.diaChi !== '' ? data?.diaChi : info.diaChi,
        chucVu_ngki: data?.chucVu_ngki !== '' ? data?.chucVu_ngki : info.chucVu_ngki,
        tenNgki: data?.tenNgki !== '' ? data?.tenNgki : info.tenNgki,
        thuKi: data?.thuKi !== '' ? data?.thuKi : info.thuKi,
        ngayBDPhucKhao: data?.ngayBDPhucKhao ? data.ngayBDPhucKhao[0] : info.ngayBDPhucKhao,
        ngayKTPhucKhao: data?.ngayKTPhucKhao ? data.ngayKTPhucKhao[0] : info.ngayKTPhucKhao,
        ngayChamPhucKhao: data?.ngayChamPhucKhao ? data.ngayChamPhucKhao[0] : info.ngayChamPhucKhao,
        soDT: data?.soDT ? data.soDT : info.soDT
      }
        update(dataSubmit)
        .then(res => {
            MySwal.fire({
              icon: "success",
              title: "Lưu thông tin thành công",
              customClass: {
                  confirmButton: "btn btn-success"
              }
          })
          setLoading(false)
        })
        .catch(err => {
            console.log(err)
            MySwal.fire({
              icon: "error",
              title: "Có lỗi xảy ra",
              text: "Vui lòng thử lại!",
              customClass: {
                  confirmButton: "btn btn-danger"
              }
          })
          setLoading(false)
        })
    }
    const hasEmptyValue = (obj) => {
      for (const key in obj) {
        if (obj[key] === '') {
          return true
        }
      }
      return false
    }
    return (
        <Fragment>
            <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={e => handleImportFile(e)} />
            <Card style={{backgroundColor:'white'}}>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom justify-content-center'>
                    <CardTitle tag='h3' style={{color: '#09a863'}}>SỐ LIỆU HỆ THỐNG</CardTitle>
                </CardHeader>
               
     <Row
        className="mb-2"
        style={{ justifyContent: "space-between", padding: "0 15px" }}
      >
        { info && <Form onSubmit={handleSubmit(handleUpdate)} style={{padding: "3rem"}}>
          <Row>
            <Col md="6" sm="12" className='mb-1'>
              <Label
                for="donVicq"
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >
                Tên đơn vị chủ quản<span className={style.redColor}>(*)</span>
              </Label>
              <Controller
                  id="donVicq"
                  name="donVicq"
                  defaultValue={info?.donVicq}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Nhập tên đơn vị chủ quản"
                      invalid={errors.donVicq && true}
                      className={classnames({ "is-invalid": errors.donVicq })}
                    />
                  )}
                />
                {errors.donVicq && (
                  <FormFeedback>{errors.donVicq?.message}</FormFeedback>
                )}
            </Col>
            <Col md="6" sm="12" className='mb-1'>
              <Label
                for="tenDv"
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >
                Tên đơn vị<span className={style.redColor}>(*)</span>
              </Label>
              <Controller
                  id="tenDv"
                  name="tenDv"
                  defaultValue={info?.tenDv}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Nhập tên đơn vị"
                      invalid={errors.tenDv && true}
                      className={classnames({ "is-invalid": errors.tenDv })}
                    />
                  )}
                />
                {errors.tenDv && (
                  <FormFeedback>{errors.tenDv?.message}</FormFeedback>
                )}
            </Col>
            <Col className='mb-1' md="6" sm="12">
              <Label
                for="tenNgki"
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >Người ký<span className={style.redColor}>(*)</span>
              </Label>
              <Controller
                  id="tenNgki"
                  name="tenNgki"
                  defaultValue={info?.tenNgki}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Nhập tên người ký"
                      invalid={errors.tenNgki && true}
                      className={classnames({ "is-invalid": errors.tenNgki })}
                    />
                  )}
                />
                {errors.tenNgki && (
                  <FormFeedback>{errors.tenNgki?.message}</FormFeedback>
                )}
            </Col>
            <Col className='mb-1' md="6" sm="12">
              <Label
                for="chucVu_ngki"
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >
                Chức vụ người ký<span className={style.redColor}>(*)</span>
              </Label>
              <Controller
                  id="chucVu_ngki"
                  name="chucVu_ngki"
                  defaultValue={info?.chucVu_ngki}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Nhập chức vụ người kí"
                      invalid={errors.chucVu_ngki && true}
                      className={classnames({ "is-invalid": errors.chucVu_ngki })}
                    />
                  )}
                />
                {errors.chucVu_ngki && (
                  <FormFeedback>{errors.chucVu_ngki?.message}</FormFeedback>
                )}
            </Col>
            <Col className='mb-1' md="6" sm="12">
              <Label
                for="diaChi"
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >
                Địa chỉ<span className={style.redColor}>(*)</span>
              </Label>
               <Controller
                  id="diaChi"
                  name="diaChi"
                  defaultValue={info?.diaChi}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Nhập địa chỉ"
                      invalid={errors.diaChi && true}
                      className={classnames({ "is-invalid": errors.diaChi })}
                    />
                  )}
                />
                {errors.diaChi && (
                  <FormFeedback>{errors.diaChi?.message}</FormFeedback>
                )}
            </Col>        
            <Col className='mb-1' md="6" sm="12">
              <Label
                for="thuKi"
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >
                Thư ký<span className={style.redColor}>(*)</span>
              </Label>
              <Controller
                  id="thuKi"
                  name="thuKi"
                  defaultValue={info?.thuKi}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Nhập tên thư ký"
                      invalid={errors.thuKi && true}
                      className={classnames({ "is-invalid": errors.thuKi })}
                    />
                  )}
                />
                {errors.thuKi && (
                  <FormFeedback>{errors.thuKi?.message}</FormFeedback>
                )}
            </Col>
            <Col className='mb-1' md="6" sm="12">
              <Label
                for="ngayBDPhucKhao"
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >
                Ngày bắt đầu nhận đơn phúc khảo<span className={style.redColor}>(*)</span>
              </Label>
              <Controller
              id="ngayBDPhucKhao"
              name="ngayBDPhucKhao"
              control={control}
              defaultValue={new Array(info?.ngayBDPhucKhao)}
              render={({ field }) => (
                <Flatpickr
                  {...field}
                  placeholder="dd/mm/yyyy"
                  options={{
                    allowInput: true,
                    dateFormat: "d-m-Y", // format ngày giờ
                    locale: {
                        ...Vietnamese
                      }
                    }
                } 
                  className={classnames('form-control', {
                    'is-invalid': errors.ngayBDPhucKhao
                  })}
                />
              )}
            />
            {errors.ngayBDPhucKhao && (
              <FormFeedback>{errors.endDate?.ngayBDPhucKhao}</FormFeedback>
            )}
            </Col>
            <Col className='mb-1' md="6" sm="12">
              <Label
                for="ngayKTPhucKhao"
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >
                Ngày kết thúc nhận đơn phúc khảo<span className={style.redColor}>(*)</span>
              </Label>
              <Controller
              id="ngayKTPhucKhao"
              name="ngayKTPhucKhao"
              control={control}
              defaultValue={new Array(info?.ngayKTPhucKhao)}
              render={({ field }) => (
                <Flatpickr
                  {...field}
                  placeholder="dd/mm/yyyy"
                  options={{
                    allowInput: true,
                    dateFormat: "d-m-Y", // format ngày giờ
                    locale: {
                        ...Vietnamese
                      }
                    }
                } 
                  className={classnames('form-control', {
                    'is-invalid': errors.ngayKTPhucKhao
                  })}
                />
              )}
            />
            {errors.ngayKTPhucKhao && (
              <FormFeedback>{errors.endDate?.ngayKTPhucKhao}</FormFeedback>
            )}
            </Col>
            <Col className='mb-1' md="6" sm="12">
              <Label
                for="ngayChamPhucKhao"
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >
                Ngày bắt đầu chấm phúc khảo<span className={style.redColor}>(*)</span>
              </Label>
              <Controller
              id="ngayChamPhucKhao"
              name="ngayChamPhucKhao"
              control={control}
              defaultValue={new Array(info?.ngayChamPhucKhao)}
              render={({ field }) => (
                <Flatpickr
                  {...field}
                  placeholder="dd/mm/yyyy"
                  options={{
                    allowInput: true,
                    dateFormat: "d-m-Y", // format ngày giờ
                    locale: {
                        ...Vietnamese
                      }
                    }
                } 
                  className={classnames('form-control', {
                    'is-invalid': errors.ngayChamPhucKhao
                  })}
                />
              )}
            />
            {errors.ngayChamPhucKhao && (
              <FormFeedback>{errors.endDate?.ngayChamPhucKhao}</FormFeedback>
            )}
            </Col>
            <Col className='mb-1' md="6" sm="12">
              <Label
                for="soDT"
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >
                Số điện thoại liên hệ<span className={style.redColor}>(*)</span>
              </Label>
              <Controller
                  id="soDT"
                  name="soDT"
                  defaultValue={info?.soDT}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Nhập số điện thoại"
                      invalid={errors.soDT && true}
                      className={classnames({ "is-invalid": errors.soDT })}
                    />
                  )}
                />
                {errors.soDT && (
                  <FormFeedback>{errors.soDT?.message}</FormFeedback>
                )}
            </Col>
          </Row>

          <FormGroup className="d-flex justify-content-start mb-0">
            <Button.Ripple color="primary" type="submit" style={{marginRight: "1rem"}} >
              {loading ? <div className={style.loader}></div> : (isReset || info ? "Lưu" : "Chỉnh sửa")}
            </Button.Ripple>
            <Button.Ripple
              outline
              className="mr-1 ml-1"
              color="secondary"
              type="button"
              onClick={() => {
                reset()
                setIsReset(true)
                setInfo()
              }
            }
            >
              Làm mới
            </Button.Ripple>
          </FormGroup>
        </Form>}
      </Row>
            </Card>
            
        </Fragment>
    )
}

export default ThamSoHeThong
