// ** React Imports
import React, { Fragment, useState, useEffect, useRef } from "react"
// imprt thư viện của bảng
import DataTable from "react-data-table-component"
import Select from "react-select"
import { selectThemeColors } from "@utils"
//import icon
import { X, Printer } from "react-feather"
//import css
import "@styles/react/libs/tables/react-dataTable-component.scss"
import readXlsxFile from "read-excel-file/web-worker"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

//import API
import { getListMonThi } from "../../../api/monThi"
import { getListTuiThi } from "../../../api/huongDanDonTui"
import {
  getListBaiThiTheoTui,
  getListBaiThiTheoMon,
  updateBaiThi,
} from "../../../api/baiThi"

import responseResultHelper from "../../utils/reponsive"
import { ACTION_METHOD_TYPE } from "../../utils/constant"
// ** Reactstrap Imports
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
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap"

// ** Component Custom
/***
 * Định nghĩa từ viết tắt
 * 1. DTDP: Dồn túi đánh phách
 */
const CapNhatDiemThi = () => {
  const inputFile = useRef(null)
  // ** States
  const [currentPage, setCurrentPage] = useState(0)
  const [perPage, setPerPage] = useState(50)
  const [listMonthi, setListMonthi] = useState([])
  const [maMonThi, setMaMonThi] = useState()
  const [listTuithi, setListTuithi] = useState([])
  const [maTuiThi, setMaTuiThi] = useState()
  const [alert, setAlert] = useState(false)
  const [numberChangedRecord, setNumberChangedRecord] = useState(0)
  const [sumDiem, setSumDiem] = useState(0)
  const [listImport, setListImport] = useState()
  const [modalImportDiem, setModalImportDiem] = useState(false)
  const [modalInBienBan, setModalInBienBan] = useState(false)
  const [alertDiemThi, setAlertDiemthi] = useState(false)
  const [tenTui, setTenTui] = useState("")
  const [tenMon, setTenMon] = useState("")
  const [maNhommon, setManhommon] = useState("")
  const [data, setData] = useState({
    data: [],
    totalCount: 0,
  })
  const [modifiedData, setModFiedData] = useState([])
  const [editedData, setEditedData] = useState({})
  const [dataToPrint, setDataToPrint] = useState([])
  const handleDiemChange = (index, value) => {
    if (
      maNhommon.maNhom === 3 &&
      (value === "" ||
        (!isNaN(value) && parseInt(value) >= 0 && parseInt(value) <= 100))
    ) {
      setEditedData((prevData) => ({
        ...prevData,
        [index]: value,
      }))
    } else if (
      value === "" ||
      (!isNaN(value) && parseFloat(value) >= 0 && parseFloat(value) <= 10)
    ) {
      setEditedData((prevData) => ({
        ...prevData,
        [index]: value,
      }))
    }
  }
  // Tạo màu khi nhập điểm
  const getCellColor = (diem) => {
    const floatValue = parseFloat(diem)
    if (floatValue >= 0 && floatValue < 5) {
      return "red"
    } else if (floatValue >= 5 && floatValue < 7) {
      return "green"
    } else if (floatValue >= 7 && floatValue < 9) {
      return "blue"
    } else if (floatValue >= 9 && floatValue <= 10) {
      return "purple"
    }
    return "black"
  }
  const conditionalRowStyles = [
    {
      when: (row) => row.rowStyle && row.rowStyle.backgroundColor === "yellow",
      style: {
        backgroundColor: "yellow",
      },
    },
  ]
  // ngăn nhập điểm thập phân
  const handleKeyPress = (e) => {
    // Allow only numbers and the backspace key
    if (!/^\d*$/.test(e.key) && e.key !== "Backspace") {
      e.preventDefault()
    }
  }
  // Điểm bằng chữ
  const convertToWords = (num) => {
    const ones = [
      "không",
      "một",
      "hai",
      "ba",
      "bốn",
      "năm",
      "sáu",
      "bảy",
      "tám",
      "chín",
    ]

    const tens = [
      "",
      "mười",
      "hai mươi",
      "ba mươi",
      "bốn mươi",
      "năm mươi",
      "sáu mươi",
      "bảy mươi",
      "tám mươi",
      "chín mươi",
    ]

    if (num < 10) {
      return ones[num]
    } else if (num < 100) {
      return `${tens[Math.floor(num / 10)]}${num % 10 !== 0 ? ` ${ones[num % 10]}` : ""
        }`
    } else if ((num = 100)) {
      return "một trăm"
    }
  }
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  const numberToText = (number) => {
    const integerPart = Math.floor(number)
    const decimalPart = Math.round((number - integerPart) * 100)

    const integerText = convertToWords(integerPart)
    const decimalText = convertToWords(decimalPart)

    return capitalizeFirstLetter(`${integerText} phẩy ${decimalText}`)
  }
  useEffect(() => {
    if (Object.keys(editedData).length > 0) {
      const newData = {
        ...data,
        data: data.data.map((row, index) => ({
          ...row,
          diemThi: editedData.hasOwnProperty(index)
            ? editedData[index]
            : row.diemThi,
        })),
      }
      setData(newData)
      setNumberChangedRecord(Object.keys(editedData).length)
      //
    }
    const sum = data.data.reduce((acc, row) => acc + parseFloat(row.diemThi), 0)
    const dataAlert = data.data.map((row) => ({
      ...row,
      rowStyle:
        (row.diemThi === '')
          ? { backgroundColor: "yellow" }
          : row.diemThi === 0
            ? { backgroundColor: "yellow" }
            : {},
    }))
    setModFiedData(dataAlert)
    setSumDiem(sum)
  }, [editedData, data])
  const isRowEdited = (index) => {
    return editedData.hasOwnProperty(index)
  }
  const columns = [
    {
      name: "STT",
      center: true,
      width: "70px",
      cell: (row, index) => (currentPage * perPage) + index + 1,
    },
    {
      name: "Số phách",
      center: true,
      width: "140px",
      sortable: (row) => row.soPhach,
      cell: (row) => <span>{row.soPhach}</span>,
    },
    {
      name: "Điểm",
      center: true,
      minWidth: "80px",
      cell: (row, index) => (
        <Input
          type="text"
          value={
            isRowEdited(index)
              ? editedData[index]
              : data.data[index] && data.data[index].diemThi
          }
          onChange={(e) => handleDiemChange(index, e.target.value)}
          style={{
            border: "none",
            outline: "none",
            background: "inherit",
            width: "100%",
            color: getCellColor(row.diemThi),
          }}
          // placeholder="Nhập điểm"
        />
      ),
    },
    {
      name: "Điểm bằng chữ",
      left: true,
      minWidth: "210px",
      sortable: (row) => row.soPhach,
      cell: (row) => <span>{numberToText(row.diemThi)}</span>,
    },
  ]
  // ** Function to handle Modal toggle
  const fetchMonThi = async () => {
    getListMonThi({
      page: 1,
      perPage: 100,
    }).then((res) => {
      const listMonthiOptions = []
      res.result.data.map((monThi) => {
        listMonthiOptions.push({
          value: monThi.maMon,
          label: monThi.tenMon,
          maNhom: monThi.maNhommonhoc,
        })
      })
      setListMonthi(listMonthiOptions)
    })
  }
  const handleFetchBaiThiTheoMon = (maMonThi) => {
    getListTuiThi(maMonThi).then((res) => {
      setListTuithi(res.result)
    })
    getListBaiThiTheoMon({
      maMonThi,
    }).then((res) => {
      setData(res.result)
      const allzero = res.result.data.every(obj => obj.diemThi === 0)
      if (allzero) {
        const dataBienbanchamthi = res.result.data.reduce((acc, obj) => {
          const existingGroup = acc.find((group) => group.tenTui === obj.tenTui)
  
          if (existingGroup) {
            existingGroup.result.push({
              index: existingGroup.result.length + 1,
              soPhach: obj.soPhach,
              diemThi: '',
              diemChu:''
            })
          } else {
            acc.push({
              tenTui: obj.tenTui,
              tenMon: listMonthi.find((obj) => obj.value === parseInt(maMonThi)).label,
              result: [
                {
                  index: 1,
                  soPhach: obj.soPhach,
                  diemThi: '',
                  diemChu: '' 
                },
              ],
            })
          }
  
          return acc
        }, [])
        setDataToPrint(dataBienbanchamthi)
      } else {
        const dataBienbanchamthi = res.result.data.reduce((acc, obj) => {
          const existingGroup = acc.find((group) => group.tenTui === obj.tenTui)
  
          if (existingGroup) {
            existingGroup.result.push({
              index: existingGroup.result.length + 1,
              soPhach: obj.soPhach,
              diemThi: obj.diemThi.toFixed(2),
              diemChu: numberToText(obj.diemThi)
            })
          } else {
            acc.push({
              tenTui: obj.tenTui,
              tenMon: listMonthi.find((obj) => obj.value === parseInt(maMonThi)).label,
              result: [
                {
                  index: 1,
                  soPhach: obj.soPhach,
                  diemThi: obj.diemThi.toFixed(2),
                  diemChu: numberToText(obj.diemThi)
                },
              ],
            })
          }
  
          return acc
        }, [])
        setDataToPrint(dataBienbanchamthi)
      }    
    })
    
    setMaMonThi(maMonThi)
    setMaTuiThi("")
  }
  const handleFetchBaiThiTheoTui = (maTuiThi) => {
    getListBaiThiTheoTui({
      maTuiThi,
    }).then((res) => {
      setData(res.result)
    })
    setMaTuiThi(maTuiThi)
  }
  useEffect(() => {
    fetchMonThi()
  }, [currentPage])
  // ** Function to handle Pagination
  // ** Function nhập file excel
  const onImportFileClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click()
  }
  const handleImportFile = (e) => {
    const files = e.target.files[0]
    const MySwal = withReactContent(Swal)
    readXlsxFile(files)
      .then((rows) => {
        // `rows` is an array of rows
        // each row being an array of cells.
        const temp = []
        rows.forEach((item, index) => {
          if (index > 0) {
            temp.push(item)
          }
        })
        setListImport(temp)
        setModalImportDiem(true)
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: "Có lỗi xảy ra",
          text: "File không đúng định dạng, vui lòng chọn file định dạng excel và nhập đúng các cột",
          customClass: {
            confirmButton: "btn btn-danger",
          },
        })
      })
  }
  //**Function để handle các modal */
  const handleModalImportDiem = () => setModalImportDiem(!modalImportDiem)
  const handleModalInBienBan = () => setModalInBienBan(!modalInBienBan)
  const handleModalAlert = () => {
    setAlert(!alert)
    setTenMon(listMonthi.find((obj) => obj.value === parseInt(maMonThi)).label)
    maTuiThi
      ? setTenTui(
        listTuithi.find((obj) => obj.maTui === parseInt(maTuiThi)).tenTui
      )
      : setTenTui("")
  }
  const _handleUpdateBaithi = async () => {
    const res = await updateBaiThi(data)
    setAlertDiemthi(true)
    responseResultHelper(
      res,
      handleModalAlert,
      maTuiThi
        ? handleFetchBaiThiTheoTui(maTuiThi)
        : handleFetchBaiThiTheoMon(maMonThi),
      ACTION_METHOD_TYPE.SAVE
    )
  }
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModalAlert} />
  )
  return (
    <Fragment>
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={(e) => handleImportFile(e)}
      />
      <Card style={{ backgroundColor: "white", height: "620px" }}>
        <Row className="ml-1">
          <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom mb-1">
            <CardTitle tag="h4">Cập nhật điểm thi</CardTitle>
          </CardHeader>
          <Col
            md="6"
            sm="12"
            className="mb-1"
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "20px",
              flexDirection: "column",
              paddingLeft: "30px",
            }}
          >
            <Col md="12" sm="12">
              <Row>
                <Col md="3">
                  <Label for="maDidiem" style={{ width: "110px" }}>
                    Môn thi:
                  </Label>
                </Col>
                <Col md="9">
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    defaultValue={listMonthi[0]}
                    options={listMonthi}
                    placeholder="Chọn môn thi"
                    onChange={(e) => {
                      setManhommon(
                        listMonthi.find((obj) => obj.value === e.value)
                      )
                      setAlertDiemthi(false)
                      setEditedData({})
                      setNumberChangedRecord(0)
                      handleFetchBaiThiTheoMon(e.value)
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col md="12">
              <Row>
                <Col md="6">
                  <Row>
                    <Col md="6">
                      <Label for="maDidiem">Từ túi</Label>
                    </Col>
                    <Col md="6">
                      <Input id="tenPhong" value="1" />
                    </Col>
                  </Row>
                </Col>
                <Col md="6">
                  <Row>
                    <Col md="6">
                      <Label for="maDidiem">Đến túi:</Label>
                    </Col>
                    <Col md="6">
                      <Input id="tenPhong" value={listTuithi.length} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col md="12" sm="12">
              <Row>
                <Col md="3">
                  <Label for="maDidiem">Cập nhật điểm số cho túi:</Label>
                </Col>
                <Col md="9">
                  <Input
                    type="select"
                    name="maMon"
                    id="maMon"
                    placeholder="Môn thi"
                    value={maTuiThi}
                    onChange={(e) => {
                      setAlertDiemthi(false)
                      setEditedData({})
                      setNumberChangedRecord(0)
                      e.target.value
                        ? handleFetchBaiThiTheoTui(e.target.value)
                        : handleFetchBaiThiTheoMon(maMonThi)
                    }}
                  >
                    <option value="">Tất cả</option>
                    {listTuithi.map((item) => {
                      return <option value={item.maTui}>{item.tenTui}</option>
                    })}
                  </Input>
                </Col>
              </Row>
            </Col>
            <Col md="12" sm="12">
              <Row>
                <Col md="3">
                  <Label for="maDidiem">Tổng số bài thi một túi:</Label>
                </Col>
                <Col md="9">
                  <Input
                    id="tenPhong"
                    value={maTuiThi !== null && data.data.length}
                  />
                </Col>
              </Row>
            </Col>
            <Col md="12" sm="12">
              <Row>
                <Col md="3">
                  <Label for="maDidiem">Tổng số điểm một túi:</Label>
                </Col>
                <Col md="9">
                  <Input id="tenPhong" value={isNaN(sumDiem) ? 0 : sumDiem.toFixed(2)} />
                </Col>
              </Row>
            </Col>

            <Col
              md="12"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                className="ms-2"
                color="primary"
                onClick={handleModalInBienBan}
                disabled={!maMonThi}
              >
                <Printer size={15} />
                <span className="align-middle ms-2">In biên bản chấm thi</span>
              </Button>
              <Button
                className="ms-2"
                color="primary"
                onClick={onImportFileClick}
              >
                <span className="align-middle">Nhập từ Excel</span>
              </Button>
              <Button
                className="ms-2"
                color="primary"
                onClick={handleModalAlert}
                disabled={!maMonThi}
              >
                <span className="align-middle">Lưu Điểm</span>
              </Button>
            </Col>
            <Col md="12"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}>
              <div style={{display:"flex", gap:'5px', flexDirection:'column'}}>
                <span style={{color:'red'}}>* <b style={{color:'red'}}>Lưu ý: </b></span>
                <ul style={{paddingLeft:'20px'}}>
                  <li>
                    Nhấn phím <b>Tab</b> để nhập điểm, các điểm thi lẻ nhập dấu chấm. <b>Ví dụ: 9.5!</b>
                  </li>
                  <li>
                    Đối với điểm thi bằng <b>0</b> cần xóa điểm <b>0</b> mặc định để nhập mới!
                  </li>
                </ul>
              </div>
            </Col>
          </Col>
          <Col md="6" sm="12" className="mb-1">
            <div
              className="react-dataTable react-dataTable-selectable-rows"
              style={{
                marginRight: "10px",
                marginLeft: "10px",
                maxHeight: "530px",
                overflowY: "auto",
              }}
            >
              <DataTable
                noHeader
                columns={columns}
                className="react-dataTable"
                data={alertDiemThi ? modifiedData : data.data}
                conditionalRowStyles={conditionalRowStyles}
              />
            </div>
          </Col>
        </Row>
      </Card>
      {listImport && (
        <ImportModal
          open={modalImportDiem}
          fetchUser={handleFetchBaiThiTheoMon}
          handleModal={handleModalImportDiem}
          listImport={listImport}
          listMonthi={listMonthi}
        />
      )}
      <InBienBanChamThi
        open={modalInBienBan}
        handleModal={handleModalInBienBan}
        listPrint={dataToPrint}
        listMonthi={listMonthi}
        maMonthi={maMonThi}
      />
      <Modal isOpen={alert} toggle={handleModalAlert} contentClassName="pt-0">
        <ModalHeader
          className="mb-1"
          toggle={handleModalAlert}
          close={CloseBtn}
          tag="div"
        >
          <h5 className="modal-title">Cập nhật điểm </h5>
        </ModalHeader>
        <ModalBody className="flex-grow-1">
          <div className="mb-1">
            <Label className="form-label" for="full-name">
              {data.data.some((item) => item.diemThi === '') ? (
                <div>
                  Có bản ghi đang để trống cột điểm, Vui lòng kiểm tra lại!
                </div>
              ) : maTuiThi ? (
                <div>
                  Cập nhật {numberChangedRecord} / {data.data.length} bản ghi:{" "}
                  <b>
                    {tenTui} - môn {tenMon}
                  </b>
                </div>
              ) : (
                <div>
                  Cập nhật {numberChangedRecord} / {data.data.length} bản ghi
                  môn: <b>{tenMon}</b>
                </div>
              )}
            </Label>
          </div>
          {data.data.some((item) => item.diemThi === '') ? (
            <Button
              className="me-1"
              color="primary"
              onClick={() => {
                setAlertDiemthi(true)
                handleModalAlert()
              }}
            >
              OK!
            </Button>
          ) : (
            <Button
              className="me-1"
              color="primary"
              onClick={_handleUpdateBaithi}
            >
              Lưu
            </Button>
          )}
          <Button color="secondary" onClick={handleModalAlert} outline>
            Hủy
          </Button>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}
const ImportModal = React.lazy(() => import("./modal/ImportModal"))
const InBienBanChamThi = React.lazy(() => import("./modal/InBienBanChamThi"))
export default CapNhatDiemThi
