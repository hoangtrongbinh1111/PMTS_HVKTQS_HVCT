// ** React Imports
import { useState } from 'react'
import { useForm } from "react-hook-form"

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X } from 'react-feather'

// ** Reactstrap Imports
import { Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText, FormText, Form } from 'reactstrap'
import { createGroupUser } from '../../../../api/GroupUser'
import responseResultHelper from '../../../utils/reponsive'
import { ACTION_METHOD_TYPE  } from '../../../utils/constant'
import classnames from "classnames"
import style from "../../../../assets/scss/index.module.scss"

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const AddNewModal = ({ open, handleModal, fetchUser, setReload, reload }) => {
  // ** State
  const [tenNhom, setTen] = useState()
  const [ghiChu, setGhichu] = useState()
  const [loading, setLoading] = useState(false)
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
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const handleAddNewGroup = async (data) => {
    setLoading(true)
    const res = await createGroupUser({
      tenNhom,
      ghiChu
    })
    responseResultHelper(res, handleModal, fetchUser, ACTION_METHOD_TYPE.CREATED)
    setGhichu()
    setTen()
    setReload(!reload)
    setLoading(false)
  }
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      contentClassName='pt-0'
      autoFocus={false}
    >
      <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>Tạo nhóm người dùng mới</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <Form onSubmit={handleSubmit(handleAddNewGroup)}>
        <div className="mb-1">
            <Label className="form-label" for="tenNhom">
              Tên nhóm người dùng<span className={style.redColor}>(*)</span>
            </Label>
            <input
              autoFocus
              id="tenNhom"
              name="tenNhom"
              className={`${classnames({
                "is-invalid": errors.tenNhom,
              })} ${style.inputForm}`}
              {...register("tenNhom", { required: true })}
              value={tenNhom}
              onChange={(e) => {
                if (e.target.value === '') {
                  setError("tenNhom")
                } else {
                  clearErrors("tenNhom")
                }
                setTen(e.target.value)
              }}
              placeholder="Nhập tên nhóm"
            />
            {errors && errors.tenNhom && (
              <FormText color="danger" className={style.formErr}>
                Vui lòng nhập tên nhóm người dùng
              </FormText>
            )}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="ghiChu">
              Ghi chú
            </Label>
            <input
              id="ghiChu"
              name="ghiChu"
              className={`${classnames({
                "is-invalid": errors.ghiChu,
              })} ${style.inputForm}`}
              {...register("ghiChu", { required: false })}
              placeholder="Ghi chú"
              value={ghiChu}
              onChange={(e) => {
                setGhichu(e.target.value)
              }}
            />
          </div>
        <Button className='me-1' color='primary' type='submit'>
        { loading ? <div className='loader'></div> : 'Thêm'}
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
