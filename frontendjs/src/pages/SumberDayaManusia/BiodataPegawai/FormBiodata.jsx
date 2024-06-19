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

const FormBiodata = () => {
  const dispatch = useDispatch()
  const { idPegawai } = useParams()

  const { dataCombo, newData, dataPegawai } = useSelector((state) => ({
    dataCombo: state.sumberDayaManusia.getComboSDM.data,
    newData: state.sumberDayaManusia.saveBiodataPegawai.data,
    dataPegawai: state.sumberDayaManusia.getPegawaiById.data,
  }))

  const [dateNow] = useState(() => new Date().toISOString())

  const vSetValidationBiodata = useFormik({
    enableReinitialize: true,
    initialValues: {
      task: 1,
      idPegawai: '',
      nip: '',
      gelardepan: '',
      namalengkap: '',
      gelarbelakang: '',
      namalengkap2: '',
      nik: '',
      inisialNama: '',
      jenisKelamin: '',
      tempatLahir: '',
      tglLahir: '',
      agama: '',
      golonganDarah: '',
      suku: '',
      noTelp: '',
      noHp: '',
      email: '',
      pendidikanTerakhir: '',
      statusPernikahan: '',
      namaIbuKandung: '',
    },
    validationSchema: Yup.object({
      nip: Yup.string().required('NIP wajib diisi'),
      // gelardepan: Yup.string().required("Gelar wajib diisi"),
      namalengkap: Yup.string().required('NIP wajib diisi'),
      // gelarbelakang: Yup.string().required("NIP wajib diisi"),
      nik: Yup.string().required('NIK wajib diisi'),
      // inisialNama: Yup.string().required("NIP wajib diisi"),
      jenisKelamin: Yup.string().required('Jenis Kelamin wajib diisi'),
      tempatLahir: Yup.string().required('Tempat Lahir wajib diisi'),
      tglLahir: Yup.string().required('TGL Lahir wajib diisi'),
      agama: Yup.string().required('Agama wajib diisi'),
      golonganDarah: Yup.string().required('GOlongan Darah wajib diisi'),
      suku: Yup.string().required('Sukur wajib diisi'),
      noTelp: Yup.string().required('No. Telp wajib diisi'),
      noHp: Yup.string().required('No. Hp wajib diisi'),
      email: Yup.string().required('email wajib diisi'),
      pendidikanTerakhir: Yup.string().required(
        'Pendidikan Terakhir wajib diisi'
      ),
      statusPernikahan: Yup.string().required('Status Pernikahan wajib diisi'),
      namaIbuKandung: Yup.string().required('Nama Ibu Kandung wajib diisi'),
    }),
    onSubmit: (values) => {
      dispatch(saveBiodataPegawai(values, () => {}))
    },
  })

  useEffect(() => {
    const setFF = vSetValidationBiodata.setFieldValue
    if (dataPegawai[0] !== undefined) {
      if (dataPegawai[0]?.namalengkap !== undefined) {
        setFF('gelardepan', dataPegawai[0]?.gelardepan)
        setFF('gelarbelakang', dataPegawai[0]?.gelarbelakang)
        setFF('namalengkap', dataPegawai[0]?.nama)
        setFF('nik', dataPegawai[0]?.noidentitas)
        setFF('nip', dataPegawai[0]?.nip)
        setFF('inisialNama', dataPegawai[0]?.reportdisplay)
        setFF('jenisKelamin', dataPegawai[0]?.objectjeniskelaminfk)
        setFF('tempatLahir', dataPegawai[0]?.tempatlahir)
        setFF('tglLahir', dataPegawai[0]?.tgllahir)
        setFF('objectagamafk', dataPegawai[0]?.agama)
        setFF('golonganDarah', dataPegawai[0]?.objectgolongandarahfk)
        setFF('objectetnisfk', dataPegawai[0]?.suku)
        setFF('noTelp', dataPegawai[0]?.notlp)
        setFF('noHp', dataPegawai[0]?.nohandphone)
        setFF('email', dataPegawai[0]?.email)
        setFF('pendidikanTerakhir', dataPegawai[0]?.objectpendidikanterakhirfk)
        setFF(
          'statusPernikahan',
          dataPegawai[0]?.objectstatusperkawinanpegawaifk
        )
        setFF('namaIbuKandung', dataPegawai[0]?.namaibu)
        setFF('agama', dataPegawai[0]?.objectagamafk)
        setFF('suku', dataPegawai[0]?.objectetnisfk)
      }
    }
  }, [dataPegawai, vSetValidationBiodata.setFieldValue])

  useEffect(() => {
    const setFF = vSetValidationBiodata.setFieldValue
    if (newData !== null) {
      if (newData?.pegawai?.id !== undefined) {
        setFF('idPegawai', newData.pegawai.id)
      }
    }
  }, [newData, vSetValidationBiodata.setFieldValue])

  useEffect(() => {
    if (idPegawai !== undefined) {
      const setFF = vSetValidationBiodata.setFieldValue
      setFF('idPegawai', idPegawai)
      dispatch(getPegawaiById({ idPegawai: idPegawai }))
      dispatch(getUserRoleById({ idPegawai: idPegawai }))
    }
  }, [idPegawai, dispatch, vSetValidationBiodata.setFieldValue])
  return (
    <Card>
      <CardBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            vSetValidationBiodata.handleSubmit()
            return false
          }}
          className="gy-4"
          action="#"
        >
          <Row>
            <Col lg={6}>
              <Row className="gy-2">
                <Col lg={4}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      NIP
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomInput
                    id="nip"
                    name="nip"
                    type="text"
                    value={vSetValidationBiodata.values.nip}
                    onChange={(e) => {
                      vSetValidationBiodata.setFieldValue('nip', e.target.value)
                    }}
                    invalid={
                      vSetValidationBiodata.touched?.nip &&
                      !!vSetValidationBiodata.errors?.nip
                    }
                  />
                  {vSetValidationBiodata.touched?.nip &&
                    !!vSetValidationBiodata.errors.nip && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationBiodata.errors.nip}</div>
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
                      Nama dan Gelar
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <CustomInput
                    id="gelardepan"
                    name="gelardepan"
                    type="text"
                    value={vSetValidationBiodata.values.gelardepan}
                    onChange={(e) => {
                      vSetValidationBiodata.setFieldValue(
                        'gelardepan',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidationBiodata.touched?.gelardepan &&
                      !!vSetValidationBiodata.errors?.gelardepan
                    }
                  />
                  {vSetValidationBiodata.touched?.gelardepan &&
                    !!vSetValidationBiodata.errors.gelardepan && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationBiodata.errors.gelardepan}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={4}>
                  <CustomInput
                    id="namalengkap"
                    name="namalengkap"
                    type="text"
                    value={vSetValidationBiodata.values.namalengkap}
                    onChange={(e) => {
                      vSetValidationBiodata.setFieldValue(
                        'namalengkap',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidationBiodata.touched?.namalengkap &&
                      !!vSetValidationBiodata.errors?.namalengkap
                    }
                  />
                  {vSetValidationBiodata.touched?.namalengkap &&
                    !!vSetValidationBiodata.errors.namalengkap && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationBiodata.errors.namalengkap}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <CustomInput
                    id="gelarbelakang"
                    name="gelarbelakang"
                    type="text"
                    value={vSetValidationBiodata.values.gelarbelakang}
                    onChange={(e) => {
                      vSetValidationBiodata.setFieldValue(
                        'gelarbelakang',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidationBiodata.touched?.gelarbelakang &&
                      !!vSetValidationBiodata.errors?.gelarbelakang
                    }
                  />
                  {vSetValidationBiodata.touched?.gelarbelakang &&
                    !!vSetValidationBiodata.errors.gelarbelakang && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationBiodata.errors.gelarbelakang}</div>
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
                      Nama Lengkap
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomInput
                    id="namalengkap2"
                    name="namalengkap2"
                    type="text"
                    value={`${vSetValidationBiodata.values.gelardepan || ''} ${
                      vSetValidationBiodata.values.namalengkap
                    } ${vSetValidationBiodata.values.gelarbelakang || ''}`}
                    onChange={(e) => {
                      vSetValidationBiodata.setFieldValue(
                        'namalengkap2',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidationBiodata.touched?.namalengkap2 &&
                      !!vSetValidationBiodata.errors?.namalengkap2
                    }
                    disabled
                  />
                  {vSetValidationBiodata.touched?.namalengkap2 &&
                    !!vSetValidationBiodata.errors.namalengkap2 && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationBiodata.errors.namalengkap2}</div>
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
                      NIK
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomInput
                    id="nik"
                    name="nik"
                    type="text"
                    value={vSetValidationBiodata.values.nik}
                    onChange={(e) => {
                      vSetValidationBiodata.setFieldValue('nik', e.target.value)
                    }}
                    invalid={
                      vSetValidationBiodata.touched?.nik &&
                      !!vSetValidationBiodata.errors?.nik
                    }
                  />
                  {vSetValidationBiodata.touched?.nik &&
                    !!vSetValidationBiodata.errors.nik && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationBiodata.errors.nik}</div>
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
                      Inisial Nama
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomInput
                    id="inisialNama"
                    name="inisialNama"
                    type="text"
                    value={vSetValidationBiodata.values.inisialNama}
                    onChange={(e) => {
                      vSetValidationBiodata.setFieldValue(
                        'inisialNama',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidationBiodata.touched?.inisialNama &&
                      !!vSetValidationBiodata.errors?.inisialNama
                    }
                  />
                  {vSetValidationBiodata.touched?.inisialNama &&
                    !!vSetValidationBiodata.errors.inisialNama && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationBiodata.errors.inisialNama}</div>
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
                      Jenis Kelamin
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomSelect
                    id="jenisKelamin"
                    name="jenisKelamin"
                    options={dataCombo.jenisKelamin}
                    onChange={(e) => {
                      vSetValidationBiodata.setFieldValue(
                        'jenisKelamin',
                        e?.value || ''
                      )
                    }}
                    value={vSetValidationBiodata.values.jenisKelamin}
                    className={`input row-header ${
                      !!vSetValidationBiodata?.errors.jenisKelamin
                        ? 'is-invalid'
                        : ''
                    }`}
                  />
                  {vSetValidationBiodata.touched.jenisKelamin &&
                    !!vSetValidationBiodata.errors.jenisKelamin && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationBiodata.errors.jenisKelamin}</div>
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
                      Tempat / Tanggal Lahir
                    </Label>
                  </div>
                </Col>
                <Col lg={4}>
                  <CustomInput
                    id="tempatLahir"
                    name="tempatLahir"
                    type="text"
                    value={vSetValidationBiodata.values.tempatLahir}
                    onChange={(e) => {
                      vSetValidationBiodata.setFieldValue(
                        'tempatLahir',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidationBiodata.touched?.tempatLahir &&
                      !!vSetValidationBiodata.errors?.tempatLahir
                    }
                  />
                  {vSetValidationBiodata.touched?.tempatLahir &&
                    !!vSetValidationBiodata.errors.tempatLahir && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationBiodata.errors.tempatLahir}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={4}>
                  <KontainerFlatpickr
                    isError={
                      vSetValidationBiodata.touched?.tglLahir &&
                      !!vSetValidationBiodata.errors?.tglLahir
                    }
                    id="tglLahir"
                    options={{
                      dateFormat: 'Y-m-d',
                      defaultDate: 'today',
                    }}
                    value={vSetValidationBiodata.values.tglLahir || dateNow}
                    onChange={([newDate]) => {
                      vSetValidationBiodata.setFieldValue(
                        'tglLahir',
                        newDate.toISOString()
                      )
                    }}
                  />
                  {vSetValidationBiodata.touched?.tglLahir &&
                    !!vSetValidationBiodata.errors.tglLahir && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationBiodata.errors.tglLahir}</div>
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
                      Agama
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomSelect
                    id="agama"
                    name="agama"
                    options={dataCombo.agama}
                    onChange={(e) => {
                      vSetValidationBiodata.setFieldValue(
                        'agama',
                        e?.value || ''
                      )
                    }}
                    value={vSetValidationBiodata.values.agama}
                    className={`input row-header ${
                      !!vSetValidationBiodata?.errors.agama ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidationBiodata.touched.agama &&
                    !!vSetValidationBiodata.errors.agama && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationBiodata.errors.agama}</div>
                      </FormFeedback>
                    )}
                </Col>
              </Row>
            </Col>
            <Col lg={6}>
              <Row className="gy-2">
                <Col lg={4}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Golongan Darah
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomSelect
                    id="golonganDarah"
                    name="golonganDarah"
                    options={dataCombo.golonganDarah}
                    onChange={(e) => {
                      vSetValidationBiodata.setFieldValue(
                        'golonganDarah',
                        e?.value || ''
                      )
                    }}
                    value={vSetValidationBiodata.values.golonganDarah}
                    className={`input row-header ${
                      !!vSetValidationBiodata?.errors.golonganDarah
                        ? 'is-invalid'
                        : ''
                    }`}
                  />
                  {vSetValidationBiodata.touched.golonganDarah &&
                    !!vSetValidationBiodata.errors.golonganDarah && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationBiodata.errors.golonganDarah}</div>
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
                      Suku
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomSelect
                    id="suku"
                    name="suku"
                    options={dataCombo.etnis}
                    onChange={(e) => {
                      vSetValidationBiodata.setFieldValue(
                        'suku',
                        e?.value || ''
                      )
                    }}
                    value={vSetValidationBiodata.values.suku}
                    className={`input row-header ${
                      !!vSetValidationBiodata?.errors.suku ? 'is-invalid' : ''
                    }`}
                  />
                  {vSetValidationBiodata.touched.suku &&
                    !!vSetValidationBiodata.errors.suku && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationBiodata.errors.suku}</div>
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
                      No. Telp / HP
                    </Label>
                  </div>
                </Col>
                <Col lg={4}>
                  <CustomInput
                    id="noTelp"
                    name="noTelp"
                    type="text"
                    value={vSetValidationBiodata.values.noTelp}
                    onChange={(e) => {
                      vSetValidationBiodata.setFieldValue(
                        'noTelp',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidationBiodata.touched?.noTelp &&
                      !!vSetValidationBiodata.errors?.noTelp
                    }
                  />
                  {vSetValidationBiodata.touched?.noTelp &&
                    !!vSetValidationBiodata.errors.noTelp && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationBiodata.errors.noTelp}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={4}>
                  <CustomInput
                    id="noHp"
                    name="noHp"
                    type="text"
                    value={vSetValidationBiodata.values.noHp}
                    onChange={(e) => {
                      vSetValidationBiodata.setFieldValue(
                        'noHp',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidationBiodata.touched?.noHp &&
                      !!vSetValidationBiodata.errors?.noHp
                    }
                  />
                  {vSetValidationBiodata.touched?.noHp &&
                    !!vSetValidationBiodata.errors.noHp && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationBiodata.errors.noHp}</div>
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
                      Email
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomInput
                    id="email"
                    name="email"
                    type="email"
                    value={vSetValidationBiodata.values.email}
                    onChange={(e) => {
                      vSetValidationBiodata.setFieldValue(
                        'email',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidationBiodata.touched?.email &&
                      !!vSetValidationBiodata.errors?.email
                    }
                  />
                  {vSetValidationBiodata.touched?.email &&
                    !!vSetValidationBiodata.errors.email && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationBiodata.errors.email}</div>
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
                      Pendidikan Terakhir
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomSelect
                    id="pendidikanTerakhir"
                    name="pendidikanTerakhir"
                    options={dataCombo.pendidikan}
                    onChange={(e) => {
                      vSetValidationBiodata.setFieldValue(
                        'pendidikanTerakhir',
                        e?.value || ''
                      )
                    }}
                    value={vSetValidationBiodata.values.pendidikanTerakhir}
                    className={`input row-header ${
                      !!vSetValidationBiodata?.errors.pendidikanTerakhir
                        ? 'is-invalid'
                        : ''
                    }`}
                  />
                  {vSetValidationBiodata.touched.pendidikanTerakhir &&
                    !!vSetValidationBiodata.errors.pendidikanTerakhir && (
                      <FormFeedback type="invalid">
                        <div>
                          {vSetValidationBiodata.errors.pendidikanTerakhir}
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
                      Status Pernikahan
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomSelect
                    id="statusPernikahan"
                    name="statusPernikahan"
                    options={dataCombo.perkawinan}
                    onChange={(e) => {
                      vSetValidationBiodata.setFieldValue(
                        'statusPernikahan',
                        e?.value || ''
                      )
                    }}
                    value={vSetValidationBiodata.values.statusPernikahan}
                    className={`input row-header ${
                      !!vSetValidationBiodata?.errors.statusPernikahan
                        ? 'is-invalid'
                        : ''
                    }`}
                  />
                  {vSetValidationBiodata.touched.statusPernikahan &&
                    !!vSetValidationBiodata.errors.statusPernikahan && (
                      <FormFeedback type="invalid">
                        <div>
                          {vSetValidationBiodata.errors.statusPernikahan}
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
                      Nama Ibu Kandung
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomInput
                    id="namaIbuKandung"
                    name="namaIbuKandung"
                    type="text"
                    value={vSetValidationBiodata.values.namaIbuKandung}
                    onChange={(e) => {
                      vSetValidationBiodata.setFieldValue(
                        'namaIbuKandung',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidationBiodata.touched?.namaIbuKandung &&
                      !!vSetValidationBiodata.errors?.namaIbuKandung
                    }
                  />
                  {vSetValidationBiodata.touched?.namaIbuKandung &&
                    !!vSetValidationBiodata.errors.namaIbuKandung && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationBiodata.errors.namaIbuKandung}</div>
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
                <Button type="button" color="danger">
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

export default FormBiodata