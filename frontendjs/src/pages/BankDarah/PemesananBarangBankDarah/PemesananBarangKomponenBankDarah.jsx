import { useEffect, useRef, useContext } from 'react'
import {
  Button,
  Card,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormFeedback,
  Input,
  Label,
  Row,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from 'reactstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CustomSelect from '../../../Components/Common/CustomSelect/CustomSelect'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import Flatpickr from 'react-flatpickr'
import { onChangeStrNbr, strToNumber } from '../../../utils/format'
import { comboPenerimaanBarangGet } from '../../../store/master/action'
import {
  kemasanFromProdukGet,
  getPemesanan,
} from '../../../store/gudang/action'
import LoadingTable from '../../../Components/Table/LoadingTable'
import NoDataTable from '../../../Components/Table/NoDataTable'
import { PemesananContext } from './PemesananBarangBankDarah'
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles'
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr'
import { getComboPenerimaanDarah } from '../../../store/bankDarah/bankDarahSlice'

export const InputProdukDetail = () => {
  const {
    vDetail,
    detail,
    detailErr,
    detailTouched,
    handleChangeDetail,
    handleChangeJumlahTerima,
    refSatuanTerima,
  } = useContext(PemesananContext)
  const { produk, satuanProduk, kemasanProduk } = useSelector(
    (state) => ({
      produk: state.bankDarahSlice.getComboPenerimaanDarah?.data?.produk || [],
      satuanProduk:
        state.bankDarahSlice.getComboPenerimaanDarah?.data?.satuanproduk || [],
      kemasanProduk: state.Gudang.kemasanFromProdukGet?.data?.satuan || [],
    }),
    shallowEqual
  )
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
                Satuan Jual
              </Label>
              <CustomSelect
                id="satuanjual"
                name="satuanjual"
                options={satuanProduk}
                value={detail.produk?.satuanjual}
                isDisabled
                isClearEmpty
                className={`input ${
                  detailErr?.produk?.satuanjual ? 'is-invalid' : ''
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
                isClearEmpty
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
        <Col lg={4} className="d-flex align-items-end">
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
            className="btn ms-2"
            color="danger"
            onClick={() => {
              vDetail.resetForm()
            }}
          >
            Batal
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export const InputUmumPesan = () => {
  const { supplier, unit, asalProduk } = useSelector((state) => ({
    supplier:
      state.bankDarahSlice.getComboPenerimaanDarah?.data?.supplier || [],
    unit: state.bankDarahSlice.getComboPenerimaanDarah?.data?.unit || [],
    asalProduk:
      state.bankDarahSlice.getComboPenerimaanDarah?.data?.asalproduk || [],
  }))
  const {
    penerimaan,
    penerimaanErr,
    penerimaanTouched,
    handleChangePenerimaan,
  } = useContext(PemesananContext)
  return (
    <Card className="p-5">
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
          <KontainerFlatpickr
            isError={
              penerimaanTouched?.tanggalpesan && !!penerimaanErr?.tanggalpesan
            }
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
            htmlFor={`namasupplier`}
            className="form-label"
          >
            Nama Supplier
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
          {penerimaanTouched?.namasupplier && !!penerimaanErr?.namasupplier && (
            <FormFeedback type="invalid">
              <div>{penerimaanErr?.namasupplier}</div>
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
          <KontainerFlatpickr
            isError={
              penerimaanTouched?.tanggaljatuhtempo &&
              !!penerimaanErr?.tanggaljatuhtempo
            }
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
            htmlFor={`unitpesan`}
            className="form-label"
          >
            Unit Pemesan
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
      </Row>
    </Card>
  )
}

export const ListDetailPesan = () => {
  const {
    validation,
    vDetail,
    subtotal,
    penerimaanTouched,
    penerimaanErr,
    ppn,
    total,
    diskon,
  } = useContext(PemesananContext)
  const { norecpesan } = useParams()

  /**
   * @type {import("react-data-table-component").TableColumn<typeof vDetail.values>[]}
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
                  console.log(row)
                  vDetail.setValues({
                    ...row,
                  })
                }}
              >
                <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                Edit Produk
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  let newDetail = [...validation.values.detail]
                  newDetail = newDetail.filter(
                    (det) => det.indexDetail !== row.indexDetail
                  )
                  validation.setFieldValue('detail', newDetail)
                }}
              >
                <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                Hapus Produk
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
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Harga satuan kecil</span>,
      sortable: true,
      selector: (row) => `Rp${row.hargasatuankecil?.toLocaleString('id-ID')}`,
      width: '140px',
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
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Total</span>,
      sortable: true,
      selector: (row) => `Rp${row.totalproduk}`,
      width: '150px',
    },
  ]
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
        <Col lg={7} className="d-flex justify-content-center align-items-end">
          <Button
            type="submit"
            color="success"
            placement="top"
            formTarget="form-input-penerimaan"
          >
            {!!norecpesan ? 'Edit' : 'Simpan'}
          </Button>
          <Link to="/farmasi/gudang/penerimaan-produk-list">
            <Button type="button" className="btn ms-2" color="danger">
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

export const useGetPemesanan = (validation, isLogistik) => {
  const { norecpesan } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getComboPenerimaanDarah({ isLogistik: isLogistik }))
  }, [dispatch, isLogistik])

  useEffect(() => {
    const setFF = validation.setFieldValue
    norecpesan && dispatch(getPemesanan({ norecpesan: norecpesan }))
    setFF('norecpesan', norecpesan)
  }, [dispatch, norecpesan, validation.setFieldValue])
}

export const useFillInitPemesanan = (validation) => {
  const { norecpesan } = useParams()
  const { pemesanan } = useSelector(
    (state) => ({
      pemesanan: state.Gudang.getPemesanan?.data || null,
    }),
    shallowEqual
  )
  useEffect(() => {
    const setFF = validation.setFieldValue
    if (pemesanan.detailPemesanan) {
      const detailPemesanan = pemesanan.detailPemesanan.map(
        (values, index) => ({
          ...values,
          indexDetail: index,
        })
      )
      setFF('detail', detailPemesanan || [])
    }
    if (pemesanan.pemesanan) {
      setFF('penerimaan', {
        ...validation.initialValues.penerimaan,
        ...pemesanan.pemesanan,
      })
    }
    if (!norecpesan) {
      setFF('detail', [])
      setFF('penerimaan', validation.initialValues.penerimaan)
    }
  }, [
    pemesanan,
    validation.setFieldValue,
    norecpesan,
    validation.initialValues.penerimaan,
  ])
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

// Perhitungan satuan jumlah terima, harga, Diskon, dan ppn
// saat jumlah, terima, harga sudah diinput akan otomatis menghitung total harga
export const useCalculatePemesanan = (vDetail, detail) => {
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
