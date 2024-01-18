const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess, responseInValid } = require("../../../helpers/response");
const { ExportFile } = require("../../../helpers/exportfile");
// Import database
// Import repository
const NhomNguoiDungRepository = require("../../../repositories/NhomNguoiDungRepository");
const nhomNguoiDungRepository = new NhomNguoiDungRepository();
var values = {
  data:
    [
      {
        maNhom: 1,
        tenNhom: "HV",
        ghiChu: "Đỗ Minh Hiếu",
      },
      {
        maNhom: 2,
        tenNhom: "HV",
        ghiChu: "Hoàng Trọng Bình",
      },
      {
        maNhom: 3,
        tenNhom: "HV",
        ghiChu: "Nguyễn Huyền Trang",
      }
    ]
};

exports.getListGroups = async (req, res) => {

  const { page, perPage, query } = req.query;
  
  try {
    const data = await nhomNguoiDungRepository.getAll(parseInt(page), parseInt(perPage), query);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};


exports.createOneGroups = async (req, res) => {
  try {
    const response = await nhomNguoiDungRepository.create({
      tenNhom: req.body.tenNhom,
      ghiChu: req.body.ghiChu
    });
    if (!response) {
      return responseFailed({ res });
    } else {
    const response1 = await nhomNguoiDungRepository.updateRole(response[0],'[{"id":"read-homepages","action":"read","subject":"homepages","desc":"Xem"}]')
    return responseSuccess({ res });
    }
  } catch (err) {
    return responseServerError({ res, err });
  }
};
exports.UpdateGroupsUser = async (req, res) => {
  const id = req.body.id
  try {
    const response = await nhomNguoiDungRepository.update(id, {
      tenNhom: req.body.tenNhom,
      ghiChu: req.body.ghiChu
    });
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
}
exports.DeleteGroupsUser = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await nhomNguoiDungRepository.delete(id);
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
}

exports.ExportExcel = async (req, res) => {
  const fs = require('fs');
  try {
    const mydata = ExportFile('template/nhomnguoidung/dshoso.xlsx', 'output/nhomnguoidung/output.xlsx', res, values);
    
  } catch (err) {
    return responseServerError({ res, err });
  }
}

exports.ExportExcelTemplate = async (req, res) => {
  const fs = require('fs');
  try {
    res.setHeader('Content-Disposition', `attachment; filename=filemau.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const fileStream = fs.createReadStream("template/nhomnguoidung/filemau.xlsx");
    fileStream.pipe(res);
  } catch (err) {
    return responseServerError({ res, err });
  }
}


exports.getRoleById = async (req, res) => {
  const { maNhom } = req.query;
  try {
    const role = await nhomNguoiDungRepository.getRoleById(maNhom);
    if (role === undefined) {
      const message = 'role_not_found';
      return responseInValid({ res, message });
    }
    const data = role;
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}

exports.getListRoles = async (req, res) => {
  try {
    const role = await nhomNguoiDungRepository.getListRoles();
    if (role === undefined) {
      const message = 'role_not_found';
      return responseInValid({ res, message });
    }
    const data = role;
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}

exports.updateRole = async (req, res) => {
  const {roleId, permission} = req.body;
  try {
    const role = await nhomNguoiDungRepository.updateRole(roleId, permission);
    if (role === undefined) {
      const message = 'role_not_found';
      return responseInValid({ res, message });
    }
    const data = role;
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}
