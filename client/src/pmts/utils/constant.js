export const ACTION_METHOD_TYPE = {
    CREATED: "CREATED",
    DANHSOBAODANH: "DANHSOBAODANH",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    IMPORT: "IMPORT",
    GET: "GET",
    SWITCH: "SWITCH",
    SAVE: "SAVE",
    IMPORTEXCEL: "IMPORTEXCEL",
    UPLOADZIP: "UPLOADZIP",
    DONTUIDANHPHACH: "DONTUIDANHPHACH",
    UPDATESCORE_SUCCESS: "UPDATESCORE_SUCCESS"
}
export const ACTION_METHOD_MEAN = {
    CREATED: 'Tạo mới thành công',
    UPDATE: 'Cập nhật thành công',
    DELETE: 'Xóa thành công',
    IMPORT: 'Nhập dữ liệu thành công',
    DANHSOBAODANH: 'Đánh số báo danh và chia phòng thành công',
    SWITCH: 'Nạp dữ liệu thành công',
    SAVE: 'Lưu dữ liệu thành công',
    IMPORTEXCEL: 'Nhập dữ liệu thành công',
    UPLOADZIP: 'Tải file ảnh thành công',
    DONTUIDANHPHACH: '  Dồn túi đánh phách thành công',
    UPDATESCORE_SUCCESS: 'Lưu điểm thành công'
}
export const rolesArr = [
    {
        id: "dottuyensinh",
        roleName: 'Đợt tuyển sinh',
        actions: [
            {
                id: "read-dottuyensinh",
                action: "read",
                subject: "dottuyensinh",
                desc: "Xem"
            },
            {
                id: "add-dottuyensinh",
                action: "add",
                subject: "dottuyensinh",
                desc: "Thêm"
            },
            {
                id: "update-dottuyensinh",
                action: "update",
                subject: "dottuyensinh",
                desc: "Sửa"
            },
            {
                id: "delete-dottuyensinh",
                action: "delete",
                subject: "dottuyensinh",
                desc: "Xóa"
            },
            {
                id: "switch-dottuyensinh",
                action: "switch",
                subject: "dottuyensinh",
                desc: "Chuyển"
            }
        ]
    },
    {
        id: "dsnganh",
        roleName: 'DM Ngành tuyển sinh',
        actions: [
            {
                id: "read-dsnganh",
                action: "read",
                subject: "dsnganh",
                desc: "Xem"
            },
            {
                id: "add-dsnganh",
                action: "add",
                subject: "dsnganh",
                desc: "Thêm"
            },
            {
                id: "update-dsnganh",
                action: "update",
                subject: "dsnganh",
                desc: "Sửa"
            },
            {
                id: "delete-dsnganh",
                action: "delete",
                subject: "dsnganh",
                desc: "Xóa"
            }
        ]
    },
    {
        id: "dschuyennganh",
        roleName: 'DM Chuyên ngành tuyển sinh',
        actions: [
            {
                id: "read-dschuyennganh",
                action: "read",
                subject: "dschuyennganh",
                desc: "Xem"
            },
            {
                id: "add-dschuyennganh",
                action: "add",
                subject: "dschuyennganh",
                desc: "Thêm"
            },
            {
                id: "update-dschuyennganh",
                action: "update",
                subject: "dschuyennganh",
                desc: "Sửa"
            },
            {
                id: "delete-dschuyennganh",
                action: "delete",
                subject: "dschuyennganh",
                desc: "Xóa"
            }
        ]
    },
    {
        id: "nhommonthi",
        roleName: 'DM nhóm môn thi',
        actions: [
            {
                id: "read-nhommonthi",
                action: "read",
                subject: "nhommonthi",
                desc: "Xem"
            },
            {
                id: "add-nhommonthi",
                action: "add",
                subject: "nhommonthi",
                desc: "Thêm"
            },
            {
                id: "update-nhommonthi",
                action: "update",
                subject: "nhommonthi",
                desc: "Sửa"
            },
            {
                id: "delete-nhommonthi",
                action: "delete",
                subject: "nhommonthi",
                desc: "Xóa"
            }
        ]
    },
    {
        id: "monthi",
        roleName: 'DM môn thi',
        actions: [
            {
                id: "read-monthi",
                action: "read",
                subject: "monthi",
                desc: "Xem"
            },
            {
                id: "add-monthi",
                action: "add",
                subject: "monthi",
                desc: "Thêm"
            },
            {
                id: "update-monthi",
                action: "update",
                subject: "monthi",
                desc: "Sửa"
            },
            {
                id: "delete-monthi",
                action: "delete",
                subject: "monthi",
                desc: "Xóa"
            }
        ]
    },
    {
        id: "diachidaotao",
        roleName: 'DM Địa chỉ đào tạo',
        actions: [
            {
                id: "read-diachidaotao",
                action: "read",
                subject: "diachidaotao",
                desc: "Xem"
            },
            {
                id: "add-diachidaotao",
                action: "add",
                subject: "diachidaotao",
                desc: "Thêm"
            },
            {
                id: "update-diachidaotao",
                action: "update",
                subject: "diachidaotao",
                desc: "Sửa"
            },
            {
                id: "delete-diachidaotao",
                action: "delete",
                subject: "diachidaotao",
                desc: "Xóa"
            }
        ]
    },
    {
        id: "ddtochucthi",
        roleName: 'DM Địa điểm Tổ chức thi',
        actions: [
            {
                id: "read-ddtochucthi",
                action: "read",
                subject: "ddtochucthi",
                desc: "Xem"
            },
            {
                id: "add-ddtochucthi",
                action: "add",
                subject: "ddtochucthi",
                desc: "Thêm"
            },
            {
                id: "update-ddtochucthi",
                action: "update",
                subject: "ddtochucthi",
                desc: "Sửa"
            },
            {
                id: "delete-ddtochucthi",
                action: "delete",
                subject: "ddtochucthi",
                desc: "Xóa"
            }
        ]
    },
    {
        id: "truongdaihoc",
        roleName: 'DM trường ĐT bậc Đại học',
        actions: [
            {
                id: "read-truongdaihoc",
                action: "read",
                subject: "truongdaihoc",
                desc: "Xem"
            },
            {
                id: "add-truongdaihoc",
                action: "add",
                subject: "truongdaihoc",
                desc: "Thêm"
            },
            {
                id: "update-truongdaihoc",
                action: "update",
                subject: "truongdaihoc",
                desc: "Sửa"
            },
            {
                id: "delete-truongdaihoc",
                action: "delete",
                subject: "truongdaihoc",
                desc: "Xóa"
            }
        ]
    },
    {
        id: "nganh",
        roleName: 'DM ngành  ĐT bậc Đại học',
        actions: [
            {
                id: "read-nganh",
                action: "read",
                subject: "nganh",
                desc: "Xem"
            },
            {
                id: "add-nganh",
                action: "add",
                subject: "nganh",
                desc: "Thêm"
            },
            {
                id: "update-nganh",
                action: "update",
                subject: "nganh",
                desc: "Sửa"
            },
            {
                id: "delete-nganh",
                action: "delete",
                subject: "nganh",
                desc: "Xóa"
            }
        ]
    },
    {
        id: "lhdaotao",
        roleName: 'DM Loại hình ĐT ĐH',
        actions: [
            {
                id: "read-lhdaotao",
                action: "read",
                subject: "lhdaotao",
                desc: "Xem"
            },
            {
                id: "add-lhdaotao",
                action: "add",
                subject: "lhdaotao",
                desc: "Thêm"
            },
            {
                id: "update-lhdaotao",
                action: "update",
                subject: "lhdaotao",
                desc: "Sửa"
            },
            {
                id: "delete-lhdaotao",
                action: "delete",
                subject: "lhdaotao",
                desc: "Xóa"
            }
        ]
    },
    {
        id: "pltotnghiep",
        roleName: 'DM Phân loại TN',
        actions: [
            {
                id: "read-pltotnghiep",
                action: "read",
                subject: "pltotnghiep",
                desc: "Xem"
            },
            {
                id: "add-pltotnghiep",
                action: "add",
                subject: "pltotnghiep",
                desc: "Thêm"
            },
            {
                id: "update-pltotnghiep",
                action: "update",
                subject: "pltotnghiep",
                desc: "Sửa"
            },
            {
                id: "delete-pltotnghiep",
                action: "delete",
                subject: "pltotnghiep",
                desc: "Xóa"
            }
        ]
    },
    {
        id: "doituonguutien",
        roleName: 'DM Đối tượng ưu tiên',
        actions: [
            {
                id: "read-doituonguutien",
                action: "read",
                subject: "doituonguutien",
                desc: "Xem"
            },
            {
                id: "add-doituonguutien",
                action: "add",
                subject: "doituonguutien",
                desc: "Thêm"
            },
            {
                id: "update-doituonguutien",
                action: "update",
                subject: "doituonguutien",
                desc: "Sửa"
            },
            {
                id: "delete-doituonguutien",
                action: "delete",
                subject: "doituonguutien",
                desc: "Xóa"
            }
        ]
    },
    {
        id: "hinhthuckiluat",
        roleName: 'DM Hình thức kỷ luật',
        actions: [
            {
                id: "read-hinhthuckiluat",
                action: "read",
                subject: "hinhthuckiluat",
                desc: "Xem"
            },
            {
                id: "add-hinhthuckiluat",
                action: "add",
                subject: "hinhthuckiluat",
                desc: "Thêm"
            },
            {
                id: "update-hinhthuckiluat",
                action: "update",
                subject: "hinhthuckiluat",
                desc: "Sửa"
            },
            {
                id: "delete-hinhthuckiluat",
                action: "delete",
                subject: "hinhthuckiluat",
                desc: "Xóa"
            }
        ]
    },
    {
        id: "tinh",
        roleName: 'Danh mục tỉnh',
        actions: [
            {
                id: "read-tinh",
                action: "read",
                subject: "tinh",
                desc: "Xem"
            },
            {
                id: "add-tinh",
                action: "add",
                subject: "tinh",
                desc: "Thêm"
            },
            {
                id: "update-tinh",
                action: "update",
                subject: "tinh",
                desc: "Sửa"
            },
            {
                id: "delete-tinh",
                action: "delete",
                subject: "tinh",
                desc: "Xóa"
            }
        ]
    },
    // {
    //     id: "capbac",
    //     roleName: 'Danh mục cấp bậc',
    //     actions: [
    //         {
    //             id: "read-capbac",
    //             action: "read",
    //             subject: "capbac",
    //             desc: "Xem"
    //         },
    //         {
    //             id: "add-capbac",
    //             action: "add",
    //             subject: "capbac",
    //             desc: "Thêm"
    //         },
    //         {
    //             id: "update-capbac",
    //             action: "update",
    //             subject: "capbac",
    //             desc: "Sửa"
    //         },
    //         {
    //             id: "delete-capbac",
    //             action: "delete",
    //             subject: "capbac",
    //             desc: "Xóa"
    //         }
    //     ]
    // },
    {
        id: "chitieu",
        roleName: 'Chỉ tiêu tuyển sinh',
        actions: [
            {
                id: "read-chitieu",
                action: "read",
                subject: "chitieu",
                desc: "Xem"
            },
            {
                id: "add-chitieu",
                action: "add",
                subject: "chitieu",
                desc: "Thêm"
            },
            {
                id: "update-chitieu",
                action: "update",
                subject: "chitieu",
                desc: "Sửa"
            },
            {
                id: "delete-chitieu",
                action: "delete",
                subject: "chitieu",
                desc: "Xóa"
            }
        ]
    },
    {
        id: "hoso",
        roleName: 'Hồ sơ đăng ký dự thi',
        actions: [
            {
                id: "read-hoso",
                action: "read",
                subject: "hoso",
                desc: "Xem"
            },
            {
                id: "add-hoso",
                action: "add",
                subject: "hoso",
                desc: "Thêm"
            },
            {
                id: "update-hoso",
                action: "update",
                subject: "hoso",
                desc: "Sửa"
            },
            {
                id: "delete-hoso",
                action: "delete",
                subject: "hoso",
                desc: "Xóa"
            }
        ]
    },

    {
        id: "dsphongthi",
        roleName: 'Tạo phòng thi',
        actions: [
            {
                id: "read-dsphongthi",
                action: "read",
                subject: "dsphongthi",
                desc: "Xem"
            },
            {
                id: "add-dsphongthi",
                action: "add",
                subject: "dsphongthi",
                desc: "Thêm"
            },
            {
                id: "update-dsphongthi",
                action: "update",
                subject: "dsphongthi",
                desc: "Sửa"
            },
            {
                id: "delete-dsphongthi",
                action: "delete",
                subject: "dsphongthi",
                desc: "Xóa"
            }
        ]
    },
    {
        id: "thutudontui",
        roleName: 'Thứ tự đồn túi',
        actions: [
            {
                id: "read-thutudontui",
                action: "read",
                subject: "thutudontui",
                desc: "Xem"
            },
            {
                id: "add-thutudontui",
                action: "add",
                subject: "thutudontui",
                desc: "Thêm"
            },
            {
                id: "update-thutudontui",
                action: "update",
                subject: "thutudontui",
                desc: "Sửa"
            },
            {
                id: "delete-thutudontui",
                action: "delete",
                subject: "thutudontui",
                desc: "Xóa"
            }
        ]
    },
    {
        id: "dontuidanhphach",
        roleName: 'Dồn túi, đánh phách',
        actions: [
            {
                id: "read-dontuidanhphach",
                action: "read",
                subject: "dontuidanhphach",
                desc: "Xem"
            },
            {
                id: "add-dontuidanhphach",
                action: "add",
                subject: "dontuidanhphach",
                desc: "Thêm"
            },
            {
                id: "update-dontuidanhphach",
                action: "update",
                subject: "dontuidanhphach",
                desc: "Sửa"
            },
            {
                id: "delete-dontuidanhphach",
                action: "delete",
                subject: "dontuidanhphach",
                desc: "Xóa"
            }
        ]
    },
    {
        id: "diemthi",
        roleName: 'Cập nhật điểm thi',
        actions: [
            {
                id: "read-diemthi",
                action: "read",
                subject: "diemthi",
                desc: "Xem"
            },
            {
                id: "add-diemthi",
                action: "add",
                subject: "diemthi",
                desc: "Thêm"
            },
            {
                id: "update-diemthi",
                action: "update",
                subject: "diemthi",
                desc: "Sửa"
            },
            {
                id: "delete-diemthi",
                action: "delete",
                subject: "diemthi",
                desc: "Xóa"
            }
        ]
    },
    // {
    //     id: "diembaovedcncs",
    //     roleName: 'Điểm bảo vệ đề cương NCS',
    //     actions: [
    //         {
    //             id: "read-diembaovedcncs",
    //             action: "read",
    //             subject: "diembaovedcncs",
    //             desc: "Xem"
    //         },
    //         {
    //             id: "add-diembaovedcncs",
    //             action: "add",
    //             subject: "diembaovedcncs",
    //             desc: "Thêm"
    //         },
    //         {
    //             id: "update-diembaovedcncs",
    //             action: "update",
    //             subject: "diembaovedcncs",
    //             desc: "Sửa"
    //         },
    //         {
    //             id: "delete-diembaovedcncs",
    //             action: "delete",
    //             subject: "diembaovedcncs",
    //             desc: "Xóa"
    //         }
    //     ]
    // },


    {
        id: "nhomnguoidung",
        roleName: 'QL Nhóm người dùng',
        actions: [
            {
                id: "read-nhomnguoidung",
                action: "read",
                subject: "nhomnguoidung",
                desc: "Xem"
            },
            {
                id: "add-nhomnguoidung",
                action: "add",
                subject: "nhomnguoidung",
                desc: "Thêm"
            },
            {
                id: "update-nhomnguoidung",
                action: "update",
                subject: "nhomnguoidung",
                desc: "Sửa"
            },
            {
                id: "delete-nhomnguoidung",
                action: "delete",
                subject: "nhomnguoidung",
                desc: "Xóa"
            }
        ]
    },
    {
        id: "nguoidung",
        roleName: 'QL Người dùng',
        actions: [
            {
                id: "read-nguoidung",
                action: "read",
                subject: "nguoidung",
                desc: "Xem"
            },
            {
                id: "add-nguoidung",
                action: "add",
                subject: "nguoidung",
                desc: "Thêm"
            },
            {
                id: "update-nguoidung",
                action: "update",
                subject: "nguoidung",
                desc: "Sửa"
            },
            {
                id: "delete-nguoidung",
                action: "delete",
                subject: "nguoidung",
                desc: "Xóa"
            }
        ]
    },
    // {
    //     id: "phanquyen",
    //     roleName: 'QL Phân quyền',
    //     actions: [
    //         {
    //             id: "read-phanquyen",
    //             action: "read",
    //             subject: "phanquyen",
    //             desc: "Xem"
    //         },
    //         {
    //             id: "add-phanquyen",
    //             action: "add",
    //             subject: "phanquyen",
    //             desc: "Thêm"
    //         },
    //         {
    //             id: "update-phanquyen",
    //             action: "update",
    //             subject: "phanquyen",
    //             desc: "Sửa"
    //         },
    //         {
    //             id: "delete-phanquyen",
    //             action: "delete",
    //             subject: "phanquyen",
    //             desc: "Xóa"
    //         }
    //     ]
    // },

    {
        id: "cauhinhhethong",
        roleName: 'Cấu hình hệ thống',
        actions: [
            {
                id: "read-cauhinhhethong",
                action: "read",
                subject: "cauhinhhethong",
                desc: "Xem"
            },
            {
                id: "add-cauhinhhethong",
                action: "add",
                subject: "cauhinhhethong",
                desc: "Thêm"
            },
            {
                id: "update-cauhinhhethong",
                action: "update",
                subject: "cauhinhhethong",
                desc: "Sửa"
            },
            {
                id: "delete-cauhinhhethong",
                action: "delete",
                subject: "cauhinhhethong",
                desc: "Xóa"
            }
        ]
    },
    {
        id: "sbd_chiaphong",
        roleName: 'Đánh SBD, phân phòng',
        actions: [
            {
                id: "read-sbd_chiaphong",
                action: "read",
                subject: "sbd_chiaphong",
                desc: "Xem"
            },
            {
                id: "add-sbd_chiaphong",
                action: "add",
                subject: "sbd_chiaphong",
                desc: "Thêm"
            },
            {
                id: "update-sbd_chiaphong",
                action: "update",
                subject: "sbd_chiaphong",
                desc: "Sửa"
            },
            {
                id: "delete-sbd_chiaphong",
                action: "delete",
                subject: "sbd_chiaphong",
                desc: "Xóa"
            }
        ]
    },
    // {
    //     id: "danhsachthisinh",
    //     roleName: 'Danh sách thí sinh vi phạm',
    //     actions: [
    //         {
    //             id: "read-danhsachthisinh",
    //             action: "read",
    //             subject: "danhsachthisinh",
    //             desc: "Xem"
    //         },
    //         {
    //             id: "add-danhsachthisinh",
    //             action: "add",
    //             subject: "danhsachthisinh",
    //             desc: "Thêm"
    //         },
    //         {
    //             id: "update-danhsachthisinh",
    //             action: "update",
    //             subject: "danhsachthisinh",
    //             desc: "Sửa"
    //         },
    //         {
    //             id: "delete-danhsachthisinh",
    //             action: "delete",
    //             subject: "danhsachthisinh",
    //             desc: "Xóa"
    //         }
    //     ]
    // },
    {
        id: "dsthulephi",
        roleName: 'DS thu lệ phí',
        actions: [
            {
                id: "read-dsthulephi",
                action: "read",
                subject: "dsthulephi",
                desc: "Xem"
            },
            {
                id: "add-dsthulephi",
                action: "add",
                subject: "dsthulephi",
                desc: "Thêm"
            },
            {
                id: "update-dsthulephi",
                action: "update",
                subject: "dsthulephi",
                desc: "Sửa"
            },
            {
                id: "delete-dsthulephi",
                action: "delete",
                subject: "dsthulephi",
                desc: "Xóa"
            }
        ]
    },
    {
        id: "dsdudiemxettuyen",
        roleName: 'Nhập điểm xét tuyển',
        actions: [
            {
                id: "read-dsdudiemxettuyen",
                action: "read",
                subject: "dsdudiemxettuyen",
                desc: "Xem"
            },
            {
                id: "add-dsdudiemxettuyen",
                action: "add",
                subject: "dsdudiemxettuyen",
                desc: "Thêm"
            },
            {
                id: "update-dsdudiemxettuyen",
                action: "update",
                subject: "dsdudiemxettuyen",
                desc: "Sửa"
            },
            {
                id: "delete-dsdudiemxettuyen",
                action: "delete",
                subject: "dsdudiemxettuyen",
                desc: "Xóa"
            }
        ]
    },
    {
        id: "capnhatdiemchuan",
        roleName: 'Cập nhật điểm thi',
        actions: [
            {
                id: "read-capnhatdiemchuan",
                action: "read",
                subject: "capnhatdiemchuan",
                desc: "Xem"
            },
            {
                id: "add-capnhatdiemchuan",
                action: "add",
                subject: "capnhatdiemchuan",
                desc: "Thêm"
            },
            {
                id: "update-capnhatdiemchuan",
                action: "update",
                subject: "capnhatdiemchuan",
                desc: "Sửa"
            },
            {
                id: "delete-capnhatdiemchuan",
                action: "delete",
                subject: "capnhatdiemchuan",
                desc: "Xóa"
            }
        ]
    },
    {
        id: "dsvipham",
        roleName: 'DS Thí sinh vi phạm',
        actions: [
            {
                id: "read-dsvipham",
                action: "read",
                subject: "dsvipham",
                desc: "Xem"
            },
            {
                id: "add-dsvipham",
                action: "add",
                subject: "dsvipham",
                desc: "Thêm"
            },
            {
                id: "update-dsvipham",
                action: "update",
                subject: "dsvipham",
                desc: "Sửa"
            },
            {
                id: "delete-dsvipham",
                action: "delete",
                subject: "dsvipham",
                desc: "Xóa"
            }
        ]
    },

    {
        id: "baocaoketquathi",
        roleName: 'Báo cáo kết quả thi',
        actions: [
            {
                id: "read-baocaoketquathi",
                action: "read",
                subject: "baocaoketquathi",
                desc: "Xem"
            },
            {
                id: "add-baocaoketquathi",
                action: "add",
                subject: "baocaoketquathi",
                desc: "Thêm"
            },
            {
                id: "update-baocaoketquathi",
                action: "update",
                subject: "baocaoketquathi",
                desc: "Sửa"
            },
            {
                id: "delete-baocaoketquathi",
                action: "delete",
                subject: "baocaoketquathi",
                desc: "Xóa"
            }
        ]
    },
    // {
    //     id: "capnhatdiemchuan",
    //     roleName: 'Cập nhật điểm chuẩn',
    //     actions: [
    //         {
    //             id: "read-capnhatdiemchuan",
    //             action: "read",
    //             subject: "capnhatdiemchuan",
    //             desc: "Xem"
    //         },
    //         {
    //             id: "add-capnhatdiemchuan",
    //             action: "add",
    //             subject: "capnhatdiemchuan",
    //             desc: "Thêm"
    //         },
    //         {
    //             id: "update-capnhatdiemchuan",
    //             action: "update",
    //             subject: "capnhatdiemchuan",
    //             desc: "Sửa"
    //         },
    //         {
    //             id: "delete-capnhatdiemchuan",
    //             action: "delete",
    //             subject: "capnhatdiemchuan",
    //             desc: "Xóa"
    //         }
    //     ]
    // },
    // {
    //     id: "dstrungtuyen",
    //     roleName: 'DS trúng tuyển',
    //     actions: [
    //         {
    //             id: "read-dstrungtuyen",
    //             action: "read",
    //             subject: "dstrungtuyen",
    //             desc: "Xem"
    //         },
    //         {
    //             id: "add-dstrungtuyen",
    //             action: "add",
    //             subject: "dstrungtuyen",
    //             desc: "Thêm"
    //         },
    //         {
    //             id: "update-dstrungtuyen",
    //             action: "update",
    //             subject: "dstrungtuyen",
    //             desc: "Sửa"
    //         },
    //         {
    //             id: "delete-dstrungtuyen",
    //             action: "delete",
    //             subject: "dstrungtuyen",
    //             desc: "Xóa"
    //         }
    //     ]
    // },
    // {
    //     id: "bienlai",
    //     roleName: 'Biên lai thu học phí',
    //     actions: [
    //         {
    //             id: "read-bienlai",
    //             action: "read",
    //             subject: "bienlai",
    //             desc: "Xem"
    //         },
    //         {
    //             id: "add-bienlai",
    //             action: "add",
    //             subject: "bienlai",
    //             desc: "Thêm"
    //         },
    //         {
    //             id: "update-bienlai",
    //             action: "update",
    //             subject: "bienlai",
    //             desc: "Sửa"
    //         },
    //         {
    //             id: "delete-bienlai",
    //             action: "delete",
    //             subject: "bienlai",
    //             desc: "Xóa"
    //         }
    //     ]
    // },
    // {
    //     id: "phieunhaphoc",
    //     roleName: 'Phiếu nhập học',
    //     actions: [
    //         {
    //             id: "read-phieunhaphoc",
    //             action: "read",
    //             subject: "phieunhaphoc",
    //             desc: "Xem"
    //         },
    //         {
    //             id: "add-phieunhaphoc",
    //             action: "add",
    //             subject: "phieunhaphoc",
    //             desc: "Thêm"
    //         },
    //         {
    //             id: "update-phieunhaphoc",
    //             action: "update",
    //             subject: "phieunhaphoc",
    //             desc: "Sửa"
    //         },
    //         {
    //             id: "delete-phieunhaphoc",
    //             action: "delete",
    //             subject: "phieunhaphoc",
    //             desc: "Xóa"
    //         }
    //     ]
    // },
    // {
    //     id: "thongkemucdiem",
    //     roleName: 'Thống kê mức điểm',
    //     actions: [
    //         {
    //             id: "read-thongkemucdiem",
    //             action: "read",
    //             subject: "thongkemucdiem",
    //             desc: "Xem"
    //         },
    //         {
    //             id: "add-thongkemucdiem",
    //             action: "add",
    //             subject: "thongkemucdiem",
    //             desc: "Thêm"
    //         },
    //         {
    //             id: "update-thongkemucdiem",
    //             action: "update",
    //             subject: "thongkemucdiem",
    //             desc: "Sửa"
    //         },
    //         {
    //             id: "delete-thongkemucdiem",
    //             action: "delete",
    //             subject: "thongkemucdiem",
    //             desc: "Xóa"
    //         }
    //     ]
    // },
    // {
    //     id: "tketheophongthi",
    //     roleName: 'Kết quả theo phòng thi',
    //     actions: [
    //         {
    //             id: "read-tketheophongthi",
    //             action: "read",
    //             subject: "tketheophongthi",
    //             desc: "Xem"
    //         },
    //         {
    //             id: "add-tketheophongthi",
    //             action: "add",
    //             subject: "tketheophongthi",
    //             desc: "Thêm"
    //         },
    //         {
    //             id: "update-tketheophongthi",
    //             action: "update",
    //             subject: "tketheophongthi",
    //             desc: "Sửa"
    //         },
    //         {
    //             id: "delete-tketheophongthi",
    //             action: "delete",
    //             subject: "tketheophongthi",
    //             desc: "Xóa"
    //         }
    //     ]
    // },
    // {
    //     id: "ketquatuyensinh",
    //     roleName: 'Kết quả tuyển sinh',
    //     actions: [
    //         {
    //             id: "read-ketquatuyensinh",
    //             action: "read",
    //             subject: "ketquatuyensinh",
    //             desc: "Xem"
    //         },
    //         {
    //             id: "add-ketquatuyensinh",
    //             action: "add",
    //             subject: "ketquatuyensinh",
    //             desc: "Thêm"
    //         },
    //         {
    //             id: "update-ketquatuyensinh",
    //             action: "update",
    //             subject: "ketquatuyensinh",
    //             desc: "Sửa"
    //         },
    //         {
    //             id: "delete-ketquatuyensinh",
    //             action: "delete",
    //             subject: "ketquatuyensinh",
    //             desc: "Xóa"
    //         }
    //     ]
    // }
]

export const LOAI_TUYEN_SINH = [
    {
        id: 0,
        value: 'Thạc sỹ',
        label: 'Thạc sỹ'
    },
    {
        id: 1,
        value: 'Tiến sỹ',
        label: 'Tiến sỹ'
    }
]