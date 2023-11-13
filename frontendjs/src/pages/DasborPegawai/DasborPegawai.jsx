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
import {
  getCountCaraBayar,
  getCountUnit,
  getPasienIGD,
  getPasienRJ,
  getPasienRanap,
  getPoliklinikTerbanyak,
  getStatusPegawai,
} from '../../store/eis/action'
import { HeaderDashboard } from '../DasborUtama/DasborUtama'

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
  }, [vFilter.initialValues, dispatch])

  return (
    <div className="page-content page-dasbor-eis-utama">
      <BreadCrumb
        title="Dasbor EIS"
        pageTitle="Dasbor Pegawai"
        className="bc-dasbor-eis"
      />
      <ToastContainer closeButton={false} />
      <HeaderDashboard />

      <Container fluid className="ps-3 pe-3 mt-3">
        <PegawaiTotal />
        <Row>
          <Col lg={4}>
            <StatusPegawai />
          </Col>
          <Col lg={2}>
            <JenisKelamin />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const PegawaiTotal = () => {
  const data = useSelector(
    (state) => state.Eis.getCountUnit.data?.countUnit || null
  )
  const tileBoxs2 = [
    {
      id: 1,
      label: 'Pasien Rawat Jalan',
      badge: 'ri-arrow-up-circle-line text-success',
      icon: 'ri-space-ship-line',
      counter: data?.pasienrajal || 0,
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
      counter: data?.pasienranap || 0,
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
      counter: data?.pasienigd || 0,
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
      counter: data?.pasienlaboratorium || 0,
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
      counter: data?.pasienradiologi || 0,
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

const StatusPegawai = () => {
  const dataColors =
    '["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]'
  var chartPieBasicColors = getChartColorsArray(dataColors)
  const countStatus = useSelector(
    (state) => state.Eis.getStatusPegawai.data?.countStatus || []
  )
  const labels = countStatus.map((c) => c.label)
  const series = countStatus.map((c) => c.jumlah)
  var options = {
    chart: {
      height: 300,
      type: 'pie',
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
    colors: chartPieBasicColors,
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
  const dataColors =
    '["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-dark", "--vz-info"]'
  let chartColumnDistributedColors = getChartColorsArray(dataColors)
  const jenisKelamin = useSelector(
    (state) => state.Eis.getStatusPegawai.data?.countJenisKelamin || []
  )
  const jenisKelaminTotal = jenisKelamin.map((jen) => jen.jumlah)
  const jenisKelaminNama = jenisKelamin.map((jen) => jen.label)
  const series = [
    {
      data: jenisKelaminTotal,
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

export default DasborPegawai
