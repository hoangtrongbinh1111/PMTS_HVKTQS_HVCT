import { API } from "./API_New"
import axios from 'axios'
export const getListMonThi = async (data) => {
  const uri = `/monthi/list?page=${data.page}&perPage=${data.perPage}`
  const res = await API.get(uri)
  return res
}
export const searchListMonThi = async (data) => {
  const uri = `/monthi/list?page=${data.page}&perPage=${data.perPage}&query=${data.tenMon}`
  const res = await API.get(uri)
  return res
}
export const taoMonThi = async (data) => {
  const uri = `/monthi/add`
  const res = await API.post(uri, data)
  return res
}

export const suaMonThi = async (data) => {
  const uri = `/monthi/update`
  const res = await API.put(uri, data)
  return res
}

export const thongkePhongMon = async (data) => {
  const uri = `/monthi/thongkephongmon`
  const res = await API.get(uri)
  return res
}

export const thongkeMonPhong = async (data) => {
  const uri = `/monthi/thongkemonphong`
  const res = await API.get(uri)
  return res
}

export const thongkeTheoMon = async (data) => {
  const uri = `/monthi/thongketheomon`
  const res = await API.get(uri)
  return res
}

export const xoaMonThi = async (data) => {
  const uri = `/monthi/delete?id=${data.id}`
  const res = await API.delete(uri)
  return res
}
export const exportMonThi = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/monthi/export', // Replace with your server's URL
    method: 'GET',
    responseType: 'blob', // Important! This ensures the response is treated as a binary blob
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'monthi.xlsx')
      document.body.appendChild(link)
      link.click()
    })
    .catch((error) => {
      console.error('Error downloading the file:', error)
    })
}
export const exportMonThiTemplate = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/monthi/exporttemplate', // Replace with your server's URL
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

