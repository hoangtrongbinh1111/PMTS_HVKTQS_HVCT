import { API } from "./API_New"
import axios from 'axios'
export const getListNhomMonThi = async (data) => {
  const uri = `/nhommonthi/list?page=${data.page}&perPage=${data.perPage}`
  const res = await API.get(uri)
  return res
}
export const searchListNhomMonThi = async (data) => {
  const uri = `/nhommonthi/list?page=${data.page}&perPage=${data.perPage}&query=${data.tenNhomMonHoc}`
  const res = await API.get(uri)
  return res
}
export const taoNhomMonThi = async (data) => {
  const uri = `/nhommonthi/add`
  const res = await API.post(uri, data)
  return res
}

export const suaNhomMonThi = async (data) => {
  const uri = `/nhommonthi/update`
  const res = await API.put(uri, data)
  return res
}

export const xoaNhomMonThi = async (data) => {
  const uri = `/nhommonthi/delete?id=${data.id}`
  const res = await API.delete(uri)
  return res
}
export const exportNhomMonThi = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/nhommonthi/export', // Replace with your server's URL
    method: 'GET',
    responseType: 'blob', // Important! This ensures the response is treated as a binary blob
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'nhommonthi.xlsx')
      document.body.appendChild(link)
      link.click()
    })
    .catch((error) => {
      console.error('Error downloading the file:', error)
    })
}
export const exportNhomMonThiTemplate = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/nhommonthi/exporttemplate', // Replace with your server's URL
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

