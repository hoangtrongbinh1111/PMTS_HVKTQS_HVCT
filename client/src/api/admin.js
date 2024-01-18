import { API } from './API'

export const putAdminBank = async (data) => {
    const uri = `/api/admin/bank`
    const res = await API.put(uri, data)
    return res.data
}

export const putAdminDoc = async (data) => {
    const uri = `/api/admin/document`
    const res = await API.put(uri, data)
    return res.data
}

export const putRelativeCustomer = async (data) => {
    const uri = `/api/admin/relative_customer`
    const res = await API.put(uri, data)
    return res.data
}

export const putCustomer = async (data) => {
    const uri = `/api/admin/customer`
    const res = await API.put(uri, data)
    return res.data
}