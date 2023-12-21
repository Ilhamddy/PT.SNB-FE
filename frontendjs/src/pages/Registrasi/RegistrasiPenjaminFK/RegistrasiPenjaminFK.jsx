import { useCallback, useEffect, useState } from 'react'
import userDummy from '../../../assets/images/users/user-dummy-img.jpg'
import classnames from 'classnames'
import withRouter from '../../../Components/Common/withRouter'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer } from 'react-toastify'
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
  Input,
  Form,
  TabContent,
  TabPane,
  Table,
  Label,
  FormFeedback,
  Button,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import Flatpickr from 'react-flatpickr'
import CustomSelect from '../../Select/Select'
import {
  emrDiagnosaxGet,
  emrListDiagnosaxGet,
  registrasiGet,
  registrasiNoBPJSGet,
  registrasiRuanganNorecGet,
  registrasiSavePenjaminFK,
} from '../../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import {
  comboAsuransiGet,
  comboRegistrasiGet,
  kabupatenGetBpjs,
  kecamatanGetBpjs,
  provinsiGetBpjs,
} from '../../../store/master/action'
import './RegistrasiPenjaminFK.scss'
import { onChangeStrNbr, strToNumber } from '../../../utils/format'
import {
  rgxAllNumber,
  rgxAllPeriods,
  rgxNbrEmpty,
} from '../../../utils/regexcommon'
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr'

const RegistrasiPenjaminFK = () => {
  const { id, norec } = useParams()

  const [pillsTab, setpillsTab] = useState('1')
  const [isOpenRujukan, setIsOpenModalRujukan] = useState(false)
  const [isOpenRJ, setIsOpenRJ] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [dateNow] = useState(() => new Date().toISOString())

  const {
    dataDiagnosa,
    statusKecelakaanOpt,
    comboboxAsuransi,
    data,
    dataUser,
    dataBpjs,
    dataRuangDaftar,
    dataProvinsi,
    dataKabupaten,
    dataKecamatan,
    successSave,
    penjaminGet,
  } = useSelector((state) => ({
    dataDiagnosa: state.Emr.emrDiagnosaxGet.data,
    data: state.Master.comboRegistrasiGet.data,
    statusKecelakaanOpt: state.Master.comboAsuransiGet.data?.statuskecelakaan,
    comboboxAsuransi: state.Master.comboAsuransiGet.data,
    dataUser: state.Registrasi.registrasiGet.data,
    dataBpjs: state.Registrasi.registrasiNoBpjsGet.data,
    dataRuangDaftar: state.Registrasi.registrasiRuangNorecGet.data,
    dataProvinsi: state.Master.provinsiBpjs.data?.provinsi?.list || [],
    dataKabupaten: state.Master.kabupatenBpjs.data?.kabupaten?.list || [],
    dataKecamatan: state.Master.kecamatanBpjs.data?.kecamatan?.list || [],
    successSave: state.Registrasi.registrasiSavePenjaminFK?.success,
    penjaminGet: [
      state.Registrasi.registrasiRuangNorecGet.data?.penjamin1 || null,
      state.Registrasi.registrasiRuangNorecGet.data?.penjamin2 || null,
      state.Registrasi.registrasiRuangNorecGet.data?.penjamin3 || null,
    ].filter((item) => item !== null),
  }))

  const [indexTab, setIndexTab] = useState(0)
  const penjaminObj = penjaminGet[indexTab] || null

  const optionProv = dataProvinsi.map((item) => ({
    value: Number(item.kode),
    label: item.nama,
  }))
  const optionKab = dataKabupaten.map((item) => ({
    value: Number(item.kode),
    label: item.nama,
  }))
  const optionKec = dataKecamatan.map((item) => ({
    value: Number(item.kode),
    label: item.nama,
  }))

  const penjaminLakaLantas = [
    //dummy data
    { value: '1', label: 'Jasa Raharja' },
    { value: '2', label: 'TASPEN' },
    { value: '3', label: 'BPJS Ketenagakerjaan' },
    { value: '4', label: 'ASABRI PT' },
  ]

  const jenisPeserta = [
    //dummy data
    { value: '1', label: 'Poli Eksklusif' },
    { value: '2', label: 'COB' },
    { value: '3', label: 'Katarak' },
  ]

  const [checkedLakaLantas, setCheckedLakaLantas] = useState(() =>
    penjaminLakaLantas.map((data) => {
      data.checked = false
      return data
    })
  )

  const [checkedJenisPes, setcheckedJenisPes] = useState(() =>
    jenisPeserta.map((data) => {
      data.checked = false
      return data
    })
  )

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: id,
      norecdp: norec,
      nokartu: '',
      jenisrujukan: '',
      tanggalsep: dateNow,
      norujukan: '',
      penjamin: 1,
      tujuankunjungan: '',
      dpjpmelayani: '',
      asalrujukan: '',
      tanggalrujukan: dateNow,
      nosuratkontrol: '',
      dpjppemberi: '',
      diagnosarujukan: '',
      jenispeserta: '',
      notelepon: '',
      catatan: '',
      kelasditanggung: '',
      statuskecelakaan: '',
      provinsilakalantas: '',
      kprovinsilakalantas: '',
      kotalakalantas: '',
      kkotalakalantas: '',
      kecamatanlakalantas: '',
      tanggallakalantas: dateNow,
      nosepsuplesi: '',
      keteranganlakalantas: '',
      tanggallakakerja: dateNow,
      nolaporanpolisi: '',
      keteranganlakakerja: '',
      provinsilakakerja: '',
      kprovinsilakakerja: '',
      kotalakakerja: '',
      kkotalakakerja: '',
      kecamatanlakakerja: '',
      kkecamatanlakakerja: '',
      nosep: '',
    },

    validationSchema: Yup.object({
      jenisrujukan: Yup.string().required('Jenis rujukan wajib di isi'),
      nokartu: Yup.string().required('No kartu wajib di isi'),
      tanggalsep: Yup.string().required('Tanggal SEP wajib di isi'),
      norujukan: Yup.string().required('No rujukan wajib di isi'),
      tujuankunjungan: Yup.string().required('Tujuan kunjungan wajib di isi'),
      dpjpmelayani: Yup.string().required('DPJP pelayani wajib di isi'),
      asalrujukan: Yup.string().required('Asal rujukan wajib di isi'),
      tanggalrujukan: Yup.string().required('Tanggal rujukan wajib di isi'),
      nosuratkontrol: Yup.string().required('No surat kontrol wajib di isi'),
      dpjppemberi: Yup.string().required('DPJP pemberi wajib di isi'),
      diagnosarujukan: Yup.string().required('Diagnosa rujukan wajib di isi'),
      jenispeserta: Yup.string().required('Jenis peserta wajib di isi'),
      notelepon: Yup.string()
        .matches(RegExp('^\\d+$'), 'Harus angka')
        .required('No telepon wajib di isi'),
      catatan: Yup.string().required('Catatan wajib di isi'),
      // kelasditanggung: Yup.string().required("Kelas ditanggung wajib di isi"),
      statuskecelakaan: Yup.string().required('Status kecelakaan wajib di isi'),
      provinsilakalantas: Yup.string().when(
        'statuskecelakaan',
        (statuskecelakaan, schema) => {
          if (statuskecelakaan[0] === '2' || statuskecelakaan[0] === '4') {
            return schema.required('provinsi harus Harus di isi')
          } else return schema
        }
      ),
      kprovinsilakalantas: Yup.string().when(
        'statuskecelakaan',
        (statuskecelakaan, schema) => {
          if (statuskecelakaan[0] === '2' || statuskecelakaan[0] === '4') {
            return schema.required('provinsi harus Harus di isi')
          } else return schema
        }
      ),
      kotalakalantas: Yup.string().when(
        'statuskecelakaan',
        (statuskecelakaan, schema) => {
          if (statuskecelakaan[0] === '2' || statuskecelakaan[0] === '4') {
            return schema.required('kota harus Harus di isi')
          } else return schema
        }
      ),
      kkotalakalantas: Yup.string().when(
        'statuskecelakaan',
        (statuskecelakaan, schema) => {
          if (statuskecelakaan[0] === '2' || statuskecelakaan[0] === '4') {
            return schema.required('kota harus Harus di isi')
          } else return schema
        }
      ),
      kecamatanlakalantas: Yup.string().when(
        'statuskecelakaan',
        (statuskecelakaan, schema) => {
          if (statuskecelakaan[0] === '2' || statuskecelakaan[0] === '4') {
            return schema.required('kecamatan harus Harus di isi')
          } else return schema
        }
      ),
      kkecamatanlakalantas: Yup.string().when(
        'statuskecelakaan',
        (statuskecelakaan, schema) => {
          if (statuskecelakaan[0] === '2' || statuskecelakaan[0] === '4') {
            return schema.required('kecamatan harus Harus di isi')
          } else return schema
        }
      ),
      tanggallakalantas: Yup.string().when(
        'statuskecelakaan',
        (statuskecelakaan, schema) => {
          if (statuskecelakaan[0] === '2' || statuskecelakaan[0] === '4') {
            return schema.required('tanggal harus Harus di isi')
          } else return schema
        }
      ),
      nosepsuplesi: Yup.string().when(
        'statuskecelakaan',
        (statuskecelakaan, schema) => {
          if (statuskecelakaan[0] === '2' || statuskecelakaan[0] === '4') {
            return schema.required('No epsuplesi harus Harus di isi')
          } else return schema
        }
      ),
      keteranganlakalantas: Yup.string().when(
        'statuskecelakaan',
        (statuskecelakaan, schema) => {
          if (statuskecelakaan[0] === '2' || statuskecelakaan[0] === '4') {
            return schema.required('Keterangan harus Harus di isi')
          } else return schema
        }
      ),
      tanggallakakerja: Yup.string().when(
        'statuskecelakaan',
        (statuskecelakaan, schema) => {
          if (statuskecelakaan[0] === '3' || statuskecelakaan[0] === '4') {
            return schema.required('Keterangan harus Harus di isi')
          } else return schema
        }
      ),
      nolaporanpolisi: Yup.string().when(
        'statuskecelakaan',
        (statuskecelakaan, schema) => {
          if (statuskecelakaan[0] === '3' || statuskecelakaan[0] === '4') {
            return schema.required('No laporan polisi harus Harus di isi')
          } else return schema
        }
      ),
      keteranganlakakerja: Yup.string().when(
        'statuskecelakaan',
        (statuskecelakaan, schema) => {
          if (statuskecelakaan[0] === '3' || statuskecelakaan[0] === '4') {
            return schema.required('Keterangan harus Harus di isi')
          } else return schema
        }
      ),
      provinsilakakerja: Yup.string().when(
        'statuskecelakaan',
        (statuskecelakaan, schema) => {
          if (statuskecelakaan[0] === '3' || statuskecelakaan[0] === '4') {
            return schema.required('Provinsi harus Harus di isi')
          } else return schema
        }
      ),
      kprovinsilakakerja: Yup.string().when(
        'statuskecelakaan',
        (statuskecelakaan, schema) => {
          if (statuskecelakaan[0] === '3' || statuskecelakaan[0] === '4') {
            return schema.required('Provinsi harus Harus di isi')
          } else return schema
        }
      ),
      kotalakakerja: Yup.string().when(
        'statuskecelakaan',
        (statuskecelakaan, schema) => {
          if (statuskecelakaan[0] === '3' || statuskecelakaan[0] === '4') {
            return schema.required('Kota harus Harus di isi')
          } else return schema
        }
      ),
      kkotalakakerja: Yup.string().when(
        'statuskecelakaan',
        (statuskecelakaan, schema) => {
          if (statuskecelakaan[0] === '3' || statuskecelakaan[0] === '4') {
            return schema.required('Kota harus Harus di isi')
          } else return schema
        }
      ),
      kecamatanlakakerja: Yup.string().when(
        'statuskecelakaan',
        (statuskecelakaan, schema) => {
          if (statuskecelakaan[0] === '3' || statuskecelakaan[0] === '4') {
            return schema.required('Kecamatan harus Harus di isi')
          } else return schema
        }
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      if (values) {
        const valuesSent = { ...values }
        if (penjaminGet[indexTab + 1] === undefined) {
          dispatch(
            registrasiSavePenjaminFK(valuesSent, () => {
              resetForm()
              navigate(`/registrasi/pasien-ruangan/${id}/${norec}`)
            })
          )
        } else {
          dispatch(
            registrasiSavePenjaminFK(valuesSent, () => {
              setIndexTab(indexTab + 1)
            })
          )
        }
      }
    },
  })

  const vNonBPJS = useFormik({
    enableReinitialize: true,
    initialValues: {
      norecdp: norec,
      nokartunonbpjs: '',
      plafon: '',
      dpjpmelayani: 1,
      penjamin: 2,
    },
    validationSchema: Yup.object({
      nokartunonbpjs: Yup.string().required('No Registrasi harus di isi'),
      plafon: Yup.string().required('Plafon harus di isi'),
    }),
    onSubmit: (values, { resetForm }) => {
      if (values) {
        console.log(values)
        const valuesSent = { ...values }
        valuesSent.plafon = strToNumber(valuesSent.plafon)
        if (penjaminGet[indexTab + 1] === undefined) {
          dispatch(
            registrasiSavePenjaminFK(valuesSent, () => {
              navigate(`/registrasi/pasien-ruangan/${id}/${norec}`)
              resetForm()
            })
          )
        } else {
          dispatch(
            registrasiSavePenjaminFK(valuesSent, () => {
              setIndexTab(indexTab + 1)
              resetForm()
            })
          )
        }
      }
    },
  })

  const handleDateChange = (field, newBeginValue) => {
    var dateString = new Date().toISOString()
    validation.setFieldValue(field, dateString)
  }

  const pillsToggle = (tab) => {
    if (pillsTab !== tab) {
      setpillsTab(tab)
    }
  }

  const handleDiagnosa = (characterEntered) => {
    if (characterEntered.length > 3) {
      dispatch(emrDiagnosaxGet(characterEntered, 'diagnosa10'))
    }
  }

  useEffect(() => {
    dispatch(provinsiGetBpjs())
  }, [dispatch])

  useEffect(() => {
    dispatch(comboAsuransiGet())
    dispatch(comboRegistrasiGet())
    if (id) {
      dispatch(registrasiGet(id))
    }
    norec && dispatch(registrasiRuanganNorecGet(norec))
  }, [dispatch, id, norec])

  useEffect(() => {
    if (dataUser?.nobpjs) {
      dispatch(registrasiNoBPJSGet(dataUser.nobpjs))
    }
  }, [dataUser, dispatch])

  const handleAsalRujukan = (val) => {
    validation.setFieldValue('asalrujukan', val)
  }
  const handleTujuanDPJPMelayani = (val) => {
    validation.setFieldValue('dpjpmelayani', val)
    vNonBPJS.setFieldValue('dpjpmelayani', val)
  }
  useEffect(() => {
    const setFF = validation.setFieldValue
    const setFFNonBPJS = vNonBPJS.setFieldValue
    console.log('dataRuangDaftar', dataRuangDaftar)
    dataRuangDaftar?.objectinstalasifk &&
      setFF('tujuankunjungan', dataRuangDaftar.objectinstalasifk)
    dataRuangDaftar?.objectasalrujukanfk &&
      setFF('asalrujukan', dataRuangDaftar.objectasalrujukanfk)
    dataRuangDaftar?.objectinstalasifk &&
      setFF('jenisrujukan', dataRuangDaftar.objectinstalasifk)
    dataRuangDaftar?.objectdokterpemeriksafk &&
      setFF('dpjpmelayani', dataRuangDaftar.objectdokterpemeriksafk)
    dataRuangDaftar?.objectdokterpemeriksafk &&
      setFFNonBPJS('dpjpmelayani', dataRuangDaftar.objectdokterpemeriksafk)
  }, [dataRuangDaftar, validation.setFieldValue, vNonBPJS.setFieldValue])

  useEffect(() => {
    const setFF = validation.setFieldValue
    if (dataBpjs?.kepesertaan?.peserta?.jenisPeserta?.keterangan) {
      setFF(
        'jenispeserta',
        dataBpjs?.kepesertaan?.peserta?.jenisPeserta?.keterangan
      )
    }
    if (dataBpjs?.kepesertaan?.peserta?.noKartu) {
      setFF('nokartu', dataBpjs?.kepesertaan?.peserta?.noKartu)
    }
  }, [dataBpjs, validation.setFieldValue])

  //klinik 3, puskesmas 1, rumahsakit 2
  useEffect(() => {
    const isSprKosong = (dataBpjs?.spr?.list || [])?.length === 0
    if (dataRuangDaftar?.objectinstalasifk === 2 && !isSprKosong) {
      // rawat inap
      setIsOpenModalRujukan(true)
      return
    }
    if (dataUser?.objectunitfk !== 1) return // rawat jalan
    const dataBpjsSprPertama = dataBpjs?.spr?.list?.[0] || {}
    const dataBpjsHisPertama =
      dataBpjs?.histori?.histori?.find(
        (bpjsHis) => bpjsHis.noSep === dataBpjsSprPertama.noSepAsalKontrol
      ) || {}
    const sepSebelum = Number(dataBpjsHisPertama.jnsPelayanan || 1)
    const isSepSebelumRI = sepSebelum === 2
    const tujuanSebelum = Number(
      dataBpjs?.rujukanklinik?.rujukan?.pelayanan?.kode ||
        dataBpjs?.rujukanrs?.rujukan?.pelayanan?.kode ||
        1
    )
    const isTujuanSebelumRI = tujuanSebelum === 2
    if (isTujuanSebelumRI && !isSepSebelumRI) {
      setIsOpenRJ(true)
      return
    }
  }, [dataBpjs, dataRuangDaftar, dataUser])

  useEffect(() => {
    const setFFNBPJS = vNonBPJS.setFieldValue
    setFFNBPJS('penjamin', penjaminObj?.id || 1)
  }, [vNonBPJS.setFieldValue, penjaminObj])

  const kelasOpt = comboboxAsuransi?.kelas?.filter(
    (kel) => kel.kelas_bpjs === dataBpjs?.kepesertaan?.peserta?.hakKelas?.kode
  )

  //component
  const PilihRujukan = (
    <Row>
      <Col lg={6}>
        <Card>
          <CardBody>
            <Row className="gy-4">
              <Col xxl={6} md={6}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="jenisrujukan"
                    className="form-label"
                  >
                    Jenis Rujukan
                  </Label>
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <div>
                  <CustomSelect
                    id="jenisrujukan"
                    name="jenisrujukan"
                    options={data.instalasi}
                    onChange={(e) => {
                      validation.setFieldValue('tujuankunjungan', e.value)
                    }}
                    value={validation.values.tujuankunjungan || ''}
                  />
                  {validation.touched.jenisrujukan &&
                  validation.errors.jenisrujukan ? (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.jenisrujukan}</div>
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="nokartu"
                    className="form-label"
                  >
                    No Kartu
                  </Label>
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <div>
                  <Input
                    id="nokartu"
                    name="nokartu"
                    placeholder="Masukkan No Kartu"
                    className="form-control"
                    onChange={(e) => {
                      rgxAllNumber.test(e.target.value) &&
                        validation.setFieldValue('nokartu', e.target.value)
                    }}
                    // onBlur={validation.handleBlur}
                    value={validation.values.nokartu || ''}
                    invalid={
                      validation.touched.nokartu && validation.errors.nokartu
                        ? true
                        : false
                    }
                  />
                  {validation.touched.nokartu && validation.errors.nokartu ? (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.nokartu}</div>
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col lg={6}>
        <Card>
          <CardBody>
            <Row className="gy-4">
              <Col xxl={6} md={6}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="tanggalsep"
                    className="form-label"
                  >
                    Tanggal SEP
                  </Label>
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <div>
                  <KontainerFlatpickr
                    className="form-control"
                    id="tanggalsep"
                    options={{
                      dateFormat: 'Y-m-d',
                      defaultDate: 'today',
                      maxDate: 'today',
                      minDate: 'today',
                    }}
                    onChange={([newDate]) => {
                      handleDateChange('tanggalsep', newDate)
                    }}
                  />
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="norujukan"
                    className="form-label"
                  >
                    No Rujukan
                  </Label>
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <div>
                  <Input
                    id="norujukan"
                    name="norujukan"
                    type="string"
                    placeholder="Masukkan No Rujukan"
                    className="form-control"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.norujukan || ''}
                    invalid={
                      validation.touched.norujukan &&
                      validation.errors.norujukan
                        ? true
                        : false
                    }
                  />
                  {validation.touched.norujukan &&
                  validation.errors.norujukan ? (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.norujukan}</div>
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )

  const DetailBPJS = (
    <Row>
      <Col lg={6}>
        <Card>
          <CardBody>
            <Row className="gy-4">
              <Col xxl={6} md={6}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="tujuankunjungan"
                    className="form-label"
                  >
                    Tujuan Kunjungan
                  </Label>
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <div>
                  <CustomSelect
                    id="tujuankunjungan"
                    name="tujuankunjungan"
                    options={data.instalasi}
                    onChange={(e) => {
                      validation.setFieldValue('tujuankunjungan', e.value)
                    }}
                    value={validation.values.tujuankunjungan || ''}
                  />
                  {validation.touched.tujuankunjungan &&
                  validation.errors.tujuankunjungan ? (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.tujuankunjungan}</div>
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="dpjppmelayani"
                    className="form-label"
                  >
                    DPJP yang melayani
                  </Label>
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <div>
                  <CustomSelect
                    id="dpjppmelayani"
                    name="dpjppmelayani"
                    options={data.pegawai}
                    onChange={(e) => {
                      handleTujuanDPJPMelayani(e.value)
                    }}
                    value={validation.values.dpjpmelayani || ''}
                  />
                  {validation.touched.dpjpmelayani &&
                  validation.errors.dpjpmelayani ? (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.dpjpmelayani}</div>
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="asalrujukan"
                    className="form-label"
                  >
                    Asal Rujukan
                  </Label>
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <div>
                  <CustomSelect
                    id="asalrujukan"
                    name="asalrujukan"
                    placeholder="Asal Rujukan"
                    options={data.asalrujukan}
                    onChange={(e) => {
                      handleAsalRujukan(e.value)
                    }}
                    value={validation.values.asalrujukan || ''}
                    invalid={
                      validation.touched.asalrujukan &&
                      validation.errors.asalrujukan
                        ? true
                        : false
                    }
                  />
                  {validation.touched.asalrujukan &&
                  validation.errors.asalrujukan ? (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.asalrujukan}</div>
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="tanggalrujukan"
                    className="form-label"
                  >
                    Tanggal Rujukan
                  </Label>
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <div>
                  <KontainerFlatpickr
                    id="tanggalrujukan"
                    options={{
                      dateFormat: 'Y-m-d',
                      defaultDate: 'today',
                    }}
                    onChange={([newDate]) => {
                      handleDateChange('tanggalrujukan', newDate)
                    }}
                  />
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="nosuratkontrol"
                    className="form-label"
                  >
                    No Surat Kontrol
                  </Label>
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <div>
                  <Input
                    id="nosuratkontrol"
                    name="nosuratkontrol"
                    type="string"
                    placeholder="No Surat Kontrol"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.nosuratkontrol || ''}
                    invalid={
                      validation.touched.nosuratkontrol &&
                      validation.errors.nosuratkontrol
                        ? true
                        : false
                    }
                  />
                  {validation.touched.nosuratkontrol &&
                  validation.errors.nosuratkontrol ? (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.nosuratkontrol}</div>
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="dpjppemberi"
                    className="form-label"
                  >
                    DPJP Pemberi Surat
                  </Label>
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <div>
                  <Input
                    id="dpjppemberi"
                    name="dpjppemberi"
                    type="text"
                    placeholder="DPJP Pemberi"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.dpjppemberi || ''}
                    invalid={
                      validation.touched.dpjppemberi &&
                      validation.errors.dpjppemberi
                        ? true
                        : false
                    }
                  />
                  {validation.touched.dpjppemberi &&
                  validation.errors.dpjppemberi ? (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.dpjppemberi}</div>
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="nosep"
                    className="form-label"
                  >
                    No. SEP
                  </Label>
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <div>
                  <Input
                    id="nosep"
                    name="nosep"
                    type="text"
                    placeholder="No. SEP"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.nosep || ''}
                    // invalid={
                    //     validation.touched.nosep && validation.errors.nosep ? true : false
                    // }
                  />
                  {/* {validation.touched.nosep && validation.errors.nosep ? (
                                        <FormFeedback type="invalid"><div>{validation.errors.nosep}</div></FormFeedback>
                                    ) : null} */}
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col lg={6}>
        <Card>
          <CardBody>
            <Row className="gy-4">
              <Col xxl={6} md={6}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="kelasditanggung"
                    className="form-label"
                  >
                    Kelas Ditanggung
                  </Label>
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <CustomSelect
                  id="kelasditanggung"
                  name="kelasditanggung"
                  onInputChange={handleDiagnosa}
                  options={kelasOpt}
                  className={`input ${
                    validation.errors.kelasditanggung ? 'is-invalid' : ''
                  }`}
                  onChange={(e) => {
                    validation.setFieldValue('kelasditanggung', e.value)
                  }}
                />
                {validation.touched.kelasditanggung &&
                validation.errors.kelasditanggung ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.kelasditanggung}</div>
                  </FormFeedback>
                ) : null}
              </Col>
              <Col xxl={6} md={6}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="diagnosarujukan"
                    className="form-label"
                  >
                    Diagnosa Rujukan
                  </Label>
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <CustomSelect
                  id="diagnosarujukan"
                  name="diagnosarujukan"
                  onInputChange={handleDiagnosa}
                  options={dataDiagnosa}
                  className={`input ${
                    validation.errors.diagnosarujukan ? 'is-invalid' : ''
                  }`}
                  onChange={(e) =>
                    validation.setFieldValue('diagnosarujukan', e.value)
                  }
                />
                {validation.touched.diagnosarujukan &&
                validation.errors.diagnosarujukan ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.diagnosarujukan}</div>
                  </FormFeedback>
                ) : null}
              </Col>
              <CustomCheckbox
                data={checkedJenisPes}
                setData={setcheckedJenisPes}
                checkboxName={'jenispeserta'}
              />
              <Col xxl={6} md={6}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="jenispeserta"
                    className="form-label"
                  >
                    Jenis Peserta
                  </Label>
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <Input
                  id="jenispeserta"
                  name="jenispeserta"
                  type="string"
                  placeholder="Jenis Peserta"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.jenispeserta || ''}
                  invalid={
                    validation.touched.jenispeserta &&
                    validation.errors.jenispeserta
                      ? true
                      : false
                  }
                />
                {validation.touched.jenispeserta &&
                validation.errors.jenispeserta ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.jenispeserta}</div>
                  </FormFeedback>
                ) : null}
              </Col>
              <Col xxl={6} md={6}>
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
              <Col xxl={6} md={6}>
                <Input
                  id="notelepon"
                  name="notelepon"
                  type="string"
                  placeholder="No Telepon"
                  onChange={(e) => {
                    rgxNbrEmpty.test(e.target.value) &&
                      validation.setFieldValue('notelepon', e.target.value)
                  }}
                  onBlur={validation.handleBlur}
                  value={validation.values.notelepon || ''}
                  invalid={
                    validation.touched.notelepon && validation.errors.notelepon
                      ? true
                      : false
                  }
                />
                {validation.touched.notelepon && validation.errors.notelepon ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.notelepon}</div>
                  </FormFeedback>
                ) : null}
              </Col>
              <Col xxl={6} md={6}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="catatan"
                    className="form-label"
                  >
                    Catatan
                  </Label>
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <Input
                  id="catatan"
                  name="catatan"
                  type="string"
                  placeholder="Catatan"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.catatan || ''}
                  invalid={
                    validation.touched.catatan && validation.errors.catatan
                      ? true
                      : false
                  }
                />
                {validation.touched.catatan && validation.errors.catatan ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.catatan}</div>
                  </FormFeedback>
                ) : null}
              </Col>
              <Col xxl={6} md={6}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="statuskecelakaan"
                    className="form-label"
                  >
                    Status Kecelakaan
                  </Label>
                </div>
              </Col>
              <Col xxl={6} md={6}>
                <CustomSelect
                  id="statuskecelakaan"
                  name="statuskecelakaan"
                  options={statusKecelakaanOpt}
                  className={`input ${
                    validation.errors.statuskecelakaan ? 'is-invalid' : ''
                  }`}
                  onChange={(e) =>
                    validation.setFieldValue('statuskecelakaan', e.value)
                  }
                />
                {validation.touched.statuskecelakaan &&
                validation.errors.statuskecelakaan ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.statuskecelakaan}</div>
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )

  const BodyLakaLantas = (
    <>
      <div className="ms-3">Laka Lantas</div>
      <Row key={0}>
        <Col lg={6}>
          <Card>
            <CardBody>
              <Row className="gy-4">
                <Col xxl={6} md={6}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="provinsilakalantas"
                      className="form-label"
                    >
                      Provinsi
                    </Label>
                  </div>
                </Col>
                <Col xxl={6} md={6}>
                  <CustomSelect
                    id="provinsilakalantas"
                    name="provinsilakalantas"
                    options={optionProv}
                    className={`input ${
                      validation.errors.provinsilakalantas ? 'is-invalid' : ''
                    }`}
                    onChange={(e) => {
                      validation.setFieldValue('kprovinsilakalantas', e.value)
                      validation.setFieldValue('provinsilakalantas', e.label)
                    }}
                  />
                  {validation.touched.provinsilakalantas &&
                  validation.errors.provinsilakalantas ? (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.provinsilakalantas}</div>
                    </FormFeedback>
                  ) : null}
                </Col>
                <Col xxl={6} md={6}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="kotalakalantas"
                      className="form-label"
                    >
                      Kota
                    </Label>
                  </div>
                </Col>
                <Col xxl={6} md={6}>
                  <CustomSelect
                    id="kotalakalantas"
                    name="kotalakalantas"
                    options={optionKab}
                    onMenuOpen={() => {
                      if (
                        !validation.values.provinsilakalantas ||
                        !validation.values.kprovinsilakalantas
                      ) {
                        validation.setFieldError(
                          'kotalakalantas',
                          'Pilih provinsi terlebih dahulu'
                        )
                      } else {
                        const chosenProv = optionProv.find(
                          (val) =>
                            Number(val.value) ===
                            validation.values.kprovinsilakalantas
                        )
                        if (!chosenProv) return
                        dispatch(kabupatenGetBpjs(chosenProv.value))
                      }
                    }}
                    className={`input ${
                      validation.errors.kotalakalantas ? 'is-invalid' : ''
                    }`}
                    onChange={(e) => {
                      validation.setFieldValue('kkotalakalantas', e.value)
                      validation.setFieldValue('kotalakalantas', e.label)
                    }}
                  />
                  {validation.touched.kotalakalantas &&
                  validation.errors.kotalakalantas ? (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.kotalakalantas}</div>
                    </FormFeedback>
                  ) : null}
                </Col>
                <Col xxl={6} md={6}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="kecamatanlakalantas"
                      className="form-label"
                    >
                      Kecamatan
                    </Label>
                  </div>
                </Col>
                <Col xxl={6} md={6}>
                  <CustomSelect
                    id="kecamatanlakalantas"
                    name="kecamatanlakalantas"
                    onMenuOpen={() => {
                      if (!validation.values.kotalakalantas) {
                        validation.setFieldError(
                          'kecamatanlakalantas',
                          'Pilih provinsi terlebih dahulu'
                        )
                      } else {
                        const chosenKab = optionKab.find(
                          (val) =>
                            Number(val.value) ===
                            validation.values.kkotalakalantas
                        )
                        if (!chosenKab) return
                        dispatch(kecamatanGetBpjs(chosenKab.value))
                      }
                    }}
                    options={optionKec}
                    className={`input ${
                      validation.errors.kecamatanlakalantas ? 'is-invalid' : ''
                    }`}
                    onChange={(e) => {
                      validation.setFieldValue('kkecamatanlakalantas', e.value)
                      validation.setFieldValue('kecamatanlakalantas', e.label)
                    }}
                  />
                  {validation.touched.kecamatanlakalantas &&
                  validation.errors.kecamatanlakalantas ? (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.kecamatanlakalantas}</div>
                    </FormFeedback>
                  ) : null}
                </Col>
                <Card>
                  <CardHeader>
                    <CardTitle tag="h5">Penjamin Laka Lantas</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <CustomCheckbox
                      data={checkedLakaLantas}
                      setData={setCheckedLakaLantas}
                      checkboxName={'penjaminlakalantas'}
                    />
                  </CardBody>
                </Card>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
            <CardBody>
              <Row className="gy-4">
                <Col xxl={6} md={6}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="tanggallakalantas"
                      className="form-label"
                    >
                      Tanggal Laka Lantas
                    </Label>
                  </div>
                </Col>
                <Col xxl={6} md={6}>
                  <div>
                    <KontainerFlatpickr
                      className="form-control"
                      options={{
                        dateFormat: 'Y-m-d',
                        defaultDate: 'today',
                        maxDate: 'today',
                        minDate: 'today',
                      }}
                      onChange={([newDate]) => {}}
                    />
                  </div>
                </Col>
                <Col xxl={6} md={6}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="nosepsuplesi"
                      className="form-label"
                    >
                      No SEP Suplesi
                    </Label>
                  </div>
                </Col>

                <Col xxl={6} md={6}>
                  <Input
                    id="nosepsuplesi"
                    name="nosepsuplesi"
                    type="string"
                    placeholder="No SEP Suplesi"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.nosepsuplesi || ''}
                    invalid={
                      validation.touched.nosepsuplesi &&
                      validation.errors.nosepsuplesi
                        ? true
                        : false
                    }
                  />
                  {validation.touched.nosepsuplesi &&
                  validation.errors.nosepsuplesi ? (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.nosepsuplesi}</div>
                    </FormFeedback>
                  ) : null}
                </Col>
                <Col xxl={6} md={6}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="keteranganlakalantas"
                      className="form-label"
                    >
                      Keterangan
                    </Label>
                  </div>
                </Col>
                <Col xxl={6} md={6}>
                  <Input
                    id="keteranganlakalantas"
                    name="keteranganlakalantas"
                    type="string"
                    placeholder="Keterangan"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.keteranganlakalantas || ''}
                    invalid={
                      validation.touched.keteranganlakalantas &&
                      validation.errors.keteranganlakalantas
                        ? true
                        : false
                    }
                  />
                  {validation.touched.keteranganlakalantas &&
                  validation.errors.keteranganlakalantas ? (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.keteranganlakalantas}</div>
                    </FormFeedback>
                  ) : null}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )

  const BodyLakaKerja = (
    <>
      <div className="ms-3">Laka Kerja</div>
      <Row key={0}>
        <Col lg={6}>
          <Card>
            <CardBody>
              <Row className="gy-4">
                <Col xxl={6} md={6}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="tanggalkejadian"
                      className="form-label"
                    >
                      Tanggal kejadian
                    </Label>
                  </div>
                </Col>
                <Col xxl={6} md={6}>
                  <div>
                    <KontainerFlatpickr
                      className="form-control"
                      options={{
                        dateFormat: 'Y-m-d',
                        defaultDate: 'today',
                        maxDate: 'today',
                        minDate: 'today',
                      }}
                      onChange={([newDate]) => {}}
                    />
                  </div>
                </Col>
                <Col xxl={6} md={6}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="nolaporanpolisi"
                      className="form-label"
                    >
                      No laporan polisi
                    </Label>
                  </div>
                </Col>
                <Col xxl={6} md={6}>
                  <Input
                    id="nolaporanpolisi"
                    name="nolaporanpolisi"
                    type="string"
                    placeholder="No Laporan Polisi"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.nolaporanpolisi || ''}
                    invalid={
                      validation.touched.nolaporanpolisi &&
                      validation.errors.nolaporanpolisi
                        ? true
                        : false
                    }
                  />
                  {validation.touched.nolaporanpolisi &&
                  validation.errors.nolaporanpolisi ? (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.nolaporanpolisi}</div>
                    </FormFeedback>
                  ) : null}
                </Col>
                <Col xxl={6} md={6}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="keteranganlakakerja"
                      className="form-label"
                    >
                      Keterangan{' '}
                    </Label>
                  </div>
                </Col>
                <Col xxl={6} md={6}>
                  <Input
                    id="keteranganlakakerja"
                    name="keteranganlakakerja"
                    type="string"
                    placeholder="Keterangan"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.keteranganlakakerja || ''}
                    invalid={
                      validation.touched.keteranganlakakerja &&
                      validation.errors.keteranganlakakerja
                        ? true
                        : false
                    }
                  />
                  {validation.touched.keteranganlakakerja &&
                  validation.errors.keteranganlakakerja ? (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.keteranganlakakerja}</div>
                    </FormFeedback>
                  ) : null}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
            <CardBody>
              <Row className="gy-4">
                <Col xxl={6} md={6}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="provinsilakakerja"
                      className="form-label"
                    >
                      Provinsi
                    </Label>
                  </div>
                </Col>
                <Col xxl={6} md={6}>
                  <CustomSelect
                    id="provinsilakakerja"
                    name="provinsilakakerja"
                    options={optionProv}
                    className={`input ${
                      validation.errors.provinsilakakerja ? 'is-invalid' : ''
                    }`}
                    onChange={(e) => {
                      validation.setFieldValue('kprovinsilakakerja', e.value)
                      validation.setFieldValue('provinsilakakerja', e.label)
                    }}
                  />
                  {validation.touched.provinsilakakerja &&
                  validation.errors.provinsilakakerja ? (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.provinsilakakerja}</div>
                    </FormFeedback>
                  ) : null}
                </Col>
                <Col xxl={6} md={6}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="kotalakakerja"
                      className="form-label"
                    >
                      Kota
                    </Label>
                  </div>
                </Col>
                <Col xxl={6} md={6}>
                  <CustomSelect
                    id="kotalakakerja"
                    name="kotalakakerja"
                    options={optionKab}
                    onMenuOpen={() => {
                      if (
                        !validation.values.provinsilakakerja ||
                        !validation.values.kprovinsilakakerja
                      ) {
                        validation.setFieldError(
                          'provinsilakakerja',
                          'Pilih provinsi terlebih dahulu'
                        )
                      } else {
                        const chosenProv = optionProv.find(
                          (val) =>
                            Number(val.value) ===
                            validation.values.kprovinsilakakerja
                        )
                        if (!chosenProv) return
                        dispatch(kabupatenGetBpjs(chosenProv.value))
                      }
                    }}
                    className={`input ${
                      validation.errors.kotalakakerja ? 'is-invalid' : ''
                    }`}
                    onChange={(e) => {
                      validation.setFieldValue('kkotalakakerja', e.value)
                      validation.setFieldValue('kotalakakerja', e.label)
                    }}
                  />
                  {validation.touched.kotalakakerja &&
                  validation.errors.kotalakakerja ? (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.kotalakakerja}</div>
                    </FormFeedback>
                  ) : null}
                </Col>
                <Col xxl={6} md={6}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="inputkecamatan"
                      className="form-label"
                    >
                      Kecamatan
                    </Label>
                  </div>
                </Col>
                <Col xxl={6} md={6}>
                  <CustomSelect
                    id="kecamatanlakakerja"
                    name="kecamatanlakakerja"
                    options={optionKec}
                    onMenuOpen={() => {
                      if (!validation.values.kotalakakerja) {
                        validation.setFieldError(
                          'kotalakakerja',
                          'Pilih provinsi terlebih dahulu'
                        )
                      } else {
                        const chosenKab = optionKab.find(
                          (val) =>
                            Number(val.value) ===
                            validation.values.kkotalakakerja
                        )
                        if (!chosenKab) return
                        dispatch(kecamatanGetBpjs(chosenKab.value))
                      }
                    }}
                    className={`input ${
                      validation.errors.kecamatanlakakerja ? 'is-invalid' : ''
                    }`}
                    onChange={(e) => {
                      validation.setFieldValue('kkecamatanlakakerja', e.value)
                      validation.setFieldValue('kecamatanlakakerja', e.label)
                    }}
                  />
                  {validation.touched.kecamatanlakakerja &&
                  validation.errors.kecamatanlakakerja ? (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.kecamatanlakakerja}</div>
                    </FormFeedback>
                  ) : null}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )

  const BodyBPJSRujukan = (
    <>
      {PilihRujukan}
      {DetailBPJS}

      {validation.values.statuskecelakaan !== '' &&
      validation.values.statuskecelakaan === 2 ? (
        BodyLakaLantas
      ) : (
        <></>
      )}
      {validation.values.statuskecelakaan !== '' &&
      validation.values.statuskecelakaan === 3 ? (
        BodyLakaKerja
      ) : (
        <></>
      )}
      {validation.values.statuskecelakaan !== '' &&
      validation.values.statuskecelakaan === 4 ? (
        <>
          {BodyLakaKerja}
          {BodyLakaLantas}
        </>
      ) : (
        <></>
      )}
    </>
  )

  const BodyNonBpjs = (
    <>
      <Row key={0} className="p-2">
        <Col xxl={6} md={6}>
          <div className="mt-2">
            <Label
              style={{ color: 'black' }}
              htmlFor="nokartunonbpjs"
              className="form-label"
            >
              No Kartu
            </Label>
          </div>
        </Col>
        <Col xxl={6} md={6} className="mb-2">
          <Input
            id="nokartunonbpjs"
            name="nokartunonbpjs"
            placeholder="No kartu"
            onChange={vNonBPJS.handleChange}
            onBlur={vNonBPJS.handleBlur}
            value={vNonBPJS.values.nokartunonbpjs || ''}
            invalid={
              vNonBPJS.touched.nokartunonbpjs && vNonBPJS.errors.nokartunonbpjs
                ? true
                : false
            }
          />
          {vNonBPJS.touched.nokartunonbpjs && vNonBPJS.errors.nokartunonbpjs ? (
            <FormFeedback type="invalid">
              <div>{validation.errors.nokartunonbpjs}</div>
            </FormFeedback>
          ) : null}
        </Col>
        <Col xxl={6} md={6}>
          <div className="mt-2">
            <Label
              style={{ color: 'black' }}
              htmlFor="kotalakalantas"
              className="form-label"
            >
              Besaran Platform
            </Label>
          </div>
        </Col>
        <Col xxl={6} md={6}>
          <Input
            id="plafon"
            name="plafon"
            placeholder="Besaran Platform"
            onChange={(e) => {
              const newVal = onChangeStrNbr(
                e.target.value,
                validation.values.nominalbayar
              )
              vNonBPJS.setFieldValue('plafon', newVal)
            }}
            onBlur={vNonBPJS.handleBlur}
            value={vNonBPJS.values.plafon || ''}
            invalid={
              vNonBPJS.touched.plafon && vNonBPJS.errors.plafon ? true : false
            }
          />
          {vNonBPJS.touched.plafon && validation.errors.plafon ? (
            <FormFeedback type="invalid">
              <div>{validation.errors.plafon}</div>
            </FormFeedback>
          ) : null}
        </Col>
      </Row>
    </>
  )

  return (
    <div className="page-content registrasi-penjamin-fk">
      <Container fluid>
        <BreadCrumb
          title="Registrasi Penjamin"
          pageTitle="Registrasi Penjamin"
        />
        <Row>
          <Col lg={3}>
            <Card>
              <CardBody>
                <h5 className="card-title mb-5">Profile Pasien</h5>
                <div className="text-center">
                  <img
                    src={userDummy}
                    className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                    alt="user-profile"
                  />
                  <Input
                    style={{ border: 'none', textAlign: 'center' }}
                    id="namapasien"
                    name="namapasien"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.namapasien || ''}
                  />
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Nav pills className="nav-success mb-3">
                  <NavItem>
                    <NavLink
                      style={{ cursor: 'pointer' }}
                      className={classnames({ active: pillsTab === '1' })}
                      onClick={() => {
                        pillsToggle('1')
                      }}
                    >
                      Profile
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: 'pointer' }}
                      className={classnames({ active: pillsTab === '2' })}
                      onClick={() => {
                        pillsToggle('2')
                      }}
                    >
                      Riwayat
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: 'pointer' }}
                      className={classnames({ active: pillsTab === '3' })}
                      onClick={() => {
                        pillsToggle('3')
                      }}
                    >
                      Hist. SEP
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={pillsTab} className="text-muted">
                  <TabPane tabId="1" id="home-1">
                    <Card>
                      <CardBody>
                        <div className="table-responsive">
                          <Table className="table-borderless mb-0">
                            <tbody>
                              <tr>
                                <th className="ps-0" scope="row">
                                  NoRM :
                                </th>
                                <td className="text-muted">{dataUser?.nocm}</td>
                              </tr>
                              <tr>
                                <th className="ps-0" scope="row">
                                  Tgllahir :
                                </th>
                                <td className="text-muted">
                                  {dataUser?.tgllahir}
                                </td>
                              </tr>
                              <tr>
                                <th className="ps-0" scope="row">
                                  No BPJS :
                                </th>
                                <td className="text-muted">
                                  {dataUser?.nobpjs}
                                </td>
                              </tr>
                              <tr>
                                <th className="ps-0" scope="row">
                                  No Identitas :
                                </th>
                                <td className="text-muted">
                                  {dataUser?.noidentitas}
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </CardBody>
                    </Card>
                  </TabPane>
                  <TabPane tabId="2" id="home-2">
                    <Card>
                      <CardBody></CardBody>
                    </Card>
                  </TabPane>
                  <TabPane tabId="3" id="home-3">
                    <Card>
                      <CardBody>
                        <ListDataBPJS
                          dataBpjsHis={dataBpjs?.histori?.histori || []}
                        />
                      </CardBody>
                    </Card>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
          <Col lg={9}>
            <Form
              onSubmit={(e) => {
                e.preventDefault()
                const bpjs = penjaminObj.id === 1
                if (bpjs) {
                  validation.handleSubmit()
                } else {
                  vNonBPJS.handleSubmit()
                }
                return false
              }}
              className="gy-4"
              action="#"
            >
              <Card>
                <CardHeader className="card-header-snb ">
                  <h4 className="card-title mb-0">Registrasi</h4>
                </CardHeader>
                <div className="card-header align-items-center d-flex">
                  <div className="flex-shrink-0 ms-2">
                    <Nav
                      tabs
                      className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0"
                    >
                      <NavItemCust
                        tabNumber={indexTab}
                        text={penjaminObj?.namarekanan || ''}
                        cardHeaderTab={indexTab}
                        cardHeaderToggle={indexTab}
                      />
                    </Nav>
                  </div>
                </div>
                <TabContent activeTab={indexTab} className="text-muted p-2">
                  <TabPane tabId={indexTab} id="home-1">
                    {penjaminObj?.id === 1 ? BodyBPJSRujukan : BodyNonBpjs}
                    <Col
                      lg={12}
                      style={{ textAlign: 'right' }}
                      className="mr-3 me-3"
                    >
                      <Button type="submit" color="success">
                        Simpan
                      </Button>
                    </Col>
                  </TabPane>
                </TabContent>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
      <ModalRI
        isOpen={isOpenRujukan}
        toggle={() => setIsOpenModalRujukan(false)}
        dataBpjsSpr={dataBpjs?.spr?.list || []}
        setRujKartu={(noRuj, noKar, noSur, namaDok) => {
          validation.setFieldValue('norujukan', noRuj)
          validation.setFieldValue('nosuratkontrol', noSur)
          validation.setFieldValue('dpjppemberi', namaDok)
        }}
      />
      <ModalRJ isOpen={isOpenRJ} toggle={() => setIsOpenRJ(false)} />
    </div>
  )
}

const ModalRI = ({ isOpen, toggle, dataBpjsSpr, setRujKartu }) => {
  return (
    <Modal
      id="showModal"
      className="modal-registrasi-penjamin-fk"
      isOpen={isOpen}
      toggle={toggle}
      centered
    >
      <ModalBody id="divcontents">
        <div className="w-100 parent-none">
          <table className="w-100">
            <thead className="w-100">
              <tr className="w-100">
                <th scope="col">No Rujukan</th>
                <th scope="col">no Kartu</th>
              </tr>
            </thead>
            {dataBpjsSpr.map((data, i) => (
              <tbody
                className="w-100 table-hover-click"
                key={i}
                onClick={() => {
                  setRujKartu(
                    data.noSepAsalKontrol,
                    data.noKartu,
                    data.noSuratKontrol,
                    data.namaDokter
                  )
                  toggle()
                }}
              >
                <tr className="w-100">
                  <td className="text-muted">{data.noSepAsalKontrol}</td>
                  <td className="text-muted">{data.noKartu}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </ModalBody>
    </Modal>
  )
}

const ModalRJ = ({ isOpen, toggle }) => {
  return (
    <Modal
      id="showModal"
      className="modal-registrasi-penjamin-fk"
      isOpen={isOpen}
      toggle={toggle}
      centered
    >
      <ModalBody id="divcontents">
        <div className="w-100 parent-none">
          <p>SEP Sebelumnya bukan RI</p>
        </div>
      </ModalBody>
    </Modal>
  )
}

const ListDataBPJS = ({ dataBpjsHis }) => {
  return (
    <div className="table-responsive">
      <Table className="table-borderless mb-0 ">
        {dataBpjsHis?.map((histori, indexHis) => (
          <tbody key={indexHis}>
            <tr>
              <td className="text-muted">{histori.noRujukan}</td>
            </tr>
            <tr>
              <td className="text-muted">{}</td>
            </tr>
            <tr>
              <td className="text-muted">{histori.poli}</td>
            </tr>
            <tr>
              <td className="text-muted">{histori.tglSep}</td>
            </tr>
            <tr>
              <td className="text-muted">{histori.noSep}</td>
            </tr>
            <tr>
              <td className="text-muted">{histori.diagnosa}</td>
            </tr>
            <tr>
              <td className="text-muted">{histori.ppkPelayanan}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  )
}

const CustomCheckbox = ({ data, setData, checkboxName }) => {
  const handleChangeCheckBox = (val) => {
    const newData = [...data]
    const dataVal = newData.find((dataVal) => dataVal.value === val)
    dataVal.checked = !dataVal.checked
    setData(newData)
  }
  const oddData = data.filter((_, indexVal) => Math.abs(indexVal % 2) === 1)
  const evenData = data.filter((_, indexVal) => indexVal % 2 === 0)

  return (
    <Row className="mt-3">
      <Col xxl={6} md={6}>
        {evenData.map((dataVal, indexVal) => (
          <div className="form-check ms-2" key={dataVal.value}>
            <Input
              className="form-check-input"
              type="checkbox"
              id={`formcheck-1-${checkboxName}${indexVal}`}
              checked={dataVal.checked}
              onChange={(e) => handleChangeCheckBox(dataVal.value)}
            />
            <Label
              className="form-check-label"
              htmlFor={`formcheck-1-${checkboxName}${indexVal}`}
              style={{ color: 'black' }}
            >
              {dataVal.label}
            </Label>
          </div>
        ))}
      </Col>
      <Col xxl={6} md={6}>
        {oddData.map((dataVal, indexVal) => (
          <div className="form-check ms-2" key={dataVal.value}>
            <Input
              className="form-check-input"
              type="checkbox"
              id={`formcheck-2-${checkboxName}${indexVal}`}
              checked={dataVal.checked}
              onChange={(e) => handleChangeCheckBox(dataVal.value)}
            />
            <Label
              className="form-check-label"
              htmlFor={`formcheck-2-${checkboxName}${indexVal}`}
              style={{ color: 'black' }}
            >
              {dataVal.label}
            </Label>
          </div>
        ))}
      </Col>
    </Row>
  )
}

const NavItemCust = ({ tabNumber, text, cardHeaderTab, cardHeaderToggle }) => (
  <NavItem>
    <NavLink
      style={{ cursor: 'pointer', fontWeight: 'bold' }}
      className={classnames({ active: cardHeaderTab === tabNumber })}
      onClick={() => {
        cardHeaderToggle(tabNumber)
      }}
    >
      {text}
    </NavLink>
  </NavItem>
)

export default withRouter(RegistrasiPenjaminFK)
