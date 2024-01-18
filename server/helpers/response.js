exports.responseSuccess = ({ res }) => {
  return res.json({
    status: 200,
    message: "Success"
  });
}

exports.responseServerError = ({ res, err }) => {
  return res.status(500).json({
    status: 500,
    error: err
  });
}

exports.responseFailed = ({ res }) => {
  return res.status(500).json({
    status: 500,
    message: "Failed"
  });
}

exports.responseInValid = ({ res, message }) => {
  return res.status(422).json({
    status: 422,
    message: message
  });
}

exports.responseSuccessWithData = ({ res, data }) => {
  return res.json({
    status: 200,
    result: data,
    message: "Success"
  });
}

exports.responseUnAuthorized = ({ res }) => {
  return res.status(401).json({
    status: 401,
    message: "UnAuthorized"
  });
}

exports.responseForbidden = ({ res }) => {
  return res.status(403).json({
    status: 403,
    message: "Forbidden"
  });
}
