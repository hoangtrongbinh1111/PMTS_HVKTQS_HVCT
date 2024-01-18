import { API } from "./API_New"
import axios from 'axios'
export const taoPhachDonTui = async (data) => {
  const uri = `/dontuidanhphach/generate`
  const res = await API.post(uri, data)
  return res
}
export const taoPhach = async (data) => {
  const uri = `/dontuidanhphach/taophach`
  const res = await API.post(uri, data)
  return res
}
export const checkBaithiTuithi = async () => {
  const uri = `/dontuidanhphach/check`
  const res = await API.get(uri)
  return res
}