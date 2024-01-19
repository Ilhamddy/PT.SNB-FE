import React, { useEffect, useRef, useState } from 'react'
import UiContent from '../../../Components/Common/UiContent'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import withRouter from '../../../Components/Common/withRouter'
import classnames from 'classnames'
import { useFormik, yupToFormErrors } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
  Label,
  Input,
  Table,
  Form,
  FormFeedback,
  Alert,
} from 'reactstrap'

//Import Flatepicker
import Flatpickr from 'react-flatpickr'

//import images
import progileBg from '../../../assets/images/profile-bg-2.jpg'

import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import { masterGet, desaGet, kecamatanGet } from '../../../store/master/action'
import {
  registrasiSave,
  registrasiResetForm,
  registrasiGet,
  pasienFormQueriesGet,
} from '../../../store/actions'
import CustomSelect from '../../Select/Select'
import { rgxAllNumber, rgxNbrEmpty } from '../../../utils/regexcommon'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr'
import BtnSpinner from '../../../Components/Common/BtnSpinner'
import { getPesertaBPJS } from '../../../store/bpjs/bpjsSlice'
import ServiceRegistrasi from '../../../services/registrasi/service-registrasi'
import { getNoRMLast } from '../../../store/registrasi/registrasiSlice'
import ServiceRegistrasiValidation from '../../../services/registrasi/service-registrasi-validation'
const PasienBaru = () => {
  document.title = 'Profile Pasien Baru'
  const dispatch = useDispatch()
  const { idpasien, norectriage } = useParams()
  const [searchParams] = useSearchParams()
  const norecdp = searchParams.get('norecdp')
  const navigate = useNavigate()

  const refAgama = useRef(null)
  const refGolDarah = useRef(null)
  const refKebangsaan = useRef(null)
  const refPerkawinan = useRef(null)
  const refPendidikan = useRef(null)
  const refPekerjaan = useRef(null)
  const refSuku = useRef(null)
  const refBahasa = useRef(null)
  const refDesa = useRef(null)
  const refDesaDomisili = useRef(null)
  const refNegara = useRef(null)
  const refNegaraDomisili = useRef(null)

  const {
    data,
    dataJenisKelamin,
    dataTitle,
    dataGD,
    dataKebangsaan,
    dataPerkawinan,
    dataPendidikan,
    dataPekerjaan,
    dataEtnis: dataSuku,
    dataBahasa,
    dataDesa,
    dataNegara,
    loading,
    error,
    newData,
    loadingSave,
    success,
    errorSave,
    pasienFormQueries,
    pesertaBPJS,
  } = useSelector((state) => ({
    data: state.Master.masterGet.data.agama,
    dataJenisKelamin: state.Master.masterGet.data.jeniskelamin,
    dataTitle: state.Master.masterGet.data.title,
    dataGD: state.Master.masterGet.data.golongandarah,
    dataKebangsaan: state.Master.masterGet.data.kebangsaan,
    dataPerkawinan: state.Master.masterGet.data.perkawinan,
    dataPendidikan: state.Master.masterGet.data.pendidikan,
    dataPekerjaan: state.Master.masterGet.data.pekerjaan,
    dataEtnis: state.Master.masterGet.data.etnis,
    dataBahasa: state.Master.masterGet.data.bahasa,
    dataDesa: state.Master.desaGet.data,
    dataNegara: state.Master.masterGet.data.negara,
    newData: state.Registrasi.registrasiSave.newData,
    loadingSave: state.Registrasi.registrasiSave.loading,
    errorSave: state.Registrasi.registrasiSave.error,
    success: state.Registrasi.registrasiSave.success,
    loading: state.Master.masterGet.loading,
    error: state.Master.masterGet.error,
    pasienFormQueries:
      state.Registrasi.pasienFormQueriesGet.data?.pasien || null,
    pesertaBPJS: state.bpjsSlice.getPesertaBPJS.data?.peserta || null,
  }))

  const [cardHeaderTab, setcardHeaderTab] = useState('1')
  const cardHeaderToggle = (tab) => {
    if (cardHeaderTab !== tab) {
      setcardHeaderTab(tab)
    }
  }

  const [isSesuaiKtp, setisSesuaiKtp] = useState(false)

  const handleChangeDesa = (selected) => {
    validation.setFieldValue('desa', selected?.value || '')
    validation.setFieldValue('kecamatan', selected?.namakecamatan || '')
    validation.setFieldValue('kota', selected?.namakabupaten || '')
    validation.setFieldValue('provinsi', selected?.namaprovinsi || '')
    validation.setFieldValue('pos', selected?.kodepos || '')
    // console.log(selected);
  }
  const handleChangeDesaDomisili = (selected) => {
    validation.setFieldValue('desaDomisili', selected?.value || '')
    validation.setFieldValue('kecamatanDomisili', selected?.namakecamatan || '')
    validation.setFieldValue('kotaDomisili', selected?.namakabupaten || '')
    validation.setFieldValue('provinsiDomisili', selected?.namaprovinsi || '')
    validation.setFieldValue('posDomisili', selected?.kodepos || '')
    // console.log(selected);
  }

  const handleDesa = (characterEntered) => {
    if (characterEntered.length > 3) {
      // useEffect(() => {
      dispatch(desaGet(characterEntered))
      // }, [dispatch]);
    }
  }

  const { lastNoRM, msgAvailableNIK, checkNIKAvailable } = useValidationServer()

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: null,
      ismanualnorm: false,
      manualnorm: '',
      kebangsaan: '',
      namapasien: '',
      noidentitas: '',
      jeniskelamin: '',
      titlepasien: '',
      tgllahir: '',
      tempatlahir: '',
      agama: '',
      goldarah: '',
      statusperkawinan: '',
      pendidikan: '',
      pekerjaan: '',
      suku: '',
      bahasa: '',
      alamatktp: '',
      rt: '',
      rw: '',
      desa: '',
      kecamatan: '',
      kota: '',
      provinsi: '',
      pos: '',
      negara: '',
      alamatdomisili: '',
      rtdomisili: '',
      rwdomisili: '',
      desaDomisili: '',
      kecamatanDomisili: '',
      kotaDomisili: '',
      provinsiDomisili: '',
      posDomisili: '',
      negaraDomisili: '',
      nobpjs: '',
      namaibu: '',
      namaayah: '',
      namasuamiistri: '',
      namakeluargalain: '',
      nohp: '',
      notelepon: '',
      nocm: '',
      nocmtemp: '',
      norecdp: '',
    },
    validationSchema: Yup.object({
      manualnorm: Yup.string().when('ismanualnorm', {
        is: true,
        then: () =>
          Yup.string()
            .required('No RM harus diisi')
            .min(8, 'Harus 8 digit')
            .max(8, 'Harus 8 digit')
            .test(
              'norm-available',
              'Pengguna Sudah ada',
              async (value, { createError, parent }) => {
                try {
                  const serviceValidation = new ServiceRegistrasiValidation()
                  const response = await serviceValidation.getNoRMLast({
                    idpasien: parent.id,
                    norm: value,
                  })
                  if (!response.data.msgAvailable) return true
                  return createError({ message: response.data.msgAvailable })
                } catch (error) {
                  console.error(error)
                  return createError({ message: 'Error' })
                }
              }
            ),
      }),
      kebangsaan: Yup.string().required('Kebangsaan wajib diisi'),
      namapasien: Yup.string().required('Nama pasien wajib diisi'),
      noidentitas: Yup.string()
        .test(
          'nik-available',
          'Pengguna sudah ada',
          async (value, { createError, parent }) => {
            try {
              const serviceValidation = new ServiceRegistrasiValidation()
              const response = await serviceValidation.getNIK({
                idpasien: parent.id,
                noidentitas: value,
              })
              if (!response.data.msgAvailable) return true
              return createError({ message: response.data.msgAvailable })
            } catch (error) {
              console.error(error)
              return createError({ message: 'Error' })
            }
          }
        )
        .required('Nomor identitas wajib diisi')
        .when('kebangsaan', {
          is: (val) => val === '1',
          then: (schema) => schema.length(16, 'NIK harus 16 digit'),
        }),
      jeniskelamin: Yup.string().required('Jenis Kelamin wajib diisi'),
      titlepasien: Yup.string().required('Title Pasien wajib diisi'),
      tgllahir: Yup.string().required('Tanggal Lahir wajib diisi'),
      agama: Yup.string().required('Agama wajib diisi'),
      goldarah: Yup.string().required('Golongan Darah wajib diisi'),
      statusperkawinan: Yup.string().required('Status Perkawinan wajib diisi'),
      pendidikan: Yup.string().required('Pendidikan wajib diisi'),
      pekerjaan: Yup.string().required('Pekerjaan wajib diisi'),
      suku: Yup.string().required('Suku wajib diisi'),
      bahasa: Yup.string().required('Bahasa wajib diisi'),
      alamatktp: Yup.string().required('Alamat wajib diisi'),
      rt: Yup.string().required('RT wajib diisi'),
      rw: Yup.string().required('RW wajib diisi'),
      desa: Yup.string().required('Desa wajib diisi'),
      negara: Yup.string().required('negara wajib diisi'),
      alamatdomisili: Yup.string().required('Alamat Domisili Wajib diisi'),
      rtdomisili: Yup.string().required('RT wajib diisi'),
      rwdomisili: Yup.string().required('RW wajib diisi'),
      desaDomisili: Yup.string().required('Desa wajib diisi'),
      negaraDomisili: Yup.string().required('negara wajib diisi'),
      nobpjs: Yup.string().test(
        'bpjs-available',
        'Pengguna sudah ada',
        async (value, { createError, parent }) => {
          try {
            const serviceValidation = new ServiceRegistrasiValidation()
            const response = await serviceValidation.getNoBPJS({
              idpasien: parent.id,
              nobpjs: value,
            })
            if (!response.data.msgAvailable) return true
            return createError({ message: response.data.msgAvailable })
          } catch (error) {
            console.error(error)
            return createError({ message: 'Error' })
          }
        }
      ),
      nohp: Yup.string()
        .required('No HP Pasien wajib diisi')
        .min(10, 'No HP Pasien minimal 10 digit')
        .max(13, 'No HP Pasien maksimal 13 digit')
        .matches(rgxAllNumber, 'No HP Pasien harus angka'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        registrasiSave(values, (response) => {
          if (pasienFormQueries && pasienFormQueries.needVerif) {
            if (!values.norecdp) {
              navigate(`/bGlzdGRhZnRhcnBhc2llbi9kYWZ0YXItcGFzaWVuLWlnZA==`)
            } else {
              navigate(
                `/registrasi/pasien-ruangan/${response.data.id}/${values.norecdp}`
              )
            }
          } else if (norectriage === undefined) {
            if (data.id !== undefined) {
              navigate(`/registrasi/pasien-ruangan/${values.id}`)
            } else {
              navigate(`/registrasi/pasien-ruangan/${response.data.id}`)
            }
          } else {
            if (data.id !== undefined) {
              navigate(
                `/registrasi/pasien-ruangan-triage/${data.id}/${norectriage}`
              )
            } else {
              navigate(
                `/registrasi/pasien-ruangan-triage/${response.data.id}/${norectriage}`
              )
            }
          }
          resetForm({ values: '' })
        })
      )
      // console.log(values)
    },
  })

  const isEdit = !!validation.values.id

  const handleResetAll = () => {
    validation.resetForm()
    refAgama.current?.clearValue()
    refGolDarah.current?.clearValue()
    refKebangsaan.current?.clearValue()
    refPerkawinan.current?.clearValue()
    refPendidikan.current?.clearValue()
    refPekerjaan.current?.clearValue()
    refSuku.current?.clearValue()
    refBahasa.current?.clearValue()
    refDesa.current?.clearValue()
    refDesaDomisili.current?.clearValue()
    refNegara.current?.clearValue()
    refNegaraDomisili.current?.clearValue()
  }

  useEffect(() => {
    dispatch(masterGet())
    dispatch(desaGet(''))
    // dispatch(kecamatanGet())
  }, [dispatch])

  useEffect(() => {
    return () => {
      dispatch(registrasiResetForm())
    }
  }, [dispatch])

  useEffect(() => {
    const setFF = validation.setFieldValue
    if (!isSesuaiKtp) {
      return
    }
    setFF('alamatdomisili', validation.values.alamatktp)
    setFF('rtdomisili', validation.values.rt)
    setFF('rwdomisili', validation.values.rw)
    setFF('desaDomisili', validation.values.desa)
    setFF('kecamatanDomisili', validation.values.desa)
    setFF('kotaDomisili', validation.values.kota)
    setFF('provinsiDomisili', validation.values.provinsi)
    setFF('posDomisili', validation.values.pos)
    setFF('negaraDomisili', validation.values.negara)
  }, [
    validation.values.alamatktp,
    validation.values.rt,
    validation.values.rw,
    validation.values.desa,
    validation.values.kota,
    validation.values.provinsi,
    validation.values.pos,
    validation.values.negara,
    validation.setFieldValue,
    isSesuaiKtp,
  ])

  useEffect(() => {
    const setFF = validation.setFieldValue
    setFF('id', idpasien)
    dispatch(pasienFormQueriesGet({ idpasien: idpasien }))
  }, [idpasien, dispatch, validation.setFieldValue])

  useEffect(() => {
    const setV = validation.setValues
    if (pasienFormQueries) {
      setV({
        ...validation.initialValues,
        ...pasienFormQueries,
        norecdp: norecdp || '',
      })
    } else {
      setV({
        ...validation.initialValues,
        norecdp: norecdp || '',
      })
    }
  }, [
    pasienFormQueries,
    validation.setValues,
    validation.initialValues,
    norecdp,
  ])

  useEffect(() => {
    const setFF = validation.setFieldValue
    if (pesertaBPJS) {
      setFF('namapasien', capitalizeFirstLetter(pesertaBPJS.nama))
      setFF('jeniskelamin', pesertaBPJS.sex === 'L' ? 1 : '')
      setFF('tgllahir', pesertaBPJS.tglLahir || '')
      setFF('nobpjs', pesertaBPJS.noKartu || '')
    }
  }, [pesertaBPJS, validation.setFieldValue])

  const handleChangeKebangsaan = (selected) => {
    validation.setFieldValue('kebangsaan', selected?.value || '')
    validation.setFieldValue('noidentitas', '')
    if (selected?.value === 1) {
      validation.setFieldValue('negara', 13)
      validation.setFieldValue('negaraDomisili', 13)
    } else {
      refNegara.current?.clearValue()
      refNegaraDomisili.current?.clearValue()
    }
  }

  const DataDiri = (
    <Card style={{ backgroundColor: '#f1f2f6' }}>
      <CardHeader className="card-header-snb ">
        <h4 className="card-title mb-0">Data Diri Pasien</h4>
      </CardHeader>
      <CardBody>
        <Row className="gy-4">
          {!isEdit && (
            <div className="form-check ms-2">
              <Input
                className="form-check-input"
                type="checkbox"
                checked={validation.values.ismanualnorm}
                id="formCheckNoRM"
                onChange={(e) =>
                  validation.setFieldValue('ismanualnorm', e.target.checked)
                }
              />
              <Label
                className="form-check-label"
                htmlFor="formCheckNoRM"
                style={{ color: 'black' }}
              >
                Manual No RM (Terakhir {lastNoRM})
              </Label>
            </div>
          )}
          {validation.values.ismanualnorm && !isEdit && (
            <>
              <Col md={4}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="kebangsaan"
                    className="form-label"
                  >
                    No RM
                  </Label>
                </div>
              </Col>
              <Col md={8}>
                <div>
                  <Input
                    id="manualnorm"
                    name="manualnorm"
                    type="text"
                    value={validation.values.manualnorm}
                    onBlur={validation.handleBlur}
                    onChange={(e) => {
                      if (rgxAllNumber.test(e.target.value)) {
                        validation.setFieldValue('manualnorm', e.target.value)
                        validation.handleChange(e)
                      }
                    }}
                    invalid={
                      validation.touched?.manualnorm &&
                      !!validation.errors?.manualnorm
                    }
                    valid={
                      validation.touched?.manualnorm &&
                      !validation.errors?.manualnorm
                    }
                  />
                  {validation.touched?.manualnorm &&
                    !!validation.errors.manualnorm && (
                      <FormFeedback type="invalid">
                        <div>{validation.errors.manualnorm}</div>
                      </FormFeedback>
                    )}
                  {validation.touched?.manualnorm &&
                    !validation.errors.manualnorm && (
                      <div className="valid-feedback">
                        <div>{'Tersedia'}</div>
                      </div>
                    )}
                </div>
              </Col>
            </>
          )}
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="kebangsaan"
                className="form-label"
              >
                Kebangsaan
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <CustomSelect
                id="kebangsaan"
                name="kebangsaan"
                options={dataKebangsaan}
                value={validation.values.kebangsaan || ''}
                className={`input ${
                  validation.errors.kebangsaan ? 'is-invalid' : ''
                }`}
                onChange={handleChangeKebangsaan}
                ref={refKebangsaan}
              />
              {validation.touched.kebangsaan && validation.errors.kebangsaan ? (
                <FormFeedback type="invalid">
                  <div>{validation.errors.kebangsaan}</div>
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="noidentitas"
                className="form-label"
              >
                No Identitas
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="noidentitas"
                name="noidentitas"
                type="string"
                placeholder="Masukkan No Identitas pasien"
                onBlur={(e) => {
                  dispatch(
                    getPesertaBPJS({ nik: validation.values.noidentitas })
                  )
                  validation.handleBlur(e)
                  validation.setFieldTouched('nobpjs', true)
                }}
                onChange={(e) => {
                  if (
                    validation.values.kebangsaan === 1 &&
                    rgxAllNumber.test(e.target.value)
                  ) {
                    validation.setFieldValue('noidentitas', e.target.value)
                  } else if (validation.values.kebangsaan !== 1) {
                    validation.setFieldValue('noidentitas', e.target.value)
                  }
                  validation.handleChange(e)
                }}
                value={validation.values.noidentitas || ''}
                invalid={
                  validation.touched.noidentitas &&
                  validation.errors.noidentitas
                }
                valid={
                  validation.touched.noidentitas &&
                  !validation.errors.noidentitas
                }
              />
              {validation.touched.noidentitas &&
              validation.errors.noidentitas ? (
                <FormFeedback type="invalid">
                  <div>{validation.errors.noidentitas}</div>
                </FormFeedback>
              ) : null}
              {validation.touched.noidentitas &&
              !validation.errors.noidentitas ? (
                <div className="valid-feedback">
                  <div>{'Tersedia'}</div>
                </div>
              ) : null}
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="namapasien"
                className="form-label"
              >
                Nama Pasien
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="namapasien"
                name="namapasien"
                type="text"
                placeholder="Masukkan nama pasien"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.namapasien || ''}
                invalid={
                  validation.touched.namapasien &&
                  !!validation.errors.namapasien
                }
              />
              {validation.touched.namapasien && validation.errors.namapasien ? (
                <FormFeedback type="invalid">
                  <div>{validation.errors.namapasien}</div>
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="jeniskelamin"
                className="form-label"
              >
                Jenis Kelamin
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <CustomSelect
                id="jeniskelamin"
                name="jeniskelamin"
                options={dataJenisKelamin}
                value={validation.values.jeniskelamin || ''}
                className={`input ${
                  validation.errors.jeniskelamin ? 'is-invalid' : ''
                }`}
                onChange={(value) =>
                  validation.setFieldValue('jeniskelamin', value?.value || '')
                }
                isClearEmpty
              />
              {validation.touched.jeniskelamin &&
              validation.errors.jeniskelamin ? (
                <FormFeedback type="invalid">
                  <div>{validation.errors.jeniskelamin}</div>
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="titlepasien"
                className="form-label"
              >
                Title Pasien
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <CustomSelect
                id="titlepasien"
                name="titlepasien"
                options={dataTitle}
                value={validation.values.titlepasien || ''}
                className={`input ${
                  validation.errors.titlepasien ? 'is-invalid' : ''
                }`}
                onChange={(value) =>
                  validation.setFieldValue('titlepasien', value?.value || '')
                }
              />
              {validation.touched.titlepasien &&
              validation.errors.titlepasien ? (
                <FormFeedback type="invalid">
                  <div>{validation.errors.titlepasien}</div>
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="tempatlahir"
                className="form-label"
              >
                Tempat Lahir
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="tempatlahir"
                name="tempatlahir"
                type="text"
                placeholder="Masukkan tempat lahir"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.tempatlahir || ''}
                invalid={
                  validation.touched.tempatlahir &&
                  validation.errors.tempatlahir
                    ? true
                    : false
                }
              />
              {validation.touched.tempatlahir &&
              validation.errors.tempatlahir ? (
                <FormFeedback type="invalid">
                  <div>{validation.errors.tempatlahir}</div>
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="tgllahir"
                className="form-label"
              >
                Tanggal Lahir
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <KontainerFlatpickr
                options={{
                  dateFormat: 'Y-m-d',
                  defaultDate: 'today',
                  maxDate: 'today',
                }}
                value={new Date(validation.values.tgllahir) || ''}
                onChange={([newDate]) => {
                  validation.setFieldValue('tgllahir', newDate.toISOString())
                }}
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="agama"
                className="form-label"
              >
                Agama
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <CustomSelect
                id="agama"
                name="agama"
                options={data}
                value={validation.values.agama || ''}
                className={`input ${
                  validation.errors.agama ? 'is-invalid' : ''
                }`}
                onChange={(value) =>
                  validation.setFieldValue('agama', value?.value || '')
                }
                ref={refAgama}
              />
              {validation.touched.agama && validation.errors.agama ? (
                <FormFeedback type="invalid">
                  <div>{validation.errors.agama}</div>
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="goldarah"
                className="form-label"
              >
                Gol Darah
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <CustomSelect
                id="goldarah"
                name="goldarah"
                options={dataGD}
                value={validation.values.goldarah || ''}
                className={`input ${
                  validation.errors.goldarah ? 'is-invalid' : ''
                }`}
                onChange={(value) =>
                  validation.setFieldValue('goldarah', value?.value || '')
                }
                ref={refGolDarah}
              />
              {validation.touched.goldarah && validation.errors.goldarah ? (
                <FormFeedback type="invalid">
                  <div>{validation.errors.goldarah}</div>
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="statusperkawinan"
                className="form-label"
              >
                Status Perkawinan
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <CustomSelect
                id="statusperkawinan"
                name="statusperkawinan"
                options={dataPerkawinan}
                value={validation.values.statusperkawinan || ''}
                className={`input ${
                  validation.errors.statusperkawinan ? 'is-invalid' : ''
                }`}
                onChange={(value) =>
                  validation.setFieldValue(
                    'statusperkawinan',
                    value?.value || ''
                  )
                }
                ref={refPerkawinan}
              />
              {validation.touched.statusperkawinan &&
              validation.errors.statusperkawinan ? (
                <FormFeedback type="invalid">
                  <div>{validation.errors.statusperkawinan}</div>
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="pendidikan"
                className="form-label"
              >
                Pendidikan
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <CustomSelect
                id="pendidikan"
                name="pendidikan"
                options={dataPendidikan}
                value={validation.values.pendidikan || ''}
                className={`input ${
                  validation.errors.pendidikan ? 'is-invalid' : ''
                }`}
                onChange={(value) =>
                  validation.setFieldValue('pendidikan', value?.value || '')
                }
                ref={refPendidikan}
              />
              {validation.touched.pendidikan && validation.errors.pendidikan ? (
                <FormFeedback type="invalid">
                  <div>{validation.errors.pendidikan}</div>
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="pekerjaan"
                className="form-label"
              >
                Pekerjaan
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <CustomSelect
                id="pekerjaan"
                name="pekerjaan"
                options={dataPekerjaan}
                value={validation.values.pekerjaan || ''}
                className={`input ${
                  validation.errors.pekerjaan ? 'is-invalid' : ''
                }`}
                onChange={(value) =>
                  validation.setFieldValue('pekerjaan', value?.value)
                }
                ref={refPekerjaan}
              />
              {validation.touched.pekerjaan && validation.errors.pekerjaan ? (
                <FormFeedback type="invalid">
                  <div>{validation.errors.pekerjaan}</div>
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="suku"
                className="form-label"
              >
                Suku
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <CustomSelect
                id="suku"
                name="suku"
                options={dataSuku}
                value={validation.values.suku || ''}
                className={`input ${
                  validation.errors.suku ? 'is-invalid' : ''
                }`}
                onChange={(value) =>
                  validation.setFieldValue('suku', value?.value || '')
                }
                ref={refSuku}
              />
              {validation.touched.suku && validation.errors.suku ? (
                <FormFeedback type="invalid">
                  <div>{validation.errors.suku}</div>
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="bahasa"
                className="form-label"
              >
                Bahasa Yang Dikuasai
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <CustomSelect
                id="bahasa"
                name="bahasa"
                options={dataBahasa}
                value={validation.values.bahasa || ''}
                className={`input ${
                  validation.errors.bahasa ? 'is-invalid' : ''
                }`}
                onChange={(value) =>
                  validation.setFieldValue('bahasa', value?.value || '')
                }
                ref={refBahasa}
              />
              {validation.touched.bahasa && validation.errors.bahasa ? (
                <FormFeedback type="invalid">
                  <div>{validation.errors.bahasa}</div>
                </FormFeedback>
              ) : null}
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )

  const InfoTambahan = (
    <Card style={{ backgroundColor: '#f1f2f6' }}>
      <CardHeader className="card-header-snb ">
        <h4 className="card-title mb-0">Informasi Tambahan</h4>
      </CardHeader>
      <CardBody>
        <Row className="gy-4">
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="nobpjs"
                className="form-label"
              >
                No BPJS
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="nobpjs"
                name="nobpjs"
                type="string"
                placeholder="Masukkan nomor bpjs"
                onChange={(e) => {
                  rgxNbrEmpty.test(e.target.value) &&
                    validation.setFieldValue('nobpjs', e.target.value)
                }}
                onBlur={validation.handleBlur}
                value={validation.values.nobpjs || ''}
                invalid={validation.touched.nobpjs && validation.errors.nobpjs}
                valid={validation.touched.nobpjs && !validation.errors.nobpjs}
              />
              {validation.touched.nobpjs && validation.errors.nobpjs ? (
                <FormFeedback type="invalid">
                  <div>{validation.errors.nobpjs}</div>
                </FormFeedback>
              ) : null}
              {validation.touched.nobpjs && !validation.errors.nobpjs ? (
                <div className="valid-feedback">
                  <div>{'Tersedia'}</div>
                </div>
              ) : null}
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="namaibu"
                className="form-label"
              >
                Nama Ibu
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="namaibu"
                name="namaibu"
                type="string"
                placeholder="Masukkan nama ibu"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.namaibu || ''}
                invalid={
                  validation.touched.namaibu && validation.errors.namaibu
                    ? true
                    : false
                }
              />
              {validation.touched.namaibu && validation.errors.namaibu && (
                <FormFeedback type="invalid">
                  <div>{validation.errors.namaibu}</div>
                </FormFeedback>
              )}
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="namaayah"
                className="form-label"
              >
                Nama Ayah
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="namaayah"
                name="namaayah"
                type="string"
                placeholder="Masukkan nama ayah"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.namaayah || ''}
                invalid={
                  validation.touched.namaayah && validation.errors.namaayah
                    ? true
                    : false
                }
              />
              {validation.touched.namaayah && validation.errors.namaayah && (
                <FormFeedback type="invalid">
                  <div>{validation.errors.namaayah}</div>
                </FormFeedback>
              )}
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="namasuamiistri"
                className="form-label"
              >
                Nama Suami/Istri
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="namasuamimistri"
                name="namasuamiistri"
                type="string"
                placeholder="Masukkan nama Suami/Istri"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.namasuamiistri || ''}
                invalid={
                  !!validation.touched.namasuamiistri &&
                  !!validation.errors.namasuamiistri
                }
              />
              {validation.touched.namasuamiistri &&
                validation.errors.namasuamiistri && (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.namasuamiistri}</div>
                  </FormFeedback>
                )}
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="namakeluargalain"
                className="form-label"
              >
                Nama Keluarga Lainnya
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="namakeluargalain"
                name="namakeluargalain"
                type="string"
                placeholder="Masukkan nama Keluarga Lain"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.namakeluargalain || ''}
                invalid={
                  !!validation.touched.namakeluargalain &&
                  !!validation.errors.namakeluargalain
                }
              />
              {validation.touched.namakeluargalain &&
                validation.errors.namakeluargalain && (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.namakeluargalain}</div>
                  </FormFeedback>
                )}
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="nohp"
                className="form-label"
              >
                No HP
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="nohp"
                name="nohp"
                type="string"
                placeholder="Masukkan Nomor HP"
                onChange={(e) => {
                  rgxNbrEmpty.test(e.target.value) &&
                    validation.setFieldValue('nohp', e.target.value)
                }}
                onBlur={validation.handleBlur}
                value={validation.values.nohp || ''}
                invalid={!!validation.touched.nohp && !!validation.errors.nohp}
              />
              {validation.touched.nohp && validation.errors.nohp && (
                <FormFeedback type="invalid">
                  <div>{validation.errors.nohp}</div>
                </FormFeedback>
              )}
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="notelepon"
                className="form-label"
              >
                No Telepon
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="notelepon"
                name="notelepon"
                type="string"
                placeholder="Masukkan Nomor Telepon"
                onChange={(e) => {
                  rgxNbrEmpty.test(e.target.value) &&
                    validation.setFieldValue('notelepon', e.target.value)
                }}
                onBlur={validation.handleBlur}
                value={validation.values.notelepon || ''}
                invalid={
                  !!validation.touched.notelepon &&
                  !!validation.errors.notelepon
                }
              />
              {validation.touched.nohp && validation.errors.nohp && (
                <FormFeedback type="invalid">
                  <div>{validation.errors.nohp}</div>
                </FormFeedback>
              )}
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )

  const AlamatKTP = (
    <Card style={{ backgroundColor: '#f1f2f6' }}>
      <CardHeader className="card-header-snb ">
        <h4 className="card-title mb-0">Alamat KTP</h4>
      </CardHeader>
      <CardBody>
        <Row className="gy-4">
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="alamatktp"
                className="form-label"
              >
                Alamat KTP
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="alamatktp"
                name="alamatktp"
                type="textarea"
                placeholder="Masukkan Alamat pasien"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.alamatktp || ''}
                invalid={
                  validation.touched.alamatktp && validation.errors.alamatktp
                    ? true
                    : false
                }
              />
              {validation.touched.alamatktp && validation.errors.alamatktp ? (
                <FormFeedback type="invalid">
                  <div>{validation.errors.alamatktp}</div>
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="rtrw"
                className="form-label"
              >
                RT / RW
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div className="row">
              <div className="col-sm">
                <Input
                  id="rt"
                  name="rt"
                  type="input"
                  placeholder="RT"
                  onChange={(e) => {
                    rgxAllNumber.test(e.target.value) &&
                      validation.setFieldValue('rt', e.target.value)
                  }}
                  onBlur={validation.handleBlur}
                  value={validation.values.rt || ''}
                  invalid={
                    validation.touched.rt && validation.errors.rt ? true : false
                  }
                />
                {validation.touched.rt && validation.errors.rt ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.rt}</div>
                  </FormFeedback>
                ) : null}
              </div>
              <div className="col-sm">
                <Input
                  id="rw"
                  name="rw"
                  type="input"
                  placeholder="RW"
                  onChange={(e) => {
                    rgxAllNumber.test(e.target.value) &&
                      validation.setFieldValue('rw', e.target.value)
                  }}
                  onBlur={validation.handleBlur}
                  value={validation.values.rw || ''}
                  invalid={
                    validation.touched.rw && validation.errors.rw ? true : false
                  }
                />
                {validation.touched.rw && validation.errors.rw ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.rw}</div>
                  </FormFeedback>
                ) : null}
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="desa"
                className="form-label"
              >
                Kelurahan / Desa
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <CustomSelect
                id="desa"
                name="desa"
                options={dataDesa}
                value={validation.values.desa || ''}
                valueInit={
                  pasienFormQueries?.desa
                    ? {
                        value: pasienFormQueries.desa,
                        label: [
                          pasienFormQueries.pos,
                          pasienFormQueries.labelDesa,
                          pasienFormQueries.kecamatan,
                          pasienFormQueries.kota,
                          pasienFormQueries.provinsi,
                        ].join(', '),
                        namakabupaten: pasienFormQueries.kota,
                        namakecamatan: pasienFormQueries.kecamatan,
                        namaprovinsi: pasienFormQueries.provinsi,
                        kodepos: pasienFormQueries.pos,
                      }
                    : null
                }
                className={`input ${
                  validation.errors.desa ? 'is-invalid' : ''
                }`}
                // onChange={value => validation.setFieldValue('desa', value?.value)}
                onChange={handleChangeDesa}
                onInputChange={handleDesa}
                ref={refDesa}
              />
              {validation.touched.desa && validation.errors.desa ? (
                <FormFeedback type="invalid">
                  <div>{validation.errors.desa}</div>
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="kecamatan"
                className="form-label"
              >
                Kecamatan
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="kecamatan"
                name="kecamatan"
                type="input"
                placeholder="Kecamatan"
                value={validation.values.kecamatan || ''}
                disabled
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="kota"
                className="form-label"
              >
                Kota / Kabupaten
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="kota"
                name="kota"
                type="input"
                placeholder="kota"
                value={validation.values.kota || ''}
                disabled
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="pos"
                className="form-label"
              >
                Kode POS
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="pos"
                name="pos"
                type="input"
                placeholder="pos"
                value={validation.values.pos || ''}
                onChange={(e) => {
                  rgxAllNumber.test(e.target.value) &&
                    validation.setFieldValue('pos', e.target.value)
                }}
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="provinsi"
                className="form-label"
              >
                Provinsi
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="provinsi"
                name="provinsi"
                type="input"
                placeholder="provinsi"
                value={validation.values.provinsi || ''}
                disabled
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="negara"
                className="form-label"
              >
                Negara
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <CustomSelect
                id="negara"
                name="negara"
                options={dataNegara}
                ref={refNegara}
                value={validation.values.negara || null}
                className={`input ${
                  validation.errors.negara ? 'is-invalid' : ''
                }`}
                onChange={(value) => {
                  validation.setFieldValue('negara', value?.value || '')
                }}
              />
              {validation.touched.negara && validation.errors.negara ? (
                <FormFeedback type="invalid">
                  <div>{validation.errors.negara}</div>
                </FormFeedback>
              ) : null}
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )

  const AlamatDomisili = (
    <Card style={{ backgroundColor: '#f1f2f6' }}>
      <CardHeader className="card-header-snb ">
        <h4 className="card-title mb-0">Alamat Domisili</h4>
      </CardHeader>
      <CardBody>
        <Row className="gy-4">
          {/* <Col md={8}> */}
          <div className="form-check ms-2">
            <Input
              className="form-check-input"
              type="checkbox"
              checked={isSesuaiKtp}
              id="formCheck1"
              onChange={(e) => setisSesuaiKtp(e.target.checked)}
            />
            <Label
              className="form-check-label"
              htmlFor="formCheck1"
              style={{ color: 'black' }}
            >
              Sesuai KTP
            </Label>
          </div>
          {/* </Col> */}

          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="alamatdomisili"
                className="form-label"
              >
                Alamat Domisili
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="alamatdomisili"
                name="alamatdomisili"
                type="textarea"
                placeholder="Masukkan Alamat pasien"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.alamatdomisili || ''}
                invalid={
                  validation.touched.alamatdomisili &&
                  validation.errors.alamatdomisili
                    ? true
                    : false
                }
                disabled={isSesuaiKtp}
              />
              {validation.touched.alamatdomisili &&
              validation.errors.alamatdomisili ? (
                <FormFeedback type="invalid">
                  <div>{validation.errors.alamatdomisili}</div>
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="rtrwdomisili"
                className="form-label"
              >
                RT / RW
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div className="row">
              <div className="col-sm">
                <Input
                  id="rtdomisili"
                  name="rtdomisili"
                  type="input"
                  placeholder="RT"
                  onChange={(e) => {
                    rgxAllNumber.test(e.target.value) &&
                      validation.setFieldValue('rtdomisili', e.target.value)
                  }}
                  onBlur={validation.handleBlur}
                  value={validation.values.rtdomisili || ''}
                  invalid={
                    validation.touched.rtdomisili &&
                    validation.errors.rtdomisili
                      ? true
                      : false
                  }
                  disabled={isSesuaiKtp}
                />
                {validation.touched.rtdomisili &&
                validation.errors.rtdomisili ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.rtdomisili}</div>
                  </FormFeedback>
                ) : null}
              </div>
              <div className="col-sm">
                <Input
                  id="rwdomisili"
                  name="rwdomisili"
                  type="input"
                  placeholder="RW"
                  onChange={(e) => {
                    rgxAllNumber.test(e.target.value) &&
                      validation.setFieldValue('rwdomisili', e.target.value)
                  }}
                  onBlur={validation.handleBlur}
                  value={validation.values.rwdomisili || ''}
                  invalid={
                    validation.touched.rwdomisili &&
                    validation.errors.rwdomisili
                      ? true
                      : false
                  }
                  disabled={isSesuaiKtp}
                />
                {validation.touched.rwdomisili &&
                validation.errors.rwdomisili ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.rwdomisili}</div>
                  </FormFeedback>
                ) : null}
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="desa"
                className="form-label"
              >
                Kelurahan / Desa
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <CustomSelect
                id="desaDomisili"
                name="desaDomisili"
                options={dataDesa}
                value={validation.values.desaDomisili}
                valueInit={
                  pasienFormQueries?.desaDomisili
                    ? {
                        value: pasienFormQueries.desaDomisili,
                        label: [
                          pasienFormQueries.posDomisili,
                          pasienFormQueries.labelDesaDomisili,
                          pasienFormQueries.kecamatanDomisili,
                          pasienFormQueries.kotaDomisili,
                          pasienFormQueries.provinsiDomisili,
                        ].join(', '),
                        namakabupaten: pasienFormQueries.kotaDomisili,
                        namakecamatan: pasienFormQueries.kecamatanDomisili,
                        namaprovinsi: pasienFormQueries.provinsiDomisili,
                        kodepos: pasienFormQueries.posDomisili,
                      }
                    : null
                }
                className={`input ${
                  validation.errors.desaDomisili ? 'is-invalid' : ''
                }`}
                // onChange={value => validation.setFieldValue('desa', value?.value)}
                onChange={handleChangeDesaDomisili}
                onInputChange={handleDesa}
                ref={refDesaDomisili}
                isDisabled={isSesuaiKtp}
              />
              {validation.touched.desaDomisili &&
              validation.errors.desaDomisili ? (
                <FormFeedback type="invalid">
                  <div>{validation.errors.desaDomisili}</div>
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="kecamatandomisili"
                className="form-label"
              >
                Kecamatan
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="kecamatanDomisili"
                name="kecamatanDomisili"
                type="input"
                placeholder="kecamatanDomisili"
                value={validation.values.kecamatanDomisili || ''}
                disabled
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="kotadomisili"
                className="form-label"
              >
                Kota / Kabupaten
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="kotaDomisili"
                name="kotaDomisili"
                type="input"
                placeholder="kotaDomisili"
                value={validation.values.kotaDomisili || ''}
                disabled
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="posdomisili"
                className="form-label"
              >
                Kode POS
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="posDomisili"
                name="posDomisili"
                type="input"
                placeholder="posDomisili"
                value={validation.values.posDomisili || ''}
                onChange={(e) => {
                  rgxAllNumber.test(e.target.value) &&
                    validation.setFieldValue('posDomisili', e.target.value)
                }}
                disabled={isSesuaiKtp}
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="provinsidomisili"
                className="form-label"
              >
                Provinsi
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="provinsiDomisili"
                name="provinsiDomisili"
                type="input"
                placeholder="provinsiDomisili"
                value={validation.values.provinsiDomisili || ''}
                disabled
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="negaradomisili"
                className="form-label"
              >
                Negara
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <CustomSelect
                id="negaraDomisili"
                name="negaraDomisili"
                options={dataNegara}
                ref={refNegaraDomisili}
                value={validation.values.negaraDomisili || ''}
                className={`input ${
                  validation.errors.negaraDomisili ? 'is-invalid' : ''
                }`}
                onChange={(value) =>
                  validation.setFieldValue('negaraDomisili', value?.value || '')
                }
                isDisabled={isSesuaiKtp}
              />
              {validation.touched.negaraDomisili &&
              validation.errors.negaraDomisili ? (
                <FormFeedback type="invalid">
                  <div>{validation.errors.negaraDomisili}</div>
                </FormFeedback>
              ) : null}
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb
          title="Registrasi Pasien Baru"
          pageTitle="Registrasi Pasien Baru"
        />
        <Card>
          <Row>
            <Col xxl={12}>
              <Card>
                <CardBody>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault()
                      validation.handleSubmit()
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        return false
                      }
                    }}
                    className="gy-4"
                    action="#"
                  >
                    <Row>
                      <Col lg={6}>
                        <Row>
                          <Col lg={12}>{DataDiri}</Col>
                        </Row>
                        <Row>
                          <Col lg={12}>{InfoTambahan}</Col>
                        </Row>
                      </Col>
                      <Col lg={6}>
                        <Row>
                          <Col lg={12}>{AlamatKTP}</Col>
                        </Row>
                        <Row>
                          <Col lg={12}>{AlamatDomisili}</Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <div className="text-center">
                          <BtnSpinner
                            className="me-3"
                            type="submit"
                            color="success"
                            loading={loadingSave}
                          >
                            {!!pasienFormQueries?.needVerif
                              ? 'Verifikasi'
                              : isEdit
                              ? 'Edit'
                              : 'Simpan'}
                          </BtnSpinner>
                          <Button
                            type="button"
                            color="danger"
                            disabled={loadingSave}
                            onClick={() => handleResetAll()}
                          >
                            Batal
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  )
}

const useValidationServer = () => {
  const dispatch = useDispatch()

  const lastNoRM = useSelector(
    (state) => state.registrasiSlice.getNoRMLast.data?.max || '99999999'
  )

  useEffect(() => {
    dispatch(getNoRMLast({}))
  }, [dispatch])

  return {
    lastNoRM,
  }
}

const capitalizeFirstLetter = (sentence) => {
  let newSentence = sentence.toLowerCase()
  const words = newSentence.split(' ')
  const capitalizedWords = words.map(
    (word) => word[0].toUpperCase() + word.substring(1)
  )
  newSentence = capitalizedWords.join(' ')
  return newSentence
}

export default withRouter(PasienBaru)
