import { useFormik } from 'formik'
import InputGroupDM from '../../Components/InputGroupDM/InputGroupDM'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import * as Yup from 'yup'
import InputDM from '../../Components/InputDM/InputDM'
import { useEffect, useRef } from 'react'
import './ResetPasswordPage.scss'
import ButtonDM from '../../Components/ButtonDM/ButtonDM'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getResetPassword, resetPassword } from '../../store/actions'

const ResetPasswordPage = () => {
  const refKontainer = useRef(null)
  const [searchParams] = useSearchParams()
  const k = searchParams.get('k')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const vResetPassword = useFormik({
    initialValues: {
      resetemailid: '',
      password: '',
      ulangipassword: '',
    },
    validationSchema: Yup.object({
      uuidresetpassword: '',
      password: Yup.string()
        .required('Password belum diisi.')
        .min(8, 'Password Terlalu pendek - Minimal 8 karakter.')
        .matches(/\d+/, 'Password minimal 1 angka.'),
      ulangipassword: Yup.string().oneOf(
        [Yup.ref('password')],
        'Password harus sama'
      ),
    }),
    onSubmit: (values) => {
      dispatch(
        resetPassword(values, () => {
          navigate('/login/pasien-lama')
        })
      )
    },
  })

  useEffect(() => {
    const setFF = vResetPassword.setFieldValue
    if (k) {
      dispatch(
        getResetPassword({ resetemailid: k }, () => {
          navigate('/')
        })
      )
      setFF('resetemailid', k)
    } else {
      navigate('/')
    }
  }, [k, vResetPassword.setFieldValue, dispatch, navigate])
  return (
    <div className="page-reset-password">
      <KontainerPage top={0} ref={refKontainer}>
        <InputGroupDM label={'Password Baru'}>
          <InputDM
            id="password"
            name="password"
            type="password"
            className="input-reset-password"
            value={vResetPassword.values.password}
            errorMsg={vResetPassword.errors.password}
            isError={
              vResetPassword.touched.password && vResetPassword.errors.password
            }
            onChange={(e) => {
              vResetPassword.handleChange(e)
            }}
          />
        </InputGroupDM>
        <InputGroupDM label={'Ulangi Password'}>
          <InputDM
            id="ulangipassword"
            name="ulangipassword"
            type="password"
            className="input-reset-password"
            value={vResetPassword.values.ulangipassword}
            errorMsg={vResetPassword.errors.ulangipassword}
            isError={
              vResetPassword.touched.ulangipassword &&
              vResetPassword.errors.ulangipassword
            }
            onChange={(e) => {
              vResetPassword.handleChange(e)
            }}
          />
        </InputGroupDM>
        <ButtonDM
          className="btn-lupa-password"
          onClick={() => {
            vResetPassword.handleSubmit()
          }}
        >
          Ganti Password
        </ButtonDM>
      </KontainerPage>
    </div>
  )
}

export default ResetPasswordPage
