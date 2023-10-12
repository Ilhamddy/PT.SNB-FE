import {
  Button,
  Card,
  Col,
  Container,
  FormFeedback,
  Input,
  Label,
  Row,
} from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { ToastContainer } from 'react-toastify'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import FormData from 'form-data'
import { uploadImage } from '../../store/actions'
import { useDispatch } from 'react-redux'

const UploadNewsPage = () => {
  const dispatch = useDispatch()
  const validation = useFormik({
    initialValues: {
      konten: '',
      image: null,
    },
    validationSchema: Yup.object({
      image: Yup.mixed().required('Gambar harus diisi'),
    }),
    onSubmit: (values) => {
      let dataImg = new FormData()
      dataImg.append('file', values.image, values.image.name)
      dispatch(uploadImage(dataImg))
    },
  })

  const imageFile = validation.values.image

  return (
    <div className="page-content">
      <ToastContainer closeButton={false} />
      <Container fluid>
        <BreadCrumb title="Verifikasi Resep" pageTitle="Farmasi" />
        <Card className="p-5">
          <Row>
            <Input
              type="file"
              onChange={(event) => {
                if (event.target.files && event.target.files[0]) {
                  validation.setFieldValue('image', event.target.files[0])
                }
              }}
            />
            {imageFile && (
              <img
                style={{ width: 150, height: 150 }}
                alt="preview"
                src={imageFile ? URL.createObjectURL(imageFile) : undefined}
              />
            )}
            <Button type="button" onClick={() => validation.handleSubmit()}>
              Upload
            </Button>
          </Row>
        </Card>
      </Container>
    </div>
  )
}

export default UploadNewsPage
