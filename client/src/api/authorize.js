import { API } from './API_New'

export const updateRole = async (data) => {
    const uri = `/admin/update-role`
    const res = await API.post(uri, data)
    return res
}

export const getListRole = async () => {
    const uri = `/admin/get-list-role`
    const res = await API.get(uri)
    return res
}
