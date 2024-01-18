import { API } from "./API_New"
export const getInfo = async () => {
  const uri = `/thamsohethong/getInfo`
  const res = await API.get(uri)
  return res
}

export const update = async (data) => {
  console.log(data)
  const uri = `/thamsohethong/update`
  const res = await API.post(uri, data)
  return res
}
