import { Fragment, useEffect, useState, useContext } from "react"
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  FormText,
} from "reactstrap"
import { useForm, Controller } from "react-hook-form"
import style from "../../../assets/scss/index.module.scss" 
import {
  getListDotTuyenSinh,
  switchDotTuyenSinh,
  createDotTuyenSinh,
} from "../../../api/DotTuyenSinh"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import classnames from "classnames"
import { Link, useNavigate } from "react-router-dom"
import { getHomeRouteForLoggedInUser, isObjEmpty } from "@utils"
import { AbilityContext } from "@src/utility/context/Can"
import Flatpickr from "react-flatpickr"
import { Vietnamese } from "flatpickr/dist/l10n/vn.js"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "flatpickr/dist/plugins/monthSelect/style.css"

import { toDateString } from "../../../utility/Utils"
import { LOAI_TUYEN_SINH } from "../../../pmts/utils/constant"
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect"

const SwithDTSModal = ({ userData, permissArr }) => {
  const today_arr = toDateString(new Date()).split("/")
  const MySwal = withReactContent(Swal)
  const [listDTS, setListDTS] = useState([])
  const [selectedDTS, setSelectedDTS] = useState()
  const [active, setActive] = useState("1")
  const [loading, setLoading] = useState(false)
  const [loaiTs, setLoaiTs] = useState("Thạc sỹ")
  const [tgianTS_, setTGianTS] = useState(`${today_arr[1]}-${today_arr[2]}`)
  const [isSubmit, setIsSubmit] = useState(false)
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab)
    }
  }
  const {
    control,
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const fetchData = () => {
    getListDotTuyenSinh({
      page: 1,
      perPage: 10000000,
    })
      .then((res) => {
        setListDTS(res.result.data || [])
        setSelectedDTS(res.result.data ? res.result.data[0].maDotTS : 0)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])
  const handleSwitchDTS = () => {
    switchDotTuyenSinh({
      id: parseInt(selectedDTS),
    })
      .then((res) => {
        localStorage.setItem("userData", JSON.stringify(userData))
        localStorage.setItem("dbName", res.result)
        ability.update(permissArr)
        navigate(getHomeRouteForLoggedInUser("admin"))
      })
      .catch((err) => {
        console.log(err)
        MySwal.fire({
          icon: "error",
          title: "Có lỗi xảy ra",
          text: "Vui lòng thử lại",
          customClass: {
            confirmButton: "btn btn-danger",
          },
        })
      })
  }

  const addNewDTS = (data) => {
    setIsSubmit(true)
    if (loaiTs !== null) {
    setLoading(true)
    const datasubmit = {
      tenDotTS: data.tenDotTS,
      tgianTS: tgianTS_,
      loaiTS: loaiTs,
      ghiChu: data.ghiChu,
    }
    createDotTuyenSinh(datasubmit)
      .then((res) => {
        MySwal.fire({
          icon: "success",
          title: "Thêm mới đợt tuyển sinh thành công!",
          customClass: {
            confirmButton: "btn btn-success",
          },
        })
        localStorage.setItem('dbName', res.result)
        reset()
        fetchData()
        setLoading(false)
        setActive("1")
      })
      .catch((err) => {
        MySwal.fire({
          icon: "error",
          title: "Có lỗi xảy ra",
          text: "Vui lòng thử lại",
          customClass: {
            confirmButton: "btn btn-danger",
          },
        })
        setLoading(false)
      })
    setIsSubmit(false)
    }
  }

  return (
    <Fragment>
      <h4 style={{ textAlign: "center", color: "#098a63" }}>
        Đăng nhập thành công!
      </h4>
      <Nav tabs className="d-flex">
        <NavItem style={{ width: "50%" }}>
          <NavLink
            active={active === "1"}
            onClick={() => {
              toggle("1")
            }}
          >
            <Button color={active === "1" ? "primary" : "secondary"}>
              Chọn đợt tuyển sinh
            </Button>
          </NavLink>
        </NavItem>
        <NavItem style={{ width: "50%" }}>
          <NavLink
            active={active === "2"}
            onClick={() => {
              toggle("2")
            }}
          >
            <Button color={active === "2" ? "primary" : "secondary"}>
              Thêm đợt tuyển sinh
            </Button>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="1">
          <Form>
            <div className="mb-1" style={{ textAlign: "center" }}>
              <div className="d-flex justify-content-between">
                <Label
                  className={`form-label ${style.labelFormSm}`}
                  for="listDTS"
                  style={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: "2rem",
                    marginBottom: "1rem",
                  }}
                >
                  <h4>Chọn đợt tuyển sinh</h4>
                </Label>
              </div>
              <Controller
                id="dottuyensinh"
                name="dottuyensinh"
                control={control}
                render={({ field }) => (
                  <Input
                    className="input-group-merge"
                    type="select"
                    value={selectedDTS}
                    style={{ width: "80%", margin: "1rem auto 3rem" }}
                    onChange={(e) => {
                      setSelectedDTS(e.target.value)
                    }}
                  >
                    {listDTS.map((item, index) => {
                      return (
                        <option value={item.maDotTS}>
                          {item.tenDotTS}  ({item.tgianTS} )
                        </option>
                      )
                    })}
                    <option value="0">Đợt tuyển sinh thử nghiệm</option>
                  </Input>
                )}
              />
              <Button color="primary" outline onClick={() => handleSwitchDTS()}>
                Chọn
              </Button>
            </div>
          </Form>
        </TabPane>
        <TabPane tabId="2">
          <Form onSubmit={handleSubmit(addNewDTS)}>
            <div className="row">
              <div className={style.cusFormGroup}>
                <Label for="tenDotTS" className={style.labelFormSm}>
                  Tên đợt tuyển sinh<span className={style.redColor}>(*)</span>
                </Label>
                <input
                  autoFocus
                  id="tenDotTS"
                  name="tenDotTS"
                  type="text"
                  className={`${classnames({
                    "is-invalid": errors.tenDotTS,
                  })} ${style.inputForm}`}
                  {...register("tenDotTS", { required: true })}
                  placeholder="Tên đợt tuyển sinh"
                />
                {errors && errors.tenDotTS && (
                  <FormText color="danger" className={style.formErr}>
                    Vui lòng nhập tên đợt tuyển sinh
                  </FormText>
                )}
              </div>
            </div>
            <div className={`row ${style.cusFormGroup}`}>
              <div className="col col-6">
                <Label for="tgianTS" className={style.labelFormSm}>
                  Thời gian tuyển sinh
                  <span className={style.redColor}>(*)</span>
                </Label>
                <Flatpickr
                id="default-picker"
                className={`${style.inputForm}`}
                options = {{
                  // dateFormat: 'd/m/y',
                  defaultDate: new Date(),
                  locale: {
                    ...Vietnamese
                  },
                  plugins: [
                    new monthSelectPlugin({
                      shorthand: true, //defaults to false
                      dateFormat: "F Y", //defaults to "F Y"
                      // altFormat: "F Y", //defaults to "F Y"
                      theme: "light" // defaults to "light"
                    })
                ]
                }}
                onChange={(e) => {
                  if (e.length !== 0) {
                    const time_str = toDateString(e[0])
                    const time_str_arr = time_str.split('/')
                    setTGianTS(`${time_str_arr[1]}-${time_str_arr[2]}`)
                  }
                }}
                />
                {/* {errors && errors.tgianTS === "" && (
                  <FormText color="danger" className={style.formErr}>
                    Vui lòng nhập thời gian tuyển sinh
                  </FormText>
                )} */}
              </div>
              <div className="col col-6">
                <Label for="loaiTS" className={style.labelFormSm}>
                  Loại tuyển sinh<span className={style.redColor}>(*)</span>
                </Label>
                <Input
                  type="select"
                  name="loaiTs"
                  id="loaiTs"
                  value={loaiTs}
                  onChange={(e) => {
                    setLoaiTs(e.target.value)
                  }}
                >
                  <option>Chọn loại tuyển sinh</option>
                  {LOAI_TUYEN_SINH.map((role, index) => (
                    <option key={index} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </Input>
                {isSubmit && loaiTs === null && (
                  <FormText color="danger" className={style.formErr}>
                    Vui lòng chọn loại tuyển sinh
                  </FormText>
                )}
              </div>
            </div>
            {/* <div className="row">

        <div className={style.cusFormGroup}>
          <Label for='chucVu_ngki' className={style.labelFormSm}>Chức vụ người ký<span className={style.redColor}>*</span></Label>
          <input
            id='chucVu_ngki'
            name='chucVu_ngki'
            className={`${classnames({
             "is-invalid": errors.chucVu_ngki
            })} ${style.inputForm}`}
            {...register("chucVu_ngki", { required: true })}
            placeholder='Chức vụ người ký'
          />
          {errors && errors.chucVu_ngki && <FormText color="danger" className={style.formErr}>Vui lòng nhập chức vụ người ký</FormText>}
        </div>
        </div> */}
            <div className="row">
              <div className={style.cusFormGroup}>
                <Label htmlFor="ghiChu" className={style.labelFormSm}>
                  Mô tả
                </Label>
                <input
                  type="textarea"
                  id="ghiChu"
                  name="ghiChu"
                  className={`${classnames({
                    "is-invalid": errors["ghiChu"],
                  })} ${style.inputForm}`}
                  {...register("ghiChu", { required: false })}
                  placeholder="Mô tả"
                />
              </div>
            </div>
            <ModalFooter style={{ justifyContent: "flex-start", padding: "0" }}>
              <div className="d-flex justify-content-center mb-0">
                <Button.Ripple color="primary" type="submit">
                  {loading ? <div className={style.loader}></div> : "Thêm mới"}
                </Button.Ripple>
                <Button.Ripple
                  outline
                  className="mr-1"
                  color="secondary"
                  type="button"
                  onClick={() => toggle("1")}
                  style={{ marginLeft: "1rem" }}
                >
                  Hủy
                </Button.Ripple>
              </div>
            </ModalFooter>
          </Form>
        </TabPane>
      </TabContent>
    </Fragment>
  )
}

export default SwithDTSModal
