import { InputGroup } from './Login'
import InputDM from '../../Components/InputDM/InputDM'
import ButtonDM from '../../Components/ButtonDM/ButtonDM'
import './PasienBaru.scss'
import { useState } from 'react'

const FormPasienBaru = ({ step, setStep }) => {
  return (
    <div className="kontainer-konten pasien-lama-konten">
      {step === 0 && (
        <>
          <InputGroup label={'Nama Lengkap'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'No Identitas'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Tempat Lahir'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Tanggal Lahir'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Jenis Kelamin'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Golongan Darah'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Agama'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Kewarganegaraan'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Suku'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Bahasa Yang Dikuasai'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Pendidikan Terakhir'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Pekerjaan'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Status Perkawinan'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Nama Pasangan'}>
            <InputDM className="input-login" />
          </InputGroup>
        </>
      )}
      {step === 1 && (
        <>
          <InputGroup label={'Alamat'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Kelurahan'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Kode Pos'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Kecamatan'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Kabupaten'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Provinsi'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Negara'}>
            <InputDM className="input-login" />
          </InputGroup>
        </>
      )}

      {step === 2 && (
        <>
          <InputGroup label={'Apakah Alamat Domisili Sesuai Dengan KTP?'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Alamat'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Kelurahan'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Kode Pos'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Kecamatan'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Kabupaten'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Provinsi'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Negara'}>
            <InputDM className="input-login" />
          </InputGroup>
        </>
      )}

      {step === 3 && (
        <>
          <InputGroup label={'Nama Ibu'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'Nama Ayah'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'No BPJS'}>
            <InputDM className="input-login" />
          </InputGroup>
          <InputGroup label={'No HP Pasien'}>
            <InputDM className="input-login" />
          </InputGroup>
        </>
      )}

      <div className="kontainer-btn-lama">
        <ButtonDM
          className="btn-lama"
          onClick={() => {
            if (step > 0) {
              setStep(step - 1)
            }
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            })
          }}
        >
          Kembali
        </ButtonDM>
        {step < 3 ? (
          <ButtonDM
            className="btn-lama"
            onClick={() => {
              if (step >= 0) {
                setStep(step + 1)
              }
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
              })
            }}
          >
            Selanjutnya
          </ButtonDM>
        ) : (
          <ButtonDM
            className="btn-lama"
            onClick={() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
              })
            }}
          >
            Selesai
          </ButtonDM>
        )}
      </div>
    </div>
  )
}

export default FormPasienBaru
