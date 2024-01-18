import { API } from "./API_New"
import { API_Form } from "./API_FormData"

import axios from 'axios'
export const getListUser = async (data) => {
  const uri = `/user/list`
  const res = await API.get(uri, data)
  return res
}
export const upLoadImage = async (data) => {
  const uri = `/user/uploadimage`
  const res = await API_Form.post(uri, data)
  return res
}
export const searchListUser = async (data) => {
  const uri = `/user/list?page=${data.page}&perPage=${data.perPage}&query=${data.tenNhom}`
  const res = await API.get(uri)
  return res
}
export const createUser = async (data) => {
  const uri = `/user/add`
  const res = await API.post(uri, data)
  return res
}

export const updateUser = async (data) => {
  const uri = `/user/update`
  const res = await API.put(uri, data)
  return res
}

export const deleteUser = async (data) => {
  const uri = `/user/delete?id=${data.id}`
  const res = await API.delete(uri)
  return res
}

export const getUserById = async (data) => {
  const uri = `/user/getUserById`
  const res = await API.get(uri, data)
  return res
}

export const exportUser = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/user/export', // Replace with your server's URL
    method: 'GET',
    responseType: 'blob', // Important! This ensures the response is treated as a binary blob
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'output.xlsx')
      document.body.appendChild(link)
      link.click()
    })
    .catch((error) => {
      console.error('Error downloading the file:', error)
    })
}
export const exportUserTemplate = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/user/exporttemplate', // Replace with your server's URL
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

