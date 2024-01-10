import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { onChangeStrNbr, useDate } from '../../../utils/format'
import { Row, FormFeedback, Input, Col, Label, Button } from 'reactstrap'
import ColLabelInput from '../../../Components/ColLabelInput/ColLabelInput'
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr'
import CustomSelect from '../../Select/Select'
import SkalaNyeri from '../../../Components/SkalaNyeri/SkalaNyeri'
import TandaVital, { initTTV, useValidationTTV } from '../TandaVital/TandaVital'
import { useParams, useSearchParams } from 'react-router-dom'
import './AsesmenAwalIGD.scss'
import { RadioButton } from '../../../Components/RadioButtons/RadioButtons'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { getComboAsesmenAwalIGD } from '../../../store/actions'
import {
  getAsesmenAwalIGD,
  upsertAsesmenAwalIGD,
} from '../../../store/emr/emrSlice'

const AsesmenAwalIGD = () => {
  const { dateISOString } = useDate()
  const { norecdp, norecap } = useParams()
  const dispatch = useDispatch()
  const badanInit = useSelector(
    (state) => state.Emr.getComboAsesmenAwalIGD.data?.badanInit || null
  )
  const opsiBadan = useSelector(
    (state) => state.Emr.getComboAsesmenAwalIGD.data?.badan || null
  )
  const opsiSatuan = useSelector(
    (state) => state.Emr.getComboAsesmenAwalIGD.data?.satuanWaktu || null
  )
  const dataPasien = useSelector(
    (state) => state.emrSlice.getAsesmenAwalIGD.data?.asesmenAwal || null
  )
  const ttvAwal = useSelector(
    (state) => state.emrSlice.getAsesmenAwalIGD.data?.ttvawal || null
  )

  const [searchParams, setSearchParams] = useSearchParams()
  const norecasesmenawaligd = searchParams.get('norecasesmenawaligd')
  const vTTV = useValidationTTV(
    {
      onSubmit: (values) => {},
    },
    norecap,
    norecdp
  )
  const vStatusNyeri = useFormik({
    initialValues: {
      norecap: '',
      norecdp: '',
      norecasesmenawaligd: '',
      norecttv: '',
      datepengkajian: dateISOString,
      statusnyeri: '',
      skalanyeri: 0,
      lokasi: '',
      ihs_idlokasi: '',
      penyebab: '',
      durasi: '',
      satuandurasi: '',
      frekuensinyeri: '',
      ttvval: initTTV(norecap, norecdp),
      tgllahir: '',
      umur: 0,
      resikojatuh: resikoJatuhInitial,
      resikojatuhhds: resikoJatuhHDSInitial,
      pemeriksaanfisik: [],
    },
    validationSchema: Yup.object({
      datepengkajian: Yup.string().required('Tanggal pengkajian harus diisi'),
      statusnyeri: Yup.string().required('status nyeri harus diisi'),
      skalanyeri: Yup.string().when('statusnyeri', {
        is: (val) => {
          return val === true
        },
        then: () => Yup.string().required('Skala nyeri harus diisi'),
      }),
      lokasi: Yup.string().when('statusnyeri', {
        is: (val) => val === true,
        then: () => Yup.string().required('Lokasi nyeri harus diisi'),
      }),
      penyebab: Yup.string().when('statusnyeri', {
        is: (val) => val === true,
        then: () => Yup.string().required('Penyebab nyeri harus diisi'),
      }),
      durasi: Yup.string().when('statusnyeri', {
        is: (val) => val === true,
        then: () => Yup.string().required('Durasi nyeri harus diisi'),
      }),
      satuandurasi: Yup.string().when('statusnyeri', {
        is: (val) => val === true,
        then: () => Yup.string().required('Satuan durasi harus diisi'),
      }),
      frekuensinyeri: Yup.string().when('statusnyeri', {
        is: (val) => val === true,
        then: () => Yup.string().required('Frekuensi nyeri harus diisi'),
      }),
      resikojatuh: resikoJatuhValidation,
      pemeriksaanfisik: pemeriksaanFisikValidation,
    }),
    onSubmit: (values) => {
      vTTV.handleSubmit()
      values.ttvval = vTTV.values
      dispatch(upsertAsesmenAwalIGD(values, () => {}))
    },
  })

  const handleChangeJawabanResikoJatuh = (key, val) => {
    let newValueResiko = {
      ...vStatusNyeri.values.resikojatuh,
    }
    newValueResiko[key] = val

    const setFF = vStatusNyeri.setFieldValue
    const iRiwayat = newValueResiko.riwayatjatuh
    const iDiag = newValueResiko.diagnosissekunder
    const iAlat = newValueResiko.alatbantuberjalan
    const iInfus = newValueResiko.infus
    const iKondisi = newValueResiko.kondisi
    const iStatus = newValueResiko.statusmental

    const checkSkor = (iPertanyaan, iJawaban) =>
      iJawaban !== '' ? resikoJatuh[iPertanyaan].jawaban[iJawaban].skor : 0

    const checkSkorSub = (iPertanyaan, iSubJawaban) =>
      iSubJawaban !== ''
        ? resikoJatuh[iPertanyaan].subjawaban[iSubJawaban].skor
        : 0

    const skorRiwayat = checkSkor(0, iRiwayat)
    const skorDiagnosis = checkSkor(1, iDiag)
    const skorAlat = checkSkorSub(2, iAlat)
    const skorInfus = checkSkor(3, iInfus)
    const skorKondisi = checkSkorSub(4, iKondisi)
    const skorMental = checkSkorSub(5, iStatus)

    const skor =
      skorRiwayat +
      skorDiagnosis +
      skorAlat +
      skorInfus +
      skorKondisi +
      skorMental
    newValueResiko.skor = skor
    setFF('resikojatuh', newValueResiko)
  }

  const handleChangeJawabanHDS = (key, val) => {
    let newValueHDS = {
      ...vStatusNyeri.values.resikojatuhhds,
    }
    newValueHDS[key] = val

    const setFF = vStatusNyeri.setFieldValue
    const iUmur = newValueHDS.umur
    const iJenisKelamin = newValueHDS.jeniskelamin
    const iDiagnosa = newValueHDS.diagnosa
    const iGangguanKog = newValueHDS.gangguankognitif
    const iFaktorLingkungan = newValueHDS.faktorlingkungan
    const iPembedahan = newValueHDS.pembedahan
    const iMedikaMentosa = newValueHDS.medikamentosa

    const checkSkorSub = (iPertanyaan, iSubJawaban) =>
      iSubJawaban !== ''
        ? resikoJatuhHDS[iPertanyaan].subjawaban[iSubJawaban].skor
        : 0

    const skorUmur = checkSkorSub(0, iUmur)
    const skorJenisKelamin = checkSkorSub(1, iJenisKelamin)
    const skorDiagnosa = checkSkorSub(2, iDiagnosa)
    const skorGangguanKog = checkSkorSub(3, iGangguanKog)
    const skorFaktorLingkungan = checkSkorSub(4, iFaktorLingkungan)
    const skorPembedahan = checkSkorSub(5, iPembedahan)
    const skorMedikaMentosa = checkSkorSub(6, iMedikaMentosa)

    const skor =
      skorUmur +
      skorJenisKelamin +
      skorDiagnosa +
      skorGangguanKog +
      skorFaktorLingkungan +
      skorPembedahan +
      skorMedikaMentosa
    newValueHDS.skor = skor
    setFF('resikojatuhhds', newValueHDS)
  }

  useEffect(() => {
    dispatch(getComboAsesmenAwalIGD({}))
  }, [dispatch])

  useEffect(() => {
    const setFF = vStatusNyeri.setFieldValue
    setFF('datepengkajian', dateISOString)
  }, [dateISOString, vStatusNyeri.setFieldValue])

  useEffect(() => {
    const setFF = vStatusNyeri.setFieldValue
    setFF('norecap', norecap || '')
    setFF('norecdp', norecdp || '')
    setFF('norecasesmenawaligd', norecasesmenawaligd || '')
    dispatch(getAsesmenAwalIGD({ norecap: norecap }))
  }, [
    norecap,
    norecdp,
    norecasesmenawaligd,
    vStatusNyeri.setFieldValue,
    dispatch,
  ])

  useEffect(() => {
    // handle initial data from api vStatusNyeri
    const setV = vStatusNyeri.setValues
    if (dataPasien) {
      const newResikoJatuh =
        dataPasien.umur > 17
          ? {
              ...vStatusNyeri.initialValues.resikojatuh,
              ...dataPasien.resikojatuh,
            }
          : {
              ...vStatusNyeri.initialValues.resikojatuh,
            }
      const newResikoHDS =
        dataPasien.umur <= 17
          ? {
              ...vStatusNyeri.initialValues.resikojatuhhds,
              ...dataPasien.resikojatuhhds,
            }
          : {
              ...vStatusNyeri.initialValues.resikojatuhhds,
            }
      setV({
        ...vStatusNyeri.initialValues,
        ...dataPasien,
        resikojatuh: newResikoJatuh,
        resikojatuhhds: newResikoHDS,
        pemeriksaanfisik: badanInit || [],
      })
    } else {
      setV({
        ...vStatusNyeri.initialValues,
        pemeriksaanfisik: badanInit || [],
      })
    }
  }, [
    dataPasien,
    badanInit,
    vStatusNyeri.resetForm,
    vStatusNyeri.initialValues,
    vStatusNyeri.setValues,
  ])

  useEffect(() => {
    // handle initial data from api for vStatusNyeri
    const setV = vStatusNyeri.setValues
    if (dataPasien) {
      const newResikoJatuh =
        dataPasien.umur > 17
          ? {
              ...vStatusNyeri.initialValues.resikojatuh,
              ...dataPasien.resikojatuh,
            }
          : {
              ...vStatusNyeri.initialValues.resikojatuh,
            }
      const newResikoHDS =
        dataPasien.umur <= 17
          ? {
              ...vStatusNyeri.initialValues.resikojatuhhds,
              ...dataPasien.resikojatuhhds,
            }
          : {
              ...vStatusNyeri.initialValues.resikojatuhhds,
            }
      setV({
        ...vStatusNyeri.initialValues,
        ...dataPasien,
        resikojatuh: newResikoJatuh,
        resikojatuhhds: newResikoHDS,
        pemeriksaanfisik: badanInit || [],
      })
    } else {
      setV({
        ...vStatusNyeri.initialValues,
        pemeriksaanfisik: badanInit || [],
      })
    }
  }, [
    dataPasien,
    badanInit,
    vStatusNyeri.resetForm,
    vStatusNyeri.initialValues,
    vStatusNyeri.setValues,
  ])

  useEffect(() => {
    // handle initial data from api for vTTV
    const setV = vTTV.setValues
    const resetF = vTTV.resetForm
    if (ttvAwal) {
      setV({
        ...vTTV.initialValues,
        ...ttvAwal,
      })
    } else {
      resetF()
    }
  }, [ttvAwal, vTTV.initialValues, vTTV.resetForm, vTTV.setValues])

  const MapResikoJatuh = ({
    arPertanyaan,
    valueResiko,
    handleChangeJawaban,
  }) => (
    <>
      {arPertanyaan.map((pertanyaan, index) => {
        const valueJawaban = valueResiko[pertanyaan.key]
        const checkedFirst = valueJawaban === 0
        return (
          <React.Fragment key={index}>
            <tr className={`row-gen`} key={index}>
              <td>{index + 1}</td>
              <td>{pertanyaan.pertanyaan}</td>
              <td>
                {pertanyaan.jawaban[0] && (
                  <RadioButton
                    dataValue={0}
                    checked={checkedFirst}
                    onClick={() => {
                      handleChangeJawaban(pertanyaan.key, 0)
                    }}
                    label={pertanyaan.jawaban[0]?.jawaban || ''}
                    index={0}
                    radioname="jawaban"
                  />
                )}
              </td>
              <td>{pertanyaan.jawaban[0]?.skor}</td>
            </tr>
            {pertanyaan.jawaban.map((jawaban, indexJawab) =>
              indexJawab === 0 ? (
                <></>
              ) : (
                <React.Fragment key={indexJawab}>
                  <tr key={indexJawab} className="row-jaw">
                    <td></td>
                    <td></td>
                    <td>
                      <RadioButton
                        dataValue={indexJawab}
                        onClick={() =>
                          handleChangeJawaban(pertanyaan.key, indexJawab)
                        }
                        label={jawaban.jawaban}
                        index={indexJawab}
                        radioname="jawaban"
                        checked={valueJawaban === indexJawab}
                      />
                    </td>
                    <td>{jawaban.skor}</td>
                  </tr>
                </React.Fragment>
              )
            )}
            {pertanyaan.subjawaban.map((subjawaban, indexSubjawab) => (
              <React.Fragment key={indexSubjawab}>
                <tr key={indexSubjawab} className="row-jaw">
                  <td></td>
                  <td>{subjawaban.pertanyaan}</td>
                  <td>
                    {
                      <RadioButton
                        index={indexSubjawab}
                        radioname="jawaban"
                        checked={indexSubjawab === valueJawaban}
                        onClick={() =>
                          handleChangeJawaban(pertanyaan.key, indexSubjawab)
                        }
                      />
                    }
                  </td>
                  <td>{subjawaban.skor}</td>
                </tr>
              </React.Fragment>
            ))}
          </React.Fragment>
        )
      })}
    </>
  )

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
                  vStatusNyeri.setFieldValue('statusnyeri', e?.value ?? false)
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
          {vStatusNyeri.values.statusnyeri && (
            <>
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
                <ColLabelInput sm={4} label={'Lokasi'}>
                  <CustomSelect
                    id="lokasi"
                    name="lokasi"
                    options={opsiBadan || []}
                    onChange={(e) => {
                      vStatusNyeri.setFieldValue('lokasi', e?.value || '')
                      vStatusNyeri.setFieldValue('ihs_id', e?.ihs_id || '')
                    }}
                    value={vStatusNyeri.values.lokasi}
                    className={`input row-header ${
                      !!vStatusNyeri?.errors.lokasi ? 'is-invalid' : ''
                    }`}
                  />
                  {vStatusNyeri.touched.lokasi &&
                    !!vStatusNyeri.errors.lokasi && (
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
                      vStatusNyeri.touched?.durasi &&
                      !!vStatusNyeri.errors?.durasi
                    }
                  />
                  {vStatusNyeri.touched?.durasi &&
                    !!vStatusNyeri.errors.durasi && (
                      <FormFeedback type="invalid">
                        <div>{vStatusNyeri.errors.durasi}</div>
                      </FormFeedback>
                    )}
                </ColLabelInput>
                <ColLabelInput md={2}>
                  <CustomSelect
                    id="satuandurasi"
                    name="satuandurasi"
                    options={opsiSatuan}
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
              <Row className="mb-3">
                <ColLabelInput lg={4} label={'Frekuensi'}>
                  <Input
                    id="frekuensinyeri"
                    name="frekuensinyeri"
                    type="text"
                    value={vStatusNyeri.values.frekuensinyeri}
                    onChange={(e) => {
                      vStatusNyeri.setFieldValue(
                        'frekuensinyeri',
                        e.target.value
                      )
                    }}
                    invalid={
                      vStatusNyeri.touched?.frekuensinyeri &&
                      !!vStatusNyeri.errors?.frekuensinyeri
                    }
                  />
                  {vStatusNyeri.touched?.frekuensinyeri &&
                    !!vStatusNyeri.errors.frekuensinyeri && (
                      <FormFeedback type="invalid">
                        <div>{vStatusNyeri.errors.frekuensinyeri}</div>
                      </FormFeedback>
                    )}
                </ColLabelInput>
              </Row>
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Label className="mb-3" style={{ color: '#000000' }}>
          2. Kajian Resiko Jatuh
        </Label>
      </Row>
      <Row>
        <Col>
          <table className="table-asesmen-awal-igd mb-3">
            <tbody>
              <tr className="row-awal">
                <td className="col-n">No</td>
                <td className="col-p">Parameter</td>
                <td className="col-j">Jawaban</td>
                <td className="col-s">Skor</td>
              </tr>
              {(vStatusNyeri.values?.umur || 0) > 17 ? (
                <MapResikoJatuh
                  valueResiko={vStatusNyeri.values.resikojatuh}
                  arPertanyaan={resikoJatuh}
                  handleChangeJawaban={handleChangeJawabanResikoJatuh}
                />
              ) : (
                <MapResikoJatuh
                  valueResiko={vStatusNyeri.values.resikojatuhhds}
                  arPertanyaan={resikoJatuhHDS}
                  handleChangeJawaban={handleChangeJawabanHDS}
                />
              )}

              <tr className="row-awal">
                <td className></td>
                <td className>Skor total</td>
                <td className></td>
                <td className>
                  {(vStatusNyeri.values?.umur || 0) < 17
                    ? vStatusNyeri.values.resikojatuh.skor
                    : vStatusNyeri.values.resikojatuhhds.skor}
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
      <Row>
        <Label className="mb-3" style={{ color: '#000000' }}>
          3. Pemeriksaan Umum
        </Label>
      </Row>
      <Row>
        <Col>
          <TandaVital isHistory={false} vOutside={vTTV} />
        </Col>
      </Row>
      <Row>
        <Label className="mb-3" style={{ color: '#000000' }}>
          4. Pemeriksaan Fisik
        </Label>
      </Row>
      <Row>
        <Col lg={12}>
          <PemeriksaanFisik
            vStatusNyeri={vStatusNyeri}
            badanInit={badanInit}
            opsiBadan={opsiBadan}
          />
        </Col>
      </Row>
      <Row className="d-flex flex-row-reverse">
        <Col lg="auto">
          <Button color="danger">Batal</Button>
        </Col>
        <Col lg="auto">
          <Button
            color="success"
            onClick={() => {
              console.error(vStatusNyeri.errors)
              console.error(vStatusNyeri.values)

              vStatusNyeri.handleSubmit()
            }}
          >
            {vStatusNyeri.values.norecasesmenawaligd ? 'Edit' : 'Simpan'}
          </Button>
        </Col>
      </Row>
    </div>
  )
}

const PemeriksaanFisik = ({ vStatusNyeri, badanInit, opsiBadan }) => {
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
      { ...pemeriksaanFisikObj },
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
              options={opsiBadan}
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
          {index >= (badanInit || []).length && (
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

const resikoJatuhValidation = Yup.object({
  riwayatjatuh: Yup.string().required('Riwayat jatuh diperlukan'),
  diagnosissekunder: Yup.string().required('Diagnosis sekunder diperlukan'),
  alatbantuberjalan: Yup.string().required('Alat bantu berjalan diperlukan'),
  infus: Yup.string().required('Infus diperlukan'),
  kondisi: Yup.string().required('Kondisi diperlukan'),
  statusmental: Yup.string().required('Status mental diperlukan'),
})

const pemeriksaanFisikObj = {
  value: '',
  label: '',
  normal: true,
  abnormalteks: '',
}

const pemeriksaanFisikValidation = Yup.array().of(
  Yup.object({
    value: Yup.string().required(),
    normal: Yup.boolean().required(),
    abnormalteks: Yup.string().when('normal', {
      is: (val) => val === false,
      then: () => Yup.string().required('Abnormal harus diisi'),
    }),
  })
)

const resikoJatuhInitial = {
  riwayatjatuh: '',
  diagnosissekunder: '',
  alatbantuberjalan: '',
  infus: '',
  kondisi: '',
  statusmental: '',
  skor: 0,
}

const keyResiko = Object.keys(resikoJatuhInitial)

const resikoJatuh = [
  {
    key: keyResiko[0],
    pertanyaan:
      'Apakah ada riwayat jatuh 3 bulan terakhir dengan sebab apapun?',
    subjawaban: [],
    jawaban: [
      {
        jawaban: 'Ya',
        skor: 25,
      },
      {
        jawaban: 'Tidak',
        skor: 0,
      },
    ],
  },
  {
    key: keyResiko[1],
    pertanyaan:
      'Diagnosis sekunder : Apakah memiliki lebih dari satu penyakit?',
    subjawaban: [],
    jawaban: [
      {
        jawaban: 'Ya',
        skor: 15,
      },
      {
        jawaban: 'Tidak',
        skor: 0,
      },
    ],
  },
  {
    key: keyResiko[2],
    pertanyaan: 'Alat bantu berjalan',
    subjawaban: [
      {
        pertanyaan: 'Dibantu perawat / tidak menggunakan alat bantu/ bed rest',
        skor: 15,
      },
      {
        pertanyaan: 'menggunakan alat bantu : kruk/ tongkat, kursi roda',
        skor: 25,
      },
      {
        pertanyaan:
          'merambat dengan berpegangan pada benda di sekitar (meja, kursi, lemari, dll)',
        skor: 35,
      },
    ],
    jawaban: [],
  },
  {
    key: keyResiko[3],
    pertanyaan:
      'Apakah terpasang infus/ pemberian anti koagulan (heparin)/ obat lain yang mempunyai efek samping risiko jatuh?',
    subjawaban: [],
    jawaban: [
      {
        jawaban: 'Ya',
        skor: 15,
      },
      {
        jawaban: 'Tidak',
        skor: 0,
      },
    ],
  },
  {
    key: keyResiko[4],
    pertanyaan: 'Kondisi untuk melakukan gerakan berpindah / mobilisasi:',
    subjawaban: [
      {
        pertanyaan: 'normal / bed rest / imobilisasi',
        skor: 25,
      },
      {
        pertanyaan: 'Lemah (tidak bertenaga)',
        skor: 15,
      },
      {
        pertanyaan: 'Ada keterbatasan berjalan (pincang, diseret)',
        skor: 0,
      },
    ],
    jawaban: [],
  },
  {
    key: keyResiko[5],
    pertanyaan: 'Bagaimana status mental:',
    subjawaban: [
      {
        pertanyaan: 'Menyadari kelemahannya',
        skor: 0,
      },
      {
        pertanyaan: 'tidak menyadari kelemahannya',
        skor: 15,
      },
    ],
    jawaban: [],
  },
]

const resikoJatuhHDSInitial = {
  umur: '',
  jeniskelamin: '',
  diagnosa: '',
  gangguankognitif: '',
  faktorlingkungan: '',
  pembedahan: '',
  medikamentosa: '',
  skor: 0,
}

const keyHDS = Object.keys(resikoJatuhHDSInitial)

const resikoJatuhHDS = [
  {
    key: keyHDS[0],
    pertanyaan: 'Usia',
    subjawaban: [
      {
        pertanyaan: '<= 7 Tahun',
        skor: 3,
      },
      {
        pertanyaan: '7-13 Tahun',
        skor: 2,
      },
      {
        pertanyaan: '>= 13 Tahun',
        skor: 1,
      },
    ],
    jawaban: [],
  },
  {
    key: keyHDS[1],
    pertanyaan: 'Jenis kelamin',
    subjawaban: [
      {
        pertanyaan: 'Laki-Laki',
        skor: 2,
      },
      {
        pertanyaan: 'Perempuan',
        skor: 1,
      },
    ],
    jawaban: [],
  },
  {
    key: keyHDS[2],
    pertanyaan: 'Diagnosa',
    subjawaban: [
      {
        pertanyaan: 'Diagnosis Neurologis',
        skor: 3,
      },
      {
        pertanyaan: 'Perubahan Oksigenisasi',
        skor: 2,
      },
      {
        pertanyaan: 'Diagnosis Lainnya',
        skor: 1,
      },
    ],
    jawaban: [],
  },
  {
    key: keyHDS[3],
    pertanyaan: 'Gangguan kognitif',
    subjawaban: [
      {
        pertanyaan: 'Tidak menyadari keterbatasan dirinya',
        skor: 3,
      },
      {
        pertanyaan: 'Lupa akan adanya keterbatasan',
        skor: 2,
      },
      {
        pertanyaan: 'Orientasi baik akan dirinya sendiri',
        skor: 1,
      },
    ],
    jawaban: [],
  },
  {
    key: keyHDS[4],
    pertanyaan: 'Faktor lingkungan',
    subjawaban: [
      {
        pertanyaan: 'Riwayat Jatuh/bayi di TT dewasa',
        skor: 4,
      },
      {
        pertanyaan: 'Pasien menggunakan alat bantu/bayi di TT bayi',
        skor: 3,
      },
      {
        pertanyaan: 'Pasien diletakkan di TT',
        skor: 2,
      },
      {
        pertanyaan: 'Area di luar Rumah Sakit',
        skor: 1,
      },
    ],
    jawaban: [],
  },
  {
    key: keyHDS[5],
    pertanyaan: 'Pembedahan/Sedasi/Anastesi',
    subjawaban: [
      {
        pertanyaan: 'dalam 24 jam',
        skor: 3,
      },
      {
        pertanyaan: 'dalam 48 jam',
        skor: 2,
      },
      {
        pertanyaan: '>= 48 jam tidak ada Pembedahan/Sedasi/Anastesi',
        skor: 1,
      },
    ],
    jawaban: [],
  },
  {
    key: keyHDS[6],
    pertanyaan: 'Penggunaan Medikamentosa',
    subjawaban: [
      {
        pertanyaan:
          'Penggunaan multiple: Sedatif, Obat, Hiptonis, Barbitur, Fenotiazin' +
          ', Antidepresan, Pencahar, Duretik, Narkose',
        skor: 3,
      },
      {
        pertanyaan: 'Penggunaan salah satu obat di atas',
        skor: 2,
      },
      {
        pertanyaan: 'Penggunaan medikasi lainnya/tidak ada medikasi',
        skor: 1,
      },
    ],
    jawaban: [],
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
