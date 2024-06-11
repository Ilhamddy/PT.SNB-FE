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
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import FormData from 'form-data'
import {
  getBeritaNorec,
  getListBerita,
  uploadBerita,
  uploadImage,
} from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import KontainerFlatpickr from '../../Components/KontainerFlatpickr/KontainerFlatpickr'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRef } from 'react'
import CustomInput from '../../Components/Common/CustomInput/CustomInput'

const UploadBeritaPage = () => {
  const dispatch = useDispatch()
  const { loading, data } = useSelector((state) => ({
    loading:
      state.Berita.uploadImage?.loading || state.Berita.uploadBerita?.loading,
    data: state.Berita.getBeritaNorec?.data.data?.berita || null,
  }))

  const [editor, setEditor] = useState(null)

  const { norecberita } = useParams()

  const validation = useFormik({
    initialValues: {
      norec: '',
      judul: '',
      konten: '',
      image: null,
      tglawal: '',
      tglakhir: '',
      // nanti setelah proses akan ada imageuri di saga
    },
    validationSchema: Yup.object({
      judul: Yup.string().required('Judul harus diisi'),
      image: Yup.mixed().required('Gambar harus diisi'),
      konten: Yup.string().required('Konten harus diisi'),
      tglawal: Yup.string().required('Tanggal awal harus diisi'),
      tglakhir: Yup.string().required('Tanggal akhir harus diisi'),
    }),
    onSubmit: (values) => {
      let dataImg = new FormData()
      dataImg.append('file', values.image, values.image.name)
      dispatch(
        uploadImage(dataImg, values, (response) => {
          const dataFinal = {
            ...dataImg,
            imageuri: response.data.uri,
          }
          uploadBerita(dataFinal)
        })
      )
    },
  })

  const imageFile = validation.values.image

  useEffect(() => {
    dispatch(getBeritaNorec({ norecberita: norecberita }))
  }, [dispatch, norecberita])

  useEffect(() => {
    const setFF = validation.setFieldValue
    setFF('norec', data?.norec || '')
    setFF('judul', data?.judul || '')
    setFF('konten', data?.isi || '')
    editor?.setData(data?.isi || '')
    setFF('tglawal', data?.tglawal || '')
    setFF('tglakhir', data?.tglakhir || '')
  }, [data, editor, validation.setFieldValue])
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Upload Berita" pageTitle="Upload Berita" />
        <Card className="p-5">
          <Row>
            <Col sm={12} className="mb-3">
              <Label>Judul</Label>
              <CustomInput
                name="judul"
                className="form-control"
                placeholder="Masukkan Judul"
                type="judul"
                onChange={validation.handleChange}
                value={validation.values.judul || ''}
                invalid={validation.touched.judul && validation.errors.judul}
              />
              {validation.errors.judul && validation.touched.judul && (
                <FormFeedback type="invalid">
                  {validation.errors.judul}
                </FormFeedback>
              )}
            </Col>
            <Col sm={12}>
              <Label>Gambar</Label>
              <CustomInput
                name="image"
                type="file"
                onChange={(event) => {
                  if (event.target.files && event.target.files[0]) {
                    validation.setFieldValue('image', event.target.files[0])
                  }
                }}
                invalid={validation.touched.image && validation.errors.image}
              />
              {!!validation.errors.image && validation.touched.image && (
                <FormFeedback type="invalid">
                  {validation.errors.image}
                </FormFeedback>
              )}
              <p>Aspek gambar harus 2:1</p>
            </Col>
            {imageFile && (
              <img
                className="mb-3"
                style={{ width: 500, height: 250, objectFit: 'cover' }}
                alt="preview"
                src={imageFile ? URL.createObjectURL(imageFile) : undefined}
              />
            )}
            <Col sm={12} className="mb-5">
              <Label>Konten</Label>
              <CKEditor
                onReady={(editor) => {
                  setEditor(editor)
                }}
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
                    ],
                  },
                }}
                data={validation.values.konten || ''}
                onChange={(event, editor) => {
                  const data = editor.getData()
                  validation.setFieldValue('konten', data)
                }}
              />
              {!!validation.errors.konten && validation.touched.konten && (
                <p color="red">{validation.errors.image}</p>
              )}
            </Col>
            <Col sm={6} className="mb-5">
              <Label>Tanggal Awal</Label>
              <KontainerFlatpickr
                isError={
                  validation.touched?.tglawal && !!validation.errors?.tglawal
                }
                id="tglawal"
                name="tglawal"
                options={{
                  dateFormat: 'Y-m-d',
                  defaultDate: 'today',
                }}
                value={validation.values.tglawal}
                onChange={([newDate]) => {
                  validation.setFieldValue('tglawal', newDate.toISOString())
                }}
              />
              {validation.touched?.tglawal && !!validation.errors?.tglawal && (
                <FormFeedback type="invalid">
                  <div>{validation.errors?.tglawal}</div>
                </FormFeedback>
              )}
            </Col>
            <Col sm={6} className="mb-5">
              <Label>Tanggal Akhir</Label>
              <KontainerFlatpickr
                isError={
                  validation.touched?.tglakhir && !!validation.errors?.tglakhir
                }
                id="tglakhir"
                name="tglakhir"
                options={{
                  dateFormat: 'Y-m-d',
                  defaultDate: 'today',
                }}
                value={validation.values.tglakhir}
                onChange={([newDate]) => {
                  validation.setFieldValue('tglakhir', newDate.toISOString())
                }}
              />
              {validation.touched?.tglakhir &&
                !!validation.errors?.tglakhir && (
                  <FormFeedback type="invalid">
                    <div>{validation.errors?.tglakhir}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col sm={5}>
              <Button
                type="button"
                color="info"
                onClick={() => validation.handleSubmit()}
                disabled={loading}
              >
                {norecberita ? 'Update' : 'Kirim  '}
              </Button>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  )
}

export default UploadBeritaPage
