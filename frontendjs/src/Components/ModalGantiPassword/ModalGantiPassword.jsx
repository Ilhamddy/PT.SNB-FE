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
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPegawaiInput,
  updatePassword,
} from '../../store/sumberDayaManusia/action'
import { ToastContainer } from 'react-toastify'
import ModalApp from '../Common/ModalApp'
import CustomInput from '../Common/CustomInput/CustomInput'

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
      ulangipassword: Yup.string()
        .required('Password belum diisi.')
        .oneOf([Yup.ref('passwordbaru')], 'Password harus sama'),
    }),
    onSubmit: (values) => {
      dispatch(
        updatePassword(values, () => {
          rest.toggle && rest.toggle()
        })
      )
    },
  })
  // console.log(vPassword.errors)
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
  const [passwordShow, setPasswordShow] = useState(false)
  const [passwordShowBaru, setPasswordShowBaru] = useState(false)
  const [passwordShowBaru2, setPasswordShowBaru2] = useState(false)
  return (
    <ModalApp {...rest} centered>
      <Card className="p-3">
        <ToastContainer autoClose={2000} />

        <ColLabelInput label="Nama Pegawai" className="mb-3" lg={12}>
          <CustomInput
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
          <CustomInput
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
        <div className="mb-3">
          <label className="form-label" htmlFor="password-input">
            Password Lama
          </label>
          <div className="position-relative auth-pass-inputgroup">
            <CustomInput
              type={passwordShow ? 'text' : 'password'}
              className="form-control pe-5 password-input"
              placeholder="Enter password"
              id="password-input"
              name="passwordlama"
              value={vPassword.values.passwordlama}
              onBlur={vPassword.handleBlur}
              onChange={vPassword.handleChange}
              invalid={
                vPassword.errors.passwordlama && vPassword.touched.passwordlama
                  ? true
                  : false
              }
            />
            {vPassword.errors.passwordlama && vPassword.touched.passwordlama ? (
              <FormFeedback type="invalid">
                {vPassword.errors.passwordlama}
              </FormFeedback>
            ) : null}
            <Button
              color="link"
              onClick={() => setPasswordShow(!passwordShow)}
              className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
              type="button"
              id="password-addon"
            >
              <i className="ri-eye-fill align-middle"></i>
            </Button>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password-input">
            Password Baru
          </label>
          <div className="position-relative auth-pass-inputgroup">
            <CustomInput
              type={passwordShowBaru ? 'text' : 'password'}
              className="form-control pe-5 password-input"
              placeholder="Enter password"
              id="password-input"
              name="passwordbaru"
              value={vPassword.values.passwordbaru}
              onBlur={vPassword.handleBlur}
              onChange={vPassword.handleChange}
              invalid={
                vPassword.errors.passwordbaru && vPassword.touched.passwordbaru
                  ? true
                  : false
              }
            />
            {vPassword.errors.passwordbaru && vPassword.touched.passwordbaru ? (
              <FormFeedback type="invalid">
                {vPassword.errors.passwordbaru}
              </FormFeedback>
            ) : null}
            <Button
              color="link"
              onClick={() => setPasswordShowBaru(!passwordShowBaru)}
              className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
              type="button"
              id="password-addon"
            >
              <i className="ri-eye-fill align-middle"></i>
            </Button>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password-input">
            Ulangi Password Baru
          </label>
          <div className="position-relative auth-pass-inputgroup">
            <CustomInput
              type={passwordShowBaru2 ? 'text' : 'password'}
              className="form-control pe-5 password-input"
              placeholder="Enter password"
              id="password-input"
              name="ulangipassword"
              value={vPassword.values.ulangipassword}
              onBlur={vPassword.handleBlur}
              onChange={vPassword.handleChange}
              invalid={
                vPassword.errors.ulangipassword &&
                vPassword.touched.ulangipassword
                  ? true
                  : false
              }
            />
            {vPassword.errors.ulangipassword &&
            vPassword.touched.ulangipassword ? (
              <FormFeedback type="invalid">
                {vPassword.errors.ulangipassword}
              </FormFeedback>
            ) : null}
            <Button
              color="link"
              onClick={() => setPasswordShowBaru2(!passwordShowBaru2)}
              className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
              type="button"
              id="password-addon"
            >
              <i className="ri-eye-fill align-middle"></i>
            </Button>
          </div>
        </div>
        {/* <div className="mb-3">
          <label className="form-label" htmlFor="password-input">Ulangi Password Baru</label>
          <div className="position-relative auth-pass-inputgroup">
            <CustomInput
              id="ulangipassword"
              name="ulangipassword"
              type={passwordShowBaru2 ? "text" : "password"}
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
            <Button color="link" onClick={() => setPasswordShowBaru2(!passwordShowBaru2)} className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button"
              id="password-addon"><i className="ri-eye-fill align-middle"></i></Button>
          </div>
        </div> */}
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
          </Row>
        </Col>
      </Card>
    </ModalApp>
  )
}

export default ModalGantiPassword
