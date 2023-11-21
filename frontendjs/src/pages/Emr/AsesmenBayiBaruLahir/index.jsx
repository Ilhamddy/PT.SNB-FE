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
import Skala from '../../../Components/Skala/Skala';

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
  const [skalaGravida, setSkalaGravida] = useState(0)
  const onClickSkalaGravida = (q) => {
    setSkalaGravida(q)
    // vSetValidation.setFieldValue('skalanyeri', q)
  }
  const [skalaPartus, setSkalaPartus] = useState(0)
  const onClickSkalaPartus = (q) => {
    setSkalaPartus(q)
    // vSetValidation.setFieldValue('skalanyeri', q)
  }
  const [skalaAbortus, setSkalaAbortus] = useState(0)
  const onClickSkalaAbortus = (q) => {
    setSkalaAbortus(q)
    // vSetValidation.setFieldValue('skalanyeri', q)
  }
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
            <Col lg={2}><div className="mt-5">
              <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Gravida</Label>
            </div>
            </Col>
            <Col lg={10}>
              <Skala
                quantity={skalaGravida}
                onQuantityChange={(q) => onClickSkalaGravida(q)}
              />
            </Col>
            <Col lg={2}><div className="mt-5">
              <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Partus</Label>
            </div>
            </Col>
            <Col lg={10}>
              <Skala
                quantity={skalaPartus}
                onQuantityChange={(q) => onClickSkalaPartus(q)}
              />
            </Col>
            <Col lg={2}><div className="mt-5">
              <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Abortus</Label>
            </div>
            </Col>
            <Col lg={10}>
              <Skala
                quantity={skalaAbortus}
                onQuantityChange={(q) => onClickSkalaAbortus(q)}
              />
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
        <CardBody>
          <div className='border-bottom'>
            <Row className='gy-2'>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Jenis Kelamin</Label>
                </div>
              </Col>
              <Col lg={2}>
                <CustomSelect
                  id="jenisKelamin"
                  name="jenisKelamin"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('jenisKelamin', e?.value || '')
                  }}
                  value={vSetValidation.values.jenisKelamin}
                  className={`input row-header ${!!vSetValidation?.errors.jenisKelamin ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.jenisKelamin &&
                  !!vSetValidation.errors.jenisKelamin && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.jenisKelamin}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Keadaan</Label>
                </div>
              </Col>
              <Col lg={2}>
                <CustomSelect
                  id="keadaan"
                  name="keadaan"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('keadaan', e?.value || '')
                  }}
                  value={vSetValidation.values.keadaan}
                  className={`input row-header ${!!vSetValidation?.errors.keadaan ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.keadaan &&
                  !!vSetValidation.errors.keadaan && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.keadaan}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Berat Badan(gram)</Label>
                </div>
              </Col>
              <Col lg={2}>
                <Input
                  id="beratBadanBayi"
                  name="beratBadanBayi"
                  type="text"
                  value={vSetValidation.values.beratBadanBayi}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('beratBadanBayi', e.target.value)
                  }}
                  invalid={vSetValidation.touched?.beratBadanBayi &&
                    !!vSetValidation.errors?.beratBadanBayi}
                  placeholder='Isi berat badan bayi'
                />
                {vSetValidation.touched?.beratBadanBayi
                  && !!vSetValidation.errors.beratBadanBayi && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.beratBadanBayi}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Panjang Badan(cm)</Label>
                </div>
              </Col>
              <Col lg={2}>
                <Input
                  id="panjangBadan"
                  name="panjangBadan"
                  type="text"
                  value={vSetValidation.values.panjangBadan}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('panjangBadan', e.target.value)
                  }}
                  invalid={vSetValidation.touched?.panjangBadan &&
                    !!vSetValidation.errors?.panjangBadan}
                  placeholder='Isi panjang badan'
                />
                {vSetValidation.touched?.panjangBadan
                  && !!vSetValidation.errors.panjangBadan && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.panjangBadan}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Lingkar dada(cm)</Label>
                </div>
              </Col>
              <Col lg={2}>
                <Input
                  id="lingkarDada"
                  name="lingkarDada"
                  type="text"
                  value={vSetValidation.values.lingkarDada}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('lingkarDada', e.target.value)
                  }}
                  invalid={vSetValidation.touched?.lingkarDada &&
                    !!vSetValidation.errors?.lingkarDada}
                  placeholder='Isi lingkar dada'
                />
                {vSetValidation.touched?.lingkarDada
                  && !!vSetValidation.errors.lingkarDada && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.lingkarDada}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Lingkar kepala(cm)</Label>
                </div>
              </Col>
              <Col lg={2}>
                <Input
                  id="lingkarKepala"
                  name="lingkarKepala"
                  type="text"
                  value={vSetValidation.values.lingkarKepala}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('lingkarKepala', e.target.value)
                  }}
                  invalid={vSetValidation.touched?.lingkarKepala &&
                    !!vSetValidation.errors?.lingkarKepala}
                  placeholder='Isi lingkar kepala'
                />
                {vSetValidation.touched?.lingkarKepala
                  && !!vSetValidation.errors.lingkarKepala && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.lingkarKepala}</div>
                    </FormFeedback>
                  )}
              </Col>
            </Row>
          </div>
          <div className='border-bottom'>
            <Row className='gy-2'>
              <Col lg={12}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Untuk bayi yang keadaan umumnya jelek :</Label>
                </div>
              </Col>
              <Col lg={4}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Lahir kemudian meninggal (menit post partum)</Label>
                </div>
              </Col>
              <Col lg={2}>
                <Input
                  id="menitMeninggal"
                  name="menitMeninggal"
                  type="text"
                  value={vSetValidation.values.menitMeninggal}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('menitMeninggal', e.target.value)
                  }}
                  invalid={vSetValidation.touched?.menitMeninggal &&
                    !!vSetValidation.errors?.menitMeninggal}
                  placeholder='Isi waktu dalam menit'
                />
                {vSetValidation.touched?.menitMeninggal
                  && !!vSetValidation.errors.menitMeninggal && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.menitMeninggal}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={3}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Bayi lahir mati, sebab kematian</Label>
                </div>
              </Col>
              <Col lg={3}>
                <CustomSelect
                  id="sebabKematianBayi"
                  name="sebabKematianBayi"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('sebabKematianBayi', e?.value || '')
                  }}
                  value={vSetValidation.values.sebabKematianBayi}
                  className={`input row-header ${!!vSetValidation?.errors.sebabKematianBayi ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.sebabKematianBayi &&
                  !!vSetValidation.errors.sebabKematianBayi && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.sebabKematianBayi}</div>
                    </FormFeedback>
                  )}
              </Col>
            </Row>
          </div>
          <div className='border-bottom'>
            <Row className='gy-2'>
              <Col lg={12}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Appearance :</Label>
                </div>
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">1 Menit</Label>
                </div>
              </Col>
              <Col lg={2}>
                <CustomSelect
                  id="a1Menit"
                  name="a1Menit"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('a1Menit', e?.value || '')
                  }}
                  value={vSetValidation.values.a1Menit}
                  className={`input row-header ${!!vSetValidation?.errors.a1Menit ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.a1Menit &&
                  !!vSetValidation.errors.a1Menit && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.a1Menit}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">5 Menit</Label>
                </div>
              </Col>
              <Col lg={2}>
                <CustomSelect
                  id="a5Menit"
                  name="a5Menit"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('a5Menit', e?.value || '')
                  }}
                  value={vSetValidation.values.a5Menit}
                  className={`input row-header ${!!vSetValidation?.errors.a5Menit ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.a5Menit &&
                  !!vSetValidation.errors.a5Menit && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.a5Menit}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">10 Menit</Label>
                </div>
              </Col>
              <Col lg={2}>
                <CustomSelect
                  id="a10Menit"
                  name="a10Menit"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('a10Menit', e?.value || '')
                  }}
                  value={vSetValidation.values.a10Menit}
                  className={`input row-header ${!!vSetValidation?.errors.a10Menit ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.a10Menit &&
                  !!vSetValidation.errors.a10Menit && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.a10Menit}</div>
                    </FormFeedback>
                  )}
              </Col>
            </Row>
          </div>
          <div className='border-bottom'>
            <Row className='gy-2'>
              <Col lg={12}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Pulse (denyut jantung) :</Label>
                </div>
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">1 Menit</Label>
                </div>
              </Col>
              <Col lg={2}>
                <CustomSelect
                  id="p1Menit"
                  name="p1Menit"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('p1Menit', e?.value || '')
                  }}
                  value={vSetValidation.values.p1Menit}
                  className={`input row-header ${!!vSetValidation?.errors.p1Menit ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.p1Menit &&
                  !!vSetValidation.errors.p1Menit && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.p1Menit}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">5 Menit</Label>
                </div>
              </Col>
              <Col lg={2}>
                <CustomSelect
                  id="p5Menit"
                  name="p5Menit"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('p5Menit', e?.value || '')
                  }}
                  value={vSetValidation.values.p5Menit}
                  className={`input row-header ${!!vSetValidation?.errors.p5Menit ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.p5Menit &&
                  !!vSetValidation.errors.p5Menit && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.p5Menit}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">10 Menit</Label>
                </div>
              </Col>
              <Col lg={2}>
                <CustomSelect
                  id="p10Menit"
                  name="p10Menit"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('p10Menit', e?.value || '')
                  }}
                  value={vSetValidation.values.p10Menit}
                  className={`input row-header ${!!vSetValidation?.errors.p10Menit ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.p10Menit &&
                  !!vSetValidation.errors.p10Menit && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.p10Menit}</div>
                    </FormFeedback>
                  )}
              </Col>
            </Row>
          </div>
          <div className='border-bottom'>
            <Row className='gy-2'>
              <Col lg={12}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Grimace (refleks) :</Label>
                </div>
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">1 Menit</Label>
                </div>
              </Col>
              <Col lg={2}>
                <CustomSelect
                  id="g1Menit"
                  name="g1Menit"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('g1Menit', e?.value || '')
                  }}
                  value={vSetValidation.values.g1Menit}
                  className={`input row-header ${!!vSetValidation?.errors.g1Menit ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.g1Menit &&
                  !!vSetValidation.errors.g1Menit && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.g1Menit}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">5 Menit</Label>
                </div>
              </Col>
              <Col lg={2}>
                <CustomSelect
                  id="g5Menit"
                  name="g5Menit"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('g5Menit', e?.value || '')
                  }}
                  value={vSetValidation.values.g5Menit}
                  className={`input row-header ${!!vSetValidation?.errors.g5Menit ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.g5Menit &&
                  !!vSetValidation.errors.g5Menit && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.g5Menit}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">10 Menit</Label>
                </div>
              </Col>
              <Col lg={2}>
                <CustomSelect
                  id="g10Menit"
                  name="g10Menit"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('g10Menit', e?.value || '')
                  }}
                  value={vSetValidation.values.g10Menit}
                  className={`input row-header ${!!vSetValidation?.errors.g10Menit ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.g10Menit &&
                  !!vSetValidation.errors.g10Menit && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.g10Menit}</div>
                    </FormFeedback>
                  )}
              </Col>
            </Row>
          </div>
          <div className='border-bottom'>
            <Row className='gy-2'>
              <Col lg={12}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Activity (tonus otot) :</Label>
                </div>
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">1 Menit</Label>
                </div>
              </Col>
              <Col lg={2}>
                <CustomSelect
                  id="ac1Menit"
                  name="ac1Menit"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('ac1Menit', e?.value || '')
                  }}
                  value={vSetValidation.values.ac1Menit}
                  className={`input row-header ${!!vSetValidation?.errors.ac1Menit ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.ac1Menit &&
                  !!vSetValidation.errors.ac1Menit && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.ac1Menit}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">5 Menit</Label>
                </div>
              </Col>
              <Col lg={2}>
                <CustomSelect
                  id="ac5Menit"
                  name="ac5Menit"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('ac5Menit', e?.value || '')
                  }}
                  value={vSetValidation.values.ac5Menit}
                  className={`input row-header ${!!vSetValidation?.errors.ac5Menit ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.ac5Menit &&
                  !!vSetValidation.errors.ac5Menit && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.ac5Menit}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">10 Menit</Label>
                </div>
              </Col>
              <Col lg={2}>
                <CustomSelect
                  id="ac10Menit"
                  name="ac10Menit"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('ac10Menit', e?.value || '')
                  }}
                  value={vSetValidation.values.ac10Menit}
                  className={`input row-header ${!!vSetValidation?.errors.ac10Menit ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.ac10Menit &&
                  !!vSetValidation.errors.ac10Menit && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.ac10Menit}</div>
                    </FormFeedback>
                  )}
              </Col>
            </Row>
          </div>
          <div className='border-bottom'>
            <Row className='gy-2'>
              <Col lg={12}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Respiration (pernapasan) :</Label>
                </div>
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">1 Menit</Label>
                </div>
              </Col>
              <Col lg={2}>
                <CustomSelect
                  id="r1Menit"
                  name="r1Menit"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('r1Menit', e?.value || '')
                  }}
                  value={vSetValidation.values.r1Menit}
                  className={`input row-header ${!!vSetValidation?.errors.r1Menit ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.r1Menit &&
                  !!vSetValidation.errors.r1Menit && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.r1Menit}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">5 Menit</Label>
                </div>
              </Col>
              <Col lg={2}>
                <CustomSelect
                  id="r5Menit"
                  name="r5Menit"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('r5Menit', e?.value || '')
                  }}
                  value={vSetValidation.values.r5Menit}
                  className={`input row-header ${!!vSetValidation?.errors.r5Menit ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.r5Menit &&
                  !!vSetValidation.errors.r5Menit && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.r5Menit}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">10 Menit</Label>
                </div>
              </Col>
              <Col lg={2}>
                <CustomSelect
                  id="r10Menit"
                  name="r10Menit"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('r10Menit', e?.value || '')
                  }}
                  value={vSetValidation.values.r10Menit}
                  className={`input row-header ${!!vSetValidation?.errors.r10Menit ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.r10Menit &&
                  !!vSetValidation.errors.r10Menit && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.r10Menit}</div>
                    </FormFeedback>
                  )}
              </Col>
            </Row>
          </div>
          <div className='border-bottom'>
            <Row className='gy-2'>
              <Col lg={12}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Total Apgar Score :</Label>
                </div>
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">1 Menit</Label>
                </div>
              </Col>
              <Col lg={2}>
                <CustomSelect
                  id="total1Menit"
                  name="total1Menit"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('total1Menit', e?.value || '')
                  }}
                  value={vSetValidation.values.total1Menit}
                  className={`input row-header ${!!vSetValidation?.errors.total1Menit ? 'is-invalid' : ''
                    }`}
                  isDisabled
                />
                {vSetValidation.touched.total1Menit &&
                  !!vSetValidation.errors.total1Menit && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.total1Menit}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">5 Menit</Label>
                </div>
              </Col>
              <Col lg={2}>
                <CustomSelect
                  id="total5Menit"
                  name="total5Menit"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('total5Menit', e?.value || '')
                  }}
                  value={vSetValidation.values.total5Menit}
                  className={`input row-header ${!!vSetValidation?.errors.total5Menit ? 'is-invalid' : ''
                    }`}
                  isDisabled
                />
                {vSetValidation.touched.total5Menit &&
                  !!vSetValidation.errors.total5Menit && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.total5Menit}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">10 Menit</Label>
                </div>
              </Col>
              <Col lg={2}>
                <CustomSelect
                  id="total10Menit"
                  name="total10Menit"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('total10Menit', e?.value || '')
                  }}
                  value={vSetValidation.values.total10Menit}
                  className={`input row-header ${!!vSetValidation?.errors.total10Menit ? 'is-invalid' : ''
                    }`}
                  isDisabled
                />
                {vSetValidation.touched.total10Menit &&
                  !!vSetValidation.errors.total10Menit && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.total10Menit}</div>
                    </FormFeedback>
                  )}
              </Col>
            </Row>
          </div>
          <div className='border-bottom'>
            <Row className='gy-2'>
              <Col lg={12}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Resusitasi :</Label>
                </div>
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">T-Piece</Label>
                </div>
              </Col>
              <Col lg={4}>
                <CustomSelect
                  id="piece"
                  name="piece"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('piece', e?.value || '')
                  }}
                  value={vSetValidation.values.piece}
                  className={`input row-header ${!!vSetValidation?.errors.piece ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.piece &&
                  !!vSetValidation.errors.piece && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.piece}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">durasi(menit)</Label>
                </div>
              </Col>
              <Col lg={4}>
                <CustomSelect
                  id="pieceDurasi"
                  name="pieceDurasi"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('pieceDurasi', e?.value || '')
                  }}
                  value={vSetValidation.values.pieceDurasi}
                  className={`input row-header ${!!vSetValidation?.errors.pieceDurasi ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.pieceDurasi &&
                  !!vSetValidation.errors.pieceDurasi && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.pieceDurasi}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">O² Sungkup/Hidung</Label>
                </div>
              </Col>
              <Col lg={4}>
                <CustomSelect
                  id="sungkup"
                  name="sungkup"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('sungkup', e?.value || '')
                  }}
                  value={vSetValidation.values.sungkup}
                  className={`input row-header ${!!vSetValidation?.errors.sungkup ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.sungkup &&
                  !!vSetValidation.errors.sungkup && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.sungkup}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">durasi(menit)</Label>
                </div>
              </Col>
              <Col lg={4}>
                <CustomSelect
                  id="sungkupDurasi"
                  name="sungkupDurasi"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('sungkupDurasi', e?.value || '')
                  }}
                  value={vSetValidation.values.sungkupDurasi}
                  className={`input row-header ${!!vSetValidation?.errors.sungkupDurasi ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.sungkupDurasi &&
                  !!vSetValidation.errors.sungkupDurasi && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.sungkupDurasi}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Pompa udara berulang</Label>
                </div>
              </Col>
              <Col lg={4}>
                <CustomSelect
                  id="pompa"
                  name="pompa"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('pompa', e?.value || '')
                  }}
                  value={vSetValidation.values.pompa}
                  className={`input row-header ${!!vSetValidation?.errors.pompa ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.pompa &&
                  !!vSetValidation.errors.pompa && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.pompa}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">durasi(menit)</Label>
                </div>
              </Col>
              <Col lg={4}>
                <CustomSelect
                  id="pompaDurasi"
                  name="pompaDurasi"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('pompaDurasi', e?.value || '')
                  }}
                  value={vSetValidation.values.pompaDurasi}
                  className={`input row-header ${!!vSetValidation?.errors.pompaDurasi ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.pompaDurasi &&
                  !!vSetValidation.errors.pompaDurasi && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.pompaDurasi}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Intubatic intratracheal</Label>
                </div>
              </Col>
              <Col lg={4}>
                <CustomSelect
                  id="intubatic"
                  name="intubatic"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('intubatic', e?.value || '')
                  }}
                  value={vSetValidation.values.intubatic}
                  className={`input row-header ${!!vSetValidation?.errors.intubatic ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.intubatic &&
                  !!vSetValidation.errors.intubatic && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.intubatic}</div>
                    </FormFeedback>
                  )}
              </Col>
              <Col lg={2}>
                <div className="mt-2">
                  <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">durasi(menit)</Label>
                </div>
              </Col>
              <Col lg={4}>
                <CustomSelect
                  id="intubaticDurasi"
                  name="intubaticDurasi"
                  options={[]}
                  onChange={(e) => {
                    vSetValidation.setFieldValue('intubaticDurasi', e?.value || '')
                  }}
                  value={vSetValidation.values.intubaticDurasi}
                  className={`input row-header ${!!vSetValidation?.errors.intubaticDurasi ? 'is-invalid' : ''
                    }`}
                />
                {vSetValidation.touched.intubaticDurasi &&
                  !!vSetValidation.errors.intubaticDurasi && (
                    <FormFeedback type="invalid">
                      <div>{vSetValidation.errors.intubaticDurasi}</div>
                    </FormFeedback>
                  )}
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader style={{ backgroundColor: "#FFCB46" }}>
          <h4 className="card-title mb-0" style={{ color: '#ffffff' }}>Pemeriksaan Fisik</h4>
        </CardHeader>
        <CardBody>
          <Row className='gy-2'>
            <Col lg={2}>
              <div className="mt-2">
                <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Kulit</Label>
              </div>
            </Col>
            <Col lg={2}>
              <Input
                id="kulit"
                name="kulit"
                type="textarea"
                value={vSetValidation.values.kulit}
                onChange={(e) => {
                  vSetValidation.setFieldValue('kulit', e.target.value)
                }}
                invalid={vSetValidation.touched?.kulit &&
                  !!vSetValidation.errors?.kulit}
              />
              {vSetValidation.touched?.kulit
                && !!vSetValidation.errors.kulit && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.kulit}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={2}>
              <div className="mt-2">
                <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">THT</Label>
              </div>
            </Col>
            <Col lg={2}>
              <Input
                id="tht"
                name="tht"
                type="textarea"
                value={vSetValidation.values.tht}
                onChange={(e) => {
                  vSetValidation.setFieldValue('tht', e.target.value)
                }}
                invalid={vSetValidation.touched?.tht &&
                  !!vSetValidation.errors?.tht}
              />
              {vSetValidation.touched?.tht
                && !!vSetValidation.errors.tht && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.tht}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={2}>
              <div className="mt-2">
                <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Mulut</Label>
              </div>
            </Col>
            <Col lg={2}>
              <Input
                id="mulut"
                name="mulut"
                type="textarea"
                value={vSetValidation.values.mulut}
                onChange={(e) => {
                  vSetValidation.setFieldValue('mulut', e.target.value)
                }}
                invalid={vSetValidation.touched?.mulut &&
                  !!vSetValidation.errors?.mulut}
              />
              {vSetValidation.touched?.mulut
                && !!vSetValidation.errors.mulut && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.mulut}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={2}>
              <div className="mt-2">
                <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Leher</Label>
              </div>
            </Col>
            <Col lg={2}>
              <Input
                id="leher"
                name="leher"
                type="textarea"
                value={vSetValidation.values.leher}
                onChange={(e) => {
                  vSetValidation.setFieldValue('leher', e.target.value)
                }}
                invalid={vSetValidation.touched?.leher &&
                  !!vSetValidation.errors?.leher}
              />
              {vSetValidation.touched?.leher
                && !!vSetValidation.errors.leher && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.leher}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={2}>
              <div className="mt-2">
                <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Dada</Label>
              </div>
            </Col>
            <Col lg={2}>
              <Input
                id="dada"
                name="dada"
                type="textarea"
                value={vSetValidation.values.dada}
                onChange={(e) => {
                  vSetValidation.setFieldValue('dada', e.target.value)
                }}
                invalid={vSetValidation.touched?.dada &&
                  !!vSetValidation.errors?.dada}
              />
              {vSetValidation.touched?.dada
                && !!vSetValidation.errors.dada && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.dada}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={2}>
              <div className="mt-2">
                <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Paru</Label>
              </div>
            </Col>
            <Col lg={2}>
              <Input
                id="paru"
                name="paru"
                type="textarea"
                value={vSetValidation.values.paru}
                onChange={(e) => {
                  vSetValidation.setFieldValue('paru', e.target.value)
                }}
                invalid={vSetValidation.touched?.paru &&
                  !!vSetValidation.errors?.paru}
              />
              {vSetValidation.touched?.paru
                && !!vSetValidation.errors.paru && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.paru}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={2}>
              <div className="mt-2">
                <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Jantung</Label>
              </div>
            </Col>
            <Col lg={2}>
              <Input
                id="jantung"
                name="jantung"
                type="textarea"
                value={vSetValidation.values.jantung}
                onChange={(e) => {
                  vSetValidation.setFieldValue('jantung', e.target.value)
                }}
                invalid={vSetValidation.touched?.jantung &&
                  !!vSetValidation.errors?.jantung}
              />
              {vSetValidation.touched?.jantung
                && !!vSetValidation.errors.jantung && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.jantung}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={2}>
              <div className="mt-2">
                <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Abdomen</Label>
              </div>
            </Col>
            <Col lg={2}>
              <Input
                id="abdomen"
                name="abdomen"
                type="textarea"
                value={vSetValidation.values.abdomen}
                onChange={(e) => {
                  vSetValidation.setFieldValue('abdomen', e.target.value)
                }}
                invalid={vSetValidation.touched?.abdomen &&
                  !!vSetValidation.errors?.abdomen}
              />
              {vSetValidation.touched?.abdomen
                && !!vSetValidation.errors.abdomen && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.abdomen}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={2}>
              <div className="mt-2">
                <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Genitalia</Label>
              </div>
            </Col>
            <Col lg={2}>
              <Input
                id="genitalia"
                name="genitalia"
                type="textarea"
                value={vSetValidation.values.genitalia}
                onChange={(e) => {
                  vSetValidation.setFieldValue('genitalia', e.target.value)
                }}
                invalid={vSetValidation.touched?.genitalia &&
                  !!vSetValidation.errors?.genitalia}
              />
              {vSetValidation.touched?.genitalia
                && !!vSetValidation.errors.genitalia && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.genitalia}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={2}>
              <div className="mt-2">
                <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Anus</Label>
              </div>
            </Col>
            <Col lg={2}>
              <Input
                id="anus"
                name="anus"
                type="textarea"
                value={vSetValidation.values.anus}
                onChange={(e) => {
                  vSetValidation.setFieldValue('anus', e.target.value)
                }}
                invalid={vSetValidation.touched?.anus &&
                  !!vSetValidation.errors?.anus}
              />
              {vSetValidation.touched?.anus
                && !!vSetValidation.errors.anus && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.anus}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={2}>
              <div className="mt-2">
                <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Extremitas Atas</Label>
              </div>
            </Col>
            <Col lg={2}>
              <Input
                id="extremitasAtas"
                name="extremitasAtas"
                type="textarea"
                value={vSetValidation.values.extremitasAtas}
                onChange={(e) => {
                  vSetValidation.setFieldValue('extremitasAtas', e.target.value)
                }}
                invalid={vSetValidation.touched?.extremitasAtas &&
                  !!vSetValidation.errors?.extremitasAtas}
              />
              {vSetValidation.touched?.extremitasAtas
                && !!vSetValidation.errors.extremitasAtas && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.extremitasAtas}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={2}>
              <div className="mt-2">
                <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Extremitas Bawah</Label>
              </div>
            </Col>
            <Col lg={2}>
              <Input
                id="extremitasBawah"
                name="extremitasBawah"
                type="textarea"
                value={vSetValidation.values.extremitasBawah}
                onChange={(e) => {
                  vSetValidation.setFieldValue('extremitasBawah', e.target.value)
                }}
                invalid={vSetValidation.touched?.extremitasBawah &&
                  !!vSetValidation.errors?.extremitasBawah}
              />
              {vSetValidation.touched?.extremitasBawah
                && !!vSetValidation.errors.extremitasBawah && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.extremitasBawah}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={2}>
              <div className="mt-2">
                <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Refleks Hidup</Label>
              </div>
            </Col>
            <Col lg={2}>
              <Input
                id="reflekHidup"
                name="reflekHidup"
                type="textarea"
                value={vSetValidation.values.reflekHidup}
                onChange={(e) => {
                  vSetValidation.setFieldValue('reflekHidup', e.target.value)
                }}
                invalid={vSetValidation.touched?.reflekHidup &&
                  !!vSetValidation.errors?.reflekHidup}
              />
              {vSetValidation.touched?.reflekHidup
                && !!vSetValidation.errors.reflekHidup && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.reflekHidup}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={2}>
              <div className="mt-2">
                <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Pengeluaran Air Keruh</Label>
              </div>
            </Col>
            <Col lg={2}>
              <Input
                id="pengeluaranAirKeruh"
                name="pengeluaranAirKeruh"
                type="textarea"
                value={vSetValidation.values.pengeluaranAirKeruh}
                onChange={(e) => {
                  vSetValidation.setFieldValue('pengeluaranAirKeruh', e.target.value)
                }}
                invalid={vSetValidation.touched?.pengeluaranAirKeruh &&
                  !!vSetValidation.errors?.pengeluaranAirKeruh}
              />
              {vSetValidation.touched?.pengeluaranAirKeruh
                && !!vSetValidation.errors.pengeluaranAirKeruh && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.pengeluaranAirKeruh}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={2}>
              <div className="mt-2">
                <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Pengeluaran Mekoneum</Label>
              </div>
            </Col>
            <Col lg={2}>
              <Input
                id="pengeluaranMekoneum"
                name="pengeluaranMekoneum"
                type="textarea"
                value={vSetValidation.values.pengeluaranMekoneum}
                onChange={(e) => {
                  vSetValidation.setFieldValue('pengeluaranMekoneum', e.target.value)
                }}
                invalid={vSetValidation.touched?.pengeluaranMekoneum &&
                  !!vSetValidation.errors?.pengeluaranMekoneum}
              />
              {vSetValidation.touched?.pengeluaranMekoneum
                && !!vSetValidation.errors.pengeluaranMekoneum && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.pengeluaranMekoneum}</div>
                  </FormFeedback>
                )}
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardHeader style={{ backgroundColor: "#FFCB46" }}>
          <h4 className="card-title mb-0" style={{ color: '#ffffff' }}>Pemeriksaan Laboratorium</h4>
        </CardHeader>
        <CardBody>
          <Row className='gy-2'>
            <Col lg={2}>
              <div className="mt-2">
                <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Pemeriksaan Laboratorium</Label>
              </div>
            </Col>
            <Col lg={10}>
              <Input
                id="pemeriksaanLaboratorium"
                name="pemeriksaanLaboratorium"
                type="textarea"
                value={vSetValidation.values.pemeriksaanLaboratorium}
                onChange={(e) => {
                  vSetValidation.setFieldValue('pemeriksaanLaboratorium', e.target.value)
                }}
                invalid={vSetValidation.touched?.pemeriksaanLaboratorium &&
                  !!vSetValidation.errors?.pemeriksaanLaboratorium}
                placeholder='Isi diagnosa kerja'
              />
              {vSetValidation.touched?.pemeriksaanLaboratorium
                && !!vSetValidation.errors.pemeriksaanLaboratorium && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.pemeriksaanLaboratorium}</div>
                  </FormFeedback>
                )}
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardHeader style={{ backgroundColor: "#FFCB46" }}>
          <h4 className="card-title mb-0" style={{ color: '#ffffff' }}>Diagnosa Kerja</h4>
        </CardHeader>
        <CardBody>
          <Row className='gy-2'>
            <Col lg={2}>
              <div className="mt-2">
                <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Diagnosa Kerja</Label>
              </div>
            </Col>
            <Col lg={10}>
              <Input
                id="diagnosaKerja"
                name="diagnosaKerja"
                type="textarea"
                value={vSetValidation.values.diagnosaKerja}
                onChange={(e) => {
                  vSetValidation.setFieldValue('diagnosaKerja', e.target.value)
                }}
                invalid={vSetValidation.touched?.diagnosaKerja &&
                  !!vSetValidation.errors?.diagnosaKerja}
                placeholder='Isi diagnosa kerja'
              />
              {vSetValidation.touched?.diagnosaKerja
                && !!vSetValidation.errors.diagnosaKerja && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.diagnosaKerja}</div>
                  </FormFeedback>
                )}
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardHeader style={{ backgroundColor: "#FFCB46" }}>
          <h4 className="card-title mb-0" style={{ color: '#ffffff' }}>Penatalaksanaan</h4>
        </CardHeader>
        <CardBody>
          <Row className='gy-2'>
            <Col lg={2}>
              <div className="mt-2">
                <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Penatalaksanaan</Label>
              </div>
            </Col>
            <Col lg={10}>
              <Input
                id="pentalakaksanaan"
                name="pentalakaksanaan"
                type="textarea"
                value={vSetValidation.values.pentalakaksanaan}
                onChange={(e) => {
                  vSetValidation.setFieldValue('pentalakaksanaan', e.target.value)
                }}
                invalid={vSetValidation.touched?.pentalakaksanaan &&
                  !!vSetValidation.errors?.pentalakaksanaan}
                placeholder='Isi pentalakaksanaan'
              />
              {vSetValidation.touched?.pentalakaksanaan
                && !!vSetValidation.errors.pentalakaksanaan && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidation.errors.pentalakaksanaan}</div>
                  </FormFeedback>
                )}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default AsesmenBayiBaruLahir