import InputDM from '../../Components/InputDM/InputDM'
import ButtonDM from '../../Components/ButtonDM/ButtonDM'
import './PasienBaru.scss'
import { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { rgxAllNumber } from '../../utils/regexcommon'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMaster, getDesaKelurahan } from '../../store/master/action'
import SelectDM from '../../Components/SelectDM/SelectDM'
import FlatpickrDM from '../../Components/FlatpickrDM/FlatpickrDM'
import {
  getPasienEdit,
  signUpUser,
  updatePasien,
} from '../../store/userpasien/action'
import { getCaptcha } from '../../store/home/action'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../hooks/user'

const FormPasienBaru = ({ step, setStep }) => {
  const dispatch = useDispatch()
  const user = useUser()
  const isEdit = !!user
  const { master, desa, allStep, image, uuidcaptcha } = useSelector(
    (selector) => ({
      master: selector.Master.getAllMaster?.data?.data || null,
      desa: selector.Master.getDesaKelurahan?.data?.data || [],
      allStep: selector.UserPasien.getPasienEdit?.data || null,
      image: selector.Home.getCaptcha?.data?.image || '',
      uuidcaptcha: selector.Home.getCaptcha?.data?.uuid || '',
    })
  )
  const navigate = useNavigate()
  const refNegara = useRef(null)
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
      noidentitas: Yup.string()
        .required('No Identitas wajib diisi')
        .when('kewarganegaraan', {
          is: (val) => val === '1',
          then: () => Yup.string().length(16, 'No Identitas harus 16 digit'),
        }),
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
      setStep(step + 1)
    },
  })
  const vStep1 = useFormik({
    initialValues: {
      alamat: '',
      kelurahan: '',
      kodepos: '',
      rt: '',
      rw: '',
      kecamatan: '',
      kecamatanname: '',
      kabupaten: '',
      kabupatenname: '',
      provinsi: '',
      provinsiname: '',
      negara: '',
      negaraname: '',
    },
    validationSchema: Yup.object({
      alamat: Yup.string().required('Alamat wajib diisi'),
      kelurahan: Yup.string().required('Kelurahan wajib diisi'),
      // kodepos: Yup.string().required('Kode Pos wajib diisi'),
      rt: Yup.string().required('RT wajib diisi'),
      rw: Yup.string().required('RW wajib diisi'),
      kecamatan: Yup.string().required('Kecamatan wajib diisi'),
      kabupaten: Yup.string().required('Kabupaten wajib diisi'),
      provinsi: Yup.string().required('Provinsi wajib diisi'),
      negara: Yup.string().required('Negara wajib diisi'),
    }),
    onSubmit: (values, { resetForm }) => {
      setStep(step + 1)
    },
  })
  const vStep2 = useFormik({
    initialValues: {
      sesuaiktp: 1,
      alamat: '',
      kelurahan: '',
      kodepos: '',
      rt: '',
      rw: '',
      kecamatan: '',
      kecamatanname: '',
      kabupaten: '',
      kabupatenname: '',
      provinsi: '',
      provinsiname: '',
      negara: '',
      negaraname: '',
    },
    validationSchema: Yup.object({
      alamat: Yup.string().required('Alamat wajib diisi'),
      kelurahan: Yup.string().required('Kelurahan wajib diisi'),
      // kodepos: Yup.string().required('Kode Pos wajib diisi'),
      rt: Yup.string().required('RT wajib diisi'),
      rw: Yup.string().required('RW wajib diisi'),
      kecamatan: Yup.string().required('Kecamatan wajib diisi'),
      kabupaten: Yup.string().required('Kabupaten wajib diisi'),
      provinsi: Yup.string().required('Provinsi wajib diisi'),
      negara: Yup.string().required('Negara wajib diisi'),
    }),
    onSubmit: (values, { resetForm }) => {
      setStep(step + 1)
    },
  })
  const vStep3 = useFormik({
    initialValues: {
      namaibu: '',
      namaayah: '',
      nobpjs: '',
      nohppasien: '',
      uuid: '',
      answer: '',
    },
    validationSchema: Yup.object({
      namaibu: Yup.string().required('Nama Ibu wajib diisi'),
      namaayah: Yup.string().required('Nama Ayah wajib diisi'),
      // nobpjs: Yup.string().required('No BPJS wajib diisi'),
      nohppasien: Yup.string()
        .required('No HP Pasien wajib diisi')
        .min(10, 'No HP Pasien minimal 10 digit')
        .max(13, 'No HP Pasien maksimal 13 digit')
        .matches(rgxAllNumber, 'No HP Pasien harus angka'),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log('masuk')
      const finalVal = {
        step0: vStep0.values,
        step1: vStep1.values,
        step2: vStep2.values,
        step3: values,
      }
      const userBefore = user
      if (!isEdit) {
        dispatch(
          signUpUser(finalVal, () => {
            navigate('/login/selesai')
          })
        )
      } else {
        dispatch(
          updatePasien(finalVal, () => {
            navigate('/akun')
          })
        )
      }
    },
  })

  const handleKelurahanGet = (name) => {
    dispatch(getDesaKelurahan({ param: name }))
  }

  useEffect(() => {
    if (vStep2.values.sesuaiktp === 0 && vStep1.values.alamat) {
      const setFF = vStep2.setFieldValue
      setFF('alamat', vStep1.values.alamat || '')
      setFF('kelurahan', vStep1.values.kelurahan || '')
      setFF('kodepos', vStep1.values.kodepos || '')
      setFF('rt', vStep1.values.rt || '')
      setFF('rw', vStep1.values.rw || '')
      setFF('kecamatan', vStep1.values.kecamatan || '')
      setFF('kecamatanname', vStep1.values.kecamatanname || '')
      setFF('kabupaten', vStep1.values.kabupaten || '')
      setFF('kabupatenname', vStep1.values.kabupatenname || '')
      setFF('provinsi', vStep1.values.provinsi || '')
      setFF('provinsiname', vStep1.values.provinsiname || '')
      setFF('negara', vStep1.values.negara || '')
      setFF('negaraname', vStep1.values.negaraname || '')
    }
  }, [vStep1.values, vStep2.setFieldValue, vStep2.values.sesuaiktp])

  useEffect(() => {
    const setFF = vStep1.setFieldValue
    const setFF2 = vStep2.setFieldValue
    if (vStep0.values.kewarganegaraan === 1) {
      setFF('negara', 13)
      setFF('negaraname', 'Indonesia')
      setFF2('negara', 13)
      setFF2('negaraname', 'Indonesia')
    } else {
      setFF('negara', '')
      setFF('negaraname', '')
      setFF2('negara', '')
      setFF2('negaraname', '')
    }
  }, [
    vStep0.values.kewarganegaraan,
    vStep1.setFieldValue,
    vStep2.setFieldValue,
    refNegara,
  ])

  useEffect(() => {
    const setV0 = vStep0.setValues
    const setV1 = vStep1.setValues
    const setV2 = vStep2.setValues
    const setV3 = vStep3.setValues
    if (allStep.step0) {
      setV0(allStep.step0)
    }
    if (allStep.step1) {
      setV1(allStep.step1)
    }
    if (allStep.step2) {
      setV2(allStep.step2)
    }
    if (allStep.step3) {
      setV3({
        ...vStep3.initialValues,
        ...allStep.step3,
        uuid: uuidcaptcha,
      })
    }
    setV3({
      ...vStep3.initialValues,
      uuid: uuidcaptcha,
    })
  }, [
    allStep,
    vStep0.setValues,
    vStep1.setValues,
    vStep2.setValues,
    vStep3.setValues,
    uuidcaptcha,
  ])

  useEffect(() => {
    dispatch(getAllMaster())
    dispatch(getPasienEdit())
    dispatch(getCaptcha())
  }, [dispatch])

  const konfirmasi = [
    { label: 'Ya', value: 0 },
    { label: 'Tidak', value: 1 },
  ]
  console.log(vStep0.values.kewarganegaraan)
  return (
    <div className="kontainer-konten pasien-baru-konten">
      {step === 0 && (
        <>
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
              isDisabled={isEdit}
            />
          </InputGroup>
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
              disabled={isEdit}
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
              disabled={isEdit}
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
              disabled={isEdit}
            />
          </InputGroup>
          <InputGroup label={'Tanggal Lahir'}>
            <FlatpickrDM
              className="input-login"
              value={vStep0.values.tanggallahir}
              onChange={([newDate]) => {
                vStep0.setFieldValue(
                  'tanggallahir',
                  newDate.toISOString() || ''
                )
              }}
              disabled={isEdit}
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
              isDisabled={isEdit}
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
              isDisabled={isEdit}
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
              isDisabled={isEdit}
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
              isDisabled={isEdit}
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
              isDisabled={isEdit}
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
              isDisabled={isEdit}
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
              isDisabled={isEdit}
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
              isDisabled={isEdit}
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
              disabled={isEdit}
            />
          </InputGroup>
        </>
      )}
      {step === 1 && (
        <>
          <InputGroup label={'Alamat'}>
            <InputDM
              id="alamat"
              name="alamat"
              type="string"
              className="input-login"
              value={vStep1.values.alamat}
              errorMsg={vStep1.errors.alamat}
              isError={vStep1.touched.alamat && vStep1.errors.alamat}
              onChange={(e) => {
                vStep1.handleChange(e)
              }}
              disabled={isEdit}
            />
          </InputGroup>
          <div className="input-split">
            <div className="isi-input">
              <InputGroup label={'RT'}>
                <InputDM
                  id="rt"
                  name="rt"
                  type="string"
                  className="input-login"
                  value={vStep1.values.rt}
                  errorMsg={vStep1.errors.rt}
                  isError={vStep1.touched.rt && vStep1.errors.rt}
                  onChange={(e) => {
                    vStep1.handleChange(e)
                  }}
                  disabled={isEdit}
                />
              </InputGroup>
            </div>
            <div className="isi-input">
              <InputGroup label={'RW'}>
                <InputDM
                  id="rw"
                  name="rw"
                  type="string"
                  className="input-login"
                  value={vStep1.values.rw}
                  errorMsg={vStep1.errors.rw}
                  isError={vStep1.touched.rw && vStep1.errors.rw}
                  onChange={(e) => {
                    vStep1.handleChange(e)
                  }}
                  disabled={isEdit}
                />
              </InputGroup>
            </div>
          </div>
          <InputGroup label={'Kelurahan / Desa'}>
            <SelectDM
              id="kelurahan"
              name="kelurahan"
              className="input-login"
              options={desa}
              isError={vStep1.touched.kelurahan && vStep1.errors.kelurahan}
              errorMsg={vStep1.errors.kelurahan}
              onInputChange={handleKelurahanGet}
              value={vStep1.values.kelurahan}
              valueInit={
                allStep.step1?.kelurahan
                  ? {
                      value: allStep.step1.kelurahan,
                      label: allStep.step1.kelurahanname,
                    }
                  : null
              }
              onChange={(e) => {
                if (
                  e.valuekecamatan &&
                  e.namakecamatan &&
                  e.valuekabupaten &&
                  e.valuepropinsi &&
                  e.namaprovinsi
                ) {
                  vStep1.setFieldValue('kecamatan', e.valuekecamatan || '')
                  vStep1.setFieldValue('kecamatanname', e.namakecamatan || '')
                  vStep1.setFieldValue('kabupaten', e.valuekabupaten || '')
                  vStep1.setFieldValue('kabupatenname', e.namakabupaten || '')
                  vStep1.setFieldValue('provinsi', e.valuepropinsi || '')
                  vStep1.setFieldValue('provinsiname', e.namaprovinsi || '')
                }
                if (e.kodepos) {
                  vStep1.setFieldValue('kodepos', e.kodepos || '')
                }
                vStep1.setFieldValue('kelurahan', e.value || '')
              }}
              isDisabled={isEdit}
            />
          </InputGroup>
          <InputGroup label={'Kode Pos'}>
            <InputDM
              id="kodepos"
              name="kodepos"
              type="string"
              className="input-login"
              value={vStep1.values.kodepos}
              errorMsg={vStep1.errors.kodepos}
              isError={vStep1.touched.kodepos && vStep1.errors.kodepos}
              onChange={(e) => {
                vStep1.handleChange(e)
              }}
              disabled={isEdit}
            />
          </InputGroup>
          <InputGroup label={'Kecamatan'}>
            <InputDM
              id="kecamatanname"
              name="kecamatanname"
              type="string"
              className="input-login"
              value={vStep1.values.kecamatanname}
              errorMsg={vStep1.errors.kecamatan}
              isError={vStep1.touched.kecamatan && vStep1.errors.kecamatan}
              onChange={(e) => {
                vStep1.handleChange(e)
              }}
              disabled={true}
            />
          </InputGroup>
          <InputGroup label={'Kabupaten'}>
            <InputDM
              id="kabupatenname"
              name="kabupatenname"
              type="string"
              className="input-login"
              value={vStep1.values.kabupatenname}
              errorMsg={vStep1.errors.kabupaten}
              isError={vStep1.touched.kabupaten && vStep1.errors.kabupaten}
              onChange={(e) => {
                vStep1.handleChange(e)
              }}
              disabled={true}
            />
          </InputGroup>
          <InputGroup label={'Provinsi'}>
            <InputDM
              id="provinsiname"
              name="provinsiname"
              type="string"
              className="input-login"
              value={vStep1.values.provinsiname}
              errorMsg={vStep1.errors.provinsi}
              isError={vStep1.touched.provinsi && vStep1.errors.provinsi}
              onChange={(e) => {
                vStep1.handleChange(e)
              }}
              disabled={true}
            />
          </InputGroup>
          <InputGroup label={'Negara'}>
            <SelectDM
              id="negara"
              name="negara"
              className="input-login"
              options={master?.negara || []}
              isError={vStep1.touched.negara && vStep1.errors.negara}
              errorMsg={vStep1.errors.negara}
              onChange={(e) => {
                vStep1.setFieldValue('negara', e.value || '')
              }}
              value={vStep1.values.negara}
              isDisabled={isEdit}
            />
          </InputGroup>
        </>
      )}
      {step === 2 && (
        <>
          <InputGroup label={'Apakah Alamat Domisili Sesuai Dengan KTP?'}>
            <SelectDM
              id="sesuaiktp"
              name="sesuaiktp"
              className="input-login"
              options={konfirmasi}
              isError={vStep2.touched.sesuaiktp && vStep2.errors.sesuaiktp}
              errorMsg={vStep2.errors.sesuaiktp}
              onChange={(e) => {
                vStep2.setFieldValue('sesuaiktp', e.value)
              }}
              value={vStep2.values.sesuaiktp}
            />
          </InputGroup>
          <InputGroup label={'Alamat'}>
            <InputDM
              id="alamat"
              name="alamat"
              type="string"
              className="input-login"
              value={vStep2.values.alamat}
              errorMsg={vStep2.errors.alamat}
              isError={vStep2.touched.alamat && vStep2.errors.alamat}
              disabled={vStep2.values.sesuaiktp === 0}
              onChange={(e) => {
                vStep2.handleChange(e)
              }}
            />
          </InputGroup>
          <div className="input-split">
            <div className="isi-input">
              <InputGroup label={'RT'}>
                <InputDM
                  id="rt"
                  name="rt"
                  type="string"
                  className="input-login"
                  value={vStep2.values.rt}
                  errorMsg={vStep2.errors.rt}
                  isError={vStep2.touched.rt && vStep2.errors.rt}
                  disabled={vStep2.values.sesuaiktp === 0}
                  onChange={(e) => {
                    vStep2.handleChange(e)
                  }}
                />
              </InputGroup>
            </div>
            <div className="isi-input">
              <InputGroup label={'RW'}>
                <InputDM
                  id="rw"
                  name="rw"
                  type="string"
                  className="input-login"
                  value={vStep2.values.rw}
                  errorMsg={vStep2.errors.rw}
                  isError={vStep2.touched.rw && vStep2.errors.rw}
                  disabled={vStep2.values.sesuaiktp === 0}
                  onChange={(e) => {
                    vStep2.handleChange(e)
                  }}
                />
              </InputGroup>
            </div>
          </div>
          <InputGroup label={'Kelurahan / Desa'}>
            <SelectDM
              id="kelurahan"
              name="kelurahan"
              className="input-login"
              options={desa}
              isError={vStep2.touched.kelurahan && vStep2.errors.kelurahan}
              errorMsg={vStep2.errors.kelurahan}
              isDisabled={vStep2.values.sesuaiktp === 0}
              onInputChange={handleKelurahanGet}
              onChange={(e) => {
                console.log(e)
                vStep2.setFieldValue('kodepos', e.kodepos || '')
                vStep2.setFieldValue('kelurahan', e.value || '')
                vStep2.setFieldValue('kecamatan', e.valuekecamatan || '')
                vStep2.setFieldValue('kecamatanname', e.namakecamatan || '')
                vStep2.setFieldValue('kabupaten', e.valuekabupaten || '')
                vStep2.setFieldValue('kabupatenname', e.namakabupaten || '')
                vStep2.setFieldValue('provinsi', e.valuepropinsi || '')
                vStep2.setFieldValue('provinsiname', e.namaprovinsi || '')
              }}
              value={vStep2.values.kelurahan}
              valueInit={
                allStep.step2?.kelurahan
                  ? {
                      value: allStep.step2.kelurahan,
                      label: allStep.step2.kelurahanname,
                      kodepos: allStep.step2.kodepos,
                      valuekecamatan: allStep.step2.kecamatan,
                      namakecamatan: allStep.step2.kecamatanname,
                      valuekabupaten: allStep.step2.kabupaten,
                      namakabupaten: allStep.step2.kabupatenname,
                      valuepropinsi: allStep.step2.provinsi,
                      namaprovinsi: allStep.step2.provinsiname,
                    }
                  : null
              }
            />
          </InputGroup>
          <InputGroup label={'Kode Pos'}>
            <InputDM
              id="kodepos"
              name="kodepos"
              type="string"
              className="input-login"
              disabled={vStep2.values.sesuaiktp === 0}
              value={vStep2.values.kodepos}
              errorMsg={vStep2.errors.kodepos}
              isError={vStep2.touched.kodepos && vStep2.errors.kodepos}
              onChange={(e) => {
                vStep2.handleChange(e)
              }}
            />
          </InputGroup>
          <InputGroup label={'Kecamatan'}>
            <InputDM
              id="kecamatanname"
              name="kecamatanname"
              type="string"
              className="input-login"
              value={vStep2.values.kecamatanname}
              errorMsg={vStep2.errors.kecamatan}
              isError={vStep2.touched.kecamatan && vStep2.errors.kecamatan}
              onChange={(e) => {
                vStep2.handleChange(e)
              }}
              disabled={true}
            />
          </InputGroup>
          <InputGroup label={'Kabupaten'}>
            <InputDM
              id="kabupatenname"
              name="kabupatenname"
              type="string"
              className="input-login"
              value={vStep2.values.kabupatenname}
              errorMsg={vStep2.errors.kabupaten}
              isError={vStep2.touched.kabupaten && vStep2.errors.kabupaten}
              onChange={(e) => {
                vStep2.handleChange(e)
              }}
              disabled={true}
            />
          </InputGroup>
          <InputGroup label={'Provinsi'}>
            <InputDM
              id="provinsiname"
              name="provinsiname"
              type="string"
              className="input-login"
              value={vStep2.values.provinsiname}
              errorMsg={vStep2.errors.provinsi}
              isError={vStep2.touched.provinsi && vStep2.errors.provinsi}
              onChange={(e) => {
                vStep2.handleChange(e)
              }}
              disabled={true}
            />
          </InputGroup>
          <InputGroup label={'Negara'}>
            <SelectDM
              id="negara"
              name="negara"
              className="input-login"
              options={master?.negara || []}
              isError={vStep2.touched.negara && vStep2.errors.negara}
              errorMsg={vStep2.errors.negara}
              onChange={(e) => {
                vStep2.setFieldValue('negara', e.value || '')
              }}
              value={vStep2.values.negara}
              isDisabled={vStep2.values.sesuaiktp === 0}
            />
          </InputGroup>
        </>
      )}
      {step === 3 && (
        <>
          <InputGroup label={'Nama Ibu'}>
            <InputDM
              id="namaibu"
              name="namaibu"
              type="string"
              className="input-login"
              value={vStep3.values.namaibu}
              errorMsg={vStep3.errors.namaibu}
              isError={vStep3.touched.namaibu && vStep3.errors.namaibu}
              onChange={(e) => {
                vStep3.handleChange(e)
              }}
              disabled={isEdit}
            />
          </InputGroup>
          <InputGroup label={'Nama Ayah'}>
            <InputDM
              id="namaayah"
              name="namaayah"
              type="string"
              className="input-login"
              value={vStep3.values.namaayah}
              errorMsg={vStep3.errors.namaayah}
              isError={vStep3.touched.namaayah && vStep3.errors.namaayah}
              onChange={(e) => {
                vStep3.handleChange(e)
              }}
              disabled={isEdit}
            />
          </InputGroup>
          <InputGroup label={'No BPJS'}>
            <InputDM
              id="nobpjs"
              name="nobpjs"
              type="string"
              className="input-login"
              value={vStep3.values.nobpjs}
              errorMsg={vStep3.errors.nobpjs}
              isError={vStep3.touched.nobpjs && vStep3.errors.nobpjs}
              onChange={(e) => {
                rgxAllNumber.test(e.target.value) && vStep3.handleChange(e)
              }}
              disabled={isEdit}
            />
          </InputGroup>
          <InputGroup label={'No HP Pasien'}>
            <InputDM
              id="nohppasien"
              name="nohppasien"
              type="string"
              className="input-login"
              value={vStep3.values.nohppasien}
              errorMsg={vStep3.errors.nohppasien}
              isError={vStep3.touched.nohppasien && vStep3.errors.nohppasien}
              onChange={(e) => {
                rgxAllNumber.test(e.target.value) && vStep3.handleChange(e)
              }}
              disabled={isEdit}
            />
          </InputGroup>
          <img
            width={'100%'}
            height={'fit-content'}
            src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`}
          />
          <InputGroup label={'Masukkan captcha'}>
            <InputDM
              id="answer"
              name="answer"
              type="string"
              className="input-login"
              value={vStep3.values.answer}
              errorMsg={vStep3.errors.answer}
              isError={vStep3.touched.answer && vStep3.errors.answer}
              onChange={(e) => {
                vStep3.handleChange(e)
              }}
              disabled={isEdit}
            />
          </InputGroup>
        </>
      )}

      <div className="kontainer-btn-lama">
        <ButtonDM
          className="btn-lama"
          onClick={() => {
            if (step > 0) {
              setStep(step - 1)
            } else {
              navigate('/akun')
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
              } else if (step === 1) {
                vStep1.handleSubmit()
              } else if (step === 2) {
                console.error(vStep2.errors)
                console.error(vStep2.touched)
                vStep2.handleSubmit()
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
            type="button"
            onClick={() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
              })
              console.log(vStep3.errors)
              vStep3.handleSubmit()
            }}
          >
            Selesai
          </ButtonDM>
        )}
      </div>
    </div>
  )
}

export const InputGroup = ({ label, children }) => {
  return (
    <div className="input-group-pasien-baru">
      <label className="label-login">{label}</label>
      {children}
    </div>
  )
}

export default FormPasienBaru
