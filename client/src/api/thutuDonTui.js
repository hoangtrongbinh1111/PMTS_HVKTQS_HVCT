import { API } from "./API_New"
import axios from 'axios'
export const getListThuTuDonTui = async (data) => {
  const uri = `/thutudontui/list?page=${data.page}&perPage=${data.perPage}`
  const res = await API.get(uri)
  return res
}
// export const getThuTuDonTheoMon = async (data) => {
//   const uri = `/thutudontui/listmon?maMonthi=${data.maMonThi}`
//   const res = await API.get(uri)
//   return res
// }
export const getThuTuDonToPrint = async (data) => {
  const uri = `/thutudontui/listprint`
  const res = await API.get(uri)
  return res
}
export const taoThuTuDonTui = async (data) => {
  const uri = `/thutudontui/add`
  const res = await API.post(uri, data)
  return res
}

export const xoaThuTuDon = async () => {
  const uri = `/thutudontui/delete`
  const res = await API.delete(uri)
  return res
}