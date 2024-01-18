// ** React Imports
import React, { Fragment, useState, forwardRef, useEffect, useRef, useContext } from 'react'

// imprt thư viện của bảng
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'

//import icon
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, adge, MoreVertical, Trash, Edit, Search } from 'react-feather'

//import css
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { toDateString } from '../../../../utility/Utils'
import responseResultHelper from '../../../utils/reponsive'
import { ACTION_METHOD_TYPE } from '../../../utils/constant'
// import API
import { getListHinhThucKyLuat } from '../../../../api/hinhThucKyLuat'
import { addDanhSachViPham} from '../../../../api/capnhatthisinhvipham'

//import thư viện
// ** Reactstrap Import
import {
    Card,
    Input,
    Label,
    Button,
    CardTitle,
    CardHeader,
} from 'reactstrap'
import { AbilityContext } from '@src/utility/context/Can'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
    <div className='form-check'>
        <Input type='checkbox' ref={ref} {...props} />
    </div>
))

const AddViPham = ({ data, fetchDSVipham, maHoSo, listVipham}) => {
    // ** States
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [listHTKL, setListHTKL] = useState([])
    const [kyLuatMon1, setKyLuatMon1] = useState('')
    const [kyLuatMon2, setKyLuatMon2] = useState('')
    const [kyLuatMon3, setKyLuatMon3] = useState('')
    const checkVipham = listVipham.find(obj => obj.maHoso === `${maHoSo}`) ? listVipham.find(obj => obj.maHoso === `${maHoSo}`) : {}
    const columns = [
        {
            name: 'Môn 1',
            center: true,
            minWidth: '150px',
            selector: checkVipham.klMon1 ? row => <span>Trừ {row.klMon1}%</span> : row => (<Input type='select' name='maTui' id='maTui' value={kyLuatMon1} onChange={(e) => {
                setKyLuatMon1(e.target.value)
            }} style={{ width: 'fit-content' }}>
                <option value=''>HTKL</option>
                {
                    listHTKL.map(item => {
                        return (
                            <option key={item.maHinhthuc} value={item.maHinhthuc}>{item.tenHinhthuc}</option>
                        )
                    })
                }
            </Input>)
        },
        {
            name: 'Môn 2',
            sortable: true,
            minWidth: '150px',
            center: true,
            selector: checkVipham.klMon2 ? row => <span>Trừ {row.klMon2}%</span> : row => (<Input type='select' name='maTui' id='maTui' value={kyLuatMon2} onChange={(e) => {
                setKyLuatMon2(e.target.value)
            }} style={{ width: 'fit-content' }}>
                <option value=''>HTKL</option>
                {
                    listHTKL.map(item => {
                        return (
                            <option key={item.maHinhthuc} value={item.maHinhthuc}>{item.tenHinhthuc}</option>
                        )
                    })
                }
            </Input>)
        },
        {
            name: 'Môn 3',
            sortable: true,
            minWidth: '150px',
            center: true,
            selector: checkVipham.klMon3 ? row => <span>Trừ {row.klMon3}%</span> : row => (<Input type='select' name='maTui' id='maTui' value={kyLuatMon3} onChange={(e) => {
                setKyLuatMon3(e.target.value)
            }} style={{ width: 'fit-content' }}>
                <option value=''>HTKL</option>
                {
                    listHTKL.map(item => {
                        return (
                            <option key={item.maHinhthuc} value={item.maHinhthuc}>{item.tenHinhthuc}</option>
                        )
                    })
                }
            </Input>)
        },
    ]
    const _handleAddDanhSach = async () => {
        const res = await addDanhSachViPham({ maHoSo, kyLuatMon1, kyLuatMon2, kyLuatMon3 })
        responseResultHelper(res, '', '', ACTION_METHOD_TYPE.CREATED)
        fetchDSVipham()
    }
    const fetchData = async (callAPI, setData) => {
        callAPI({
            page: 1,
            perPage: 100
        }).then(res => {
            setData(res.result.data)
        }).catch(err => {
            return (
                <Alert color="danger">
                    Có lỗi khi gọi dữ liệu
                </Alert>
            )
        })
    }
    useEffect(() => {
        fetchData(getListHinhThucKyLuat, setListHTKL)
    }, [currentPage, perPage])
    return (
        <Fragment>
            <Card style={{ backgroundColor: 'white' }}>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                    <CardTitle tag='h5'>Thêm vi phạm </CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                        <Button className='ms-2' color='primary' onClick={_handleAddDanhSach} disabled={checkVipham.klMon1 && checkVipham.klMon2 && checkVipham.klMon3}>
                            <span className='align-middle ms-50'>Lưu vi phạm</span>
                        </Button>
                    </div>
                </CardHeader>
                <div className='react-dataTable react-dataTable-selectable-rows' style={{ marginRight: '20px', marginLeft: '20px' }}>
                    <DataTable
                        noHeader
                        striped
                        className='react-dataTable'
                        columns={columns}
                        data={checkVipham ? [checkVipham] : data}
                    />
                </div>
            </Card>
        </Fragment>
    )
}

export default AddViPham

