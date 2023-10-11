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

const UploadNewsPage = () => {
  const validation = useFormik({
    initialValues: {
      konten: '',
    },
    validationSchema: Yup.object({
      konten: Yup.string().required('Konten harus diisi'),
    }),
    onSubmit: (values) => {
      console.log(values)
    },
  })
  return (
    <div className="page-content">
      <ToastContainer closeButton={false} />
      <Container fluid>
        <BreadCrumb title="Verifikasi Resep" pageTitle="Farmasi" />
        <Card className="p-5">
          <CKEditor
            editor={ClassicEditor}
            config={{
              toolbar: {
                items: [
                  'undo',
                  'redo',
                  'bold',
                  'italic',
                  'link',
                  'bulletedList',
                  'numberedList',
                  'heading',
                ],
              },
            }}
            data={validation.values.expertise || ''}
            onChange={(event, editor) => {
              const data = editor.getData()
              validation.setFieldValue('konten', data)
            }}
          />
        </Card>
      </Container>
    </div>
  )
}

export default UploadNewsPage
