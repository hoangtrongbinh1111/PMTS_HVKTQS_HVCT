// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText, Alert } from 'reactstrap'

import responseResultHelper from '../../../utils/reponsive'
import { ACTION_METHOD_TYPE } from '../../../utils/constant'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import {  } from '../../../../api/hoSoDangKi'
import { toDateString } from '../../../../utility/Utils'
const DetailModal = ({ data }) => {
  const columnsData = [
    {
      name: 'STT',
      width: "70px",
      selector: (row, index) => index + 1,

    },
    {
      name: 'Mã',
      maxWidth: '10px',
      selector: row => row.STT,

    },
    {
      name: 'Số báo danh',
      maxWidth: '200px',
      selector: row => row.soBaodanh,
    },
    {
      name: 'Họ tên',
      minWidth: '200px',
      selector: row => row.hoTen,
    },
    {
      name: 'Ngày sinh',
      maxWidth: '150px',
      selector: row => toDateString(row.ngaySinh),
    },
    {
      name: 'GT',
      maxWidth: '50px',
      selector: row => row.gioiTinh,
    },
    {
      name: 'Tổng điểm',
      maxWidth: '200px',
      selector: row => row.tongDiem,
    },
  ]

  return (
    <div className='react-dataTable react-dataTable-selectable-rows' style={{paddingTop: '20px', paddingBottom: '20px', backgroundColor:'#e3e3e3'}}>
      <h5 className='modal-title' style={{marginLeft: '20px'}}>Danh sách trúng tuyển chuyên ngành <span style={{ fontWeight: 'bold' }}>{data.data.tenChuyennganh}</span> </h5>

      <DataTable
        noHeader
        striped
        className='react-dataTable'
        columns={columnsData}
        data={data.data.danhSachTrungTuyen}
      />
    </div>
  )
}

export default DetailModal
