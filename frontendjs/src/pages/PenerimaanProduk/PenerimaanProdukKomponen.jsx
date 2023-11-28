import {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
} from 'react'
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CustomSelect from '../Select/Select'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import Flatpickr from 'react-flatpickr'
import { dateLocal, onChangeStrNbr, strToNumber } from '../../utils/format'
import { comboPenerimaanBarangGet } from '../../store/master/action'
import {
  kemasanFromProdukGet,
  penerimaanSaveOrUpdate,
  penerimaanQueryGet,
  getPemesanan,
  getRetur,
} from '../../store/gudang/action'
import LoadingTable from '../../Components/Table/LoadingTable'
import NoDataTable from '../../Components/Table/NoDataTable'
import { PenerimaanContext } from './PenerimaanProduk'
import { initialDetailRetur } from './PenerimaanProduk'
import { tableCustomStyles } from '../../Components/Table/tableCustomStyles'

export const ListDetail = () => {
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Detail</span>,
      cell: (row) => (
        <div className="hstack gap-3 flex-wrap">
          <UncontrolledTooltip placement="top" target="edit-produk">
            Detail Produk
          </UncontrolledTooltip>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              itemType="button"
              id="edit-produk"
            >
              <i className="ri-apps-2-line"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem
                onClick={() => {
                  vDetail.setValues({
                    ...row,
                  })
                }}
              >
                <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                Edit Produk
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
      sortable: true,
      width: '70px',
      wrap: true,
    },
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
  const {
    vDetail,
    validation,
    penerimaanTouched,
    penerimaanErr,
    total,
    ppn,
    subtotal,
    diskon,
  } = useContext(PenerimaanContext)
  const { norecpenerimaan } = useParams()
  return (
    <Card className="p-5">
      <Row className="mb-5">
        <DataTable
          fixedHeader
          columns={columnsDetail}
          pagination
          data={validation.values.detail || []}
          progressPending={false}
          customStyles={tableCustomStyles}
          progressComponent={<LoadingTable />}
          noDataComponent={<NoDataTable />}
        />
      </Row>
      <Row>
        <Col lg={7} className="d-flex justify-content-around align-items-end">
          <Button
            type="submit"
            color="success"
            placement="top"
            formTarget="form-input-penerimaan"
          >
            {!!norecpenerimaan ? 'Edit' : 'Simpan'}
          </Button>
          <Link to="/farmasi/gudang/penerimaan-produk-list">
            <Button type="button" className="btn" color="danger">
              Batal
            </Button>
          </Link>
        </Col>
        <Col lg={5}>
          <Row className="mb-2">
            <Col lg={6}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`subtotal`}
                className="form-label mt-2"
              >
                Subtotal
              </Label>
            </Col>
            <Col lg={6}>
              <Input
                id={`subtotal`}
                name={`subtotal`}
                type="text"
                disabled
                value={subtotal}
                invalid={
                  penerimaanTouched?.subtotal && !!penerimaanErr?.subtotal
                }
              />
              {penerimaanTouched?.subtotal && !!penerimaanErr?.subtotal && (
                <FormFeedback type="invalid">
                  <div>{penerimaanErr?.subtotal}</div>
                </FormFeedback>
              )}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col lg={6}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`ppnrupiah`}
                className="form-label mt-2"
              >
                PPN
              </Label>
            </Col>
            <Col lg={6}>
              <Input
                id={`ppnrupiah`}
                name={`ppnrupiah`}
                type="text"
                disabled
                value={ppn}
                invalid={
                  penerimaanTouched?.ppnrupiah && !!penerimaanErr?.ppnrupiah
                }
              />
              {penerimaanTouched?.ppnrupiah && !!penerimaanErr?.ppnrupiah && (
                <FormFeedback type="invalid">
                  <div>{penerimaanErr?.ppnrupiah}</div>
                </FormFeedback>
              )}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col lg={6}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`diskonrupiah`}
                className="form-label mt-2"
              >
                Diskon
              </Label>
            </Col>
            <Col lg={6}>
              <Input
                id={`diskonrupiah`}
                name={`diskonrupiah`}
                type="text"
                disabled
                value={diskon}
                invalid={
                  penerimaanTouched?.diskonrupiah &&
                  !!penerimaanErr?.diskonrupiah
                }
              />
              {penerimaanTouched?.diskonrupiah &&
                !!penerimaanErr?.diskonrupiah && (
                  <FormFeedback type="invalid">
                    <div>{penerimaanErr?.diskonrupiah}</div>
                  </FormFeedback>
                )}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col lg={6}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`total`}
                className="form-label mt-2"
              >
                Total Tagihan
              </Label>
            </Col>
            <Col lg={6}>
              <Input
                id={`total`}
                name={`total`}
                type="text"
                disabled
                value={total}
                invalid={penerimaanTouched?.total && !!penerimaanErr?.total}
              />
              {penerimaanTouched?.total && !!penerimaanErr?.total && (
                <FormFeedback type="invalid">
                  <div>{penerimaanErr?.total}</div>
                </FormFeedback>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export const ListAfterRetur = () => {
  const { vDetailRetur, validation, penerimaanTouched, penerimaanErr } =
    useContext(PenerimaanContext)
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Detail</span>,
      cell: (row) => (
        <div className="hstack gap-3 flex-wrap">
          <UncontrolledTooltip placement="top" target="edit-produk">
            Detail Produk
          </UncontrolledTooltip>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              itemType="button"
              id="edit-produk"
            >
              <i className="ri-apps-2-line"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem
                onClick={() => {
                  vDetailRetur.setValues({
                    ...row,
                  })
                }}
              >
                <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                Edit Produk
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
      sortable: true,
      width: '70px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Nama produk</span>,
      sortable: true,
      selector: (row) => row.produk.namaproduk,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Qty Retur</span>,
      selector: (row) => row.jumlahretur,
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

  const { norecpenerimaan } = useParams()
  let subtotal = validation.values.retur.reduce(
    (prev, curr) => prev + strToNumber(curr.subtotalproduk),
    0
  )
  subtotal =
    'Rp' + subtotal.toLocaleString('id-ID', { maximumFractionDigits: 5 })

  let ppn = validation.values.retur.reduce(
    (prev, curr) => prev + strToNumber(curr.ppnrupiahproduk),
    0
  )
  ppn = 'Rp' + ppn.toLocaleString('id-ID', { maximumFractionDigits: 5 })

  let diskon = validation.values.retur.reduce(
    (prev, curr) => prev + strToNumber(curr.diskonrupiah),
    0
  )
  diskon = 'Rp' + diskon.toLocaleString('id-ID', { maximumFractionDigits: 5 })

  let total = validation.values.retur.reduce(
    (prev, curr) => prev + strToNumber(curr.totalproduk),
    0
  )
  total = 'Rp' + total.toLocaleString('id-ID', { maximumFractionDigits: 5 })

  return (
    <Card className="p-5">
      <Row className="mb-5">
        <DataTable
          fixedHeader
          columns={columnsDetail}
          pagination
          data={validation.values.retur || []}
          progressPending={false}
          customStyles={tableCustomStyles}
          progressComponent={<LoadingTable />}
          noDataComponent={<NoDataTable />}
        />
      </Row>
      <Row>
        <Col lg={7} className="d-flex justify-content-around align-items-end">
          <Button
            type="submit"
            color="success"
            placement="top"
            formTarget="form-input-penerimaan"
          >
            {'Retur Produk'}
          </Button>
          <Link to="/farmasi/gudang/penerimaan-produk-list">
            <Button type="button" className="btn" color="danger">
              Batal
            </Button>
          </Link>
        </Col>
        <Col lg={5}>
          <Row className="mb-2">
            <Col lg={6}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`subtotal`}
                className="form-label mt-2"
              >
                Subtotal
              </Label>
            </Col>
            <Col lg={6}>
              <Input
                id={`subtotal`}
                name={`subtotal`}
                type="text"
                disabled
                value={subtotal}
                invalid={
                  penerimaanTouched?.subtotal && !!penerimaanErr?.subtotal
                }
              />
              {penerimaanTouched?.subtotal && !!penerimaanErr?.subtotal && (
                <FormFeedback type="invalid">
                  <div>{penerimaanErr?.subtotal}</div>
                </FormFeedback>
              )}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col lg={6}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`ppnrupiah`}
                className="form-label mt-2"
              >
                PPN
              </Label>
            </Col>
            <Col lg={6}>
              <Input
                id={`ppnrupiah`}
                name={`ppnrupiah`}
                type="text"
                disabled
                value={ppn}
                invalid={
                  penerimaanTouched?.ppnrupiah && !!penerimaanErr?.ppnrupiah
                }
              />
              {penerimaanTouched?.ppnrupiah && !!penerimaanErr?.ppnrupiah && (
                <FormFeedback type="invalid">
                  <div>{penerimaanErr?.ppnrupiah}</div>
                </FormFeedback>
              )}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col lg={6}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`diskonrupiah`}
                className="form-label mt-2"
              >
                Diskon
              </Label>
            </Col>
            <Col lg={6}>
              <Input
                id={`diskonrupiah`}
                name={`diskonrupiah`}
                type="text"
                disabled
                value={diskon}
                invalid={
                  penerimaanTouched?.diskonrupiah &&
                  !!penerimaanErr?.diskonrupiah
                }
              />
              {penerimaanTouched?.diskonrupiah &&
                !!penerimaanErr?.diskonrupiah && (
                  <FormFeedback type="invalid">
                    <div>{penerimaanErr?.diskonrupiah}</div>
                  </FormFeedback>
                )}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col lg={6}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`total`}
                className="form-label mt-2"
              >
                Total Tagihan
              </Label>
            </Col>
            <Col lg={6}>
              <Input
                id={`total`}
                name={`total`}
                type="text"
                disabled
                value={total}
                invalid={penerimaanTouched?.total && !!penerimaanErr?.total}
              />
              {penerimaanTouched?.total && !!penerimaanErr?.total && (
                <FormFeedback type="invalid">
                  <div>{penerimaanErr?.total}</div>
                </FormFeedback>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export const ListBeforeRetur = () => {
  const { vDetailRetur, validation } = useContext(PenerimaanContext)
  const [dateNow] = useState(() => new Date().toISOString())
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Detail</span>,
      cell: (row) => (
        <div className="hstack gap-3 flex-wrap">
          <UncontrolledTooltip placement="top" target="edit-produk">
            Detail Produk
          </UncontrolledTooltip>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              itemType="button"
              id="edit-produk"
            >
              <i className="ri-apps-2-line"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem
                onClick={() => {
                  vDetailRetur.setValues({
                    ...initialDetailRetur(dateNow),
                    ...row,
                  })
                }}
              >
                <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                Retur Produk
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
      sortable: true,
      width: '70px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Nama produk</span>,
      sortable: true,
      selector: (row) => row.produk.namaproduk,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Qty Penerimaan</span>,
      selector: (row) => strToNumber(row.jumlahterima),
      sortable: true,
      width: '110px',
    },
    {
      name: <span className="font-weight-bold fs-13">Qty Retur Lain</span>,
      selector: (row) => row.jumlahtotalretur,
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
  const { norecpenerimaan } = useParams()
  return (
    <Card className="p-5">
      <Row>
        <DataTable
          fixedHeader
          columns={columnsDetail}
          pagination
          data={validation.values.detail || []}
          progressPending={false}
          customStyles={tableCustomStyles}
          progressComponent={<LoadingTable />}
          noDataComponent={<NoDataTable />}
        />
      </Row>
    </Card>
  )
}

export const ListPesan = () => {
  /**
   * @type {import("react-data-table-component").TableColumn<typeof vDetail.values>[]}
   */
  const columnsPesan = [
    {
      name: <span className="font-weight-bold fs-13">Detail</span>,
      cell: (row) => (
        <div className="hstack gap-3 flex-wrap">
          <UncontrolledTooltip placement="top" target="edit-produk">
            Detail Produk
          </UncontrolledTooltip>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              itemType="button"
              id="edit-produk"
            >
              <i className="ri-apps-2-line"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem
                onClick={() => {
                  vDetail.setValues({
                    ...vDetail.initialValues,
                    ...row,
                  })
                }}
              >
                <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                Terima
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
      sortable: true,
      width: '70px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Nama produk</span>,
      sortable: true,
      selector: (row) => row.produk.namaproduk,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Qty Pemesanan</span>,
      selector: (row) => row.jumlahterima,
      sortable: true,
      width: '110px',
    },
    {
      name: <span className="font-weight-bold fs-13">Qty Penerimaan</span>,
      selector: (row) => {
        const qtyPenerimaan = validation.values.detail.reduce((prev, curr) => {
          if (curr.produk.idproduk === row.produk.idproduk) {
            return prev + (curr.jumlahterima ? Number(curr.jumlahterima) : 0)
          }
          return prev
        }, 0)
        console.log(qtyPenerimaan)
        return qtyPenerimaan
      },
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
      selector: (row) => `Rp${row.diskonrupiah?.toLocaleString('id-ID')}`,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">PPN</span>,
      sortable: true,
      selector: (row) => `Rp${row.ppnrupiahproduk?.toLocaleString('id-ID')}`,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Total</span>,
      sortable: true,
      selector: (row) => `Rp${row.totalproduk?.toLocaleString('id-ID')}`,
      width: '150px',
    },
  ]
  const { detailPemesanan, detailPemesananPenerimaan, vDetail, validation } =
    useContext(PenerimaanContext)
  const { norecpesan } = useParams()
  const isPesan = !!norecpesan

  return (
    <Card className="p-5 pb-0">
      <h4>Pemesanan</h4>
      <Row className="mb-5">
        <DataTable
          fixedHeader
          columns={columnsPesan}
          pagination
          data={
            detailPemesananPenerimaan.length > 0 && !isPesan
              ? detailPemesananPenerimaan
              : detailPemesanan || []
          }
          progressPending={false}
          customStyles={tableCustomStyles}
          progressComponent={<LoadingTable />}
          noDataComponent={<NoDataTable />}
        />
      </Row>
    </Card>
  )
}

export const InputProdukDetail = () => {
  const {
    vDetail,
    detail,
    detailErr,
    detailTouched,
    handleChangeDetail,
    handleChangeJumlahTerima,
    refSatuanTerima,
    isLogistik,
  } = useContext(PenerimaanContext)
  const { produk, satuanProduk, kemasanProduk } = useSelector((state) => ({
    produk: state.Master.comboPenerimaanBarangGet?.data?.produk || [],
    satuanProduk:
      state.Master.comboPenerimaanBarangGet?.data?.satuanproduk || [],
    kemasanProduk: state.Gudang.kemasanFromProdukGet?.data?.satuan || [],
  }))
  return (
    <Card className="p-5">
      <Row className="mb-2">
        <Col lg={4}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`produk`}
            className="form-label mt-2"
          >
            Nama Produk
          </Label>
          <CustomSelect
            id="produk"
            name="produk"
            options={produk}
            onChange={(e) => {
              handleChangeDetail('produk', {
                idproduk: e?.value || '',
                namaproduk: e?.label || '',
                satuanjual: e?.valuesatuanstandar || '',
              })
            }}
            isClearEmpty
            value={detail.produk.idproduk}
            className={`input ${detailErr?.produk ? 'is-invalid' : ''}`}
          />
          {detailTouched?.produk && !!detailErr?.produk && (
            <FormFeedback type="invalid">
              <div>{detailErr?.produk.idproduk}</div>
            </FormFeedback>
          )}
        </Col>
        <Col lg={4}>
          <Row>
            <Col lg={6}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`satuanjual`}
                className="form-label mt-2"
              >
                Satuan {isLogistik ? `Barang` : 'Jual'}
              </Label>
              <CustomSelect
                id="satuanjual"
                name="satuanjual"
                options={satuanProduk}
                value={detail.produk?.satuanjual}
                isDisabled
                className={`input 
                                  ${
                                    detailErr?.produk?.satuanjual
                                      ? 'is-invalid'
                                      : ''
                                  }`}
              />
              {detailTouched?.produk?.satuanjual &&
                !!detailErr?.produk?.satuanjual && (
                  <FormFeedback type="invalid">
                    <div>{detailErr?.produk?.satuanjual}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={6}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`satuanterima`}
                className="form-label mt-2"
              >
                Satuan Penerimaan
              </Label>
              <CustomSelect
                id="satuanterima"
                name="satuanterima"
                options={kemasanProduk}
                isDisabled={kemasanProduk.length === 0}
                onChange={(e) => {
                  vDetail.setFieldValue('satuanterima', e?.value || '')
                  vDetail.setFieldValue('namasatuanterima', e?.label || '')
                  vDetail.setFieldValue(
                    'konversisatuan',
                    e?.nilaikonversi || ''
                  )
                }}
                value={detail.satuanterima}
                className={`input ${
                  detailErr?.satuanterima ? 'is-invalid' : ''
                }`}
                ref={refSatuanTerima}
              />
              {detailTouched?.satuanterima && !!detailErr?.satuanterima && (
                <FormFeedback type="invalid">
                  <div>{detailErr?.satuanterima}</div>
                </FormFeedback>
              )}
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col lg={6}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`konversisatuan`}
                className="form-label mt-2"
              >
                Konversi Satuan
              </Label>
              <Input
                id={`konversisatuan`}
                name={`konversisatuan`}
                type="text"
                value={detail.konversisatuan}
                disabled
                invalid={
                  detailTouched?.konversisatuan && !!detailErr?.konversisatuan
                }
              />
              {detailTouched?.konversisatuan && !!detailErr?.konversisatuan && (
                <FormFeedback type="invalid">
                  <div>{detailErr?.konversisatuan}</div>
                </FormFeedback>
              )}
            </Col>
            <Col lg={6}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`jumlahterima`}
                className="form-label mt-2"
              >
                Jumlah Terima
              </Label>
              <Input
                id={`jumlahterima`}
                name={`jumlahterima`}
                type="text"
                value={detail.jumlahterima}
                onChange={handleChangeJumlahTerima}
                invalid={
                  detailTouched?.jumlahterima && !!detailErr?.jumlahterima
                }
              />
              {detailTouched?.jumlahterima && !!detailErr?.jumlahterima && (
                <FormFeedback type="invalid">
                  <div>{detailErr?.jumlahterima}</div>
                </FormFeedback>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col lg={4}>
          <Row>
            <Col lg={6}>
              <div className="d-flex flex-row mt-2 form-label">
                <Input
                  className="form-check-input"
                  type="radio"
                  id={`radio-satuan-kecil`}
                  checked={detail.checkedharga === '0'}
                  onChange={(e) => {
                    e.target.checked && handleChangeDetail('checkedharga', '0')
                  }}
                />
                <Label
                  className="form-check-label ms-2"
                  htmlFor={`radio-satuan-kecil`}
                  style={{ color: 'black' }}
                >
                  Harga satuan kecil
                </Label>
              </div>
              <Input
                id={`hargasatuankecil`}
                name={`hargasatuankecil`}
                type="text"
                value={detail.hargasatuankecil}
                disabled={detail.checkedharga !== '0'}
                onChange={(e) => {
                  const newVal = onChangeStrNbr(
                    e.target.value,
                    detail.hargasatuankecil
                  )
                  handleChangeDetail('hargasatuankecil', newVal)
                }}
                invalid={
                  detailTouched?.hargasatuankecil &&
                  !!detailErr?.hargasatuankecil
                }
              />
              {detailTouched?.hargasatuankecil &&
                !!detailErr?.hargasatuankecil && (
                  <FormFeedback type="invalid">
                    <div>{detailErr?.hargasatuankecil}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={6}>
              <div className="d-flex flex-row mt-2 form-label">
                <Input
                  className="form-check-input"
                  type="radio"
                  id={`radio-satuan-terima`}
                  checked={detail.checkedharga === '1'}
                  onChange={(e) => {
                    e.target.checked && handleChangeDetail('checkedharga', '1')
                  }}
                />
                <Label
                  className="form-check-label ms-2"
                  htmlFor={`radio-satuan-terima`}
                  style={{ color: 'black' }}
                >
                  Harga satuan terima
                </Label>
              </div>
              <Input
                id={`hargasatuanterima`}
                name={`hargasatuanterima`}
                type="text"
                value={detail.hargasatuanterima}
                disabled={detail.checkedharga !== '1'}
                onChange={(e) => {
                  const newVal = onChangeStrNbr(
                    e.target.value,
                    detail.hargasatuanterima
                  )
                  handleChangeDetail('hargasatuanterima', newVal)
                }}
                invalid={
                  detailTouched?.hargasatuanterima &&
                  !!detailErr?.hargasatuanterima
                }
              />
              {detailTouched?.hargasatuanterima &&
                !!detailErr?.hargasatuanterima && (
                  <FormFeedback type="invalid">
                    <div>{detailErr?.hargasatuanterima}</div>
                  </FormFeedback>
                )}
            </Col>
          </Row>
        </Col>
        <Col lg={4}>
          <Row>
            <Col lg={6}>
              <div className="d-flex flex-row mt-2 form-label">
                <Input
                  className="form-check-input"
                  type="radio"
                  id={`radio-diskon-persen`}
                  checked={detail.checkeddiskon === '0'}
                  onChange={(e) => {
                    e.target.checked && handleChangeDetail('checkeddiskon', '0')
                  }}
                />
                <Label
                  className="form-check-label ms-2"
                  htmlFor={`radio-diskon-persen`}
                  style={{ color: 'black' }}
                >
                  Diskon (%)
                </Label>
              </div>
              <Input
                id={`diskonpersen`}
                name={`diskonpersen`}
                type="text"
                value={detail.diskonpersen}
                disabled={detail.checkeddiskon !== '0'}
                onChange={(e) => {
                  const newVal = onChangeStrNbr(
                    e.target.value,
                    detail.diskonpersen
                  )
                  handleChangeDetail('diskonpersen', newVal)
                }}
                invalid={
                  detailTouched?.diskonpersen && !!detailErr?.diskonpersen
                }
              />
              {detailTouched?.diskonpersen && !!detailErr?.diskonpersen && (
                <FormFeedback type="invalid">
                  <div>{detailErr?.diskonpersen}</div>
                </FormFeedback>
              )}
            </Col>
            <Col lg={6}>
              <div className="d-flex flex-row mt-2 form-label">
                <Input
                  className="form-check-input"
                  type="radio"
                  id={`radio-diskon-rupiah`}
                  checked={detail.checkeddiskon === '1'}
                  onChange={(e) => {
                    e.target.checked && handleChangeDetail('checkeddiskon', '1')
                  }}
                />
                <Label
                  className="form-check-label ms-2"
                  htmlFor={`radio-diskon-rupiah`}
                  style={{ color: 'black' }}
                >
                  Diskon (Rp)
                </Label>
              </div>
              <Input
                id={`diskonrupiah`}
                name={`diskonrupiah`}
                type="text"
                value={detail.diskonrupiah}
                disabled={detail.checkeddiskon !== '1'}
                onChange={(e) => {
                  const newVal = onChangeStrNbr(
                    e.target.value,
                    detail.diskonpersen
                  )
                  handleChangeDetail('diskonrupiah', newVal)
                }}
                invalid={
                  detailTouched?.diskonrupiah && !!detailErr?.diskonrupiah
                }
              />
              {detailTouched?.diskonrupiah && !!detailErr?.diskonrupiah && (
                <FormFeedback type="invalid">
                  <div>{detailErr?.diskonrupiah}</div>
                </FormFeedback>
              )}
            </Col>
          </Row>
        </Col>
        <Col lg={4}>
          <Row>
            <Col lg={6}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`ppnpersenproduk`}
                className="form-label mt-2"
              >
                PPn (%)
              </Label>
              <Input
                id={`ppnpersenproduk`}
                name={`ppnpersenproduk`}
                type="text"
                value={detail.ppnpersenproduk}
                onChange={(e) => {
                  const newVal = onChangeStrNbr(
                    e.target.value,
                    detail.ppnpersenproduk
                  )
                  handleChangeDetail('ppnpersenproduk', newVal)
                }}
                invalid={
                  detailTouched?.ppnpersenproduk && !!detailErr?.ppnpersenproduk
                }
              />
              {detailTouched?.ppnpersenproduk &&
                !!detailErr?.ppnpersenproduk && (
                  <FormFeedback type="invalid">
                    <div>{detailErr?.ppnpersenproduk}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={6}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`ppnrupiahproduk`}
                className="form-label mt-2"
              >
                PPn (Rp)
              </Label>
              <Input
                id={`ppnrupiahproduk`}
                name={`ppnrupiahproduk`}
                type="text"
                value={detail.ppnrupiahproduk}
                disabled
                onChange={(e) => {
                  const newVal = onChangeStrNbr(
                    e.target.value,
                    detail.ppnrupiahproduk
                  )
                  handleChangeDetail('ppnrupiahproduk', newVal)
                }}
                invalid={
                  detailTouched?.ppnrupiahproduk && !!detailErr?.ppnrupiahproduk
                }
              />
              {detailTouched?.ppnrupiahproduk &&
                !!detailErr?.ppnrupiahproduk && (
                  <FormFeedback type="invalid">
                    <div>{detailErr?.ppnrupiahproduk}</div>
                  </FormFeedback>
                )}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col lg={4}>
          <Row>
            <Col lg={6}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`tanggaled`}
                className="form-label mt-2"
              >
                E.D
              </Label>
              <Flatpickr
                className="form-control"
                id="tanggaled"
                options={{
                  dateFormat: 'Y-m-d',
                  defaultDate: 'today',
                }}
                onChange={([newDate]) => {
                  handleChangeDetail('tanggaled', newDate.toISOString())
                }}
              />
              {detailTouched?.tanggaled && !!detailErr?.tanggaled && (
                <FormFeedback type="invalid">
                  <div>{detailErr?.tanggaled}</div>
                </FormFeedback>
              )}
            </Col>
            <Col lg={6}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`nobatch`}
                className="form-label mt-2"
              >
                No Batch
              </Label>
              <Input
                id={`nobatch`}
                name={`nobatch`}
                type="text"
                value={detail.nobatch}
                onChange={(e) => {
                  handleChangeDetail('nobatch', e.target.value)
                }}
                invalid={detailTouched?.nobatch && !!detailErr?.nobatch}
              />
              {detailTouched?.nobatch && !!detailErr?.nobatch && (
                <FormFeedback type="invalid">
                  <div>{detailErr?.nobatch}</div>
                </FormFeedback>
              )}
            </Col>
          </Row>
        </Col>
        <Col lg={4}>
          <Row>
            <Col lg={6}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`subtotalproduk`}
                className="form-label mt-2"
              >
                Subtotal
              </Label>
              <Input
                id={`subtotalproduk`}
                name={`subtotalproduk`}
                type="text"
                value={detail.subtotalproduk}
                disabled
                invalid={
                  detailTouched?.subtotalproduk && !!detailErr?.subtotalproduk
                }
              />
              {detailTouched?.subtotalproduk && !!detailErr?.subtotalproduk && (
                <FormFeedback type="invalid">
                  <div>{detailErr?.subtotalproduk}</div>
                </FormFeedback>
              )}
            </Col>
            <Col lg={6}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`totalproduk`}
                className="form-label mt-2"
              >
                Total
              </Label>
              <Input
                id={`totalproduk`}
                name={`totalproduk`}
                type="text"
                value={detail.totalproduk}
                disabled
                onChange={(e) => {
                  const newVal = onChangeStrNbr(
                    e.target.value,
                    detail.totalproduk
                  )
                  handleChangeDetail('totalproduk', newVal)
                }}
                invalid={detailTouched?.totalproduk && !!detailErr?.totalproduk}
              />
              {detailTouched?.totalproduk && !!detailErr?.totalproduk && (
                <FormFeedback type="invalid">
                  <div>{detailErr?.totalproduk}</div>
                </FormFeedback>
              )}
            </Col>
          </Row>
        </Col>
        <Col
          lg={4}
          className="d-flex 
                  justify-content-between align-items-end"
        >
          <Button
            type="button"
            onClick={() => {
              vDetail.handleSubmit()
            }}
            color="success"
            placement="top"
            formTarget="form-input-produk-detail"
            id="tooltipTop"
          >
            {!vDetail.values.indexDetail ? 'Tambah' : 'Edit'}
          </Button>
          <Button
            type="button"
            className="btn"
            color="warning"
            onClick={() => {
              vDetail.resetForm()
            }}
          >
            Batal
          </Button>
          <Button type="button" className="btn" color="danger">
            Hapus
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export const InputProdukDetailRetur = () => {
  const {
    vDetailRetur,
    handleChangeDetail,
    handleChangeJumlahTerima,
    validation,
  } = useContext(PenerimaanContext)
  const { produk, satuanProduk, kemasanProduk } = useSelector((state) => ({
    produk: state.Master.comboPenerimaanBarangGet?.data?.produk || [],
    satuanProduk:
      state.Master.comboPenerimaanBarangGet?.data?.satuanproduk || [],
    kemasanProduk: state.Gudang.kemasanFromProdukGet?.data?.satuan || [],
  }))
  const detail = vDetailRetur.values
  const detailErr = vDetailRetur.errors
  const detailTouched = vDetailRetur.touched
  const handleChangeJumlahRetur = (e) => {
    let newVal = onChangeStrNbr(e.target.value, vDetailRetur.values.jumlahretur)
    let newJmlRetur = strToNumber(newVal)
    const jmlTerima =
      strToNumber(detail.jumlahterima) - strToNumber(detail.jumlahtotalretur)
    if (newJmlRetur > jmlTerima) {
      newVal = jmlTerima
    }
    vDetailRetur.setFieldValue('jumlahretur', newVal)
  }
  return (
    <Card className="p-5">
      <Row className="mb-2">
        <Col lg={4}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`produk`}
            className="form-label mt-2"
          >
            Nama Produk
          </Label>
          <CustomSelect
            id="produk"
            name="produk"
            options={produk}
            isDisabled
            isClearEmpty
            onChange={(e) => {
              handleChangeDetail('produk', {
                idproduk: e?.value || '',
                namaproduk: e?.label || '',
                satuanjual: e?.valuesatuanstandar || '',
              })
            }}
            value={detail.produk.idproduk}
            className={`input ${detailErr?.produk ? 'is-invalid' : ''}`}
          />
          {detailTouched?.produk && !!detailErr?.produk && (
            <FormFeedback type="invalid">
              <div>{detailErr?.produk?.idproduk}</div>
            </FormFeedback>
          )}
        </Col>
        <Col lg={1}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`nobatch`}
            className="form-label mt-2"
          >
            No Batch
          </Label>
          <Input
            id={`nobatch`}
            name={`nobatch`}
            disabled
            type="text"
            value={detail.nobatch}
            onChange={(e) => {
              handleChangeDetail('nobatch', e.target.value)
            }}
            invalid={detailTouched?.nobatch && !!detailErr?.nobatch}
          />
          {detailTouched?.nobatch && !!detailErr?.nobatch && (
            <FormFeedback type="invalid">
              <div>{detailErr?.nobatch}</div>
            </FormFeedback>
          )}
        </Col>
        <Col lg={2}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`jumlahterima`}
            className="form-label mt-2"
          >
            Jumlah Max Retur
          </Label>
          <Input
            id={`jumlahterima`}
            name={`jumlahterima`}
            type="text"
            value={
              strToNumber(detail.jumlahterima) -
              strToNumber(detail.jumlahtotalretur)
            }
            onChange={handleChangeJumlahTerima}
            disabled
            invalid={detailTouched?.jumlahterima && !!detailErr?.jumlahterima}
          />
          {detailTouched?.jumlahterima && !!detailErr?.jumlahterima && (
            <FormFeedback type="invalid">
              <div>{detailErr?.jumlahterima}</div>
            </FormFeedback>
          )}
        </Col>
        <Col lg={2}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`jumlahretur`}
            className="form-label mt-2"
          >
            Jumlah Retur
          </Label>
          <Input
            id={`jumlahretur`}
            name={`jumlahretur`}
            type="text"
            value={detail.jumlahretur}
            onChange={handleChangeJumlahRetur}
            invalid={detailTouched?.jumlahretur && !!detailErr?.jumlahretur}
          />
          {detailTouched?.jumlahretur && !!detailErr?.jumlahretur && (
            <FormFeedback type="invalid">
              <div>{detailErr?.jumlahretur}</div>
            </FormFeedback>
          )}
        </Col>
        <Col lg={3}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`alasanretur`}
            className="form-label mt-2"
          >
            Alasan Retur
          </Label>
          <Input
            id={`alasanretur`}
            name={`alasanretur`}
            type="text"
            value={detail.alasanretur}
            onChange={(e) => {
              vDetailRetur.setFieldValue('alasanretur', e.target.value)
            }}
            invalid={detailTouched?.alasanretur && !!detailErr?.alasanretur}
          />
          {detailTouched?.alasanretur && !!detailErr?.alasanretur && (
            <FormFeedback type="invalid">
              <div>{detailErr?.alasanretur}</div>
            </FormFeedback>
          )}
        </Col>
      </Row>
      <div className="d-flex justify-content-between mt-3">
        <div></div>
        <Row className="">
          <Col lg="auto">
            <Button
              type="button"
              onClick={() => {
                vDetailRetur.handleSubmit()
              }}
              color="success"
              placement="top"
              formTarget="form-input-produk-detail"
              id="tooltipTop"
            >
              {vDetailRetur.values.indexRetur === '' ? 'Tambah' : 'Edit'}
            </Button>
          </Col>
          <Col lg="auto">
            <Button
              type="button"
              className="btn"
              color="warning"
              onClick={() => {
                vDetailRetur.resetForm()
              }}
            >
              Batal
            </Button>
          </Col>
          <Col lg="auto">
            <Button
              type="button"
              className="btn"
              color="danger"
              onClick={() => {
                vDetailRetur.resetForm()
                validation.values.retur = validation.values.retur.filter(
                  (ret) => ret.nobatch !== vDetailRetur.values.nobatch
                )
              }}
            >
              Hapus
            </Button>
          </Col>
        </Row>
      </div>
    </Card>
  )
}

export const InputUmumTerima = () => {
  const { supplier, unit, asalProduk } = useSelector((state) => ({
    supplier: state.Master.comboPenerimaanBarangGet?.data?.supplier || [],
    asalProduk: state.Master.comboPenerimaanBarangGet?.data?.asalproduk || [],
    unit: state.Master.comboPenerimaanBarangGet?.data?.unit || [],
  }))
  const { norecpenerimaan } = useParams()

  const {
    penerimaan,
    penerimaanTouched,
    penerimaanErr,
    handleChangePenerimaan,
    isRetur,
  } = useContext(PenerimaanContext)
  return (
    <Card className="p-5">
      <Row className="mb-2">
        <Col lg={1}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`nomorterima`}
            className="form-label mt-2"
          >
            No Terima
          </Label>
        </Col>
        <Col lg={3}>
          <Input
            id={`nomorterima`}
            name={`nomorterima`}
            type="text"
            value={penerimaan.nomorterima}
            disabled={!!norecpenerimaan}
            onChange={(e) => {
              handleChangePenerimaan('nomorterima', e.target.value)
            }}
            invalid={
              penerimaanTouched?.nomorterima && !!penerimaanErr?.nomorterima
            }
          />
          {penerimaanTouched?.nomorterima && !!penerimaanErr?.nomorterima && (
            <FormFeedback type="invalid">
              <div>{penerimaanErr?.nomorterima}</div>
            </FormFeedback>
          )}
        </Col>
        <Col lg={1}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`tanggalterima`}
            className="form-label mt-2"
          >
            Tgl Terima
          </Label>
        </Col>
        <Col lg={3}>
          <Flatpickr
            // value={penerimaan.tglregistrasi || ""}
            className="form-control"
            id="tanggalterima"
            options={{
              dateFormat: 'Y-m-d',
              defaultDate: 'today',
            }}
            onChange={([newDate]) => {
              handleChangePenerimaan('tanggalterima', newDate.toISOString())
            }}
          />
          {penerimaanTouched?.tanggalterima &&
            !!penerimaanErr?.tanggalterima && (
              <FormFeedback type="invalid">
                <div>{penerimaanErr?.tanggalterima}</div>
              </FormFeedback>
            )}
        </Col>
        <Col lg={1}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`namasupplier`}
            className="form-label mt-2"
          >
            Supplier
          </Label>
        </Col>
        <Col lg={3}>
          <CustomSelect
            id="namasupplier"
            name="namasupplier"
            options={supplier}
            onChange={(e) => {
              handleChangePenerimaan('namasupplier', e?.value || '')
            }}
            value={penerimaan.namasupplier}
            className={`input ${
              penerimaanErr?.namasupplier ? 'is-invalid' : ''
            }`}
          />
          {penerimaanTouched?.namasupplier && penerimaanErr?.namasupplier ? (
            <FormFeedback type="invalid">
              <div>{penerimaanErr?.namasupplier}</div>
            </FormFeedback>
          ) : null}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col lg={1}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`nomorpo`}
            className="form-label mt-2"
          >
            No PO
          </Label>
        </Col>
        <Col lg={3}>
          <Input
            id={`nomorpo`}
            name={`nomorpo`}
            type="text"
            value={penerimaan.nomorpo}
            onChange={(e) => {
              handleChangePenerimaan('nomorpo', e.target.value)
            }}
            invalid={penerimaanTouched?.nomorpo && !!penerimaanErr?.nomorpo}
          />
          {penerimaanTouched?.nomorpo && !!penerimaanErr?.nomorpo ? (
            <FormFeedback type="invalid">
              <div>{penerimaanErr?.nomorpo}</div>
            </FormFeedback>
          ) : null}
        </Col>
        <Col lg={1}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`tanggalpesan`}
            className="form-label mt-2"
          >
            Tgl Pesan
          </Label>
        </Col>
        <Col lg={3}>
          <Flatpickr
            // value={penerimaan.tglregistrasi || ""}
            className="form-control"
            id="tanggalpesan"
            options={{
              dateFormat: 'Y-m-d',
              defaultDate: 'today',
            }}
            onChange={([newDate]) => {
              handleChangePenerimaan('tanggalpesan', newDate.toISOString())
            }}
          />
          {penerimaanTouched?.tanggalpesan && !!penerimaanErr?.tanggalpesan && (
            <FormFeedback type="invalid">
              <div>{penerimaanErr?.tanggalpesan}</div>
            </FormFeedback>
          )}
        </Col>
        <Col lg={1}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`unitpesan`}
            className="form-label mt-2"
          >
            Unit Pesan
          </Label>
        </Col>
        <Col lg={3}>
          <CustomSelect
            id="unitpesan"
            name="unitpesan"
            options={unit}
            onChange={(e) => {
              handleChangePenerimaan('unitpesan', e?.value || '')
            }}
            value={penerimaan.unitpesan}
            className={`input ${penerimaanErr?.unitpesan ? 'is-invalid' : ''}`}
          />
          {penerimaanTouched?.unitpesan && !!penerimaanErr?.unitpesan && (
            <FormFeedback type="invalid">
              <div>{penerimaanErr?.unitpesan}</div>
            </FormFeedback>
          )}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col lg={1}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`tanggaljatuhtempo`}
            className="form-label"
          >
            Tgl Jatuh tempo
          </Label>
        </Col>
        <Col lg={3}>
          <Flatpickr
            // value={penerimaan.tglregistrasi || ""}
            className="form-control"
            id="tanggaljatuhtempo"
            options={{
              dateFormat: 'Y-m-d',
              defaultDate: 'today',
            }}
            onChange={([newDate]) => {
              handleChangePenerimaan('tanggaljatuhtempo', newDate.toISOString())
            }}
          />
          {penerimaanTouched?.tanggaljatuhtempo &&
            !!penerimaanErr?.tanggaljatuhtempo && (
              <FormFeedback type="invalid">
                <div>{penerimaanErr?.tanggaljatuhtempo}</div>
              </FormFeedback>
            )}
        </Col>
        <Col lg={1}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`sumberdana`}
            className="form-label"
          >
            Sumber Dana
          </Label>
        </Col>
        <Col lg={3}>
          <CustomSelect
            id="sumberdana"
            name="sumberdana"
            options={asalProduk}
            onChange={(e) => {
              handleChangePenerimaan('sumberdana', e?.value || '')
            }}
            value={penerimaan.sumberdana}
            className={`input ${penerimaanErr?.sumberdana ? 'is-invalid' : ''}`}
          />
          {penerimaanTouched?.sumberdana && !!penerimaanErr?.sumberdana && (
            <FormFeedback type="invalid">
              <div>{penerimaanErr?.sumberdana}</div>
            </FormFeedback>
          )}
        </Col>
        <Col lg={1}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`keterangan`}
            className="form-label mt-2"
          >
            Keterangan
          </Label>
        </Col>
        <Col lg={3}>
          <Input
            id={`keterangan`}
            name={`keterangan`}
            type="text"
            value={penerimaan.keterangan}
            onChange={(e) => {
              handleChangePenerimaan('keterangan', e.target.value)
            }}
            invalid={
              penerimaanTouched?.keterangan && !!penerimaanErr?.keterangan
            }
          />
          {penerimaanTouched?.keterangan && !!penerimaanErr?.keterangan && (
            <FormFeedback type="invalid">
              <div>{penerimaanErr?.keterangan}</div>
            </FormFeedback>
          )}
        </Col>
        {isRetur && (
          <>
            <Col lg={1}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`nomorretur`}
                className="form-label mt-2"
              >
                No Retur
              </Label>
            </Col>
            <Col lg={3}>
              <Input
                id={`nomorretur`}
                name={`nomorretur`}
                type="text"
                value={penerimaan.nomorretur}
                onChange={(e) => {
                  handleChangePenerimaan('nomorretur', e.target.value || '')
                }}
                invalid={
                  penerimaanTouched?.nomorretur && !!penerimaanErr?.nomorretur
                }
              />
              {penerimaanTouched?.nomorretur && !!penerimaanErr?.nomorretur && (
                <FormFeedback type="invalid">
                  <div>{penerimaanErr?.nomorretur}</div>
                </FormFeedback>
              )}
            </Col>
          </>
        )}
      </Row>
    </Card>
  )
}

export const useGetKemasan = (vDetail, detail) => {
  const dispatch = useDispatch()
  const refSatuanTerima = useRef(null)
  useEffect(() => {
    const idProduk = detail.produk.idproduk
    const setFF = vDetail.setFieldValue
    const onGetSatuanSuccess = (data) => {
      // reset value jika ada satuan baru
      if (Array.isArray(data) && data.length === 0) {
        refSatuanTerima.current?.clearValue()
        return
      }
      const newData = [...data.satuan]
      const dataSatuan = newData.find(
        (val) => val.value === detail.satuanterima
      )
      if (!dataSatuan) {
        refSatuanTerima.current?.clearValue()
        return
      }
      setFF('satuanterima', dataSatuan?.value || '')
      setFF('namasatuanterima', dataSatuan?.label || '')
      setFF('konversisatuan', dataSatuan?.nilaikonversi || '')
    }
    idProduk &&
      dispatch(kemasanFromProdukGet({ idproduk: idProduk }, onGetSatuanSuccess))
  }, [
    dispatch,
    detail.produk.idproduk,
    detail.satuanterima,
    vDetail.setFieldValue,
  ])

  return refSatuanTerima
}

export const useSetNorecPenerimaan = (validation) => {
  const { norecpenerimaan, norecpesan } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    const setFF = validation.setFieldValue

    setFF('norecpenerimaan', norecpenerimaan)
    setFF('norecpemesanan', norecpesan)
  }, [dispatch, norecpenerimaan, validation.setFieldValue, norecpesan])
}

export const useGetData = (isLogistik) => {
  const { norecpesan, norecpenerimaan, norecretur } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(comboPenerimaanBarangGet({ isLogistik: isLogistik }))
  }, [dispatch, isLogistik])
  useEffect(() => {
    norecpesan && dispatch(getPemesanan({ norecpesan: norecpesan }))
  }, [norecpesan, dispatch])
  useEffect(() => {
    norecpenerimaan &&
      dispatch(
        penerimaanQueryGet({
          norecpenerimaan: norecpenerimaan,
          norecretur: norecretur,
        })
      )
  }, [norecpenerimaan, norecretur, dispatch])
  useEffect(() => {
    dispatch(getRetur({ norecretur: norecretur }))
  }, [norecretur, dispatch])
}

// saat awal, masukkan data2 dari api ke dalam input
export const useFillInitialInput = (validation) => {
  const { norecpenerimaan, norecpesan, norecretur } = useParams()
  const { penerimaanQuery, pemesanan, retur, detailRetur } = useSelector(
    (state) => ({
      penerimaanQuery: state.Gudang.penerimaanQueryGet?.data || null,
      pemesanan: state.Gudang.getPemesanan?.data?.pemesanan || null,
      retur: state.Gudang.getRetur?.data?.retur || null,
      detailRetur: state.Gudang.getRetur?.data?.detailRetur || null,
    }),
    shallowEqual
  )
  useEffect(() => {
    const isPesan = !!norecpesan
    const setFF = validation.setFieldValue
    if (norecpenerimaan) {
      // jika penerimaan
      if (penerimaanQuery.detailPenerimaan) {
        const detailPenerimaan = penerimaanQuery.detailPenerimaan.map(
          (values, index) => ({
            ...values,
            indexDetail: index,
          })
        )
        setFF('detail', detailPenerimaan || [])
      }
      // jika ada retur
      if (detailRetur) {
        let newDetailRetur = detailRetur.map((values, index) => ({
          ...values,
          indexRetur: index,
        }))
        setFF('retur', newDetailRetur || [])
      }
      let newPenerimaan = {
        ...validation.initialValues.penerimaan,
      }
      if (penerimaanQuery.penerimaan) {
        newPenerimaan = {
          ...newPenerimaan,
          ...penerimaanQuery.penerimaan,
          indexRetur: '',
        }
      }
      if (retur && norecretur) {
        newPenerimaan = {
          ...newPenerimaan,
          nomorretur: retur.nomorretur || '',
        }
      }
      setFF('penerimaan', newPenerimaan)
    } else {
      // jika kosong atau pemesanan
      if (!isPesan) {
        setFF('detail', [])
        setFF('penerimaan', validation.initialValues.penerimaan)
      }
      let newPenerimaan = {
        ...validation.initialValues.penerimaan,
      }
      if (isPesan && pemesanan) {
        newPenerimaan = {
          ...newPenerimaan,
          namasupplier: pemesanan.namasupplier,
          nomorpo: pemesanan.nomorpo,
          tanggalpesan: pemesanan.tanggalpesan,
          unitpesan: pemesanan.unitpesan,
          sumberdana: pemesanan.sumberdana,
          keterangan: pemesanan.keterangan || '',
        }
      }
      if (retur && norecretur) {
        newPenerimaan = {
          ...newPenerimaan,
          nomorretur: retur.nomorretur || '',
        }
      }
      setFF('penerimaan', newPenerimaan)
    }
  }, [
    penerimaanQuery,
    validation.setFieldValue,
    norecpenerimaan,
    norecpesan,
    validation.initialValues.penerimaan,
    pemesanan,
    norecretur,
    detailRetur,
    retur,
  ])
}

// Perhitungan satuan jumlah terima, harga, Diskon, dan ppn
// saat jumlah, terima, harga sudah diinput akan otomatis menghitung total harga
export const useCalculatePenerimaan = (vDetail) => {
  const detail = vDetail.values
  useEffect(() => {
    const setFF = vDetail.setFieldValue
    const calcualteSatuanTerima = () => {
      let newValTerima
      if (detail.checkedharga === '0') {
        const hargaSatuan = detail.hargasatuankecil
        newValTerima = strToNumber(hargaSatuan) * detail.konversisatuan
        const newValTerimaStr = onChangeStrNbr(
          newValTerima,
          detail.hargasatuankecil
        )
        setFF('hargasatuanterima', newValTerimaStr)
      } else {
        newValTerima = strToNumber(detail.hargasatuanterima)
        let newValKecil = newValTerima / (detail.konversisatuan || 1)
        const newValKecilStr = onChangeStrNbr(
          newValKecil,
          detail.hargasatuankecil
        )
        setFF('hargasatuankecil', newValKecilStr)
        let newValSubtotal =
          strToNumber(newValKecilStr) * strToNumber(detail.jumlahterima || 0)
        newValSubtotal = onChangeStrNbr(newValSubtotal, detail.subtotalproduk)
        setFF('subtotalproduk', newValSubtotal)
      }
      return newValTerima
    }
    const calculateSubtotal = (newValTerima) => {
      let newValSubtotal = newValTerima * strToNumber(detail.jumlahterima || 0)
      const newValSubtotalStr = onChangeStrNbr(
        newValSubtotal,
        detail.subtotalproduk
      )
      setFF('subtotalproduk', newValSubtotalStr)
      return newValSubtotal
    }

    const calculateDiskon = (newValSubtotal) => {
      let newValDiskon
      if (detail.checkeddiskon === '0') {
        const diskonPersen = detail.diskonpersen
        newValDiskon = (strToNumber(diskonPersen) * newValSubtotal) / 100
        const newValDiskonStr = onChangeStrNbr(
          newValDiskon,
          detail.diskonpersen
        )
        setFF('diskonrupiah', newValDiskonStr)
      } else {
        newValDiskon = strToNumber(detail.diskonrupiah)
      }
      return newValDiskon
    }
    const calculatePpn = (newValSubtotal, newValDiskon) => {
      const ppnPersen = detail.ppnpersenproduk
      let newValPpn = newValSubtotal - newValDiskon
      newValPpn = (newValPpn * strToNumber(ppnPersen)) / 100
      const newValPpnStr = onChangeStrNbr(newValPpn, detail.ppnrupiahproduk)
      setFF('ppnrupiahproduk', newValPpnStr)
      return newValPpn
    }

    const calculateTotal = (newValSubtotal, newValDiskon, newValPpn) => {
      let newValTotal = newValSubtotal - newValDiskon + newValPpn
      newValTotal = onChangeStrNbr(newValTotal, detail.totalproduk)
      setFF('totalproduk', newValTotal)
      return newValTotal
    }

    const newValTerima = calcualteSatuanTerima()
    const newValSubtotal = calculateSubtotal(newValTerima)
    const newValDiskon = calculateDiskon(newValSubtotal)
    const newValPpn = calculatePpn(newValSubtotal, newValDiskon)
    calculateTotal(newValSubtotal, newValDiskon, newValPpn)
  }, [
    detail.hargasatuankecil,
    detail.hargasatuanterima,
    detail.checkedharga,
    detail.konversisatuan,
    detail.jumlahterima,
    detail.subtotalproduk,
    detail.diskonrupiah,
    detail.totalproduk,
    detail.checkeddiskon,
    detail.diskonpersen,
    detail.ppnpersenproduk,
    detail.ppnrupiahproduk,
    vDetail.setFieldValue,
  ])
}

// Perhitungan satuan jumlah terima, harga, Diskon, dan ppn
// saat jumlah, terima, harga sudah diinput akan otomatis menghitung total harga
export const useCalculateRetur = (vDetailRetur, details) => {
  const retur = vDetailRetur.values
  useEffect(() => {
    const setFF = vDetailRetur.setFieldValue
    const detail = details.find(
      (detail) =>
        detail.produk.idproduk === retur.produk.idproduk &&
        detail.nobatch === retur.nobatch
    )
    if (!detail) return

    const ratio =
      strToNumber(retur.jumlahretur) / strToNumber(retur.jumlahterima)
    const newHargaSatuanTerima = strToNumber(detail.hargasatuanterima) * ratio
    const newSubtotalProduk = strToNumber(detail.subtotalproduk) * ratio
    const newDiskonRupiah = strToNumber(detail.diskonrupiah) * ratio
    const newDiskonPersen = detail.diskonpersen
    const newPPNRupiah = strToNumber(detail.ppnrupiahproduk) * ratio
    const newPPNPersen = detail.ppnpersenproduk
    const newTotalProduk = strToNumber(detail.totalproduk) * ratio
    setFF(
      'hargasatuanterima',
      onChangeStrNbr(newHargaSatuanTerima, retur.hargasatuanterima)
    )
    setFF(
      'subtotalproduk',
      onChangeStrNbr(newSubtotalProduk, retur.subtotalproduk)
    )
    setFF('diskonrupiah', onChangeStrNbr(newDiskonRupiah, retur.diskonrupiah))
    setFF('diskonpersen', onChangeStrNbr(newDiskonPersen, retur.diskonpersen))
    setFF(
      'ppnrupiahproduk',
      onChangeStrNbr(newPPNRupiah, retur.ppnrupiahproduk)
    )
    setFF(
      'ppnpersenproduk',
      onChangeStrNbr(newPPNPersen, retur.ppnpersenproduk)
    )
    setFF('totalproduk', onChangeStrNbr(newTotalProduk, retur.totalproduk))
  }, [
    retur.hargasatuankecil,
    retur.hargasatuanterima,
    retur.checkedharga,
    retur.konversisatuan,
    retur.jumlahretur,
    retur.jumlahterima,
    retur.subtotalproduk,
    retur.diskonrupiah,
    retur.diskonpersen,
    retur.totalproduk,
    retur.checkeddiskon,
    retur.ppnpersenproduk,
    retur.ppnrupiahproduk,
    vDetailRetur.setFieldValue,
    retur.nobatch,
    retur.produk.idproduk,
    details,
  ])
}
