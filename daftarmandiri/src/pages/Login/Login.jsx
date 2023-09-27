import InputDM from '../../Components/InputDM/InputDM'
import ButtonDM from '../../Components/ButtonDM/ButtonDM'
import './Login.scss'
import { useEffect, useState } from 'react'
import { Circle } from 'rc-progress'
import FormPasienBaru from './PasienBaru'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { rgxAllNumber } from '../../utils/regexcommon'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../store/login/action'
import ServiceAuth from '../../service/service-auth'
import { useNavigate, useParams } from 'react-router-dom'
import PasienBaruSelesai from './PasienBaruSelesai'

const Login = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

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
  console.log(done && isPasienLama)
  const stlKontainerIsiLogin =
    (done && isSelesai) || (done && isPasienLama)
      ? { top: '100%' }
      : isPasienLama
      ? { top: '50%' }
      : { top: '120px' }
  const stlKontainerBg = isPasienLama
    ? { left: '8px' }
    : { left: 'calc(50% + 8px)' }
  const stlBtnTerpilih = (link) => (page === link ? { color: '#715A06' } : {})
  return (
    <div className="page-login">
      <div className="kontainer-header-login" style={stlHeader}>
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
      <div className="kontainer-isi-login" style={stlKontainerIsiLogin}>
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
        {isPasienLama && <FormPasienLama setDone={setDone} />}
        {isPasienBaru && <FormPasienBaru step={step} setStep={setStep} />}
        {isSelesai && <PasienBaruSelesai setDone={setDone} />}
      </div>
    </div>
  )
}

const FormPasienLama = ({ setDone }) => {
  const dispatch = useDispatch()
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
            rgxAllNumber.test(e.target.value) && vLogin.handleChange(e)
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
