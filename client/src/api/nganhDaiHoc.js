import { API } from "./API_New"
import axios from 'axios'
export const getListNganhDaiHoc = async (data) => {
  const uri = `/nganhdaihoc/list?page=${data.page}&perPage=${data.perPage}`
  const res = await API.get(uri)
  return res
}
export const searchListNganhDaiHoc = async (data) => {
  const uri = `/nganhdaihoc/list?page=${data.page}&perPage=${data.perPage}&query=${data.tenNganh}`
  const res = await API.get(uri)
  return res
}
export const taoNganhDaiHoc = async (data) => {
  const uri = `/nganhdaihoc/add`
  const res = await API.post(uri, data)
  return res
}

export const suaNganhDaiHoc = async (data) => {
  const uri = `/nganhdaihoc/update`
  const res = await API.put(uri, data)
  return res
}

export const xoaNganhDaiHoc = async (data) => {
  const uri = `/nganhdaihoc/delete?id=${data.id}`
  const res = await API.delete(uri)
  return res
}

export const kiemTraNganh = async (data) => {
  const uri = `/nganhdaihoc/kiemTraNganh`
  const res = await API.post(uri, data)
  return res
}

export const exportNganhDaiHoc = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/nganhdaihoc/export', // Replace with your server's URL
    method: 'GET',
    responseType: 'blob', // Important! This ensures the response is treated as a binary blob
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'nganhdaihoc.xlsx')
      document.body.appendChild(link)
      link.click()
    })
    .catch((error) => {
      console.error('Error downloading the file:', error)
    })
}
export const exportNganhDaiHocTemplate = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/nganhdaihoc/exporttemplate', // Replace with your server's URL
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

