import React from 'react'
import { ToastContainer } from 'react-toastify'
import UiContent from '../../../../Components/Common/UiContent'
import {
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

const MappingRL = () => {
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
      namalayanan: '',
    },
    validationSchema: Yup.object({
      instalasi: Yup.string().required('Instalasi harus diisi!'),
      jenisproduk: Yup.string().required('Jenis Produk harus diisi!'),
      detailjenisproduk: Yup.string().required(
        'Detail Jenis Produk harus diisi!'
      ),
      namalayanan: Yup.string().required('Layanan harus diisi!'),
    }),
    onSubmit: (values) => {},
  })

  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />
      <UiContent />
      <div className="page-content laporan-rl3-2">
        <Container fluid>
          <BreadCrumb title="Laporan RL3.2" pageTitle="Forms" />
          <Card>
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
            <Row>
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
                />
              </Col>
            </Row>
            <Row>
              <Col lg={5}>
                <Row>
                  <Col lg={6}>
                    <Label
                      style={{ color: 'black' }}
                      htmlFor={`instalasi`}
                      className="form-label mt-2"
                    >
                      Instalasi
                    </Label>
                  </Col>
                  <Col lg={6}>
                    <CustomSelect
                      id="instalasi"
                      name="instalasi"
                      options={[]}
                      onChange={(e) => {
                        vLayanan.setFieldValue('instalasi', e?.value || '')
                      }}
                      value={vLayanan.values.instalasi}
                      className={`input ${
                        !!vLayanan?.errors.instalasi ? 'is-invalid' : ''
                      }`}
                    />
                    {vLayanan.touched.instalasi &&
                      !!vLayanan.errors.instalasi && (
                        <FormFeedback type="invalid">
                          <div>{vLayanan.errors.instalasi}</div>
                        </FormFeedback>
                      )}
                  </Col>
                </Row>
                <Row>
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
                      options={[]}
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
                <Row>
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
                      options={[]}
                      onChange={(e) => {
                        vLayanan.setFieldValue(
                          'detailjenisproduk',
                          e?.value || ''
                        )
                      }}
                      value={vLayanan.values.detailjenisproduk}
                      className={`input ${
                        !!vLayanan?.errors.detailjenisproduk ? 'is-invalid' : ''
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
                <Row>
                  <Col lg={2}>
                    <Label
                      style={{ color: 'black' }}
                      htmlFor={`namalayanan`}
                      className="form-label mt-2"
                    >
                      No Resep
                    </Label>
                  </Col>
                  <Col lg={4}>
                    <Input
                      id={`namalayanan`}
                      name={`namalayanan`}
                      type="text"
                      value={vLayanan.values.namalayanan}
                      disabled
                      invalid={
                        vLayanan.touched?.noresep && !!vLayanan.errors?.noresep
                      }
                    />
                    {vLayanan.touched?.noresep &&
                      !!vLayanan.errors?.noresep && (
                        <FormFeedback type="invalid">
                          <div>{vLayanan.errors?.noresep}</div>
                        </FormFeedback>
                      )}
                  </Col>
                </Row>
              </Col>
              <Col lg={7}></Col>
            </Row>
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
