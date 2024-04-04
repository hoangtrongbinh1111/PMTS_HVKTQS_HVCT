// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText, Alert } from 'reactstrap'

import responseResultHelper from '../../utils/reponsive'
import { ACTION_METHOD_TYPE } from '../../utils/constant'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { TaoNhieuHoSoDangKi, thongKeTheoMucDiem } from '../../../api/hoSoDangKi'
import { toDateString } from '../../../utility/Utils'
const MucDiemModal = ({ open, handleModal, data }) => {
  const [mucdiem, setMucDiem] = useState([])
  const columnsData = [
    {
      name: 'STT',
      maxWidth: '5px',
      selector: (row, index) => index + 1,

    },
    {
      name: 'Mức điểm',
      maxWidth: '200px',
      selector: row => row.value,
    },
    {
      name: 'Số lượng',
      maxWidth: '200px',
      selector: row => row.count,
    },
    {
      name: 'Tích lũy',
      maxWidth: '200px',
      selector: row => row.tichLuy,
    },
  ]
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  useEffect(() => {
    thongKeTheoMucDiem().then(res => {
      console.log(res.result.data.filter(item => item.maChuyennganhTS  === data.maChuyennganhTS)[0])

      setMucDiem(res.result.data.filter(item => item.maChuyennganhTS  === data.maChuyennganhTS)[0])
    })
  }, [data.maChuyennganhTS])
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>Mức điểm chuyên ngành <span style={{ fontWeight: 'bold' }}>{data.tenChuyennganh}</span> </h5>
      </ModalHeader>
      <ModalBody>
        <div className='react-dataTable react-dataTable-selectable-rows'>
          {/* <h5 className='modal-title' style={{marginLeft: '20px'}}>Danh sách dự kiến trúng tuyển chuyên ngành <span style={{ fontWeight: 'bold' }}>{data.data.tenChuyennganh}</span> </h5> */}

          <DataTable
            noHeader
            striped
            className='react-dataTable'
            columns={columnsData}
            data={mucdiem.countDiem}
          />
        </div>
      </ModalBody>
    </Modal >

  )
}

export default MucDiemModal
