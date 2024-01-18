import { API } from "./API_New"
import axios from 'axios'
export const getListDotTuyenSinh = async (data) => {
  const uri = `/dottuyensinh/list?page=${data.page}&perPage=${data.perPage}`
  const res = await API.get(uri)
  return res
}
export const searchListDotTuyenSinh = async (data) => {
  const uri = `/dottuyensinh/list?page=${data.page}&perPage=${data.perPage}&query=${data.tgianTS}`
  const res = await API.get(uri)
  return res
}
export const createDotTuyenSinh = async (data) => {
  const uri = `/dottuyensinh/add`
  const res = await API.post(uri, data)
  return res
}

export const updateDotTuyenSinh = async (data) => {
  const uri = `/dottuyensinh/update`
  const res = await API.put(uri, data)
  return res
}

export const deleteDotTuyenSinh = async (data) => {
  const uri = `/dottuyensinh/delete?id=${data.id}`
  const res = await API.delete(uri)
  return res
}
export const switchDotTuyenSinh = async (data) => {
  const uri = `/dottuyensinh/change`
  const res = await API.post(uri, data)
  return res
}

export const switchDotTuyenSinhByName = async (data) => {
  const uri = `/dottuyensinh/changeByName`
  const res = await API.post(uri, data)
  return res
}