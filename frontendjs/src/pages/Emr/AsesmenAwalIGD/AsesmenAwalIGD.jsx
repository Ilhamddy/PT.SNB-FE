import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { onChangeStrNbr, useDate } from '../../../utils/format'
import { Row, FormFeedback, Input, Col, Label } from 'reactstrap'
import ColLabelInput from '../../../Components/ColLabelInput/ColLabelInput'
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr'
import CustomSelect from '../../Select/Select'
import SkalaNyeri from '../../../Components/SkalaNyeri/SkalaNyeri'
import TandaVital from '../TandaVital/TandaVital'

const AsesmenAwalIGD = () => {
  const { dateISOString } = useDate()
  const vStatusNyeri = useFormik({
    initialValues: {
      datepengkajian: dateISOString,
      statusnyeri: '',
      skalanyeri: '',
      lokasi: '',
      penyebab: '',
      durasi: '',
      satuandurasi: '',
      frekuensinyeri: '',
      morsefallscale: {
        riwayatjatuh3bulan: '',
        memilikilebihdari1penyakit: '',
        totalscore: '',
      },
    },
  })
  useEffect(() => {
    const setFF = vStatusNyeri.setFieldValue
    setFF('datepengkajian', dateISOString)
  }, [dateISOString, vStatusNyeri.setFieldValue])
  return (
    <React.Fragment>
      <Row className="mb-4">
        <ColLabelInput lg={4} label={'Tanggal & jam Pengkajian'}>
          <KontainerFlatpickr
            isError={
              vStatusNyeri.touched?.datepengkajian &&
              !!vStatusNyeri.errors?.datepengkajian
            }
            id="datepengkajian"
            options={{
              dateFormat: 'Y-m-d',
              defaultDate: 'today',
            }}
            value={vStatusNyeri.values.datepengkajian}
            disabled
          />
          {vStatusNyeri.touched?.datepengkajian &&
            !!vStatusNyeri.errors.datepengkajian && (
              <FormFeedback type="invalid">
                <div>{vStatusNyeri.errors.datepengkajian}</div>
              </FormFeedback>
            )}
        </ColLabelInput>
      </Row>
      <Label className="mb-3" style={{ color: '#000000' }}>
        1. Status Nyeri
      </Label>
      <Row className="ms-2">
        <Col>
          <Row className="mb-2">
            <ColLabelInput lg={4} label={'Mengalami Nyeri'}>
              <CustomSelect
                id="statusnyeri"
                name="statusnyeri"
                options={[
                  {
                    label: 'Ya',
                    value: true,
                  },
                  {
                    label: 'Tidak',
                    value: false,
                  },
                ]}
                onChange={(e) => {
                  vStatusNyeri.setFieldValue('statusnyeri', e?.value || '')
                }}
                value={vStatusNyeri.values.statusnyeri}
                className={`input row-header ${
                  !!vStatusNyeri?.errors.statusnyeri ? 'is-invalid' : ''
                }`}
              />
              {vStatusNyeri.touched.statusnyeri &&
                !!vStatusNyeri.errors.statusnyeri && (
                  <FormFeedback type="invalid">
                    <div>{vStatusNyeri.errors.statusnyeri}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
          </Row>
          <Row className="mb-2">
            <ColLabelInput lg={12} label={'Skala Nyeri'}>
              <SkalaNyeri
                quantity={vStatusNyeri.values.skalanyeri}
                onQuantityChange={(n) => {
                  vStatusNyeri.setFieldValue('skalanyeri', n)
                }}
              />
            </ColLabelInput>
          </Row>
          <Row className="mb-2">
            <ColLabelInput sm={4} label={'Skala Nyeri'}>
              <CustomSelect
                id="lokasi"
                name="lokasi"
                options={[]}
                onChange={(e) => {
                  vStatusNyeri.setFieldValue('lokasi', e?.value || '')
                }}
                value={vStatusNyeri.values.lokasi}
                className={`input row-header ${
                  !!vStatusNyeri?.errors.lokasi ? 'is-invalid' : ''
                }`}
              />
              {vStatusNyeri.touched.lokasi && !!vStatusNyeri.errors.lokasi && (
                <FormFeedback type="invalid">
                  <div>{vStatusNyeri.errors.lokasi}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
          </Row>
          <Row className="mb-2">
            <ColLabelInput lg={4} label={'Penyebab'}>
              <Input
                id="penyebab"
                name="penyebab"
                type="text"
                value={vStatusNyeri.values.penyebab}
                onChange={(e) => {
                  vStatusNyeri.setFieldValue('penyebab', e.target.value)
                }}
                invalid={
                  vStatusNyeri.touched?.penyebab &&
                  !!vStatusNyeri.errors?.penyebab
                }
              />
              {vStatusNyeri.touched?.penyebab &&
                !!vStatusNyeri.errors.penyebab && (
                  <FormFeedback type="invalid">
                    <div>{vStatusNyeri.errors.penyebab}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
          </Row>
          <Row className="mb-2">
            <ColLabelInput md={2} label={'Durasi'}>
              <Input
                id="durasi"
                name="durasi"
                type="text"
                value={vStatusNyeri.values.durasi}
                onChange={(e) => {
                  const newVal = onChangeStrNbr(
                    e.target.value,
                    vStatusNyeri.values.durasi
                  )
                  vStatusNyeri.setFieldValue('durasi', newVal)
                }}
                invalid={
                  vStatusNyeri.touched?.durasi && !!vStatusNyeri.errors?.durasi
                }
              />
              {vStatusNyeri.touched?.durasi && !!vStatusNyeri.errors.durasi && (
                <FormFeedback type="invalid">
                  <div>{vStatusNyeri.errors.durasi}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            <ColLabelInput md={2}>
              <CustomSelect
                id="satuandurasi"
                name="satuandurasi"
                options={[]}
                onChange={(e) => {
                  vStatusNyeri.setFieldValue('satuandurasi', e?.value || '')
                }}
                value={vStatusNyeri.values.satuandurasi}
                className={`input row-header ${
                  !!vStatusNyeri?.errors.satuandurasi ? 'is-invalid' : ''
                }`}
              />
              {vStatusNyeri.touched.satuandurasi &&
                !!vStatusNyeri.errors.satuandurasi && (
                  <FormFeedback type="invalid">
                    <div>{vStatusNyeri.errors.satuandurasi}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
          </Row>
        </Col>
      </Row>
      <Row>
        <Label className="mb-3" style={{ color: '#000000' }}>
          2. Kajian Resiko Jatuh
        </Label>
      </Row>
      <Row>
        <Label className="mb-3" style={{ color: '#000000' }}>
          3. Pemeriksaan Umum
        </Label>
      </Row>
      <Row className="ms-1">
        <Col>
          <TandaVital isHistory={false} />
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default AsesmenAwalIGD
