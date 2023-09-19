import InputDM from '../../Components/InputDM/InputDM'
import ButtonDM from '../../Components/ButtonDM/ButtonDM'
import './Login.scss'
import { useState } from 'react'
import { Circle } from 'rc-progress'
import FormPasienBaru from './PasienBaru'

const Login = () => {
  const [chosen, setChosen] = useState('pasien-baru')
  const [step, setStep] = useState(0)

  const headerName = [
    'Pengisian Data Diri',
    'Pengisian Alamat KTP',
    'Pengisian Alamat Domisili',
    'Pengisian Data Tambahan',
  ]

  const isPasienLama = chosen === 'pasien-lama'
  const stlHeader = isPasienLama ? { opacity: '0' } : { opacity: '1' }
  const stlKontainerIsiLogin = isPasienLama ? { top: '50%' } : { top: '120px' }
  const stlKontainerBg = isPasienLama
    ? { left: '8px' }
    : { left: 'calc(50% + 8px)' }
  const stlBtnTerpilih = (link) => (chosen === link ? { color: '#715A06' } : {})
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
        <div className="pilihan-pasien">
          <div className="kontainer-bg" style={stlKontainerBg}></div>
          <button
            onClick={() => setChosen('pasien-lama')}
            className="btn-pasien"
            style={stlBtnTerpilih('pasien-lama')}
          >
            Pasien Lama
          </button>
          <button
            onClick={() => setChosen('pasien-baru')}
            className="btn-pasien"
            style={stlBtnTerpilih('pasien-baru')}
          >
            Pasien Baru
          </button>
        </div>
        {isPasienLama ? (
          <div className="kontainer-konten">
            <InputGroup label={'No RM/NIK'}>
              <InputDM className="input-login" />
            </InputGroup>
            <InputGroup label={'Tanggal Lahir'}>
              <InputDM className="input-login" />
            </InputGroup>
            <ButtonDM className="btn-login">Masuk</ButtonDM>
          </div>
        ) : (
          <FormPasienBaru step={step} setStep={setStep} />
        )}
      </div>
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
