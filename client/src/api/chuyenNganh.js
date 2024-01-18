import { API } from "./API_New"
import axios from 'axios'
export const getListChuyenNganh = async (data) => {
  const uri = `/chuyennganh/list?page=${data.page}&perPage=${data.perPage}`
  const res = await API.get(uri)
  return res
}
export const searchListChuyenNganh = async (data) => {
  const uri = `/chuyennganh/list?page=${data.page}&perPage=${data.perPage}&query=${data.tenChuyennganh }`
  const res = await API.get(uri)
  return res
}
export const taoChuyenNganh = async (data) => {
  const uri = `/chuyennganh/add`
  const res = await API.post(uri, data)
  return res
}

export const suaChuyenNganh = async (data) => {
  const uri = `/chuyennganh/update?id=${data.id}`
  const res = await API.put(uri, data.body)
  return res
}
export const suaNhieuChuyenNganh = async (data) => {
  const uri = `/chuyennganh/updatemulti`
  const res = await API.put(uri, data)
  return res
}
export const suaDiemChuan = async (data) => {
  const uri = `/chuyennganh/updatediemchuan`
  const res = await API.put(uri, data)
  return res
}
export const xoaChuyenNganh = async (data) => {
  const uri = `/chuyennganh/delete?id=${data.id}`
  const res = await API.delete(uri)
  return res
}
export const exportChuyenNganh = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/chuyennganh/export', // Replace with your server's URL
    method: 'GET',
    responseType: 'blob', // Important! This ensures the response is treated as a binary blob
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'chuyennganh.xlsx')
      document.body.appendChild(link)
      link.click()
    })
    .catch((error) => {
      console.error('Error downloading the file:', error)
    })
}
export const exportChuyenNganhTemplate = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/chuyennganh/exporttemplate', // Replace with your server's URL
    method: 'GET',
    responseType: 'blob', // Important! This ensures the response is treated as a binary blob
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'template.xlsx')
      document.body.appendChild(link)
      link.click()
    })
    .catch((error) => {
      console.error('Error downloading the file:', error)
    })
}

