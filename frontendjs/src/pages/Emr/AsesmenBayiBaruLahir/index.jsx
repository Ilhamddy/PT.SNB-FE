import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  UncontrolledTooltip,
} from 'reactstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr'
import CustomSelect from '../../Select/Select'
import Skala from '../../../Components/Skala/Skala'
import {
  saveEmrPasien,
  emrResetForm,
  getAsesmenBayiLahirByNorec,
  getComboAsesmenBayiLahir,
  getHistoryAsesmenBayiLahir,
} from '../../../store/actions'
import { useParams } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../../Components/Table/LoadingTable'
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles'

const AsesmenBayiBaruLahir = () => {
  // document.title = "Asesmen Bayi Baru Lahir";
  const dispatch = useDispatch()
  const { norecdp, norecap } = useParams()
  const {
    dataAsesmen,
    loadingAsesmen,
    successAsesmen,
    dataCombo,
    dataHistoryAsesmen,
    loadingHistoryAsesmen,
  } = useSelector((state) => ({
    dataAsesmen: state.Emr.getAsesmenBayiLahirByNorec.data,
    loadingAsesmen: state.Emr.getAsesmenBayiLahirByNorec.loading,
    successAsesmen: state.Emr.getAsesmenBayiLahirByNorec.success,
    dataCombo: state.Emr.getComboAsesmenBayiLahir.data,
    dataHistoryAsesmen: state.Emr.getHistoryAsesmenBayiLahir.data,
    loadingHistoryAsesmen: state.Emr.getHistoryAsesmenBayiLahir.loading,
  }))
  const [dateNow] = useState(() => new Date().toISOString())
  const vSetValidation = useFormik({
    initialValues: {
      norecap: norecap,
      norecemrpasien: '',
      responden: '',
      hubungan: '',
      anamnesaBayi: '',
      skalaGravida: '',
      skalaPartus: '',
      skalaAbortus: '',
      keadanIbuSelamaHamil: '',
      tempatPersalinan: '',
      penolong: '',
      ketubanPecah: '',
      airKetuban: '',
      jamLahir: '',
      jamPersalinan: '',
      macamPersalinan: '',
      indikasi: '',
      jenisKelamin: '',
      keadaan: '',
      beratBadanBayi: '',
      panjangBadan: '',
      lingkarDada: '',
      lingkarKepala: '',
      menitMeninggal: '',
      sebabKematianBayi: '',
      a1Menit: '',
      a5Menit: '',
      a10Menit: '',
      p1Menit: '',
      p5Menit: '',
      p10Menit: '',
      g1Menit: '',
      g5Menit: '',
      g10Menit: '',
      ac1Menit: '',
      ac5Menit: '',
      ac10Menit: '',
      r1Menit: '',
      r5Menit: '',
      r10Menit: '',
      a1MenitScore: 0,
      a5MenitScore: 0,
      a10MenitScore: 0,
      p1MenitScore: 0,
      p5MenitScore: 0,
      p10MenitScore: 0,
      g1MenitScore: 0,
      g5MenitScore: 0,
      g10MenitScore: 0,
      ac1MenitScore: 0,
      ac5MenitScore: 0,
      ac10MenitScore: 0,
      r1MenitScore: 0,
      r5MenitScore: 0,
      r10MenitScore: 0,
      total1Menit: 0,
      total5Menit: 0,
      total10Menit: 0,
      piece: '',
      pieceDurasi: '',
      sungkup: '',
      sungkupDurasi: '',
      pompa: '',
      pompaDurasi: '',
      intubatic: '',
      intubaticDurasi: '',
      kulit: '',
      tht: '',
      mulut: '',
      leher: '',
      dada: '',
      paru: '',
      jantung: '',
      abdomen: '',
      genitalia: '',
      anus: '',
      extremitasAtas: '',
      extremitasBawah: '',
      reflekHisap: '',
      pengeluaranAirKeruh: '',
      pengeluaranMekoneum: '',
      pemeriksaanLaboratorium: '',
      diagnosaKerja: '',
      pentalakaksanaan: '',
      idlabel: 4,
      label: 'ASESMENBAYILAHIR',
    },
    validationSchema: Yup.object({
      // start: Yup.string().required('Tanggal Awal harus diisi'),
      // end: Yup.string().required('Tanggal Akhir harus diisi'),
    }),
    onSubmit: (values) => {
      console.log(values)
      if (values.ketubanPecah === null) values.ketubanPecah = dateNow
      if (values.jamLahir === null) values.jamLahir = dateNow

      values.total1Menit =
        values.a1MenitScore +
        values.p1MenitScore +
        values.g1MenitScore +
        values.ac1MenitScore +
        values.r1MenitScore
      values.total5Menit =
        values.a5MenitScore +
        values.p5MenitScore +
        values.g5MenitScore +
        values.ac5MenitScore +
        values.r5MenitScore
      values.total10Menit =
        values.a10MenitScore +
        values.p10MenitScore +
        values.g10MenitScore +
        values.ac10MenitScore +
        values.r10MenitScore
      dispatch(
        saveEmrPasien(values, () => {
          dispatch(getAsesmenBayiLahirByNorec({ norecap: norecap }))
          dispatch(getHistoryAsesmenBayiLahir({ norecdp: norecdp }))
        })
      )
    },
  })
  useEffect(() => {
    return () => {
      dispatch(emrResetForm())
    }
  }, [dispatch])
  useEffect(() => {
    if (norecap) {
      dispatch(getAsesmenBayiLahirByNorec({ norecap: norecap }))
      dispatch(getComboAsesmenBayiLahir())
      dispatch(getHistoryAsesmenBayiLahir({ norecdp: norecdp }))
    }
  }, [norecap, norecdp, dispatch])
  useEffect(() => {
    const setFF = vSetValidation.setFieldValue
    if (dataAsesmen) {
      setFF('norecemrpasien', dataAsesmen[0]?.norec)
      setFF('responden', dataAsesmen[0]?.responden)
      setFF('hubungan', dataAsesmen[0]?.objecthubungankeluargafk)
      setFF('anamnesaBayi', dataAsesmen[0]?.anamnesa)
      setFF('skalaGravida', dataAsesmen[0]?.gravida)
      setFF('skalaPartus', dataAsesmen[0]?.partus)
      setFF('skalaAbortus', dataAsesmen[0]?.abortus)
      setFF('keadanIbuSelamaHamil', dataAsesmen[0]?.keadaanibu)
      setFF('tempatPersalinan', dataAsesmen[0]?.tempatpersalinan)
      setFF('penolong', dataAsesmen[0]?.penolong)
      setFF('ketubanPecah', dataAsesmen[0]?.ketubanpecah)
      setFF('airKetuban', dataAsesmen[0]?.airketuban)
      setFF('jamLahir', dataAsesmen[0]?.lahir)
      setFF('jamPersalinan', dataAsesmen[0]?.lamapersalinan)
      setFF('macamPersalinan', dataAsesmen[0]?.macampersalinan)
      setFF('indikasi', dataAsesmen[0]?.indikasi)
      setFF('jenisKelamin', dataAsesmen[0]?.objectjeniskelaminfk)
      setFF('keadaan', dataAsesmen[0]?.keadaan)
      setFF('beratBadanBayi', dataAsesmen[0]?.berat)
      setFF('panjangBadan', dataAsesmen[0]?.panjang)
      setFF('lingkarDada', dataAsesmen[0]?.lingkardada)
      setFF('lingkarKepala', dataAsesmen[0]?.lingkarkepala)
      setFF('menitMeninggal', dataAsesmen[0]?.lahirmeninggal)
      setFF('sebabKematianBayi', dataAsesmen[0]?.objectstatuspulangrifk)
      setFF('a1Menit', dataAsesmen[0]?.a1)
      setFF('a5Menit', dataAsesmen[0]?.a5)
      setFF('a10Menit', dataAsesmen[0]?.a10)
      setFF('a1MenitScore', dataAsesmen[0]?.a1score)
      setFF('a5MenitScore', dataAsesmen[0]?.a5score)
      setFF('a10MenitScore', dataAsesmen[0]?.a10score)
      setFF('p1Menit', dataAsesmen[0]?.p1)
      setFF('p5Menit', dataAsesmen[0]?.p5)
      setFF('p10Menit', dataAsesmen[0]?.p10)
      setFF('p1MenitScore', dataAsesmen[0]?.p1score)
      setFF('p5MenitScore', dataAsesmen[0]?.p5score)
      setFF('p10MenitScore', dataAsesmen[0]?.p10score)
      setFF('g1Menit', dataAsesmen[0]?.g1)
      setFF('g5Menit', dataAsesmen[0]?.g5)
      setFF('g10Menit', dataAsesmen[0]?.g10)
      setFF('g1MenitScore', dataAsesmen[0]?.g1score)
      setFF('g5MenitScore', dataAsesmen[0]?.g5score)
      setFF('g10MenitScore', dataAsesmen[0]?.g10score)
      setFF('ac1Menit', dataAsesmen[0]?.c1)
      setFF('ac5Menit', dataAsesmen[0]?.c5)
      setFF('ac10Menit', dataAsesmen[0]?.c10)
      setFF('ac1MenitScore', dataAsesmen[0]?.c1score)
      setFF('ac5MenitScore', dataAsesmen[0]?.c5score)
      setFF('ac10MenitScore', dataAsesmen[0]?.c10score)
      setFF('r1Menit', dataAsesmen[0]?.r1)
      setFF('r5Menit', dataAsesmen[0]?.r5)
      setFF('r10Menit', dataAsesmen[0]?.r10)
      setFF('r1MenitScore', dataAsesmen[0]?.r1score)
      setFF('r5MenitScore', dataAsesmen[0]?.r5score)
      setFF('r10MenitScore', dataAsesmen[0]?.r10score)
      if (dataAsesmen[0]?.durasitpiece === '0') {
        setFF('piece', 2)
        setstatePiece(true)
      } else {
        setFF('piece', 1)
        setstatePiece(false)
      }
      if (dataAsesmen[0]?.durasio2 === '0') {
        setFF('sungkup', 2)
        setstateSungkup(true)
      } else {
        setFF('sungkup', 1)
        setstateSungkup(false)
      }
      if (dataAsesmen[0]?.durasipompa === '0') {
        setFF('pompa', 2)
        setstatePompa(true)
      } else {
        setFF('pompa', 1)
        setstatePompa(false)
      }
      if (dataAsesmen[0]?.durasiintubatic === '0') {
        console.log('masuk')
        setFF('intubatic', 2)
        setstateIntubatic(true)
      } else {
        setFF('intubatic', 1)
        setstateIntubatic(false)
      }
      setFF('pieceDurasi', dataAsesmen[0]?.durasitpiece)
      setFF('sungkupDurasi', dataAsesmen[0]?.durasio2)
      setFF('pompaDurasi', dataAsesmen[0]?.durasipompa)
      setFF('intubaticDurasi', dataAsesmen[0]?.durasiintubatic)
      setFF('kulit', dataAsesmen[0]?.kulit)
      setFF('tht', dataAsesmen[0]?.tht)
      setFF('mulut', dataAsesmen[0]?.mulut)
      setFF('leher', dataAsesmen[0]?.leher)
      setFF('dada', dataAsesmen[0]?.dada)
      setFF('paru', dataAsesmen[0]?.paru)
      setFF('jantung', dataAsesmen[0]?.jantung)
      setFF('abdomen', dataAsesmen[0]?.abdomen)
      setFF('genitalia', dataAsesmen[0]?.genitalia)
      setFF('anus', dataAsesmen[0]?.anus)
      setFF('extremitasAtas', dataAsesmen[0]?.extremitasatas)
      setFF('extremitasBawah', dataAsesmen[0]?.extremitasbawah)
      setFF('reflekHisap', dataAsesmen[0]?.reflexhisap)
      setFF('pengeluaranAirKeruh', dataAsesmen[0]?.pengeluaranairkeruh)
      setFF('pengeluaranMekoneum', dataAsesmen[0]?.pengeluaranmokeneum)
      setFF('pemeriksaanLaboratorium', dataAsesmen[0]?.pemeriksaanlab)
      setFF('diagnosaKerja', dataAsesmen[0]?.diagnosakerja)
      setFF('pentalakaksanaan', dataAsesmen[0]?.penatalaksanaan)
      setSkalaGravida(dataAsesmen[0]?.gravida)
      setSkalaPartus(dataAsesmen[0]?.partus)
      setSkalaAbortus(dataAsesmen[0]?.abortus)
    }
  }, [dataAsesmen, vSetValidation.setFieldValue])
  const [skalaGravida, setSkalaGravida] = useState(0)
  const onClickSkalaGravida = (q) => {
    setSkalaGravida(q)
    vSetValidation.setFieldValue('skalaGravida', q)
  }
  const [skalaPartus, setSkalaPartus] = useState(0)
  const onClickSkalaPartus = (q) => {
    setSkalaPartus(q)
    vSetValidation.setFieldValue('skalaPartus', q)
  }
  const [skalaAbortus, setSkalaAbortus] = useState(0)
  const onClickSkalaAbortus = (q) => {
    setSkalaAbortus(q)
    vSetValidation.setFieldValue('skalaAbortus', q)
  }
  const [statePiece, setstatePiece] = useState(true)
  const [stateSungkup, setstateSungkup] = useState(true)
  const [statePompa, setstatePompa] = useState(true)
  const [stateIntubatic, setstateIntubatic] = useState(true)
  const dataYaTidak = [
    { label: 'Ya', value: 1 },
    { label: 'Tidak', value: 2 },
  ]
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">No. Registrasi</span>,
      selector: (row) => row.noregistrasi,
      sortable: true,
      // width: "50px"
    },
    {
      name: <span className="font-weight-bold fs-13">Tgl Input</span>,
      selector: (row) => row.tglisi,
      sortable: true,
      // width: "50px"
    },
    {
      name: <span className="font-weight-bold fs-13">Tgl Registrasi</span>,
      selector: (row) => row.tglregistrasi,
      sortable: true,
      // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
      // width: "250px",
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Responden</span>,
      selector: (row) => row.responden,
      sortable: true,
      // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
      // width: "250px",
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Anamnesa</span>,
      selector: (row) => row.anamnesa,
      sortable: true,
      // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
      // width: "250px",
      wrap: true,
    },
    {
      name: (
        <span className="font-weight-bold fs-13">Keadaan Ibu Selama Hamil</span>
      ),
      selector: (row) => row.keadaanibu,
      sortable: true,
      // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
      // width: "250px",
      wrap: true,
    },
  ]
  const handleClick = (e) => {
    const setFF = vSetValidation.setFieldValue
    setFF('norecemrpasien', e.norec)
    setFF('responden', e.responden)
    setFF('hubungan', e.objecthubungankeluargafk)
    setFF('anamnesaBayi', e.anamnesa)
    setFF('skalaGravida', e.gravida)
    setFF('skalaPartus', e.partus)
    setFF('skalaAbortus', e.abortus)
    setFF('keadanIbuSelamaHamil', e.keadaanibu)
    setFF('tempatPersalinan', e.tempatpersalinan)
    setFF('penolong', e.penolong)
    setFF('ketubanPecah', e.ketubanpecah)
    setFF('airKetuban', e.airketuban)
    setFF('jamLahir', e.lahir)
    setFF('jamPersalinan', e.lamapersalinan)
    setFF('macamPersalinan', e.macampersalinan)
    setFF('indikasi', e.indikasi)
    setFF('jenisKelamin', e.objectjeniskelaminfk)
    setFF('keadaan', e.keadaan)
    setFF('beratBadanBayi', e.berat)
    setFF('panjangBadan', e.panjang)
    setFF('lingkarDada', e.lingkardada)
    setFF('lingkarKepala', e.lingkarkepala)
    setFF('menitMeninggal', e.lahirmeninggal)
    setFF('sebabKematianBayi', e.objectstatuspulangrifk)
    setFF('a1Menit', e.a1)
    setFF('a5Menit', e.a5)
    setFF('a10Menit', e.a10)
    setFF('a1MenitScore', e.a1score)
    setFF('a5MenitScore', e.a5score)
    setFF('a10MenitScore', e.a10score)
    setFF('p1Menit', e.p1)
    setFF('p5Menit', e.p5)
    setFF('p10Menit', e.p10)
    setFF('p1MenitScore', e.p1score)
    setFF('p5MenitScore', e.p5score)
    setFF('p10MenitScore', e.p10score)
    setFF('g1Menit', e.g1)
    setFF('g5Menit', e.g5)
    setFF('g10Menit', e.g10)
    setFF('g1MenitScore', e.g1score)
    setFF('g5MenitScore', e.g5score)
    setFF('g10MenitScore', e.g10score)
    setFF('ac1Menit', e.c1)
    setFF('ac5Menit', e.c5)
    setFF('ac10Menit', e.c10)
    setFF('ac1MenitScore', e.c1score)
    setFF('ac5MenitScore', e.c5score)
    setFF('ac10MenitScore', e.c10score)
    setFF('r1Menit', e.r1)
    setFF('r5Menit', e.r5)
    setFF('r10Menit', e.r10)
    setFF('r1MenitScore', e.r1score)
    setFF('r5MenitScore', e.r5score)
    setFF('r10MenitScore', e.r10score)
    if (e.durasitpiece === '0') {
      setFF('piece', 2)
      setstatePiece(true)
    } else {
      setFF('piece', 1)
      setstatePiece(false)
    }
    if (e.durasio2 === '0') {
      setFF('sungkup', 2)
      setstateSungkup(true)
    } else {
      setFF('sungkup', 1)
      setstateSungkup(false)
    }
    if (e.durasipompa === '0') {
      setFF('pompa', 2)
      setstatePompa(true)
    } else {
      setFF('pompa', 1)
      setstatePompa(false)
    }
    if (e.durasiintubatic === '0') {
      setFF('intubatic', 2)
      setstateIntubatic(true)
    } else {
      setFF('intubatic', 1)
      setstateIntubatic(false)
    }
    setFF('pieceDurasi', e.durasitpiece)
    setFF('sungkupDurasi', e.durasio2)
    setFF('pompaDurasi', e.durasipompa)
    setFF('intubaticDurasi', e.durasiintubatic)
    setFF('kulit', e.kulit)
    setFF('tht', e.tht)
    setFF('mulut', e.mulut)
    setFF('leher', e.leher)
    setFF('dada', e.dada)
    setFF('paru', e.paru)
    setFF('jantung', e.jantung)
    setFF('abdomen', e.abdomen)
    setFF('genitalia', e.genitalia)
    setFF('anus', e.anus)
    setFF('extremitasAtas', e.extremitasatas)
    setFF('extremitasBawah', e.extremitasbawah)
    setFF('reflekHisap', e.reflexhisap)
    setFF('pengeluaranAirKeruh', e.pengeluaranairkeruh)
    setFF('pengeluaranMekoneum', e.pengeluaranmokeneum)
    setFF('pemeriksaanLaboratorium', e.pemeriksaanlab)
    setFF('diagnosaKerja', e.diagnosakerja)
    setFF('pentalakaksanaan', e.penatalaksanaan)
    setSkalaGravida(e.gravida)
    setSkalaPartus(e.partus)
    setSkalaAbortus(e.abortus)
    // console.log(e)
  }
  return (
    <React.Fragment>
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          vSetValidation.handleSubmit()
          return false
        }}
        className="gy-4"
        action="#"
      >
        <Card>
          <CardHeader className="card-header-snb">
            <h4 className="card-title mb-0">Riwayat Asesmen</h4>
          </CardHeader>
          <CardBody>
            <Col lg={12}>
              <div id="table-gridjs">
                <DataTable
                  fixedHeader
                  fixedHeaderScrollHeight="330px"
                  columns={columns}
                  pagination
                  data={dataHistoryAsesmen}
                  progressPending={loadingHistoryAsesmen}
                  customStyles={tableCustomStyles}
                  progressComponent={<LoadingTable />}
                  onRowClicked={(row) => handleClick(row)}
                  pointerOnHover
                  highlightOnHover
                />
              </div>
            </Col>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="card-header-snb">
            <h4 className="card-title mb-0">ALLOANAMNESA</h4>
          </CardHeader>
          <CardBody>
            <Row className="gy-2">
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Responden
                  </Label>
                </div>
              </Col>
              <Col lg={4}>
                <Input
                  id="responden"
                  name="responden"
                  type="text"
                  value={vSetValidation.values.responden}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('responden', e.target.value)
                  }}
                  invalid={
                    vSetValidation.touched?.responden &&
                    !!vSetValidation.errors?.responden
                  }
                  placeholder="Isi nama responden"
                />
                {vSetValidation.touched?.responden &&
                  !!vSetValidation.errors.responden && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.responden}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Hubungan Dengan Pasien
                  </Label>
                </div>
              </Col>
              <Col lg={4}>
                <CustomSelect
                  id="hubungan"
                  name="hubungan"
                  options={dataCombo.hubungan}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('hubungan', e?.value || '')
                  }}
                  value={vSetValidation.values.hubungan}
                  className={`input row-header ${
                    !!vSetValidation?.errors.hubungan ? 'is-invalid' : ''
                  }`}
                  placeholder="Pilih hubungan dengan pasien"
                />
                {vSetValidation.touched.hubungan &&
                  !!vSetValidation.errors.hubungan && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.hubungan}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={12}>
                <Input
                  id="anamnesaBayi"
                  name="anamnesaBayi"
                  type="textarea"
                  value={vSetValidation.values.anamnesaBayi}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('anamnesaBayi', e.target.value)
                  }}
                  invalid={
                    vSetValidation.touched?.anamnesaBayi &&
                    !!vSetValidation.errors?.anamnesaBayi
                  }
                  placeholder="Isi anamnesa bayi disini"
                />
                {vSetValidation.touched?.anamnesaBayi &&
                  !!vSetValidation.errors.anamnesaBayi && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.anamnesaBayi}</div>
                    </FormFeedback>
                  )}
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="card-header-snb">
            <h4 className="card-title mb-0">Riwayat Kelahiran</h4>
          </CardHeader>
          <CardBody>
            <Row className="gy-2">
              <Col lg={12}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Riwayat kelahiran ibu :
                  </Label>
                </div>
              </Col>
              <Col lg={2}>
                <div className="mt-5">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Gravida
                  </Label>
                </div>
              </Col>
              <Col lg={10}>
                <Skala
                  quantity={skalaGravida}
                  onQuantityChange={(q) => onClickSkalaGravida(q)}
                />
              </Col>
              <Col lg={2}>
                <div className="mt-5">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Partus
                  </Label>
                </div>
              </Col>
              <Col lg={10}>
                <Skala
                  quantity={skalaPartus}
                  onQuantityChange={(q) => onClickSkalaPartus(q)}
                />
              </Col>
              <Col lg={2}>
                <div className="mt-5">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Abortus
                  </Label>
                </div>
              </Col>
              <Col lg={10}>
                <Skala
                  quantity={skalaAbortus}
                  onQuantityChange={(q) => onClickSkalaAbortus(q)}
                />
              </Col>
              <Col lg={12}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Keadaan Ibu Selama Hamil
                  </Label>
                </div>
              </Col>
              <Col lg={12}>
                <div className="mt-2">
                  <Input
                    id="keadanIbuSelamaHamil"
                    name="keadanIbuSelamaHamil"
                    type="textarea"
                    value={vSetValidation.values.keadanIbuSelamaHamil}
                    onChange={(e) => {
                      vSetValidation.setFieldValue(
                        'keadanIbuSelamaHamil',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidation.touched?.keadanIbuSelamaHamil &&
                      !!vSetValidation.errors?.keadanIbuSelamaHamil
                    }
                    placeholder="Isi keadan Ibu Selama Hamil"
                  />
                  {vSetValidation.touched?.keadanIbuSelamaHamil &&
                    !!vSetValidation.errors.keadanIbuSelamaHamil && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.keadanIbuSelamaHamil}</div>
                      </FormFeedback>
                    )}
                </div>
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Tempat Persalinan
                  </Label>
                </div>
              </Col>
              <Col lg={4}>
                <Input
                  id="tempatPersalinan"
                  name="tempatPersalinan"
                  type="text"
                  value={vSetValidation.values.tempatPersalinan}
                  onChange={(e) => {
                    vSetValidation.setFieldValue(
                      'tempatPersalinan',
                      e.target.value
                    )
                  }}
                  invalid={
                    vSetValidation.touched?.tempatPersalinan &&
                    !!vSetValidation.errors?.tempatPersalinan
                  }
                  placeholder="Isi tempat persalinan"
                />
                {vSetValidation.touched?.tempatPersalinan &&
                  !!vSetValidation.errors.tempatPersalinan && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.tempatPersalinan}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Penolong
                  </Label>
                </div>
              </Col>
              <Col lg={4}>
                <Input
                  id="penolong"
                  name="penolong"
                  type="text"
                  value={vSetValidation.values.penolong}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('penolong', e.target.value)
                  }}
                  invalid={
                    vSetValidation.touched?.penolong &&
                    !!vSetValidation.errors?.penolong
                  }
                  placeholder="Isi penolong"
                />
                {vSetValidation.touched?.penolong &&
                  !!vSetValidation.errors.penolong && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.penolong}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={12}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Ikhtisar Persalinan :
                  </Label>
                </div>
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Ketuban Pecah
                  </Label>
                </div>
              </Col>
              <Col lg={4}>
                <KontainerFlatpickr
                  isError={
                    vSetValidation.touched?.ketubanPecah &&
                    !!vSetValidation.errors?.ketubanPecah
                  }
                  id="ketubanPecah"
                  options={{
                    dateFormat: 'Y-m-d H:i',
                    defaultDate: 'today',
                    enableTime: true,
                    time_24hr: true,
                  }}
                  value={vSetValidation.values.ketubanPecah || dateNow}
                  onChange={([newDate]) => {
                    vSetValidation.setFieldValue(
                      'ketubanPecah',
                      newDate.toISOString()
                    )
                  }}
                />
                {vSetValidation.touched?.ketubanPecah &&
                  !!vSetValidation.errors.ketubanPecah && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.ketubanPecah}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Air Ketuban
                  </Label>
                </div>
              </Col>
              <Col lg={4}>
                <CustomSelect
                  id="airKetuban"
                  name="airKetuban"
                  options={dataCombo.ketuban}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('airKetuban', e?.value || '')
                  }}
                  value={vSetValidation.values.airKetuban}
                  className={`input row-header ${
                    !!vSetValidation?.errors.airKetuban ? 'is-invalid' : ''
                  }`}
                />
                {vSetValidation.touched.airKetuban &&
                  !!vSetValidation.errors.airKetuban && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.airKetuban}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Lahir
                  </Label>
                </div>
              </Col>
              <Col lg={4}>
                <KontainerFlatpickr
                  isError={
                    vSetValidation.touched?.jamLahir &&
                    !!vSetValidation.errors?.jamLahir
                  }
                  id="jamLahir"
                  options={{
                    dateFormat: 'Y-m-d H:i',
                    defaultDate: 'today',
                    enableTime: true,
                    time_24hr: true,
                  }}
                  value={vSetValidation.values.jamLahir || dateNow}
                  onChange={([newDate]) => {
                    vSetValidation.setFieldValue(
                      'jamLahir',
                      newDate.toISOString()
                    )
                  }}
                />
                {vSetValidation.touched?.jamLahir &&
                  !!vSetValidation.errors.jamLahir && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.jamLahir}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Lama Persalinan(Jam)
                  </Label>
                </div>
              </Col>
              <Col lg={4}>
                <Input
                  id="jamPersalinan"
                  name="jamPersalinan"
                  type="text"
                  value={vSetValidation.values.jamPersalinan}
                  onChange={(e) => {
                    vSetValidation.setFieldValue(
                      'jamPersalinan',
                      e.target.value
                    )
                  }}
                  invalid={
                    vSetValidation.touched?.jamPersalinan &&
                    !!vSetValidation.errors?.jamPersalinan
                  }
                />
                {vSetValidation.touched?.jamPersalinan &&
                  !!vSetValidation.errors.jamPersalinan && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.jamPersalinan}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Macam Persalinan
                  </Label>
                </div>
              </Col>
              <Col lg={4}>
                <CustomSelect
                  id="macamPersalinan"
                  name="macamPersalinan"
                  options={dataCombo.macampersalinan}
                  onChange={(e) => {
                    vSetValidation.setFieldValue(
                      'macamPersalinan',
                      e?.value || ''
                    )
                  }}
                  value={vSetValidation.values.macamPersalinan}
                  className={`input row-header ${
                    !!vSetValidation?.errors.macamPersalinan ? 'is-invalid' : ''
                  }`}
                />
                {vSetValidation.touched.macamPersalinan &&
                  !!vSetValidation.errors.macamPersalinan && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.macamPersalinan}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Indikasi
                  </Label>
                </div>
              </Col>
              <Col lg={4}>
                <Input
                  id="indikasi"
                  name="indikasi"
                  type="textarea"
                  value={vSetValidation.values.indikasi}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('indikasi', e.target.value)
                  }}
                  invalid={
                    vSetValidation.touched?.indikasi &&
                    !!vSetValidation.errors?.indikasi
                  }
                />
                {vSetValidation.touched?.indikasi &&
                  !!vSetValidation.errors.indikasi && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.indikasi}</div>
                    </FormFeedback>
                  )}
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="card-header-snb">
            <h4 className="card-title mb-0">Keadaan Umum Bayi</h4>
          </CardHeader>
          <CardBody>
            <div className="border-bottom">
              <Row className="gy-2">
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Jenis Kelamin
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <CustomSelect
                    id="jenisKelamin"
                    name="jenisKelamin"
                    options={dataCombo.jeniskelamin}
                    onChange={(e) => {
                      vSetValidation.setFieldValue(
                        'jenisKelamin',
                        e?.value || ''
                      )
                    }}
                    value={vSetValidation.values.jenisKelamin}
                    className={`input row-header ${
                      !!vSetValidation?.errors.jenisKelamin ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidation.touched.jenisKelamin &&
                    !!vSetValidation.errors.jenisKelamin && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.jenisKelamin}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Keadaan
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <CustomSelect
                    id="keadaan"
                    name="keadaan"
                    options={dataCombo.keadaanbayi}
                    onChange={(e) => {
                      vSetValidation.setFieldValue('keadaan', e?.value || '')
                    }}
                    value={vSetValidation.values.keadaan}
                    className={`input row-header ${
                      !!vSetValidation?.errors.keadaan ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidation.touched.keadaan &&
                    !!vSetValidation.errors.keadaan && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.keadaan}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Berat Badan(gram)
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <Input
                    id="beratBadanBayi"
                    name="beratBadanBayi"
                    type="number"
                    value={vSetValidation.values.beratBadanBayi}
                    onChange={(e) => {
                      vSetValidation.setFieldValue(
                        'beratBadanBayi',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidation.touched?.beratBadanBayi &&
                      !!vSetValidation.errors?.beratBadanBayi
                    }
                    placeholder="Isi berat badan bayi"
                  />
                  {vSetValidation.touched?.beratBadanBayi &&
                    !!vSetValidation.errors.beratBadanBayi && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.beratBadanBayi}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Panjang Badan(cm)
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <Input
                    id="panjangBadan"
                    name="panjangBadan"
                    type="text"
                    value={vSetValidation.values.panjangBadan}
                    onChange={(e) => {
                      vSetValidation.setFieldValue(
                        'panjangBadan',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidation.touched?.panjangBadan &&
                      !!vSetValidation.errors?.panjangBadan
                    }
                    placeholder="Isi panjang badan"
                  />
                  {vSetValidation.touched?.panjangBadan &&
                    !!vSetValidation.errors.panjangBadan && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.panjangBadan}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Lingkar dada(cm)
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <Input
                    id="lingkarDada"
                    name="lingkarDada"
                    type="text"
                    value={vSetValidation.values.lingkarDada}
                    onChange={(e) => {
                      vSetValidation.setFieldValue(
                        'lingkarDada',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidation.touched?.lingkarDada &&
                      !!vSetValidation.errors?.lingkarDada
                    }
                    placeholder="Isi lingkar dada"
                  />
                  {vSetValidation.touched?.lingkarDada &&
                    !!vSetValidation.errors.lingkarDada && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.lingkarDada}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Lingkar kepala(cm)
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <Input
                    id="lingkarKepala"
                    name="lingkarKepala"
                    type="text"
                    value={vSetValidation.values.lingkarKepala}
                    onChange={(e) => {
                      vSetValidation.setFieldValue(
                        'lingkarKepala',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidation.touched?.lingkarKepala &&
                      !!vSetValidation.errors?.lingkarKepala
                    }
                    placeholder="Isi lingkar kepala"
                  />
                  {vSetValidation.touched?.lingkarKepala &&
                    !!vSetValidation.errors.lingkarKepala && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.lingkarKepala}</div>
                      </FormFeedback>
                    )}
                </Col>
              </Row>
            </div>
            <div className="border-bottom">
              <Row className="gy-2">
                <Col lg={12}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Untuk bayi yang keadaan umumnya jelek :
                    </Label>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Lahir kemudian meninggal (menit post partum)
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <Input
                    id="menitMeninggal"
                    name="menitMeninggal"
                    type="text"
                    value={vSetValidation.values.menitMeninggal}
                    onChange={(e) => {
                      vSetValidation.setFieldValue(
                        'menitMeninggal',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidation.touched?.menitMeninggal &&
                      !!vSetValidation.errors?.menitMeninggal
                    }
                    placeholder="Isi waktu dalam menit"
                  />
                  {vSetValidation.touched?.menitMeninggal &&
                    !!vSetValidation.errors.menitMeninggal && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.menitMeninggal}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={3}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Bayi lahir mati, sebab kematian
                    </Label>
                  </div>
                </Col>
                <Col lg={3}>
                  <CustomSelect
                    id="sebabKematianBayi"
                    name="sebabKematianBayi"
                    options={dataCombo.sebabkematianbayi}
                    onChange={(e) => {
                      vSetValidation.setFieldValue(
                        'sebabKematianBayi',
                        e?.value || ''
                      )
                    }}
                    value={vSetValidation.values.sebabKematianBayi}
                    className={`input row-header ${
                      !!vSetValidation?.errors.sebabKematianBayi
                        ? 'is-invalid'
                        : ''
                    }`}
                  />
                  {vSetValidation.touched.sebabKematianBayi &&
                    !!vSetValidation.errors.sebabKematianBayi && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.sebabKematianBayi}</div>
                      </FormFeedback>
                    )}
                </Col>
              </Row>
            </div>
            <div className="border-bottom">
              <Row className="gy-2">
                <Col lg={12}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Appearance :
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      1 Menit
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <CustomSelect
                    id="a1Menit"
                    name="a1Menit"
                    options={dataCombo.apgarA}
                    onChange={(e) => {
                      vSetValidation.setFieldValue('a1Menit', e?.value || '')
                      vSetValidation.setFieldValue('a1MenitScore', e?.score)
                      // onChange1MenitScore(e?.score)
                    }}
                    value={vSetValidation.values.a1Menit}
                    className={`input row-header ${
                      !!vSetValidation?.errors.a1Menit ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidation.touched.a1Menit &&
                    !!vSetValidation.errors.a1Menit && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.a1Menit}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      5 Menit
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <CustomSelect
                    id="a5Menit"
                    name="a5Menit"
                    options={dataCombo.apgarA}
                    onChange={(e) => {
                      vSetValidation.setFieldValue('a5Menit', e?.value || '')
                      vSetValidation.setFieldValue('a5MenitScore', e?.score)
                    }}
                    value={vSetValidation.values.a5Menit}
                    className={`input row-header ${
                      !!vSetValidation?.errors.a5Menit ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidation.touched.a5Menit &&
                    !!vSetValidation.errors.a5Menit && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.a5Menit}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      10 Menit
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <CustomSelect
                    id="a10Menit"
                    name="a10Menit"
                    options={dataCombo.apgarA}
                    onChange={(e) => {
                      vSetValidation.setFieldValue('a10Menit', e?.value || '')
                      vSetValidation.setFieldValue('a10MenitScore', e?.score)
                    }}
                    value={vSetValidation.values.a10Menit}
                    className={`input row-header ${
                      !!vSetValidation?.errors.a10Menit ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidation.touched.a10Menit &&
                    !!vSetValidation.errors.a10Menit && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.a10Menit}</div>
                      </FormFeedback>
                    )}
                </Col>
              </Row>
            </div>
            <div className="border-bottom">
              <Row className="gy-2">
                <Col lg={12}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Pulse (denyut jantung) :
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      1 Menit
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <CustomSelect
                    id="p1Menit"
                    name="p1Menit"
                    options={dataCombo.apgarP}
                    onChange={(e) => {
                      vSetValidation.setFieldValue('p1Menit', e?.value || '')
                      vSetValidation.setFieldValue('p1MenitScore', e?.score)
                    }}
                    value={vSetValidation.values.p1Menit}
                    className={`input row-header ${
                      !!vSetValidation?.errors.p1Menit ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidation.touched.p1Menit &&
                    !!vSetValidation.errors.p1Menit && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.p1Menit}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      5 Menit
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <CustomSelect
                    id="p5Menit"
                    name="p5Menit"
                    options={dataCombo.apgarP}
                    onChange={(e) => {
                      vSetValidation.setFieldValue('p5Menit', e?.value || '')
                      vSetValidation.setFieldValue('p5MenitScore', e?.score)
                    }}
                    value={vSetValidation.values.p5Menit}
                    className={`input row-header ${
                      !!vSetValidation?.errors.p5Menit ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidation.touched.p5Menit &&
                    !!vSetValidation.errors.p5Menit && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.p5Menit}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      10 Menit
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <CustomSelect
                    id="p10Menit"
                    name="p10Menit"
                    options={dataCombo.apgarP}
                    onChange={(e) => {
                      vSetValidation.setFieldValue('p10Menit', e?.value || '')
                      vSetValidation.setFieldValue('p10MenitScore', e?.score)
                    }}
                    value={vSetValidation.values.p10Menit}
                    className={`input row-header ${
                      !!vSetValidation?.errors.p10Menit ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidation.touched.p10Menit &&
                    !!vSetValidation.errors.p10Menit && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.p10Menit}</div>
                      </FormFeedback>
                    )}
                </Col>
              </Row>
            </div>
            <div className="border-bottom">
              <Row className="gy-2">
                <Col lg={12}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Grimace (refleks) :
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      1 Menit
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <CustomSelect
                    id="g1Menit"
                    name="g1Menit"
                    options={dataCombo.apgarG}
                    onChange={(e) => {
                      vSetValidation.setFieldValue('g1Menit', e?.value || '')
                      vSetValidation.setFieldValue('g1MenitScore', e?.score)
                    }}
                    value={vSetValidation.values.g1Menit}
                    className={`input row-header ${
                      !!vSetValidation?.errors.g1Menit ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidation.touched.g1Menit &&
                    !!vSetValidation.errors.g1Menit && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.g1Menit}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      5 Menit
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <CustomSelect
                    id="g5Menit"
                    name="g5Menit"
                    options={dataCombo.apgarG}
                    onChange={(e) => {
                      vSetValidation.setFieldValue('g5Menit', e?.value || '')
                      vSetValidation.setFieldValue('g5MenitScore', e?.score)
                    }}
                    value={vSetValidation.values.g5Menit}
                    className={`input row-header ${
                      !!vSetValidation?.errors.g5Menit ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidation.touched.g5Menit &&
                    !!vSetValidation.errors.g5Menit && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.g5Menit}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      10 Menit
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <CustomSelect
                    id="g10Menit"
                    name="g10Menit"
                    options={dataCombo.apgarG}
                    onChange={(e) => {
                      vSetValidation.setFieldValue('g10Menit', e?.value || '')
                      vSetValidation.setFieldValue('g10MenitScore', e?.score)
                    }}
                    value={vSetValidation.values.g10Menit}
                    className={`input row-header ${
                      !!vSetValidation?.errors.g10Menit ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidation.touched.g10Menit &&
                    !!vSetValidation.errors.g10Menit && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.g10Menit}</div>
                      </FormFeedback>
                    )}
                </Col>
              </Row>
            </div>
            <div className="border-bottom">
              <Row className="gy-2">
                <Col lg={12}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Activity (tonus otot) :
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      1 Menit
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <CustomSelect
                    id="ac1Menit"
                    name="ac1Menit"
                    options={dataCombo.apgarC}
                    onChange={(e) => {
                      vSetValidation.setFieldValue('ac1Menit', e?.value || '')
                      vSetValidation.setFieldValue('ac1MenitScore', e?.score)
                    }}
                    value={vSetValidation.values.ac1Menit}
                    className={`input row-header ${
                      !!vSetValidation?.errors.ac1Menit ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidation.touched.ac1Menit &&
                    !!vSetValidation.errors.ac1Menit && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.ac1Menit}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      5 Menit
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <CustomSelect
                    id="ac5Menit"
                    name="ac5Menit"
                    options={dataCombo.apgarC}
                    onChange={(e) => {
                      vSetValidation.setFieldValue('ac5Menit', e?.value || '')
                      vSetValidation.setFieldValue('ac5MenitScore', e?.score)
                    }}
                    value={vSetValidation.values.ac5Menit}
                    className={`input row-header ${
                      !!vSetValidation?.errors.ac5Menit ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidation.touched.ac5Menit &&
                    !!vSetValidation.errors.ac5Menit && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.ac5Menit}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      10 Menit
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <CustomSelect
                    id="ac10Menit"
                    name="ac10Menit"
                    options={dataCombo.apgarC}
                    onChange={(e) => {
                      vSetValidation.setFieldValue('ac10Menit', e?.value || '')
                      vSetValidation.setFieldValue('ac10MenitScore', e?.score)
                    }}
                    value={vSetValidation.values.ac10Menit}
                    className={`input row-header ${
                      !!vSetValidation?.errors.ac10Menit ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidation.touched.ac10Menit &&
                    !!vSetValidation.errors.ac10Menit && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.ac10Menit}</div>
                      </FormFeedback>
                    )}
                </Col>
              </Row>
            </div>
            <div className="border-bottom">
              <Row className="gy-2">
                <Col lg={12}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Respiration (pernapasan) :
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      1 Menit
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <CustomSelect
                    id="r1Menit"
                    name="r1Menit"
                    options={dataCombo.apgarR}
                    onChange={(e) => {
                      vSetValidation.setFieldValue('r1Menit', e?.value || '')
                      vSetValidation.setFieldValue('r1MenitScore', e?.score)
                    }}
                    value={vSetValidation.values.r1Menit}
                    className={`input row-header ${
                      !!vSetValidation?.errors.r1Menit ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidation.touched.r1Menit &&
                    !!vSetValidation.errors.r1Menit && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.r1Menit}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      5 Menit
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <CustomSelect
                    id="r5Menit"
                    name="r5Menit"
                    options={dataCombo.apgarR}
                    onChange={(e) => {
                      vSetValidation.setFieldValue('r5Menit', e?.value || '')
                      vSetValidation.setFieldValue('r5MenitScore', e?.score)
                    }}
                    value={vSetValidation.values.r5Menit}
                    className={`input row-header ${
                      !!vSetValidation?.errors.r5Menit ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidation.touched.r5Menit &&
                    !!vSetValidation.errors.r5Menit && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.r5Menit}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      10 Menit
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <CustomSelect
                    id="r10Menit"
                    name="r10Menit"
                    options={dataCombo.apgarR}
                    onChange={(e) => {
                      vSetValidation.setFieldValue('r10Menit', e?.value || '')
                      vSetValidation.setFieldValue('r10MenitScore', e?.score)
                    }}
                    value={vSetValidation.values.r10Menit}
                    className={`input row-header ${
                      !!vSetValidation?.errors.r10Menit ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidation.touched.r10Menit &&
                    !!vSetValidation.errors.r10Menit && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.r10Menit}</div>
                      </FormFeedback>
                    )}
                </Col>
              </Row>
            </div>
            <div className="border-bottom">
              <Row className="gy-2">
                <Col lg={12}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Total Apgar Score :
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      1 Menit
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <Input
                    id="total1Menit"
                    name="total1Menit"
                    type="text"
                    value={
                      vSetValidation.values.a1MenitScore +
                      vSetValidation.values.p1MenitScore +
                      vSetValidation.values.g1MenitScore +
                      vSetValidation.values.ac1MenitScore +
                      vSetValidation.values.r1MenitScore
                    }
                    onChange={(e) => {
                      vSetValidation.setFieldValue(
                        'total1Menit',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidation.touched?.total1Menit &&
                      !!vSetValidation.errors?.total1Menit
                    }
                    disabled
                  />
                  {vSetValidation.touched?.total1Menit &&
                    !!vSetValidation.errors.total1Menit && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.total1Menit}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      5 Menit
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <Input
                    id="total5Menit"
                    name="total5Menit"
                    type="text"
                    value={
                      vSetValidation.values.a5MenitScore +
                      vSetValidation.values.p5MenitScore +
                      vSetValidation.values.g5MenitScore +
                      vSetValidation.values.ac5MenitScore +
                      vSetValidation.values.r5MenitScore
                    }
                    onChange={(e) => {
                      vSetValidation.setFieldValue(
                        'total5Menit',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidation.touched?.total5Menit &&
                      !!vSetValidation.errors?.total5Menit
                    }
                    disabled
                  />
                  {vSetValidation.touched?.total5Menit &&
                    !!vSetValidation.errors.total5Menit && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.total5Menit}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      10 Menit
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <Input
                    id="total10Menit"
                    name="total10Menit"
                    type="text"
                    value={
                      vSetValidation.values.a10MenitScore +
                      vSetValidation.values.p10MenitScore +
                      vSetValidation.values.g10MenitScore +
                      vSetValidation.values.ac10MenitScore +
                      vSetValidation.values.r10MenitScore
                    }
                    onChange={(e) => {
                      vSetValidation.setFieldValue(
                        'total10Menit',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidation.touched?.total10Menit &&
                      !!vSetValidation.errors?.total10Menit
                    }
                    disabled
                  />
                  {vSetValidation.touched?.total10Menit &&
                    !!vSetValidation.errors.total10Menit && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.total10Menit}</div>
                      </FormFeedback>
                    )}
                </Col>
              </Row>
            </div>
            <div className="border-bottom">
              <Row className="gy-2">
                <Col lg={12}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Resusitasi :
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      T-Piece
                    </Label>
                  </div>
                </Col>
                <Col lg={4}>
                  <CustomSelect
                    id="piece"
                    name="piece"
                    options={dataYaTidak}
                    onChange={(e) => {
                      vSetValidation.setFieldValue('piece', e?.value || '')
                      if (e?.value === 2) {
                        setstatePiece(true)
                      } else {
                        setstatePiece(false)
                      }
                    }}
                    value={vSetValidation.values.piece}
                    className={`input row-header ${
                      !!vSetValidation?.errors.piece ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidation.touched.piece &&
                    !!vSetValidation.errors.piece && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.piece}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      durasi(menit)
                    </Label>
                  </div>
                </Col>
                <Col lg={4}>
                  <Input
                    id="pieceDurasi"
                    name="pieceDurasi"
                    type="text"
                    value={vSetValidation.values.pieceDurasi}
                    onChange={(e) => {
                      vSetValidation.setFieldValue(
                        'pieceDurasi',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidation.touched?.pieceDurasi &&
                      !!vSetValidation.errors?.pieceDurasi
                    }
                    disabled={statePiece}
                  />
                  {vSetValidation.touched?.pieceDurasi &&
                    !!vSetValidation.errors.pieceDurasi && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.pieceDurasi}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      O² Sungkup/Hidung
                    </Label>
                  </div>
                </Col>
                <Col lg={4}>
                  <CustomSelect
                    id="sungkup"
                    name="sungkup"
                    options={dataYaTidak}
                    onChange={(e) => {
                      vSetValidation.setFieldValue('sungkup', e?.value || '')
                      if (e?.value === 2) {
                        setstateSungkup(true)
                      } else {
                        setstateSungkup(false)
                      }
                    }}
                    value={vSetValidation.values.sungkup}
                    className={`input row-header ${
                      !!vSetValidation?.errors.sungkup ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidation.touched.sungkup &&
                    !!vSetValidation.errors.sungkup && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.sungkup}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      durasi(menit)
                    </Label>
                  </div>
                </Col>
                <Col lg={4}>
                  <Input
                    id="sungkupDurasi"
                    name="sungkupDurasi"
                    type="text"
                    value={vSetValidation.values.sungkupDurasi}
                    onChange={(e) => {
                      vSetValidation.setFieldValue(
                        'sungkupDurasi',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidation.touched?.sungkupDurasi &&
                      !!vSetValidation.errors?.sungkupDurasi
                    }
                    disabled={stateSungkup}
                  />
                  {vSetValidation.touched?.sungkupDurasi &&
                    !!vSetValidation.errors.sungkupDurasi && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.sungkupDurasi}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Pompa udara berulang
                    </Label>
                  </div>
                </Col>
                <Col lg={4}>
                  <CustomSelect
                    id="pompa"
                    name="pompa"
                    options={dataYaTidak}
                    onChange={(e) => {
                      vSetValidation.setFieldValue('pompa', e?.value || '')
                      if (e?.value === 2) {
                        setstatePompa(true)
                      } else {
                        setstatePompa(false)
                      }
                    }}
                    value={vSetValidation.values.pompa}
                    className={`input row-header ${
                      !!vSetValidation?.errors.pompa ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidation.touched.pompa &&
                    !!vSetValidation.errors.pompa && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.pompa}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      durasi(menit)
                    </Label>
                  </div>
                </Col>
                <Col lg={4}>
                  <Input
                    id="pompaDurasi"
                    name="pompaDurasi"
                    type="text"
                    value={vSetValidation.values.pompaDurasi}
                    onChange={(e) => {
                      vSetValidation.setFieldValue(
                        'pompaDurasi',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidation.touched?.pompaDurasi &&
                      !!vSetValidation.errors?.pompaDurasi
                    }
                    disabled={statePompa}
                  />
                  {vSetValidation.touched?.pompaDurasi &&
                    !!vSetValidation.errors.pompaDurasi && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.pompaDurasi}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Intubatic intratracheal
                    </Label>
                  </div>
                </Col>
                <Col lg={4}>
                  <CustomSelect
                    id="intubatic"
                    name="intubatic"
                    options={dataYaTidak}
                    onChange={(e) => {
                      vSetValidation.setFieldValue('intubatic', e?.value || '')
                      if (e?.value === 2) {
                        setstateIntubatic(true)
                      } else {
                        setstateIntubatic(false)
                      }
                    }}
                    value={vSetValidation.values.intubatic}
                    className={`input row-header ${
                      !!vSetValidation?.errors.intubatic ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidation.touched.intubatic &&
                    !!vSetValidation.errors.intubatic && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.intubatic}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      durasi(menit)
                    </Label>
                  </div>
                </Col>
                <Col lg={4}>
                  <Input
                    id="intubaticDurasi"
                    name="intubaticDurasi"
                    type="text"
                    value={vSetValidation.values.intubaticDurasi}
                    onChange={(e) => {
                      vSetValidation.setFieldValue(
                        'intubaticDurasi',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidation.touched?.intubaticDurasi &&
                      !!vSetValidation.errors?.intubaticDurasi
                    }
                    disabled={stateIntubatic}
                  />
                  {vSetValidation.touched?.intubaticDurasi &&
                    !!vSetValidation.errors.intubaticDurasi && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.intubaticDurasi}</div>
                      </FormFeedback>
                    )}
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="card-header-snb">
            <h4 className="card-title mb-0">Pemeriksaan Fisik</h4>
          </CardHeader>
          <CardBody>
            <Row className="gy-2">
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Kulit
                  </Label>
                </div>
              </Col>
              <Col lg={2}>
                <Input
                  id="kulit"
                  name="kulit"
                  type="textarea"
                  value={vSetValidation.values.kulit}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('kulit', e.target.value)
                  }}
                  invalid={
                    vSetValidation.touched?.kulit &&
                    !!vSetValidation.errors?.kulit
                  }
                />
                {vSetValidation.touched?.kulit &&
                  !!vSetValidation.errors.kulit && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.kulit}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    THT
                  </Label>
                </div>
              </Col>
              <Col lg={2}>
                <Input
                  id="tht"
                  name="tht"
                  type="textarea"
                  value={vSetValidation.values.tht}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('tht', e.target.value)
                  }}
                  invalid={
                    vSetValidation.touched?.tht && !!vSetValidation.errors?.tht
                  }
                />
                {vSetValidation.touched?.tht && !!vSetValidation.errors.tht && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.tht}</div>
                  </FormFeedback>
                )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Mulut
                  </Label>
                </div>
              </Col>
              <Col lg={2}>
                <Input
                  id="mulut"
                  name="mulut"
                  type="textarea"
                  value={vSetValidation.values.mulut}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('mulut', e.target.value)
                  }}
                  invalid={
                    vSetValidation.touched?.mulut &&
                    !!vSetValidation.errors?.mulut
                  }
                />
                {vSetValidation.touched?.mulut &&
                  !!vSetValidation.errors.mulut && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.mulut}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Leher
                  </Label>
                </div>
              </Col>
              <Col lg={2}>
                <Input
                  id="leher"
                  name="leher"
                  type="textarea"
                  value={vSetValidation.values.leher}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('leher', e.target.value)
                  }}
                  invalid={
                    vSetValidation.touched?.leher &&
                    !!vSetValidation.errors?.leher
                  }
                />
                {vSetValidation.touched?.leher &&
                  !!vSetValidation.errors.leher && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.leher}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Dada
                  </Label>
                </div>
              </Col>
              <Col lg={2}>
                <Input
                  id="dada"
                  name="dada"
                  type="textarea"
                  value={vSetValidation.values.dada}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('dada', e.target.value)
                  }}
                  invalid={
                    vSetValidation.touched?.dada &&
                    !!vSetValidation.errors?.dada
                  }
                />
                {vSetValidation.touched?.dada &&
                  !!vSetValidation.errors.dada && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.dada}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Paru
                  </Label>
                </div>
              </Col>
              <Col lg={2}>
                <Input
                  id="paru"
                  name="paru"
                  type="textarea"
                  value={vSetValidation.values.paru}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('paru', e.target.value)
                  }}
                  invalid={
                    vSetValidation.touched?.paru &&
                    !!vSetValidation.errors?.paru
                  }
                />
                {vSetValidation.touched?.paru &&
                  !!vSetValidation.errors.paru && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.paru}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Jantung
                  </Label>
                </div>
              </Col>
              <Col lg={2}>
                <Input
                  id="jantung"
                  name="jantung"
                  type="textarea"
                  value={vSetValidation.values.jantung}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('jantung', e.target.value)
                  }}
                  invalid={
                    vSetValidation.touched?.jantung &&
                    !!vSetValidation.errors?.jantung
                  }
                />
                {vSetValidation.touched?.jantung &&
                  !!vSetValidation.errors.jantung && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.jantung}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Abdomen
                  </Label>
                </div>
              </Col>
              <Col lg={2}>
                <Input
                  id="abdomen"
                  name="abdomen"
                  type="textarea"
                  value={vSetValidation.values.abdomen}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('abdomen', e.target.value)
                  }}
                  invalid={
                    vSetValidation.touched?.abdomen &&
                    !!vSetValidation.errors?.abdomen
                  }
                />
                {vSetValidation.touched?.abdomen &&
                  !!vSetValidation.errors.abdomen && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.abdomen}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Genitalia
                  </Label>
                </div>
              </Col>
              <Col lg={2}>
                <Input
                  id="genitalia"
                  name="genitalia"
                  type="textarea"
                  value={vSetValidation.values.genitalia}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('genitalia', e.target.value)
                  }}
                  invalid={
                    vSetValidation.touched?.genitalia &&
                    !!vSetValidation.errors?.genitalia
                  }
                />
                {vSetValidation.touched?.genitalia &&
                  !!vSetValidation.errors.genitalia && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.genitalia}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Anus
                  </Label>
                </div>
              </Col>
              <Col lg={2}>
                <Input
                  id="anus"
                  name="anus"
                  type="textarea"
                  value={vSetValidation.values.anus}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('anus', e.target.value)
                  }}
                  invalid={
                    vSetValidation.touched?.anus &&
                    !!vSetValidation.errors?.anus
                  }
                />
                {vSetValidation.touched?.anus &&
                  !!vSetValidation.errors.anus && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.anus}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Extremitas Atas
                  </Label>
                </div>
              </Col>
              <Col lg={2}>
                <Input
                  id="extremitasAtas"
                  name="extremitasAtas"
                  type="textarea"
                  value={vSetValidation.values.extremitasAtas}
                  onChange={(e) => {
                    vSetValidation.setFieldValue(
                      'extremitasAtas',
                      e.target.value
                    )
                  }}
                  invalid={
                    vSetValidation.touched?.extremitasAtas &&
                    !!vSetValidation.errors?.extremitasAtas
                  }
                />
                {vSetValidation.touched?.extremitasAtas &&
                  !!vSetValidation.errors.extremitasAtas && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.extremitasAtas}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Extremitas Bawah
                  </Label>
                </div>
              </Col>
              <Col lg={2}>
                <Input
                  id="extremitasBawah"
                  name="extremitasBawah"
                  type="textarea"
                  value={vSetValidation.values.extremitasBawah}
                  onChange={(e) => {
                    vSetValidation.setFieldValue(
                      'extremitasBawah',
                      e.target.value
                    )
                  }}
                  invalid={
                    vSetValidation.touched?.extremitasBawah &&
                    !!vSetValidation.errors?.extremitasBawah
                  }
                />
                {vSetValidation.touched?.extremitasBawah &&
                  !!vSetValidation.errors.extremitasBawah && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.extremitasBawah}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Refleks Hisap
                  </Label>
                </div>
              </Col>
              <Col lg={2}>
                <Input
                  id="reflekHisap"
                  name="reflekHisap"
                  type="textarea"
                  value={vSetValidation.values.reflekHisap}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('reflekHisap', e.target.value)
                  }}
                  invalid={
                    vSetValidation.touched?.reflekHisap &&
                    !!vSetValidation.errors?.reflekHisap
                  }
                />
                {vSetValidation.touched?.reflekHisap &&
                  !!vSetValidation.errors.reflekHisap && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.reflekHisap}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Pengeluaran Air Keruh
                  </Label>
                </div>
              </Col>
              <Col lg={2}>
                <Input
                  id="pengeluaranAirKeruh"
                  name="pengeluaranAirKeruh"
                  type="textarea"
                  value={vSetValidation.values.pengeluaranAirKeruh}
                  onChange={(e) => {
                    vSetValidation.setFieldValue(
                      'pengeluaranAirKeruh',
                      e.target.value
                    )
                  }}
                  invalid={
                    vSetValidation.touched?.pengeluaranAirKeruh &&
                    !!vSetValidation.errors?.pengeluaranAirKeruh
                  }
                />
                {vSetValidation.touched?.pengeluaranAirKeruh &&
                  !!vSetValidation.errors.pengeluaranAirKeruh && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.pengeluaranAirKeruh}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Pengeluaran Mekoneum
                  </Label>
                </div>
              </Col>
              <Col lg={2}>
                <Input
                  id="pengeluaranMekoneum"
                  name="pengeluaranMekoneum"
                  type="textarea"
                  value={vSetValidation.values.pengeluaranMekoneum}
                  onChange={(e) => {
                    vSetValidation.setFieldValue(
                      'pengeluaranMekoneum',
                      e.target.value
                    )
                  }}
                  invalid={
                    vSetValidation.touched?.pengeluaranMekoneum &&
                    !!vSetValidation.errors?.pengeluaranMekoneum
                  }
                />
                {vSetValidation.touched?.pengeluaranMekoneum &&
                  !!vSetValidation.errors.pengeluaranMekoneum && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.pengeluaranMekoneum}</div>
                    </FormFeedback>
                  )}
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="card-header-snb">
            <h4 className="card-title mb-0">Pemeriksaan Laboratorium</h4>
          </CardHeader>
          <CardBody>
            <Row className="gy-2">
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Pemeriksaan Laboratorium
                  </Label>
                </div>
              </Col>
              <Col lg={10}>
                <Input
                  id="pemeriksaanLaboratorium"
                  name="pemeriksaanLaboratorium"
                  type="textarea"
                  value={vSetValidation.values.pemeriksaanLaboratorium}
                  onChange={(e) => {
                    vSetValidation.setFieldValue(
                      'pemeriksaanLaboratorium',
                      e.target.value
                    )
                  }}
                  invalid={
                    vSetValidation.touched?.pemeriksaanLaboratorium &&
                    !!vSetValidation.errors?.pemeriksaanLaboratorium
                  }
                  placeholder="Isi pemeriksaan Laboratorium"
                />
                {vSetValidation.touched?.pemeriksaanLaboratorium &&
                  !!vSetValidation.errors.pemeriksaanLaboratorium && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.pemeriksaanLaboratorium}</div>
                    </FormFeedback>
                  )}
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="card-header-snb">
            <h4 className="card-title mb-0">Diagnosa Kerja</h4>
          </CardHeader>
          <CardBody>
            <Row className="gy-2">
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Diagnosa Kerja
                  </Label>
                </div>
              </Col>
              <Col lg={10}>
                <Input
                  id="diagnosaKerja"
                  name="diagnosaKerja"
                  type="textarea"
                  value={vSetValidation.values.diagnosaKerja}
                  onChange={(e) => {
                    vSetValidation.setFieldValue(
                      'diagnosaKerja',
                      e.target.value
                    )
                  }}
                  invalid={
                    vSetValidation.touched?.diagnosaKerja &&
                    !!vSetValidation.errors?.diagnosaKerja
                  }
                  placeholder="Isi diagnosa kerja"
                />
                {vSetValidation.touched?.diagnosaKerja &&
                  !!vSetValidation.errors.diagnosaKerja && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.diagnosaKerja}</div>
                    </FormFeedback>
                  )}
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="card-header-snb">
            <h4 className="card-title mb-0">Penatalaksanaan</h4>
          </CardHeader>
          <CardBody>
            <Row className="gy-2">
              <Col lg={2}>
                <div className="mt-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor="unitlast"
                    className="form-label"
                  >
                    Penatalaksanaan
                  </Label>
                </div>
              </Col>
              <Col lg={10}>
                <Input
                  id="pentalakaksanaan"
                  name="pentalakaksanaan"
                  type="textarea"
                  value={vSetValidation.values.pentalakaksanaan}
                  onChange={(e) => {
                    vSetValidation.setFieldValue(
                      'pentalakaksanaan',
                      e.target.value
                    )
                  }}
                  invalid={
                    vSetValidation.touched?.pentalakaksanaan &&
                    !!vSetValidation.errors?.pentalakaksanaan
                  }
                  placeholder="Isi penatalaksanaan"
                />
                {vSetValidation.touched?.pentalakaksanaan &&
                  !!vSetValidation.errors.pentalakaksanaan && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.pentalakaksanaan}</div>
                    </FormFeedback>
                  )}
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Col lg={12} className="mr-3 me-3 mt-2">
          <div className="d-flex flex-wrap justify-content-center gap-2">
            <Button type="submit" color="success">
              Simpan
            </Button>
            <Button
              type="button"
              color="danger"
              // onClick={() => { handleBack() }}
            >
              Batal
            </Button>
          </div>
        </Col>
      </Form>
    </React.Fragment>
  )
}

export default AsesmenBayiBaruLahir
