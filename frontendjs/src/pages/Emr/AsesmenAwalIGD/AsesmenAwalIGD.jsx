import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { onChangeStrNbr, useDate } from '../../../utils/format'
import { Row, FormFeedback, Input, Col, Label, Button } from 'reactstrap'
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
      pemeriksaanfisik: [
        {
          value: 1,
          label: 'Kepala',
          normal: true,
          abnormalteks: '',
        },
        {
          value: 2,
          label: 'Mata',
          normal: true,
          abnormalteks: '',
        },
        {
          value: 3,
          label: 'Mulut',
          normal: true,
          abnormalteks: '',
        },
        {
          value: 4,
          label: 'Leher',
          normal: true,
          abnormalteks: '',
        },
        {
          value: 5,
          label: 'Dada',
          normal: true,
          abnormalteks: '',
        },
        {
          value: 6,
          label: 'Perut',
          normal: true,
          abnormalteks: '',
        },
        {
          value: 7,
          label: 'Jari Kaki',
          normal: true,
          abnormalteks: '',
        },
      ],
    },
  })

  useEffect(() => {
    const setFF = vStatusNyeri.setFieldValue
    setFF('datepengkajian', dateISOString)
  }, [dateISOString, vStatusNyeri.setFieldValue])
  return (
    <div className="p-3">
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
      <Row>
        <Col>
          <TandaVital isHistory={false} />
        </Col>
      </Row>
      <Row>
        <Label className="mb-3" style={{ color: '#000000' }}>
          4. Pemeriksaan Fisik
        </Label>
      </Row>
      <Row>
        <Col lg={12}>
          <PemeriksaanFisik vStatusNyeri={vStatusNyeri} />
        </Col>
      </Row>
    </div>
  )
}

const PemeriksaanFisik = ({ vStatusNyeri }) => {
  const handleChangePemeriksaan = (field, index, newVal) => {
    const newPemeriksaanFisik = [...vStatusNyeri.values.pemeriksaanfisik]
    const newPemeriksaanVal = { ...newPemeriksaanFisik[index] }
    newPemeriksaanVal[field] = newVal
    if (field === 'normal' && newVal === true) {
      newPemeriksaanVal.abnormalteks = ''
    }
    newPemeriksaanFisik[index] = newPemeriksaanVal
    vStatusNyeri.setFieldValue('pemeriksaanfisik', newPemeriksaanFisik)
  }
  const handleTambahPemeriksaan = () => {
    const newPemeriksaanFisik = [
      ...vStatusNyeri.values.pemeriksaanfisik,
      { ...initBadan },
    ]
    vStatusNyeri.setFieldValue('pemeriksaanfisik', newPemeriksaanFisik)
  }
  const handleHapus = (indexHapus) => {
    const newPemeriksaanFisik = [...vStatusNyeri.values.pemeriksaanfisik]
    newPemeriksaanFisik.splice(indexHapus, 1)
    vStatusNyeri.setFieldValue('pemeriksaanfisik', newPemeriksaanFisik)
  }
  return (
    <>
      {vStatusNyeri.values.pemeriksaanfisik.map((pemeriksaan, index) => (
        <Row className="mb-3 ms-2" key={index}>
          <Col lg={3}>
            <CustomSelect
              id={`pemeriksaanfisik[${index}].value`}
              name={`pemeriksaanfisik[${index}].value`}
              options={opsi}
              onChange={(e) => {
                handleChangePemeriksaan('value', index, e?.value || '')
              }}
              value={vStatusNyeri.values.pemeriksaanfisik[index].value}
              className={`input row-header ${
                !!vStatusNyeri?.errors?.pemeriksaanfisik?.[index]?.value
                  ? 'is-invalid'
                  : ''
              }`}
              isClearEmpty
            />
            {vStatusNyeri.touched?.pemeriksaanfisik?.[index]?.value &&
              !!vStatusNyeri.errors?.pemeriksaanfisik?.[index]?.value && (
                <FormFeedback type="invalid">
                  <div>
                    {vStatusNyeri.errors?.pemeriksaanfisik?.[index]?.value}
                  </div>
                </FormFeedback>
              )}
          </Col>
          <Col lg={3}>
            <CustomSelect
              id={`pemeriksaanfisik[${index}].normal`}
              name={`pemeriksaanfisik[${index}].normal`}
              options={opsiNormal}
              onChange={(e) => {
                handleChangePemeriksaan('normal', index, e?.value)
              }}
              value={vStatusNyeri.values.pemeriksaanfisik[index].normal}
              className={`input row-header ${
                !!vStatusNyeri?.errors?.pemeriksaanfisik?.[index]?.normal
                  ? 'is-invalid'
                  : ''
              }`}
              isClearEmpty
            />
            {vStatusNyeri.touched?.pemeriksaanfisik?.[index]?.normal &&
              !!vStatusNyeri.errors?.pemeriksaanfisik?.[index]?.normal && (
                <FormFeedback type="invalid">
                  <div>
                    {vStatusNyeri.errors?.pemeriksaanfisik?.[index]?.normal}
                  </div>
                </FormFeedback>
              )}
          </Col>
          <Col lg={4}>
            <Input
              id={`pemeriksaanfisik?.[${index}]?.abnormalteks`}
              name={`pemeriksaanfisik?.[${index}]?.abnormalteks`}
              type="text"
              value={
                vStatusNyeri.values.pemeriksaanfisik?.[index]?.abnormalteks
              }
              onChange={(e) => {
                handleChangePemeriksaan('abnormalteks', index, e.target.value)
              }}
              disabled={pemeriksaan.normal}
              invalid={
                vStatusNyeri.touched?.pemeriksaanfisik?.[index]?.abnormalteks &&
                !!vStatusNyeri.errors?.pemeriksaanfisik?.[index]?.abnormalteks
              }
            />
            {vStatusNyeri.touched?.pemeriksaanfisik?.[index]?.abnormalteks &&
              !!vStatusNyeri.errors.pemeriksaanfisik?.[index]?.abnormalteks && (
                <FormFeedback type="invalid">
                  <div>
                    {
                      vStatusNyeri.errors.pemeriksaanfisik?.[index]
                        ?.abnormalteks
                    }
                  </div>
                </FormFeedback>
              )}
          </Col>
          {index >= 6 && (
            <Col lg="auto">
              <Button color="danger" onClick={() => handleHapus(index)}>
                -
              </Button>
            </Col>
          )}
        </Row>
      ))}
      <Row className="ms-2">
        <Col lg="auto">
          <Button color="info" onClick={handleTambahPemeriksaan}>
            Tambah Pemeriksaan
          </Button>
        </Col>
      </Row>
    </>
  )
}

const initBadan = {
  value: '',
  label: '',
  normal: true,
  abnormalteks: '',
}

const opsi = [
  {
    value: 1,
    label: 'Kepala',
  },
  {
    value: 2,
    label: 'Mata',
  },
  {
    value: 3,
    label: 'Mulut',
  },
  {
    value: 4,
    label: 'Leher',
  },
  {
    value: 5,
    label: 'Dada',
  },
  {
    value: 6,
    label: 'Perut',
  },
  {
    value: 7,
    label: 'Jari Kaki',
  },
]

const opsiNormal = [
  {
    value: true,
    label: 'normal',
  },
  {
    value: false,
    label: 'abnormal',
  },
]

export default AsesmenAwalIGD
