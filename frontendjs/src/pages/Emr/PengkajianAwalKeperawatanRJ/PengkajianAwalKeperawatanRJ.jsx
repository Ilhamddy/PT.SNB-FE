import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
import { useFormik } from "formik";
import * as Yup from "yup";
import DataTable from 'react-data-table-component';
import LoadingTable from '../../../Components/Table/LoadingTable';
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles';
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr';
import CustomSelect from '../../Select/Select';
const PengkajianAwalKeperawatanRJ = () => {
  const { norecdp, norecap } = useParams();
  const [dateNow] = useState(() => new Date().toISOString())
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      norecdp: norecdp,
      norecap: norecap,
      norec: '',
      tipediagnosa: '',
    },
    validationSchema: Yup.object({
      tipediagnosa: Yup.string().required("Tipe Diagnosa Belum Diisi"),
      kodediagnosa: Yup.string().required("Kode Diagnosa Belum Diisi"),
      kasuspenyakit: Yup.string().required("Kasus Penyakit Belum Diisi")
    }),
    onSubmit: (values, { resetForm }) => {
      // dispatch(emrDiagnosaxSave(values, ()=>{
      //     // resetForm()
      // }));
      // resetForm()
    }
  })
  const changePayment = (fieldname, index, newvalue) => {
    console.log(fieldname, index, newvalue)
  }
  return (
    <React.Fragment>
      <Row className="gy-4 p-3">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader className="card-header-snb ">
                <h4 className="card-title mb-0" style={{ color: 'black' }}>History Pengkajian Awal Keperawatan</h4>
              </CardHeader>
              <CardBody>
                <div id="table-gridjs">
                  <DataTable
                    fixedHeader
                    fixedHeaderScrollHeight="330px"
                    columns={[]}
                    pagination
                    // data={dataRiwayat}
                    // progressPending={loadingRiwayat}
                    customStyles={tableCustomStyles}
                    progressComponent={<LoadingTable />}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={12}>
            <Card>
              <CardHeader className="card-header-snb ">
                <h4 className="card-title mb-0" style={{ color: 'black' }}>Pengkajian Awal Keperawatan</h4>
              </CardHeader>
              <CardBody>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}
                  className="gy-4"
                  action="#">
                  <Row className='gy-2'>
                    <Col lg={12}>
                      <Row>
                        <Col lg={3}>
                          <div className="mt-2">
                            <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Tanggal Pemeriksaan</Label>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <KontainerFlatpickr
                            isError={validation.touched?.tanggalPemeriksaan &&
                              !!validation.errors?.tanggalPemeriksaan}
                            id="tanggalPemeriksaan"
                            options={{
                              dateFormat: 'Y-m-d H:i',
                              defaultDate: 'today',
                              enableTime: true,
                              time_24hr: true,
                            }}
                            value={validation.values.tanggalPemeriksaan || dateNow}
                            onChange={([newDate]) => {
                              validation.setFieldValue('tanggalPemeriksaan', newDate.toISOString())
                            }}
                          />
                          {validation.touched?.tanggalPemeriksaan
                            && !!validation.errors.tanggalPemeriksaan && (
                              <FormFeedback type="invalid">
                                <div>{validation.errors.tanggalPemeriksaan}</div>
                              </FormFeedback>
                            )}
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={3}>
                      <div className="mt-2">
                        <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Sumber Data</Label>
                      </div>
                    </Col>
                    <Col lg={9}>
                      <div className="d-flex flex-column">
                        {([]).map((data, key) =>
                          <div className="d-flex flex-row" key={key}>
                            <Input
                              className="form-check-input"
                              type="radio"
                              id={`radio-payment-${key}`}
                              checked={data.value}
                              readOnly
                              onClick={e => {
                                changePayment('nontunai', data.value)
                              }} />
                            <Label className="form-check-label ms-2"
                              htmlFor={`radio-payment-${key}`}
                              style={{ color: "black" }} >
                              {data.label}
                            </Label>
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col lg={3}>
                      <div className="mt-2">
                        <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Keluhan Utama</Label>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <CustomSelect
                        id="keluhanUtama"
                        name="keluhanUtama"
                        options={[]}
                        onChange={(e) => {
                          validation.setFieldValue('keluhanUtama', e?.value || '')
                        }}
                        value={validation.values.keluhanUtama}
                        className={`input row-header ${!!validation?.errors.keluhanUtama ? 'is-invalid' : ''
                          }`}
                      />
                      {validation.touched.keluhanUtama &&
                        !!validation.errors.keluhanUtama && (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.keluhanUtama}</div>
                          </FormFeedback>
                        )}
                    </Col>
                    <Col lg={5}>
                      <Input
                        id="keluhanUtamaText"
                        name="keluhanUtamaText"
                        type="textarea"
                        value={validation.values.keluhanUtamaText}
                        onChange={(e) => {
                          validation.setFieldValue('keluhanUtamaText', e.target.value)
                        }}
                        invalid={validation.touched?.keluhanUtamaText &&
                          !!validation.errors?.keluhanUtamaText}
                      />
                      {validation.touched?.keluhanUtamaText
                        && !!validation.errors.keluhanUtamaText && (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.keluhanUtamaText}</div>
                          </FormFeedback>
                        )}
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Row>
    </React.Fragment>
  )
}

export default (PengkajianAwalKeperawatanRJ)