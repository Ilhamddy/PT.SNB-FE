import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import UiContent from '../../../../Components/Common/UiContent'
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormFeedback,
  Input,
  Label,
  Row,
} from 'reactstrap'
import BreadCrumb from '../../../../Components/Common/BreadCrumb'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../../../Components/Table/LoadingTable'
import CustomSelect from '../../../Select/Select'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { getComboMappingProduk } from '../../../../store/master/action'
import NoDataTable from '../../../../Components/Table/NoDataTable'
import {
  getDetailJenisProduk,
  getLayananJenis,
} from '../../../../store/kendaliDokumen/action'

const MappingRL = () => {
  const dispatch = useDispatch()
  const {
    loadingComboMapping,
    jenisProduk,
    instalasi,
    detailJenisProduk,
    layananJenis,
  } = useSelector((state) => ({
    loadingComboMapping: state.Master.getComboMappingProduk.loading,
    jenisProduk: state.Master.getComboMappingProduk.data.jenisproduk,
    instalasi: state.Master.getComboMappingProduk.data.instalasi,
    detailJenisProduk:
      state.KendaliDokumen.getDetailJenisProduk.data.detailjenisproduk,
    layananJenis: state.KendaliDokumen.getLayananJenis.data.layanan,
  }))
  const vMapping = useFormik({
    initialValues: {
      norl: '',
      norldetail: '',
    },
    validationSchema: Yup.object({
      norl: Yup.string().required('No RL harus diisi!'),
      norldetail: Yup.string().required('No RL Detail harus diisi!'),
    }),
    onSubmit: (values) => {},
  })

  const vLayanan = useFormik({
    initialValues: {
      instalasi: '',
      jenisproduk: '',
      detailjenisproduk: '',
    },
    validationSchema: Yup.object({
      detailjenisproduk: Yup.string().required(
        'Detail Jenis Produk harus diisi!'
      ),
    }),
    onSubmit: (values) => {
      dispatch(getLayananJenis(values))
    },
  })

  const [namaLayanan, setNamaLayanan] = useState('')

  useEffect(() => {
    dispatch(getComboMappingProduk())
  }, [dispatch])

  useEffect(() => {
    vLayanan.values.jenisproduk &&
      dispatch(
        getDetailJenisProduk({ jenisproduk: vLayanan.values.jenisproduk })
      )
  }, [dispatch, vLayanan.values.jenisproduk])

  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsLayanan = [
    {
      name: <span className="font-weight-bold fs-13">No</span>,
      selector: (row) => row.no,
      sortable: true,
      width: '60px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Layanan</span>,
      // selector: row => row.noregistrasi,
      sortable: true,
      selector: (row) => row.namaproduk,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">jenis produk</span>,
      selector: (row) => row.jenisproduk,
      sortable: true,
      width: '170px',
    },
    {
      name: <span className="font-weight-bold fs-13">Detail jenis produk</span>,
      selector: (row) => row.detailjenisproduk,
      sortable: true,
      width: '170px',
    },
    {
      name: <span className="font-weight-bold fs-13">Instalasi</span>,
      selector: (row) => row.instalasi,
      sortable: true,
      width: '170px',
    },
  ]

  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />
      <UiContent />
      <div className="page-content laporan-rl3-2">
        <Container fluid>
          <BreadCrumb title="Laporan RL3.2" pageTitle="Forms" />
          <Card className="p-3">
            <CardBody>
              <Row>
                <Col>
                  <CustomSelect
                    id="norl"
                    name="norl"
                    options={[]}
                    onChange={(e) => {
                      vMapping.setFieldValue('norl', e?.value || '')
                    }}
                    value={vMapping.values.norl}
                    className={`input ${
                      !!vMapping?.errors.norl ? 'is-invalid' : ''
                    }`}
                  />
                  {vMapping.touched.norl && !!vMapping.errors.norl && (
                    <FormFeedback type="invalid">
                      <div>{vMapping.errors.norl}</div>
                    </FormFeedback>
                  )}
                </Col>
                <Col>
                  <CustomSelect
                    id="norldetail"
                    name="norldetail"
                    options={[]}
                    onChange={(e) => {
                      vMapping.setFieldValue('norldetail', e?.value || '')
                    }}
                    value={vMapping.values.norldetail}
                    className={`input ${
                      !!vMapping?.errors.norldetail ? 'is-invalid' : ''
                    }`}
                  />
                  {vMapping.touched.norldetail &&
                    !!vMapping.errors.norldetail && (
                      <FormFeedback type="invalid">
                        <div>{vMapping.errors.norldetail}</div>
                      </FormFeedback>
                    )}
                </Col>
              </Row>
            </CardBody>
            <Row className="mb-5">
              <Col lg={12}>
                <DataTable
                  fixedHeader
                  fixedHeaderScrollHeight="700px"
                  columns={[]}
                  pagination
                  data={[]}
                  progressPending={false}
                  progressComponent={<LoadingTable />}
                  customStyles={tableCustomStyles}
                  noDataComponent={<NoDataTable />}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={5}>
                <Card className="p-2">
                  <Row className="mb-2">
                    <Col lg={6}>
                      <Label
                        style={{ color: 'black' }}
                        htmlFor={`jenisproduk`}
                        className="form-label mt-2"
                      >
                        Jenis Produk
                      </Label>
                    </Col>
                    <Col lg={6}>
                      <CustomSelect
                        id="jenisproduk"
                        name="jenisproduk"
                        options={jenisProduk}
                        isDisabled={loadingComboMapping}
                        onChange={(e) => {
                          vLayanan.setFieldValue('jenisproduk', e?.value || '')
                        }}
                        value={vLayanan.values.jenisproduk}
                        className={`input ${
                          !!vLayanan?.errors.jenisproduk ? 'is-invalid' : ''
                        }`}
                      />
                      {vLayanan.touched.jenisproduk &&
                        !!vLayanan.errors.jenisproduk && (
                          <FormFeedback type="invalid">
                            <div>{vLayanan.errors.jenisproduk}</div>
                          </FormFeedback>
                        )}
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col lg={6}>
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
                        id="detailjenisproduk"
                        name="detailjenisproduk"
                        options={detailJenisProduk}
                        onChange={(e) => {
                          vLayanan.setFieldValue(
                            'detailjenisproduk',
                            e?.value || ''
                          )
                        }}
                        value={vLayanan.values.detailjenisproduk}
                        className={`input ${
                          !!vLayanan?.errors.detailjenisproduk
                            ? 'is-invalid'
                            : ''
                        }`}
                      />
                      {vLayanan.touched.detailjenisproduk &&
                        !!vLayanan.errors.detailjenisproduk && (
                          <FormFeedback type="invalid">
                            <div>{vLayanan.errors.detailjenisproduk}</div>
                          </FormFeedback>
                        )}
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-center w-100 mt-3">
                    <Button
                      color="success"
                      type="button"
                      onClick={() => vLayanan.handleSubmit()}
                    >
                      Tampilkan
                    </Button>
                  </div>
                </Card>
              </Col>
              <Col lg={7}>
                <Card className="p-2">
                  <Row className="d-flex flex-row-reverse">
                    <Col lg={4}>
                      <Input
                        className="w-100 mb-2"
                        id={`namalayanan`}
                        name={`namalayanan`}
                        type="text"
                        value={namaLayanan}
                        onChange={(e) => {
                          setNamaLayanan(e.target.value)
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col lg={12}>
                      <DataTable
                        fixedHeader
                        fixedHeaderScrollHeight="700px"
                        columns={columnsLayanan}
                        pagination
                        data={layananJenis}
                        progressPending={false}
                        progressComponent={<LoadingTable />}
                        customStyles={tableCustomStyles}
                        noDataComponent={<NoDataTable />}
                      />
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-center w-100 mt-3">
                    <Button color="success">Selesai</Button>
                  </div>
                </Card>
              </Col>
            </Row>
            <div></div>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

const tableCustomStyles = {
  headRow: {
    style: {
      color: '#ffffff',
      backgroundColor: '#e67e22',
    },
  },
  rows: {
    style: {
      color: 'black',
      backgroundColor: '#f1f2f6',
    },
  },
}

export default MappingRL
