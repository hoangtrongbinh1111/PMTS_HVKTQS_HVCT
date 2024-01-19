import { API } from "./API_New"
import axios from 'axios'
export const getListTruongDaiHoc = async (data) => {
  const uri = `/truongdaihoc/list?page=${data.page}&perPage=${data.perPage}`
  const res = await API.get(uri)
  return res
}
export const searchListTruongDaiHoc = async (data) => {
  const uri = `/truongdaihoc/list?page=${data.page}&perPage=${data.perPage}&query=${data.tenTruong}`
  const res = await API.get(uri)
  return res
}
export const taoTruongDaiHoc = async (data) => {
  const uri = `/truongdaihoc/add`
  const res = await API.post(uri, data)
  return res
}

export const suaTruongDaiHoc = async (data) => {
  const uri = `/truongdaihoc/update`
  const res = await API.put(uri, data)
  return res
}

export const xoaTruongDaiHoc = async (data) => {
  const uri = `/truongdaihoc/delete?id=${data.id}`
  const res = await API.delete(uri)
  return res
}

export const kiemTraTruong = async (data) => {
  const uri = `/truongdaihoc/kiemTraTruong`
  const res = await API.post(uri, data)
  return res
}

export const exportTruongDaiHoc = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/truongdaihoc/export', // Replace with your server's URL
    method: 'GET',
    responseType: 'blob', // Important! This ensures the response is treated as a binary blob
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'truongdaihoc.xlsx')
      document.body.appendChild(link)
      link.click()
    })
    .catch((error) => {
      console.error('Error downloading the file:', error)
    })
}
export const exportTruongDaiHocTemplate = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/truongdaihoc/exporttemplate', // Replace with your server's URL
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

