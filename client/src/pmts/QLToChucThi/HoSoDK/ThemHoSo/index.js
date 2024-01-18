// ** Reactstrap Imports
import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label, Alert } from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from 'react-flatpickr'

// imporrt các api danh mục
import { getListDiaDiemToChucThi } from '../../../../api/diaDiemToChucThi'
import { getListDiaChiDaoTao } from '../../../../api/diaChiDaoTao'
import { getListTruongDaiHoc } from '../../../../api/truongDaiHoc'
import { getListNganhDaiHoc } from '../../../../api/nganhDaiHoc'
import { getListChuyenNganh } from '../../../../api/chuyenNganh'
import { getListChuyenNganhHep } from '../../../../api/chuyenNganhHep'
import { getListLoaiHinhDaoTao } from '../../../../api/loaiHinhDaoTao'
import { getListHinhThucUuTien } from '../../../../api/hinhThucUuTien'
import { getListPhanLoaiTotNghiep } from '../../../../api/phanloaiTotNghiep'

import { taoHoSoDangKi, upLoadImage } from '../../../../api/hoSoDangKi'
import responseResultHelper from '../../../utils/reponsive'
import { ACTION_METHOD_TYPE } from '../../../utils/constant'

const ThemHoSo = () => {
  const avatar = require('@src/assets/images/avatars/default.jpg').default
  const [file, setFile] = useState(null)
  const [url, setUrl] = useState(avatar)
  const [loading, setLoading] = useState(false)

  const [infoHoSo, setInfoHoso] = useState({
    soBaodanh: '',
    soTT: '',
    STT: '',
    loaiTS: 'Quân sự',
    hoTen: null,
    ngaySinh: null,
    gioiTinh: 'Nam',
    noiSinh: null,
    coQuan: '',
    namTN: '',
    capBac: '',
    chucVu: '',
    ngoaiNgu: 'Anh Văn',
    hinhThucthiNN: 'Tập trung',
    diaChi: '',
    dienThoai: '',
    thiNCS: false,
    tenDetai: '',
    giaoVienHD1: '',
    giaoVienHD2: '',
    fileAnh: '',
    ghiChu: '',
    maDidiem: null,
    maDcdaotao: null,
    maTruong: null,
    maNganh: null,
    maLoaihinh: null,
    maPhanloai: null,
    maChuyennganhTS: null,
    maChuyennganhhep: null,
    maHinhthuc: null,
  })
  const [err, setErr] = useState({
    hoTen: '',
    ngaySinh: '',
    noiSinh: '',
    maDidiem: '',
    maDcdaotao: '',
    maChuyennganhTS: '',
    STT: ''
  })
  const [listDiadiem, setListDiadiem] = useState([])
  const [listDcdt, setListdcdt] = useState([])
  const [listTDH, setListTDH] = useState([])
  const [listNganh, setListNganh] = useState([])
  const [listLHDT, setListLHDT] = useState([])
  const [listLTN, setListLTN] = useState([])
  const [listCN, setListCN] = useState([])
  const [listCNH, setListCNH] = useState([])
  const [listDTUT, setListDTUT] = useState([])

  const constant = {
    hoTen: 'Họ tên không được để trống',
    ngaySinh: 'Ngày sinh không được để trống',
    noiSinh: 'Nơi sinh không được để trống',
    maDidiem: 'Chưa chọn địa điểm thi',
    maDcdaotao: 'Chưa chọn địa chỉ đào tạo',
    maChuyennganhTS: 'Chưa chọn chuyên nghành tuyển sinh',
    STT: 'Mã hồ sơ không được để trống'
  }
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

  }, [])
  const handaleTaoHoSo = async () => {
    setLoading(true)
    //check validation 
    if (infoHoSo.hoTen !== null && infoHoSo.ngaySinh !== null && infoHoSo.noiSinh !== null && infoHoSo.maDidiem !== null && infoHoSo.maDcdaotao !== null && infoHoSo.maChuyennganhTS !== null) {
      if (file !== null) {
        const formData = new FormData()
        formData.append("file", file)
        const responsive = await upLoadImage(formData)
        if (responsive.status) {
          infoHoSo['fileAnh'] = responsive.result
          setFile(null)
          setUrl(avatar)
        }
      }
      const res = await taoHoSoDangKi(infoHoSo)
      responseResultHelper(res, null, null, ACTION_METHOD_TYPE.CREATED)
      setInfoHoso({
        soBaodanh: '',
        soTT: '',
        STT: null,
        loaiTS: 'Quân sự',
        hoTen: null,
        ngaySinh: null,
        gioiTinh: 'Nam',
        noiSinh: null,
        coQuan: '',
        namTN: '',
        capBac: '',
        chucVu: '',
        ngoaiNgu: 'Anh Văn',
        hinhThucthiNN: 'Tập trung',
        diaChi: '',
        dienThoai: '',
        thiNCS: false,
        tenDetai: '',
        giaoVienHD1: '',
        giaoVienHD2: '',
        fileAnh: '',
        ghiChu: '',
        maDidiem: null,
        maDcdaotao: null,
        maTruong: null,
        maNganh: null,
        maLoaihinh: null,
        maPhanloai: null,
        maChuyennganhTS: null,
        maChuyennganhhep: null,
        maHinhthuc: null,
      })
    } else {
      const temp = {
        hoTen: '',
        ngaySinh: '',
        noiSinh: '',
        maDidiem: '',
        maDcdaotao: '',
        maChuyennganhTS: '',
        STT:'',
      }
      for (const key in temp) {
        if (infoHoSo[key] === null) {
          temp[key] = constant[key]
        }
      }
      setErr(temp)
    }
    setLoading(false)
  }
  const handleOnChangeFile = (e) => {
    setFile(e.target.files[0])
    setUrl(URL.createObjectURL(e.target.files[0]))
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Thêm hồ sơ đăng kí dự thi</CardTitle>
      </CardHeader>
      <CardBody>
        <Form>
          <Row>
            <Row>
              <Col md='3' sm='12' >
                <img src={url} style={{ width: '100%' }}></img>
                <Input type='file' onChange={e => handleOnChangeFile(e)}></Input>
              </Col>
              <Col md='9' sm='12' >
                <Row>
                  <Col md='2' sm='12' className='mb-1'>
                    <Label className='form-label' for='nameMulti'>
                      Mã hồ sơ <span style={{ color: 'red' }}>(*)</span>
                    </Label>
                    <Input type='text' name='name' id='nameMulti' placeholder='Mã hồ sơ' onChange={e => handleOnChangeInput(e.target.value, 'STT')} />
                    <span style={{ color: 'red', fontSize: '10px' }}><i>{err.STT}</i></span>

                  </Col>
                  <Col md='10' sm='12' className='mb-1'>
                    <Label className='form-label' for='lastNameMulti'>
                      Thuộc diện
                    </Label>
                    <div className='demo-inline-spacing'>
                      <div className='form-check' style={{ marginTop: '0.5rem' }}>
                        <Input type='radio' id='loaiTS-active' name='loaiTS' checked={infoHoSo.loaiTS === 'Quân sự'} onClick={e => handleOnChangeInput('Quân sự', 'loaiTS')} />
                        <Label className='form-check-label' for='loaiTS-active'>
                          Quân sự
                        </Label>
                      </div>
                      <div className='form-check' style={{ marginTop: '0.5rem' }}>
                        <Input type='radio' name='loaiTS' id='loaiTS-inactive' checked={infoHoSo.loaiTS === 'Dân sự'} onClick={e => handleOnChangeInput('Dân sự', 'loaiTS')} />
                        <Label className='form-check-label' for='loaiTS-inactive'>
                          Dân sự
                        </Label>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Col md='12' sm='12' className='mb-1'>
                  <Label className='form-label' for='maDidiem'>
                    Địa điểm thi <span style={{ color: 'red' }}>(*)</span>
                  </Label>
                  <Input type='select' name='maDidiem' id='maDidiem' placeholder='Địa điểm thi' value={infoHoSo.maDidiem} onChange={e => handleOnChangeInput(e.target.value, 'maDidiem')}>
                    <option value={null}>Chọn địa điểm thi</option>
                    {
                      listDiadiem.map(item => {
                        return (
                          <option value={item.maDidiem}>{item.tenDiadiem}</option>
                        )
                      })
                    }
                  </Input>
                  <span style={{ color: 'red', fontSize: '10px' }}><i>{err.maDidiem}</i></span>

                </Col>
                <Col md='12' sm='12' className='mb-1'>
                  <Label className='form-label' for='maDcdaotao'>
                    Địa chỉ đào tạo <span style={{ color: 'red', fontSize: '10px' }}>(*)</span>
                  </Label>
                  <Input type='select' name='maDcdaotao' id='maDcdaotao' value={infoHoSo.maDcdaotao} placeholder='Địa chỉ đào tạo' onChange={e => handleOnChangeInput(e.target.value, 'maDcdaotao')}>
                    <option value={null}>Chọn địa chỉ đào tạo</option>
                    {
                      listDcdt.map(item => {
                        return (
                          <option value={item.maDcdaotao}>{item.tenDc}</option>
                        )
                      })
                    }
                  </Input>
                  <span style={{ color: 'red', fontSize: '10px' }}><i>{err.maDcdaotao}</i></span>

                </Col>
              </Col>
            </Row>

            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='hoTen'>
                Họ và tên <span style={{ color: 'red' }}>(*)</span>
              </Label>
              <Input type='text' name='hoTen' id='hoTen' placeholder='Họ và tên thí sinh' value={infoHoSo.hoTen} onChange={e => handleOnChangeInput(e.target.value, 'hoTen')} />
              <span style={{ color: 'red', fontSize: '10px' }}><i>{err.hoTen}</i></span>
            </Col>
            <Col md='3' sm='12' className='mb-1'>
              <Label className='form-label' for='ngaySinh'>
                Ngày sinh <span style={{ color: 'red' }}>(*)</span>
              </Label>
              <Flatpickr className='form-control' id='ngaySinh' value={infoHoSo.ngaySinh} style={{ backgroundColor: 'white' }} options={{
                dateFormat: "d-m-Y"
              }} onChange={date => handleOnChangeInput(date[0], 'ngaySinh')} />
              <span style={{ color: 'red', fontSize: '10px' }}><i>{err.ngaySinh}</i></span>

            </Col>
            <Col md='3' sm='12' className='mb-1'>
              <Label className='form-label' for='gioiTinh'>
                Giới tính
              </Label>
              <Input type='select' name='gioiTinh' id='gioiTinh' value={infoHoSo.gioiTinh} onChange={e => handleOnChangeInput(e.target.value, 'gioiTinh')}>
                <option value={'Nam'}>Nam</option>
                <option value={'Nữ'}>Nữ</option>
              </Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='noiSinh' >
                Nơi sinh <span style={{ color: 'red' }}>(*)</span>
              </Label>
              <Input type='text' name='noiSinh' id='noiSinh' value={infoHoSo.noiSinh} placeholder='Nhập nơi sinh' onChange={e => handleOnChangeInput(e.target.value, 'noiSinh')} />
              <span style={{ color: 'red', fontSize: '10px' }}><i>{err.noiSinh}</i></span>

            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='coQuan'>
                Cơ quan
              </Label>
              <Input type='text' name='coQuan' id='coQuan' value={infoHoSo.coQuan} placeholder='Nhập cơ quan' onChange={e => handleOnChangeInput(e.target.value, 'coQuan')} />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='maTruong'>
                Tốt nghiệp đại học
              </Label>
              <Input type='select' name='maTruong' id='maTruong' value={infoHoSo.maTruong} placeholder='Trường đại học' onChange={e => handleOnChangeInput(e.target.value, 'maTruong')}>
                <option value={null}>Chọn trường đại học</option>
                {
                  listTDH.map(item => {
                    return (
                      <option value={item.maTruong}>{item.tenTruong}</option>
                    )
                  })
                }
              </Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='maNganh'>
                Ngành
              </Label>
              <Input type='select' name='maTruong' id='maNganh' value={infoHoSo.maNganh} placeholder='ngành đại học' onChange={e => handleOnChangeInput(e.target.value, 'maNganh')}>
                <option value={null}>Chọn ngành</option>
                {
                  listNganh.map(item => {
                    return (
                      <option value={item.maNganh}>{item.tenNganh}</option>
                    )
                  })
                }
              </Input>
            </Col>
            <Col md='4' sm='12' className='mb-1'>
              <Label className='form-label' for='maLoaihinh'>
                Loại hình đào tạo
              </Label>
              <Input type='select' name='maLoaihinh' id='maLoaihinh' value={infoHoSo.maLoaihinh} onChange={e => handleOnChangeInput(e.target.value, 'maLoaihinh')}>
                <option value={null}>Chọn loại hình đào tạo</option>
                {
                  listLHDT.map(item => {
                    return (
                      <option value={item.maLoaihinh}>{item.tenLoaihinh}</option>
                    )
                  })
                }
              </Input>
            </Col>
            <Col md='4' sm='12' className='mb-1'>
              <Label className='form-label' for='namTN'>
                Năm tốt nghiệp
              </Label>
              <Input type='number' name='namTN' id='namTN' value={infoHoSo.namTN} onChange={e => handleOnChangeInput(e.target.value, 'namTN')} />
            </Col>
            <Col md='4' sm='12' className='mb-1'>
              <Label className='form-label' for='maPhanloai'>
                Loại tốt nghiệp
              </Label>
              <Input type='select' name='maPhanloai' value={infoHoSo.maPhanloai} id='maPhanloai' onChange={e => handleOnChangeInput(e.target.value, 'maPhanloai')}>
                <option value={null}>Chọn loại tốt nghiệp</option>
                {
                  listLTN.map(item => {
                    return (
                      <option value={item.maPhanloai}>{item.tenPhanloai}</option>
                    )
                  })
                }
              </Input>
            </Col>
            <Col md='12' sm='12' className='mb-1'>
              <Label className='form-label' for='capBac' >
                Cấp bậc
              </Label>
              <Input type='text' name='capBac' value={infoHoSo.capBac} id='capBac' placeholder='Nhập cấp bậc' onChange={e => handleOnChangeInput(e.target.value, 'capBac')} />
            </Col>
            {/* <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='chucVu'>
                Chức vụ
              </Label>
              <Input type='text' name='chucVu' value={infoHoSo.chucVu} id='chucVu' placeholder='Nhập chức vụ' onChange={e => handleOnChangeInput(e.target.value, 'chucVu')} />
            </Col> */}
            <Col md='12' sm='12' className='mb-1'>
              <Label className='form-label' for='maChuyennganhTS'>
                Đăng kí dự thi chuyên ngành <span style={{ color: 'red' }}>(*)</span>
              </Label>
              <Input type='select' name='maChuyennganhTS' value={infoHoSo.maChuyennganhTS} id='maChuyennganhTS' onChange={e => handleOnChangeInput(e.target.value, 'maChuyennganhTS')}>
                <option value={null}>Chọn chuyên ngành</option>
                {
                  listCN.map(item => {
                    return (
                      <option value={item.maChuyennganhTS}>{item.tenChuyennganh}</option>
                    )
                  })
                }
              </Input>
              <span style={{ color: 'red', fontSize: '10px' }}><i>{err.maChuyennganhTS}</i></span>

            </Col>
            {/* <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='maChuyennganhhep'>
                Chuyên ngành hẹp
              </Label>
              <Input type='select' name='maChuyennganhhep' value={infoHoSo.maChuyennganhhep} id='maChuyennganhhep' onChange={e => handleOnChangeInput(e.target.value, 'maChuyennganhhep')}>
                <option value={null}>Chọn chuyên ngành hẹp</option>
                {
                  listCNH.map(item => {
                    return (
                      <option value={item.maChuyennganhhep}>{item.tenChuyennganhhep}</option>
                    )
                  })
                }
              </Input>
            </Col> */}
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='ngoaiNgu'>
                Thi ngoại ngữ
              </Label>
              <Input type='select' name='ngoaiNgu' id='ngoaiNgu' value={infoHoSo.ngoaiNgu} onChange={e => handleOnChangeInput(e.target.value, 'ngoaiNgu')}>
                <option value={'Anh Văn'}>Anh Văn</option>
                <option value={'Nga Văn'}>Nga Văn</option>
                <option value={'Miễn thi'}>Miễn Thi</option>1
              </Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='hinhThucthiNN'>
                Hình thức
              </Label>
              <Input type='select' name='hinhThucthiNN' value={infoHoSo.hinhThucthiNN} id='hinhThucthiNN' onChange={e => handleOnChangeInput(e.target.value, 'hinhThucthiNN')}>
                <option value={'Tập trung'}>Tập trung</option>
                <option value={'Không tập trung'}>Không tập trung</option>
              </Input>
            </Col>
            <Col md='12' sm='12' className='mb-1'>
              <Label className='form-label' for='maHinhthuc'>
                Đối tượng ưu tiên
              </Label>
              <Input type='select' name='maHinhthuc' id='maHinhthuc' value={infoHoSo.maHinhthuc} onChange={e => handleOnChangeInput(e.target.value, 'maHinhthuc')}>
                <option value={null}>Chọn đối tượng ưu tiên</option>
                {
                  listDTUT.map(item => {
                    return (
                      <option value={item.maHinhthuc}>{item.tenHinhthuc}</option>
                    )
                  })
                }
              </Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='diaChi'>
                Địa chỉ
              </Label>
              <Input type='text' name='diaChi' id='diaChi' value={infoHoSo.diaChi} placeholder='Nhập địa chỉ' onChange={e => handleOnChangeInput(e.target.value, 'diaChi')} />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='dienThoai'>
                Điện thoại
              </Label>
              <Input type='text' name='dienThoai' id='dienThoai' value={infoHoSo.dienThoai} placeholder='Nhập số điện thoại' onChange={e => handleOnChangeInput(e.target.value, 'dienThoai')} />
            </Col>
            <Col md='12' sm='12' className='mb-1'>
              <Label className='form-label' for='ghiChu'>
                Ghi chú
              </Label>
              <Input type='text' name='ghiChu' id='ghiChu' value={infoHoSo.ghiChu} placeholder='ghi chú' onChange={e => handleOnChangeInput(e.target.value, 'ghiChu')} />
            </Col>
            <Col md='12' sm='12' className='mb-1'>
              <Row>
                <Col md='2' sm='12' className='mb-1'>

                  <div className='demo-inline-spacing'>
                    <div className='form-check' style={{ marginTop: '1.7rem' }}>
                      <Input type='radio' id='thiNCS' name='thiNCS' checked={infoHoSo.thiNCS} onClick={e => handleOnChangeInput(!infoHoSo.thiNCS, 'thiNCS')} />
                      <Label className='form-label' for='thiNCS'>
                        Thi NCS
                      </Label>
                    </div>
                  </div>
                </Col>
                <Col md='10' sm='12' className='mb-1'>
                  {
                    infoHoSo.thiNCS === true ? <>
                      <Label className='form-label' for='tenDetai'>
                        Tên đề tài
                      </Label>
                      <Input type='text' name='tenDetai' id='tenDetai' value={infoHoSo.tenDetai} placeholder='Nhập tên đề tài' onChange={e => handleOnChangeInput(e.target.value, 'tenDetai')} />
                    </> : <></>
                  }
                </Col>
              </Row>
            </Col>
            {
              infoHoSo.thiNCS === true ? <><Col md='12' sm='12' className='mb-1'>
                <Label className='form-label' for='EmailMulti'>
                  Giáo viên hướng dẫn
                </Label>
                <Row>
                  <Col md='6' sm='12' className='mb-1'>
                    <Input type='text' name='giaoVienHD1' id='giaoVienHD1' value={infoHoSo.giaoVienHD1} placeholder='Giáo viên hướng dẫn 1' onChange={e => handleOnChangeInput(e.target.value, 'giaoVienHD1')} />
                  </Col>
                  <Col md='6' sm='12' className='mb-1'>
                    <Input type='text' name='giaoVienHD2' id='giaoVienHD2' value={infoHoSo.giaoVienHD2} placeholder='Giáo viên hướng dẫn 2' onChange={e => handleOnChangeInput(e.target.value, 'giaoVienHD2')} />
                  </Col>
                </Row>
              </Col></> : <></>
            }

            <Col sm='12'>
              <div className='d-flex'>
                <Button className='me-1' color='primary' onClick={e => handaleTaoHoSo()}>
                { loading ? <div className='loader'></div> : 'Thêm'}
                </Button>
                <Button outline color='secondary' type='reset'>
                  Hủy
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}
export default ThemHoSo
