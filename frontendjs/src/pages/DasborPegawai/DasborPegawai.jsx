import { ToastContainer } from 'react-toastify'
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormFeedback,
  Row,
} from 'reactstrap'
import HorizontalLayout from '../../Layouts/HorizontalLayout'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import './DasborPegawai.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import KontainerFlatpickr from '../../Components/KontainerFlatpickr/KontainerFlatpickr'
import CustomSelect from '../Select/Select'
import { useEffect, useState } from 'react'
import { Link } from 'feather-icons-react/build/IconComponents'
import CountUp from 'react-countup'
import ReactApexChart from 'react-apexcharts'
import getChartColorsArray from '../../Components/Common/ChartsDynamicColor'
import { dateLocal } from '../../utils/format'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../Components/Table/LoadingTable'
import NoDataTable from '../../Components/Table/NoDataTable'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import {
  getPegawaiPensiun,
  getStatusPegawai,
  setStatusPegawai,
} from '../../store/eis/action'
import { HeaderDashboard } from '../DasborUtama/DasborUtama'
import DokterUmum from './total-dokter-umum.png'
import Pegawai from './total-pegawai.svg'
import PenunjangMedis from './total-penunjang-medis.svg'
import Perawat from './total-perawat.svg'
import Spesialis from './total-spesialis.svg'
import { ModalStatusPegawai } from './DasborPegawaiModal'
import { colors } from '../DasborUtama/colors'
import { tableCustomStyles } from '../../Components/Table/tableCustomStyles'

const DasborPegawai = () => {
  const [dateToday] = useState(() => new Date().toISOString())
  const dispatch = useDispatch()
  const vFilter = useFormik({
    initialValues: {
      tanggal: '',
      tanggalmulai: dateToday,
      tanggalselesai: dateToday,
      carabayar: '',
    },
    onSubmit: (values, { resetForm }) => {},
  })

  useEffect(() => {
    dispatch(getStatusPegawai())
    dispatch(getPegawaiPensiun())
  }, [vFilter.initialValues, dispatch])

  return (
    <div className="page-content page-dasbor-eis-utama">
      <BreadCrumb
        title="Dasbor Pegawai"
        pageTitle="Dasbor EIS"
        className="bc-dasbor-eis"
      />
      <ToastContainer closeButton={false} />
      <HeaderDashboard />
      <ModalStatusPegawai />
      <Container fluid className="ps-3 pe-3 mt-3">
        <PegawaiTotal />
        <Row>
          <Col lg={4}>
            <StatusPegawai />
          </Col>
          <Col lg={2}>
            <JenisKelamin />
          </Col>
          <Col lg={6}>
            <NegativeGender />
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <StrukturalPegawai />
          </Col>
          <Col lg={6}>
            <PendidikanPegawai />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <FungsionalPegawai />
          </Col>
          <Col lg={12}>
            <SpesialisasiPegawai />
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <PegawaiPensiun />
          </Col>
          <Col lg={6}>
            <PegawaiSIP />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const PegawaiTotal = () => {
  const dispatch = useDispatch()
  const {
    countPegawai,
    countSpesialis,
    countDokterUmum,
    countPerawatBidan,
    countPenunjangMedis,
  } = useSelector((state) => state.Eis.getStatusPegawai.data)
  const tileBoxs2 = [
    {
      id: 1,
      label: 'Total Pegawai',
      badge: 'ri-more-2-fill',
      icon: Pegawai,
      counter: countPegawai?.jumlah || 0,
      decimals: 0,
      suffix: '',
      separator: '.',
      prefix: '',
      onClick: () =>
        dispatch(setStatusPegawai('Pegawai', countPegawai?.pegawai || [])),
    },
    {
      id: 2,
      label: 'Dokter Spesialis',
      badge: 'ri-more-2-fill',
      icon: Spesialis,
      counter: countSpesialis?.jumlah || 0,
      decimals: 0,
      separator: '.',
      suffix: '',
      prefix: '',
      onClick: () =>
        dispatch(
          setStatusPegawai('Dokter Spesialis', countSpesialis?.pegawai || [])
        ),
    },
    {
      id: 3,
      label: 'Dokter Umum',
      badge: 'ri-more-2-fill',
      icon: DokterUmum,
      counter: countDokterUmum?.jumlah || 0,
      separator: '.',
      decimals: 0,
      suffix: '',
      prefix: '',
      onClick: () =>
        dispatch(
          setStatusPegawai('Dokter Umum', countDokterUmum?.pegawai || [])
        ),
    },
    {
      id: 4,
      label: 'Perawat & Bidan',
      badge: 'ri-more-2-fill',
      icon: Perawat,
      counter: countPerawatBidan?.jumlah || 0,
      decimals: 0,
      prefix: '',
      separator: '.',
      suffix: '',
      onClick: () =>
        dispatch(
          setStatusPegawai('Perawat & Bidan', countPerawatBidan?.pegawai || [])
        ),
    },
    {
      id: 5,
      label: 'Penunjang Medis',
      badge: 'ri-more-2-fill',
      icon: PenunjangMedis,
      counter: countPenunjangMedis?.jumlah || 0,
      decimals: 0,
      separator: '.',
      suffix: '',
      prefix: '',
      onClick: () =>
        dispatch(
          setStatusPegawai(
            'Penunjang Medis',
            countPenunjangMedis?.pegawai || []
          )
        ),
    },
  ]
  return (
    <Row>
      <Col xl={12}>
        <Card className="crm-widget">
          <CardBody className="p-0">
            <Row className="row-cols-md-3 row-cols-1">
              {tileBoxs2.map((item, key) => (
                <Col
                  className={item.id === 4 ? 'col-lg' : 'col-lg border-end'}
                  key={key}
                  onClick={() => {
                    item.onClick && item.onClick()
                  }}
                >
                  <div className="mt-3 mt-md-0 py-4 px-3">
                    <h5 className="text-muted text-uppercase fs-13">
                      {item.label}{' '}
                      <i
                        className={'fs-18 float-end align-middle ' + item.badge}
                      ></i>
                    </h5>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <img className="gbr-widget" alt="" src={item.icon} />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h2 className="mb-0">
                          <span className="counter-value">
                            <CountUp
                              start={0}
                              prefix={item.prefix}
                              suffix={item.suffix}
                              separator={item.separator}
                              end={item.counter}
                              decimals={item.decimals}
                              duration={4}
                            />
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

const StatusPegawai = () => {
  const dispatch = useDispatch()
  const countStatus = useSelector(
    (state) => state.Eis.getStatusPegawai.data?.countStatus || []
  )
  const labels = countStatus.map((c) => c.label)
  const series = countStatus.map((c) => c.jumlah)
  const seriesStatus = countStatus.map((c) => c.pegawai)

  const options = {
    chart: {
      height: 300,
      type: 'pie',
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const dIndex = config.dataPointIndex
          const data = seriesStatus[dIndex]
          const name = 'Status Pegawai ' + labels[dIndex]
          data && dispatch(setStatusPegawai(name, data))
        },
      },
    },
    labels: labels,
    legend: {
      position: 'bottom',
    },
    dataLabels: {
      dropShadow: {
        enabled: false,
      },
    },
    colors: [
      '#038edc',
      '#51d28c',
      '#f7cc53',
      '#f34e4e',
      '#564ab1',
      '#5fd0f3',
      '#DC0303',
      '#CB03DC',
      '#655B96',
      '#DCB903',
      '#48DC03',
      '#E67E22',
      '#FD32B0',
      '#0340DC',
      '#8ADC03',
    ],
  }
  return (
    <Card className="p-3" style={{ height: 500 }}>
      <Row className="mb-5">
        <Col lg={12}>
          <h4>Status Pegawai</h4>
        </Col>
      </Row>
      <ReactApexChart
        dir="ltr"
        className="apex-charts"
        series={series}
        options={options}
        type="pie"
        height={350}
      />
    </Card>
  )
}

const JenisKelamin = () => {
  const dispatch = useDispatch()
  const jenisKelamin = useSelector(
    (state) => state.Eis.getStatusPegawai.data?.countJenisKelamin || []
  )
  const jenisKelaminTotal = jenisKelamin.map((jen) => jen.jumlah)
  const jenisKelaminNama = jenisKelamin.map((jen) => jen.label)
  const jenisKelaminData = jenisKelamin.map((jen) => jen.pegawai || [])
  const series = [
    {
      name: 'Total Pegawai',
      data: jenisKelaminTotal,
      dataComplete: jenisKelaminData,
    },
  ]
  let options = {
    chart: {
      height: 350,
      type: 'bar',
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const sIndex = config.seriesIndex
          const dIndex = config.dataPointIndex
          const data = series[sIndex].dataComplete[dIndex]
          const name = 'Jenis Kelamin ' + jenisKelaminNama[dIndex]
          data && dispatch(setStatusPegawai(name, data))
        },
      },
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: jenisKelaminNama,
      labels: {
        style: {
          colors: [
            '#038edc',
            '#51d28c',
            '#f7cc53',
            '#f34e4e',
            '#564ab1',
            '#5fd0f3',
            '#DC0303',
            '#CB03DC',
            '#655B96',
            '#DCB903',
            '#48DC03',
            '#E67E22',
            '#FD32B0',
            '#0340DC',
            '#8ADC03',
          ],
          fontSize: '12px',
        },
      },
    },
  }

  return (
    <Card className="p-3" style={{ height: 500 }}>
      <Row className="mb-3">
        <Col lg={12}>
          <h4>Jenis Kelamin</h4>
        </Col>
      </Row>
      <Row>
        <ReactApexChart
          dir="ltr"
          className="apex-charts"
          series={series}
          options={options}
          type="bar"
          height={350}
        />
      </Row>
    </Card>
  )
}

const NegativeGender = () => {
  const dataColors = '["--vz-primary", "--vz-success"]'
  var chartNegativeBarColors = getChartColorsArray(dataColors)

  let arUsia = useSelector(
    (state) => state.Eis.getStatusPegawai.data.arUsiaPegawai || []
  )
  arUsia = arUsia.reverse()

  const arLaki = [...arUsia].filter((us) => us.gender === 'L')
  const arPerempuan = [...arUsia].filter((us) => us.gender === 'P')

  const ageLabel = arLaki.map((la) => `${la.ageStart} - ${la.ageEnd}`)
  const dataLaki = arLaki.map((data) => data.total)
  const dataPerempuan = arPerempuan.map((data) => -data.total)

  const series = [
    {
      name: 'L',
      data: dataLaki,
    },
    {
      name: 'P',
      data: dataPerempuan,
    },
  ]

  const categories = ageLabel

  const options = {
    chart: {
      type: 'bar',
      height: 360,
      stacked: !0,
      toolbar: {
        show: !1,
      },
    },
    colors: chartNegativeBarColors,
    plotOptions: {
      bar: {
        horizontal: !0,
        barHeight: '80%',
      },
    },
    dataLabels: {
      enabled: !1,
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },

    grid: {
      xaxis: {
        lines: {
          show: !1,
        },
      },
    },
    yaxis: {
      min: -5,
      max: 5,
      title: {
        text: 'Umur',
        style: {
          fontWeight: 600,
        },
      },
    },
    tooltip: {
      shared: !1,
      x: {
        formatter: function (val) {
          return val
        },
      },
      y: {
        formatter: function (val) {
          return Math.abs(val) + '%'
        },
      },
    },
    title: {
      // text: '',
      style: {
        fontWeight: 600,
      },
    },
    xaxis: {
      categories: categories,
      title: {
        text: 'Percent',
      },
      labels: {
        formatter: function (val) {
          return Math.abs(Math.round(val)) + '%'
        },
      },
    },
  }

  return (
    <Card className="p-3" style={{ height: 500 }}>
      <Row className="mb-1">
        <Col lg={12}>
          <h4>Kategori Usia</h4>
        </Col>
      </Row>
      <ReactApexChart
        dir="ltr"
        className="apex-charts"
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </Card>
  )
}

const StrukturalPegawai = () => {
  const dispatch = useDispatch()
  const countJabatan = useSelector(
    (state) => state.Eis.getStatusPegawai.data?.countJabatan || []
  )
  const labels = countJabatan.map((c) => c.label)
  const series = countJabatan.map((c) => c.jumlah)
  const pegawai = countJabatan.map((c) => c.pegawai)
  let options = {
    chart: {
      height: 300,
      type: 'pie',
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const dIndex = config.dataPointIndex
          const data = pegawai[dIndex]
          const name = 'Status Pegawai ' + labels[dIndex]
          data && dispatch(setStatusPegawai(name, data))
        },
      },
    },
    labels: labels,
    legend: {
      position: 'bottom',
    },
    dataLabels: {
      dropShadow: {
        enabled: false,
      },
    },
    colors: [
      '#038edc',
      '#51d28c',
      '#f7cc53',
      '#f34e4e',
      '#564ab1',
      '#5fd0f3',
      '#DC0303',
      '#CB03DC',
      '#655B96',
      '#DCB903',
      '#48DC03',
      '#E67E22',
      '#FD32B0',
      '#0340DC',
      '#8ADC03',
    ],
  }
  return (
    <Card className="p-3" style={{ height: 500 }}>
      <Row className="mb-5">
        <Col lg={12}>
          <h4>Struktural Pegawai</h4>
        </Col>
      </Row>
      <ReactApexChart
        dir="ltr"
        className="apex-charts"
        series={series}
        options={options}
        type="pie"
        height={350}
      />
    </Card>
  )
}

const PendidikanPegawai = () => {
  const dispatch = useDispatch()
  const countPendidikan = useSelector(
    (state) => state.Eis.getStatusPegawai.data?.countPendidikanTerakhir || []
  )
  const labels = countPendidikan.map((c) => c.label)
  const series = countPendidikan.map((c) => c.jumlah)
  const pegawai = countPendidikan.map((c) => c.pegawai)

  let options = {
    chart: {
      height: 300,
      type: 'pie',
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const dIndex = config.dataPointIndex
          const data = pegawai[dIndex]
          const name = 'Pendidikan Pegawai ' + labels[dIndex]
          data && dispatch(setStatusPegawai(name, data))
        },
      },
    },
    labels: labels,
    legend: {
      position: 'bottom',
    },
    dataLabels: {
      dropShadow: {
        enabled: false,
      },
    },
    colors: [
      '#038edc',
      '#51d28c',
      '#f7cc53',
      '#f34e4e',
      '#564ab1',
      '#5fd0f3',
      '#DC0303',
      '#CB03DC',
      '#655B96',
      '#DCB903',
      '#48DC03',
      '#E67E22',
      '#FD32B0',
      '#0340DC',
      '#8ADC03',
    ],
  }
  return (
    <Card className="p-3" style={{ height: 500 }}>
      <Row className="mb-5">
        <Col lg={12}>
          <h4>Pendidikan Pegawai</h4>
        </Col>
      </Row>
      <ReactApexChart
        dir="ltr"
        className="apex-charts"
        series={series}
        options={options}
        type="pie"
        height={350}
      />
    </Card>
  )
}

const FungsionalPegawai = () => {
  const dispatch = useDispatch()
  const profesi = useSelector(
    (state) => state.Eis.getStatusPegawai.data?.countProfesi || []
  )
  const profesiJumlah = profesi.map((prof) => prof.jumlah)
  const profesiLabel = profesi.map((prof) => prof.label.split(' '))
  const pegawai = profesi.map((prof) => prof.pegawai)
  const series = [
    {
      name: 'Total Pegawai',
      data: profesiJumlah,
      dataComplete: pegawai,
    },
  ]
  let options = {
    chart: {
      height: 350,
      type: 'bar',
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const sIndex = config.seriesIndex
          const dIndex = config.dataPointIndex
          const data = series[sIndex].dataComplete[dIndex]
          const name = 'Profesi Pegawai ' + profesiLabel[dIndex]
          data && dispatch(setStatusPegawai(name, data))
        },
      },
    },
    colors: [
      '#038edc',
      '#51d28c',
      '#f7cc53',
      '#f34e4e',
      '#564ab1',
      '#5fd0f3',
      '#DC0303',
      '#CB03DC',
      '#655B96',
      '#DCB903',
      '#48DC03',
      '#E67E22',
      '#FD32B0',
      '#0340DC',
      '#8ADC03',
    ],
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: profesiLabel,
      labels: {
        style: {
          colors: [
            '#038edc',
            '#51d28c',
            '#f7cc53',
            '#f34e4e',
            '#564ab1',
            '#5fd0f3',
            '#DC0303',
            '#CB03DC',
            '#655B96',
            '#DCB903',
            '#48DC03',
            '#E67E22',
            '#FD32B0',
            '#0340DC',
            '#8ADC03',
          ],
          fontSize: '12px',
        },
      },
    },
  }

  return (
    <Card className="p-3" style={{ height: 500 }}>
      <Row className="mb-3">
        <Col lg={12}>
          <h4>Fungsional Pegawai</h4>
        </Col>
      </Row>
      <Row>
        <ReactApexChart
          dir="ltr"
          className="apex-charts"
          series={series}
          options={options}
          type="bar"
          height={350}
        />
      </Row>
    </Card>
  )
}

const SpesialisasiPegawai = () => {
  const dispatch = useDispatch()
  const spesialisasi = useSelector(
    (state) => state.Eis.getStatusPegawai.data?.countSpesialisasi || []
  )
  const spesialisasiJumlah = spesialisasi.map((prof) => prof.jumlah)
  const spesialisasiLabel = spesialisasi.map((prof) => prof.label)
  const pegawai = spesialisasi.map((prof) => prof.pegawai)

  const series = [
    {
      name: 'Total Pegawai',
      data: spesialisasiJumlah,
      dataComplete: pegawai,
    },
  ]
  let options = {
    chart: {
      height: 350,
      type: 'bar',
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const sIndex = config.seriesIndex
          const dIndex = config.dataPointIndex
          const data = series[sIndex].dataComplete[dIndex]
          const name = 'Profesi Pegawai ' + spesialisasiLabel[dIndex]
          data && dispatch(setStatusPegawai(name, data))
        },
      },
    },
    colors: [
      '#038edc',
      '#51d28c',
      '#f7cc53',
      '#f34e4e',
      '#564ab1',
      '#5fd0f3',
      '#DC0303',
      '#CB03DC',
      '#655B96',
      '#DCB903',
      '#48DC03',
      '#E67E22',
      '#FD32B0',
      '#0340DC',
      '#8ADC03',
    ],
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: spesialisasiLabel,
      labels: {
        style: {
          colors: [
            '#038edc',
            '#51d28c',
            '#f7cc53',
            '#f34e4e',
            '#564ab1',
            '#5fd0f3',
            '#DC0303',
            '#CB03DC',
            '#655B96',
            '#DCB903',
            '#48DC03',
            '#E67E22',
            '#FD32B0',
            '#0340DC',
            '#8ADC03',
          ],
          fontSize: '12px',
        },
      },
    },
  }

  return (
    <Card className="p-3" style={{ height: 500 }}>
      <Row className="mb-3">
        <Col lg={12}>
          <h4>Spesialisasi Pegawai</h4>
        </Col>
      </Row>
      <Row>
        <ReactApexChart
          dir="ltr"
          className="apex-charts"
          series={series}
          options={options}
          type="bar"
          height={350}
        />
      </Row>
    </Card>
  )
}

const PegawaiPensiun = () => {
  const pegawaiPensiun = useSelector(
    (state) => state.Eis.getPegawaiPensiun.data.pegawaiPensiun || []
  )
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Nama Pegawai</span>,
      sortable: true,
      selector: (row) => row.namalengkap,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tanggal Lahir</span>,
      selector: (row) => dateLocal(row.tgllahir),
      sortable: true,
      width: '120px',
    },

    {
      name: <span className="font-weight-bold fs-13">Unit</span>,
      sortable: true,
      selector: (row) => row.namaunit,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tanggal Pensiun</span>,
      sortable: true,
      selector: (row) => dateLocal(row.tglpensiun),
      width: '120px',
    },
  ]

  return (
    <Card className="p-3" style={{ height: 500 }}>
      <Row className="mb-3">
        <Col lg={12}>
          <h4>Pegawai Pensiun</h4>
        </Col>
      </Row>
      <DataTable
        fixedHeader
        columns={columnsDetail}
        pagination
        paginationPerPage={5}
        data={pegawaiPensiun}
        progressPending={false}
        customStyles={tableCustomStyles}
        progressComponent={<LoadingTable />}
        noDataComponent={<NoDataTable />}
      />
    </Card>
  )
}

const PegawaiSIP = () => {
  const pegawaiPensiun = useSelector(
    (state) => state.Eis.getPegawaiPensiun.data.pegawaiSIP || []
  )
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Nama Pegawai</span>,
      sortable: true,
      selector: (row) => row.namalengkap,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Profesi</span>,
      selector: (row) => row.profesi,
      sortable: true,
      width: '120px',
    },

    {
      name: <span className="font-weight-bold fs-13">Unit</span>,
      sortable: true,
      selector: (row) => row.namaunit,
      width: '100px',
    },
    {
      name: (
        <span className="font-weight-bold fs-13">Tanggal Berakhir SIP</span>
      ),
      sortable: true,
      selector: (row) => dateLocal(row.tglberakhirsip),
      width: '150px',
    },
  ]

  return (
    <Card className="p-3" style={{ height: 500 }}>
      <Row className="mb-3">
        <Col lg={12}>
          <h4>Pegawai SIP</h4>
        </Col>
      </Row>
      <DataTable
        fixedHeader
        columns={columnsDetail}
        pagination
        paginationPerPage={5}
        data={pegawaiPensiun}
        progressPending={false}
        customStyles={tableCustomStyles}
        progressComponent={<LoadingTable />}
        noDataComponent={<NoDataTable />}
      />
    </Card>
  )
}

export default DasborPegawai
