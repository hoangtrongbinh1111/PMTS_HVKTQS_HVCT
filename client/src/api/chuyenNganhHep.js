import { API } from "./API_New"
import axios from 'axios'
export const getListChuyenNganhHep = async (data) => {
  const uri = `/chuyennganhhep/list?page=${data.page}&perPage=${data.perPage}`
  const res = await API.get(uri)
  return res
}
export const searchListChuyenNganhHep = async (data) => {
  const uri = `/chuyennganhhep/list?page=${data.page}&perPage=${data.perPage}&query=${data.tenChuyennganhhep}`
  const res = await API.get(uri)
  return res
}
export const taoChuyenNganhHep = async (data) => {
  const uri = `/chuyennganhhep/add`
  const res = await API.post(uri, data)
  return res
}

export const suaChuyenNganhHep = async (data) => {
  const uri = `/chuyennganhhep/update`
  const res = await API.put(uri, data)
  return res
}

export const xoaChuyenNganhHep = async (data) => {
  const uri = `/chuyennganhhep/delete?id=${data.id}`
  const res = await API.delete(uri)
  return res
}
export const exportChuyenNganhHep = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/chuyennganhhep/export', // Replace with your server's URL
    method: 'GET',
    responseType: 'blob', // Important! This ensures the response is treated as a binary blob
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'chuyennganhhep.xlsx')
      document.body.appendChild(link)
      link.click()
    })
    .catch((error) => {
      console.error('Error downloading the file:', error)
    })
}
export const exportChuyenNganhHepTemplate = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/chuyennganhhep/exporttemplate', // Replace with your server's URL
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

