import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import UiContent from '../../../Components/Common/UiContent'
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  Spinner,
  TabContent,
  TabPane,
} from 'reactstrap'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import classnames from 'classnames'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { onChangeStrNbr, onChangeStrNbrNeg } from '../../../utils/format'
import CustomSelect from '../../../Components/Common/CustomSelect/CustomSelect'
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr'
import {
  sdmResetForm,
  saveBiodataPegawai,
  getComboSDM,
  getPegawaiById,
  getUserRoleById,
  saveSignupUserRole,
  updateResetPassword,
} from '../../../store/actions'
import { desaGet } from '../../../store/master/action'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../../Components/Table/LoadingTable'
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles'
import CustomInput from '../../../Components/Common/CustomInput/CustomInput'
import FormBiodata from './FormBiodata'
import FormAlamat from './FormAlamat'

const BiodataPegawai = () => {
  document.title = 'Biodata Pegawai'
  const dispatch = useDispatch()
  const { idPegawai } = useParams()
  const [dateNow] = useState(() => new Date().toISOString())
  const {
    dataCombo,
    newData,
    success,
    error,
    dataPegawai,
    dataDesa,
    dataUserRole,
    loadingUserRole,
  } = useSelector((state) => ({
    dataCombo: state.sumberDayaManusia.getComboSDM.data,
    newData: state.sumberDayaManusia.saveBiodataPegawai.data,
    success: state.sumberDayaManusia.saveBiodataPegawai.success,
    loading: state.sumberDayaManusia.saveBiodataPegawai.loading,
    error: state.sumberDayaManusia.saveBiodataPegawai.error,
    dataPegawai: state.sumberDayaManusia.getPegawaiById.data,
    dataDesa: state.Master.desaGet.data,
    dataUserRole: state.sumberDayaManusia.getUserRoleById.data,
    loadingUserRole: state.sumberDayaManusia.getUserRoleById.loading,
  }))

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
  const vSetValidationUserName = useFormik({
    enableReinitialize: true,
    initialValues: {
      task: 4,
      statusEnabled: '',
      username: '',
      roles: '',
      idUser: '',
      idpegawai: '',
      password: '',
      accesUnit: '',
    },
    validationSchema: Yup.object({
      statusEnabled: Yup.string().required('Status Enabled wajib diisi'),
      username: Yup.string().required('User Name wajib diisi'),
      roles: Yup.string().required('Role Applikasi wajib diisi'),
      accesUnit: Yup.array().required('Acces Unit Applikasi wajib diisi'),
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log(values)
      values.password = values.username + `@123`
      if (values.idpegawai === '') {
        toast.error('ID Pegawai Tidak Ada, Silahkan Kembali, dan masuk lagi', {
          autoClose: 3000,
        })
        return
      }
      dispatch(
        saveSignupUserRole(values, () => {
          resetForm()
          dispatch(getUserRoleById({ idPegawai: idPegawai }))
        })
      )
    },
  })
  useEffect(() => {
    return () => {
      dispatch(sdmResetForm())
    }
  }, [dispatch])
  useEffect(() => {
    dispatch(getComboSDM())
    dispatch(desaGet(''))
  }, [dispatch])
  const [activeTab, setActiveTab] = useState('1')
  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
      //   let filteredOrders = orders;
      if (type !== 'all') {
        // filteredOrders = orders.filter((order) => order.status === type);
      }
    }
  }
  const taskBiodata = [
    {
      id: 1,
      label: 'Biodata Pegawai',
    },
    {
      id: 2,
      label: 'Alamat',
    },
    {
      id: 3,
      label: 'Status Pegawai',
    },
    {
      id: 4,
      label: 'User Name',
    },
  ]
  const dataStatusEnabled = [
    {
      value: 1,
      label: 'Aktif',
    },
    {
      value: 2,
      label: 'Non Aktif',
    },
  ]
  // Pills
  const [pillsTab, setpillsTab] = useState('1')
  const pillsToggleBilling = (tab) => {
    if (pillsTab !== tab) {
      setpillsTab(tab)
    }
  }
  useEffect(() => {
    const setFF3 = vSetValidationStatusPegawai.setFieldValue
    const setFF4 = vSetValidationUserName.setFieldValue
    if (newData !== null) {
      if (newData?.pegawai?.id !== undefined) {
        setFF3('idPegawai', newData.pegawai.id)
        setFF4('idpegawai', newData.pegawai.id)
      }
    }
  }, [
    newData,
    vSetValidationStatusPegawai.setFieldValue,
    success,
    vSetValidationUserName.setFieldValue,
  ])

  useEffect(() => {
    if (idPegawai !== undefined) {
      const setFF3 = vSetValidationStatusPegawai.setFieldValue
      setFF3('idPegawai', idPegawai)
      const setFF4 = vSetValidationUserName.setFieldValue
      setFF4('idpegawai', parseFloat(idPegawai))
      dispatch(getPegawaiById({ idPegawai: idPegawai }))
      dispatch(getUserRoleById({ idPegawai: idPegawai }))
    }
  }, [
    idPegawai,
    dispatch,
    vSetValidationStatusPegawai.setFieldValue,
    vSetValidationUserName.setFieldValue,
  ])
  useEffect(() => {
    const setFF3 = vSetValidationStatusPegawai.setFieldValue
    if (dataPegawai[0] !== undefined) {
      if (dataPegawai[0]?.namalengkap !== undefined) {
        setFF3('noSK', dataPegawai[0]?.nosk)
        setFF3('noSIP', dataPegawai[0]?.nosip)
        setFF3('noSTR', dataPegawai[0]?.nostr)
        setFF3('npwp', dataPegawai[0]?.npwp)
        setFF3('golongan', dataPegawai[0]?.objectgolonganfk)
        setFF3('statusPegawai', dataPegawai[0]?.objectstatuspegawaifk)
        setFF3('profesi', dataPegawai[0]?.objectprofesipegawaifk)
        setFF3('jabatan', dataPegawai[0]?.objectjabatanfk)
        setFF3('tglSKStart', dataPegawai[0]?.tglmasuk)
        setFF3('tglSKend', dataPegawai[0]?.tglpensiun)
        setFF3('tglSIPStart', dataPegawai[0]?.tglterbitsip)
        setFF3('tglSIPend', dataPegawai[0]?.tglberakhirsip)
        setFF3('tglSTRStart', dataPegawai[0]?.tglterbitstr)
        setFF3('tglSTRend', dataPegawai[0]?.tglberakhirstr)
        setFF3('golonganPTKP', dataPegawai[0]?.objectgolonganptkpfk)
        setFF3('jumlahAnak', dataPegawai[0]?.qtyanak)
        setFF3('jumlahTanggungan', dataPegawai[0]?.qtytanggungan)
        setFF3('unitPelayanan', dataPegawai[0]?.objectunitfk)
        setFF3('unitKerja', dataPegawai[0]?.objectunitkerjafk)
      }
    }
  }, [dataPegawai, vSetValidationStatusPegawai.setFieldValue])

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">No</span>,
      selector: (row) => row.no,
      sortable: true,
      width: '50px',
    },
    {
      name: <span className="font-weight-bold fs-13">Status Enabled</span>,
      selector: (row) => row.status,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">User Name</span>,
      selector: (row) => row.username,
      sortable: true,
      // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
      width: '160px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Modul</span>,
      selector: (row) => row.reportdisplay,
      sortable: true,
      width: '150px',
    },
  ]
  const [disabledUsername, setdisabledUsername] = useState(false)
  const handleClick = (e) => {
    vSetValidationUserName.setFieldValue('statusEnabled', 2)
    if (e.status === 'AKTIF') {
      vSetValidationUserName.setFieldValue('statusEnabled', 1)
    }
    setdisabledUsername(true)
    vSetValidationUserName.setFieldValue('username', e.username)
    vSetValidationUserName.setFieldValue('roles', e.idmodule)
    vSetValidationUserName.setFieldValue('idUser', e.id)
    console.log(e)
    vSetValidationUserName.setFieldValue('accesUnit', e.listunit)
  }
  const handleClickBatal = (e) => {
    setdisabledUsername(false)
    vSetValidationUserName.setFieldValue('statusEnabled', '')
    vSetValidationUserName.setFieldValue('username', '')
    vSetValidationUserName.setFieldValue('roles', '')
    vSetValidationUserName.setFieldValue('idUser', '')
  }
  const handleClickResetPassword = (e) => {
    if (vSetValidationUserName.values.idUser === '') {
      toast.error('Role Pasien Belum Dipilih', { autoClose: 3000 })
      return
    }
    const values = {
      idUser: vSetValidationUserName.values.idUser,
      password: vSetValidationUserName.values.username + `@123`,
    }
    dispatch(
      updateResetPassword(values, () => {
        // resetForm()
      })
    )
  }
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Tambah / Edit Pegawai" pageTitle="Forms" />
          <Card>
            <CardBody className="pt-0">
              <div>
                <Nav
                  className="nav-tabs nav-tabs-custom nav-success"
                  role="tablist"
                >
                  {taskBiodata.map((item, key) => (
                    <NavItem key={key}>
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames(
                          { active: pillsTab === `${item.id}` },
                          'fw-semibold'
                        )}
                        onClick={() => {
                          pillsToggleBilling(`${item.id}`)
                        }}
                      >
                        {' '}
                        {item.label}
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>
                <TabContent activeTab={pillsTab} className="text-muted">
                  <TabPane tabId="1" id="ttv-1">
                    <FormBiodata />
                  </TabPane>
                </TabContent>
                <TabContent activeTab={pillsTab} className="text-muted">
                  <TabPane tabId="2" id="ttv-1">
                    <FormAlamat />
                  </TabPane>
                </TabContent>
                <TabContent activeTab={pillsTab} className="text-muted">
                  <TabPane tabId="3" id="ttv-1">
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
                                    value={
                                      vSetValidationStatusPegawai.values.noSK
                                    }
                                    onChange={(e) => {
                                      vSetValidationStatusPegawai.setFieldValue(
                                        'noSK',
                                        e.target.value
                                      )
                                    }}
                                    invalid={
                                      vSetValidationStatusPegawai.touched
                                        ?.noSK &&
                                      !!vSetValidationStatusPegawai.errors?.noSK
                                    }
                                  />
                                  {vSetValidationStatusPegawai.touched?.noSK &&
                                    !!vSetValidationStatusPegawai.errors
                                      .noSK && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationStatusPegawai.errors
                                              .noSK
                                          }
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
                                      No. SIP
                                    </Label>
                                  </div>
                                </Col>
                                <Col lg={8}>
                                  <CustomInput
                                    id="noSIP"
                                    name="noSIP"
                                    type="text"
                                    value={
                                      vSetValidationStatusPegawai.values.noSIP
                                    }
                                    onChange={(e) => {
                                      vSetValidationStatusPegawai.setFieldValue(
                                        'noSIP',
                                        e.target.value
                                      )
                                    }}
                                    invalid={
                                      vSetValidationStatusPegawai.touched
                                        ?.noSIP &&
                                      !!vSetValidationStatusPegawai.errors
                                        ?.noSIP
                                    }
                                  />
                                  {vSetValidationStatusPegawai.touched?.noSIP &&
                                    !!vSetValidationStatusPegawai.errors
                                      .noSIP && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationStatusPegawai.errors
                                              .noSIP
                                          }
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
                                      No. STR
                                    </Label>
                                  </div>
                                </Col>
                                <Col lg={8}>
                                  <CustomInput
                                    id="noSTR"
                                    name="noSTR"
                                    type="text"
                                    value={
                                      vSetValidationStatusPegawai.values.noSTR
                                    }
                                    onChange={(e) => {
                                      vSetValidationStatusPegawai.setFieldValue(
                                        'noSTR',
                                        e.target.value
                                      )
                                    }}
                                    invalid={
                                      vSetValidationStatusPegawai.touched
                                        ?.noSTR &&
                                      !!vSetValidationStatusPegawai.errors
                                        ?.noSTR
                                    }
                                  />
                                  {vSetValidationStatusPegawai.touched?.noSTR &&
                                    !!vSetValidationStatusPegawai.errors
                                      .noSTR && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationStatusPegawai.errors
                                              .noSTR
                                          }
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
                                      NPWP
                                    </Label>
                                  </div>
                                </Col>
                                <Col lg={8}>
                                  <CustomInput
                                    id="npwp"
                                    name="npwp"
                                    type="text"
                                    value={
                                      vSetValidationStatusPegawai.values.npwp
                                    }
                                    onChange={(e) => {
                                      vSetValidationStatusPegawai.setFieldValue(
                                        'npwp',
                                        e.target.value
                                      )
                                    }}
                                    invalid={
                                      vSetValidationStatusPegawai.touched
                                        ?.npwp &&
                                      !!vSetValidationStatusPegawai.errors?.npwp
                                    }
                                  />
                                  {vSetValidationStatusPegawai.touched?.npwp &&
                                    !!vSetValidationStatusPegawai.errors
                                      .npwp && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationStatusPegawai.errors
                                              .npwp
                                          }
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
                                    value={
                                      vSetValidationStatusPegawai.values
                                        .golongan
                                    }
                                    className={`input row-header ${
                                      !!vSetValidationStatusPegawai?.errors
                                        .golongan
                                        ? 'is-invalid'
                                        : ''
                                    }`}
                                  />
                                  {vSetValidationStatusPegawai.touched
                                    .golongan &&
                                    !!vSetValidationStatusPegawai.errors
                                      .golongan && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationStatusPegawai.errors
                                              .golongan
                                          }
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
                                    value={
                                      vSetValidationStatusPegawai.values
                                        .statusPegawai
                                    }
                                    className={`input row-header ${
                                      !!vSetValidationStatusPegawai?.errors
                                        .statusPegawai
                                        ? 'is-invalid'
                                        : ''
                                    }`}
                                  />
                                  {vSetValidationStatusPegawai.touched
                                    .statusPegawai &&
                                    !!vSetValidationStatusPegawai.errors
                                      .statusPegawai && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationStatusPegawai.errors
                                              .statusPegawai
                                          }
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
                                    value={
                                      vSetValidationStatusPegawai.values.profesi
                                    }
                                    className={`input row-header ${
                                      !!vSetValidationStatusPegawai?.errors
                                        .profesi
                                        ? 'is-invalid'
                                        : ''
                                    }`}
                                  />
                                  {vSetValidationStatusPegawai.touched
                                    .profesi &&
                                    !!vSetValidationStatusPegawai.errors
                                      .profesi && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationStatusPegawai.errors
                                              .profesi
                                          }
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
                                    value={
                                      vSetValidationStatusPegawai.values.jabatan
                                    }
                                    className={`input row-header ${
                                      !!vSetValidationStatusPegawai?.errors
                                        .jabatan
                                        ? 'is-invalid'
                                        : ''
                                    }`}
                                  />
                                  {vSetValidationStatusPegawai.touched
                                    .jabatan &&
                                    !!vSetValidationStatusPegawai.errors
                                      .jabatan && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationStatusPegawai.errors
                                              .jabatan
                                          }
                                        </div>
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
                                      vSetValidationStatusPegawai.touched
                                        ?.tglSKStart &&
                                      !!vSetValidationStatusPegawai.errors
                                        ?.tglSKStart
                                    }
                                    id="tglSKStart"
                                    options={{
                                      dateFormat: 'Y-m-d',
                                      defaultDate: 'today',
                                    }}
                                    value={
                                      vSetValidationStatusPegawai.values
                                        .tglSKStart || dateNow
                                    }
                                    onChange={([newDate]) => {
                                      vSetValidationStatusPegawai.setFieldValue(
                                        'tglSKStart',
                                        newDate.toISOString()
                                      )
                                    }}
                                  />
                                  {vSetValidationStatusPegawai.touched
                                    ?.tglSKStart &&
                                    !!vSetValidationStatusPegawai.errors
                                      .tglSKStart && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationStatusPegawai.errors
                                              .tglSKStart
                                          }
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
                                      vSetValidationStatusPegawai.touched
                                        ?.tglSKend &&
                                      !!vSetValidationStatusPegawai.errors
                                        ?.tglSKend
                                    }
                                    id="tglSKend"
                                    options={{
                                      dateFormat: 'Y-m-d',
                                      defaultDate: 'today',
                                    }}
                                    value={
                                      vSetValidationStatusPegawai.values
                                        .tglSKend || dateNow
                                    }
                                    onChange={([newDate]) => {
                                      vSetValidationStatusPegawai.setFieldValue(
                                        'tglSKend',
                                        newDate.toISOString()
                                      )
                                    }}
                                  />
                                  {vSetValidationStatusPegawai.touched
                                    ?.tglSKend &&
                                    !!vSetValidationStatusPegawai.errors
                                      .tglSKend && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationStatusPegawai.errors
                                              .tglSKend
                                          }
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
                                      Tgl. Berlaku SIP
                                    </Label>
                                  </div>
                                </Col>
                                <Col lg={4}>
                                  <KontainerFlatpickr
                                    isError={
                                      vSetValidationStatusPegawai.touched
                                        ?.tglSIPStart &&
                                      !!vSetValidationStatusPegawai.errors
                                        ?.tglSIPStart
                                    }
                                    id="tglSIPStart"
                                    options={{
                                      dateFormat: 'Y-m-d',
                                      defaultDate: 'today',
                                    }}
                                    value={
                                      vSetValidationStatusPegawai.values
                                        .tglSIPStart || dateNow
                                    }
                                    onChange={([newDate]) => {
                                      vSetValidationStatusPegawai.setFieldValue(
                                        'tglSIPStart',
                                        newDate.toISOString()
                                      )
                                    }}
                                  />
                                  {vSetValidationStatusPegawai.touched
                                    ?.tglSIPStart &&
                                    !!vSetValidationStatusPegawai.errors
                                      .tglSIPStart && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationStatusPegawai.errors
                                              .tglSIPStart
                                          }
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
                                      vSetValidationStatusPegawai.touched
                                        ?.tglSIPend &&
                                      !!vSetValidationStatusPegawai.errors
                                        ?.tglSIPend
                                    }
                                    id="tglSIPend"
                                    options={{
                                      dateFormat: 'Y-m-d',
                                      defaultDate: 'today',
                                    }}
                                    value={
                                      vSetValidationStatusPegawai.values
                                        .tglSIPend || dateNow
                                    }
                                    onChange={([newDate]) => {
                                      vSetValidationStatusPegawai.setFieldValue(
                                        'tglSIPend',
                                        newDate.toISOString()
                                      )
                                    }}
                                  />
                                  {vSetValidationStatusPegawai.touched
                                    ?.tglSIPend &&
                                    !!vSetValidationStatusPegawai.errors
                                      .tglSIPend && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationStatusPegawai.errors
                                              .tglSIPend
                                          }
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
                                      vSetValidationStatusPegawai.touched
                                        ?.tglSTRStart &&
                                      !!vSetValidationStatusPegawai.errors
                                        ?.tglSTRStart
                                    }
                                    id="tglSTRStart"
                                    options={{
                                      dateFormat: 'Y-m-d',
                                      defaultDate: 'today',
                                    }}
                                    value={
                                      vSetValidationStatusPegawai.values
                                        .tglSTRStart || dateNow
                                    }
                                    onChange={([newDate]) => {
                                      vSetValidationStatusPegawai.setFieldValue(
                                        'tglSTRStart',
                                        newDate.toISOString()
                                      )
                                    }}
                                  />
                                  {vSetValidationStatusPegawai.touched
                                    ?.tglSTRStart &&
                                    !!vSetValidationStatusPegawai.errors
                                      .tglSTRStart && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationStatusPegawai.errors
                                              .tglSTRStart
                                          }
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
                                      vSetValidationStatusPegawai.touched
                                        ?.tglSTRend &&
                                      !!vSetValidationStatusPegawai.errors
                                        ?.tglSTRend
                                    }
                                    id="tglSTRend"
                                    options={{
                                      dateFormat: 'Y-m-d',
                                      defaultDate: 'today',
                                    }}
                                    value={
                                      vSetValidationStatusPegawai.values
                                        .tglSTRend || dateNow
                                    }
                                    onChange={([newDate]) => {
                                      vSetValidationStatusPegawai.setFieldValue(
                                        'tglSTRend',
                                        newDate.toISOString()
                                      )
                                    }}
                                  />
                                  {vSetValidationStatusPegawai.touched
                                    ?.tglSTRend &&
                                    !!vSetValidationStatusPegawai.errors
                                      .tglSTRend && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationStatusPegawai.errors
                                              .tglSTRend
                                          }
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
                                    value={
                                      vSetValidationStatusPegawai.values
                                        .golonganPTKP
                                    }
                                    className={`input row-header ${
                                      !!vSetValidationStatusPegawai?.errors
                                        .golonganPTKP
                                        ? 'is-invalid'
                                        : ''
                                    }`}
                                  />
                                  {vSetValidationStatusPegawai.touched
                                    .golonganPTKP &&
                                    !!vSetValidationStatusPegawai.errors
                                      .golonganPTKP && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationStatusPegawai.errors
                                              .golonganPTKP
                                          }
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
                                    value={
                                      vSetValidationStatusPegawai.values
                                        .jumlahAnak
                                    }
                                    onChange={(e) => {
                                      const newVal = onChangeStrNbr(
                                        e.target.value,
                                        vSetValidationStatusPegawai.values
                                          .jumlahAnak
                                      )
                                      vSetValidationStatusPegawai.setFieldValue(
                                        'jumlahAnak',
                                        newVal
                                      )
                                    }}
                                    invalid={
                                      vSetValidationStatusPegawai.touched
                                        ?.jumlahAnak &&
                                      !!vSetValidationStatusPegawai.errors
                                        ?.jumlahAnak
                                    }
                                  />
                                  {vSetValidationStatusPegawai.touched
                                    ?.jumlahAnak &&
                                    !!vSetValidationStatusPegawai.errors
                                      .jumlahAnak && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationStatusPegawai.errors
                                              .jumlahAnak
                                          }
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
                                    value={
                                      vSetValidationStatusPegawai.values
                                        .jumlahTanggungan
                                    }
                                    onChange={(e) => {
                                      const newVal = onChangeStrNbr(
                                        e.target.value,
                                        vSetValidationStatusPegawai.values
                                          .jumlahTanggungan
                                      )
                                      vSetValidationStatusPegawai.setFieldValue(
                                        'jumlahTanggungan',
                                        newVal
                                      )
                                    }}
                                    invalid={
                                      vSetValidationStatusPegawai.touched
                                        ?.jumlahTanggungan &&
                                      !!vSetValidationStatusPegawai.errors
                                        ?.jumlahTanggungan
                                    }
                                  />
                                  {vSetValidationStatusPegawai.touched
                                    ?.jumlahTanggungan &&
                                    !!vSetValidationStatusPegawai.errors
                                      .jumlahTanggungan && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationStatusPegawai.errors
                                              .jumlahTanggungan
                                          }
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
                                    value={
                                      vSetValidationStatusPegawai.values
                                        .unitPelayanan
                                    }
                                    className={`input row-header ${
                                      !!vSetValidationStatusPegawai?.errors
                                        .unitPelayanan
                                        ? 'is-invalid'
                                        : ''
                                    }`}
                                  />
                                  {vSetValidationStatusPegawai.touched
                                    .unitPelayanan &&
                                    !!vSetValidationStatusPegawai.errors
                                      .unitPelayanan && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationStatusPegawai.errors
                                              .unitPelayanan
                                          }
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
                                    value={
                                      vSetValidationStatusPegawai.values
                                        .unitKerja
                                    }
                                    className={`input row-header ${
                                      !!vSetValidationStatusPegawai?.errors
                                        .unitKerja
                                        ? 'is-invalid'
                                        : ''
                                    }`}
                                  />
                                  {vSetValidationStatusPegawai.touched
                                    .unitKerja &&
                                    !!vSetValidationStatusPegawai.errors
                                      .unitKerja && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationStatusPegawai.errors
                                              .unitKerja
                                          }
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
                  </TabPane>
                </TabContent>
                <TabContent activeTab={pillsTab} className="text-muted">
                  <TabPane tabId="4" id="ttv-1">
                    <Card>
                      <CardBody>
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault()
                            vSetValidationUserName.handleSubmit()
                            return false
                          }}
                          className="gy-4"
                          action="#"
                        >
                          <Row>
                            <Col lg={6}>
                              <div id="table-gridjs">
                                <DataTable
                                  fixedHeader
                                  fixedHeaderScrollHeight="330px"
                                  columns={columns}
                                  pagination
                                  data={dataUserRole}
                                  progressPending={loadingUserRole}
                                  customStyles={tableCustomStyles}
                                  progressComponent={<LoadingTable />}
                                  onRowClicked={(row) => handleClick(row)}
                                  pointerOnHover
                                  highlightOnHover
                                />
                              </div>
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
                                      Status Enabled
                                    </Label>
                                  </div>
                                </Col>
                                <Col lg={8}>
                                  <CustomSelect
                                    id="statusEnabled"
                                    name="statusEnabled"
                                    options={dataStatusEnabled}
                                    isClearEmpty
                                    onChange={(e) => {
                                      vSetValidationUserName.setFieldValue(
                                        'statusEnabled',
                                        e?.value || ''
                                      )
                                    }}
                                    value={
                                      vSetValidationUserName.values
                                        .statusEnabled
                                    }
                                    className={`input row-header ${
                                      !!vSetValidationUserName?.errors
                                        .statusEnabled
                                        ? 'is-invalid'
                                        : ''
                                    }`}
                                  />
                                  {vSetValidationUserName.touched
                                    .statusEnabled &&
                                    !!vSetValidationUserName.errors
                                      .statusEnabled && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationUserName.errors
                                              .statusEnabled
                                          }
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
                                      User Name
                                    </Label>
                                  </div>
                                </Col>
                                <Col lg={8}>
                                  <CustomInput
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={
                                      vSetValidationUserName.values.username
                                    }
                                    onChange={(e) => {
                                      vSetValidationUserName.setFieldValue(
                                        'username',
                                        e.target.value
                                      )
                                    }}
                                    invalid={
                                      vSetValidationUserName.touched
                                        ?.username &&
                                      !!vSetValidationUserName.errors?.username
                                    }
                                    disabled={disabledUsername}
                                  />
                                  {vSetValidationUserName.touched?.username &&
                                    !!vSetValidationUserName.errors
                                      .username && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationUserName.errors
                                              .username
                                          }
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
                                      Modul
                                    </Label>
                                  </div>
                                </Col>
                                <Col lg={8}>
                                  <CustomSelect
                                    id="roles"
                                    name="roles"
                                    options={dataCombo.roles}
                                    isClearEmpty
                                    onChange={(e) => {
                                      vSetValidationUserName.setFieldValue(
                                        'roles',
                                        e?.value || ''
                                      )
                                    }}
                                    value={vSetValidationUserName.values.roles}
                                    className={`input row-header ${
                                      !!vSetValidationUserName?.errors.roles
                                        ? 'is-invalid'
                                        : ''
                                    }`}
                                  />
                                  {vSetValidationUserName.touched.roles &&
                                    !!vSetValidationUserName.errors.roles && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {vSetValidationUserName.errors.roles}
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
                                      Acces Unit
                                    </Label>
                                  </div>
                                </Col>
                                <Col lg={8}>
                                  <CustomSelect
                                    id="accesUnit"
                                    name="accesUnit"
                                    options={dataCombo.unit || []}
                                    onChange={(e) => {
                                      vSetValidationUserName.setFieldValue(
                                        'accesUnit',
                                        e
                                      )
                                    }}
                                    value={
                                      vSetValidationUserName.values.accesUnit ||
                                      []
                                    }
                                    className={`input row-header ${
                                      !!vSetValidationUserName?.errors.accesUnit
                                        ? 'is-invalid'
                                        : ''
                                    }`}
                                    isMulti
                                  />
                                  {vSetValidationUserName.touched.accesUnit &&
                                    !!vSetValidationUserName.errors
                                      .accesUnit && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationUserName.errors
                                              .accesUnit
                                          }
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
                                  onClick={() => {
                                    handleClickBatal()
                                  }}
                                >
                                  Batal
                                </Button>
                                <Button
                                  type="button"
                                  color="warning"
                                  onClick={() => {
                                    handleClickResetPassword()
                                  }}
                                >
                                  Reset Password
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </CardBody>
                    </Card>
                  </TabPane>
                </TabContent>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default BiodataPegawai
