import InputDM from '../../Components/InputDM/InputDM'
import ButtonDM from '../../Components/ButtonDM/ButtonDM'
import './Login.scss'
import { useEffect, useRef, useState } from 'react'
import { Circle } from 'rc-progress'
import FormPasienBaru from './FormPasienBaru'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { rgxAllNumber } from 'frontendjs/src/utils/regexcommon'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../store/userpasien/action'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PasienBaruSelesai from './PasienBaruSelesai'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import getColorCSS from '../../utils/colors'
import ToggleDM from '../../Components/ToggleDM/ToggleDM'

const Login = () => {
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const refKontainer = useRef(null)

  const { page } = useParams()

  const headerName = [
    'Pengisian Data Diri',
    'Pengisian Alamat KTP',
    'Pengisian Alamat Domisili',
    'Pengisian Data Tambahan',
  ]
  let { user } = useSelector((state) => ({
    user: Array.isArray(state.UserPasien.loginUser?.data)
      ? null
      : state.UserPasien.loginUser?.data,
  }))

  const isPasienLama = page === 'pasien-lama'
  const isPasienBaru = page === 'pasien-baru'
  const isSelesai = page === 'selesai'
  const stlHeader = !isPasienBaru ? { opacity: '0' } : { opacity: '1' }
  const topBody = isPasienLama ? '35%' : '120px'

  const handleToHome = () => {
    refKontainer.current.handleToNextPage(() => {
      navigate('/')
    })
  }

  useEffect(() => {
    if (user && !isSelesai) {
      navigate('/')
    }
  }, [user, isSelesai, navigate])
  return (
    <div className="page-login">
      <KontainerPage
        top={topBody}
        header={
          <div className="header-login" style={stlHeader}>
            <div className="kontainer-progress-bar">
              <Circle
                className="progress-bar"
                percent={((step + 1) / 4) * 100}
                strokeWidth={10}
                trailWidth={10}
                strokeColor={getColorCSS('--main-800')}
                trailColor={getColorCSS('--main-200')}
              />
              <p className="teks">{step + 1}/4</p>
            </div>
            <div className="kontainer-header">
              <h2>{headerName[step]}</h2>
              <h3>
                Selanjutnya :{' '}
                {headerName[step + 1] && 'Pendaftaran Pasien Baru Selesai'}
              </h3>
            </div>
          </div>
        }
        ref={refKontainer}
      >
        <ToggleDM
          chosen={page === 'pasien-lama' ? 0 : 1}
          pilihan={[
            { value: 'pasien-lama', label: 'Pasien Lama' },
            { value: 'pasien-baru', label: 'Pasien Baru' },
          ]}
          onChoose={(pilih) => {
            navigate(`/login/${pilih.value}`)
          }}
        />
        {isPasienLama && (
          <FormPasienLama handleToHome={handleToHome} setDone={setDone} />
        )}
        {isPasienBaru && <FormPasienBaru step={step} setStep={setStep} />}
        {isSelesai && <PasienBaruSelesai handleToHome={handleToHome} />}
      </KontainerPage>
    </div>
  )
}

const FormPasienLama = ({ setDone, handleToHome }) => {
  const dispatch = useDispatch()
  const { loadingLogin } = useSelector((state) => ({
    loadingLogin: state?.loginUser?.loading,
  }))
  const vLogin = useFormik({
    initialValues: {
      nocm: '',
      password: '',
    },
    validationSchema: Yup.object({
      nocm: Yup.string().required('No RM/NIK harus diisi'),
      password: Yup.string().required('Password harus diisi'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        loginUser(values, () => {
          resetForm()
          setDone(true)
          handleToHome()
        })
      )
    },
  })
  return (
    <div className="kontainer-konten">
      <InputGroup label={'No RM'}>
        <InputDM
          id="nocm"
          name="nocm"
          type="string"
          className="input-login"
          value={vLogin.values.nocm}
          errorMsg={vLogin.errors.nocm}
          isError={vLogin.touched.nocm && vLogin.errors.nocm}
          onChange={(e) => {
            vLogin.handleChange(e)
          }}
        />
      </InputGroup>
      <InputGroup label={'Password'}>
        <InputDM
          id="password"
          name="password"
          type="password"
          className="input-login"
          value={vLogin.values.password}
          errorMsg={vLogin.errors.password}
          isError={vLogin.touched.password && vLogin.errors.password}
          onChange={vLogin.handleChange}
        />
      </InputGroup>
      <Link className="lupa-password" to="/lupa-password">
        Lupa password
      </Link>

      <ButtonDM
        type="button"
        className="btn-login"
        onClick={() => vLogin.handleSubmit()}
        disabled={loadingLogin}
      >
        Masuk
      </ButtonDM>
    </div>
  )
}

export const InputGroup = ({ label, children }) => {
  return (
    <div className="input-group-login">
      <label className="label-login">{label}</label>
      {children}
    </div>
  )
}

export default Login
