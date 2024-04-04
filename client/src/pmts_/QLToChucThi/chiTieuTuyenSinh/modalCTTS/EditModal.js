// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X } from 'react-feather'

// ** Reactstrap Imports
import { Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText, Form, ModalFooter, FormGroup, FormText } from 'reactstrap'
import { getListRoles } from '../../../../api/GroupUser'
import { updateUser } from '../../../../api/user'
import responseResultHelper from '../../../utils/reponsive'
import { ACTION_METHOD_TYPE } from '../../../utils/constant'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { useForm } from 'react-hook-form'
import style from '../../../../assets/scss/index.module.scss'
import classnames from "classnames"
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js'
import { toDateString } from '../../../../utility/Utils'
import { updateCT } from '../../../../api/chiTieuTuyenSinh'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const EditModal = ({ open, handleModal, fetchDataDetail, fetchData, infoEdit, data, listDC }) => {
  if (!infoEdit) return
  const MySwal = withReactContent(Swal)

  // ** State
  const [loading, setLoading] = useState(false)


  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  useEffect(() => {
  }, [])
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const _handleEditUser = async (data) => {
    setLoading(true)
    const dataSubmit = {
      maChitieu: infoEdit.maChitieu,
      soLuongDS: data.soLuongDS || infoEdit.soLuongDS,
      soLuongQS: data.soLuongQS || infoEdit.soLuongQS
    }
    updateCT(dataSubmit)
      .then(res => {
        const MySwal = withReactContent(Swal)
        if (res.status) {
          MySwal.fire({
            icon: "success",
            title: "Chỉnh sửa chỉ tiêu tuyển sinh thành công!",
            customClass: {
              confirmButton: "btn btn-success"
            }
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
              confirmButton: "btn btn-danger"
            }
          })
        }
      })
      .catch(err => {
        MySwal.fire({
          icon: "error",
          title: "Có lỗi xảy ra",
          text: "Vui lòng thử lại",
          customClass: {
            confirmButton: "btn btn-danger"
          }
        })
      })
      setLoading(false)
  }
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='pt-0'
    >
      <ModalHeader className="mb-1" toggle={handleModal} close={CloseBtn} tag='div'>
        <h4 className='modal-title'>Sửa chỉ tiêu tuyển sinh</h4>
      </ModalHeader>
      <Form onSubmit={handleSubmit(_handleEditUser)} >
        <ModalBody className='flex-grow-1'>
          <FormGroup className={style.cusFormGroup}>
            <Label for='tenChuyennganh' className={style.labelForm}>Chuyên ngành tuyển sinh</Label>
            <input
              autoFocus
              id='tenChuyennganh'
              name='tenChuyennganh'
              type='text'
              value={data?.tenChuyennganh}
              className={`${style.inputForm}`}
              disabled
            />
          </FormGroup>
          <FormGroup className={style.cusFormGroup}>
            <Label for='tenDC' className={style.labelForm}>Địa chỉ đào tạo</Label>
            <input
              autoFocus
              id='tenDC'
              name='tenDC'
              type='text'
              value={infoEdit?.tenDc}
              className={`${style.inputForm}`}
              disabled
            />
          </FormGroup>
          <FormGroup className={style.cusFormGroup}>
            <Label for='soLuongQS' className={style.labelForm}>Số lượng chỉ tiêu quân sự<span className={style.redColor}>(*)</span></Label>
            <input
              autoFocus
              id='soLuongQS'
              name='soLuongQS'
              type='number'
              defaultValue={infoEdit?.soLuongQS}
              className={`${classnames({ "is-invalid": errors.soLuongQS })} ${style.inputForm}`}
              {...register("soLuongQS", { required: false })}
              placeholder='Nhập số lượng chỉ tiêu quân sự' />
            {errors && errors.soLuongQS && <FormText color="danger" className={style.formErr}>Vui lòng nhập số lượng chỉ tiêu quân sự</FormText>}
          </FormGroup>
          <FormGroup className={style.cusFormGroup}>
            <Label for='soLuongDS' className={style.labelForm}>Số lượng chỉ tiêu dân sự<span className={style.redColor}>(*)</span></Label>
            <input
              autoFocus
              id='soLuongDS'
              name='soLuongDS'
              type='number'
              defaultValue={infoEdit?.soLuongDS}
              className={`${classnames({ "is-invalid": errors.soLuongDS })} ${style.inputForm}`}
              {...register("soLuongDS", { required: false })}
              placeholder='Nhập số lượng chỉ tiêu dân sự' />
            {errors && errors.soLuongDS && <FormText color="danger" className={style.formErr}>Vui lòng nhập số lượng chỉ tiêu dân sự</FormText>}
          </FormGroup>
        </ModalBody>
        <ModalFooter style={{ justifyContent: 'flex-start' }}>
          <FormGroup className={`d-flex justify-content-end mb-0 ${style.cusFormGroup}`}>
            <Button.Ripple color='primary' type='submit'>
              {loading ? (<div className={style.loader}></div>) : 'Chỉnh sửa'}
            </Button.Ripple>
            <Button.Ripple outline className='mr-1' color='secondary' type='button' onClick={handleModal} style={{ marginLeft: "1rem" }}>
              Hủy
            </Button.Ripple>
          </FormGroup>
        </ModalFooter>
      </Form>

    </Modal>
  )
}

export default EditModal
