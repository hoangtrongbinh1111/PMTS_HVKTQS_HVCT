// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Card, Modal, Row, Col, CardHeader, CardTitle, CardBody, Button, ListGroup, ListGroupItem, ModalHeader, ModalBody } from 'reactstrap'


// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { FileText, X, DownloadCloud } from 'react-feather'
import { uploadZip } from '../../../../api/hoSoDangKi'
import responseResultHelper from '../../../utils/reponsive'
import { ACTION_METHOD_TYPE } from '../../../utils/constant'

const ImageModal = ({ open, handleModal, data }) => {
  // ** State
  const [files, setFiles] = useState([])
  const handleClose = () => {
    handleModal()
    setFiles([])
  }
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={e => handleClose()} />

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles([...files, ...acceptedFiles])

    }

  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='100px' width='100%' />
    } else {
      return <FileText size='28' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const renderFileSize = size => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }
  const listThieuAnh = data?.map((e, index) => (
    !files.find(image => image.name === `${e.STT}.jpg`) ? <span style={{ color: 'red' }}> {e.STT},</span> : <></>)
  )
  const fileList = files.map((file, index) => (
    <Col md='2' sm='6'>
      <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-start justify-content-between'>
        <div className='file-details d-flex align-items-center'>
          <div className='file-preview me-1'>{renderFilePreview(file)}</div>
          <div>
            <p className='file-name mb-0'>{file.name}</p>
          </div>
        </div>
        <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
          <X size={14} />
        </Button>
      </ListGroupItem>
    </Col>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }
  const handleUpImage = async () => {

    const formdata = new FormData()
    for (let i = 0; i < files.length; i++) {
      formdata.append("files", files[i])
    }
    formdata.append('dbName', localStorage.getItem('dbName'))
    const res = await uploadZip(formdata)
    setFiles([])
    responseResultHelper(res, handleModal, null, ACTION_METHOD_TYPE.UPLOADZIP)
  }
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='modal-xl'

    >
      <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>Tải ảnh thí sinh</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <Card>
          <CardBody>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <div className='d-flex align-items-center justify-content-center flex-column'>
                <DownloadCloud size={64} />
                <h5>Thả file vào đây hoặc click để tải ảnh từ máy tính</h5>
                <p className='text-secondary'>
                  Drop files here or click{' '}
                  <a href='/' onClick={e => e.preventDefault()}>
                    browse
                  </a>{' '}
                  thorough your machine
                </p>
              </div>
            </div>
            {files.length ? (
              <Fragment>
                <span>Thiếu ảnh của các thí sinh có mã hồ sơ: {listThieuAnh}</span>
                <ListGroup className='my-2' style={{height: '500px', overflowX: 'hidden', overflowY: 'auto'}}>
                  <Row>
                    {fileList}
                  </Row>

                </ListGroup>
                <div className='d-flex justify-content-end'>
                  <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                    Xóa tất cả
                  </Button>
                  <Button color='primary' onClick={handleUpImage}>Lưu </Button>
                </div>
              </Fragment>
            ) : null}
          </CardBody>
        </Card>
      </ModalBody>
    </Modal>

  )
}

export default ImageModal
