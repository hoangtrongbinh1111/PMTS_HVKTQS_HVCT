import { API } from "./API_New"
import axios from 'axios'
export const getListChucVu = async (data) => {
  const uri = `/chucvu/list?page=${data.page}&perPage=${data.perPage}`
  const res = await API.get(uri)
  return res
}
export const searchListChucVu = async (data) => {
  const uri = `/chucvu/list?page=${data.page}&perPage=${data.perPage}&query=${data.tenChucvu}`
  const res = await API.get(uri)
  return res
}
export const taoChucVu = async (data) => {
  const uri = `/chucvu/add`
  const res = await API.post(uri, data)
  return res
}

export const suaChucVu = async (data) => {
  const uri = `/chucvu/update`
  const res = await API.put(uri, data)
  return res
}

export const xoaChucVu = async (data) => {
  const uri = `/chucvu/delete?id=${data.id}`
  const res = await API.delete(uri)
  return res
}
export const exportChucVu = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/chucvu/export', // Replace with your server's URL
    method: 'GET',
    responseType: 'blob', // Important! This ensures the response is treated as a binary blob
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'chucvu.xlsx')
      document.body.appendChild(link)
      link.click()
    })
    .catch((error) => {
      console.error('Error downloading the file:', error)
    })
}
export const exportChucVuTemplate = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/chucvu/exporttemplate', // Replace with your server's URL
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

