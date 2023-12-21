import {
  Modal,
  ModalBody,
  Col,
  Label,
  Input,
  Row,
  Form,
  Button,
  FormFeedback,
  CardBody,
  Card,
} from 'reactstrap'
import ColLabelInput from '../ColLabelInput/ColLabelInput'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPegawaiInput,
  updatePassword,
} from '../../store/sumberDayaManusia/action'
import { ToastContainer } from 'react-toastify'

const ModalGantiPassword = ({ ...rest }) => {
  const dispatch = useDispatch()
  const pegawai = useSelector(
    (state) => state.sumberDayaManusia.getPegawaiInput.data?.pegawai || null
  )
  const vPassword = useFormik({
    initialValues: {
      namapegawai: '',
      username: '',
      passwordlama: '',
      passwordbaru: '',
      ulangipassword: '',
    },
    validationSchema: Yup.object({
      passwordlama: Yup.string().required('Password diperlukan'),
      passwordbaru: Yup.string()
        .required('Password belum diisi.')
        .min(8, 'Password Terlalu pendek - Minimal 8 karakter.')
        .matches(/\d+/, 'Password minimal 1 angka.'),
      ulangipassword: Yup.string().oneOf(
        [Yup.ref('passwordbaru')],
        'Password harus sama'
      ),
    }),
    onSubmit: (values) => {
      dispatch(
        updatePassword(values, () => {
          rest.toggle && rest.toggle()
        })
      )
    },
  })
  useEffect(() => {
    if (rest.isOpen) {
      dispatch(getPegawaiInput({}))
    }
  }, [rest.isOpen, dispatch])

  useEffect(() => {
    const setV = vPassword.setValues
    if (pegawai) {
      setV({
        ...vPassword.initialValues,
        ...pegawai,
      })
    }
  }, [pegawai, vPassword.setValues, vPassword.initialValues])
  return (
    <Modal {...rest} centered>
      <Card className="p-3">
        <ToastContainer autoClose={2000} />

        <ColLabelInput label="Nama Pegawai" className="mb-3" lg={12}>
          <Input
            id="namapegawai"
            name="namapegawai"
            type="text"
            value={vPassword.values.namapegawai}
            disabled
            onChange={(e) => {
              vPassword.setFieldValue('namapegawai', e.target.value)
            }}
            invalid={
              vPassword.touched?.namapegawai && !!vPassword.errors?.namapegawai
            }
          />
          {vPassword.touched?.namapegawai && !!vPassword.errors.namapegawai && (
            <FormFeedback type="invalid">
              <div>{vPassword.errors.namapegawai}</div>
            </FormFeedback>
          )}
        </ColLabelInput>
        <ColLabelInput label="Username" className="mb-3" lg={12}>
          <Input
            id="username"
            name="username"
            type="text"
            value={vPassword.values.username}
            disabled
            onChange={(e) => {
              vPassword.setFieldValue('username', e.target.value)
            }}
            invalid={
              vPassword.touched?.username && !!vPassword.errors?.username
            }
          />
          {vPassword.touched?.username && !!vPassword.errors.username && (
            <FormFeedback type="invalid">
              <div>{vPassword.errors.username}</div>
            </FormFeedback>
          )}
        </ColLabelInput>
        <ColLabelInput label="Password Lama" className="mb-3" lg={12}>
          <Input
            id="passwordlama"
            name="passwordlama"
            type="password"
            value={vPassword.values.passwordlama}
            onChange={(e) => {
              vPassword.setFieldValue('passwordlama', e.target.value)
            }}
            invalid={
              vPassword.touched?.passwordlama &&
              !!vPassword.errors?.passwordlama
            }
          />
          {vPassword.touched?.passwordlama &&
            !!vPassword.errors.passwordlama && (
              <FormFeedback type="invalid">
                <div>{vPassword.errors.passwordlama}</div>
              </FormFeedback>
            )}
        </ColLabelInput>
        <ColLabelInput label="Password" className="mb-3" lg={12}>
          <Input
            id="passwordbaru"
            name="passwordbaru"
            type="password"
            value={vPassword.values.passwordbaru}
            onChange={(e) => {
              vPassword.setFieldValue('passwordbaru', e.target.value)
            }}
            invalid={
              vPassword.touched?.passwordbaru &&
              !!vPassword.errors?.passwordbaru
            }
          />
          {vPassword.touched?.passwordbaru &&
            !!vPassword.errors.passwordbaru && (
              <FormFeedback type="invalid">
                <div>{vPassword.errors.passwordbaru}</div>
              </FormFeedback>
            )}
        </ColLabelInput>
        <ColLabelInput label="Ulangi Password" className="mb-3" lg={12}>
          <Input
            id="ulangipassword"
            name="ulangipassword"
            type="password"
            value={vPassword.values.ulangipassword}
            onChange={(e) => {
              vPassword.setFieldValue('ulangipassword', e.target.value)
            }}
            invalid={
              vPassword.touched?.ulangipassword &&
              !!vPassword.errors?.ulangipassword
            }
          />
          {vPassword.touched?.ulangipassword &&
            !!vPassword.errors.ulangipassword && (
              <FormFeedback type="invalid">
                <div>{vPassword.errors.ulangipassword}</div>
              </FormFeedback>
            )}
        </ColLabelInput>
        <Col lg={12}>
          <Row className="d-flex flex-row-reverse">
            <Col lg="auto">
              <Button
                color="success"
                type="button"
                onClick={() => {
                  vPassword.handleSubmit()
                }}
              >
                Simpan
              </Button>
            </Col>
            <Col lg="auto" onClick={() => rest.toggle && rest.toggle()}>
              <Button color="danger">Batal</Button>
            </Col>
          </Row>
        </Col>
      </Card>
    </Modal>
  )
}

export default ModalGantiPassword
