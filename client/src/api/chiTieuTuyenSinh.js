import { API } from "./API_New"
export const getListChiTieu = async (data) => {
  const uri = `/chitieutuyensinh/getListChiTieu`
  const res = await API.get(uri, data)
  return res
} 
export const getListChiTieuVaSoLuong = async (data) => {
  const uri = `/chitieutuyensinh/getListChiTieuVaSoLuong`
  const res = await API.get(uri, data)
  return res
}
export const getListDuDieuKienXetTuyen = async (data) => {
  const uri = `/chitieutuyensinh/dudieukienxettuyen`
  const res = await API.get(uri, data)
  return res
}
export const DuKienDiem = async (data) => {
  const uri = `/chitieutuyensinh/dukiendiem`
  const res = await API.get(uri, data)
  return res
}
export const getListChiTieuDetail = async (data) => {
  const uri = `/chitieutuyensinh/getListChiTieuDetail`
  const res = await API.get(uri, data)
  return res
}

export const getListDCNot = async (data) => {
  const uri = `/chitieutuyensinh/getListDCNot`
  const res = await API.get(uri, data)
  return res
}

export const updateCT = async (data) => {
  const uri = `/chitieutuyensinh/update`
  const res = await API.post(uri, data)
  return res
}

export const deleteCNTS = async (data) => {
  const uri = `/chitieutuyensinh/deleteCNTS`
  const res = await API.post(uri, data)
  return res
}

export const deleteCT = async (data) => {
  const uri = `/chitieutuyensinh/delete`
  const res = await API.delete(uri, data)
  return res
}

export const createNewCT = async (data) => {
  const uri = `/chitieutuyensinh/create`
  const res = await API.post(uri, data)
  return res
}

export const searchListChiTieu = async (data) => {
  const uri = `/chuyennganh/getListChiTieu?page=${data.page}&perPage=${data.perPage}`
  const res = await API.get(uri)
  return res
}

export const getDataToExport = async (data) => {
  const uri = `/chitieutuyensinh/getDataToExport`
  const res = await API.get(uri, data)
  return res
}