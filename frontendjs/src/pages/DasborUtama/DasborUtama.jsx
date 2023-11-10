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
import { Link } from 'feather-icons-react/build/IconComponents'
import CountUp from 'react-countup'
import ReactApexChart from 'react-apexcharts'
import getChartColorsArray from '../../Components/Common/ChartsDynamicColor'
import { dateLocal } from '../../utils/format'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../Components/Table/LoadingTable'
import NoDataTable from '../../Components/Table/NoDataTable'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCountCaraBayar,
  getPasienIGD,
  getPasienRJ,
  getPasienRanap,
  getPoliklinikTerbanyak,
} from '../../store/eis/action'

const DashboardUtama = () => {
  const [dateToday] = useState(() => new Date().toISOString())
  const dispatch = useDispatch()
  const vFilter = useFormik({
    initialValues: {
      tanggal: '',
      tanggalmulai: dateToday,
      tanggalselesai: dateToday,
      carabayar: '',
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(getPasienRJ(values))
      dispatch(getPasienIGD(values))
      dispatch(getPasienRanap(values))
      dispatch(getCountCaraBayar(values))
      dispatch(getPoliklinikTerbanyak(values))
    },
  })

  useEffect(() => {
    dispatch(getPasienRJ(vFilter.initialValues))
  }, [vFilter.initialValues, dispatch])

  return (
    <div className="page-content page-dasbor-eis-utama">
      <BreadCrumb
        title="Dasbor EIS"
        pageTitle="Dasbor Utama"
        className="bc-dasbor-eis"
      />
      <ToastContainer closeButton={false} />
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
              options={[]}
              onChange={(e) => {
                vFilter.setFieldValue('carabayar', e?.value || '')
              }}
              value={vFilter.values.carabayar}
              className={`input row-header ${
                !!vFilter?.errors.carabayar ? 'is-invalid' : ''
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
          <Col lg={6}>
            <CaraBayar />
          </Col>
          <Col lg={6}>
            <KunjunganPoliklinik />
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
        <PenyakitTerbesar />
      </Container>
    </div>
  )
}

const StackedRJ = () => {
  const dataColors =
    '["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger"]'
  var chartColumnStackedColors = getChartColorsArray(dataColors)
  const pasienTerdaftar = useSelector(
    (state) => state.Eis.getPasienRJ.data?.pasienTerdaftar || []
  )
  const pasienBatal = useSelector(
    (state) => state.Eis.getPasienRJ.data?.pasienBatal || []
  )
  const isiPasienDaftar = pasienTerdaftar.map((pasien) => pasien.total)
  const isiPasienBatal = pasienBatal.map((pasien) => pasien.total)
  const tglPasienDaftar = pasienTerdaftar.map((pasien) => pasien.date)

  const series = [
    {
      name: 'Pasien terdaftar',
      data: isiPasienDaftar,
    },
    {
      name: 'Pasien Batal',
      data: isiPasienBatal,
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
    colors: chartColumnStackedColors,
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
    },
    {
      name: 'Pasien Rawat',
      data: isiPasienRawat,
    },
    {
      name: 'Pasien Pulang',
      data: isiPasienPulang,
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
    colors: chartColumnStackedColors,
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
  const dataColors =
    '["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger"]'
  var chartColumnStackedColors = getChartColorsArray(dataColors)
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
    },
    {
      name: 'Pasien Meninggal',
      data: isiPasienMeninggal,
    },
    {
      name: 'Pasien Pulang',
      data: isiPasienPulang,
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
    colors: chartColumnStackedColors,
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
  const dataColors =
    '["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]'
  var chartPieBasicColors = getChartColorsArray(dataColors)
  const totalData = useSelector((state) => ({
    bpjs: state.Eis.getCountCaraBayar.data.bpjs?.count || 0,
    umum: state.Eis.getCountCaraBayar.data.umum?.count || 0,
    nonBPJS: state.Eis.getCountCaraBayar.data.nonBPJS?.count || 0,
  }))
  const series = [totalData.bpjs, totalData.umum, totalData.nonBPJS]
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
    colors: chartPieBasicColors,
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
        options={options}
        type="pie"
        height={350}
      />
    </Card>
  )
}

const PasienTotal = () => {
  const tileBoxs2 = [
    {
      id: 1,
      label: 'Pasien Rawat Jalan',
      badge: 'ri-arrow-up-circle-line text-success',
      icon: 'ri-space-ship-line',
      counter: '197',
      decimals: 0,
      suffix: '',
      separator: '.',
      prefix: '',
    },
    {
      id: 2,
      label: 'Pasien Rawat Inap',
      badge: 'ri-arrow-up-circle-line text-success',
      icon: 'ri-exchange-dollar-line',
      counter: '489',
      decimals: 0,
      separator: '.',
      suffix: '',
      prefix: '',
    },
    {
      id: 3,
      label: 'Pasien Gawat Darurat',
      badge: 'ri-arrow-up-circle-line text-success',
      icon: 'ri-pulse-line',
      counter: '32',
      separator: '.',
      decimals: 0,
      suffix: '',
      prefix: '',
    },
    {
      id: 4,
      label: 'Pasien Laboratorium',
      badge: 'ri-arrow-up-circle-line text-success',
      icon: 'ri-trophy-line',
      counter: '250',
      decimals: 0,
      prefix: '',
      separator: '.',
      suffix: '',
    },
    {
      id: 5,
      label: 'Pasien Radiologi',
      badge: 'ri-arrow-up-circle-line text-success',
      icon: 'ri-service-line',
      counter: '2659',
      decimals: 0,
      separator: '.',
      suffix: '',
      prefix: '',
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
  const dataColors =
    '["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-dark", "--vz-info"]'
  let chartColumnDistributedColors = getChartColorsArray(dataColors)
  const kunjungan = useSelector(
    (state) => state.Eis.getPoliklinikTerbanyak.data?.kunjungan || []
  )
  const kunjunganTotal = kunjungan.map((kunj) => kunj._total)
  const kunjunganNama = kunjungan.map((kunj) => kunj.namaunit.split(' '))
  const series = [
    {
      data: kunjunganTotal,
    },
  ]
  let options = {
    chart: {
      height: 350,
      type: 'bar',
      events: {
        click: function (chart, w, e) {},
      },
    },
    colors: chartColumnDistributedColors,
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
      categories: kunjunganNama,
      labels: {
        style: {
          colors: [
            '#038edc',
            '#51d28c',
            '#f7cc53',
            '#f34e4e',
            '#564ab1',
            '#5fd0f3',
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
          <h4>10 Besar Kunjungan poliklinik</h4>
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
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Nama produk</span>,
      sortable: true,
      selector: (row) => row.produk.namaproduk,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Qty Penerimaan</span>,
      selector: (row) => row.jumlahterima,
      sortable: true,
      width: '110px',
    },

    {
      name: <span className="font-weight-bold fs-13">Harga satuan kecil</span>,
      sortable: true,
      selector: (row) => `Rp${row.hargasatuankecil?.toLocaleString('id-ID')}`,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Diskon</span>,
      sortable: true,
      selector: (row) => `Rp${row.diskonrupiah}`,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">PPN</span>,
      sortable: true,
      selector: (row) => `Rp${row.ppnrupiahproduk}`,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Total</span>,
      sortable: true,
      selector: (row) => `Rp${row.totalproduk}`,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">E.D</span>,
      sortable: true,
      selector: (row) => dateLocal(row.tanggaled),
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">No Batch</span>,
      sortable: true,
      selector: (row) => row.nobatch,
      width: '100px',
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
          data={[]}
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
    colors: chartPieBasicColors,
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

const tableCustomStyles = {
  headRow: {
    style: {
      color: '#878A99',
      backgroundColor: '#F3F6F9',
    },
  },
  rows: {
    style: {
      color: 'black',
      backgroundColor: '#ffffff',
    },
  },
}

const HeaderDashboard = () => {
  const items = [
    {
      classImg: 'bx bx-home-heart',
      text: 'Dasbor Utama',
    },
    {
      classImg: 'las la-capsules',
      text: 'Dasbor Farmasi',
    },
    {
      classImg: 'las la-money-bill',
      text: 'Dasbor Pendapatan',
    },
    {
      classImg: 'las la-user-nurse',
      text: 'Dasbor SDM',
    },
  ]
  return (
    <ul className="header-dasbor-eis page-title-box">
      {items.map((item, key) => (
        <li className="isi-header" key={key}>
          <i className={item.classImg}></i>
          <p className="text-header">{item.text}</p>
        </li>
      ))}
    </ul>
  )
}

export default DashboardUtama
