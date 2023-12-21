import { ToastContainer } from 'react-toastify'
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormFeedback,
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import HorizontalLayout from '../../Layouts/HorizontalLayout'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import './DasborFarmasi.scss'
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
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import React from 'react'
import {
  getDasborFarmasi,
  getStatusPegawai,
  setJumlahObat,
  setPemesanan,
  setPenerimaan,
  setRetur,
} from '../../store/eis/action'
import { HeaderDashboard } from '../DasborUtama/DasborUtama'
import Pemesanan from './pemesanan.svg'
import Penerimaan from './penerimaan.svg'
import Retur from './retur.svg'
import { colors } from '../DasborUtama/colors'
import {
  ModalJumlahObat,
  ModalPemesanan,
  ModalPenerimaan,
  ModalRetur,
} from './DasborFarmasiModal'
import { tableCustomStyles } from '../../Components/Table/tableCustomStyles'

const DasborFarmasi = () => {
  const [dateStart] = useState(() => {
    let d = new Date()
    d.setMonth(d.getMonth() - 3)
    return d.toISOString()
  })
  const [dateToday] = useState(() => new Date().toISOString())
  const dispatch = useDispatch()
  const vFilter = useFormik({
    initialValues: {
      tanggal: '',
      tanggalmulai: dateStart,
      tanggalselesai: dateToday,
      carabayar: '',
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(getDasborFarmasi(values))
    },
  })

  useEffect(() => {
    dispatch(getDasborFarmasi(vFilter.initialValues))
  }, [vFilter.initialValues, dispatch])

  return (
    <div className="page-content page-dasbor-eis-utama">
      <ModalPemesanan />
      <ModalPenerimaan />
      <ModalRetur />
      <ModalJumlahObat />
      <BreadCrumb
        title="Dasbor Pegawai"
        pageTitle="Dasbor EIS"
        className="bc-dasbor-eis"
      />
      <HeaderDashboard />
      <Container fluid className="ps-3 pe-3 mt-3">
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
        </Row>
        <TotalPemesanan />
        <Row>
          <Col lg={6}>
            <PemesananBarang />
          </Col>
          <Col lg={6}>
            <PenerimaanBarang />
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <ReturBarang />
          </Col>
          <Col lg={6}>
            <PemakaianObat />
          </Col>
        </Row>
        <Row>
          <Col lg={8}>
            <KartuStok />
          </Col>
          <Col lg={4}>
            <KetersediaanBarang />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const TotalPemesanan = () => {
  const dispatch = useDispatch()
  const { jmlPemesanan, jmlPenerimaan, jmlRetur } = useSelector(
    (state) => ({
      jmlPemesanan: state.Eis.getDasborFarmasi.data.jmlPemesanan || 0,
      jmlPenerimaan: state.Eis.getDasborFarmasi.data.jmlPenerimaan || 0,
      jmlRetur: state.Eis.getDasborFarmasi.data.jmlRetur || 0,
    }),
    shallowEqual
  )
  const pemesanan = useSelector(
    (state) => state.Eis.getDasborFarmasi.data?.pemesanan
  )
  const penerimaan = useSelector(
    (state) => state.Eis.getDasborFarmasi.data?.penerimaan
  )
  const retur = useSelector(
    (state) => state.Eis.getDasborFarmasi.data?.retur || []
  )

  const tileBoxs2 = [
    {
      id: 1,
      label: 'Total Pemesanan',
      badge: 'ri-more-2-fill',
      icon: Pemesanan,
      counter: jmlPemesanan,
      decimals: 0,
      suffix: '',
      separator: '.',
      prefix: '',
      onClick: () =>
        pemesanan && dispatch(setPemesanan('Total Pemesanan', pemesanan)),
    },
    {
      id: 2,
      label: 'Total Penerimaan',
      badge: 'ri-more-2-fill',
      icon: Penerimaan,
      counter: jmlPenerimaan,
      decimals: 0,
      separator: '.',
      suffix: '',
      prefix: '',
      onClick: () =>
        penerimaan && dispatch(setPenerimaan('Total Penerimaan', penerimaan)),
    },
    {
      id: 3,
      label: 'Total Retur',
      badge: 'ri-more-2-fill',
      icon: Retur,
      counter: jmlRetur,
      separator: '.',
      decimals: 0,
      suffix: '',
      prefix: '',
      onClick: () => retur && dispatch(setRetur('Total Retur', retur)),
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
                  onClick={() => item.onClick && item.onClick()}
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

const PemesananBarang = () => {
  const dispatch = useDispatch()
  const pemesanan = useSelector(
    (state) => state.Eis.getDasborFarmasi.data?.arTimePemesanan || []
  )

  const tglSeries = pemesanan.map((pesan) => pesan.date) || []

  const series = [
    {
      name: 'Jumlah Item Pemesanan',
      data: pemesanan.map((data) => {
        return data.total
      }),
      dataComplete: pemesanan,
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
          const data = series[sIndex].dataComplete[dIndex]?.items
          const name = 'Seluruh Pemesanan'
          data && dispatch(setPemesanan(name, data))
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
          return val
        },
      },
    },
    colors: colors,
  }
  return (
    <Card className="p-3">
      <Row>
        <Col lg={12}>
          <h4>Timeline Pemesanan</h4>
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

const PenerimaanBarang = () => {
  const dispatch = useDispatch()
  const penerimaan = useSelector(
    (state) => state.Eis.getDasborFarmasi.data?.arTimesPenerimaan || []
  )

  const tglSeries = penerimaan.map((terima) => terima.date) || []

  const series = [
    {
      name: 'Jumlah Penerimaan',
      data: penerimaan.map((data) => {
        return data.total
      }),
      dataComplete: penerimaan,
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
          const data = series[sIndex].dataComplete[dIndex]?.items
          const name = 'Seluruh Penerimaan'
          data && dispatch(setPenerimaan(name, data))
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
          return val
        },
      },
    },
    colors: colors,
  }
  return (
    <Card className="p-3">
      <Row>
        <Col lg={12}>
          <h4>Timeline Penerimaan</h4>
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

const ReturBarang = () => {
  const dispatch = useDispatch()
  const retur = useSelector(
    (state) => state.Eis.getDasborFarmasi.data?.arTimesRetur || []
  )

  const tglSeries = retur.map((terima) => terima.date) || []

  const series = [
    {
      name: 'Jumlah Retur',
      data: retur.map((data) => {
        return data.total
      }),
      dataComplete: retur,
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
          const data = series[sIndex].dataComplete[dIndex]?.items
          const name = 'Seluruh Retur'
          data && dispatch(setRetur(name, data))
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
          return val
        },
      },
    },
    colors: colors,
  }
  return (
    <Card className="p-3" style={{ height: 450 }}>
      <Row>
        <Col lg={12}>
          <h4>Timeline Retur Barang</h4>
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

const ReturBarangFarmasi = () => {
  const returList = useSelector(
    (state) => state.Eis.getDasborFarmasi.data?.retur || []
  )
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">No. Retur</span>,
      sortable: true,
      selector: (row) => row.noretur,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tanggal Retur</span>,
      selector: (row) => dateLocal(row.tglretur),
      sortable: true,
      width: '120px',
    },

    {
      name: <span className="font-weight-bold fs-13">Nama Supplier</span>,
      sortable: true,
      selector: (row) => row.namasupplier,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Item Dipesan</span>,
      sortable: true,
      selector: (row) => row.totalpesan,
      width: '60px',
    },
    {
      name: <span className="font-weight-bold fs-13">Unit Pemesan</span>,
      sortable: true,
      selector: (row) => row.namaunit,
      width: '140px',
    },
  ]

  return (
    <Card className="p-3" style={{ height: 450 }}>
      <Row className="mb-3">
        <Col lg={12}>
          <h4>Retur barang farmasi</h4>
        </Col>
      </Row>
      <DataTable
        fixedHeader
        columns={columnsDetail}
        pagination
        paginationPerPage={5}
        data={returList}
        progressPending={false}
        customStyles={tableCustomStyles}
        progressComponent={<LoadingTable />}
        noDataComponent={<NoDataTable />}
      />
    </Card>
  )
}

export const PemakaianObat = ({ isPopup }) => {
  const dispatch = useDispatch()
  const sepuluhBesar = useSelector(
    (state) => state.Eis.getDasborFarmasi.data?.sepuluhBesarObat || []
  )
  const jumlahObat = useSelector(
    (state) => state.Eis.tabelPasien.jumlahObat.jumlah
  )
  const sepuluhBesarTotal = sepuluhBesar
    .map((sep) => sep.jumlahpenggunaan)
    .slice(0, isPopup ? jumlahObat - 1 : 10)
  const maksTeks = !isPopup ? 2 : jumlahObat > 20 ? 1 : 2
  const sepuluhBesarNama = sepuluhBesar
    .map((sep) => sep.namaproduk.split(' ').slice(0, maksTeks))
    .slice(0, isPopup ? jumlahObat - 1 : 10)

  const series = [
    {
      name: 'Total Stok Obat',
      data: sepuluhBesarTotal,
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
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: sepuluhBesarNama,
      labels: {
        style: {
          colors: colors,
          fontSize: '12px',
        },
        rotate: -90,
      },
    },
  }

  const optionObat = [10, 20, 30]

  return (
    <Card className="p-3" style={{ height: 450 }}>
      <Row className="mb-3 d-flex justify-content-between">
        <Col lg="auto">
          <h4>{jumlahObat} Obat terbanyak</h4>
        </Col>
        {!isPopup && (
          <Col lg="auto">
            <UncontrolledDropdown className="card-header-dropdown">
              <DropdownToggle
                className="text-reset dropdown-btn"
                tag="a"
                role="button"
              >
                <span className="text-muted">
                  {jumlahObat} Obat{' '}
                  <i className="mdi mdi-chevron-down ms-1"></i>
                </span>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                {optionObat.map((val, index) => (
                  <DropdownItem
                    key={index}
                    onClick={() => dispatch(setJumlahObat(val))}
                  >
                    {val} Obat
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
        )}
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

const KartuStok = () => {
  const returList = useSelector(
    (state) => state.Eis.getDasborFarmasi.data?.kartuStok || []
  )
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Tanggal Transaksi</span>,
      sortable: true,
      selector: (row) => dateLocal(row.tglinput),
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Unit</span>,
      selector: (row) => row.namaunit,
      sortable: true,
      width: '140px',
    },

    {
      name: <span className="font-weight-bold fs-13">Transaksi</span>,
      sortable: true,
      selector: (row) => (row.saldomasuk > 0 ? 'Pemasukan' : 'Pengeluaran'),
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Item</span>,
      sortable: true,
      selector: (row) => row.namaproduk,
      width: '120px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Saldo Awal</span>,
      sortable: true,
      selector: (row) => row.saldoawal,
      width: '85px',
    },
    {
      name: <span className="font-weight-bold fs-13">Saldo Masuk</span>,
      sortable: true,
      selector: (row) => row.saldomasuk,
      width: '85px',
    },
    {
      name: <span className="font-weight-bold fs-13">Saldo Keluar</span>,
      sortable: true,
      selector: (row) => row.saldokeluar,
      width: '85px',
    },
    {
      name: <span className="font-weight-bold fs-13">Saldo Akhir</span>,
      sortable: true,
      selector: (row) => row.saldoakhir,
      width: '85px',
    },
  ]

  return (
    <Card className="p-3" style={{ height: 450 }}>
      <Row className="mb-3">
        <Col lg={12}>
          <h4>Kartu Stok</h4>
        </Col>
      </Row>
      <DataTable
        fixedHeader
        columns={columnsDetail}
        pagination
        paginationPerPage={5}
        data={returList}
        progressPending={false}
        customStyles={tableCustomStyles}
        progressComponent={<LoadingTable />}
        noDataComponent={<NoDataTable />}
      />
    </Card>
  )
}

const KetersediaanBarang = () => {
  const produkList = useSelector(
    (state) => state.Eis.getDasborFarmasi.data?.produkTerbanyak || []
  )
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">No. Retur</span>,
      sortable: true,
      selector: (row) => row.namaproduk,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Jumlah Stok</span>,
      selector: (row) => row.jumlahproduk,
      sortable: true,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Supplier</span>,
      sortable: true,
      selector: (row) => row.namasatuan,
      width: '120px',
    },
  ]

  return (
    <Card className="p-3" style={{ height: 450 }}>
      <Row className="mb-3">
        <Col lg={12}>
          <h4>Retur barang farmasi</h4>
        </Col>
      </Row>
      <DataTable
        fixedHeader
        columns={columnsDetail}
        pagination
        paginationPerPage={5}
        data={produkList}
        progressPending={false}
        customStyles={tableCustomStyles}
        progressComponent={<LoadingTable />}
        noDataComponent={<NoDataTable />}
      />
    </Card>
  )
}

export default DasborFarmasi
