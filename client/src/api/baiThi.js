import { API } from "./API_New"
import axios from 'axios'
export const getListBaiThiTheoTui = async (data) => {
  const uri = `/baithi/listtui?maTuithi=${data.maTuiThi}`
  const res = await API.get(uri)
  return res
}
export const getListBaiThiTheoMon = async (data) => {
  const uri = `/baithi/listmon?maMonthi=${data.maMonThi}`
  const res = await API.get(uri)
  return res
}
export const updateBaiThi = async (data) => {
  const uri = `/baithi/update`
  const res = await API.post(uri, data)
  return res
}
export const updateBaiThitheoMon = async (data) => {
  const uri = `/baithi/updatetheomon`
  const res = await API.post(uri, data)
  return res
}
export const getThongTinDanhPhach = async (data) => {
  const uri = `/baithi/thongtindanhphach`
  const res = await API.get(uri)
  return res
}
export const checkNhapDiem = async (data) => {
  const uri = `/baithi/checknhapdiem`
  const res = await API.get(uri)
  return res
}