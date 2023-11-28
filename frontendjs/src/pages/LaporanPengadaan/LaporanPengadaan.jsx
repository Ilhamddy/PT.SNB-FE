import { ToastContainer } from 'react-toastify'
import {
  Card,
  CardBody,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Row,
  UncontrolledDropdown,
  FormFeedback,
  Button,
  UncontrolledTooltip,
  Modal,
} from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { useFormik } from 'formik'
import CustomSelect from '../Select/Select'
import { useDispatch, useSelector } from 'react-redux'
import {
  getMasterTarifLayanan,
  setVariabelBPJS,
} from '../../store/masterdatalayanan/action'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../Components/Table/LoadingTable'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import ColLabelInput from '../../Components/ColLabelInput/ColLabelInput'
import KontainerFlatpickr from '../../Components/KontainerFlatpickr/KontainerFlatpickr'
import { dateLocal, onChangeStrNbr, strToNumber } from '../../utils/format'
import {
  getComboTarifTindakan,
  getTotalTarif,
  upsertTarifTindakan,
} from '../../store/mastertariftindakan/action'
import { toast } from 'react-toastify'
import {
  getComboLaporanPengadaan,
  getLaporanPengadaan,
} from '../../store/actions'
import * as XLSX from 'xlsx'
import { tableCustomStyles } from '../../Components/Table/tableCustomStyles'

const LaporanPengadaan = () => {
  const dispatch = useDispatch()
  let { instalasi, unit, asalProduk, supplier } = useSelector(
    (state) => state.Farmasi.getComboLaporanPengadaan.data
  )
  const dataPengadaan = useSelector(
    (state) => state.Gudang.getLaporanPengadaan.data?.pengadaan || []
  )
  const loadingPengadaan = useSelector(
    (state) => state.Gudang.getLaporanPengadaan.loading || false
  )
  const [dateNow] = useState(() => new Date().toISOString())
  const vFilter = useFormik({
    initialValues: {
      instalasi: '',
      unit: '',
      tglpengadaanstart: dateNow,
      tglpengadaanend: dateNow,
      asalproduk: '',
      supplier: '',
    },
    onSubmit: (values) => {
      dispatch(getLaporanPengadaan(values))
    },
  })
  unit = (unit || []).filter(
    (u) => u.objectinstalasifk === vFilter.values.instalasi
  )

  useEffect(() => {
    dispatch(getComboLaporanPengadaan(vFilter.initialValues))
  }, [dispatch, vFilter.initialValues])

  const handleExport = () => {
    const formattedData = dataPengadaan.map((row) =>
      columns.map((col) => col.selector(row))
    )
    const header = columns.map((col) => col.name.props.children)
    const sheetData = [header, ...formattedData]
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    XLSX.writeFile(workbook, 'laporan_pengadaan.xlsx')
  }

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">No</span>,
      selector: (row) => row.no,
      sortable: true,
      width: '60px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Tanggal Pesan</span>,
      selector: (row) => dateLocal(row.tglorder),
      sortable: true,
      width: '120px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Pegawai</span>,
      selector: (row) => row.namapegawai,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Jumlah Item</span>,
      selector: (row) => row.jumlahitem,
      sortable: true,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Unit</span>,
      selector: (row) => row.namaunit,
      sortable: true,
      width: '250px',
    },
    {
      name: <span className="font-weight-bold fs-13">Asal Produk</span>,
      selector: (row) => row.namaasalproduk,
      sortable: true,
      width: '250px',
    },
    {
      name: <span className="font-weight-bold fs-13">Supplier</span>,
      selector: (row) => row.namarekanan,
      sortable: true,
      width: '170px',
    },
  ]
  return (
    <div className="page-content page-laporan-pengadaan">
      <ToastContainer closeButton={false} />
      <Container fluid>
        <BreadCrumb title="Laporan Pengadaan" pageTitle="Laporan" />
        <Card className="p-3">
          <Row>
            <ColLabelInput className="mb-2" lg={3} label="Instalasi">
              <CustomSelect
                id="instalasi"
                name="instalasi"
                options={instalasi || []}
                onChange={(e) => {
                  vFilter.setFieldValue('instalasi', e?.value || '')
                  vFilter.setFieldValue('unit', '')
                }}
                value={vFilter.values.instalasi}
                className={`input row-header ${
                  !!vFilter?.errors.instalasi ? 'is-invalid' : ''
                }`}
              />
              {vFilter.touched.instalasi && !!vFilter.errors.instalasi && (
                <FormFeedback type="invalid">
                  <div>{vFilter.errors.instalasi}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            <ColLabelInput className="mb-2" lg={3} label="Unit">
              <CustomSelect
                id="unit"
                name="unit"
                options={unit || []}
                onChange={(e) => {
                  vFilter.setFieldValue('unit', e?.value || '')
                }}
                value={vFilter.values.unit}
                isClearEmpty
                className={`input row-header ${
                  !!vFilter?.errors.unit ? 'is-invalid' : ''
                }`}
              />
              {vFilter.touched.unit && !!vFilter.errors.unit && (
                <FormFeedback type="invalid">
                  <div>{vFilter.errors.unit}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            <ColLabelInput className="mb-2" lg={3} label="Tanggal Pengadaan">
              <KontainerFlatpickr
                isError={
                  vFilter.touched?.tglpengadaanstart &&
                  !!vFilter.errors?.tglpengadaanstart
                }
                id="tgllibur"
                options={{
                  dateFormat: 'Y-m-d',
                  mode: 'range',
                }}
                value={[
                  vFilter.values.tglpengadaanstart,
                  vFilter.values.tglpengadaanend,
                ]}
                onChange={([newDate, newDate2]) => {
                  vFilter.setFieldValue(
                    'tglpengadaanstart',
                    newDate?.toISOString() || ''
                  )
                  vFilter.setFieldValue(
                    'tglpengadaanend',
                    newDate2?.toISOString() || ''
                  )
                }}
              />
              {vFilter.touched?.tglpengadaanstart &&
                !!vFilter.errors.tglpengadaanstart && (
                  <FormFeedback type="invalid">
                    <div>{vFilter.errors.tglpengadaanstart}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
            <ColLabelInput className="mb-2" lg={3} label="Asal Produk">
              <CustomSelect
                id="asalproduk"
                name="asalproduk"
                options={asalProduk || []}
                onChange={(e) => {
                  vFilter.setFieldValue('penjamin', e?.value || '')
                }}
                value={vFilter.values.asalproduk}
                className={`input row-header ${
                  !!vFilter?.errors.asalproduk ? 'is-invalid' : ''
                }`}
              />
              {vFilter.touched.asalproduk && !!vFilter.errors.asalproduk && (
                <FormFeedback type="invalid">
                  <div>{vFilter.errors.asalproduk}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            <ColLabelInput className="mb-2" lg={3} label="Pilih Supplier">
              <CustomSelect
                id="supplier"
                name="supplier"
                options={supplier || []}
                onChange={(e) => {
                  vFilter.setFieldValue('supplier', e?.value || '')
                }}
                value={vFilter.values.supplier}
                className={`input row-header ${
                  !!vFilter?.errors.supplier ? 'is-invalid' : ''
                }`}
              />
              {vFilter.touched.supplier && !!vFilter.errors.supplier && (
                <FormFeedback type="invalid">
                  <div>{vFilter.errors.supplier}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            <ColLabelInput label="" lg="auto">
              <Button
                color="info"
                type="button"
                onClick={() => vFilter.handleSubmit()}
              >
                Cari
              </Button>
            </ColLabelInput>
            <ColLabelInput label="" lg="auto">
              <Button color="info" type="button" onClick={() => handleExport()}>
                Ekspor
              </Button>
            </ColLabelInput>
          </Row>
        </Card>
        <Card className="p-3">
          <DataTable
            fixedHeader
            progressComponent={<LoadingTable />}
            columns={columns}
            pagination
            data={dataPengadaan}
            progressPending={loadingPengadaan}
            customStyles={tableCustomStyles}
          />
        </Card>
      </Container>
    </div>
  )
}

export default LaporanPengadaan
