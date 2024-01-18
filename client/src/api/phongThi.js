import { API } from "./API_New"
import axios from 'axios'
export const getListPhongThi = async (data) => {
  const uri = `/phongthi/list?page=${data.page}&perPage=${data.perPage}`
  const res = await API.get(uri)
  return res
}
export const searchListPhongThi = async (data) => {
  const uri = `/phongthi/list?page=${data.page}&perPage=${data.perPage}&query=${data.tenChuyennganh }`
  const res = await API.get(uri)
  return res
}
export const taoPhongThi = async (data) => {
  const uri = `/phongthi/add`
  const res = await API.post(uri, data)
  return res
}

export const suaPhongThi = async (data) => {
  const uri = `/phongthi/update`
  const res = await API.put(uri, data)
  return res
}

export const xoaPhongThi = async (data) => {
  const uri = `/phongthi/delete?id=${data.id}`
  const res = await API.delete(uri)
  return res
}
export const exportPhongThi = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/phongthi/export', // Replace with your server's URL
    method: 'GET',
    responseType: 'blob', // Important! This ensures the response is treated as a binary blob
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'phongthi.xlsx')
      document.body.appendChild(link)
      link.click()
    })
    .catch((error) => {
      console.error('Error downloading the file:', error)
    })
}
export const exportPhongThiTemplate = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/phongthi/exporttemplate', // Replace with your server's URL
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

