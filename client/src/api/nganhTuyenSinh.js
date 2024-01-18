import { API } from "./API_New"
import axios from 'axios'
export const getListNganhTuyenSinh = async (data) => {
  const uri = `/nganhtuyensinh/list?page=${data.page}&perPage=${data.perPage}`
  const res = await API.get(uri)
  return res
}
export const searchListNganhTuyenSinh = async (data) => {
  const uri = `/nganhtuyensinh/list?page=${data.page}&perPage=${data.perPage}&query=${data.tenNganh}`
  const res = await API.get(uri)
  return res
}

export const taoNganhTuyenSinh = async (data) => {
  const uri = `/nganhtuyensinh/add`
  const res = await API.post(uri, data)
  return res
}

export const suaNganhTuyenSinh = async (data) => {
  const uri = `/nganhtuyensinh/update`
  const res = await API.put(uri, data)
  return res
}

export const xoaNganhTuyenSinh = async (data) => {
  const uri = `/nganhtuyensinh/delete?id=${data.id}`
  const res = await API.delete(uri)
  return res
}
export const exportNganhTuyenSinh = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/nganhtuyensinh/export', // Replace with your server's URL
    method: 'GET',
    responseType: 'blob', // Important! This ensures the response is treated as a binary blob
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'nganhtuyensinh.xlsx')
      document.body.appendChild(link)
      link.click()
    })
    .catch((error) => {
      console.error('Error downloading the file:', error)
    })
}
export const exportNganhTuyenSinhTemplate = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/nganhtuyensinh/exporttemplate', // Replace with your server's URL
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

