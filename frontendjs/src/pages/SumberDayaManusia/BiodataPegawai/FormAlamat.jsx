import {
  Card,
  Form,
  Row,
  Col,
  Label,
  FormFeedback,
  CardBody,
  Button,
} from 'reactstrap'
import CustomInput from '../../../Components/Common/CustomInput/CustomInput'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import {
  saveBiodataPegawai,
  getPegawaiById,
  getUserRoleById,
} from '../../../store/actions'
import { useEffect, useState } from 'react'
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr'
import CustomSelect from '../../../Components/Common/CustomSelect/CustomSelect'
import { onChangeStrNbr } from '../../../utils/format'
import { desaGet } from '../../../store/master/action'

const FormAlamat = () => {
  const dispatch = useDispatch()
  const { idPegawai } = useParams()
  const { newData, success, dataPegawai, dataDesa } = useSelector((state) => ({
    newData: state.sumberDayaManusia.saveBiodataPegawai.data,
    success: state.sumberDayaManusia.saveBiodataPegawai.success,
    loading: state.sumberDayaManusia.saveBiodataPegawai.loading,
    dataPegawai: state.sumberDayaManusia.getPegawaiById.data,
    dataDesa: state.Master.desaGet.data,
  }))

  const vSetValidationAlamat = useFormik({
    enableReinitialize: true,
    initialValues: {
      task: 2,
      idPegawai: '',
      alamat: '',
      rt: '',
      rw: '',
      desa: '',
      kodepos: '',
      kecamatan: '',
      kabupaten: '',
      provinsi: '',
      alamatDomisili: '',
      rtDomisili: '',
      rwDomisili: '',
      desaDomisili: '',
      kodeposDomisili: '',
      kecamatanDomisili: '',
      kabupatenDomisili: '',
      provinsiDomisili: '',
    },
    validationSchema: Yup.object({
      // tingkatdarurat: Yup.string().required("Tingkat Darurat jawab wajib diisi"),
    }),
    onSubmit: (values) => {
      dispatch(saveBiodataPegawai(values, () => {}))
    },
  })

  useEffect(() => {
    dispatch(desaGet(''))
  }, [dispatch])

  const handleDesa = (characterEntered) => {
    if (characterEntered.length > 3) {
      dispatch(desaGet(characterEntered))
    }
  }

  const handleChangeDesa = (selected) => {
    vSetValidationAlamat.setFieldValue('desa', selected?.value || '')
    vSetValidationAlamat.setFieldValue(
      'kecamatan',
      selected?.namakecamatan || ''
    )
    vSetValidationAlamat.setFieldValue(
      'kabupaten',
      selected?.namakabupaten || ''
    )
    vSetValidationAlamat.setFieldValue('provinsi', selected?.namaprovinsi || '')
    vSetValidationAlamat.setFieldValue('kodepos', selected?.kodepos || '')
    // console.log(selected);
  }
  const handleChangeDesaDomisili = (selected) => {
    vSetValidationAlamat.setFieldValue('desaDomisili', selected?.value || '')
    vSetValidationAlamat.setFieldValue(
      'kecamatanDomisili',
      selected?.namakecamatan || ''
    )
    vSetValidationAlamat.setFieldValue(
      'kabupatenDomisili',
      selected?.namakabupaten || ''
    )
    vSetValidationAlamat.setFieldValue(
      'provinsiDomisili',
      selected?.namaprovinsi || ''
    )
    vSetValidationAlamat.setFieldValue(
      'kodeposDomisili',
      selected?.kodepos || ''
    )
    // console.log(selected);
  }
  const handleDesaDomisili = (characterEntered) => {
    if (characterEntered.length > 3) {
      // useEffect(() => {
      dispatch(desaGet(characterEntered))
      // }, [dispatch]);
    }
  }
  const handleCheck = (e) => {
    vSetValidationAlamat.setFieldValue('formCheckCito', e)
    if (e === true) {
      vSetValidationAlamat.setFieldValue(
        'desaDomisili',
        vSetValidationAlamat.values.desa || ''
      )
      vSetValidationAlamat.setFieldValue(
        'kecamatanDomisili',
        vSetValidationAlamat.values.kecamatan || ''
      )
      vSetValidationAlamat.setFieldValue(
        'kabupatenDomisili',
        vSetValidationAlamat.values.kabupaten || ''
      )
      vSetValidationAlamat.setFieldValue(
        'provinsiDomisili',
        vSetValidationAlamat.values.provinsi || ''
      )
      vSetValidationAlamat.setFieldValue(
        'kodeposDomisili',
        vSetValidationAlamat.values.kodepos || ''
      )
      vSetValidationAlamat.setFieldValue(
        'alamatDomisili',
        vSetValidationAlamat.values.alamat || ''
      )
      vSetValidationAlamat.setFieldValue(
        'rtDomisili',
        vSetValidationAlamat.values.rt || ''
      )
      vSetValidationAlamat.setFieldValue(
        'rwDomisili',
        vSetValidationAlamat.values.rw || ''
      )
    } else {
      vSetValidationAlamat.setFieldValue('desaDomisili', '')
      vSetValidationAlamat.setFieldValue('kecamatanDomisili', '')
      vSetValidationAlamat.setFieldValue('kabupatenDomisili', '')
      vSetValidationAlamat.setFieldValue('provinsiDomisili', '')
      vSetValidationAlamat.setFieldValue('kodeposDomisili', '')
      vSetValidationAlamat.setFieldValue('alamatDomisili', '')
      vSetValidationAlamat.setFieldValue('rtDomisili', '')
      vSetValidationAlamat.setFieldValue('rwDomisili', '')
    }
  }

  useEffect(() => {
    const setFF = vSetValidationAlamat.setFieldValue
    if (dataPegawai[0] !== undefined) {
      if (dataPegawai[0]?.namalengkap !== undefined) {
        setFF('alamat', dataPegawai[0]?.alamatktp)
        setFF('rt', dataPegawai[0]?.rtktp)
        setFF('rw', dataPegawai[0]?.rwktp)
        setFF('desa', dataPegawai[0]?.objectdesakelurahanktpfk)
        setFF('alamatDomisili', dataPegawai[0]?.alamatdom)
        setFF('rtDomisili', dataPegawai[0]?.rtdom)
        setFF('rwDomisili', dataPegawai[0]?.rwdom)
        setFF('desaDomisili', dataPegawai[0]?.objectdesakelurahandomfk)
      }
    }
  }, [dataPegawai, vSetValidationAlamat.setFieldValue])

  useEffect(() => {
    const setFF = vSetValidationAlamat.setFieldValue
    if (newData !== null) {
      if (newData?.pegawai?.id !== undefined) {
        setFF('idPegawai', newData.pegawai.id)
      }
    }
  }, [newData, vSetValidationAlamat.setFieldValue, success])

  useEffect(() => {
    if (idPegawai !== undefined) {
      const setFF2 = vSetValidationAlamat.setFieldValue
      setFF2('idPegawai', idPegawai)
      dispatch(getPegawaiById({ idPegawai: idPegawai }))
      dispatch(getUserRoleById({ idPegawai: idPegawai }))
    }
  }, [idPegawai, dispatch, vSetValidationAlamat.setFieldValue])

  return (
    <Card>
      <CardBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            vSetValidationAlamat.handleSubmit()
            return false
          }}
          className="gy-4"
          action="#"
        >
          <Row>
            <Col lg={6}>
              <Row className="gy-2">
                <Col lg={12}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Alamat KTP
                    </Label>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Alamat
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomInput
                    id="alamat"
                    name="alamat"
                    type="textarea"
                    value={vSetValidationAlamat.values.alamat}
                    onChange={(e) => {
                      vSetValidationAlamat.setFieldValue(
                        'alamat',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidationAlamat.touched?.alamat &&
                      !!vSetValidationAlamat.errors?.alamat
                    }
                  />
                  {vSetValidationAlamat.touched?.alamat &&
                    !!vSetValidationAlamat.errors.alamat && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationAlamat.errors.alamat}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={4}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      RT / RW
                    </Label>
                  </div>
                </Col>
                <Col lg={4}>
                  <CustomInput
                    id="rt"
                    name="rt"
                    type="text"
                    value={vSetValidationAlamat.values.rt}
                    onChange={(e) => {
                      vSetValidationAlamat.setFieldValue('rt', e.target.value)
                    }}
                    invalid={
                      vSetValidationAlamat.touched?.rt &&
                      !!vSetValidationAlamat.errors?.rt
                    }
                  />
                  {vSetValidationAlamat.touched?.rt &&
                    !!vSetValidationAlamat.errors.rt && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationAlamat.errors.rt}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={4}>
                  <CustomInput
                    id="rw"
                    name="rw"
                    type="text"
                    value={vSetValidationAlamat.values.rw}
                    onChange={(e) => {
                      vSetValidationAlamat.setFieldValue('rw', e.target.value)
                    }}
                    invalid={
                      vSetValidationAlamat.touched?.rw &&
                      !!vSetValidationAlamat.errors?.rw
                    }
                  />
                  {vSetValidationAlamat.touched?.rw &&
                    !!vSetValidationAlamat.errors.rw && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationAlamat.errors.rw}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={4}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Desa / Kelurahan
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomSelect
                    id="desa"
                    name="desa"
                    options={dataDesa}
                    onChange={handleChangeDesa}
                    onInputChange={handleDesa}
                    value={vSetValidationAlamat.values.desa}
                    className={`input row-header ${
                      !!vSetValidationAlamat?.errors.desa ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidationAlamat.touched.desa &&
                    !!vSetValidationAlamat.errors.desa && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationAlamat.errors.desa}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={4}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Kode Pos
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomInput
                    id="kodepos"
                    name="kodepos"
                    type="text"
                    value={vSetValidationAlamat.values.kodepos}
                    onChange={(e) => {
                      const newVal = onChangeStrNbr(
                        e.target.value,
                        vSetValidationAlamat.values.kodepos
                      )
                      vSetValidationAlamat.setFieldValue('kodepos', newVal)
                    }}
                    invalid={
                      vSetValidationAlamat.touched?.kodepos &&
                      !!vSetValidationAlamat.errors?.kodepos
                    }
                    disabled
                  />
                  {vSetValidationAlamat.touched?.kodepos &&
                    !!vSetValidationAlamat.errors.kodepos && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationAlamat.errors.kodepos}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={4}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Kecamatan
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomInput
                    id="kecamatan"
                    name="kecamatan"
                    type="text"
                    value={vSetValidationAlamat.values.kecamatan}
                    onChange={(e) => {
                      vSetValidationAlamat.setFieldValue(
                        'kecamatan',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidationAlamat.touched?.kecamatan &&
                      !!vSetValidationAlamat.errors?.kecamatan
                    }
                    disabled
                  />
                  {vSetValidationAlamat.touched?.kecamatan &&
                    !!vSetValidationAlamat.errors.kecamatan && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationAlamat.errors.kecamatan}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={4}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Kabupaten
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomInput
                    id="kabupaten"
                    name="kabupaten"
                    type="text"
                    value={vSetValidationAlamat.values.kabupaten}
                    onChange={(e) => {
                      vSetValidationAlamat.setFieldValue(
                        'kabupaten',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidationAlamat.touched?.kabupaten &&
                      !!vSetValidationAlamat.errors?.kabupaten
                    }
                    disabled
                  />
                  {vSetValidationAlamat.touched?.kabupaten &&
                    !!vSetValidationAlamat.errors.kabupaten && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationAlamat.errors.kabupaten}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={4}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Provinsi
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomInput
                    id="provinsi"
                    name="provinsi"
                    type="text"
                    value={vSetValidationAlamat.values.provinsi}
                    onChange={(e) => {
                      vSetValidationAlamat.setFieldValue(
                        'provinsi',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidationAlamat.touched?.provinsi &&
                      !!vSetValidationAlamat.errors?.provinsi
                    }
                    disabled
                  />
                  {vSetValidationAlamat.touched?.provinsi &&
                    !!vSetValidationAlamat.errors.provinsi && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationAlamat.errors.provinsi}</div>
                      </FormFeedback>
                    )}
                </Col>
              </Row>
            </Col>
            <Col lg={6}>
              <Row className="gy-2">
                <Col lg={12}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Alamat Domisili
                    </Label>
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="form-check ms-2">
                    <CustomInput
                      className="form-check-input"
                      type="checkbox"
                      id="formCheckCito"
                      onChange={(value) =>
                        // vSetValidationAlamat.setFieldValue('formCheckCito', value.target.checked)}
                        handleCheck(value.target.checked)
                      }
                    />
                    <Label
                      className="form-check-label"
                      htmlFor="formCheckCito"
                      style={{ color: 'black' }}
                    >
                      Sesuai dengan KTP
                    </Label>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Alamat
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomInput
                    id="alamatDomisili"
                    name="alamatDomisili"
                    type="textarea"
                    value={vSetValidationAlamat.values.alamatDomisili}
                    onChange={(e) => {
                      vSetValidationAlamat.setFieldValue(
                        'alamatDomisili',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidationAlamat.touched?.alamatDomisili &&
                      !!vSetValidationAlamat.errors?.alamatDomisili
                    }
                  />
                  {vSetValidationAlamat.touched?.alamatDomisili &&
                    !!vSetValidationAlamat.errors.alamatDomisili && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationAlamat.errors.alamatDomisili}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={4}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      RT / RW
                    </Label>
                  </div>
                </Col>
                <Col lg={4}>
                  <CustomInput
                    id="rtDomisili"
                    name="rtDomisili"
                    type="text"
                    value={vSetValidationAlamat.values.rtDomisili}
                    onChange={(e) => {
                      const newVal = onChangeStrNbr(
                        e.target.value,
                        vSetValidationAlamat.values.rtDomisili
                      )
                      vSetValidationAlamat.setFieldValue('rtDomisili', newVal)
                    }}
                    invalid={
                      vSetValidationAlamat.touched?.rtDomisili &&
                      !!vSetValidationAlamat.errors?.rtDomisili
                    }
                  />
                  {vSetValidationAlamat.touched?.rtDomisili &&
                    !!vSetValidationAlamat.errors.rtDomisili && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationAlamat.errors.rtDomisili}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={4}>
                  <CustomInput
                    id="rwDomisili"
                    name="rwDomisili"
                    type="text"
                    value={vSetValidationAlamat.values.rwDomisili}
                    onChange={(e) => {
                      const newVal = onChangeStrNbr(
                        e.target.value,
                        vSetValidationAlamat.values.rwDomisili
                      )
                      vSetValidationAlamat.setFieldValue('rwDomisili', newVal)
                    }}
                    invalid={
                      vSetValidationAlamat.touched?.rwDomisili &&
                      !!vSetValidationAlamat.errors?.rwDomisili
                    }
                  />
                  {vSetValidationAlamat.touched?.rwDomisili &&
                    !!vSetValidationAlamat.errors.rwDomisili && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationAlamat.errors.rwDomisili}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={4}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Desa / Kelurahan
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomSelect
                    id="desaDomisili"
                    name="desaDomisili"
                    options={dataDesa}
                    onChange={handleChangeDesaDomisili}
                    onInputChange={handleDesaDomisili}
                    value={vSetValidationAlamat.values.desaDomisili}
                    className={`input row-header ${
                      !!vSetValidationAlamat?.errors.desaDomisili
                        ? 'is-invalid'
                        : ''
                    }`}
                  />
                  {vSetValidationAlamat.touched.desaDomisili &&
                    !!vSetValidationAlamat.errors.desaDomisili && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationAlamat.errors.desaDomisili}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={4}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Kode Pos
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomInput
                    id="kodeposDomisili"
                    name="kodeposDomisili"
                    type="text"
                    value={vSetValidationAlamat.values.kodeposDomisili}
                    onChange={(e) => {
                      const newVal = onChangeStrNbr(
                        e.target.value,
                        vSetValidationAlamat.values.kodeposDomisili
                      )
                      vSetValidationAlamat.setFieldValue(
                        'kodeposDomisili',
                        newVal
                      )
                    }}
                    invalid={
                      vSetValidationAlamat.touched?.kodeposDomisili &&
                      !!vSetValidationAlamat.errors?.kodeposDomisili
                    }
                    disabled
                  />
                  {vSetValidationAlamat.touched?.kodeposDomisili &&
                    !!vSetValidationAlamat.errors.kodeposDomisili && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationAlamat.errors.kodeposDomisili}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={4}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Kecamatan
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomInput
                    id="kecamatanDomisili"
                    name="kecamatanDomisili"
                    type="text"
                    value={vSetValidationAlamat.values.kecamatanDomisili}
                    onChange={(e) => {
                      vSetValidationAlamat.setFieldValue(
                        'kecamatanDomisili',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidationAlamat.touched?.kecamatanDomisili &&
                      !!vSetValidationAlamat.errors?.kecamatanDomisili
                    }
                    disabled
                  />
                  {vSetValidationAlamat.touched?.kecamatanDomisili &&
                    !!vSetValidationAlamat.errors.kecamatanDomisili && (
                      <FormFeedback type="invalid">
                        <div>
                          {vSetValidationAlamat.errors.kecamatanDomisili}
                        </div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={4}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Kabupaten
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomInput
                    id="kabupatenDomisili"
                    name="kabupatenDomisili"
                    type="text"
                    value={vSetValidationAlamat.values.kabupatenDomisili}
                    onChange={(e) => {
                      vSetValidationAlamat.setFieldValue(
                        'kabupatenDomisili',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidationAlamat.touched?.kabupatenDomisili &&
                      !!vSetValidationAlamat.errors?.kabupatenDomisili
                    }
                    disabled
                  />
                  {vSetValidationAlamat.touched?.kabupatenDomisili &&
                    !!vSetValidationAlamat.errors.kabupatenDomisili && (
                      <FormFeedback type="invalid">
                        <div>
                          {vSetValidationAlamat.errors.kabupatenDomisili}
                        </div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={4}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Provinsi
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomInput
                    id="provinsiDomisili"
                    name="provinsiDomisili"
                    type="text"
                    value={vSetValidationAlamat.values.provinsiDomisili}
                    onChange={(e) => {
                      vSetValidationAlamat.setFieldValue(
                        'provinsiDomisili',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidationAlamat.touched?.provinsiDomisili &&
                      !!vSetValidationAlamat.errors?.provinsiDomisili
                    }
                    disabled
                  />
                  {vSetValidationAlamat.touched?.provinsiDomisili &&
                    !!vSetValidationAlamat.errors.provinsiDomisili && (
                      <FormFeedback type="invalid">
                        <div>
                          {vSetValidationAlamat.errors.provinsiDomisili}
                        </div>
                      </FormFeedback>
                    )}
                </Col>
              </Row>
            </Col>
            <Col lg={12} className="mr-3 me-3 mt-2">
              <div className="d-flex flex-wrap justify-content-end gap-2">
                <Button type="submit" color="success">
                  Simpan
                </Button>
                <Button
                  type="button"
                  color="danger"
                  // onClick={() => { handleBack() }}
                >
                  Batal
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}

export default FormAlamat
