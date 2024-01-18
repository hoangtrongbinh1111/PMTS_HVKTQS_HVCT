// ** React Imports
import React, {
  Fragment,
  useState,
  forwardRef,
  useEffect,
  useRef,
  useContext,
} from "react"

// imprt thư viện của bảng
import DataTable from "react-data-table-component"
//import icon
import { Trash, Edit } from "react-feather"

//import css
import "@styles/react/libs/tables/react-dataTable-component.scss"

// import API
import { AbilityContext } from '@src/utility/context/Can'
import { timKiemThiSinh, getListDanhSachViPham } from '../../../api/capnhatthisinhvipham'
import { getListPhongThi } from '../../../api/phongThi'

//import thư viện
import { TemplateHandler } from "easy-template-x"
import { saveFile } from "../../utils/util"
import readXlsxFile from "read-excel-file/web-worker"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { toDateString } from "../../../utility/Utils"

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
  Alert,
} from "reactstrap"

// ** Bootstrap Checkbox Component
/***
 * Định nghĩa từ viết tắt
 * 1. HS: Hồ sơ
 */

const DanhSachViPham = () => {
  const ability = useContext(AbilityContext)
  const inputFile = useRef(null)
  const inputFileZip = useRef(null)

  // ** States
  const [currentPage, setCurrentPage] = useState(1)
  const [SBD, setSBD] = useState('')
  const [ten, setTen] = useState('')
  const [phongthi, setPhongthi] = useState('')
  const [listPhongthi, setListPhongThi] = useState([])
  const [perPage, setPerPage] = useState(10)
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [info, setInfo] = useState()
  const [modalSuaVipham, setModalSuaVipham] = useState(false)
  const [modalXoaVipham, setModalXoaVipham] = useState(false)
  const _handleSuaVipham = (data) => {
    setInfo(data)
    setModalSuaVipham(true)
  }
  const _handleXoaVipham = (data) => {
    setInfo(data)
    setModalXoaVipham(true)
  }
  const fetchDSVipham = async () => {
    getListDanhSachViPham().then(res => {
      setData(res.result)
    })
  }
  //Function to handle modal
  const handleModalSuaVipham = () => setModalSuaVipham(!modalSuaVipham)
  const handleModalXoaVipham = () => setModalXoaVipham(!modalXoaVipham)
  const columns = [
    {
      name: "STT",
      center: true,
      width: "70px",
      cell: (row, index) => <span>{(((currentPage - 1) * perPage) + index + 1)}</span>
    },

    {
      name: "Mã HS",
      maxWidth: "20px",
      center: true,
      selector: (row) => row.STT,
    },
    {
      name: "SBD",
      width: "100px",
      selector: (row) => row.soBaodanh,
    },
    {
      name: "Phòng thi",
      width: "120px",
      selector: (row) => (
        <span>
          {row.giangDuongPhong}-{row.tenPhong}
        </span>
      ),
    },
    {
      name: "Họ tên",
      width: "170px",
      selector: (row) => row.hoTen,
    },
    {
      name: "Ngày sinh",
      sortable: true,
      width: "130px",
      selector: (row) => toDateString(row.ngaySinh),
    },
    {
      name: "GT",
      width: "90px",
      selector: (row) => row.gioiTinh,
    },
    {
      name: "Dự thi CN",
      center: "true",
      width: "170px",
      selector: (row) => row.maChuyennganhTS,
    },

    {
      name: "Nơi sinh",
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.noiSinh,
    },
  ]
  //Column danh sách vi phạm
  const columnsVipham = [
    {
      name: "Tác vụ",
      allowOverflow: true,
      width: "95px",
      cell: (row) => {
        return (
          <div className="d-flex align-items-center">
            {ability.can("delete", "vipham") && (
              <Trash
                size={15}
                onClick={(e) => _handleXoaVipham(row)}
                style={{ cursor: "pointer", color: "red" }}
              />
            )}
            {ability.can("update", "vipham") && (
              <Edit
                size={15}
                style={{
                  cursor: "pointer",
                  stroke: "green",
                  marginLeft: "1rem",
                }}
                onClick={(e) => _handleSuaVipham(row)}
              />
            )}
          </div>
        )
      },
    },
    {
      name: "STT",
      center: true,
      width: "70px",
      cell: (row, index) => (
        <span>{((currentPage - 1) * perPage) + index + 1}</span>
      ),
    },

    {
      name: "Mã HS",
      center: true,
      width: "90px",
      selector: (row) => row.STT,
    },
    {
      name: "Phòng thi",
      width: "115px",
      selector: (row) => (
        <span>
          {row.giangDuongPhong}-{row.tenPhong}
        </span>
      ),
    },
    {
      name: "SBD",
      width: "100px",
      selector: (row) => row.soBaodanh,
    },
    {
      name: "Họ tên",
      width: "170px",
      selector: (row) => row.hoTen,
    },
    {
      name: "Ngày sinh",
      sortable: true,
      width: "120px",
      selector: (row) => toDateString(row.ngaySinh),
    },
    {
      name: "Môn 1",
      sortable: true,
      width: "120px",
      selector: (row) => row.klMon1 && `Trừ ${row.klMon1}%`,
    },
    {
      name: "Môn 2",
      sortable: true,
      width: "120px",
      selector: (row) => row.klMon2 && `Trừ ${row.klMon2}%`,
    },
    {
      name: "Môn 3",
      sortable: true,
      width: "130px",
      selector: (row) => row.klMon3 && `Trừ ${row.klMon3}%`,
    },
  ]
  // ** Function to handle modalThemHS toggle
  const fetchUser = () => {
    timKiemThiSinh({
      SBD,
      ten,
      phongthi,
    }).then((res) => {
      setFilterData(res.result)
    })
  }

  const fetchData = async (callAPI, setData) => {
    callAPI({
      page: 1,
      perPage: 100,
    })
      .then((res) => {
        setData(res.result.data)
      })
      .catch((err) => {
        return <Alert color="danger">Có lỗi khi gọi dữ liệu</Alert>
      })
  }
  useEffect(() => {
    fetchData(getListPhongThi, setListPhongThi)
    fetchDSVipham()
  }, [currentPage, perPage])
  useEffect(() => {
    fetchUser()
  }, [phongthi])
  // ** Function to handle filte
  const handleFilter = (e) => {
    if (e === "Enter") {
      timKiemThiSinh({
        SBD,
        ten,
        phongthi,
      }).then((res) => {
        setFilterData(res.result)
      })
    }
  }
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
        setModalImportHS(true)
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
  // ** Custom Pagination

  // ** Converts table to CSV

  const handleExportFileDocx = async (data) => {
    const request = await fetch(
      "/../../template/truongdaihoc/dstruongdaihoc.docx"
    )
    const templateFile = await request.blob()
    const handler = new TemplateHandler()
    const docx = await handler.process(templateFile, data)
    saveFile("dstruongdaihoc.docx", docx)
  }

  return (
    <Fragment>
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={(e) => handleImportFile(e)}
      />
      <Card style={{ backgroundColor: "white" }}>
        <CardHeader
          className="align-md-items-center align-items-start border-bottom"
          style={{ display: "block" }}
        >
          <Row>
            <CardTitle tag="h4">Tìm kiếm thí sinh</CardTitle>
          </Row>
          <Row>
            <Col
              className="d-flex align-items-center justify-content-start mt-1"
              md="4"
              sm="12"
              lg="4"
            >
              <div className="d-flex mt-md-0 mt-1 align-items-center">
                <Label
                  className="me-1"
                  for="search-input"
                  style={{ width: "120px" }}
                >
                  Nhập SBD:
                </Label>
                <Input
                  className="dataTable-filter mb-50"
                  type="text"
                  bsSize="sm"
                  id="search-input"
                  value={SBD}
                  placeholder="Nhập tại đây"
                  onChange={(e) => setSBD(e.target.value)}
                  onKeyDown={(e) => handleFilter(e.key)}
                />
              </div>
            </Col>
            <Col
              className="d-flex align-items-center justify-content-start mt-1"
              md="4"
              sm="12"
              lg="4"
            >
              <div className="d-flex mt-md-0 mt-1 align-items-center">
                <Label
                  className="me-1"
                  for="search-input"
                  style={{ width: "120px" }}
                >
                  Nhập tên:
                </Label>
                <Input
                  className="dataTable-filter mb-50"
                  type="text"
                  bsSize="sm"
                  id="search-input"
                  value={ten}
                  placeholder="Nhập tại đây"
                  onChange={(e) => setTen(e.target.value)}
                  onKeyDown={(e) => handleFilter(e.key)}
                />
              </div>
            </Col>
            <Col
              className="d-flex align-items-center justify-content-start mt-1"
              md="4"
              sm="12"
              lg="4"
            >
              <div className="d-flex mt-md-0 mt-1 align-items-center">
                <Label
                  className="me-1"
                  for="search-input"
                  style={{ width: "140px" }}
                >
                  Phòng thi:
                </Label>
                <Input
                  className="dataTable-filter mb-50 w-100"
                  type="select"
                  name="maTui"
                  id="maTui"
                  value={phongthi}
                  placeholder="Túithi"
                  onChange={(e) => {
                    setPhongthi(e.target.value)
                  }}
                  style={{ width: "100px", padding: "0.4rem 1rem" }}
                >
                  <option value="">Phòng thi</option>
                  {listPhongthi.map((item) => {
                    return (
                      <option value={item.maPhongthi}>
                        {item.giangDuongPhong}-{item.tenPhong}
                      </option>
                    )
                  })}
                </Input>
              </div>
            </Col>
          </Row>
        </CardHeader>
        <div
          className="react-dataTable react-dataTable-selectable-rows"
          style={{ marginRight: "20px", marginLeft: "20px" }}
        >
          <DataTable
            noHeader
            striped
            columns={columns}
            className="react-dataTable"
            data={filterData}
            expandOnRowClicked
            expandableRows
            expandableRowsComponent={(row) => (
              <AddViPham
                data={[row]}
                fetchDSVipham={fetchDSVipham}
                maHoSo={row.data.maHoso}
                listVipham={data}
              />
            )}
          />
        </div>
      </Card>
      <Card style={{ backgroundColor: "white" }}>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
          <CardTitle tag="h4">Danh sách thí sinh vi phạm</CardTitle>
        </CardHeader>
        <div
          className="react-dataTable react-dataTable-selectable-rows"
          style={{ marginRight: "20px", marginLeft: "20px" }}
        >
          <DataTable
            noHeader
            striped
            columns={columnsVipham}
            className="react-dataTable"
            data={data}
            expandOnRowClicked
            expandableRows
            expandableRowsComponent={(row) => <Detail row={row} />}
            style={{ width: "100%" }}
          />
        </div>
      </Card>
      {(
        <EditModal
          open={modalSuaVipham}
          handleModal={handleModalSuaVipham}
          fetchUser={fetchDSVipham}
          infoEdit={info}
        />
      )}
      {(
        <DeleteModal
          open={modalXoaVipham}
          handleModal={handleModalXoaVipham}
          fetchUser={fetchDSVipham}
          infoDelete={info}
        />
      )}
    </Fragment>
  )
}
const Detail = React.lazy(() => import("../../QLToChucThi/HoSoDK/Detail"))
const AddViPham = React.lazy(() => import("./modal/AddVipham"))
const EditModal = React.lazy(() => import("./modal/EditModal"))
const DeleteModal = React.lazy(() => import("./modal/DeleteModal"))

export default DanhSachViPham
