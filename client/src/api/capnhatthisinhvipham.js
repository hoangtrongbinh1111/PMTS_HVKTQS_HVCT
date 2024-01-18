import { API } from "./API_New"
import { API_Form } from "./API_FormData"
export const timKiemThiSinh = async (data) => {
    const uri = `/capnhatthisinhvipham/search?SBD=${data.SBD}&ten=${data.ten}&phongthi=${data.phongthi}`
    const res = await API.get(uri, data)
    return res
}
export const suaVipham = async (data) => {
    const uri = `/capnhatthisinhvipham/update`
    const res = await API.put(uri, data)
    return res
  }
export const xoaVipham = async (data) => {
    const uri = `/capnhatthisinhvipham/delete?maHoso=${data.maHoso}`
    const res = await API.get(uri, data)
    return res
  }
export const getListDanhSachViPham = async (data) => {
    const uri = `/capnhatthisinhvipham/list`
    const res = await API.get(uri, data)
    return res
}

export const addDanhSachViPham = async (data) => {
    const uri = `/capnhatthisinhvipham/create`
    const res = await API.post(uri, data)
    return res
}