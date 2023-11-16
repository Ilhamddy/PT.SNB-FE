import { Button, Card, Col, Container, FormFeedback, Row } from 'reactstrap'
import { ToastContainer } from 'react-toastify'
import { CaraBayarValue, HeaderDashboard } from '../DasborUtama/DasborUtama'
import KontainerFlatpickr from '../../Components/KontainerFlatpickr/KontainerFlatpickr'
import CustomSelect from '../Select/Select'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { getDasborPembayaran } from '../../store/eis/action'
import ReactApexChart from 'react-apexcharts'
import { colors } from '../DasborUtama/colors'

const DasborPendapatan = () => {
  const dispatch = useDispatch()
  const [dateStart] = useState(() => {
    let d = new Date()
    d.setMonth(d.getMonth() - 3)
    return d
  })
  const [dateToday] = useState(() => new Date().toISOString())

  const vFilter = useFormik({
    initialValues: {
      tanggal: '',
      tanggalmulai: dateStart,
      tanggalselesai: dateToday,
      carabayar: CaraBayarValue[0].value,
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(getDasborPembayaran(values))
    },
  })
  useEffect(() => {
    dispatch(getDasborPembayaran(vFilter.initialValues))
  }, [dispatch, vFilter.initialValues])
  return (
    <div className="page-content page-dasbor-eis-utama">
      <BreadCrumb
        title="Dasbor Pendapatan"
        pageTitle="Dasbor EIS"
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
          {/* <Col lg={2}>
            <CustomSelect
              id="carabayar"
              name="carabayar"
              options={CaraBayarValue}
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
          </Col> */}
        </Row>
        <StackedInstalasi />
        <PendapatanKeseluruhan />
        <PendapatanLayanan />
        <PendapatanLain />
      </Container>
    </div>
  )
}

const PendapatanKeseluruhan = () => {
  const kunjungan = useSelector(
    (state) => state.Eis.getDasborPembayaran.data?.pembayaran || []
  )
  const bayarTotal = kunjungan.map((kunj) => kunj.totalproduk)
  const pembayaranNama = kunjungan.map((kunj) => kunj.namainstalasi.split(' '))
  const series = [
    {
      name: 'Total pembayaran',
      data: bayarTotal,
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
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => {
        return val === 0 ? '' : 'Rp' + (val?.toLocaleString('id-ID') || 0)
      },
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        colors: '#000000',
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: pembayaranNama,
      labels: {
        style: {
          colors: colors,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => {
          return val === 0 ? '' : 'Rp' + (val?.toLocaleString('id-ID') || 0)
        },
      },
    },
  }

  return (
    <Card className="p-3">
      <Row className="mb-3">
        <Col lg={12}>
          <h4>Pendapatan Keseluruhan</h4>
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

const PendapatanLayanan = () => {
  const kunjungan = useSelector(
    (state) => state.Eis.getDasborPembayaran.data?.pembayaranPelayanan || []
  )
  const bayarTotal = kunjungan.map((kunj) => kunj.totalproduk)
  const pembayaranNama = kunjungan.map((kunj) => kunj.namainstalasi.split(' '))
  const series = [
    {
      name: 'Total pembayaran',
      data: bayarTotal,
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
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => {
        return val === 0 ? '' : 'Rp' + (val?.toLocaleString('id-ID') || 0)
      },
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        colors: '#000000',
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: pembayaranNama,
      labels: {
        style: {
          colors: colors,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => {
          return val === 0 ? '' : 'Rp' + (val?.toLocaleString('id-ID') || 0)
        },
      },
    },
  }

  return (
    <Card className="p-3">
      <Row className="mb-3">
        <Col lg={12}>
          <h4>Pendapatan Layanan</h4>
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

const PendapatanLain = () => {
  const kunjungan = useSelector(
    (state) => state.Eis.getDasborPembayaran.data?.pembayaranLain || []
  )
  const bayarTotal = kunjungan.map((kunj) => kunj.totalproduk)
  const pembayaranNama = kunjungan.map((kunj) => kunj.namainstalasi.split(' '))
  const series = [
    {
      name: 'Total pembayaran',
      data: bayarTotal,
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
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => {
        return val === 0 ? '' : 'Rp' + (val?.toLocaleString('id-ID') || 0)
      },
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        colors: '#000000',
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: pembayaranNama,
      labels: {
        style: {
          colors: colors,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => {
          return val === 0 ? '' : 'Rp' + (val?.toLocaleString('id-ID') || 0)
        },
      },
    },
  }

  return (
    <Card className="p-3">
      <Row className="mb-3">
        <Col lg={12}>
          <h4>Pendapatan Non Layanan</h4>
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

const StackedInstalasi = () => {
  const dispatch = useDispatch()
  const pembayaranTotal = useSelector(
    (state) => state.Eis.getDasborPembayaran.data?.bayarWaktu || []
  )
  const pasienBatal = useSelector(
    (state) => state.Eis.getPasienRJ.data?.pasienBatal || []
  )
  const totalPasienDaftar = pembayaranTotal.map((pasien) => pasien.total)
  // const totalPasienBatal = pasienBatal.map((pasien) => pasien.total)
  const tglSeries =
    pembayaranTotal?.[0]?.datas.map((pasien) => pasien.date) || []

  const series = pembayaranTotal.map((instalasi) => ({
    name: instalasi.namainstalasi,
    data: instalasi.datas.map((data) => {
      return data.total
    }),
    dataComplete: instalasi.datas,
  }))

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
          // const sIndex = config.seriesIndex
          // const dIndex = config.dataPointIndex
          // const data = series[sIndex].dataComplete[dIndex]
          // const name = series[sIndex].name
          // data && dispatch(setPasienRajal(name, data))
        },
      },
    },
    dataLabels: {
      enabled: false,
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
      categories: tglSeries,
    },

    legend: {
      position: 'right',
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
    yaxis: {
      labels: {
        formatter: (val) => {
          return val === 0 ? '' : 'Rp' + (val?.toLocaleString('id-ID') || 0)
        },
      },
    },
    colors: colors,
  }
  return (
    <Card className="p-3">
      <Row>
        <Col lg={12}>
          <h4>Timeline Pendapatan</h4>
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

export default DasborPendapatan
