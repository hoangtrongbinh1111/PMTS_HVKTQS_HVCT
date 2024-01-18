// ** React Imports
import React, { Fragment, useState, useEffect, useRef, useContext } from "react"

// imprt thư viện của bảng
import ReactPaginate from "react-paginate"
import DataTable from "react-data-table-component"
//import icon
import { ChevronDown, Plus, Trash, Edit, Repeat } from "react-feather"
//import css
import "@styles/react/libs/tables/react-dataTable-component.scss"

//import API
import {
  getListDotTuyenSinh,
  searchListDotTuyenSinh,
} from "../../../api/DotTuyenSinh"
import { AbilityContext } from "@src/utility/context/Can"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
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
  UncontrolledTooltip,
} from "reactstrap"

// ** Component Custom
import { BootstrapCheckbox } from "../../components/FormHelper/BootstrapCheckbox"
import WaitingModal from "../../../views/ui-elements/waiting-modals"
const DotTuyenSinh = () => {
  const MySwal = withReactContent(Swal)
  // ** States
  const [modalThemDTS, setModalThemDTS] = useState(false)
  const [modalSuaDTS, setModalSuaDTS] = useState(false)
  const [modalXoaDTS, setModalXoaDTS] = useState(false)
  const [modalChuyenDTS, setModalChuyenDTS] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState("")
  const [perPage, setPerPage] = useState(10)
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    data: [],
    totalCount: 0,
  })
  const ability = useContext(AbilityContext)
  const [info, setInfo] = useState()
  const _handleSuaDTS = (data) => {
    setInfo(data)
    setModalSuaDTS(true)
  }
  const _handleXoaDTS = (data) => {
    setInfo(data)
    setModalXoaDTS(true)
  }
  const _handleChuyenDTS = (data) => {
    setInfo(data)
    setModalChuyenDTS(true)
  }
  const columns = [
    {
      name: "STT",
      center: true,
      width: "70px",
      cell: (row, index) => ((currentPage - 1) * perPage) + index + 1,
    },
    {
      name: "Tên đợt TS",
      center: true,
      minWidth: "200px",
      sortable: (row) => row.tenDotTS,
      cell: (row) => <span>{row.tenDotTS}</span>,
    },
    {
      name: "Thời gian TS",
      center: true,
      minWidth: "170px",
      sortable: (row) => row.tgianTS,
      cell: (row) => <span>{row.tgianTS}</span>,
    },
    {
      name: "Loại TS",
      center: true,
      minWidth: "50px",
      sortable: (row) => row.loaiTS,
      cell: (row) => <span>{row.loaiTS}</span>,
    },
    {
      name: "Ghi chú",
      center: true,
      minWidth: "100px",
      selector: (row) => row.ghiChu,
    },

    {
      name: "Tác vụ",
      center: true,
      minWidth: "50px",
      cell: (row) => {
        return (
          <div className="column-action d-flex align-items-center">
            {ability.can("switch", "dottuyensinh") && (
              <div
                onClick={(e) => _handleChuyenDTS(row)}
                id="tooltip_switch"
                style={{ marginRight: "1rem" }}
              >
                <Repeat
                  size={15}
                  style={{ cursor: "pointer", stroke: "blue" }}
                />
                <UncontrolledTooltip placement="top" target="tooltip_switch">
                  Chuyển đợt tuyến sinh{" "}
                </UncontrolledTooltip>
              </div>
            )}
            {ability.can("update", "dottuyensinh") && (
              <div
                onClick={(e) => _handleSuaDTS(row)}
                id="tooltip_edit"
                style={{ marginRight: "1rem" }}
              >
                <Edit
                  size={15}
                  style={{ cursor: "pointer", stroke: "green" }}
                />
              </div>
            )}

            <UncontrolledTooltip placement="top" target="tooltip_edit">
              Sửa đợt tuyển sinh{" "}
            </UncontrolledTooltip>
            {ability.can("delete", "dottuyensinh") && (
              <div
                onClick={(e) => _handleXoaDTS(row)}
                id="tooltip_trash"
                style={{ marginRight: "1rem" }}
              >
                <Trash size={15} style={{ cursor: "pointer", stroke: "red" }} />
                <UncontrolledTooltip placement="top" target="tooltip_trash">
                  Xóa đợt tuyển sinh{" "}
                </UncontrolledTooltip>
              </div>
            )}
          </div>
        )
      },
    },
  ]
  // ** Function to handle Modal toggle
  const handleModalThemDTS = () => setModalThemDTS(!modalThemDTS)
  const handleModalSuaDTS = () => setModalSuaDTS(!modalSuaDTS)
  const handleModalXoaDTS = () => setModalXoaDTS(!modalXoaDTS)
  const handleModalChuyenDTS = () => setModalChuyenDTS(!modalChuyenDTS)
  const fetchDotTuyenSinh = async () => {
    await getListDotTuyenSinh({
      page: currentPage,
      perPage,
    }).then((res) => {
      setLoading(false)
      setData(res.result)
    })
  }
  useEffect(() => {
    fetchDotTuyenSinh()
  }, [currentPage])
  // ** Function to handle filte
  const handleFilter = (e) => {
    const value = e.target.value
    setSearchValue(value)
    searchListDotTuyenSinh({
      page: currentPage,
      perPage,
      tgianTS: value,
    }).then((res) => {
      setFilteredData(res.result)
    })
  }
  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page)
  }
  const handlePerRowsChange = (perPage, page) => {
    setCurrentPage(page)
    setPerPage(perPage)
  }
  return (
    <Fragment>
      <Card style={{ backgroundColor: "white" }}>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
          <CardTitle tag="h4">Danh sách đợt tuyển sinh</CardTitle>
          {ability.can("add", "dottuyensinh") && (
            <div className="d-flex mt-md-0 mt-1">
              <Button
                className="ms-2"
                color="primary"
                onClick={handleModalThemDTS}
              >
                <Plus size={15} />
                <span className="align-middle ms-50">Thêm mới</span>
              </Button>
            </div>
          )}
        </CardHeader>
        <Row className="justify-content-end mx-0">
          <Col
            className="d-flex align-items-center justify-content-end mt-1"
            md="6"
            sm="12"
            style={{ paddingRight: "20px" }}
          >
            <Label className="me-1" for="search-input">
              Tìm kiếm
            </Label>
            <Input
              className="dataTable-filter mb-50"
              type="text"
              bsSize="sm"
              id="search-input"
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <div
          className="react-dataTable react-dataTable-selectable-rows"
          style={{ marginRight: "20px", marginLeft: "20px" }}
        >
          { loading ? <WaitingModal /> : <DataTable
            noHeader
            striped
            className="react-dataTable"
            columns={columns}
            data={filteredData.data ? filteredData?.data : data?.data}
            pagination
            paginationServer
            paginationTotalRows={
              filteredData.data ? filteredData?.totalCount : data?.totalCount
            }
            paginationComponentOptions={{
              rowsPerPageText: "Số hàng trên 1 trang:",
            }}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePagination}
          />}
        </div>
      </Card>
      <AddNewModal
        open={modalThemDTS}
        handleModal={handleModalThemDTS}
        fetchDotTuyenSinh={fetchDotTuyenSinh}
      />
      {(
        <EditModal
          open={modalSuaDTS}
          handleModal={handleModalSuaDTS}
          fetchDotTuyenSinh={fetchDotTuyenSinh}
          infoEdit={info}
        />
      )}
      {(
        <DeleteModal
          open={modalXoaDTS}
          handleModal={handleModalXoaDTS}
          fetchDotTuyenSinh={fetchDotTuyenSinh}
          infoDel={info}
        />
      )}
      {(
        <SwitchModal
          open={modalChuyenDTS}
          handleModal={handleModalChuyenDTS}
          fetchDotTuyenSinh={fetchDotTuyenSinh}
          infoSwitch={info}
        />
      )}  
    </Fragment>
  )
}

const AddNewModal = React.lazy(() => import("./modal/AddNewModal"))
const EditModal = React.lazy(() => import("./modal/EditModal"))
const DeleteModal = React.lazy(() => import("./modal/DeleteModal"))
const SwitchModal = React.lazy(() => import("./modal/SwitchModal"))

export default DotTuyenSinh
