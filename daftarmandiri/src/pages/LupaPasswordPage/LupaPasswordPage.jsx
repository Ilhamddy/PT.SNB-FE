import { useFormik } from 'formik'
import { useEffect, useRef } from 'react'
import * as Yup from 'yup'
import InputGroupDM from '../../Components/InputGroupDM/InputGroupDM'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import InputDM from '../../Components/InputDM/InputDM'
import './LupaPasswordPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getCaptcha, sendResetPassword } from '../../store/actions'
import ButtonDM from '../../Components/ButtonDM/ButtonDM'
import reset from './reset.svg'
import { useSearchParams, useNavigate } from 'react-router-dom'

const LupaPasswordPage = () => {
  const refKontainer = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { uuidcaptcha, image, loading } = useSelector((selector) => ({
    image: selector.Home.getCaptcha?.data?.image || '',
    uuidcaptcha: selector.Home.getCaptcha?.data?.uuid || '',
    loading: selector.UserPasien.sendResetPassword.loading || false,
  }))

  const vLupaPassword = useFormik({
    initialValues: {
      email: '',
      uuidcaptcha: '',
      answer: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email harus diisi')
        .email('Format email salah'),
      answer: Yup.string().required(),
    }),
    onSubmit: (values) => {
      dispatch(
        sendResetPassword(values, () => {
          navigate('/')
        })
      )
    },
  })
  useEffect(() => {
    dispatch(getCaptcha())
  }, [dispatch])
  useEffect(() => {
    const setFF = vLupaPassword.setFieldValue
    setFF('uuidcaptcha', uuidcaptcha)
  }, [uuidcaptcha, vLupaPassword.setFieldValue])
  return (
    <div className="page-login">
      <KontainerPage top={0} ref={refKontainer}>
        <InputGroupDM label={'Email'}>
          <InputDM
            id="email"
            name="email"
            type="string"
            className="input-lupa-password"
            value={vLupaPassword.values.email}
            errorMsg={vLupaPassword.errors.email}
            isError={vLupaPassword.touched.email && vLupaPassword.errors.email}
            onChange={(e) => {
              vLupaPassword.handleChange(e)
            }}
          />
        </InputGroupDM>
        <div className="kontainer-captcha">
          <img
            className="isi-captcha"
            width={'100%'}
            height={'fit-content'}
            src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`}
            alt="Captcha"
          />
          <img
            className="tbl-reset"
            src={reset}
            onClick={() => dispatch(getCaptcha())}
            alt="tbl-reset-captcha"
          />
        </div>
        <InputGroupDM label={'Isi teks di atas'}>
          <InputDM
            id="answer"
            name="answer"
            type="string"
            className="input-lupa-password"
            value={vLupaPassword.values.answer}
            errorMsg={vLupaPassword.errors.answer}
            isError={
              vLupaPassword.touched.answer && vLupaPassword.errors.answer
            }
            onChange={(e) => {
              vLupaPassword.handleChange(e)
            }}
          />
        </InputGroupDM>
        <ButtonDM
          className="btn-lupa-password"
          onClick={() => {
            vLupaPassword.handleSubmit()
          }}
          isLoading={loading}
        >
          Kirim
        </ButtonDM>
      </KontainerPage>
    </div>
  )
}

export default LupaPasswordPage
