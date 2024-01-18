import { API } from "./API_New"
import axios from 'axios'
export const getListTinh = async (data) => {
  const uri = `/tinh/list?page=${data.page}&perPage=${data.perPage}`
  const res = await API.get(uri)
  return res
}
export const searchListTinh = async (data) => {
  const uri = `/tinh/list?page=${data.page}&perPage=${data.perPage}&query=${data.tenTinh}`
  const res = await API.get(uri)
  return res
}
export const taoTinh = async (data) => {
  const uri = `/tinh/add`
  const res = await API.post(uri, data)
  return res
}

export const suaTinh = async (data) => {
  const uri = `/tinh/update`
  const res = await API.put(uri, data)
  return res
}

export const xoaTinh = async (data) => {
  const uri = `/tinh/delete?id=${data.id}`
  const res = await API.delete(uri)
  return res
}
export const exportTinh = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/tinh/export', // Replace with your server's URL
    method: 'GET',
    responseType: 'blob', // Important! This ensures the response is treated as a binary blob
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'tinh.xlsx')
      document.body.appendChild(link)
      link.click()
    })
    .catch((error) => {
      console.error('Error downloading the file:', error)
    })
}
export const exportTinhTemplate = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/tinh/exporttemplate', // Replace with your server's URL
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

