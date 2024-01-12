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
import './DasborUtama.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import KontainerFlatpickr from '../../Components/KontainerFlatpickr/KontainerFlatpickr'
import CustomSelect from '../Select/Select'
import { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import ReactApexChart from 'react-apexcharts'
import getChartColorsArray from '../../Components/Common/ChartsDynamicColor'
import { dateLocal } from '../../utils/format'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../Components/Table/LoadingTable'
import NoDataTable from '../../Components/Table/NoDataTable'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import {
  getCountCaraBayar,
  getCountUnit,
  getPasienIGD,
  getPasienRJ,
  getPasienRanap,
  getPoliklinikTerbanyak,
  setPasienBayar,
  setPasienGadar,
  setPasienPoliklinik,
  setPasienRajal,
  setPasienRanap,
  setWidgetUtama,
  getIndikatorPelayananRS
} from '../../store/eis/action'
import { Link } from 'react-router-dom'
import { colors } from './colors'
import {
  ModalPasienCaraBayar,
  ModalPasienGaDar,
  ModalPasienRajal,
  ModalPasienRanap,
  ModalPoliklinik,
  ModalWidgetUtama,
} from './DasborUtamaModal'
import { tableCustomStyles } from '../../Components/Table/tableCustomStyles'

const DashboardUtama = () => {
  const [dateToday] = useState(() => new Date().toISOString())
  const [dateStart] = useState(() => {
    let d = new Date()
    d.setMonth(d.getMonth() - 1)
    return d.toISOString()
  })

  const dispatch = useDispatch()
  const vFilter = useFormik({
    initialValues: {
      tanggal: '',
      tanggalmulai: dateStart,
      tanggalselesai: dateToday,
      carabayar: CaraBayarValue[0].value,
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(getPasienRJ(values))
      dispatch(getPasienIGD(values))
      dispatch(getPasienRanap(values))
      dispatch(getCountCaraBayar(values))
      dispatch(getPoliklinikTerbanyak(values))
      dispatch(getCountUnit(values))
      dispatch(getIndikatorPelayananRS())
    },
  })

  useEffect(() => {
    const values = vFilter.initialValues
    dispatch(getPasienRJ(values))
    dispatch(getPasienIGD(values))
    dispatch(getPasienRanap(values))
    dispatch(getCountCaraBayar(values))
    dispatch(getPoliklinikTerbanyak(values))
    dispatch(getCountUnit(values))
    dispatch(getIndikatorPelayananRS())
  }, [vFilter.initialValues, dispatch])

  return (
    <div className="page-content page-dasbor-eis-utama">
      <ModalWidgetUtama />
      <ModalPasienRajal />
      <ModalPasienGaDar />
      <ModalPasienRanap />
      <ModalPasienCaraBayar />
      <ModalPoliklinik />
      <BreadCrumb
        title="Dasbor Utama"
        pageTitle="Dasbor EIS"
        className="bc-dasbor-eis"
      />
      <HeaderDashboard />
      <Container fluid className="ps-3 pe-3">
        <Row className="mt-3 d-flex flex-row-reverse mb-3">
          <Col lg={'auto'}>
            <Button
              color="info"
              onClick={() => {
                vFilter.handleSubmit()
              }}
            >
              Filter
            </Button>
          </Col>
          <Col lg={4}>
            <KontainerFlatpickr
              isError={vFilter.touched?.tanggal && !!vFilter.errors?.tanggal}
              id="tanggal"
              options={{
                mode: 'range',
              }}
              value={[
                vFilter.values.tanggalmulai,
                vFilter.values.tanggalselesai,
              ]}
              onChange={([newDate, newDate2]) => {
                vFilter.setFieldValue(
                  'tanggalmulai',
                  newDate?.toISOString() || ''
                )
                vFilter.setFieldValue(
                  'tanggalselesai',
                  newDate2?.toISOString() || ''
                )
              }}
            />
            {vFilter.touched?.tanggal && !!vFilter.errors.tanggal && (
              <FormFeedback type="invalid">
                <div>{vFilter.errors.tanggal}</div>
              </FormFeedback>
            )}
          </Col>
          <Col lg={2}>
            <CustomSelect
              id="carabayar"
              name="carabayar"
              options={CaraBayarValue}
              onChange={(e) => {
                vFilter.setFieldValue('carabayar', e?.value || '')
              }}
              value={vFilter.values.carabayar}
              className={`input row-header ${!!vFilter?.errors.carabayar ? 'is-invalid' : ''
                }`}
            />
            {vFilter.touched.carabayar && !!vFilter.errors.carabayar && (
              <FormFeedback type="invalid">
                <div>{vFilter.errors.carabayar}</div>
              </FormFeedback>
            )}
          </Col>
        </Row>
        <PasienTotal />
        <StackedRJ />
        <StackedGD />
        <StackedRI />
        <Row>
          <Col lg={12}>
            <KunjunganPoliklinik />
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <CaraBayar />
          </Col>
          <Col lg={6}>
            <IndikatorPelayananRumahSakit />
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <SensusPasienRI />
          </Col>
          <Col lg={6}>
            <KetersediaanTT />
          </Col>
        </Row>
        {/* <PenyakitTerbesar /> */}
      </Container>
    </div>
  )
}

const StackedRJ = () => {
  const dispatch = useDispatch()
  const pasienTerdaftar = useSelector(
    (state) => state.Eis.getPasienRJ.data?.pasienTerdaftar || []
  )
  const pasienBatal = useSelector(
    (state) => state.Eis.getPasienRJ.data?.pasienBatal || []
  )
  const totalPasienDaftar = pasienTerdaftar.map((pasien) => pasien.total)
  const totalPasienBatal = pasienBatal.map((pasien) => pasien.total)
  const tglPasienDaftar = pasienTerdaftar.map((pasien) => pasien.date)

  const series = [
    {
      name: 'Pasien terdaftar',
      data: totalPasienDaftar,
      dataComplete: pasienTerdaftar,
    },
    {
      name: 'Pasien Batal',
      data: totalPasienBatal,
      dataComplete: pasienBatal,
    },
  ]

  const options = {
    chart: {
      stacked: !0,
      toolbar: {
        show: !1,
      },
      zoom: {
        enabled: !0,
      },
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const sIndex = config.seriesIndex
          const dIndex = config.dataPointIndex
          const data = series[sIndex].dataComplete[dIndex]
          const name = series[sIndex].name
          data && dispatch(setPasienRajal(name, data))
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],

    plotOptions: {
      bar: {
        horizontal: !1,
        borderRadius: 10,
      },
    },
    xaxis: {
      type: 'datetime',
      categories: tglPasienDaftar,
    },
    legend: {
      position: 'right',
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
    colors: colors,
  }
  return (
    <Card className="p-3">
      <Row>
        <Col lg={12}>
          <h4>Total Pengunjung pasien rawat jalan</h4>
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

const StackedGD = () => {
  const dispatch = useDispatch()
  const dataColors =
    '["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger"]'
  var chartColumnStackedColors = getChartColorsArray(dataColors)
  const pasienTerdaftar = useSelector(
    (state) => state.Eis.getPasienIGD.data?.pasienTerdaftar || []
  )
  const pasienRawat = useSelector(
    (state) => state.Eis.getPasienIGD.data?.pasienRawat || []
  )
  const pasienPulang = useSelector(
    (state) => state.Eis.getPasienIGD.data?.pasienPulang || []
  )
  const isiPasienDaftar = pasienTerdaftar.map((pasien) => pasien.total)
  const isiPasienRawat = pasienRawat.map((pasien) => pasien.total)
  const isiPasienPulang = pasienPulang.map((pasien) => pasien.total)
  const tglPasienDaftar = pasienTerdaftar.map((pasien) => pasien.date)

  const series = [
    {
      name: 'Pasien terdaftar',
      data: isiPasienDaftar,
      dataComplete: pasienTerdaftar,
    },
    {
      name: 'Pasien Rawat',
      data: isiPasienRawat,
      dataComplete: pasienRawat,
    },
    {
      name: 'Pasien Pulang',
      data: isiPasienPulang,
      dataComplete: pasienPulang,
    },
  ]

  const options = {
    chart: {
      stacked: !0,
      toolbar: {
        show: !1,
      },
      zoom: {
        enabled: !0,
      },
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const sIndex = config.seriesIndex
          const dIndex = config.dataPointIndex
          const data = series[sIndex].dataComplete[dIndex]
          const name = series[sIndex].name
          data && dispatch(setPasienGadar(name, data))
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: !1,
        borderRadius: 10,
      },
    },
    xaxis: {
      type: 'datetime',
      categories: tglPasienDaftar,
    },
    legend: {
      position: 'right',
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
    colors: colors,
  }
  return (
    <Card className="p-3">
      <Row>
        <Col lg={12}>
          <h4>Total Pengunjung pasien gawat darurat</h4>
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

const StackedRI = () => {
  const dispatch = useDispatch()
  const pasienTerdaftar = useSelector(
    (state) => state.Eis.getPasienRanap.data?.pasienTerdaftar || []
  )
  const pasienMeninggal = useSelector(
    (state) => state.Eis.getPasienRanap.data?.pasienMeninggal || []
  )
  const pasienPulang = useSelector(
    (state) => state.Eis.getPasienRanap.data?.pasienPulang || []
  )
  const isiPasienDaftar = pasienTerdaftar.map((pasien) => pasien.total)
  const isiPasienMeninggal = pasienMeninggal.map((pasien) => pasien.total)
  const isiPasienPulang = pasienPulang.map((pasien) => pasien.total)
  const tglPasienDaftar = pasienTerdaftar.map((pasien) => pasien.date)

  const series = [
    {
      name: 'Pasien terdaftar',
      data: isiPasienDaftar,
      dataComplete: pasienTerdaftar,
    },
    {
      name: 'Pasien Meninggal',
      data: isiPasienMeninggal,
      dataComplete: pasienMeninggal,
    },
    {
      name: 'Pasien Pulang',
      data: isiPasienPulang,
      dataComplete: pasienPulang,
    },
  ]

  const options = {
    chart: {
      stacked: !0,
      toolbar: {
        show: !1,
      },
      zoom: {
        enabled: !0,
      },
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const sIndex = config.seriesIndex
          const dIndex = config.dataPointIndex
          const data = series[sIndex].dataComplete[dIndex]
          const name = series[sIndex].name
          data && dispatch(setPasienRanap(name, data))
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: !1,
        borderRadius: 10,
      },
    },
    xaxis: {
      type: 'datetime',
      categories: tglPasienDaftar,
    },
    legend: {
      position: 'right',
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
    colors: colors,
  }
  return (
    <Card className="p-3">
      <Row>
        <Col lg={12}>
          <h4>Total Pengunjung pasien rawat inap</h4>
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

const CaraBayar = () => {
  const dispatch = useDispatch()
  const bpjs = useSelector((state) => state.Eis.getCountCaraBayar.data.bpjs)
  const umum = useSelector((state) => state.Eis.getCountCaraBayar.data.umum)
  const nonBPJS = useSelector(
    (state) => state.Eis.getCountCaraBayar.data.nonBPJS
  )
  const seriesData = [
    [...(bpjs?.data || [])],
    [...(umum?.data || [])],
    [...(nonBPJS?.data || [])],
  ]
  const series = [bpjs?.count || 0, umum?.count || 0, nonBPJS?.count || 0]
  // ntah kenapa label harus dinamis, kalo tidak dataPointSelection tidak bisa
  // makanya kalo bpjs gak ada jadi labelnya kosong saja,
  // sepertinya dataPointSelection baru akan terupdate kalo labels baru terupdate
  // contoh label berubah dari [] ke ['bpjs kesehatan', 'umum']
  const labels = bpjs ? ['BPJS Kesehatan', 'Umum', 'Asuransi Lain'] : []
  const onClick = (event, chartContext, config) => {
    const dIndex = config.dataPointIndex
    const data = seriesData[dIndex]
    const name = labels[dIndex]
    data && dispatch(setPasienBayar(name, data))
  }
  const options = {
    chart: {
      height: 300,
      type: 'pie',
      events: {
        dataPointSelection: onClick,
      },
    },
    labels: [...labels],
    legend: {
      position: 'bottom',
    },
    dataLabels: {
      dropShadow: {
        enabled: false,
      },
    },
    colors: colors,
  }
  return (
    <Card className="p-3" style={{ height: 500 }}>
      <Row className="mb-3">
        <Col lg={12}>
          <h4>Cara Bayar Pasien</h4>
        </Col>
      </Row>
      <ReactApexChart
        dir="ltr"
        className="apex-charts"
        series={series}
        options={{ ...options }}
        type="pie"
        height={350}
      />
    </Card>
  )
}

const IndikatorPelayananRumahSakit = () => {
  const dispatch = useDispatch()
  const data = useSelector(
    (state) => state.Eis.getIndikatorPelayananRS.data || null
  )
  const boxListIndikatorRS = [
    {
      id: 1,
      icon: "ri-hotel-bed-fill",
      label: "BOR",
      labelDetail: data?.bor || 0,
      color: '#6ADA7D',
      background: '#E9F9EC'
    },
    {
      id: 2,
      icon: "ri-hospital-line",
      label: "ALOS",
      labelDetail: data?.alos || 0,
      color: '#62CDEB',
      background: '#E9F9F8'
    },
    {
      id: 3,
      icon: "ri-hand-heart-line",
      label: "TOI",
      labelDetail: data?.toi || 0,
      color: '#6A7CDA',
      background: '#E9EBF9'
    },
    {
      id: 4,
      icon: "ri-home-heart-line",
      label: "BTO",
      labelDetail: data?.bto || 0,
      color: '#DA6ACF',
      background: '#F9E9F5'
    },
    {
      id: 5,
      icon: "ri-hearts-line",
      label: "NDR",
      labelDetail: data?.ndr || 0,
      color: '#FA896B',
      background: '#FEEDE9'
    },
    {
      id: 6,
      icon: "ri-heart-2-line",
      label: "GDR",
      labelDetail: data?.gdr || 0,
      color: '#DA926A',
      background: '#F9EFE9'
    },
  ];
  return (
    <Card className="p-3" style={{ height: 500 }}>
      <Row className="mb-3">
        <Col lg={12}>
          <h4>Indikator Pelayanan Rumah Sakit</h4>
        </Col>
      </Row>
      <Row>
        {boxListIndikatorRS.map((item, key) => (
          <Col lg={6} sm={6} className='mt-4' key={key}>
            <div className="p-2 border rounded card-animate">
              <div className="d-flex align-items-center">
                <div className="avatar-sm me-2">
                  <div className="avatar-title rounded fs-24" style={{ color: item.color, backgroundColor: item.background }}>
                    <i className={item.icon}></i>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-1">{item.label} :</h5>
                  <h5 className="mb-0">{item.labelDetail}</h5>
                </div>
              </div>
            </div>
          </Col>
        ))}
        <div colSpan={6} style={{ paddingTop: '2em', textAlign: 'center', fontStyle: 'italic', color: '#888', borderLeft: '0px', borderRight: '0px' }}>
          Data indikator berjalan, tidak terpengaruh dengan parameter tanggal diatas.</div>
      </Row>
    </Card>
  )
}

const PasienTotal = () => {
  const dispatch = useDispatch()
  const data = useSelector(
    (state) => state.Eis.getCountUnit.data?.countUnit || null
  )
  const tileBoxs2 = [
    {
      id: 1,
      label: 'Pasien Rawat Jalan',
      badge: 'ri-more-2-fill',
      icon: 'ri-space-ship-line',
      counter: data?.pasienrajal || 0,
      decimals: 0,
      suffix: '',
      separator: '.',
      prefix: '',
      onClick: () =>
        dispatch(
          setWidgetUtama('Pasien Rawat Jalan', data?.isipasienrajal || [])
        ),
    },
    {
      id: 2,
      label: 'Pasien Rawat Inap',
      badge: 'ri-more-2-fill',
      icon: 'ri-exchange-dollar-line',
      counter: data?.pasienranap || 0,
      decimals: 0,
      separator: '.',
      suffix: '',
      prefix: '',
      onClick: () =>
        dispatch(
          setWidgetUtama('Pasien Rawat Inap', data?.isipasienranap || [])
        ),
    },
    {
      id: 3,
      label: 'Pasien Gawat Darurat',
      badge: 'ri-more-2-fill',
      icon: 'ri-pulse-line',
      counter: data?.pasienigd || 0,
      separator: '.',
      decimals: 0,
      suffix: '',
      prefix: '',
      onClick: () =>
        dispatch(setWidgetUtama('Pasien Rawat IGD', data?.isipasienigd || [])),
    },
    {
      id: 4,
      label: 'Pasien Laboratorium',
      badge: 'ri-more-2-fill',
      icon: 'ri-trophy-line',
      counter: data?.pasienlaboratorium || 0,
      decimals: 0,
      prefix: '',
      separator: '.',
      suffix: '',
      onClick: () =>
        dispatch(
          setWidgetUtama(
            'Pasien Rawat Jalan',
            data?.isipasienlaboratorium || []
          )
        ),
    },
    {
      id: 5,
      label: 'Pasien Radiologi',
      badge: 'ri-more-2-fill',
      icon: 'ri-service-line',
      counter: data?.pasienradiologi || 0,
      decimals: 0,
      separator: '.',
      suffix: '',
      prefix: '',
      onClick: () =>
        dispatch(
          setWidgetUtama(
            'Pasien Rawat Radiologi',
            data?.isipasienradiologi || []
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
                        <i className={'display-6 text-muted ' + item.icon}></i>
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

const KunjunganPoliklinik = () => {
  const dispatch = useDispatch()
  const kunjungan = useSelector(
    (state) => state.Eis.getPoliklinikTerbanyak.data?.kunjungan || []
  )
  const kunjunganTotal = kunjungan.map((kunj) => kunj._total)
  const kunjunganNama = kunjungan.map((kunj) => kunj.namaunit.split(' '))
  const kunjunganData = kunjungan.map((kunj) => kunj._values)
  const series = [
    {
      name: 'Total kunjungan',
      data: kunjunganTotal,
      dataComplete: kunjunganData,
    },
  ]

  let options = {
    chart: {
      height: 350,
      type: 'bar',
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const sIndex = config.seriesIndex
          const data = series[sIndex].dataComplete[0]
          const name = series[sIndex].name
          data && dispatch(setPasienPoliklinik(name, data))
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
      enabled: true,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: kunjunganNama,
      labels: {
        style: {
          colors: colors,
          fontSize: '12px',
        },
      },
    },
  }

  return (
    <Card className="p-3" style={{ height: 500 }}>
      <Row className="mb-3">
        <Col lg={12}>
          <h4>Kunjungan poliklinik</h4>
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

const SensusPasienRI = () => {
  const kamarTerdaftar = useSelector(
    (state) => state.Eis.getPasienRanap.data?.kamarTerdaftar || []
  )
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Nama Ruangan</span>,
      sortable: true,
      selector: (row) => row.namakamar,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Pasien Masuk</span>,
      selector: (row) => row._total,
      sortable: true,
      width: '110px',
    },

    {
      name: <span className="font-weight-bold fs-13">Pasien Keluar</span>,
      sortable: true,
      selector: (row) => row._totalpulang,
      width: '100px',
    },
  ]

  return (
    <Card className="p-3" style={{ height: 500 }}>
      <Row className="mb-3">
        <Col lg={12}>
          <h4>Sensus Pasien</h4>
        </Col>
      </Row>
      <DataTable
        fixedHeader
        columns={columnsDetail}
        pagination
        paginationPerPage={5}
        data={kamarTerdaftar}
        progressPending={false}
        customStyles={tableCustomStyles}
        progressComponent={<LoadingTable />}
        noDataComponent={<NoDataTable />}
      />
    </Card>
  )
}

const KetersediaanTT = () => {
  const tempatTidur = useSelector(
    (state) => state.Eis.getPasienRanap.data.tempatTidur
  )
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Nama Kamar</span>,
      sortable: true,
      selector: (row) => row.namakamar,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Jumlah Bed</span>,
      selector: (row) => row.totalbed,
      sortable: true,
      width: '110px',
    },
    {
      name: <span className="font-weight-bold fs-13">Bed Isi</span>,
      selector: (row) => row.totalisi,
      sortable: true,
      width: '110px',
    },
    {
      name: <span className="font-weight-bold fs-13">Bed Siap Pakai</span>,
      selector: (row) => row.totalkosong,
      sortable: true,
      width: '110px',
    },
    {
      name: <span className="font-weight-bold fs-13">Bed Rusak</span>,
      selector: (row) => row.totalrusak,
      sortable: true,
      width: '110px',
    },
  ]

  return (
    <Card className="p-3" style={{ height: 500 }}>
      <Row className="mb-3">
        <Col lg={12}>
          <h4>Ketersediaann Tempat Tidur</h4>
        </Col>
      </Row>
      <Row>
        <DataTable
          fixedHeader
          columns={columnsDetail}
          pagination
          paginationPerPage={5}
          data={tempatTidur}
          progressPending={false}
          customStyles={tableCustomStyles}
          progressComponent={<LoadingTable />}
          noDataComponent={<NoDataTable />}
        />
      </Row>
    </Card>
  )
}

const PenyakitTerbesar = () => {
  const dataColors =
    '["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]'
  var chartPieBasicColors = getChartColorsArray(dataColors)
  const series = [44, 55, 13]
  var options = {
    chart: {
      height: 300,
      type: 'pie',
    },
    labels: ['Umum', 'BPJS Kesehatan', 'Asuransi Lain'],
    legend: {
      position: 'bottom',
    },
    dataLabels: {
      dropShadow: {
        enabled: false,
      },
    },
    colors: colors,
  }
  return (
    <Card className="p-3" style={{ height: 500 }}>
      <Row className="mb-3">
        <Col lg={12}>
          <h4>10 besar penyakit</h4>
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

export const CaraBayarValue = [
  {
    value: 1,
    label: 'Semua',
  },
  {
    value: 2,
    label: 'BPJS',
  },
  {
    value: 3,
    label: 'Umum',
  },
  {
    value: 4,
    label: 'Asuransi Lain',
  },
]

export const HeaderDashboard = () => {
  const items = [
    {
      classImg: 'bx bx-home-heart',
      text: 'Dasbor Utama',
      link: 'dasbor-utama',
    },
    {
      classImg: 'las la-capsules',
      text: 'Dasbor Farmasi',
      link: 'dasbor-farmasi',
    },
    {
      classImg: 'las la-money-bill',
      text: 'Dasbor Pendapatan',
      link: 'dasbor-pendapatan',
    },
    {
      classImg: 'las la-user-nurse',
      text: 'Dasbor SDM',
      link: 'dasbor-pegawai',
    },
    {
      classImg: 'las la-user-nurse',
      text: 'Dasbor Peta',
      link: 'dasbor-peta',
    },
  ]
  return (
    <ul className="header-dasbor-eis page-title-box">
      {items.map((item, key) => (
        <Link key={key} to={`/eis/dasbor/${item.link}`}>
          <li className="isi-header">
            <i className={item.classImg}></i>
            <p className="text-header">{item.text}</p>
          </li>
        </Link>
      ))}
    </ul>
  )
}

export default DashboardUtama
