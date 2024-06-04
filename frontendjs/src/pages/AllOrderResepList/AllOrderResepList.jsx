import {
  Card,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
  UncontrolledTooltip,
  Col,
  FormFeedback,
  Button,
} from 'reactstrap'
import LoadingTable from '../../Components/Table/LoadingTable'
import NoDataTable from '../../Components/Table/NoDataTable'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getOrderResepQuery } from '../../store/farmasi/action'
import { tableCustomStyles } from '../../Components/Table/tableCustomStyles'
import { dateTimeLocal } from '../../utils/format'
import { useFormik } from 'formik'
import KontainerFlatpickr from '../../Components/KontainerFlatpickr/KontainerFlatpickr'
import ColLabelInput from '../../Components/ColLabelInput/ColLabelInput'
import { panggil } from '../../store/farmasi/farmasiSlice'

const AllOrderResepList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { listOrder } = useSelector((state) => ({
    listOrder: state.Farmasi.getOrderResepQuery.data?.dataAllOrders || [],
  }))

  const [dateNow] = useState(() => new Date().toISOString())
  const vFilter = useFormik({
    initialValues: {
      tglmulai: dateNow,
      tglakhir: dateNow,
    },
    onSubmit: (values) => {
      dispatch(getOrderResepQuery(values))
    },
  })

  useEffect(() => {
    dispatch(getOrderResepQuery(vFilter.initialValues))
  }, [dispatch, vFilter.initialValues])

  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsOrder = [
    {
      name: <span className="font-weight-bold fs-13">Detail</span>,
      cell: (row) => (
        <div className="hstack gap-3 flex-wrap">
          <UncontrolledTooltip placement="top" target="detail-produk">
            {' '}
            Detail Produk{' '}
          </UncontrolledTooltip>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              tag="button"
              id="detail-produk"
            >
              <i className="ri-apps-2-line"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem
                onClick={() =>
                  navigate(`/farmasi/verif-order-resep/${row.norecorder}`)
                }
              >
                <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                Verif
              </DropdownItem>
              {(row.idstatus === 2 ||
                row.idstatus === 3 ||
                row.idstatus === 5) && (
                <DropdownItem
                  onClick={() => {
                    dispatch(panggil({ norecpanggil: row.norecorder }))
                  }}
                >
                  <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                  {row.idstatus === 2 ? 'Panggil' : 'Panggil Ulang'}
                </DropdownItem>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
      sortable: true,
      width: '70px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">No Order</span>,
      sortable: true,
      selector: (row) => row.noorder,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tgl Order</span>,
      sortable: true,
      selector: (row) => dateTimeLocal(row.tanggalorder),
      width: '170px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tgl Verif</span>,
      sortable: true,
      selector: (row) => dateTimeLocal(row.tglverif),
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Unit tujuan</span>,
      sortable: true,
      selector: (row) => row.namaunittujuan,
      width: '170px',
    },
  ]

  return (
    <div className="page-content page-verifikasi-resep">
      <Container fluid>
        <BreadCrumb title="Verifikasi Resep" pageTitle="Farmasi" />
        <Card className="p-5">
          <Row>
            <ColLabelInput lg={3} label={'Tanggal Mulai'}>
              <KontainerFlatpickr
                isError={
                  vFilter.touched?.tglmulai && !!vFilter.errors?.tglmulai
                }
                id="tglmulai"
                options={{
                  dateFormat: 'Y-m-d',
                  defaultDate: 'today',
                }}
                value={vFilter.values.tglmulai}
                onChange={([newDate]) => {
                  vFilter.setFieldValue('tglmulai', newDate.toISOString())
                }}
              />
              {vFilter.touched?.tglmulai && !!vFilter.errors.tglmulai && (
                <FormFeedback type="invalid">
                  <div>{vFilter.errors.tglmulai}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            <ColLabelInput lg={3} label={'Tanggal Akhir'}>
              <KontainerFlatpickr
                isError={
                  vFilter.touched?.tglakhir && !!vFilter.errors?.tglakhir
                }
                id="tglakhir"
                options={{
                  dateFormat: 'Y-m-d',
                  defaultDate: 'today',
                }}
                value={vFilter.values.tglakhir}
                onChange={([newDate]) => {
                  vFilter.setFieldValue('tglakhir', newDate.toISOString())
                }}
              />
              {vFilter.touched?.tglakhir && !!vFilter.errors.tglakhir && (
                <FormFeedback type="invalid">
                  <div>{vFilter.errors.tglakhir}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            <ColLabelInput lg="auto">
              <Button
                color="info"
                onClick={() => {
                  vFilter.handleSubmit()
                }}
              >
                Cari
              </Button>
            </ColLabelInput>
          </Row>
          <Row className="mt-5">
            <DataTable
              fixedHeader
              fixedHeaderScrollHeight="700px"
              columns={columnsOrder}
              pagination
              data={listOrder || []}
              progressPending={false}
              customStyles={tableCustomStyles}
              expandableRows
              expandableRowsComponent={ExpandableRiwayat}
              progressComponent={<LoadingTable />}
              noDataComponent={<NoDataTable dataName={'data order'} />}
            />
          </Row>
        </Card>
      </Container>
    </div>
  )
}

const ExpandableRiwayat = ({ data }) => {
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Kemasan</span>,
      selector: (row) =>
        (row.racikan || [])?.length === 0 ? 'Non Racikan' : 'Racikan',
      sortable: true,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Obat</span>,
      sortable: true,
      selector: (row) => `${row.namaobat || ''}`,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Qty</span>,
      sortable: true,
      selector: (row) => `${row.qty}`,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Satuan</span>,
      sortable: true,
      selector: (row) => `${row.namasatuan || ''}`,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Signa</span>,
      sortable: true,
      selector: (row) => `${row.namasigna || ''}`,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Keterangan</span>,
      sortable: true,
      selector: (row) => `${row.namaketerangan}`,
      width: '100px',
    },
  ]
  return (
    <DataTable
      fixedHeader
      fixedHeaderScrollHeight="700px"
      columns={columnsDetail}
      data={data.resep || []}
      progressPending={false}
      customStyles={subTableCustomStyles}
      progressComponent={<LoadingTable />}
      expandableRowDisabled={(row) => (row.racikan || [])?.length === 0}
      expandableRows
      expandableRowsComponent={ExpandableRiwayatObat}
      noDataComponent={<NoDataTable dataName={'data obat'} />}
    />
  )
}

const ExpandableRiwayatObat = ({ data }) => {
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      sortable: true,
      selector: (row) => row.koder,
      width: '47px',
    },
    {
      selector: (row) =>
        (row.racikan || [])?.length === 0 ? 'Non Racikan' : 'Racikan',
      sortable: true,
      width: '100px',
    },
    {
      sortable: true,
      selector: (row) => `${row.namaobat || ''}`,
      width: '100px',
    },
    {
      sortable: true,
      selector: (row) => `${row.qty}`,
      width: '150px',
    },
    {
      sortable: true,
      selector: (row) => `${row.namasatuan || ''}`,
      width: '100px',
    },
    {
      sortable: true,
      selector: (row) => `${row.namasigna || ''}`,
      width: '150px',
    },
    {
      sortable: true,
      selector: (row) => `${row.namaketerangan}`,
      width: '100px',
    },
  ]
  return (
    <DataTable
      columns={columnsDetail}
      data={data.racikan || []}
      progressPending={false}
      customStyles={{
        ...subTableCustomStyles,
        headRow: {
          ...subTableCustomStyles.headRow,
          style: { ...subTableCustomStyles.headRow.style, display: 'none' },
        },
      }}
      progressComponent={<LoadingTable />}
      noDataComponent={<NoDataTable dataName={'data obat'} />}
    />
  )
}

const subTableCustomStyles = {
  headRow: {
    style: {
      color: '#ffffff',
      backgroundColor: '#ECB349',
    },
  },
  rows: {
    style: {
      color: 'black',
      backgroundColor: '#f1f2f6',
      borderBottom: '1px solid #919191',
    },
  },
}

export default AllOrderResepList
