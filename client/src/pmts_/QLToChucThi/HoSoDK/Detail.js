// ** Reactstrap Imports
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label, Alert } from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from 'react-flatpickr'


// imporrt các api danh mục

import { getChiTietHoSo, suaHoSoDangKi, upLoadImage } from '../../../api/hoSoDangKi'
import responseResultHelper from '../../utils/reponsive'
import { ACTION_METHOD_TYPE } from '../../utils/constant'

import axios from 'axios'
import { getListDiaDiemToChucThi } from '../../../api/diaDiemToChucThi'
import { getListDiaChiDaoTao } from '../../../api/diaChiDaoTao'
import { getListTruongDaiHoc } from '../../../api/truongDaiHoc'
import { getListNganhDaiHoc } from '../../../api/nganhDaiHoc'
import { getListLoaiHinhDaoTao } from '../../../api/loaiHinhDaoTao'
import { getListPhanLoaiTotNghiep } from '../../../api/phanloaiTotNghiep'
import { getListChuyenNganh } from '../../../api/chuyenNganh'
import { getListChuyenNganhHep } from '../../../api/chuyenNganhHep'
import { getListHinhThucUuTien } from '../../../api/hinhThucUuTien'
import { toDateString } from '../../../utility/Utils'
const Detail = ({ row }) => {
    const inputFile = useRef(null)
    const [loading, setLoading] = useState(false)

    const avatar = require('@src/assets/images/avatars/default.jpg').default
    const [file, setFile] = useState(null)
    const [url, setUrl] = useState(avatar)
    const [infoHoSo, setInfoHoso] = useState({})
    const [listDiadiem, setListDiadiem] = useState([])
    const [listDcdt, setListdcdt] = useState([])
    const [listTDH, setListTDH] = useState([])
    const [listNganh, setListNganh] = useState([])
    const [listLHDT, setListLHDT] = useState([])
    const [listLTN, setListLTN] = useState([])
    const [listCN, setListCN] = useState([])
    const [listCNH, setListCNH] = useState([])
    const [listDTUT, setListDTUT] = useState([])
    const [edit, setEdit] = useState(true)

    const handleOnChangeInput = (data, pop) => {
        setInfoHoso({ ...infoHoSo, [pop]: data })
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
    const fetchDetail = async () => {
        getChiTietHoSo({ id: row.data.maHoso }).then(res => {
            setInfoHoso(res.result.data)
            const url = process.env.REACT_APP_API_URL_NEW
            if (res.result.data.fileAnh) {
                axios.get(`${url}/public/images/${localStorage.getItem('dbName')}/${res.result.data.fileAnh}`)
                    .then(respnsive => {
                        setUrl(`${url}/public/images/${localStorage.getItem('dbName')}/${res.result.data.fileAnh}`)
                    })
            }
        }).catch(err => {
            return (
                <Alert color="danger">
                    Có lỗi khi gọi dữ liệu
                </Alert>
            )
        })
    }
    useEffect(() => {
        fetchData(getListDiaDiemToChucThi, setListDiadiem)
        fetchData(getListDiaChiDaoTao, setListdcdt)
        fetchData(getListTruongDaiHoc, setListTDH)
        fetchData(getListNganhDaiHoc, setListNganh)
        fetchData(getListLoaiHinhDaoTao, setListLHDT)
        fetchData(getListPhanLoaiTotNghiep, setListLTN)
        fetchData(getListChuyenNganh, setListCN)
        fetchData(getListChuyenNganhHep, setListCNH)
        fetchData(getListHinhThucUuTien, setListDTUT)
        fetchDetail()
    }, [row])
    const handaleSuaHoSo = async () => {
        setLoading(true)
        if (file !== null) {
            const formData = new FormData()
            formData.append("file", file)
            formData.append('dbName', localStorage.getItem('dbName'))

            const responsive = await upLoadImage(formData)
            if (responsive.status) {
                infoHoSo['fileAnh'] = responsive.result
            }
        }
        const res = await suaHoSoDangKi(infoHoSo)
        responseResultHelper(res, null, fetchDetail, ACTION_METHOD_TYPE.UPDATE)
        setEdit(true)
        setLoading(false)
    }
    const handleCancel = () => {
        setEdit(true)
        fetchDetail()
    }
    const onImportFileClick = () => {
        // `current` points to the mounted file input element
        if (edit === false) {
            inputFile.current.click()

        }
        // console.log(inputFile)
    }
    const handleOnChangeFile = (e) => {
        setFile(e.target.files[0])
        setUrl(URL.createObjectURL(e.target.files[0]))
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Chi tiết hồ sơ đăng kí dự thi - <span style={{ fontWeight: 'bold' }}>{infoHoSo?.hoTen}</span> </CardTitle>
                <Button className='me-1' color='primary' style={{ display: edit === true ? 'block' : 'none' }} onClick={e => setEdit(false)}>
                    Cập nhật thông tin hồ sơ
                </Button>
            </CardHeader>

            <CardBody>
                <Form>
                    <Row>
                        <Row>
                            <Col md='3' sm='12' >
                                <img src={url} style={{ width: '100%', cursor: 'pointer' }} onClick={onImportFileClick}></img>
                                {
                                    edit === true ? <></> : <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={e => handleOnChangeFile(e)} />

                                }
                            </Col>
                            <Col md='9' sm='12' >
                                <Row>
                                    <Col md='2' sm='12' className='mb-1'>
                                        <Label className='form-label' for='nameMulti'>
                                            Mã hồ sơ
                                        </Label>
                                        <Input type='text' name='name' id='nameMulti' placeholder='Mã hồ sơ' disabled value={infoHoSo?.STT} />
                                    </Col>
                                    <Col md='10' sm='12' className='mb-1'>
                                        <Label className='form-label' for='lastNameMulti'>
                                            Thuộc diện
                                        </Label>
                                        <div className='demo-inline-spacing'>
                                            <div className='form-check' style={{ marginTop: '0.5rem' }}>
                                                <Input type='radio' id='loaiTS-active' disabled={edit} name='loaiTS' checked={infoHoSo?.loaiTS === 'Quân sự'} onClick={e => handleOnChangeInput('Quân sự', 'loaiTS')} />
                                                <Label className='form-check-label' for='loaiTS-active'>
                                                    Quân sự
                                                </Label>
                                            </div>
                                            <div className='form-check' style={{ marginTop: '0.5rem' }}>
                                                <Input type='radio' name='loaiTS' disabled={edit} id='loaiTS-inactive' checked={infoHoSo?.loaiTS === 'Dân sự'} onClick={e => handleOnChangeInput('Dân sự', 'loaiTS')} />
                                                <Label className='form-check-label' for='loaiTS-inactive'>
                                                    Dân sự
                                                </Label>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Col md='12' sm='12' className='mb-1'>
                                    <Label className='form-label' for='maDidiem'>
                                        Địa điểm thi
                                    </Label>
                                    <Input type='select' name='maDidiem' id='maDidiem' disabled={edit} placeholder='Địa điểm thi' value={infoHoSo?.maDidiem} onChange={e => handleOnChangeInput(e.target.value, 'maDidiem')}>
                                        <option>Chọn địa điểm thi</option>
                                        {
                                            listDiadiem.map(item => {
                                                return (
                                                    <option value={item.maDidiem}>{item.tenDiadiem}</option>
                                                )
                                            })
                                        }
                                    </Input>
                                </Col>
                                <Col md='12' sm='12' className='mb-1'>
                                    <Label className='form-label' for='maDcdaotao'>
                                        Địa chỉ đào tạo
                                    </Label>
                                    <Input type='select' name='maDcdaotao' id='maDcdaotao' disabled={edit} value={infoHoSo?.maDcdaotao} placeholder='Địa chỉ đào tạo' onChange={e => handleOnChangeInput(e.target.value, 'maDcdaotao')}>
                                        <option>Chọn địa chỉ đào tạo</option>
                                        {
                                            listDcdt.map(item => {
                                                return (
                                                    <option value={item.maDcdaotao}>{item.tenDc}</option>
                                                )
                                            })
                                        }
                                    </Input>
                                </Col>
                            </Col>
                        </Row>
                                <Row>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='hoTen'>
                                Họ và tên
                            </Label>
                            <Input type='text' name='hoTen' id='hoTen' disabled={edit} placeholder='Họ và tên thí sinh' value={infoHoSo?.hoTen} onChange={e => handleOnChangeInput(e.target.value, 'hoTen')} />
                        </Col>
                        <Col md='3' sm='12' className='mb-1'>
                            <Label className='form-label' for='ngaySinh'>
                                Ngày sinh
                            </Label>
                            {
                                edit === true ? <Input type='text' name='ngaySinh' id='ngaySinh' disabled value={toDateString(infoHoSo?.ngaySinh)} /> : <Flatpickr className='form-control' id='ngaySinh' value={infoHoSo.ngaySinh} options={{
                                    dateFormat: "d-m-Y",
                                }} onChange={date => handleOnChangeInput(date[0], 'ngaySinh')} />
                            }
                        </Col>
                        <Col md='3' sm='12' className='mb-1'>
                            <Label className='form-label' for='gioiTinh'>
                                Giới tính
                            </Label>
                            <Input type='select' name='gioiTinh' disabled={edit} id='gioiTinh' value={infoHoSo?.gioiTinh} onChange={e => handleOnChangeInput(e.target.value, 'gioiTinh')}>
                                <option value={'Nam'}>Nam</option>
                                <option value={'Nữ'}>Nữ</option>
                            </Input>
                        </Col>
                        </Row>
                        <Row>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='noiSinh' >
                                Nơi sinh
                            </Label>
                            <Input type='text' name='noiSinh' id='noiSinh' disabled={edit} value={infoHoSo?.noiSinh} placeholder='Nhập nơi sinh' onChange={e => handleOnChangeInput(e.target.value, 'noiSinh')} />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='capBac' >
                                Cấp bậc
                            </Label>
                            <Input type='text' name='capBac' disabled={edit} value={infoHoSo?.capBac} id='capBac' placeholder='Nhập cấp bậc' onChange={e => handleOnChangeInput(e.target.value, 'capBac')} />
                        </Col>
                        </Row>
                        <Row>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='coQuan'>
                                Cơ quan
                            </Label>
                            <Input type='text' name='coQuan' id='coQuan' disabled={edit} value={infoHoSo?.coQuan} placeholder='Nhập cơ quan' onChange={e => handleOnChangeInput(e.target.value, 'coQuan')} />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='maTruong'>
                                Tốt nghiệp đại học
                            </Label>
                            <Input type='select' name='maTruong' id='maTruong' disabled={edit} value={infoHoSo?.maTruong} placeholder='Trường đại học' onChange={e => handleOnChangeInput(e.target.value, 'maTruong')}>
                                <option>Chọn trường đại học</option>
                                {
                                    listTDH.map(item => {
                                        return (
                                            <option value={item.maTruong}>{item.tenTruong}</option>
                                        )
                                    })
                                }
                            </Input>
                        </Col>
                        </Row>
                        <Row>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='maNganh'>
                                Ngành
                            </Label>
                            <Input type='select' name='maTruong' id='maNganh' disabled={edit} value={infoHoSo?.maNganh} placeholder='ngành đại học' onChange={e => handleOnChangeInput(e.target.value, 'maNganh')}>
                                <option>Chọn ngành</option>
                                {
                                    listNganh.map(item => {
                                        return (
                                            <option value={item.maNganh}>{item.tenNganh}</option>
                                        )
                                    })
                                }
                            </Input>
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='maLoaihinh'>
                                Loại hình đào tạo
                            </Label>
                            <Input type='select' name='maLoaihinh' id='maLoaihinh' disabled={edit} value={infoHoSo?.maLoaihinh} onChange={e => handleOnChangeInput(e.target.value, 'maLoaihinh')}>
                                <option>Chọn loại hình đào tạo</option>
                                {
                                    listLHDT.map(item => {
                                        return (
                                            <option value={item.maLoaihinh}>{item.tenLoaihinh}</option>
                                        )
                                    })
                                }
                            </Input>
                        </Col>
                        </Row>
                        <Row>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='namTN'>
                                Năm tốt nghiệp
                            </Label>
                            <Input type='number' name='namTN' id='namTN' disabled={edit} value={infoHoSo?.namTN} onChange={e => handleOnChangeInput(e.target.value, 'namTN')} />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='maPhanloai'>
                                Loại tốt nghiệp
                            </Label>
                            <Input type='select' name='maPhanloai' disabled={edit} value={infoHoSo?.maPhanloai} id='maPhanloai' onChange={e => handleOnChangeInput(e.target.value, 'maPhanloai')}>
                                <option>Chọn loại tốt nghiệp</option>
                                {
                                    listLTN.map(item => {
                                        return (
                                            <option value={item.maPhanloai}>{item.tenPhanloai}</option>
                                        )
                                    })
                                }
                            </Input>
                        </Col>
                        </Row>
                        
                        {/* <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='chucVu'>
                                Chức vụ
                            </Label>
                            <Input type='text' name='chucVu' disabled={edit} value={infoHoSo.chucVu} id='chucVu' placeholder='Nhập chức vụ' onChange={e => handleOnChangeInput(e.target.value, 'chucVu')} />
                        </Col> */}
                        <Row>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='maChuyennganhTS'>
                                Đăng kí dự thi chuyên ngành
                            </Label>
                            <Input type='select' name='maChuyennganhTS' disabled={edit} value={infoHoSo?.maChuyennganhTS} id='maChuyennganhTS' onChange={e => handleOnChangeInput(e.target.value, 'maChuyennganhTS')}>
                                <option>Chọn chuyên ngành</option>
                                {
                                    listCN.map(item => {
                                        return (
                                            <option value={item.maChuyennganhTS}>{item.tenChuyennganh}</option>
                                        )
                                    })
                                }
                            </Input>
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='ngoaiNgu'>
                                Thi ngoại ngữ
                            </Label>
                            <Input type='select' name='ngoaiNgu' disabled={edit} id='ngoaiNgu' value={infoHoSo?.ngoaiNgu} onChange={e => handleOnChangeInput(e.target.value, 'ngoaiNgu')}>
                                <option value={'Anh Văn'}>Anh Văn</option>
                                <option value={'Nga Văn'}>Nga Văn</option>
                                <option value={'Miễn Thi'}>Miễn Thi</option>
                            </Input>
                        </Col>
                        </Row>
                        {/* <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='maChuyennganhhep'>
                                Chuyên ngành hẹp
                            </Label>
                            <Input type='select' name='maChuyennganhhep' disabled={edit} value={infoHoSo.maChuyennganhhep} id='maChuyennganhhep' onChange={e => handleOnChangeInput(e.target.value, 'maChuyennganhhep')}>
                                <option>Chọn chuyên ngành hẹp</option>
                                {
                                    listCNH.map(item => {
                                        return (
                                            <option value={item.maChuyennganhhep}>{item.tenChuyennganhhep}</option>
                                        )
                                    })
                                }
                            </Input>
                        </Col> */}
                       <Row>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='hinhThucthiNN'>
                                Hình thức
                            </Label>
                            <Input type='select' name='hinhThucthiNN' disabled={edit} value={infoHoSo?.hinhThucthiNN} id='hinhThucthiNN' onChange={e => handleOnChangeInput(e.target.value, 'hinhThucthiNN')}>
                                <option value={'Tập trung'}>Tập trung</option>
                                <option value={'Không tập trung'}>Không tập trung</option>
                            </Input>
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='maHinhthuc'>
                                Đối tượng ưu tiên
                            </Label>
                            <Input type='select' name='maHinhthuc' disabled={edit} id='maHinhthuc' value={infoHoSo?.maHinhthuc} onChange={e => handleOnChangeInput(e.target.value, 'maHinhthuc')}>
                                <option>Chọn đối tượng ưu tiên</option>
                                {
                                    listDTUT.map(item => {
                                        return (
                                            <option value={item.maHinhthuc}>{item.tenHinhthuc}</option>
                                        )
                                    })
                                }
                            </Input>
                        </Col>
                        </Row>
                        <Row>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='diaChi'>
                                Địa chỉ
                            </Label>
                            <Input type='text' name='diaChi' id='diaChi' disabled={edit} value={infoHoSo?.diaChi} placeholder='Nhập địa chỉ' onChange={e => handleOnChangeInput(e.target.value, 'diaChi')} />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='dienThoai'>
                                Điện thoại
                            </Label>
                            <Input type='text' name='dienThoai' disabled={edit} id='dienThoai' value={infoHoSo?.dienThoai} placeholder='Nhập số điện thoại' onChange={e => handleOnChangeInput(e.target.value, 'dienThoai')} />
                        </Col>
                        </Row>
                        <Row>
                        <Col md='12' sm='12' className='mb-1'>
                            <Label className='form-label' for='ghiChu'>
                                Ghi chú
                            </Label>
                            <Input type='text' name='ghiChu' disabled={edit} id='ghiChu' value={infoHoSo?.ghiChu} placeholder='ghi chú' onChange={e => handleOnChangeInput(e.target.value, 'ghiChu')} />
                        </Col>
                        </Row>
                        <Row>
                        <Col md='12' sm='12' className='mb-1'>
                            <Row>
                                <Col md='2' sm='12' className='mb-1'>

                                    <div className='demo-inline-spacing'>
                                        <div className='form-check' style={{ marginTop: '1.7rem' }}>
                                            <Input type='radio' id='thiNCS' disabled={edit} name='thiNCS' checked={infoHoSo?.thiNCS} onClick={e => handleOnChangeInput(!infoHoSo.thiNCS, 'thiNCS')} />
                                            <Label className='form-label' for='thiNCS'>
                                                Thi NCS
                                            </Label>
                                        </div>
                                    </div>
                                </Col>
                                <Col md='10' sm='12' className='mb-1'>
                                    <Label className='form-label' for='tenDetai'>
                                        Tên đề tài
                                    </Label>
                                    <Input type='text' name='tenDetai' disabled={edit} id='tenDetai' value={infoHoSo?.tenDetai} placeholder='Nhập tên đề tài' onChange={e => handleOnChangeInput(e.target.value, 'tenDetai')} />
                                </Col>
                            </Row>
                        </Col>
                        </Row>
                        <Row>
                        <Col md='12' sm='12' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Giáo viên hướng dẫn
                            </Label>
                            <Row>
                                <Col md='6' sm='12' className='mb-1'>
                                    <Input type='text' name='giaoVienHD1' disabled={edit} id='giaoVienHD1' value={infoHoSo?.giaoVienHD1} placeholder='Giáo viên hướng dẫn 1' onChange={e => handleOnChangeInput(e.target.value, 'giaoVienHD1')} />
                                </Col>
                                <Col md='6' sm='12' className='mb-1'>
                                    <Input type='text' name='giaoVienHD2' disabled={edit} id='giaoVienHD2' value={infoHoSo?.giaoVienHD2} placeholder='Giáo viên hướng dẫn 2' onChange={e => handleOnChangeInput(e.target.value, 'giaoVienHD2')} />
                                </Col>
                            </Row>
                        </Col>
                        </Row>
                        <Col sm='12'>
                            <div className='d-flex'>
                                <Button className='me-1' color='primary' style={{ display: edit === true ? 'none' : 'block' }} onClick={e => handaleSuaHoSo()}>
                                { loading ? <div className='loader'></div> : 'Lưu'}
                                </Button>
                                <Button outline color='secondary' type='reset' style={{ display: edit === true ? 'none' : 'block' }} onClick={e => handleCancel()}>
                                    Hủy
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card >
    )
}
export default Detail
