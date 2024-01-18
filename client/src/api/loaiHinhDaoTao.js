import { API } from "./API_New"
import axios from 'axios'
export const getListLoaiHinhDaoTao = async (data) => {
  const uri = `/loaihinhdaotao/list?page=${data.page}&perPage=${data.perPage}`
  const res = await API.get(uri)
  return res
}
export const searchListLoaiHinhDaoTao = async (data) => {
  const uri = `/loaihinhdaotao/list?page=${data.page}&perPage=${data.perPage}&query=${data.tenLoaiHinh}`
  const res = await API.get(uri)
  return res
}
export const taoLoaiHinhDaoTao = async (data) => {
  const uri = `/loaihinhdaotao/add`
  const res = await API.post(uri, data)
  return res
}

export const suaLoaiHinhDaoTao = async (data) => {
  const uri = `/loaihinhdaotao/update`
  const res = await API.put(uri, data)
  return res
}

export const xoaLoaiHinhDaoTao = async (data) => {
  const uri = `/loaihinhdaotao/delete?id=${data.id}`
  const res = await API.delete(uri)
  return res
}
export const exportLoaiHinhDaoTao = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/loaihinhdaotao/export', // Replace with your server's URL
    method: 'GET',
    responseType: 'blob', // Important! This ensures the response is treated as a binary blob
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'loaihinhdaotao.xlsx')
      document.body.appendChild(link)
      link.click()
    })
    .catch((error) => {
      console.error('Error downloading the file:', error)
    })
}
export const exportLoaiHinhDaoTaoTemplate = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/loaihinhdaotao/exporttemplate', // Replace with your server's URL
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

