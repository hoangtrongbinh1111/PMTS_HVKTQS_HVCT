import { API } from "./API_New"
import axios from 'axios'
export const getListDiaChiDaoTao = async (data) => {
  const uri = `/diachidaotao/list?page=${data.page}&perPage=${data.perPage}`
  const res = await API.get(uri)
  return res
}
export const searchListDiaChiDaoTao = async (data) => {
  const uri = `/diachidaotao/list?page=${data.page}&perPage=${data.perPage}&query=${data.tenDc}`
  const res = await API.get(uri)
  return res
}
export const taoDiaChiDaoTao = async (data) => {
  const uri = `/diachidaotao/add`
  const res = await API.post(uri, data)
  return res
}

export const suaDiaChiDaoTao = async (data) => {
  const uri = `/diachidaotao/update`
  const res = await API.put(uri, data)
  return res
}

export const xoaDiaChiDaoTao = async (data) => {
  const uri = `/diachidaotao/delete?id=${data.id}`
  const res = await API.delete(uri)
  return res
}
export const exportDiaChiDaoTao = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/diachidaotao/export', // Replace with your server's URL
    method: 'GET',
    responseType: 'blob', // Important! This ensures the response is treated as a binary blob
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'diachidaotao.xlsx')
      document.body.appendChild(link)
      link.click()
    })
    .catch((error) => {
      console.error('Error downloading the file:', error)
    })
}
export const exportDiaChiDaoTaoTemplate = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/diachidaotao/exporttemplate', // Replace with your server's URL
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

