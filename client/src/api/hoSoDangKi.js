import { API } from "./API_New"
import { API_Form } from "./API_FormData"
import axios from 'axios'
export const getListHoSoDangKi = async (data) => {
  const uri = `/hosodangki/list?page=${data.page}&perPage=${data.perPage}`
  const res = await API.get(uri)
  return res
}
export const getListSBD = async (data) => {
  const uri = `/hosodangki/listSBD?page=${data.page}&perPage=${data.perPage}`
  const res = await API.get(uri)
  return res
}
export const searchSBD = async (data) => {
  const uri = `/hosodangki/listSBD?page=${data.page}&perPage=${data.perPage}&query=${data.query}`
  const res = await API.get(uri)
  return res
}
export const getDanhSachDiem = async (data) => {
  const uri = `/hosodangki/getDanhSachDiem?page=${data.page}&perPage=${data.perPage}`
  const res = await API.get(uri)
  return res
}
export const upLoadImage = async (data) => {
  const uri = `/hosodangki/uploadimage`
  const res = await API_Form.post(uri, data)
  return res
}
export const uploadZip = async (data) => {
  const uri = `/hosodangki/uploadzip`
  const res = await API_Form.post(uri, data)
  return res
}
export const getChiTietHoSo = async (data) => {
  const uri = `/hosodangki/getbyid?id=${data.id}`
  const res = await API.get(uri)
  return res
}

export const danhSoBaoDanh = async (data) => {
  const uri = `/hosodangki/danhsobaodanhvachiaphong`
  const res = await API.get(uri)
  return res
}
export const getByChuyenNganh = async (data) => {
  const uri = `/hosodangki/getbychuyennganh`
  const res = await API.get(uri)
  return res
} 

export const getByDiaChiDT = async (data) => {
  const uri = `/hosodangki/getbydiachidt`
  const res = await API.get(uri)
  return res
} 

export const getAllDanhSach = async (data) => {
  const uri = `/hosodangki/getalldanhsach`
  const res = await API.get(uri)
  return res
}

export const thongKeTheoMucDiem = async (data) => {
  const uri = `/hosodangki/thongketheomucdiem`
  const res = await API.get(uri)
  return res
}  
export const getDanhSachPhong = async (data) => {
  const uri = `/hosodangki/getdanhsachtheophong`
  const res = await API.get(uri)
  return res
}
export const getDanhSachThiSinhTheoPhong = async (data) => {
  const uri = `/hosodangki/getdanhsachthisinhtheophong`
  const res = await API.get(uri)
  return res
}
export const getDanhSachPhongVaSoBaoDanh = async (data) => {
  const uri = `/hosodangki/getdanhsachtheophongvasobaodanh`
  const res = await API.get(uri)
  return res
}
export const getDiemThiPhong = async (data) => {
  const uri = `/hosodangki/getdiemthitheophong`
  const res = await API.get(uri)
  return res
} 
export const getByByDiem = async (data) => {
  const uri = `/hosodangki/getbydiem?page=${data.page}&perPage=${data.perPage}&diem=${data.diem}&loaiTS=${data.loaiTS}&maChuyennganhTS=${data.maChuyennganhTS}&maDcdaotao=${data.maDcdaotao}`
  const res = await API.get(uri)
  return res
}
// export const getAllDanhSachDanAnh = async (data) => {
//   const uri = `/hosodangki/getalldanhsachdananh`
//   const res = await API.get(uri)
//   return res
// }
export const getAllDanhSachDanAnh = async () => {
  const preurl = process.env.REACT_APP_API_URL_NEW
  axios({
    url: `${preurl}/api/v1/hosodangki/getalldanhsachdananh`, // Replace with your server's URL
    method: 'GET',
    responseType: 'blob', // Important! This ensures the response is treated as a binary blob
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'danhsachdananh.docx')
      document.body.appendChild(link)
      link.click()
    })
    .catch((error) => {
      console.error('Error downloading the file:', error)
    })
}
export const getTheDuThi = async () => {
  const preurl = process.env.REACT_APP_API_URL_NEW

  axios({
    url: `${preurl}/api/v1/hosodangki/gettheduthi`, // Replace with your server's URL
    method: 'GET',
    responseType: 'blob', // Important! This ensures the response is treated as a binary blob
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'theduthi.docx')
      document.body.appendChild(link)
      link.click()
    })
    .catch((error) => {
      console.error('Error downloading the file:', error)
    })
}
export const searchListHoSoDangKi = async (data) => {
  const uri = `/hosodangki/list?page=${data.page}&perPage=${data.perPage}&query=${data.hoTen}`
  const res = await API.get(uri)
  return res
}
export const taoHoSoDangKi = async (data) => {
  const uri = `/hosodangki/add`
  const res = await API.post(uri, data)
  return res
}
export const TaoNhieuHoSoDangKi = async (data) => {
  const uri = `/hosodangki/taonhieuhoso`
  const res = await API.post(uri, data)
  return res
}

export const suaHoSoDangKi = async (data) => {
  const uri = `/hosodangki/update`
  const res = await API.put(uri, data)
  return res
}

export const xoaHoSoDangKi = async (data) => {
  const uri = `/hosodangki/delete?id=${data.id}`
  const res = await API.delete(uri)
  return res
}
export const exportHoSoDangKi = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/hosodangki/export', // Replace with your server's URL
    method: 'GET',
    responseType: 'blob', // Important! This ensures the response is treated as a binary blob
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'hosodangki.xlsx')
      document.body.appendChild(link)
      link.click()
    })
    .catch((error) => {
      console.error('Error downloading the file:', error)
    })
}
export const exportHoSoDangKiTemplate = async () => {
  axios({
    url: 'http://localhost:4001/api/v1/hosodangki/exporttemplate', // Replace with your server's URL
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

