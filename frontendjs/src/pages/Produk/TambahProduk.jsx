import { useState, useEffect, useRef } from 'react'
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap'
import classnames from 'classnames'
import { ToastContainer } from 'react-toastify'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CustomSelect from '../Select/Select'
import { useDispatch, useSelector } from 'react-redux'
import { comboSettingProdukGet } from '../../store/master/action'
import { obatGudangSave, produkEditGet } from '../../store/gudang/action'
import DataTable from 'react-data-table-component'
import { KonversiProduk } from './KonversiProduk'
import LainLain from './LainLain'
import { rgxAllNumber } from '../../utils/regexcommon'
import BtnSpinner from '../../Components/Common/BtnSpinner'

const linkSettingProduk = '/farmasi/gudang/setting-produk'

const TambahProduk = ({ tabId }) => {
  const dispatch = useDispatch()
  const { paramobat } = useParams()

  const { comboSettingProduk, loadingEdit, produkEditData } = useSelector(
    (state) => ({
      comboSettingProduk: state.Master.comboSettingProdukGet.data,
      produkEditData: state.Gudang.produkEditGet,
      loadingEdit: state.Gudang.obatGudangSave.loading || false,
    })
  )

  const navigate = useNavigate()
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      idproduk: '',
      tipeproduk: -1,
      namaproduk: '',
      deskripsikandungan: '',
      kekuatan: '',
      barcode: '',
      idkfa: '',
      statusgenerik: '',
      sediaan: '',
      golonganobat: '',
      detailjenisproduk: '',
      variabelbpjs: '',
      satuanjual: '',
      isnasional: false,
      isrs: false,
    },
    validationSchema: Yup.object({
      tipeproduk: Yup.number().min(0, 'Tipe produk harus dipilih'),
      namaproduk: Yup.string().required('Nama produk harus diisi'),
      deskripsikandungan: Yup.string().required(
        'Deskripsi kandungan harus diisi'
      ),
      kekuatan: Yup.string().required('Kekuatan harus diisi'),
      sediaan: Yup.string().required('Sediaan harus diisi'),
      golonganobat: Yup.string().required('Golongan obat harus diisi'),
      barcode: Yup.string().required('Barcode harus diisi'),
      statusgenerik: Yup.string().required('Status generik harus diisi'),
      detailjenisproduk: Yup.string().required(
        'Detail jenis produk harus diisi'
      ),
      variabelbpjs: Yup.string().required('Variabel BPJS harus diisi'),
      satuanjual: Yup.string().required('Satuan jual harus diisi'),
    }),
    onSubmit: (values) => {
      dispatch(
        obatGudangSave(values, () => {
          navigate('/farmasi/gudang/list-produk')
        })
      )
    },
  })

  const optionTipe = [
    {
      value: 0,
      label: 'Obat',
    },
    {
      value: 1,
      label: 'BMHP',
    },
    {
      value: 2,
      label: 'Alkes',
    },
    {
      value: 3,
      label: 'Logistik',
    },
  ]

  useEffect(() => {
    if (!produkEditData.data || Array.isArray(produkEditData.data)) return
    const produk = produkEditData.data.produk
    const tipeproduk = produkEditData.data.isalkes
      ? 3
      : produk.isbmhp
      ? 2
      : produk.isobat
      ? 1
      : -1
    const setFF = validation.setFieldValue
    setFF('idproduk', produk.id)
    setFF('tipeproduk', tipeproduk)
    setFF('namaproduk', produk.namaproduk)
    setFF('deskripsikandungan', produk.deskripsiproduk)
    setFF('kekuatan', produk.kekuatan)
    setFF('sediaan', produk.objectsediaanfk)
    setFF('golonganobat', produk.objectgolonganobatfk)
    setFF('detailjenisproduk', produk.objectdetailjenisprodukfk)
    setFF('variabelbpjs', produk.objectvariabelbpjsfk)
    setFF('satuanjual', produk.objectsatuanstandarfk)
    setFF('isnasional', produk.isfornas)
    setFF('isrs', produk.isforrs)
    setFF('barcode', produk.barcode || '')
    setFF('statusgenerik', produk.objectgenerikfk || '')
    setFF('idkfa', produk.kfa_id || '')
  }, [produkEditData.data, comboSettingProduk, validation.setFieldValue])

  useEffect(() => {
    const rForm = validation.resetForm
    if (paramobat) {
      dispatch(produkEditGet({ produkid: paramobat }))
    } else {
      rForm()
    }
  }, [paramobat, dispatch, validation.resetForm])

  return (
    <TabPane tabId={tabId} id="home2">
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          validation.handleSubmit()
          return false
        }}
        className="gy-4"
        action="#"
      >
        <Row>
          <Col lg={6}>
            <Row className="mb-2">
              <Col lg={5}>
                <Label
                  className="form-label mt-2"
                  htmlFor="tipeproduk"
                  style={{ color: 'black' }}
                >
                  Tipe Produk
                </Label>
              </Col>
              <Col lg={7}>
                {(optionTipe || []).map((data, index) => (
                  <span className="d-flex flex-row" id="tipeproduk" key={index}>
                    <Input
                      className="form-check-input"
                      type="radio"
                      id={`settingproduk-${index}`}
                      checked={data.value === validation.values.tipeproduk}
                      readOnly
                      onClick={(e) => {
                        validation.setFieldValue('tipeproduk', data.value)
                      }}
                    />
                    <Label
                      className="form-check-label ms-2"
                      htmlFor={`settingproduk-${index}`}
                      style={{ color: 'black' }}
                    >
                      {data.label}
                    </Label>
                  </span>
                ))}
                {validation.errors.tipeproduk &&
                  !!validation.touched.tipeproduk && (
                    <div style={{ color: '#E3866F' }} className="mb-3">
                      {validation.errors.tipeproduk}
                    </div>
                  )}
              </Col>
            </Row>
            <Row className="mb-2">
              <Col lg={5}>
                <Label
                  style={{ color: 'black' }}
                  htmlFor={`namaproduk`}
                  className="form-label"
                >
                  Nama Produk
                </Label>
              </Col>
              <Col lg={7}>
                <Input
                  id={`namaproduk`}
                  name={`namaproduk`}
                  type="text"
                  value={validation.values.namaproduk}
                  disabled={!!validation.values.idproduk}
                  onChange={validation.handleChange}
                  invalid={
                    validation.touched.namaproduk &&
                    !!validation.errors.namaproduk
                  }
                />
                {validation.touched.namaproduk &&
                validation.errors.namaproduk ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.namaproduk}</div>
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>
            <Row className="mb-2">
              <Col lg={5}>
                <Label
                  style={{ color: 'black' }}
                  htmlFor={`deskripsikandungan`}
                  className="form-label mt-2"
                >
                  Deskripsi/Kandungan produk
                </Label>
              </Col>
              <Col lg={7}>
                <Input
                  id={`deskripsikandungan`}
                  name={`deskripsikandungan`}
                  type="text"
                  value={validation.values.deskripsikandungan}
                  onChange={validation.handleChange}
                  invalid={
                    validation.touched.deskripsikandungan &&
                    !!validation.errors.deskripsikandungan
                  }
                />
                {validation.touched.deskripsikandungan &&
                validation.errors.deskripsikandungan ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.deskripsikandungan}</div>
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>
            <Row className="mb-2">
              <Col lg={5}>
                <Label
                  style={{ color: 'black' }}
                  htmlFor={`barcode`}
                  className="form-label mt-2"
                >
                  Barcode
                </Label>
              </Col>
              <Col lg={7}>
                <Input
                  id={`barcode`}
                  type="text"
                  onChange={(e) => {
                    const allNumber = rgxAllNumber.test(e.target.value)
                    rgxAllNumber.test(e.target.value) &&
                      validation.setFieldValue('barcode', e.target.value)
                  }}
                  value={validation.values.barcode}
                  invalid={
                    validation.touched.barcode && !!validation.errors.barcode
                  }
                />
                {validation.touched.barcode && validation.errors.barcode ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.barcode}</div>
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>
            <Row className="mb-2">
              <Col lg={5}>
                <Label
                  style={{ color: 'black' }}
                  htmlFor={`kekuatan`}
                  className="form-label mt-2"
                >
                  Kekuatan
                </Label>
              </Col>
              <Col lg={7}>
                <Input
                  id={`kekuatan`}
                  name={`kekuatan`}
                  type="text"
                  value={validation.values.kekuatan}
                  onChange={validation.handleChange}
                  disabled={!!validation.values.idproduk}
                  invalid={
                    validation.touched.kekuatan && !!validation.errors.kekuatan
                  }
                />
                {validation.touched.kekuatan && validation.errors.kekuatan ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.kekuatan}</div>
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>
            <Row className="mb-2">
              <Col lg={5}>
                <Label
                  style={{ color: 'black' }}
                  htmlFor={`sediaan`}
                  className="form-label mt-2"
                >
                  Sediaan
                </Label>
              </Col>
              <Col lg={6}>
                <CustomSelect
                  id={`sediaan`}
                  name={`sediaan`}
                  options={comboSettingProduk?.sediaan || []}
                  onChange={(e) => {
                    validation.setFieldValue('sediaan', e.value)
                  }}
                  value={validation.values.sediaan}
                  className={`input ${
                    validation.errors.sediaan ? 'is-invalid' : ''
                  }`}
                />
                {validation.touched.sediaan && !!validation.errors.sediaan && (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.sediaan}</div>
                  </FormFeedback>
                )}
              </Col>
              <Col lg={1}>
                <Button
                  type="button"
                  color="info"
                  placement="top"
                  onClick={() => navigate(linkSettingProduk + '/lain-lain')}
                >
                  +
                </Button>
              </Col>
            </Row>
          </Col>
          <Col lg={6}>
            <Row className="mb-2">
              <Col lg={5}>
                <Label
                  style={{ color: 'black' }}
                  htmlFor={`golonganobat`}
                  className="form-label mt-2"
                >
                  Golongan Obat
                </Label>
              </Col>
              <Col lg={7}>
                <CustomSelect
                  id="golonganobat"
                  name="golonganobat"
                  options={comboSettingProduk?.golonganobat || []}
                  onChange={(e) => {
                    validation.setFieldValue('golonganobat', e.value)
                  }}
                  value={validation.values.golonganobat}
                  className={`input ${
                    validation.errors.golonganobat ? 'is-invalid' : ''
                  }`}
                />
                {validation.touched.golonganobat &&
                validation.errors.golonganobat ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.golonganobat}</div>
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>
            <Row className="mb-2">
              <Col lg={5}>
                <Label
                  style={{ color: 'black' }}
                  htmlFor={`detailjenisproduk`}
                  className="form-label mt-2"
                >
                  Detail Jenis Produk
                </Label>
              </Col>
              <Col lg={6}>
                <CustomSelect
                  id={`detailjenisproduk`}
                  name={`detailjenisproduk`}
                  options={comboSettingProduk?.detailjenisproduk || []}
                  onChange={(e) => {
                    validation.setFieldValue('detailjenisproduk', e.value)
                  }}
                  value={validation.values.detailjenisproduk}
                  className={`input ${
                    validation.errors.detailjenisproduk ? 'is-invalid' : ''
                  }`}
                />
                {!!validation.touched.detailjenisproduk &&
                  !!validation.errors.detailjenisproduk && (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.detailjenisproduk}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={1}>
                <Button
                  type="button"
                  color="info"
                  placement="top"
                  onClick={() => navigate(linkSettingProduk + '/lain-lain')}
                >
                  +
                </Button>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col lg={5}>
                <Label
                  style={{ color: 'black' }}
                  htmlFor={`variabelbpjs`}
                  className="form-label mt-2"
                >
                  Variabel bpjs
                </Label>
              </Col>
              <Col lg={7}>
                <CustomSelect
                  id="variabelbpjs"
                  name="variabelbpjs"
                  options={comboSettingProduk?.variabelbpjs || []}
                  onChange={(e) => {
                    validation.setFieldValue('variabelbpjs', e.value)
                  }}
                  value={validation.values.variabelbpjs || []}
                  className={`input ${
                    validation.errors.variabelbpjs ? 'is-invalid' : ''
                  }`}
                />
                {validation.touched.variabelbpjs &&
                  !!validation.errors.variabelbpjs && (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.variabelbpjs}</div>
                    </FormFeedback>
                  )}
              </Col>
            </Row>
            <Row className="mb-2">
              <Col lg={5}>
                <Label
                  style={{ color: 'black' }}
                  htmlFor={`idkfa`}
                  className="form-label mt-2"
                >
                  id KFA
                </Label>
              </Col>
              <Col lg={7}>
                <Input
                  id={`idkfa`}
                  type="text"
                  onChange={(e) => {
                    validation.setFieldValue('idkfa', e.target.value)
                  }}
                  value={validation.values.idkfa}
                  invalid={
                    validation.touched.idkfa && !!validation.errors.idkfa
                  }
                />
                {validation.touched.idkfa && validation.errors.idkfa ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.idkfa}</div>
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>
            <Row className="mb-2">
              <Col lg={5}>
                <Label
                  style={{ color: 'black' }}
                  htmlFor={`variabelbpjs`}
                  className="form-label mt-2"
                >
                  Status Generik
                </Label>
              </Col>
              <Col lg={7}>
                <CustomSelect
                  id="statusgenerik"
                  name="statusgenerik"
                  options={comboSettingProduk?.generik || []}
                  onChange={(e) => {
                    validation.setFieldValue('statusgenerik', e.value)
                  }}
                  value={validation.values.statusgenerik || []}
                  className={`input ${
                    validation.errors.statusgenerik ? 'is-invalid' : ''
                  }`}
                />
                {validation.touched.statusgenerik &&
                  !!validation.errors.statusgenerik && (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.statusgenerik}</div>
                    </FormFeedback>
                  )}
              </Col>
            </Row>
            <Row className="mb-2">
              <Col lg={5}>
                <Label
                  style={{ color: 'black' }}
                  htmlFor={`satuanjual`}
                  className="form-label mt-2"
                >
                  Satuan Jual
                </Label>
              </Col>
              <Col lg={6}>
                <CustomSelect
                  id={`satuanjual`}
                  name={`satuanjual`}
                  options={comboSettingProduk?.satuan || []}
                  onChange={(e) => {
                    validation.setFieldValue('satuanjual', e.value)
                  }}
                  value={validation.values.satuanjual}
                />
                {validation.touched.satuanjual &&
                  validation.errors.satuanjual && (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.satuanjual}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={1}>
                <Button
                  type="button"
                  color="info"
                  placement="top"
                  onClick={() => navigate(linkSettingProduk + '/lain-lain')}
                >
                  +
                </Button>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col lg={5}>
                <Label
                  style={{ color: 'black' }}
                  htmlFor={`variabelbpjs`}
                  className="form-label mt-2"
                >
                  Formularium
                </Label>
              </Col>
              <Col lg={7}>
                <span className="form-check ms-2">
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    checked={validation.values.isnasional}
                    id="isnasional"
                    onChange={(e) =>
                      validation.setFieldValue('isnasional', e.target.checked)
                    }
                  />
                  <Label
                    className="form-check-label"
                    htmlFor="isnasional"
                    style={{ color: 'black' }}
                  >
                    Nasional
                  </Label>
                </span>
                <span className="form-check ms-2">
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    checked={validation.values.isrs}
                    id="isrs"
                    onChange={(e) =>
                      validation.setFieldValue('isrs', e.target.checked)
                    }
                  />
                  <Label
                    className="form-check-label"
                    htmlFor="isrs"
                    style={{ color: 'black' }}
                  >
                    RS
                  </Label>
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            <BtnSpinner
              loading={loadingEdit}
              type="submit"
              color="success"
              placement="top"
              id="tooltipTop"
            >
              {validation.values.idproduk ? 'Edit' : 'Tambah'}
            </BtnSpinner>
          </div>
        </Row>
      </Form>
    </TabPane>
  )
}

export default TambahProduk
