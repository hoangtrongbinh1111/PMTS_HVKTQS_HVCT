import { API } from "./API_New"
import axios from 'axios'
export const getListPhanLoaiTotNghiep = async (data) => {
  const uri = `/phanloaitotnghiep/list?page=${data.page}&perPage=${data.perPage}`
  const res = await API.get(uri)
  return res
}
export const searchListPhanLoaiTotNghiep = async (data) => {
  const uri = `/phanloaitotnghiep/list?page=${data.page}&perPage=${data.perPage}&query=${data.tenPhanloai}`
  const res = await API.get(uri)
  return res
}
export const taoPhanLoaiTotNghiep = async (data) => {
  const uri = `/phanloaitotnghiep/add`
  const res = await API.post(uri, data)
  return res
}

export const suaPhanLoaiTotNghiep = async (data) => {
  const uri = `/phanloaitotnghiep/update`
  const res = await API.put(uri, data)
  return res
}

export const xoaPhanLoaiTotNghiep = async (data) => {
  const uri = `/phanloaitotnghiep/delete?id=${data.id}`
  const res = await API.delete(uri)
  return res
}
export const exportPhanLoaiTotNghiep = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/phanloaitotnghiep/export', // Replace with your server's URL
    method: 'GET',
    responseType: 'blob', // Important! This ensures the response is treated as a binary blob
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'phanloaitotnghiep.xlsx')
      document.body.appendChild(link)
      link.click()
    })
    .catch((error) => {
      console.error('Error downloading the file:', error)
    })
}
export const exportPhanLoaiTotNghiepTemplate = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/phanloaitotnghiep/exporttemplate', // Replace with your server's URL
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

