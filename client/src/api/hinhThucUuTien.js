import { API } from "./API_New"
import axios from 'axios'
export const getListHinhThucUuTien = async (data) => {
  const uri = `/hinhthucuutien/list?page=${data.page}&perPage=${data.perPage}`
  const res = await API.get(uri)
  return res
}
export const searchListHinhThucUuTien = async (data) => {
  const uri = `/hinhthucuutien/list?page=${data.page}&perPage=${data.perPage}&query=${data.tenHinhthuc}`
  const res = await API.get(uri)
  return res
}
export const taoHinhThucUuTien = async (data) => {
  const uri = `/hinhthucuutien/add`
  const res = await API.post(uri, data)
  return res
}

export const suaHinhThucUuTien = async (data) => {
  const uri = `/hinhthucuutien/update`
  const res = await API.put(uri, data)
  return res
}

export const xoaHinhThucUuTien = async (data) => {
  const uri = `/hinhthucuutien/delete?id=${data.id}`
  const res = await API.delete(uri)
  return res
}
export const exportHinhThucUuTien = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/hinhthucuutien/export', // Replace with your server's URL
    method: 'GET',
    responseType: 'blob', // Important! This ensures the response is treated as a binary blob
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'hinhthucuutien.xlsx')
      document.body.appendChild(link)
      link.click()
    })
    .catch((error) => {
      console.error('Error downloading the file:', error)
    })
}
export const exportHinhThucUuTienTemplate = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/hinhthucuutien/exporttemplate', // Replace with your server's URL
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

