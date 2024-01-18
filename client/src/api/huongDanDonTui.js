import { API } from "./API_New"
import axios from 'axios'
export const getListTuiThi = async (data) => {
  const uri = `/huongdandontui/listtui?maMonThi=${data}`
  const res = await API.get(uri)
  return res
}
export const getHuongDanDonTui = async (data) => {
  const uri = `/huongdandontui/listhuongdan?page=${data.page}&perPage=${data.perPage}&query=${data.info}`
  const res = await API.get(uri)
  return res
}
export const getSoPhachTheoMon = async (data) => {
  const uri = `/huongdandontui/listsophachtheomon?page=${data.page}&perPage=${data.perPage}&query=${data.maMonThi}`
  const res = await API.get(uri)
  return res
}