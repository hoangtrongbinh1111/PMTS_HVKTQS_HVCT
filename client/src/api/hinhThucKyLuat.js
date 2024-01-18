import { API } from "./API_New"
import axios from 'axios'
export const getListHinhThucKyLuat = async (data) => {
  const uri = `/hinhthuckyluat/list?page=${data.page}&perPage=${data.perPage}`
  const res = await API.get(uri)
  return res
}
export const searchListHinhThucKyLuat = async (data) => {
  const uri = `/hinhthuckyluat/list?page=${data.page}&perPage=${data.perPage}&query=${data.tenHinhthuc}`
  const res = await API.get(uri)
  return res
}
export const taoHinhThucKyLuat = async (data) => {
  const uri = `/hinhthuckyluat/add`
  const res = await API.post(uri, data)
  return res
}

export const suaHinhThucKyLuat = async (data) => {
  const uri = `/hinhthuckyluat/update`
  const res = await API.put(uri, data)
  return res
}

export const xoaHinhThucKyLuat = async (data) => {
  const uri = `/hinhthuckyluat/delete?id=${data.id}`
  const res = await API.delete(uri)
  return res
}
export const exportHinhThucKyLuat = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/hinhthuckyluat/export', // Replace with your server's URL
    method: 'GET',
    responseType: 'blob', // Important! This ensures the response is treated as a binary blob
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'hinhthuckyluat.xlsx')
      document.body.appendChild(link)
      link.click()
    })
    .catch((error) => {
      console.error('Error downloading the file:', error)
    })
}
export const exportHinhThucKyLuatTemplate = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/hinhthuckyluat/exporttemplate', // Replace with your server's URL
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

