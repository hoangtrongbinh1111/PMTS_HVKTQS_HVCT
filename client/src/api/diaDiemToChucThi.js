import { API } from "./API_New"
import axios from 'axios'
export const getListDiaDiemToChucThi = async (data) => {
  const uri = `/diadiemtochucthi/list?page=${data.page}&perPage=${data.perPage}`
  const res = await API.get(uri)
  return res
}
export const searchListDiaDiemToChucThi = async (data) => {
  const uri = `/diadiemtochucthi/list?page=${data.page}&perPage=${data.perPage}&query=${data.tenDiadiem}`
  const res = await API.get(uri)
  return res
}
export const taoDiaDiemToChucThi = async (data) => {
  const uri = `/diadiemtochucthi/add`
  const res = await API.post(uri, data)
  return res
}

export const suaDiaDiemToChucThi = async (data) => {
  const uri = `/diadiemtochucthi/update`
  const res = await API.put(uri, data)
  return res
}

export const xoaDiaDiemToChucThi = async (data) => {
  const uri = `/diadiemtochucthi/delete?id=${data.id}`
  const res = await API.delete(uri)
  return res
}
export const exportDiaDiemToChucThi = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/diadiemtochucthi/export', // Replace with your server's URL
    method: 'GET',
    responseType: 'blob', // Important! This ensures the response is treated as a binary blob
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'diadiemtochucthi.xlsx')
      document.body.appendChild(link)
      link.click()
    })
    .catch((error) => {
      console.error('Error downloading the file:', error)
    })
}
export const exportDiaDiemToChucThiTemplate = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/diadiemtochucthi/exporttemplate', // Replace with your server's URL
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

