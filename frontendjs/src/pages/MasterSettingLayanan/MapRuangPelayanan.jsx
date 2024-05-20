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
  Nav,
  NavItem,
  NavLink,
  TabPane,
} from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { useFormik } from 'formik'
import CustomSelect from '../../Components/Common/CustomSelect/CustomSelect'
import { useDispatch, useSelector } from 'react-redux'
import { getMasterTarifLayanan } from '../../store/payment/action'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../Components/Table/LoadingTable'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import classnames from 'classnames'
import ColLabelInput from '../../Components/ColLabelInput/ColLabelInput'
import * as Yup from 'yup'
import {
  getComboMapRuangPelayanan,
  getLayanan,
  getLayananMapping,
  getMapUnitToProduk,
  saveOrDeleteMapping,
  upsertLayanan,
} from '../../store/masterdatalayanan/action'
import NoDataTable from '../../Components/Table/NoDataTable'
import { dateLocal } from '../../utils/format'
import { toast } from 'react-toastify'
import DeleteModalCustom from '../../Components/Common/DeleteModalCustom'
import { tableCustomStyles } from '../../Components/Table/tableCustomStyles'

const MapRuangPelayanan = ({ tabId }) => {
  const dispatch = useDispatch()
  let { instalasi, unit } = useSelector((state) => ({
    instalasi:
      state.MasterDataLayanan.getComboMapRuangPelayanan.data.instalasi || [],
    unit: state.MasterDataLayanan.getComboMapRuangPelayanan.data.unit || [],
  }))
  const mapping = useSelector(
    (state) => state.MasterDataLayanan.getMapUnitToProduk.data.mapping || []
  )
  const loadingMapping = useSelector(
    (state) => state.MasterDataLayanan.getMapUnitToProduk.loading || false
  )
  const vFilter = useFormik({
    initialValues: {
      instalasi: '',
      unit: '',
    },
    onSubmit: (values) => {
      dispatch(getMapUnitToProduk(values))
    },
  })

  unit = [...unit].filter(
    (u) => u.objectinstalasifk === vFilter.values.instalasi
  )
  useEffect(() => {
    dispatch(getComboMapRuangPelayanan({}))
  }, [dispatch])

  useEffect(() => {
    const handleSubmit = vFilter.handleSubmit
    vFilter.values.unit && handleSubmit()
  }, [vFilter.values.unit, vFilter.handleSubmit])

  const handleHapus = (row) => {
    dispatch(
      saveOrDeleteMapping({
        idmapping: row.idmapping,
        callback: () => {
          dispatch(getMapUnitToProduk(vFilter.values))
        },
      })
    )
  }

  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Id Produk</span>,
      sortable: true,
      selector: (row) => row.idproduk,
      width: '80px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Layanan</span>,
      selector: (row) => row.namalayanan,
      sortable: true,
      width: '450px ',
    },

    {
      name: <span className="font-weight-bold fs-13">Jenis Produk</span>,
      sortable: true,
      selector: (row) => row.namajenisproduk,
      width: '250px',
    },
    {
      name: <span className="font-weight-bold fs-13">Detail Jenis Produk</span>,
      sortable: true,
      selector: (row) => row.namadetailjenisproduk,
      width: '250px',
    },
    {
      name: <span className="font-weight-bold fs-13">Hapus</span>,
      sortable: true,
      cell: (row) => (
        <Button color="danger" onClick={() => handleHapus(row)}>
          Hapus
        </Button>
      ),
      width: '150px',
    },
  ]
  return (
    <TabPane className="p-4" tabId={tabId} id="home2">
      <Row className="mb-3 d-flex flex-row-reverse">
        <ColLabelInput label="Unit" lg={3}>
          <CustomSelect
            id="unit"
            name="unit"
            options={unit}
            onChange={(e) => {
              vFilter.setFieldValue('unit', e?.value || '')
            }}
            value={vFilter.values.unit}
            className={`input row-header ${
              !!vFilter?.errors.unit ? 'is-invalid' : ''
            }`}
            isDisabled={!vFilter.values.instalasi}
            isClearEmpty
          />
          {vFilter.touched.unit && !!vFilter.errors.unit && (
            <FormFeedback type="invalid">
              <div>{vFilter.errors.unit}</div>
            </FormFeedback>
          )}
        </ColLabelInput>
        <ColLabelInput label="Instalasi" lg={3}>
          <CustomSelect
            id="instalasi"
            name="instalasi"
            options={instalasi}
            onChange={(e) => {
              vFilter.setFieldValue('unit', '')
              vFilter.setFieldValue('instalasi', e?.value || '')
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
      </Row>
      <Row className="mt-3">
        <DataTable
          columns={columnsDetail}
          pagination
          data={mapping}
          progressPending={loadingMapping}
          customStyles={tableCustomStyles}
          progressComponent={<LoadingTable />}
          noDataComponent={<NoDataTable dataName={'Mapping'} />}
        />
      </Row>
      <Label className="mt-5 mb-3" style={{ color: '#000000' }}>
        Pencarian Layanan
      </Label>
      <IsiLayanan
        valuesFilter={vFilter.values}
        unitTerpilih={vFilter.values.unit}
      />
    </TabPane>
  )
}

const IsiLayanan = ({ valuesFilter, unitTerpilih }) => {
  const dispatch = useDispatch()
  const mapping = useSelector(
    (state) => state.MasterDataLayanan.getMapUnitToProduk.data.mapping || []
  )
  let { jenisProduk, detailJenisProduk, instalasi } = useSelector((state) => ({
    jenisProduk:
      state.MasterDataLayanan.getComboMapRuangPelayanan.data.jenisProduk || [],
    detailJenisProduk:
      state.MasterDataLayanan.getComboMapRuangPelayanan.data
        .detailJenisProduk || [],
    instalasi:
      state.MasterDataLayanan.getComboMapRuangPelayanan.data.instalasi || [],
  }))
  const layanan = useSelector(
    (state) => state.MasterDataLayanan.getLayananMapping.data.layanan || []
  )
  const loadingLayanan = useSelector(
    (state) => state.MasterDataLayanan.getLayananMapping.loading || false
  )

  const handleTambah = (row) => {
    if (!unitTerpilih) {
      toast.error('Unit Belum dipilih')
      return
    }
    dispatch(
      saveOrDeleteMapping({
        idproduk: row.idproduk,
        idunit: unitTerpilih,
        callback: () => {
          dispatch(getMapUnitToProduk(valuesFilter))
        },
      })
    )
  }

  const vFilterLayanan = useFormik({
    initialValues: {
      instalasi: '',
      jenisproduk: '',
      detailjenisproduk: '',
      namalayanan: '',
    },
    validationSchema: Yup.object({
      instalasi: Yup.string().required('Instalasi wajib diisi'),
      jenisproduk: Yup.string().required('Jenis Produk wajib diisi'),
    }),
    onSubmit: (values) => {
      dispatch(getLayananMapping(values))
    },
  })
  jenisProduk = [...jenisProduk].filter(
    (jenis) => jenis.valueinstalasi === vFilterLayanan.values.instalasi
  )
  detailJenisProduk = [...detailJenisProduk].filter(
    (detail) => detail.valuejenisproduk === vFilterLayanan.values.jenisproduk
  )
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Id Produk</span>,
      sortable: true,
      selector: (row) => row.idproduk,
      width: '80px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Layanan</span>,
      selector: (row) => row.namalayanan,
      sortable: true,
      width: '150px ',
      wrap: true,
    },

    {
      name: <span className="font-weight-bold fs-13">Jenis Produk</span>,
      sortable: true,
      selector: (row) => row.namajenisproduk,
      width: '150px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Detail Jenis Produk</span>,
      sortable: true,
      selector: (row) => row.namadetailjenisproduk,
      width: '150px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Tambah</span>,
      sortable: true,
      cell: (row) => {
        const foundProdukMap = mapping.find(
          (map) => map.idproduk === row.idproduk
        )
        if (foundProdukMap) {
          return <div>Sudah Ada</div>
        }
        return (
          <Button color="success" onClick={() => handleTambah(row)}>
            Tambah
          </Button>
        )
      },
      width: '150px',
    },
  ]
  return (
    <Row>
      <Col
        lg={5}
        style={{ backgroundColor: '#f1f2f6' }}
        className="p-4 rounded"
      >
        <Row className=" ms-2">
          <ColLabelInput label="Instalasi" lg={12} className="mb-3">
            <CustomSelect
              id="instalasi"
              name="instalasi"
              options={instalasi}
              onChange={(e) => {
                vFilterLayanan.setFieldValue('instalasi', e?.value || '')
              }}
              value={vFilterLayanan.values.instalasi}
              className={`input row-header ${
                !!vFilterLayanan?.errors.instalasi ? 'is-invalid' : ''
              }`}
            />
            {vFilterLayanan.touched.instalasi &&
              !!vFilterLayanan.errors.instalasi && (
                <FormFeedback type="invalid">
                  <div>{vFilterLayanan.errors.instalasi}</div>
                </FormFeedback>
              )}
          </ColLabelInput>
          <ColLabelInput label="Jenis Produk" lg={12} className="mb-3">
            <CustomSelect
              id="jenisproduk"
              name="jenisproduk"
              options={jenisProduk}
              onChange={(e) => {
                vFilterLayanan.setFieldValue('jenisproduk', e?.value || '')
                vFilterLayanan.setFieldValue('detailjenisproduk', '')
              }}
              value={vFilterLayanan.values.jenisproduk}
              className={`input row-header ${
                !!vFilterLayanan?.errors.jenisproduk ? 'is-invalid' : ''
              }`}
            />
            {vFilterLayanan.touched.jenisproduk &&
              !!vFilterLayanan.errors.jenisproduk && (
                <FormFeedback type="invalid">
                  <div>{vFilterLayanan.errors.jenisproduk}</div>
                </FormFeedback>
              )}
          </ColLabelInput>
          <ColLabelInput label="Detail Jenis Produk" lg={12} className="mb-3">
            <CustomSelect
              id="detailjenisproduk"
              name="detailjenisproduk"
              options={detailJenisProduk}
              onChange={(e) => {
                vFilterLayanan.setFieldValue(
                  'detailjenisproduk',
                  e?.value || ''
                )
              }}
              isClearEmpty
              isDisabled={!vFilterLayanan.values.jenisproduk}
              value={vFilterLayanan.values.detailjenisproduk}
              className={`input row-header ${
                !!vFilterLayanan?.errors.detailjenisproduk ? 'is-invalid' : ''
              }`}
            />
            {vFilterLayanan.touched.detailjenisproduk &&
              !!vFilterLayanan.errors.detailjenisproduk && (
                <FormFeedback type="invalid">
                  <div>{vFilterLayanan.errors.detailjenisproduk}</div>
                </FormFeedback>
              )}
          </ColLabelInput>
          <ColLabelInput label="Nama Layanan" lg={12} className="mb-3">
            <Input
              id="namalayanan"
              name="namalayanan"
              type="text"
              value={vFilterLayanan.values.namalayanan}
              onChange={(e) => {
                vFilterLayanan.setFieldValue('namalayanan', e.target.value)
              }}
              invalid={
                vFilterLayanan.touched?.namalayanan &&
                !!vFilterLayanan.errors?.namalayanan
              }
            />
            {vFilterLayanan.touched?.namalayanan &&
              !!vFilterLayanan.errors.namalayanan && (
                <FormFeedback type="invalid">
                  <div>{vFilterLayanan.errors.namalayanan}</div>
                </FormFeedback>
              )}
          </ColLabelInput>
        </Row>
        <Row className="d-flex flex-row-reverse mt-4">
          <Col lg="auto">
            <Button color="info" onClick={() => vFilterLayanan.handleSubmit()}>
              Tampilkan
            </Button>
          </Col>
        </Row>
      </Col>
      <Col lg={7}>
        <DataTable
          columns={columnsDetail}
          pagination
          data={layanan}
          progressPending={loadingLayanan}
          customStyles={tableCustomStyles}
          progressComponent={<LoadingTable />}
          noDataComponent={<NoDataTable dataName={'layanan'} />}
        />
      </Col>
    </Row>
  )
}

export default MapRuangPelayanan
