import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ACTION_METHOD_MEAN, ACTION_METHOD_TYPE } from './constant'
const responseResultHelper = (res, modalPopupFunc, callApi, actionType) => {
    const MySwal = withReactContent(Swal)
    if (res?.status) {
        MySwal.fire({
            icon: "success",
            title: ACTION_METHOD_MEAN[actionType],
            customClass: {
                confirmButton: "btn btn-success"
            }
        })
        if (modalPopupFunc) {
            modalPopupFunc(false)
        }
        if (callApi) {
            callApi()
        }
    } else {
        MySwal.fire({
            icon: "error",
            title: "Có lỗi xảy ra",
            text: "Vui lòng thử lại",
            customClass: {
                confirmButton: "btn btn-danger"
            }
        })
    }
}
export default responseResultHelper