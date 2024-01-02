import React, { useEffect, useRef, useState } from 'react'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import withRouter from '../../../Components/Common/withRouter'
import { useFormik, yupToFormErrors } from 'formik'
import * as Yup from 'yup'
import { Card, CardBody, CardHeader, Col, Container, FormFeedback, Input, Label, Row } from 'reactstrap'
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr'
import CustomSelect from '../../Select/Select'
import { rgxAllNumber } from '../../../utils/regexcommon'

const PasienBaruBayi = () => {
  document.title = 'Profile Pasien Baru Bayi'

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: null,
      nikIbu: '',
      normIbu: '',
      alamatKTPIbu: '',
      nikPasien: '',
      namaPasien: '',
      jenisKelamin: '',
      titlepasien: '',
      tglLahirPasien: '',
      tempatLahir: '',
      agama: '',
      golDarah: '',
      kebangsaan: '',
      suku: '',
      alamatPasien: '',
      rt: '',
      rw: '',
      desa: '',
      kecamatan: '',
      kota: '',
      provinsi: '',
      pos: '',
      negara: '',
      alamatdomisili: '',
      rtdomisili: '',
      rwdomisili: '',
      desaDomisili: '',
      kecamatanDomisili: '',
      kotaDomisili: '',
      provinsiDomisili: '',
      posDomisili: '',
      negaraDomisili: '',
      nobpjs: '',
      nohp: '',
      norecdp: '',
    },
    validationSchema: Yup.object({
      nikIbu: Yup.string().required('NIK Ibu wajib diisi'),
      normIbu: Yup.string().required('Nomor RM wajib diisi'),
      namaPasien: Yup.string().required('Nama Pasien wajib diisi'),
      jenisKelamin: Yup.string().required('Jenis Kelamin wajib diisi'),
      titlepasien: Yup.string().required('Title Pasien wajib diisi'),
      tglLahirPasien: Yup.string().required('Tanggal Lahir wajib diisi'),
      tempatLahir: Yup.string().required('Tempat Lahir wajib diisi'),
      agama: Yup.string().required('Agama wajib diisi'),
      golDarah: Yup.string().required('Golongan Darah wajib diisi'),
      kebangsaan: Yup.string().required('Kebangsaan wajib diisi'),
      suku: Yup.string().required('Suku wajib diisi'),
      alamatPasien: Yup.string().required('Alamat Pasien wajib diisi'),
      rt: Yup.string().required('RT wajib diisi'),
      rw: Yup.string().required('RW wajib diisi'),
      desa: Yup.string().required('Desa wajib diisi'),
      negara: Yup.string().required('negara wajib diisi'),
      alamatdomisili: Yup.string().required('Alamat Domisili Wajib diisi'),
      rtdomisili: Yup.string().required('RT wajib diisi'),
      rwdomisili: Yup.string().required('RW wajib diisi'),
      desaDomisili: Yup.string().required('Desa wajib diisi'),
      negaraDomisili: Yup.string().required('negara wajib diisi'),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values)
    },
  })
  const [isSesuaiKtp, setisSesuaiKtp] = useState(false)
  const DataDiriIbu = (
    <Card style={{ backgroundColor: '#f1f2f6' }}>
      <CardHeader className="card-header-snb ">
        <h4 className="card-title mb-0">Data Diri Ibu</h4>
      </CardHeader>
      <CardBody>
        <Row className="gy-2">
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="noidentitas"
                className="form-label"
              >
                NIK Ibu
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <Input
              id="nikIbu"
              name="nikIbu"
              type="text"
              value={validation.values.nikIbu}
              onChange={(e) => {
                validation.setFieldValue('nikIbu', e.target.value)
              }}
              invalid={validation.touched?.nikIbu &&
                !!validation.errors?.nikIbu}
            />
            {validation.touched?.nikIbu
              && !!validation.errors.nikIbu && (
                <FormFeedback type="invalid">
                  <div>{validation.errors.nikIbu}</div>
                </FormFeedback>
              )}
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="noidentitas"
                className="form-label"
              >
                No. RM Ibu
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <Input
              id="normIbu"
              name="normIbu"
              type="text"
              value={validation.values.normIbu}
              onChange={(e) => {
                validation.setFieldValue('normIbu', e.target.value)
              }}
              invalid={validation.touched?.normIbu &&
                !!validation.errors?.normIbu}
            />
            {validation.touched?.normIbu
              && !!validation.errors.normIbu && (
                <FormFeedback type="invalid">
                  <div>{validation.errors.normIbu}</div>
                </FormFeedback>
              )}
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="noidentitas"
                className="form-label"
              >
                Nama Ibu
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <Input
              id="namaIbu"
              name="namaIbu"
              type="text"
              value={validation.values.namaIbu}
              onChange={(e) => {
                validation.setFieldValue('namaIbu', e.target.value)
              }}
              invalid={validation.touched?.namaIbu &&
                !!validation.errors?.namaIbu}
              disabled
            />
            {validation.touched?.namaIbu
              && !!validation.errors.namaIbu && (
                <FormFeedback type="invalid">
                  <div>{validation.errors.namaIbu}</div>
                </FormFeedback>
              )}
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="noidentitas"
                className="form-label"
              >
                Tanggal Lahir
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <KontainerFlatpickr
              isError={validation.touched?.tglLahirIbu &&
                !!validation.errors?.tglLahirIbu}
              id="tglLahirIbu"
              options={{
                dateFormat: 'Y-m-d',
                defaultDate: 'today',
              }}
              value={validation.values.tglLahirIbu}
              onChange={([newDate]) => {
                validation.setFieldValue('tglLahirIbu', newDate.toISOString())
              }}
              disabled
            />
            {validation.touched?.tglLahirIbu
              && !!validation.errors.tglLahirIbu && (
                <FormFeedback type="invalid">
                  <div>{validation.errors.tglLahirIbu}</div>
                </FormFeedback>
              )}
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="noidentitas"
                className="form-label"
              >
                Alamat KTP
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <Input
              id="alamatKTPIbu"
              name="alamatKTPIbu"
              type="textarea"
              value={validation.values.alamatKTPIbu}
              onChange={(e) => {
                validation.setFieldValue('alamatKTPIbu', e.target.value)
              }}
              invalid={validation.touched?.alamatKTPIbu &&
                !!validation.errors?.alamatKTPIbu}
              disabled
            />
            {validation.touched?.alamatKTPIbu
              && !!validation.errors.alamatKTPIbu && (
                <FormFeedback type="invalid">
                  <div>{validation.errors.alamatKTPIbu}</div>
                </FormFeedback>
              )}
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
  const DataDiriPasien = (
    <Card style={{ backgroundColor: '#f1f2f6' }}>
      <CardHeader className="card-header-snb ">
        <h4 className="card-title mb-0">Data Diri Pasien</h4>
      </CardHeader>
      <CardBody>
        <Row className="gy-2">
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="noidentitas"
                className="form-label"
              >
                NIK
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <Input
              id="nikPasien"
              name="nikPasien"
              type="text"
              value={validation.values.nikPasien}
              onChange={(e) => {
                validation.setFieldValue('nikPasien', e.target.value)
              }}
              invalid={validation.touched?.nikPasien &&
                !!validation.errors?.nikPasien}
            />
            {validation.touched?.nikPasien
              && !!validation.errors.nikPasien && (
                <FormFeedback type="invalid">
                  <div>{validation.errors.nikPasien}</div>
                </FormFeedback>
              )}
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="noidentitas"
                className="form-label"
              >
                Nama Pasien
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <Input
              id="namaPasien"
              name="namaPasien"
              type="text"
              value={validation.values.namaPasien}
              onChange={(e) => {
                validation.setFieldValue('namaPasien', e.target.value)
              }}
              invalid={validation.touched?.namaPasien &&
                !!validation.errors?.namaPasien}
            />
            {validation.touched?.namaPasien
              && !!validation.errors.namaPasien && (
                <FormFeedback type="invalid">
                  <div>{validation.errors.namaPasien}</div>
                </FormFeedback>
              )}
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="noidentitas"
                className="form-label"
              >
                Jenis Kelamin
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <CustomSelect
              id="jenisKelamin"
              name="jenisKelamin"
              options={[]}
              onChange={(e) => {
                validation.setFieldValue('jenisKelamin', e?.value || '')
              }}
              value={validation.values.jenisKelamin}
              className={`input row-header ${!!validation?.errors.jenisKelamin ? 'is-invalid' : ''
                }`}
            />
            {validation.touched.jenisKelamin &&
              !!validation.errors.jenisKelamin && (
                <FormFeedback type="invalid">
                  <div>{validation.errors.jenisKelamin}</div>
                </FormFeedback>
              )}
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="noidentitas"
                className="form-label"
              >
                Title Pasien
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <CustomSelect
              id="titlepasien"
              name="titlepasien"
              options={[]}
              onChange={(e) => {
                validation.setFieldValue('titlepasien', e?.value || '')
              }}
              value={validation.values.titlepasien}
              className={`input row-header ${!!validation?.errors.titlepasien ? 'is-invalid' : ''
                }`}
            />
            {validation.touched.titlepasien &&
              !!validation.errors.titlepasien && (
                <FormFeedback type="invalid">
                  <div>{validation.errors.titlepasien}</div>
                </FormFeedback>
              )}
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="noidentitas"
                className="form-label"
              >
                Tanggal Lahir
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <KontainerFlatpickr
              isError={validation.touched?.tglLahirPasien &&
                !!validation.errors?.tglLahirPasien}
              id="tglLahirPasien"
              options={{
                dateFormat: 'Y-m-d',
                defaultDate: 'today',
              }}
              value={validation.values.tglLahirPasien}
              onChange={([newDate]) => {
                validation.setFieldValue('tglLahirPasien', newDate.toISOString())
              }}
            />
            {validation.touched?.tglLahirPasien
              && !!validation.errors.tglLahirPasien && (
                <FormFeedback type="invalid">
                  <div>{validation.errors.tglLahirPasien}</div>
                </FormFeedback>
              )}
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="noidentitas"
                className="form-label"
              >
                Tempat Lahir
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <Input
              id="tempatLahir"
              name="tempatLahir"
              type="textarea"
              value={validation.values.tempatLahir}
              onChange={(e) => {
                validation.setFieldValue('tempatLahir', e.target.value)
              }}
              invalid={validation.touched?.tempatLahir &&
                !!validation.errors?.tempatLahir}
            />
            {validation.touched?.tempatLahir
              && !!validation.errors.tempatLahir && (
                <FormFeedback type="invalid">
                  <div>{validation.errors.tempatLahir}</div>
                </FormFeedback>
              )}
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="noidentitas"
                className="form-label"
              >
                Agama
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <Input
              id="agama"
              name="agama"
              type="textarea"
              value={validation.values.agama}
              onChange={(e) => {
                validation.setFieldValue('agama', e.target.value)
              }}
              invalid={validation.touched?.agama &&
                !!validation.errors?.agama}
            />
            {validation.touched?.agama
              && !!validation.errors.agama && (
                <FormFeedback type="invalid">
                  <div>{validation.errors.agama}</div>
                </FormFeedback>
              )}
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="noidentitas"
                className="form-label"
              >
                Gol. Darah
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <Input
              id="golDarah"
              name="golDarah"
              type="textarea"
              value={validation.values.golDarah}
              onChange={(e) => {
                validation.setFieldValue('golDarah', e.target.value)
              }}
              invalid={validation.touched?.golDarah &&
                !!validation.errors?.golDarah}
            />
            {validation.touched?.golDarah
              && !!validation.errors.golDarah && (
                <FormFeedback type="invalid">
                  <div>{validation.errors.golDarah}</div>
                </FormFeedback>
              )}
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="noidentitas"
                className="form-label"
              >
                Kebangsaan
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <Input
              id="kebangsaan"
              name="kebangsaan"
              type="text"
              value={validation.values.kebangsaan}
              onChange={(e) => {
                validation.setFieldValue('kebangsaan', e.target.value)
              }}
              invalid={validation.touched?.kebangsaan &&
                !!validation.errors?.kebangsaan}
            />
            {validation.touched?.kebangsaan
              && !!validation.errors.kebangsaan && (
                <FormFeedback type="invalid">
                  <div>{validation.errors.kebangsaan}</div>
                </FormFeedback>
              )}
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="noidentitas"
                className="form-label"
              >
                Suku
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <Input
              id="suku"
              name="suku"
              type="text"
              value={validation.values.suku}
              onChange={(e) => {
                validation.setFieldValue('suku', e.target.value)
              }}
              invalid={validation.touched?.suku &&
                !!validation.errors?.suku}
            />
            {validation.touched?.suku
              && !!validation.errors.suku && (
                <FormFeedback type="invalid">
                  <div>{validation.errors.suku}</div>
                </FormFeedback>
              )}
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
  const DataDiriPasien2 = (
    <Card style={{ backgroundColor: '#f1f2f6' }}>
      <CardHeader className="card-header-snb ">
        <h4 className="card-title mb-0">Data Diri Pasien</h4>
      </CardHeader>
      <CardBody>
        <Row className="gy-2">
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="noidentitas"
                className="form-label"
              >
                Alamat Sesuai KTP
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <Input
              id="alamatPasien"
              name="alamatPasien"
              type="textarea"
              value={validation.values.alamatPasien}
              onChange={(e) => {
                validation.setFieldValue('alamatPasien', e.target.value)
              }}
              invalid={validation.touched?.alamatPasien &&
                !!validation.errors?.alamatPasien}
            />
            {validation.touched?.alamatPasien
              && !!validation.errors.alamatPasien && (
                <FormFeedback type="invalid">
                  <div>{validation.errors.alamatPasien}</div>
                </FormFeedback>
              )}
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="noidentitas"
                className="form-label"
              >
                RT / RW
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <Row>
              <div className="row">
                <div className="col-sm">
                  <Input
                    id="rt"
                    name="rt"
                    type="input"
                    placeholder="RT"
                    onChange={(e) => {
                      rgxAllNumber.test(e.target.value) &&
                        validation.setFieldValue('rt', e.target.value)
                    }}
                    onBlur={validation.handleBlur}
                    value={validation.values.rt || ''}
                    invalid={
                      validation.touched.rt && validation.errors.rt ? true : false
                    }
                  />
                  {validation.touched.rt && validation.errors.rt ? (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.rt}</div>
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="col-sm">
                  <Input
                    id="rw"
                    name="rw"
                    type="input"
                    placeholder="RW"
                    onChange={(e) => {
                      rgxAllNumber.test(e.target.value) &&
                        validation.setFieldValue('rw', e.target.value)
                    }}
                    onBlur={validation.handleBlur}
                    value={validation.values.rw || ''}
                    invalid={
                      validation.touched.rw && validation.errors.rw ? true : false
                    }
                  />
                  {validation.touched.rw && validation.errors.rw ? (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.rw}</div>
                    </FormFeedback>
                  ) : null}
                </div>
              </div>
            </Row>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="desa"
                className="form-label"
              >
                Kelurahan / Desa
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <CustomSelect
                id="desa"
                name="desa"
                // options={dataDesa}
                value={validation.values.desa || ''}
                className={`input ${validation.errors.desa ? 'is-invalid' : ''
                  }`}
                // onChange={value => validation.setFieldValue('desa', value.value)}
                // onChange={handleChangeDesa}
                // onInputChange={handleDesa}
                isClearEmpty
              />
              {validation.touched.desa && validation.errors.desa ? (
                <FormFeedback type="invalid">
                  <div>{validation.errors.desa}</div>
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="kecamatan"
                className="form-label"
              >
                Kecamatan
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="kecamatan"
                name="kecamatan"
                type="input"
                placeholder="Kecamatan"
                value={validation.values.kecamatan || ''}
                disabled
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="kota"
                className="form-label"
              >
                Kota / Kabupaten
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="kota"
                name="kota"
                type="input"
                placeholder="kota"
                value={validation.values.kota || ''}
                disabled
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="pos"
                className="form-label"
              >
                Kode POS
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="pos"
                name="pos"
                type="input"
                placeholder="pos"
                value={validation.values.pos || ''}
                onChange={(e) => {
                  rgxAllNumber.test(e.target.value) &&
                    validation.setFieldValue('pos', e.target.value)
                }}
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="provinsi"
                className="form-label"
              >
                Provinsi
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <Input
                id="provinsi"
                name="provinsi"
                type="input"
                placeholder="provinsi"
                value={validation.values.provinsi || ''}
                disabled
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="negara"
                className="form-label"
              >
                Negara
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <div>
              <CustomSelect
                id="negara"
                name="negara"
                // options={dataNegara}
                value={validation.values.negara || null}
                className={`input ${validation.errors.negara ? 'is-invalid' : ''
                  }`}
                onChange={(value) => {
                  validation.setFieldValue('negara', value?.value || '')
                }}
                isClearEmpty
              />
              {validation.touched.negara && validation.errors.negara ? (
                <FormFeedback type="invalid">
                  <div>{validation.errors.negara}</div>
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Row className="gy-2">
            {/* <Col md={8}> */}
            <div className="form-check ms-2">
              <Input
                className="form-check-input"
                type="checkbox"
                checked={isSesuaiKtp}
                id="formCheck1"
                onChange={(e) => setisSesuaiKtp(e.target.checked)}
              />
              <Label
                className="form-check-label"
                htmlFor="formCheck1"
                style={{ color: 'black' }}
              >
                Sesuai KTP
              </Label>
            </div>
            {/* </Col> */}

            <Col md={4}>
              <div className="mt-2">
                <Label
                  style={{ color: 'black' }}
                  htmlFor="alamatdomisili"
                  className="form-label"
                >
                  Alamat Domisili
                </Label>
              </div>
            </Col>
            <Col md={8}>
              <div>
                <Input
                  id="alamatdomisili"
                  name="alamatdomisili"
                  type="textarea"
                  placeholder="Masukkan Alamat pasien"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.alamatdomisili || ''}
                  invalid={
                    validation.touched.alamatdomisili &&
                      validation.errors.alamatdomisili
                      ? true
                      : false
                  }
                  disabled={isSesuaiKtp}
                />
                {validation.touched.alamatdomisili &&
                  validation.errors.alamatdomisili ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.alamatdomisili}</div>
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col md={4}>
              <div className="mt-2">
                <Label
                  style={{ color: 'black' }}
                  htmlFor="rtrwdomisili"
                  className="form-label"
                >
                  RT / RW
                </Label>
              </div>
            </Col>
            <Col md={8}>
              <div className="row">
                <div className="col-sm">
                  <Input
                    id="rtdomisili"
                    name="rtdomisili"
                    type="input"
                    placeholder="RT"
                    onChange={(e) => {
                      rgxAllNumber.test(e.target.value) &&
                        validation.setFieldValue('rtdomisili', e.target.value)
                    }}
                    onBlur={validation.handleBlur}
                    value={validation.values.rtdomisili || ''}
                    invalid={
                      validation.touched.rtdomisili &&
                        validation.errors.rtdomisili
                        ? true
                        : false
                    }
                  />
                  {validation.touched.rtdomisili &&
                    validation.errors.rtdomisili ? (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.rtdomisili}</div>
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="col-sm">
                  <Input
                    id="rwdomisili"
                    name="rwdomisili"
                    type="input"
                    placeholder="RW"
                    onChange={(e) => {
                      rgxAllNumber.test(e.target.value) &&
                        validation.setFieldValue('rwdomisili', e.target.value)
                    }}
                    onBlur={validation.handleBlur}
                    value={validation.values.rwdomisili || ''}
                    invalid={
                      validation.touched.rwdomisili &&
                        validation.errors.rwdomisili
                        ? true
                        : false
                    }
                  />
                  {validation.touched.rwdomisili &&
                    validation.errors.rwdomisili ? (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.rwdomisili}</div>
                    </FormFeedback>
                  ) : null}
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="mt-2">
                <Label
                  style={{ color: 'black' }}
                  htmlFor="desa"
                  className="form-label"
                >
                  Kelurahan / Desa
                </Label>
              </div>
            </Col>
            <Col md={8}>
              <div>
                <CustomSelect
                  id="desaDomisili"
                  name="desaDomisili"
                  // options={dataDesa}
                  value={validation.values.desaDomisili || ''}
                  className={`input ${validation.errors.desaDomisili ? 'is-invalid' : ''
                    }`}
                // onChange={value => validation.setFieldValue('desa', value.value)}
                // onChange={handleChangeDesaDomisili}
                // onInputChange={handleDesa}
                />
                {validation.touched.desaDomisili &&
                  validation.errors.desaDomisili ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.desaDomisili}</div>
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col md={4}>
              <div className="mt-2">
                <Label
                  style={{ color: 'black' }}
                  htmlFor="kecamatandomisili"
                  className="form-label"
                >
                  Kecamatan
                </Label>
              </div>
            </Col>
            <Col md={8}>
              <div>
                <Input
                  id="kecamatanDomisili"
                  name="kecamatanDomisili"
                  type="input"
                  placeholder="kecamatanDomisili"
                  value={validation.values.kecamatanDomisili || ''}
                  disabled
                />
              </div>
            </Col>
            <Col md={4}>
              <div className="mt-2">
                <Label
                  style={{ color: 'black' }}
                  htmlFor="kotadomisili"
                  className="form-label"
                >
                  Kota / Kabupaten
                </Label>
              </div>
            </Col>
            <Col md={8}>
              <div>
                <Input
                  id="kotaDomisili"
                  name="kotaDomisili"
                  type="input"
                  placeholder="kotaDomisili"
                  value={validation.values.kotaDomisili || ''}
                  disabled
                />
              </div>
            </Col>
            <Col md={4}>
              <div className="mt-2">
                <Label
                  style={{ color: 'black' }}
                  htmlFor="posdomisili"
                  className="form-label"
                >
                  Kode POS
                </Label>
              </div>
            </Col>
            <Col md={8}>
              <div>
                <Input
                  id="posDomisili"
                  name="posDomisili"
                  type="input"
                  placeholder="posDomisili"
                  value={validation.values.posDomisili || ''}
                  onChange={(e) => {
                    rgxAllNumber.test(e.target.value) &&
                      validation.setFieldValue('posDomisili', e.target.value)
                  }}
                />
              </div>
            </Col>
            <Col md={4}>
              <div className="mt-2">
                <Label
                  style={{ color: 'black' }}
                  htmlFor="provinsidomisili"
                  className="form-label"
                >
                  Provinsi
                </Label>
              </div>
            </Col>
            <Col md={8}>
              <div>
                <Input
                  id="provinsiDomisili"
                  name="provinsiDomisili"
                  type="input"
                  placeholder="provinsiDomisili"
                  value={validation.values.provinsiDomisili || ''}
                  disabled
                />
              </div>
            </Col>
            <Col md={4}>
              <div className="mt-2">
                <Label
                  style={{ color: 'black' }}
                  htmlFor="negaradomisili"
                  className="form-label"
                >
                  Negara
                </Label>
              </div>
            </Col>
            <Col md={8}>
              <div>
                <CustomSelect
                  id="negaraDomisili"
                  name="negaraDomisili"
                  // options={dataNegara}
                  value={validation.values.negaraDomisili || ''}
                  className={`input ${validation.errors.negaraDomisili ? 'is-invalid' : ''
                    }`}
                  onChange={(value) =>
                    validation.setFieldValue('negaraDomisili', value?.value || '')
                  }
                />
                {validation.touched.negaraDomisili &&
                  validation.errors.negaraDomisili ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.negaraDomisili}</div>
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
        </Row>
      </CardBody>
    </Card>
  )
  const InformasiTambahan = (
    <Card style={{ backgroundColor: '#f1f2f6' }}>
      <CardHeader className="card-header-snb ">
        <h4 className="card-title mb-0">Informasi Tambahan</h4>
      </CardHeader>
      <CardBody>
        <Row className="gy-2">
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="noidentitas"
                className="form-label"
              >
                No BPJS
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <Input
              id="nobpjs"
              name="nobpjs"
              type="text"
              value={validation.values.nobpjs}
              onChange={(e) => {
                validation.setFieldValue('nobpjs', e.target.value)
              }}
              invalid={validation.touched?.nobpjs &&
                !!validation.errors?.nobpjs}
            />
            {validation.touched?.nobpjs
              && !!validation.errors.nobpjs && (
                <FormFeedback type="invalid">
                  <div>{validation.errors.nobpjs}</div>
                </FormFeedback>
              )}
          </Col>
          <Col md={4}>
            <div className="mt-2">
              <Label
                style={{ color: 'black' }}
                htmlFor="noidentitas"
                className="form-label"
              >
                No. Hp
              </Label>
            </div>
          </Col>
          <Col md={8}>
            <Input
              id="nohp"
              name="nohp"
              type="text"
              value={validation.values.nohp}
              onChange={(e) => {
                validation.setFieldValue('nohp', e.target.value)
              }}
              invalid={validation.touched?.nohp &&
                !!validation.errors?.nohp}
            />
            {validation.touched?.nohp
              && !!validation.errors.nohp && (
                <FormFeedback type="invalid">
                  <div>{validation.errors.nohp}</div>
                </FormFeedback>
              )}
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb
          title="Registrasi Pasien Baru Bayi"
          pageTitle="Registrasi Pasien Baru Bayi"
        />
        <Row>
          <Col xl={4}>
            {DataDiriIbu}
            {DataDiriPasien}
          </Col>
          <Col xl={4}>
            {DataDiriPasien2}
          </Col>
          <Col xl={4}>
            {InformasiTambahan}
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default withRouter(PasienBaruBayi)