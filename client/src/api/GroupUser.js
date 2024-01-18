import { API } from "./API_New"
import axios from 'axios'
export const getListGroupUser = async (data) => {
  const uri = `/groupuser/list?page=${data.page}&perPage=${data.perPage}`
  const res = await API.get(uri)
  return res
}
export const searchListGroupUser = async (data) => {
  const uri = `/groupuser/list?page=${data.page}&perPage=${data.perPage}&query=${data.tenNhom}`
  const res = await API.get(uri)
  return res
}
export const createGroupUser = async (data) => {
  const uri = `/groupuser/add`
  const res = await API.post(uri, data)
  return res
}

export const updateGroupUser = async (data) => {
  const uri = `/groupuser/update`
  const res = await API.put(uri, data)
  return res
}

export const deleteGroupUser = async (data) => {
  const uri = `/groupuser/delete?id=${data.id}`
  const res = await API.delete(uri)
  return res
}

export const getRoleById = async (data) => {
  const uri = `/groupuser/getRoleById`
  const res = await API.get(uri, data)
  return res
}

export const getListRoles = async () => {
  const uri = `/groupuser/getListRoles`
  const res = await API.get(uri)
  return res
}

export const updateRole = async (data) => {
  const uri = `/groupuser/updateRole`
  const res = await API.post(uri, data)
  return res
}
export const exportGroupUser = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/groupuser/export', // Replace with your server's URL
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
export const exportGroupUserTemplate = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/groupuser/exporttemplate', // Replace with your server's URL
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

