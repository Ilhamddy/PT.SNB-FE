import InputDM from '../../Components/InputDM/InputDM'
import ButtonDM from '../../Components/ButtonDM/ButtonDM'
import './Login.scss'
import { useEffect, useRef, useState } from 'react'
import { Circle } from 'rc-progress'
import FormPasienBaru from './FormPasienBaru'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { rgxAllNumber } from '../../utils/regexcommon'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../store/userpasien/action'
import { useNavigate, useParams } from 'react-router-dom'
import PasienBaruSelesai from './PasienBaruSelesai'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'

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

  useEffect(() => {}, [])

  const isPasienLama = page === 'pasien-lama'
  const isPasienBaru = page === 'pasien-baru'
  const isSelesai = page === 'selesai'
  const stlHeader = !isPasienBaru ? { opacity: '0' } : { opacity: '1' }
  const topBody = isPasienLama ? '50%' : '120px'
  const stlKontainerBg = isPasienLama
    ? { left: '8px' }
    : { left: 'calc(50% + 8px)' }
  const stlBtnTerpilih = (link) => (page === link ? { color: '#715A06' } : {})
  const handleToHome = () => {
    refKontainer.current.handleToNextPage(() => {
      navigate('/')
    })
  }
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
                strokeColor="#715A06"
                trailColor="#F0E2B3"
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
        {!isSelesai && (
          <div className="pilihan-pasien">
            <div className="kontainer-bg" style={stlKontainerBg}></div>
            <button
              onClick={() => navigate('/login/pasien-lama')}
              className="btn-pasien"
              style={stlBtnTerpilih('pasien-lama')}
            >
              Pasien Lama
            </button>
            <button
              onClick={() => navigate('/login/pasien-baru')}
              className="btn-pasien"
              style={stlBtnTerpilih('pasien-baru')}
            >
              Pasien Baru
            </button>
          </div>
        )}
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
      noidentitas: '',
    },
    validationSchema: Yup.object({
      nocm: Yup.string().required('No RM/NIK harus diisi'),
      noidentitas: Yup.string().required('Tanggal Lahir harus diisi'),
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
      <InputGroup label={'NIK'}>
        <InputDM
          id="noidentitas"
          name="noidentitas"
          type="string"
          className="input-login"
          value={vLogin.values.noidentitas}
          errorMsg={vLogin.errors.noidentitas}
          isError={vLogin.touched.noidentitas && vLogin.errors.noidentitas}
          onChange={vLogin.handleChange}
        />
      </InputGroup>
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
