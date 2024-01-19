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
import { TaoNhieuHoSoDangKi } from '../../../../api/hoSoDangKi'
import { toDateString } from '../../../../utility/Utils'
import { taoTruongDaiHoc } from '../../../../api/truongDaiHoc'
import { kiemTraNganh, taoNganhDaiHoc } from '../../../../api/nganhDaiHoc'
const ImportModal = ({ open, fetchUser, handleModal, listImport, listDiadiem, listDcdt, listTDHda, listNganhda, listLHDT, listLTN, listCN, listCNH, listDTUT }) => {
    // ** State
    // ** Custom close btn
    const [listTDH, setListTDH] = useState(listTDHda)
    const [listNganh, setListNganh] = useState(listNganhda)

    const [listErr, setListErr] = useState([])
    const [dataImport, setDataImport] = useState([])
    const [disabled, setDisable] = useState(true)
    const listColumn = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA']
    const columnsErr = [
        {
            name: 'Lỗi',
            minWidth: '100px',
            selector: row => row.loi,

        },
        {
            name: 'Vị trí',
            minWidth: '200px',
            selector: row => row.Vitri,

        },
    ]
    const columnsData = [
        {
            name: 'STT',
            width: "70px",
            selector: row => row.soTT,

        },
        {
            name: 'Mã',
            maxWidth: '10px',
            selector: row => row.STT,

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
            name: 'Cơ quan',
            minWidth: '150px',
            selector: row => row.coQuan,
        },
        {
            name: 'Nơi sinh',
            minWidth: '150px',
            selector: row => row.noiSinh,
        },
        {
            name: 'GT',
            maxWidth: '50px',
            selector: row => row.gioiTinh,
        },
        {
            name: 'Trường ĐH',
            minWidth: '100px',
            selector: row => row.kiHieuTruong,
        },
        {
            name: 'Ngành DH',
            minWidth: '100px',
            selector: row => row.kihieuNganh,
        },
        {
            name: 'Ngành DKDT',
            minWidth: '100px',
            selector: row => row.kiHieuChuyennganh,
        },
    ]
    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
    const _handleXoaNMT = async () => {
        const res = await TaoNhieuHoSoDangKi(dataImport)
        responseResultHelper(res, handleModal, fetchUser, ACTION_METHOD_TYPE.IMPORTEXCEL)
    }
    // list các trường lỗi
    const checkErr = (listImport) => {
        const data = []

        const temp = []
        listImport.forEach((row, index) => {
            //kiểm tra stt
            const infoOneRow = {
                soBaodanh: '',
                soTT: '',
                STT: '',
                loaiTS: 'Quân sự',
                hoTen: null,
                ngaySinh: null,
                gioiTinh: 'Nam',
                noiSinh: '',
                coQuan: '',
                namTN: '',
                capBac: '',
                ngoaiNgu: 'Anh Văn',
                hinhThucthiNN: 'Tập trung',
                diaChi: '',
                dienThoai: '',
                thiNCS: false,
                tenDetai: '',
                giaoVienHD1: '',
                giaoVienHD2: '',
                tongDiem: 0,
                fileAnh: '',
                ghiChu: '',
                maDidiem: null,
                maDcdaotao: null,
                maTruong: null,
                kiHieuTruong: null,
                maNganh: null,
                kihieuNganh: null,
                maLoaihinh: null,
                maPhanloai: null,
                maChuyennganhTS: null,
                kiHieuChuyennganh: null,
                maChuyennganhhep: null,
                maHinhthuc: null,
            }
            infoOneRow.soTT = index + 1
            if (row[0] === null) {
                temp.push({
                    loi: 'STT không được để trống',
                    Vitri: `${listColumn[0]}${index + 2}`
                })
            } else {
                infoOneRow.STT = row[0]
                infoOneRow.fileAnh = `${row[0]}.jpg`
            }
            // kiểm tra mã nơi thi
            if (row[1] === null) {
                temp.push({
                    loi: 'Nơi thi không được để trống',
                    Vitri: `${listColumn[1]}${index + 2}`
                })
            } else if (!listDiadiem.find(e => e.KiHieuDiadiem === row[1])) {
                temp.push({
                    loi: `Không tìm thấy nơi thi tương ứng với mã "${row[1]}" trong cơ sở dữ liệu`,
                    Vitri: `${listColumn[1]}${index + 2}`
                })
            } else {
                infoOneRow.maDidiem = listDiadiem.find(e => e.KiHieuDiadiem === row[1]).maDidiem
            }
            // Kiểm tra Địa chỉ đào tạo
            if (row[2] === null) {
                temp.push({
                    loi: 'Địa chỉ đào tạo không được để trống',
                    Vitri: `${listColumn[2]}${index + 2}`
                })
            } else if (!listDcdt.find(e => e.KiHieuDc === row[2])) {
                temp.push({
                    loi: `Không tìm thấy địa chỉ đào tạo tương ứng với mã "${row[2]}" trong cơ sở dữ liệu`,
                    Vitri: `${listColumn[2]}${index + 2}`
                })
            } else {
                infoOneRow.maDcdaotao = listDcdt.find(e => e.KiHieuDc === row[2]).maDcdaotao
            }
            // Kiểm tra loại thí sinh
            if (row[3] === null) {
                temp.push({
                    loi: 'Loại thí sinh không được để trống',
                    Vitri: `${listColumn[3]}${index + 2}`
                })
            } else if (row[3] !== 1 && row[3] !== 2) {
                temp.push({
                    loi: 'Vui lòng chọn 1 cho thí sinh diện quân sự, 2 cho thí sinh diện dân sự',
                    Vitri: `${listColumn[3]}${index + 2}`
                })
            } else {
                infoOneRow.loaiTS = row[3] === 1 ? "Quân sự" : "Dân sự"
            }
            // kiểm tra tên
            if (row[4] === null) {
                temp.push({
                    loi: 'Tên thí sinh không được để trống',
                    Vitri: `${listColumn[4]}${index + 2}`
                })
            } else {
                infoOneRow.hoTen = row[4]
            }
            // kiểm tra ngày sinh
            if (row[5] === null) {
                temp.push({
                    loi: 'Ngày sinh không được để trống',
                    Vitri: `${listColumn[5]}${index + 2}`
                })
            } else {
                infoOneRow.ngaySinh = row[5]
            }
            // kiểm tra giới tính
            if (row[6] === null) {
                temp.push({
                    loi: 'Giới tính không được để trống',
                    Vitri: `${listColumn[6]}${index + 2}`
                })
            } else if (row[6] !== 'Nam' && row[6] !== 'Nữ') {
                temp.push({
                    loi: 'Vui lòng chọn "Nam" hoặc "Nữ"',
                    Vitri: `${listColumn[6]}${index + 2}`
                })
            } else {
                infoOneRow.gioiTinh = row[6]
            }
            // kiểm tra nơi sinh
            if (row[7] === null) {
                temp.push({
                    loi: 'Nơi sinh không được để trống',
                    Vitri: `${listColumn[7]}${index + 2}`
                })
            } else {
                infoOneRow.noiSinh = row[7]
            }
            if (row[8] !== null) {
                infoOneRow.coQuan = row[8]
            }
            // kiểm tra trường đại học
            if (row[9] !== null) {
                const processTruong = async () => {
                    if (!listTDH.find(e => e.kiHieuTruong === row[9])) {
                        const res = await taoTruongDaiHoc({
                            tenTruong: row[9],
                            kiHieuTruong: row[9],
                            ghiChu: row[9],
                        })
                        listTDH.push({
                            maTruong: res.result[0],
                            tenTruong: row[9],
                            kiHieuTruong: row[9],
                        })
                        infoOneRow.maTruong = res.result[0]
                        infoOneRow.kiHieuTruong = row[9]
                        return listTDH
                    } else {
                        infoOneRow.maTruong = listTDH.find(e => e.kiHieuTruong === row[9]).maTruong
                        infoOneRow.kiHieuTruong = row[9]
                        return listTDH

                    }
                }
                setListTDH(processTruong())

            }
            // kiểm tra ngành đại học
            if (row[10] !== null) {
                const processNganh = async () => {
                    if (!listNganh.find(e => e.kihieuNganh === row[10])) {
                        const resKT = await kiemTraNganh({
                            kihieuNganh: row[10]
                        })
                        if (resKT?.result?.length === 0) {
                            const res = await taoNganhDaiHoc({
                                tenNganh: row[10],
                                kihieuNganh: row[10],
                                ghiChu: row[10],
                            })
                        }

                        // listNganh.push({
                        //     maNganh: res.result[0],
                        //     tenNganh: row[10],
                        //     kihieuNganh: row[10],
                        // })
                        // infoOneRow.maNganh = res.result[0]
                        // infoOneRow.kihieuNganh = row[10]
                        return listNganh
                    } else {
                        infoOneRow.maNganh = listNganh.find(e => e.kihieuNganh === row[10]).maNganh
                        infoOneRow.kihieuNganh = row[10]
                        return listNganh

                    }
                }
                setListNganh(processNganh())
            }
            // kiểm tra loại hình
            if (row[11] !== null) {
                if (!listLHDT.find(e => e.kiHieuLoaihinh === row[11])) {
                    temp.push({
                        loi: `Không tìm thấy loại hình đào tạo tương ứng với mã "${row[11]}" trong cơ sở dữ liệu`,
                        Vitri: `${listColumn[11]}${index + 2}`
                    })
                } else {
                    infoOneRow.maLoaihinh = listLHDT.find(e => e.kiHieuLoaihinh === row[11]).maLoaihinh
                }
            }
            if (row[12] !== null) {
                infoOneRow.namTN = row[12]
            }
            // kiểm tra phân loại tn
            if (row[13] !== null) {
                if (!listLTN.find(e => e.kiHieuPhanloai === row[13])) {
                    temp.push({
                        loi: `Không tìm thấy phân loại tốt nghiệp tương ứng với mã "${row[13]}" trong cơ sở dữ liệu`,
                        Vitri: `${listColumn[13]}${index + 2}`
                    })
                } else {
                    infoOneRow.maPhanloai = listLTN.find(e => e.kiHieuPhanloai === row[13]).maPhanloai
                }
            }
            if (row[14] !== null) {
                infoOneRow.capBac = row[14]
            }
            // if (row[15] !== null) {
            //     infoOneRow.chucVu = row[15]
            // }
            // kiểm tra ngành đăng kí
            if (row[16] === null) {
                temp.push({
                    loi: 'Chuyên ngành đăng kí tuyển sinh không được để trống',
                    Vitri: `${listColumn[16]}${index + 2}`
                })
            } else if (!listCN.find(e => e.kiHieuChuyennganh === row[16].toString())) {
                temp.push({
                    loi: `Không tìm thấy chuyên ngành đăng kí tuyển sinh tương ứng với mã "${row[16]}" trong cơ sở dữ liệu`,
                    Vitri: `${listColumn[16]}${index + 2}`
                })
            } else {
                infoOneRow.maChuyennganhTS = listCN.find(e => e.kiHieuChuyennganh === row[16].toString()).maChuyennganhTS
                infoOneRow.kiHieuChuyennganh = row[16]
            }
            // kiểm tra ngoại ngữ
            if (row[17] === null) {
                temp.push({
                    loi: 'Ngoại ngữ không được để trống',
                    Vitri: `${listColumn[17]}${index + 2}`
                })
            } else if (row[17] !== 'Anh Văn' && row[17] !== 'Nga Văn' && row[17] !== 'Miễn Thi') {
                temp.push({
                    loi: 'Vui lòng chọn "Anh Văn", "Nga Văn" hoặc "Miễn Thi"',
                    Vitri: `${listColumn[17]}${index + 2}`
                })
            } else {
                infoOneRow.ngoaiNgu = row[17]
            }
            // kiểm tra ngoại ngữ
            if (row[18] === null) {
                temp.push({
                    loi: 'Hình thức thi ngoại ngữ không được để trống',
                    Vitri: `${listColumn[18]}${index + 2}`
                })
            } else if (row[18] !== 1 && row[18] !== 2) {
                temp.push({
                    loi: 'Vui lòng chọn 1 cho "Thi tập trung", 2 cho "Không tập trung"',
                    Vitri: `${listColumn[18]}${index + 2}`
                })
            } else {
                infoOneRow.hinhThucthiNN = row[18] === 1 ? "Tập trung" : "Không tập trung"
            }
            if (row[19] !== null) {
                if (!listDTUT.find(e => e.kiHieuHinhthuc === row[19])) {
                    temp.push({
                        loi: `Không tìm thấy đối tượng ưu tiên tương ứng với mã "${row[19]}" trong cơ sở dữ liệu`,
                        Vitri: `${listColumn[19]}${index + 2}`
                    })
                } else {
                    infoOneRow.maHinhthuc = listDTUT.find(e => e.kiHieuHinhthuc === row[19]).maHinhthuc
                }
            }
            if (row[20] !== null) {
                infoOneRow.diaChi = row[20]
            }
            if (row[21] !== null) {
                infoOneRow.dienThoai = row[21]
            }
            if (row[22] !== null) {
                infoOneRow.ghiChu = row[22]
            }
            if (row[23] !== null) {
                infoOneRow.thiNCS = row[23]
            }
            if (row[24] !== null) {
                infoOneRow.tenDetai = row[24]
            }
            if (row[25] !== null) {
                infoOneRow.giaoVienHD1 = row[25]
            }
            if (row[26] !== null) {
                infoOneRow.giaoVienHD2 = row[26]
            }
            data.push(infoOneRow)
        })
        if (temp.length === 0) {
            setDisable(false)
            setDataImport(data)
        }
        return temp
    }
    useEffect(() => {

        setListErr(checkErr(listImport))
    }, [])
    return (
        <Modal
            isOpen={open}
            toggle={handleModal}
            contentClassName='pt-0'
            className='modal-xl'
        >
            <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
                <h5 className='modal-title'>Nhập hồ sơ thí sinh</h5>
                {
                    listErr.length > 0 ? <span style={{ color: 'red' }}>File nhập có lỗi! Vui lòng kiểm tra lại</span> : <span style={{ color: 'green' }}>File đúng định dạng! Vui lòng kiểm tra lại thông tin trước khi lưu</span>
                }
            </ModalHeader>
            {
                listErr.length > 0 ? < div className='react-dataTable react-dataTable-selectable-rows' style={{ marginRight: '20px', marginLeft: '20px', height: '700px', overflow: 'auto' }}>
                    <DataTable
                        noHeader
                        striped
                        className='react-dataTable'
                        columns={columnsErr}
                        data={listErr}
                    />
                </div> : <div className='react-dataTable react-dataTable-selectable-rows' style={{ marginRight: '20px', marginLeft: '20px', height: '700px', overflow: 'auto' }}>
                    <DataTable
                        noHeader
                        striped
                        className='react-dataTable'
                        columns={columnsData}
                        data={dataImport}
                    />
                </div>
            }
            <ModalBody className='flex-grow-1'>
                <Button className='me-1' color='primary' disabled={disabled} onClick={_handleXoaNMT}>
                    Lưu
                </Button>
                <Button color='secondary' onClick={handleModal} outline>
                    Hủy
                </Button>
            </ModalBody>
        </Modal >
    )
}

export default ImportModal
