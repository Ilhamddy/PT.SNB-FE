import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UiContent from '../../../Components/Common/UiContent';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, Input, Label, Row, UncontrolledTooltip } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr';
import { Grid, _ } from 'gridjs-react';
import * as XLSX from 'xlsx';
import CustomSelect from '../../Select/Select';

const AsesmenBayiBaruLahir = () => {
  document.title = "Asesmen Bayi Baru Lahir";
  const dispatch = useDispatch();

  const [dateNow] = useState(() => new Date().toISOString())
  const vSetValidation = useFormik({
    initialValues: {
      start: '',
      end: '',
      formCheckCito: ''
    },
    validationSchema: Yup.object({
      // start: Yup.string().required('Tanggal Awal harus diisi'),
      // end: Yup.string().required('Tanggal Akhir harus diisi'),
    }),
    onSubmit: (values) => {
      // console.log(values)
      // dispatch(getLaporanRl_4({
      //   start: values.start || dateNow,
      //   end: values.end || dateNow,
      //   iskecelakaan: values.formCheckCito,
      // }));
    },
  })
  return (
    <React.Fragment>
      <Card>
        <CardHeader style={{ backgroundColor: "#FFCB46" }}>
          <h4 className="card-title mb-0" style={{ color: '#ffffff' }}>ALLOANAMNESA</h4>
        </CardHeader>
        <CardBody>
          <Row className='gy-2'>
            <Col lg={2}>
              <div className="mt-2">
                <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Responden</Label>
              </div>
            </Col>
            <Col lg={4}>
              <Input
                id="responden"
                name="responden"
                type="text"
                value={vSetValidation.values.responden}
                onChange={(e) => {
                  vSetValidation.setFieldValue('responden', e.target.value)
                }}
                invalid={vSetValidation.touched?.responden &&
                  !!vSetValidation.errors?.responden}
                placeholder='Isi nama responden'
              />
              {vSetValidation.touched?.responden
                && !!vSetValidation.errors.responden && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.responden}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={2}><div className="mt-2">
              <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Hubungan Dengan Pasien</Label>
            </div>
            </Col>
            <Col lg={4}>
              <CustomSelect
                id="hubungan"
                name="hubungan"
                options={[]}
                onChange={(e) => {
                  vSetValidation.setFieldValue('hubungan', e?.value || '')
                }}
                value={vSetValidation.values.hubungan}
                className={`input row-header ${!!vSetValidation?.errors.hubungan ? 'is-invalid' : ''
                  }`}
                placeholder='Pilih hubungan dengan pasien'
              />
              {vSetValidation.touched.hubungan &&
                !!vSetValidation.errors.hubungan && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.hubungan}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={12}>
              <Input
                id="anamnesaBayi"
                name="anamnesaBayi"
                type="textarea"
                value={vSetValidation.values.anamnesaBayi}
                onChange={(e) => {
                  vSetValidation.setFieldValue('anamnesaBayi', e.target.value)
                }}
                invalid={vSetValidation.touched?.anamnesaBayi &&
                  !!vSetValidation.errors?.anamnesaBayi}
                placeholder='Isi anamnesa bayi disini'
              />
              {vSetValidation.touched?.anamnesaBayi
                && !!vSetValidation.errors.anamnesaBayi && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.anamnesaBayi}</div>
                  </FormFeedback>
                )}
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardHeader style={{ backgroundColor: "#FFCB46" }}>
          <h4 className="card-title mb-0" style={{ color: '#ffffff' }}>Riwayat Kelahiran</h4>
        </CardHeader>
        <CardBody>
          <Row className='gy-2'>
            <Col lg={12}><div className="mt-2">
              <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Riwayat kelahiran ibu :</Label>
            </div>
            </Col>
            <Col lg={2}><div className="mt-2">
              <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Gravida</Label>
            </div>
            </Col>
            <Col lg={2}><div className="mt-2">
              <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Partus</Label>
            </div>
            </Col>
            <Col lg={2}><div className="mt-2">
              <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Abosrtus</Label>
            </div>
            </Col>
            <Col lg={12}><div className="mt-2">
              <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Keadaan Ibu Selama Hamil</Label>
            </div>
            </Col>
            <Col lg={12}><div className="mt-2">
              <Input
                id="keadanIbuSelamaHamil"
                name="keadanIbuSelamaHamil"
                type="textarea"
                value={vSetValidation.values.keadanIbuSelamaHamil}
                onChange={(e) => {
                  vSetValidation.setFieldValue('keadanIbuSelamaHamil', e.target.value)
                }}
                invalid={vSetValidation.touched?.keadanIbuSelamaHamil &&
                  !!vSetValidation.errors?.keadanIbuSelamaHamil}
                placeholder='Isi keadan Ibu Selama Hamil'
              />
              {vSetValidation.touched?.keadanIbuSelamaHamil
                && !!vSetValidation.errors.keadanIbuSelamaHamil && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.keadanIbuSelamaHamil}</div>
                  </FormFeedback>
                )}
            </div>
            </Col>
            <Col lg={2}><div className="mt-2">
              <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Tempat Persalinan</Label>
            </div>
            </Col>
            <Col lg={4}>
              <Input
                id="tempatPersalinan"
                name="tempatPersalinan"
                type="text"
                value={vSetValidation.values.tempatPersalinan}
                onChange={(e) => {
                  vSetValidation.setFieldValue('tempatPersalinan', e.target.value)
                }}
                invalid={vSetValidation.touched?.tempatPersalinan &&
                  !!vSetValidation.errors?.tempatPersalinan}
                placeholder='Isi tempat persalinan'
              />
              {vSetValidation.touched?.tempatPersalinan
                && !!vSetValidation.errors.tempatPersalinan && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.tempatPersalinan}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={2}><div className="mt-2">
              <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Penolong</Label>
            </div>
            </Col>
            <Col lg={4}>
              <Input
                id="penolong"
                name="penolong"
                type="text"
                value={vSetValidation.values.penolong}
                onChange={(e) => {
                  vSetValidation.setFieldValue('penolong', e.target.value)
                }}
                invalid={vSetValidation.touched?.penolong &&
                  !!vSetValidation.errors?.penolong}
                placeholder='Isi penolong'
              />
              {vSetValidation.touched?.penolong
                && !!vSetValidation.errors.penolong && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.penolong}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={12}><div className="mt-2">
              <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Ikhtisar Persalinan :</Label>
            </div>
            </Col>
            <Col lg={2}><div className="mt-2">
              <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Ketuban Pecah</Label>
            </div>
            </Col>
            <Col lg={4}>
              <KontainerFlatpickr
                isError={vSetValidation.touched?.ketubanPecah &&
                  !!vSetValidation.errors?.ketubanPecah}
                id="ketubanPecah"
                options={{
                  dateFormat: 'Y-m-d',
                  defaultDate: 'today',
                }}
                value={vSetValidation.values.ketubanPecah}
                onChange={([newDate]) => {
                  vSetValidation.setFieldValue('ketubanPecah', newDate.toISOString())
                }}
              />
              {vSetValidation.touched?.ketubanPecah
                && !!vSetValidation.errors.ketubanPecah && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.ketubanPecah}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={2}><div className="mt-2">
              <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Air Ketuban</Label>
            </div>
            </Col>
            <Col lg={4}>
              <CustomSelect
                id="airKetuban"
                name="airKetuban"
                options={[]}
                onChange={(e) => {
                  vSetValidation.setFieldValue('airKetuban', e?.value || '')
                }}
                value={vSetValidation.values.airKetuban}
                className={`input row-header ${!!vSetValidation?.errors.airKetuban ? 'is-invalid' : ''
                  }`}
              />
              {vSetValidation.touched.airKetuban &&
                !!vSetValidation.errors.airKetuban && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.airKetuban}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={2}><div className="mt-2">
              <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Lahir</Label>
            </div>
            </Col>
            <Col lg={4}>
              <KontainerFlatpickr
                isError={vSetValidation.touched?.jamLahir &&
                  !!vSetValidation.errors?.jamLahir}
                id="jamLahir"
                options={{
                  dateFormat: 'Y-m-d',
                  defaultDate: 'today',
                }}
                value={vSetValidation.values.jamLahir}
                onChange={([newDate]) => {
                  vSetValidation.setFieldValue('jamLahir', newDate.toISOString())
                }}

              />
              {vSetValidation.touched?.jamLahir
                && !!vSetValidation.errors.jamLahir && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.jamLahir}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={2}><div className="mt-2">
              <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Jam Persalinan(Jam)</Label>
            </div>
            </Col>
            <Col lg={4}>
              <KontainerFlatpickr
                isError={vSetValidation.touched?.jamPersalinan &&
                  !!vSetValidation.errors?.jamPersalinan}
                id="jamPersalinan"
                options={{
                  dateFormat: 'Y-m-d',
                  defaultDate: 'today',
                }}
                value={vSetValidation.values.jamPersalinan}
                onChange={([newDate]) => {
                  vSetValidation.setFieldValue('jamPersalinan', newDate.toISOString())
                }}
                placeholder='Isi berapa lama persalinan ibu'
              />
              {vSetValidation.touched?.jamPersalinan
                && !!vSetValidation.errors.jamPersalinan && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.jamPersalinan}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={2}><div className="mt-2">
              <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Macam Persalinan</Label>
            </div>
            </Col>
            <Col lg={4}>
              <CustomSelect
                id="macamPersalinan"
                name="macamPersalinan"
                options={[]}
                onChange={(e) => {
                  vSetValidation.setFieldValue('macamPersalinan', e?.value || '')
                }}
                value={vSetValidation.values.macamPersalinan}
                className={`input row-header ${!!vSetValidation?.errors.macamPersalinan ? 'is-invalid' : ''
                  }`}
              />
              {vSetValidation.touched.macamPersalinan &&
                !!vSetValidation.errors.macamPersalinan && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.macamPersalinan}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={2}><div className="mt-2">
              <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Indikasi</Label>
            </div>
            </Col>
            <Col lg={4}>
              <Input
                id="indikasi"
                name="indikasi"
                type="textarea"
                value={vSetValidation.values.indikasi}
                onChange={(e) => {
                  vSetValidation.setFieldValue('indikasi', e.target.value)
                }}
                invalid={vSetValidation.touched?.indikasi &&
                  !!vSetValidation.errors?.indikasi}
              />
              {vSetValidation.touched?.indikasi
                && !!vSetValidation.errors.indikasi && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.indikasi}</div>
                  </FormFeedback>
                )}
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardHeader style={{ backgroundColor: "#FFCB46" }}>
          <h4 className="card-title mb-0" style={{ color: '#ffffff' }}>Keadaan Umum Bayi</h4>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader style={{ backgroundColor: "#FFCB46" }}>
          <h4 className="card-title mb-0" style={{ color: '#ffffff' }}>Pemeriksaan Fisik</h4>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader style={{ backgroundColor: "#FFCB46" }}>
          <h4 className="card-title mb-0" style={{ color: '#ffffff' }}>Pemeriksaan Laboratorium</h4>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader style={{ backgroundColor: "#FFCB46" }}>
          <h4 className="card-title mb-0" style={{ color: '#ffffff' }}>Diagnosa Kerja</h4>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader style={{ backgroundColor: "#FFCB46" }}>
          <h4 className="card-title mb-0" style={{ color: '#ffffff' }}>Penatalaksanaan</h4>
        </CardHeader>
      </Card>
    </React.Fragment>
  )
}

export default AsesmenBayiBaruLahir