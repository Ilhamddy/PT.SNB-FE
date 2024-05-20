import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import UiContent from '../../../Components/Common/UiContent'
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
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../../Components/Table/LoadingTable'
import CustomSelect from '../../../Components/Common/CustomSelect/CustomSelect'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { getComboMappingProduk } from '../../../store/master/action'
import NoDataTable from '../../../Components/Table/NoDataTable'
import {
  createOrUpdateMapRL,
  deleteMapRL,
  getDetailJenisProduk,
  getLayananFromMasterRL,
  getLayananJenis,
  getMasterRLFromInduk,
} from '../../../store/kendaliDokumen/action'
import './MappingLayanan.scss'
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles'

const MappingRL = () => {
  const dispatch = useDispatch()
  const refNoRLDetail = useRef()
  const refDetailJenisProduk = useRef()
  const {
    loadingComboMapping,
    jenisProduk,
    masterIndukRL,
    masterRL,
    instalasi,
    detailJenisProduk,
    layananJenis,
    layananFromMasterRL,
  } = useSelector((state) => ({
    loadingComboMapping: state.Master.getComboMappingProduk.loading,
    jenisProduk: state.Master.getComboMappingProduk.data.jenisproduk,
    instalasi: state.Master.getComboMappingProduk.data.instalasi,
    masterIndukRL: state.Master.getComboMappingProduk.data.masterindukrl,
    masterRL: state.KendaliDokumen.getMasterRLFromInduk.data.masterrl,
    detailJenisProduk:
      state.KendaliDokumen.getDetailJenisProduk.data.detailjenisproduk,
    layananJenis: state.KendaliDokumen.getLayananJenis || [],
    layananFromMasterRL: state.KendaliDokumen.getLayananFromMasterRL,
  }))
  const vMapping = useFormik({
    initialValues: {
      norl: '',
      norldetail: '',
      idproduk: '',
    },
    validationSchema: Yup.object({
      norl: Yup.string().required('No RL harus diisi!'),
      norldetail: Yup.string().required('No RL Detail harus diisi!'),
    }),
    onSubmit: (values, { setFieldValue }) => {
      dispatch(
        createOrUpdateMapRL(values, () => {
          setFieldValue('idproduk', '')
          dispatch(getLayananFromMasterRL({ norldetail: values.norldetail }))
        })
      )
    },
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

  const handleDelete = (row) => {
    dispatch(
      deleteMapRL([row.idmaprl], () => {
        dispatch(
          getLayananFromMasterRL({ norldetail: vMapping.values.norldetail })
        )
      })
    )
  }

  const handleJenisProduk = (e) => {
    vLayanan.setFieldValue('jenisproduk', e?.value || '')
    dispatch(getDetailJenisProduk({ jenisproduk: e?.value }))
    refDetailJenisProduk.current.clearValue()
  }

  useEffect(() => {
    dispatch(getComboMappingProduk())
  }, [dispatch])

  useEffect(() => {
    refNoRLDetail.current.clearValue()
    const setFF = vMapping.setFieldValue
    setFF('norldetail', '')
    vMapping.values.norl &&
      dispatch(getMasterRLFromInduk({ idInduk: vMapping.values.norl }))
  }, [vMapping.values.norl, dispatch, vMapping.setFieldValue])

  useEffect(() => {
    dispatch(getLayananFromMasterRL({ norldetail: vMapping.values.norldetail }))
  }, [vMapping.values.norldetail, dispatch])

  useEffect(() => {
    const handleSubmit = vLayanan.handleSubmit
    vLayanan.values.detailjenisproduk && handleSubmit()
  }, [vLayanan.values.detailjenisproduk, vLayanan.handleSubmit])

  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsRL = [
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
      width: '170px',
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
    {
      name: <span className="font-weight-bold fs-13"></span>,
      cell: (row) => (
        <Button color="danger" onClick={() => handleDelete(row)}>
          Hapus
        </Button>
      ),
      sortable: true,
      width: '170px',
    },
  ]

  let layananJenisFiltered = (layananJenis?.data?.layanan || []).filter(
    (layananJenis) => {
      const includedInMapping = (layananFromMasterRL.data?.layanan || []).some(
        (data) => {
          return layananJenis.idproduk === data.idproduk
        }
      )
      let regexp = new RegExp(namaLayanan.split(' ').join('|'), 'i')
      const includedInSearch = regexp.test(layananJenis.namaproduk)
      return !includedInMapping && includedInSearch
    }
  )

  layananJenisFiltered = layananJenisFiltered.map((layananJenis, index) => {
    const newLayananJenis = { ...layananJenis }
    newLayananJenis.no = index + 1
    return newLayananJenis
  })

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
      width: '170px',
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
    {
      name: <span className="font-weight-bold fs-13"></span>,
      cell: (row) => (
        <Button
          color="success"
          onClick={() => {
            vMapping.setFieldValue('idproduk', row.idproduk)
            vMapping.handleSubmit()
          }}
        >
          Tambah
        </Button>
      ),
      sortable: true,
      width: '170px',
    },
  ]

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content mapping-layanan">
        <Container fluid>
          <BreadCrumb title="Mapping RL 3.2" pageTitle="Forms" />
          <Card className="p-3">
            <CardBody>
              <Card className="p-2">
                <Row className="mb-4">
                  <Col>
                    <CustomSelect
                      id="norl"
                      name="norl"
                      options={masterIndukRL}
                      onChange={(e) => {
                        vMapping.setFieldValue('norl', e?.value || '')
                      }}
                      value={vMapping.values.norl}
                      className={`input row-header ${
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
                      ref={refNoRLDetail}
                      id="norldetail"
                      name="norldetail"
                      options={masterRL}
                      onChange={(e) => {
                        vMapping.setFieldValue('norldetail', e?.value || '')
                      }}
                      value={vMapping.values.norldetail}
                      className={`input row-header ${
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

                <Row className="mb-5">
                  <Col lg={12}>
                    <DataTable
                      fixedHeader
                      fixedHeaderScrollHeight="700px"
                      columns={columnsRL}
                      data={layananFromMasterRL.data?.layanan}
                      progressPending={layananFromMasterRL.loading}
                      progressComponent={<LoadingTable />}
                      customStyles={tableCustomStyles}
                      noDataComponent={<NoDataTable />}
                    />
                  </Col>
                </Row>
              </Card>
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
                          onChange={handleJenisProduk}
                          value={vLayanan.values.jenisproduk}
                          className={`input row-header-2 ${
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
                          ref={refDetailJenisProduk}
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
                          className={`input row-header-2 ${
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
                          placeholder="Cari Nama Layanan"
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
                          data={layananJenisFiltered}
                          progressPending={layananJenis.loading}
                          progressComponent={<LoadingTable />}
                          customStyles={tableCustomStyles}
                          noDataComponent={<NoDataTable />}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              <div></div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default MappingRL
