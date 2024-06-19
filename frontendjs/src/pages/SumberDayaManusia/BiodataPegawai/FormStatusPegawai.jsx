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

const FormStatusPegawai = () => {
  const { idPegawai } = useParams()
  const { dataCombo, newData, dataPegawai } = useSelector((state) => ({
    dataCombo: state.sumberDayaManusia.getComboSDM.data,
    newData: state.sumberDayaManusia.saveBiodataPegawai.data,
    dataPegawai: state.sumberDayaManusia.getPegawaiById.data,
  }))
  const [dateNow] = useState(() => new Date().toISOString())
  const dispatch = useDispatch()

  const vSetValidationStatusPegawai = useFormik({
    enableReinitialize: true,
    initialValues: {
      task: 3,
      idPegawai: '',
      noSK: '',
      noSIP: '',
      noSTR: '',
      npwp: '',
      golongan: '',
      statusPegawai: '',
      profesi: '',
      jabatan: '',
      tglSKStart: '',
      tglSKend: '',
      tglSIPStart: '',
      tglSIPend: '',
      tglSTRStart: '',
      tglSTRend: '',
      golonganPTKP: '',
      jumlahAnak: '',
      jumlahTanggungan: '',
      unitPelayanan: '',
      unitKerja: '',
    },
    validationSchema: Yup.object({
      // tingkatdarurat: Yup.string().required("Tingkat Darurat jawab wajib diisi"),
    }),
    onSubmit: (values) => {
      dispatch(saveBiodataPegawai(values, () => {}))
    },
  })

  useEffect(() => {
    const setFF = vSetValidationStatusPegawai.setFieldValue
    if (newData !== null) {
      if (newData?.pegawai?.id !== undefined) {
        setFF('idPegawai', newData.pegawai.id)
      }
    }
  }, [newData, vSetValidationStatusPegawai.setFieldValue])

  useEffect(() => {
    if (idPegawai !== undefined) {
      const setFF = vSetValidationStatusPegawai.setFieldValue
      setFF('idPegawai', idPegawai)
      dispatch(getPegawaiById({ idPegawai: idPegawai }))
      dispatch(getUserRoleById({ idPegawai: idPegawai }))
    }
  }, [idPegawai, dispatch, vSetValidationStatusPegawai.setFieldValue])
  useEffect(() => {
    const setFF = vSetValidationStatusPegawai.setFieldValue
    if (dataPegawai[0] !== undefined) {
      if (dataPegawai[0]?.namalengkap !== undefined) {
        setFF('noSK', dataPegawai[0]?.nosk)
        setFF('noSIP', dataPegawai[0]?.nosip)
        setFF('noSTR', dataPegawai[0]?.nostr)
        setFF('npwp', dataPegawai[0]?.npwp)
        setFF('golongan', dataPegawai[0]?.objectgolonganfk)
        setFF('statusPegawai', dataPegawai[0]?.objectstatuspegawaifk)
        setFF('profesi', dataPegawai[0]?.objectprofesipegawaifk)
        setFF('jabatan', dataPegawai[0]?.objectjabatanfk)
        setFF('tglSKStart', dataPegawai[0]?.tglmasuk)
        setFF('tglSKend', dataPegawai[0]?.tglpensiun)
        setFF('tglSIPStart', dataPegawai[0]?.tglterbitsip)
        setFF('tglSIPend', dataPegawai[0]?.tglberakhirsip)
        setFF('tglSTRStart', dataPegawai[0]?.tglterbitstr)
        setFF('tglSTRend', dataPegawai[0]?.tglberakhirstr)
        setFF('golonganPTKP', dataPegawai[0]?.objectgolonganptkpfk)
        setFF('jumlahAnak', dataPegawai[0]?.qtyanak)
        setFF('jumlahTanggungan', dataPegawai[0]?.qtytanggungan)
        setFF('unitPelayanan', dataPegawai[0]?.objectunitfk)
        setFF('unitKerja', dataPegawai[0]?.objectunitkerjafk)
      }
    }
  }, [dataPegawai, vSetValidationStatusPegawai.setFieldValue])
  return (
    <Card>
      <CardBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            vSetValidationStatusPegawai.handleSubmit()
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
                      No. SK
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomInput
                    id="noSK"
                    name="noSK"
                    type="text"
                    value={vSetValidationStatusPegawai.values.noSK}
                    onChange={(e) => {
                      vSetValidationStatusPegawai.setFieldValue(
                        'noSK',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidationStatusPegawai.touched?.noSK &&
                      !!vSetValidationStatusPegawai.errors?.noSK
                    }
                  />
                  {vSetValidationStatusPegawai.touched?.noSK &&
                    !!vSetValidationStatusPegawai.errors.noSK && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationStatusPegawai.errors.noSK}</div>
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
                      No. SIP
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomInput
                    id="noSIP"
                    name="noSIP"
                    type="text"
                    value={vSetValidationStatusPegawai.values.noSIP}
                    onChange={(e) => {
                      vSetValidationStatusPegawai.setFieldValue(
                        'noSIP',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidationStatusPegawai.touched?.noSIP &&
                      !!vSetValidationStatusPegawai.errors?.noSIP
                    }
                  />
                  {vSetValidationStatusPegawai.touched?.noSIP &&
                    !!vSetValidationStatusPegawai.errors.noSIP && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationStatusPegawai.errors.noSIP}</div>
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
                      No. STR
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomInput
                    id="noSTR"
                    name="noSTR"
                    type="text"
                    value={vSetValidationStatusPegawai.values.noSTR}
                    onChange={(e) => {
                      vSetValidationStatusPegawai.setFieldValue(
                        'noSTR',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidationStatusPegawai.touched?.noSTR &&
                      !!vSetValidationStatusPegawai.errors?.noSTR
                    }
                  />
                  {vSetValidationStatusPegawai.touched?.noSTR &&
                    !!vSetValidationStatusPegawai.errors.noSTR && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationStatusPegawai.errors.noSTR}</div>
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
                      NPWP
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomInput
                    id="npwp"
                    name="npwp"
                    type="text"
                    value={vSetValidationStatusPegawai.values.npwp}
                    onChange={(e) => {
                      vSetValidationStatusPegawai.setFieldValue(
                        'npwp',
                        e.target.value
                      )
                    }}
                    invalid={
                      vSetValidationStatusPegawai.touched?.npwp &&
                      !!vSetValidationStatusPegawai.errors?.npwp
                    }
                  />
                  {vSetValidationStatusPegawai.touched?.npwp &&
                    !!vSetValidationStatusPegawai.errors.npwp && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationStatusPegawai.errors.npwp}</div>
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
                      Golongan
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomSelect
                    id="golongan"
                    name="golongan"
                    options={dataCombo.golonganPegawai}
                    onChange={(e) => {
                      vSetValidationStatusPegawai.setFieldValue(
                        'golongan',
                        e?.value || ''
                      )
                    }}
                    value={vSetValidationStatusPegawai.values.golongan}
                    className={`input row-header ${
                      !!vSetValidationStatusPegawai?.errors.golongan
                        ? 'is-invalid'
                        : ''
                    }`}
                  />
                  {vSetValidationStatusPegawai.touched.golongan &&
                    !!vSetValidationStatusPegawai.errors.golongan && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationStatusPegawai.errors.golongan}</div>
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
                      Status Pegawai
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomSelect
                    id="statusPegawai"
                    name="statusPegawai"
                    options={dataCombo.statusPegawai}
                    onChange={(e) => {
                      vSetValidationStatusPegawai.setFieldValue(
                        'statusPegawai',
                        e?.value || ''
                      )
                    }}
                    value={vSetValidationStatusPegawai.values.statusPegawai}
                    className={`input row-header ${
                      !!vSetValidationStatusPegawai?.errors.statusPegawai
                        ? 'is-invalid'
                        : ''
                    }`}
                  />
                  {vSetValidationStatusPegawai.touched.statusPegawai &&
                    !!vSetValidationStatusPegawai.errors.statusPegawai && (
                      <FormFeedback type="invalid">
                        <div>
                          {vSetValidationStatusPegawai.errors.statusPegawai}
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
                      Profesi
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomSelect
                    id="profesi"
                    name="profesi"
                    options={dataCombo.profesi}
                    onChange={(e) => {
                      vSetValidationStatusPegawai.setFieldValue(
                        'profesi',
                        e?.value || ''
                      )
                    }}
                    value={vSetValidationStatusPegawai.values.profesi}
                    className={`input row-header ${
                      !!vSetValidationStatusPegawai?.errors.profesi
                        ? 'is-invalid'
                        : ''
                    }`}
                  />
                  {vSetValidationStatusPegawai.touched.profesi &&
                    !!vSetValidationStatusPegawai.errors.profesi && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationStatusPegawai.errors.profesi}</div>
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
                      Jabatan
                    </Label>
                  </div>
                </Col>
                <Col lg={8}>
                  <CustomSelect
                    id="jabatan"
                    name="jabatan"
                    options={dataCombo.jabatan}
                    onChange={(e) => {
                      vSetValidationStatusPegawai.setFieldValue(
                        'jabatan',
                        e?.value || ''
                      )
                    }}
                    value={vSetValidationStatusPegawai.values.jabatan}
                    className={`input row-header ${
                      !!vSetValidationStatusPegawai?.errors.jabatan
                        ? 'is-invalid'
                        : ''
                    }`}
                  />
                  {vSetValidationStatusPegawai.touched.jabatan &&
                    !!vSetValidationStatusPegawai.errors.jabatan && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationStatusPegawai.errors.jabatan}</div>
                      </FormFeedback>
                    )}
                </Col>
              </Row>
            </Col>
            <Col lg={6}>
              <Row className="gy-2">
                <Col lg={3}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Tgl. SK
                    </Label>
                  </div>
                </Col>
                <Col lg={4}>
                  <KontainerFlatpickr
                    isError={
                      vSetValidationStatusPegawai.touched?.tglSKStart &&
                      !!vSetValidationStatusPegawai.errors?.tglSKStart
                    }
                    id="tglSKStart"
                    options={{
                      dateFormat: 'Y-m-d',
                      defaultDate: 'today',
                    }}
                    value={
                      vSetValidationStatusPegawai.values.tglSKStart || dateNow
                    }
                    onChange={([newDate]) => {
                      vSetValidationStatusPegawai.setFieldValue(
                        'tglSKStart',
                        newDate.toISOString()
                      )
                    }}
                  />
                  {vSetValidationStatusPegawai.touched?.tglSKStart &&
                    !!vSetValidationStatusPegawai.errors.tglSKStart && (
                      <FormFeedback type="invalid">
                        <div>
                          {vSetValidationStatusPegawai.errors.tglSKStart}
                        </div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={1}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      s.d
                    </Label>
                  </div>
                </Col>
                <Col lg={4}>
                  <KontainerFlatpickr
                    isError={
                      vSetValidationStatusPegawai.touched?.tglSKend &&
                      !!vSetValidationStatusPegawai.errors?.tglSKend
                    }
                    id="tglSKend"
                    options={{
                      dateFormat: 'Y-m-d',
                      defaultDate: 'today',
                    }}
                    value={
                      vSetValidationStatusPegawai.values.tglSKend || dateNow
                    }
                    onChange={([newDate]) => {
                      vSetValidationStatusPegawai.setFieldValue(
                        'tglSKend',
                        newDate.toISOString()
                      )
                    }}
                  />
                  {vSetValidationStatusPegawai.touched?.tglSKend &&
                    !!vSetValidationStatusPegawai.errors.tglSKend && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidationStatusPegawai.errors.tglSKend}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={3}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Tgl. Berlaku SIP
                    </Label>
                  </div>
                </Col>
                <Col lg={4}>
                  <KontainerFlatpickr
                    isError={
                      vSetValidationStatusPegawai.touched?.tglSIPStart &&
                      !!vSetValidationStatusPegawai.errors?.tglSIPStart
                    }
                    id="tglSIPStart"
                    options={{
                      dateFormat: 'Y-m-d',
                      defaultDate: 'today',
                    }}
                    value={
                      vSetValidationStatusPegawai.values.tglSIPStart || dateNow
                    }
                    onChange={([newDate]) => {
                      vSetValidationStatusPegawai.setFieldValue(
                        'tglSIPStart',
                        newDate.toISOString()
                      )
                    }}
                  />
                  {vSetValidationStatusPegawai.touched?.tglSIPStart &&
                    !!vSetValidationStatusPegawai.errors.tglSIPStart && (
                      <FormFeedback type="invalid">
                        <div>
                          {vSetValidationStatusPegawai.errors.tglSIPStart}
                        </div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={1}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      s.d
                    </Label>
                  </div>
                </Col>
                <Col lg={4}>
                  <KontainerFlatpickr
                    isError={
                      vSetValidationStatusPegawai.touched?.tglSIPend &&
                      !!vSetValidationStatusPegawai.errors?.tglSIPend
                    }
                    id="tglSIPend"
                    options={{
                      dateFormat: 'Y-m-d',
                      defaultDate: 'today',
                    }}
                    value={
                      vSetValidationStatusPegawai.values.tglSIPend || dateNow
                    }
                    onChange={([newDate]) => {
                      vSetValidationStatusPegawai.setFieldValue(
                        'tglSIPend',
                        newDate.toISOString()
                      )
                    }}
                  />
                  {vSetValidationStatusPegawai.touched?.tglSIPend &&
                    !!vSetValidationStatusPegawai.errors.tglSIPend && (
                      <FormFeedback type="invalid">
                        <div>
                          {vSetValidationStatusPegawai.errors.tglSIPend}
                        </div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={3}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Tgl. Berlaku STR
                    </Label>
                  </div>
                </Col>
                <Col lg={4}>
                  <KontainerFlatpickr
                    isError={
                      vSetValidationStatusPegawai.touched?.tglSTRStart &&
                      !!vSetValidationStatusPegawai.errors?.tglSTRStart
                    }
                    id="tglSTRStart"
                    options={{
                      dateFormat: 'Y-m-d',
                      defaultDate: 'today',
                    }}
                    value={
                      vSetValidationStatusPegawai.values.tglSTRStart || dateNow
                    }
                    onChange={([newDate]) => {
                      vSetValidationStatusPegawai.setFieldValue(
                        'tglSTRStart',
                        newDate.toISOString()
                      )
                    }}
                  />
                  {vSetValidationStatusPegawai.touched?.tglSTRStart &&
                    !!vSetValidationStatusPegawai.errors.tglSTRStart && (
                      <FormFeedback type="invalid">
                        <div>
                          {vSetValidationStatusPegawai.errors.tglSTRStart}
                        </div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={1}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      s.d
                    </Label>
                  </div>
                </Col>
                <Col lg={4}>
                  <KontainerFlatpickr
                    isError={
                      vSetValidationStatusPegawai.touched?.tglSTRend &&
                      !!vSetValidationStatusPegawai.errors?.tglSTRend
                    }
                    id="tglSTRend"
                    options={{
                      dateFormat: 'Y-m-d',
                      defaultDate: 'today',
                    }}
                    value={
                      vSetValidationStatusPegawai.values.tglSTRend || dateNow
                    }
                    onChange={([newDate]) => {
                      vSetValidationStatusPegawai.setFieldValue(
                        'tglSTRend',
                        newDate.toISOString()
                      )
                    }}
                  />
                  {vSetValidationStatusPegawai.touched?.tglSTRend &&
                    !!vSetValidationStatusPegawai.errors.tglSTRend && (
                      <FormFeedback type="invalid">
                        <div>
                          {vSetValidationStatusPegawai.errors.tglSTRend}
                        </div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={3}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Golongan PTKP
                    </Label>
                  </div>
                </Col>
                <Col lg={9}>
                  <CustomSelect
                    id="golonganPTKP"
                    name="golonganPTKP"
                    options={dataCombo.golonganPtkp}
                    onChange={(e) => {
                      vSetValidationStatusPegawai.setFieldValue(
                        'golonganPTKP',
                        e?.value || ''
                      )
                    }}
                    value={vSetValidationStatusPegawai.values.golonganPTKP}
                    className={`input row-header ${
                      !!vSetValidationStatusPegawai?.errors.golonganPTKP
                        ? 'is-invalid'
                        : ''
                    }`}
                  />
                  {vSetValidationStatusPegawai.touched.golonganPTKP &&
                    !!vSetValidationStatusPegawai.errors.golonganPTKP && (
                      <FormFeedback type="invalid">
                        <div>
                          {vSetValidationStatusPegawai.errors.golonganPTKP}
                        </div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={3}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Jumlah Anak
                    </Label>
                  </div>
                </Col>
                <Col lg={9}>
                  <CustomInput
                    id="jumlahAnak"
                    name="jumlahAnak"
                    type="text"
                    value={vSetValidationStatusPegawai.values.jumlahAnak}
                    onChange={(e) => {
                      const newVal = onChangeStrNbr(
                        e.target.value,
                        vSetValidationStatusPegawai.values.jumlahAnak
                      )
                      vSetValidationStatusPegawai.setFieldValue(
                        'jumlahAnak',
                        newVal
                      )
                    }}
                    invalid={
                      vSetValidationStatusPegawai.touched?.jumlahAnak &&
                      !!vSetValidationStatusPegawai.errors?.jumlahAnak
                    }
                  />
                  {vSetValidationStatusPegawai.touched?.jumlahAnak &&
                    !!vSetValidationStatusPegawai.errors.jumlahAnak && (
                      <FormFeedback type="invalid">
                        <div>
                          {vSetValidationStatusPegawai.errors.jumlahAnak}
                        </div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={3}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Jumlah Tanggungan
                    </Label>
                  </div>
                </Col>
                <Col lg={9}>
                  <CustomInput
                    id="jumlahTanggungan"
                    name="jumlahTanggungan"
                    type="text"
                    value={vSetValidationStatusPegawai.values.jumlahTanggungan}
                    onChange={(e) => {
                      const newVal = onChangeStrNbr(
                        e.target.value,
                        vSetValidationStatusPegawai.values.jumlahTanggungan
                      )
                      vSetValidationStatusPegawai.setFieldValue(
                        'jumlahTanggungan',
                        newVal
                      )
                    }}
                    invalid={
                      vSetValidationStatusPegawai.touched?.jumlahTanggungan &&
                      !!vSetValidationStatusPegawai.errors?.jumlahTanggungan
                    }
                  />
                  {vSetValidationStatusPegawai.touched?.jumlahTanggungan &&
                    !!vSetValidationStatusPegawai.errors.jumlahTanggungan && (
                      <FormFeedback type="invalid">
                        <div>
                          {vSetValidationStatusPegawai.errors.jumlahTanggungan}
                        </div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={3}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Unit Pelayanan
                    </Label>
                  </div>
                </Col>
                <Col lg={9}>
                  <CustomSelect
                    id="unitPelayanan"
                    name="unitPelayanan"
                    options={dataCombo.unit}
                    onChange={(e) => {
                      vSetValidationStatusPegawai.setFieldValue(
                        'unitPelayanan',
                        e?.value || ''
                      )
                    }}
                    value={vSetValidationStatusPegawai.values.unitPelayanan}
                    className={`input row-header ${
                      !!vSetValidationStatusPegawai?.errors.unitPelayanan
                        ? 'is-invalid'
                        : ''
                    }`}
                  />
                  {vSetValidationStatusPegawai.touched.unitPelayanan &&
                    !!vSetValidationStatusPegawai.errors.unitPelayanan && (
                      <FormFeedback type="invalid">
                        <div>
                          {vSetValidationStatusPegawai.errors.unitPelayanan}
                        </div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={3}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitlast"
                      className="form-label"
                    >
                      Unit Kerja
                    </Label>
                  </div>
                </Col>
                <Col lg={9}>
                  <CustomSelect
                    id="unitKerja"
                    name="unitKerja"
                    options={dataCombo.unitKerja}
                    onChange={(e) => {
                      vSetValidationStatusPegawai.setFieldValue(
                        'unitKerja',
                        e?.value || ''
                      )
                    }}
                    value={vSetValidationStatusPegawai.values.unitKerja}
                    className={`input row-header ${
                      !!vSetValidationStatusPegawai?.errors.unitKerja
                        ? 'is-invalid'
                        : ''
                    }`}
                  />
                  {vSetValidationStatusPegawai.touched.unitKerja &&
                    !!vSetValidationStatusPegawai.errors.unitKerja && (
                      <FormFeedback type="invalid">
                        <div>
                          {vSetValidationStatusPegawai.errors.unitKerja}
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

export default FormStatusPegawai
