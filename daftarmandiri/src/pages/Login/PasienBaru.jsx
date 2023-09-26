import { InputGroup } from './Login'
import InputDM from '../../Components/InputDM/InputDM'
import ButtonDM from '../../Components/ButtonDM/ButtonDM'
import './PasienBaru.scss'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { rgxAllNumber } from '../../utils/regexcommon'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMaster } from '../../store/master/action'
import SelectDM from '../../Components/SelectDM/SelectDM'
import FlatpickrDM from '../../Components/FlatpickrDM/FlatpickrDM'

const FormPasienBaru = ({ step, setStep }) => {
  const dispatch = useDispatch()
  const { master } = useSelector((selector) => ({
    master: selector.Master.getAllMaster?.data?.data || null,
  }))
  useEffect(() => {
    dispatch(getAllMaster())
  }, [dispatch])
  const vStep0 = useFormik({
    initialValues: {
      namalengkap: '',
      noidentitas: '',
      tempatlahir: '',
      tanggallahir: '',
      jeniskelamin: '',
      golongandarah: '',
      agama: '',
      kewarganegaraan: '',
      suku: '',
      bahasayangdikuasai: '',
      pendidikanterakhir: '',
      pekerjaan: '',
      statusperkawinan: '',
      namapasangan: '',
    },
    validationSchema: Yup.object({
      namalengkap: Yup.string().required('Nama wajib diisi'),
      noidentitas: Yup.string().required('No Identitas wajib diisi'),
      tempatlahir: Yup.string().required('Tempat Lahir wajib diisi'),
      tanggallahir: Yup.string().required('Tanggal Lahir wajib diisi'),
      jeniskelamin: Yup.string().required('Jenis Kelamin wajib diisi'),
      golongandarah: Yup.string().required('Golongan Darah wajib diisi'),
      agama: Yup.string().required('Agama wajib diisi'),
      kewarganegaraan: Yup.string().required('Kewarganegaraan wajib diisi'),
      suku: Yup.string().required('Suku wajib diisi'),
      bahasayangdikuasai: Yup.string().required(
        'Bahasa Yang Dikuasai wajib diisi'
      ),
      pendidikanterakhir: Yup.string().required(
        'Pendidikan Terakhir wajib diisi'
      ),
      pekerjaan: Yup.string().required('Pekerjaan wajib diisi'),
      statusperkawinan: Yup.string().required('Status Perkawinan wajib diisi'),
      namapasangan: Yup.string().required('Nama Pasangan wajib diisi'),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log('masuk')
      setStep(step + 1)
    },
  })
  return (
    <div className="kontainer-konten pasien-lama-konten">
      {step === 0 && (
        <>
          <InputGroup label={'Nama Lengkap'}>
            <InputDM
              id="namalengkap"
              name="namalengkap"
              type="string"
              className="input-login"
              value={vStep0.values.namalengkap}
              errorMsg={vStep0.errors.namalengkap}
              isError={vStep0.touched.namalengkap && vStep0.errors.namalengkap}
              onChange={(e) => {
                vStep0.handleChange(e)
              }}
            />
          </InputGroup>
          <InputGroup label={'No Identitas'}>
            <InputDM
              id="noidentitas"
              name="noidentitas"
              type="string"
              className="input-login"
              value={vStep0.values.noidentitas}
              errorMsg={vStep0.errors.noidentitas}
              isError={vStep0.touched.noidentitas && vStep0.errors.noidentitas}
              onChange={(e) => {
                vStep0.handleChange(e)
              }}
            />
          </InputGroup>
          <InputGroup label={'Tempat Lahir'}>
            <InputDM
              id="tempatlahir"
              name="tempatlahir"
              type="string"
              className="input-login"
              value={vStep0.values.tempatlahir}
              errorMsg={vStep0.errors.tempatlahir}
              isError={vStep0.touched.tempatlahir && vStep0.errors.tempatlahir}
              onChange={(e) => {
                vStep0.handleChange(e)
              }}
            />
          </InputGroup>
          <InputGroup label={'Tanggal Lahir'}>
            <FlatpickrDM
              className="input-login"
              value={vStep0.values.tanggallahir}
              onChange={([newDate]) => {
                newDate.setHours(0, 0, 0)
                vStep0.setFieldValue(
                  'tanggallahir',
                  newDate.toISOString() || ''
                )
              }}
              errorMsg={vStep0.errors.tanggallahir}
              isError={
                vStep0.touched.tanggallahir && vStep0.errors.tanggallahir
              }
            />
          </InputGroup>
          <InputGroup label={'Jenis Kelamin'}>
            <SelectDM
              id="jeniskelamin"
              name="jeniskelamin"
              className="input-login"
              options={master?.jeniskelamin || []}
              isError={
                vStep0.touched.jeniskelamin && vStep0.errors.jeniskelamin
              }
              errorMsg={vStep0.errors.jeniskelamin}
              onChange={(e) => {
                vStep0.setFieldValue('jeniskelamin', e.value || '')
              }}
              value={vStep0.values.jeniskelamin}
            />
          </InputGroup>
          <InputGroup label={'Golongan Darah'}>
            <SelectDM
              id="golongandarah"
              name="golongandarah"
              className="input-login"
              options={master?.golongandarah || []}
              isError={
                vStep0.touched.golongandarah && vStep0.errors.golongandarah
              }
              errorMsg={vStep0.errors.golongandarah}
              onChange={(e) => {
                vStep0.setFieldValue('golongandarah', e.value || '')
              }}
              value={vStep0.values.golongandarah}
            />
          </InputGroup>
          <InputGroup label={'Agama'}>
            <SelectDM
              id="agama"
              name="agama"
              className="input-login"
              options={master?.agama || []}
              isError={vStep0.touched.agama && vStep0.errors.agama}
              errorMsg={vStep0.errors.agama}
              onChange={(e) => {
                vStep0.setFieldValue('agama', e.value || '')
                console.log(e.value)
              }}
              value={vStep0.values.agama}
            />
          </InputGroup>
          <InputGroup label={'Kewarganegaraan'}>
            <SelectDM
              id="kewarganegaraan"
              name="kewarganegaraan"
              className="input-login"
              options={master?.kebangsaan || []}
              isError={
                vStep0.touched.kewarganegaraan && vStep0.errors.kewarganegaraan
              }
              errorMsg={vStep0.errors.kewarganegaraan}
              onChange={(e) => {
                vStep0.setFieldValue('kewarganegaraan', e.value || '')
              }}
              value={vStep0.values.kewarganegaraan}
            />
          </InputGroup>
          <InputGroup label={'Suku'}>
            <SelectDM
              id="suku"
              name="suku"
              className="input-login"
              options={master?.etnis || []}
              isError={vStep0.touched.suku && vStep0.errors.suku}
              errorMsg={vStep0.errors.suku}
              onChange={(e) => {
                vStep0.setFieldValue('suku', e.value || '')
              }}
              value={vStep0.values.suku}
            />
          </InputGroup>
          <InputGroup label={'Bahasa Yang Dikuasai'}>
            <SelectDM
              id="bahasayangdikuasai"
              name="bahasayangdikuasai"
              className="input-login"
              options={master?.bahasa || []}
              isError={
                vStep0.touched.bahasayangdikuasai &&
                vStep0.errors.bahasayangdikuasai
              }
              errorMsg={vStep0.errors.bahasayangdikuasai}
              onChange={(e) => {
                vStep0.setFieldValue('bahasayangdikuasai', e.value || '')
              }}
              value={vStep0.values.bahasayangdikuasai}
            />
          </InputGroup>
          <InputGroup label={'Pendidikan Terakhir'}>
            <SelectDM
              id="pendidikanterakhir"
              name="pendidikanterakhir"
              className="input-login"
              options={master?.pendidikan || []}
              isError={
                vStep0.touched.pendidikanterakhir &&
                vStep0.errors.pendidikanterakhir
              }
              errorMsg={vStep0.errors.pendidikanterakhir}
              onChange={(e) => {
                vStep0.setFieldValue('pendidikanterakhir', e.value || '')
              }}
              value={vStep0.values.pendidikanterakhir}
            />
          </InputGroup>
          <InputGroup label={'Pekerjaan'}>
            <SelectDM
              id="pekerjaan"
              name="pekerjaan"
              className="input-login"
              options={master?.pekerjaan || []}
              isError={vStep0.touched.pekerjaan && vStep0.errors.pekerjaan}
              errorMsg={vStep0.errors.pekerjaan}
              onChange={(e) => {
                vStep0.setFieldValue('pekerjaan', e.value || '')
              }}
              value={vStep0.values.pekerjaan}
            />
          </InputGroup>
          <InputGroup label={'Status Perkawinan'}>
            <SelectDM
              id="statusperkawinan"
              name="statusperkawinan"
              className="input-login"
              options={master?.perkawinan || []}
              isError={
                vStep0.touched.statusperkawinan &&
                vStep0.errors.statusperkawinan
              }
              errorMsg={vStep0.errors.statusperkawinan}
              onChange={(e) => {
                vStep0.setFieldValue('statusperkawinan', e.value || '')
              }}
              value={vStep0.values.statusperkawinan}
            />
          </InputGroup>
          <InputGroup label={'Nama Pasangan'}>
            <InputDM
              id="namapasangan"
              name="namapasangan"
              type="string"
              className="input-login"
              value={vStep0.values.namapasangan}
              errorMsg={vStep0.errors.namapasangan}
              isError={
                vStep0.touched.namapasangan && vStep0.errors.namapasangan
              }
              onChange={(e) => {
                vStep0.handleChange(e)
              }}
            />
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
            type="button"
            onClick={() => {
              if (step === 0) {
                vStep0.handleSubmit()
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
